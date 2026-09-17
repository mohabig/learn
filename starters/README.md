# AI Systems Engineering Starter Scaffolding

> *"In production AI engineering, reliability beats vibes. Every system must be typed, measured, budget-fenced, and tested."*

This repository provides the production-grade foundation for the curriculum's core projects: Week 1 model APIs, Week 2 RAG services, Week 3 agent tool-servers, and the Capstone.

It eliminates boilerplate and enforces strict production invariants: **sub-millisecond latency telemetry**, **Server-Sent Events (SSE) token streaming**, **Pydantic v2 data validation contracts**, and **hard financial/loop circuit breakers** via `BudgetGuard`.

---

## Architecture Overview

```
starters/
├── app/
│   ├── __init__.py
│   └── main.py              # FastAPI service: SSE streaming, structured extraction, latency middleware
├── common/
│   ├── __init__.py
│   └── budget_guard.py      # Multi-provider cost engine, hard budget caps, loop fences, disk caching
├── tests/
│   ├── test_api.py          # FastClient integration tests for API endpoints & validation
│   └── test_budget_guard.py # Unit tests for pricing math, session limits, step fences, and disk cache
├── pyproject.toml           # Modern UV project specification with pytest & ruff configs
└── README.md
```

---

## 1. FastAPI Streaming & Structured Extraction Engine (`app/main.py`)

A battle-hardened asynchronous API built on modern Starlette and Pydantic primitives:

- **Server-Sent Events (SSE) Streaming (`POST /stream`)**: Uses `sse-starlette` and asynchronous generators to stream tokens chunk-by-chunk over a persistent HTTP connection.
- **Time-to-First-Token (TTFT) Instrumentation**: Tracks the exact millisecond delay between request arrival and the first emitted token chunk (`meta` event), exposing critical front-end responsiveness metrics before streaming token payloads.
- **Strictly Typed Extraction Contracts (`POST /extract`)**: Eliminates unvalidated string manipulation using Pydantic v2 models (`ExtractionRequest`, `ExtractedDocument`, `EntityItem`). Includes field validators ensuring zero whitespace-only titles and strictly bounded confidence scores (`0.0 <= score <= 1.0`).
- **Observability Middleware**: Custom HTTP middleware injects an `X-Response-Time-Ms` header into every outbound response, providing end-to-end wall-clock latency telemetry.
- **Live Health & Budget Telemetry (`GET /health`)**: Surfaces service health and real-time session/cumulative spending metrics directly from `BudgetGuard`.

---

## 2. BudgetGuard: The Financial & Execution Circuit Breaker (`common/budget_guard.py`)

Autonomous agent loops and automated eval runs can burn thousands of dollars in minutes if left unfenced. `BudgetGuard` is a zero-dependency, standard-library-only defense system:

### Core Capabilities
1. **Multi-Provider Real-Time Pricing Engine**:
   - Accurately computes costs across OpenAI (`gpt-4o-mini`, `gpt-4o`, `o3-mini`), Anthropic (`claude-3-5-haiku`, `claude-3-5-sonnet`, `claude-3-7-sonnet`), and Google Gemini (`gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-2.0-flash`).
   - Models standard input, output, and discounted prompt-cached token rates.
2. **Dual-Tier Hard Spending Caps**:
   - **Session Cap (default $2.00)**: Enforces limits per test run or server process lifetime.
   - **Cumulative Cap (default $50.00)**: Persists total spend across sessions in `~/.learn_budget_state.json`.
   - Automatically raises `BudgetExceededError` the instant a threshold is breached, terminating further network calls.
3. **Agent Loop Execution Fencing (`guard.step()`)**:
   - Protects multi-step autonomous agent loops from infinite recursive cycles.
   - Context manager `with guard.step("subtask_label"):` tracks execution iterations and throws `StepLimitExceededError` if iteration count exceeds `max_steps` (default 15).
4. **Deterministic Evaluation Disk Cache**:
   - Uses SHA-256 payload hashing (`prompt` + `model` + `params`) to cache raw model responses locally in `.cache/llm_eval/`.
   - Run multi-query eval benchmark suites 100 times during development for **$0.00** after the initial run.

---

## Actionable Quickstart with `uv`

Fast, reproducible dependency management using `uv`.

### 1. Synchronize the Environment
Install all core and development dependencies (`pytest`, `ruff`) instantly:

```bash
cd starters
uv sync --extra dev
```

### 2. Run the Test Suite
Execute unit and integration tests across both the API endpoints and the BudgetGuard safety module:

```bash
uv run pytest
```

### 3. Launch the Development Server
Start the FastAPI server with auto-reload:

```bash
uv run uvicorn starters.app.main:app --reload --port 8000
```

---

## Endpoint Verification with `curl`

### 1. Test Server-Sent Events (SSE) Streaming
Connect to the streaming endpoint with buffer-flushing enabled (`-N`):

```bash
curl -N -X POST http://localhost:8000/stream \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain RAG in two sentences", "model": "gpt-4o-mini"}'
```

**Streamed Response:**
```text
event: meta
data: {"ttft_ms": 41.25}

event: token
data: {"token": "In", "index": 0}

event: token
data: {"token": " modern", "index": 1}

...

event: done
data: {"total_tokens": 15, "total_duration_ms": 615.82}
```

### 2. Test Typed Structured Extraction
Validate JSON payload extraction and Pydantic schema contracts:

```bash
curl -i -X POST http://localhost:8000/extract \
  -H "Content-Type: application/json" \
  -d '{"text": "Apple announced the M4 Max chip during their keynote on 2026-09-17.", "model": "gpt-4o-mini"}'
```

Notice the `X-Response-Time-Ms` latency header in the response:
```http
HTTP/1.1 200 OK
content-type: application/json
x-response-time-ms: 1.42

{
  "title": "Apple announced the M4 Max chip during their keynote on 2026-",
  "summary": "Processed 72 characters of text.",
  "entities": [
    {"name": "Sample Organization", "category": "ORGANIZATION"},
    {"name": "2026-09-17", "category": "DATE"}
  ],
  "confidence_score": 0.96,
  "latency_ms": 1.15
}
```

### 3. Inspect Budget & Health Telemetry
Query real-time token spend and session metrics:

```bash
curl http://localhost:8000/health
```

```json
{
  "status": "ok",
  "budget": {
    "session": {
      "calls": 1,
      "input_tokens": 24,
      "output_tokens": 80,
      "cached_input_tokens": 0,
      "estimated_cost_usd": 0.000052
    },
    "total": {
      "calls": 1,
      "input_tokens": 24,
      "output_tokens": 80,
      "cached_input_tokens": 0,
      "estimated_cost_usd": 0.000052
    },
    "current_step": 0,
    "max_steps": 15
  }
}
```

---

## Using BudgetGuard in Your Own Code

Embed `BudgetGuard` directly into agentic workflows and evaluation scripts:

```python
from starters.common.budget_guard import BudgetGuard, BudgetExceededError, StepLimitExceededError

# Initialize with custom thresholds
guard = BudgetGuard(
    max_session_cost_usd=1.00,
    max_total_cost_usd=20.00,
    max_steps=10,
)

# 1. Protect agent loops from infinite recursion
try:
    for task in ["decompose", "search", "synthesize"]:
        with guard.step(label=task):
            # Execute step logic...
            pass
except StepLimitExceededError as err:
    print(f"Loop breaker triggered: {err}")

# 2. Record token usage and auto-halt on budget breach
try:
    guard.record_usage(
        model_name="claude-3-5-sonnet-latest",
        input_tokens=1500,
        output_tokens=400,
        cached_input_tokens=1000,
    )
except BudgetExceededError as err:
    print(f"Financial circuit breaker triggered: {err}")

# 3. Print usage summary
guard.print_summary()
```
