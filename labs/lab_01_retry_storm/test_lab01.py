#!/usr/bin/env python3
"""Test suite for Lab 01: Retry Storm & Jitter Verification."""

import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from labs.lab_01_retry_storm.client import (
    broken_backoff,
    full_jitter_backoff,
    retry_with_backoff,
    RateLimitExceeded,
)


class TestLab01(unittest.TestCase):
    def test_broken_backoff_is_deterministic(self):
        # Broken backoff always returns identical values for same attempt
        delay1 = broken_backoff(attempt=2, base=1.0)
        delay2 = broken_backoff(attempt=2, base=1.0)
        self.assertEqual(delay1, 4.0)
        self.assertEqual(delay2, 4.0)

    def test_full_jitter_randomizes_intervals(self):
        # Full jitter returns distinct values across calls for the same attempt
        delays = [full_jitter_backoff(attempt=3, base=1.0) for _ in range(50)]
        self.assertTrue(all(0.0 <= d <= 8.0 for d in delays))
        # Ensure variance exists (not all equal)
        self.assertGreater(len(set(round(d, 3) for d in delays)), 30)

    def test_retry_recovers_after_intermittent_failures(self):
        calls = 0

        def flaky_api():
            nonlocal calls
            calls += 1
            if calls < 3:
                raise RateLimitExceeded("429 Too Many Requests")
            return {"status": "success", "data": "recovered"}

        # Use 0 base sleep to make unit test instant
        result = retry_with_backoff(
            flaky_api,
            max_retries=4,
            backoff_strategy=lambda a: 0.001,
        )
        self.assertEqual(result["status"], "success")
        self.assertEqual(calls, 3)


if __name__ == "__main__":
    unittest.main()
