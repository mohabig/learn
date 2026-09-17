#!/usr/bin/env python3
"""Budget and safety guard for AI engineering workflows.

Provides:
1. Real-time cost & token tracking across major model providers (OpenAI, Anthropic, Google).
2. Hard session and cumulative spending caps to prevent runaway API billing.
3. Step limits (loop fences) to protect agent loops from infinite iterations.
4. Disk response caching for evaluation suites to allow zero-cost test reruns.

Standard library only, zero external dependencies.
"""

from __future__ import annotations

import dataclasses
import hashlib
import json
from collections.abc import Generator
from contextlib import contextmanager
from pathlib import Path
from typing import Any


class BudgetExceededError(RuntimeError):
    """Raised when estimated API spend exceeds configured dollar thresholds."""


class StepLimitExceededError(RuntimeError):
    """Raised when an agent loop exceeds its maximum allowed execution steps."""


# Cost per 1M tokens in USD: (input_price_per_1m, output_price_per_1m, cached_input_price_per_1m)
MODEL_PRICING: dict[str, tuple[float, float, float]] = {
    # OpenAI
    "gpt-4o-mini": (0.15, 0.60, 0.075),
    "gpt-4o": (2.50, 10.00, 1.25),
    "o3-mini": (1.10, 4.40, 0.55),
    # Anthropic
    "claude-3-5-haiku-latest": (0.80, 4.00, 0.08),
    "claude-3-5-sonnet-latest": (3.00, 15.00, 0.30),
    "claude-3-7-sonnet-latest": (3.00, 15.00, 0.30),
    # Google
    "gemini-1.5-flash": (0.075, 0.30, 0.01875),
    "gemini-1.5-pro": (1.25, 5.00, 0.3125),
    "gemini-2.0-flash": (0.10, 0.40, 0.025),
    # Default fallback
    "default": (1.50, 6.00, 0.375),
}


@dataclasses.dataclass
class UsageStats:
    calls: int = 0
    input_tokens: int = 0
    output_tokens: int = 0
    cached_input_tokens: int = 0
    estimated_cost_usd: float = 0.0


class BudgetGuard:
    """Monitors and protects LLM API calls against excessive cost and infinite loops."""

    def __init__(
        self,
        max_session_cost_usd: float = 2.00,
        max_total_cost_usd: float = 50.00,
        max_steps: int = 15,
        cache_dir: Path | str | None = None,
        state_file: Path | str | None = None,
    ):
        self.max_session_cost_usd = max_session_cost_usd
        self.max_total_cost_usd = max_total_cost_usd
        self.max_steps = max_steps
        self.session_stats = UsageStats()
        self.current_step = 0

        # State persistence for cumulative spend
        self.state_file = Path(state_file) if state_file else Path.home() / ".learn_budget_state.json"
        self.total_stats = self._load_total_stats()

        # Cache directory for eval runs
        self.cache_dir = Path(cache_dir) if cache_dir else Path(".cache") / "llm_eval"
        self.cache_dir.mkdir(parents=True, exist_ok=True)

    def _load_total_stats(self) -> UsageStats:
        if self.state_file.exists():
            try:
                data = json.loads(self.state_file.read_text(encoding="utf-8"))
                return UsageStats(**data)
            except Exception:
                pass
        return UsageStats()

    def _save_total_stats(self) -> None:
        try:
            self.state_file.parent.mkdir(parents=True, exist_ok=True)
            self.state_file.write_text(
                json.dumps(dataclasses.asdict(self.total_stats), indent=2),
                encoding="utf-8",
            )
        except Exception:
            pass

    @staticmethod
    def _find_pricing(model_name: str) -> tuple[float, float, float]:
        name = model_name.lower().strip()
        for key, rates in MODEL_PRICING.items():
            if key in name:
                return rates
        return MODEL_PRICING["default"]

    def calculate_cost(
        self,
        model_name: str,
        input_tokens: int,
        output_tokens: int,
        cached_input_tokens: int = 0,
    ) -> float:
        in_rate, out_rate, cached_in_rate = self._find_pricing(model_name)
        regular_in = max(0, input_tokens - cached_input_tokens)
        cost = (
            (regular_in / 1_000_000.0) * in_rate
            + (cached_input_tokens / 1_000_000.0) * cached_in_rate
            + (output_tokens / 1_000_000.0) * out_rate
        )
        return round(cost, 6)

    def record_usage(
        self,
        model_name: str,
        input_tokens: int,
        output_tokens: int,
        cached_input_tokens: int = 0,
    ) -> float:
        """Records a completed API call and raises if budget limits are crossed."""
        cost = self.calculate_cost(model_name, input_tokens, output_tokens, cached_input_tokens)

        # Update session
        self.session_stats.calls += 1
        self.session_stats.input_tokens += input_tokens
        self.session_stats.output_tokens += output_tokens
        self.session_stats.cached_input_tokens += cached_input_tokens
        self.session_stats.estimated_cost_usd = round(self.session_stats.estimated_cost_usd + cost, 6)

        # Update total
        self.total_stats.calls += 1
        self.total_stats.input_tokens += input_tokens
        self.total_stats.output_tokens += output_tokens
        self.total_stats.cached_input_tokens += cached_input_tokens
        self.total_stats.estimated_cost_usd = round(self.total_stats.estimated_cost_usd + cost, 6)
        self._save_total_stats()

        # Check caps
        if self.session_stats.estimated_cost_usd > self.max_session_cost_usd:
            raise BudgetExceededError(
                f"Session budget limit reached: ${self.session_stats.estimated_cost_usd:.4f} > "
                f"${self.max_session_cost_usd:.2f} max. Halting calls."
            )

        if self.total_stats.estimated_cost_usd > self.max_total_cost_usd:
            raise BudgetExceededError(
                f"Cumulative project budget limit reached: ${self.total_stats.estimated_cost_usd:.4f} > "
                f"${self.max_total_cost_usd:.2f} max. Halting calls."
            )

        return cost

    @contextmanager
    def step(self, label: str = "") -> Generator[int, None, None]:
        """Fences agent execution loops to avoid runaway recursive calls."""
        self.current_step += 1
        if self.current_step > self.max_steps:
            raise StepLimitExceededError(
                f"Loop limit exceeded: reached step {self.current_step} (max allowed: {self.max_steps}). "
                f"Step label: '{label}'."
            )
        yield self.current_step

    def reset_steps(self) -> None:
        self.current_step = 0

    # -------------------------------------------------------------------------
    # Disk caching for deterministic evaluation runs
    # -------------------------------------------------------------------------
    def _cache_key(self, prompt: str, model: str, extra_params: dict[str, Any] | None = None) -> str:
        payload = {"prompt": prompt, "model": model, "params": extra_params or {}}
        raw = json.dumps(payload, sort_keys=True)
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    def get_cached(self, prompt: str, model: str, extra_params: dict[str, Any] | None = None) -> dict[str, Any] | None:
        """Retrieves cached response if present, returning None if cache miss."""
        key = self._cache_key(prompt, model, extra_params)
        file_path = self.cache_dir / f"{key}.json"
        if file_path.exists():
            try:
                return json.loads(file_path.read_text(encoding="utf-8"))
            except Exception:
                return None
        return None

    def set_cached(
        self,
        prompt: str,
        model: str,
        response_data: dict[str, Any],
        extra_params: dict[str, Any] | None = None,
    ) -> None:
        """Saves an LLM response to local disk for fast, free re-runs."""
        key = self._cache_key(prompt, model, extra_params)
        file_path = self.cache_dir / f"{key}.json"
        try:
            file_path.write_text(json.dumps(response_data, indent=2), encoding="utf-8")
        except Exception:
            pass

    def get_summary(self) -> dict[str, Any]:
        return {
            "session": dataclasses.asdict(self.session_stats),
            "total": dataclasses.asdict(self.total_stats),
            "current_step": self.current_step,
            "max_steps": self.max_steps,
        }

    def print_summary(self) -> None:
        s = self.session_stats
        t = self.total_stats
        print("=== BudgetGuard Usage Report ===")
        print(f"Session: {s.calls} calls | {s.input_tokens} in ({s.cached_input_tokens} cached) | {s.output_tokens} out | ${s.estimated_cost_usd:.4f}")
        print(f"Total:   {t.calls} calls | {t.input_tokens} in ({t.cached_input_tokens} cached) | {t.output_tokens} out | ${t.estimated_cost_usd:.4f}")
        print("================================")
