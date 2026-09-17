# Incident 04: The 4-Hour Zombie Memory & Socket Descriptor Leak

> **Severity:** P0 Infrastructure Outage / Resource Exhaustion  
> **Component:** Token Streaming Engine & Async Generator Lifecycle (`streamer.py`)  
> **Incident Tag:** `ERR_ASYNC_GENERATOR_ORPHAN_SOCKET_LEAK`  
> **Target:** Master async generator cancellation mechanics and enforce `try ... finally` lifecycle fencing.

---

## The Incident Report

At 02:40 AM on Sunday, Kubernetes triggers a node-wide alert:
```
Cluster Alert: Pod `stream-inference-worker-7f9a` terminated. Exit code 137 (OOMKilled).
Kernel log: Out of Memory: Kill process 1892 (uvicorn) score 942 or sacrifice child.
OS Error: OSError: [Errno 24] Too many open files.
```

The on-call SRE checks the Datadog traffic graphs:
- Total concurrent users across the entire platform: **only 14 active users**.
- Yet the pod's file descriptor count climbed monotonically over 4 hours until hitting the kernel limit (`ulimit -n 65535`).
- Memory consumption marched relentlessly from 250MB to 16GB.
- Network sockets were stranded by the thousands in `CLOSE_WAIT` and `FIN_WAIT_2` states.
- Every HTTP connection pool to our upstream model gateway was 100% saturated with orphaned, locked connections.

The backend developer argues:
> *"How can 14 users leak 65,000 sockets? Python has an automatic garbage collector with cyclic reference detection! All our streaming functions return when the generator finishes yielding tokens!"*

Here's the catch: in modern user interfaces, **generators almost never finish yielding tokens.**

---

## The Forensic Crime Scene: The Ghost Disconnect

Consider real human user behavior with streaming LLMs:
1. A user submits a query: *"Write a 2000-word essay on distributed consensus."*
2. The server spins up an async generator and begins streaming tokens over Server-Sent Events (SSE).
3. The user reads the first 4 words (*"Distributed consensus algorithms like..."*), realizes they made a typo in their prompt, and hits **Stop**, closes the browser tab, or navigates away.

What happens at the network protocol layer?
- The client browser abruptly tears down the TCP socket.
- The ASGI server (Uvicorn / Starlette) detects client disconnection on the next socket read/write.
- To prevent wasting compute on an abandoned connection, the ASGI event loop cancels the underlying task and calls `await generator.aclose()`.
- Python's runtime injects an `asyncio.CancelledError` into the generator at the exact line where it is currently suspended awaiting I/O.

Now look at the code in `labs/lab_04_stream_leak/streamer.py`:

```python
async def broken_stream_generator(tokens: List[str]) -> AsyncGenerator[str, None]:
    ResourceTracker.active_connections += 1
    for tok in tokens:
        await asyncio.sleep(0.01)  # <-- CancelledError IS INJECTED HERE!
        yield tok

    # DEAD CODE ZONE: This line is NEVER reached if client disconnects!
    ResourceTracker.active_connections -= 1
    ResourceTracker.cleaned_up = True
```

### The Anatomy of the Leak
When `CancelledError` fires at `await asyncio.sleep(0.01)`:
1. Python immediately halts execution of the coroutine and bubbles the exception up the stack.
2. The code positioned *after* the `for` loop is completely bypassed.
3. The connection counter is **never decremented**.
4. The upstream HTTP streaming session is **never closed**.
5. The socket descriptor remains permanently pinned in the kernel file table.
6. Multiply this across thousands of casual user interruptions throughout the day, and your server suffocates under a mountain of zombie connections.

---

## The Physical Mechanism & Exploit

To prevent resource leakage in asynchronous streaming pipelines, you must enforce **Generator Lifecycle Fencing**.

In Python, an asynchronous generator will raise `asyncio.CancelledError` (or `GeneratorExit`) when `aclose()` is invoked. The runtime guarantees that `finally:` blocks **always execute**, even during abrupt asynchronous task cancellation:

```python
async def fixed_stream_generator(tokens: List[str]) -> AsyncGenerator[str, None]:
    ResourceTracker.active_connections += 1
    try:
        for tok in tokens:
            await asyncio.sleep(0.01)
            yield tok
    except asyncio.CancelledError:
        # Re-raise so the ASGI server knows cancellation succeeded cleanly
        raise
    finally:
        # ABSOLUTE GUARANTEE: Executes on completion, error, or client disconnect!
        ResourceTracker.active_connections -= 1
        ResourceTracker.cleaned_up = True
```

### Critical Rules for Production Streaming Systems
1. **Never Place Teardown After a Yield Loop:** Any code written below a `yield` loop is untrusted optimistic code. Treat client disconnection as the default, expected lifecycle event, not an edge case.
2. **Always Use `try ... finally`:** Bind upstream HTTP clients (e.g. `httpx.AsyncClient`), file descriptors, and Redis locks inside `finally` blocks or async context managers (`async with`).
3. **Handle `GeneratorExit` & `asyncio.CancelledError`:** Allow cancellation exceptions to propagate cleanly to avoid holding ASGI worker processes in deadlock.

---

## Lab Verification

Run the test suite to observe the leak and its surgical neutralization:

```bash
python3 labs/lab_04_stream_leak/test_lab04.py
```

### What the Test Suite Asserts:
1. `test_broken_stream_leaks_on_cancellation`: Simulates a client disconnecting after consuming only 2 tokens. Asserts that `broken_stream_generator` leaves the resource pinned (`active_connections == 1`, `cleaned_up == False`).
2. `test_fixed_stream_cleans_up_on_cancellation`: Simulates the same sudden client abort against `fixed_stream_generator`. Asserts that the `finally:` block triggers immediately, restoring `active_connections == 0` and setting `cleaned_up == True`.
