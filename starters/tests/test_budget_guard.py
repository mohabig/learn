#!/usr/bin/env python3
"""Tests for BudgetGuard safety rails and disk caching.

Runnable with both `pytest` and standard `python3 starters/tests/test_budget_guard.py`.
"""

import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from starters.common.budget_guard import (
    BudgetExceededError,
    BudgetGuard,
    StepLimitExceededError,
)


class TestBudgetGuard(unittest.TestCase):
    def test_calculate_cost(self):
        guard = BudgetGuard()
        # gpt-4o-mini: $0.15/1M in, $0.60/1M out
        cost = guard.calculate_cost("gpt-4o-mini", 1_000_000, 1_000_000)
        self.assertAlmostEqual(cost, 0.75, places=3)

    def test_session_budget_exceeded(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            tmp_path = Path(tmp_dir)
            guard = BudgetGuard(
                max_session_cost_usd=0.01,
                state_file=tmp_path / "state.json",
                cache_dir=tmp_path / "cache",
            )
            # 10k in, 10k out on gpt-4o ($2.50 / $10.00) = $0.025 + $0.10 = $0.125 > $0.01
            with self.assertRaises(BudgetExceededError):
                guard.record_usage("gpt-4o", 10_000, 10_000)

    def test_step_limit_fence(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            tmp_path = Path(tmp_dir)
            guard = BudgetGuard(
                max_steps=3,
                state_file=tmp_path / "state.json",
                cache_dir=tmp_path / "cache",
            )

            steps_run = 0
            with self.assertRaises(StepLimitExceededError):
                for _ in range(5):
                    with guard.step("agent_iteration"):
                        steps_run += 1

            self.assertEqual(steps_run, 3)

    def test_disk_cache(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            tmp_path = Path(tmp_dir)
            cache_dir = tmp_path / "cache"
            guard = BudgetGuard(
                state_file=tmp_path / "state.json",
                cache_dir=cache_dir,
            )

            prompt = "Extract invoice: #1024 total $50.00"
            model = "gpt-4o-mini"
            cached = guard.get_cached(prompt, model)
            self.assertIsNone(cached)

            response_data = {"invoice_id": 1024, "total": 50.0}
            guard.set_cached(prompt, model, response_data)

            retrieved = guard.get_cached(prompt, model)
            self.assertEqual(retrieved, response_data)


if __name__ == "__main__":
    unittest.main()
