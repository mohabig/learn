"""Lab 04: Streaming Connection & Memory Leak on Client Disconnect.

Scenario:
An async FastAPI endpoint streams LLM tokens via Server-Sent Events (SSE).
When a client closes their browser tab mid-stream, an asyncio.CancelledError
is raised. If the generator does not implement proper cancellation handling,
the upstream model connection remains active and resources leak.
"""

from __future__ import annotations

import asyncio
from typing import AsyncGenerator, Callable, List, Optional


class ResourceTracker:
    """Tracks active connections to detect leaks."""
    active_connections: int = 0
    cleaned_up: bool = False

    @classmethod
    def reset(cls):
        cls.active_connections = 0
        cls.cleaned_up = False


async def broken_stream_generator(tokens: List[str]) -> AsyncGenerator[str, None]:
    """BROKEN: Ignores cancellation and fails to clean up resources."""
    ResourceTracker.active_connections += 1
    for tok in tokens:
        await asyncio.sleep(0.01)
        yield tok
    # If cancelled mid-stream, this line is never reached!
    ResourceTracker.active_connections -= 1
    ResourceTracker.cleaned_up = True


async def fixed_stream_generator(tokens: List[str]) -> AsyncGenerator[str, None]:
    """FIXED: Uses try ... finally to guarantee resource release on client disconnect."""
    ResourceTracker.active_connections += 1
    try:
        for tok in tokens:
            await asyncio.sleep(0.01)
            yield tok
    except asyncio.CancelledError:
        # Client aborted connection
        raise
    finally:
        # Always runs, even on cancellation
        ResourceTracker.active_connections -= 1
        ResourceTracker.cleaned_up = True
