# Challenge 1: Why Did Everyone Try Again at Once?

> **For learners:** This is an optional pretend incident. No real service or account is involved. Try the small example first; ask a trusted adult before installing or running software.

---

## The mystery

Imagine 50 toy robots asking the same helper a question. The helper briefly says “too many questions!” Every robot waits exactly one second, then all ask again at once. The helper gets overwhelmed again.

In a real system this kind of pattern can happen when many programs retry after a temporary limit:
```http
HTTP/429 Too Many Requests
{
  "error": {
    "message": "Rate limit exceeded: Requests per minute (RPM) threshold breached.",
    "type": "requests_rate_limit"
  }
}
```

Instead of recovering after the brief hiccup, the pretend system keeps making the problem worse:
- PagerDuty sirens escalated to the VP of Engineering.
- The model provider's API metrics reported our production IP range sending thousands of requests per second in violent, cyclical bursts.
- Upstream automated abuse firewalls kicked in and permanently blacklisted our production CIDR block.
- Queue depth backed up to 142,000 unhandled jobs.

One engineer says:
> *"The provider is completely broken! Our code implements standard textbook exponential backoff ($2^{\text{attempt}}$ seconds). We wait 1s, 2s, 4s, 8s! It's mathematically impossible for us to be overloading them!"*

What do you think is missing? The wait gets longer, but the robots still wake up together.

---

## Watch the pattern

Look at what happens when 50 concurrent workers fail at time $T_0$:

```
Worker 01: Fails at T_0  ───(Sleep 2^0 = 1.0s)───> Fires at T_0 + 1.0s ───[COLLISION]
Worker 02: Fails at T_0  ───(Sleep 2^0 = 1.0s)───> Fires at T_0 + 1.0s ───[COLLISION]
...
Worker 50: Fails at T_0  ───(Sleep 2^0 = 1.0s)───> Fires at T_0 + 1.0s ───[COLLISION]
```

1. All robots receive the same “try later” message.
2. All wait for one second.
3. All wake up together and ask again.
4. The helper is still busy, so they all get “try later” again.

The fix is to add a little randomness to each robot's wait. Then they are less likely to arrive as one giant crowd. The technical name for this is **jitter**.

---

## The Physical Mechanism & Exploit

In `labs/lab_01_retry_storm/client.py`, look at the naive implementation:

```python
def broken_backoff(attempt: int, base: float = 1.0) -> float:
    # FLUID DYNAMICS COLLAPSE: Zero entropy.
    # Deterministic phase alignment guarantees synchronized thundering herd.
    return base * (2**attempt)
```

To break destructive resonance in physical systems, you must introduce **phase noise (entropy)**. 

### A possible fix: random waiting time
Rather than sleeping for the exact exponential interval, sleep for a uniformly distributed random interval between $0$ and the exponential ceiling:

$$\text{Delay} \sim \mathcal{U}\left(0, \min\left(\text{MaxBackoff}, \text{Base} \times 2^{\text{attempt}}\right)\right)$$

```python
def full_jitter_backoff(attempt: int, base: float = 1.0, max_backoff: float = 30.0) -> float:
    # FULL JITTER: Injects uniform entropy across [0, ceiling].
    # Completely de-correlates worker retry phases into a smooth Poisson process.
    ceiling = min(max_backoff, base * (2**attempt))
    return random.uniform(0.0, ceiling)
```

Try changing the code so each retry chooses a random wait between zero and its limit. Draw the possible wait times as dots on a number line. What changes when there are 50 robots?

This is one useful design, not the only possible design. Real systems also need a maximum wait, a maximum number of tries, and a way to give up politely.

---

## Check your idea

Validate the physics yourself. Run the test suite:

```bash
python3 labs/lab_01_retry_storm/test_lab01.py
```

If you run the optional tests, they compare the fixed wait with the random wait. Before looking at the answer, explain why identical wait times cause a crowd. Then try changing the number of robots or the maximum wait.

### What the optional tests check:
1. `test_broken_backoff_is_deterministic`: Proves that naive backoff returns identical sleep times for concurrent calls, proving the existence of the thundering herd condition.
2. `test_full_jitter_randomizes_intervals`: Proves that `full_jitter_backoff` generates high entropy across calls while strictly respecting the exponential ceiling ($0 \le \text{delay} \le 2^{\text{attempt}}$).
3. `test_retry_recovers_after_intermittent_failures`: Proves that a rate-limited client safely backs off, recovers state, and completes execution without dropping payloads.
