#!/usr/bin/env python3
"""Test suite for Lab 04: Streaming Connection Leak."""

import asyncio
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from labs.lab_04_stream_leak.streamer import (
    ResourceTracker,
    broken_stream_generator,
    fixed_stream_generator,
)


class TestLab04(unittest.TestCase):
    def setUp(self):
        ResourceTracker.reset()
        self.tokens = [f"token_{i}" for i in range(20)]

    def test_broken_stream_leaks_on_cancellation(self):
        async def run_broken():
            gen = broken_stream_generator(self.tokens)
            # Read only 2 tokens then abort (simulating browser tab close)
            await anext(gen)
            await anext(gen)
            await gen.aclose()

        asyncio.run(run_broken())
        # The broken generator never reached the decrement line!
        self.assertEqual(ResourceTracker.active_connections, 1)
        self.assertFalse(ResourceTracker.cleaned_up)

    def test_fixed_stream_cleans_up_on_cancellation(self):
        ResourceTracker.reset()

        async def run_fixed():
            gen = fixed_stream_generator(self.tokens)
            await anext(gen)
            await anext(gen)
            await gen.aclose()

        asyncio.run(run_fixed())
        # The fixed generator's finally block released the connection
        self.assertEqual(ResourceTracker.active_connections, 0)
        self.assertTrue(ResourceTracker.cleaned_up)


if __name__ == "__main__":
    unittest.main()
