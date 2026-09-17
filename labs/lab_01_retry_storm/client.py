"""Lab 01: Fixing the Retry Storm (Thundering Herd Problem).

Scenario:
An external model provider is experiencing a brief rate-limiting event (HTTP 429).
If all workers retry at exact exponential intervals (2s, 4s, 8s), they hit the server
in synchrony, repeatedly causing cascading 429 failures.

The solution is Exponential Backoff with FULL JITTER:
    sleep = random.uniform(0, min(max_backoff, base_backoff * (2 ** attempt)))
"""

from __future__ import annotations

import random
import time
from typing import Callable, TypeVar

T = TypeVar("T")


class RateLimitExceeded(Exception):
    """Simulated 429 Too Many Requests."""


def broken_backoff(attempt: int, base: float = 1.0) -> float:
    """BROKEN: Exact exponential interval with zero jitter.

    All concurrent workers sleep for the EXACT same duration, causing a thundering herd.
    """
    return base * (2 ** attempt)


def full_jitter_backoff(attempt: int, base: float = 1.0, max_backoff: float = 30.0) -> float:
    """FIXED: Exponential backoff with Full Jitter.

    Randomizes sleep uniformly between 0 and the exponential ceiling.
    Decouples synchronized retries and spreads traffic evenly.
    """
    ceiling = min(max_backoff, base * (2 ** attempt))
    return random.uniform(0.0, ceiling)


def retry_with_backoff(
    func: Callable[[], T],
    max_retries: int = 4,
    backoff_strategy: Callable[[int], float] = full_jitter_backoff,
) -> T:
    """Executes a function with retries on RateLimitExceeded."""
    for attempt in range(max_retries):
        try:
            return func()
        except RateLimitExceeded:
            if attempt == max_retries - 1:
                raise
            delay = backoff_strategy(attempt)
            time.sleep(delay)
    raise RateLimitExceeded("Max retries exceeded.")
