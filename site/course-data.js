/* ---------------------------------------------------------------------------
   course-data.js — the single source of truth for the 30-day checklist.

   Both the site (site/index.html) and the markdown plan
   (ai-engineer-30-day-plan.md, via scripts/build_plan.py) read the day
   titles, tasks and "Done when" lines from here. Edit this file, run
   `make plan`, and the two stay in step.

   It is a .js file rather than .json on purpose: the site has to work when
   index.html is opened straight off disk as a file:// URL, where fetch() of
   a sibling JSON file is blocked but a classic <script src> still loads.
   Everything after the `=` is strict JSON so scripts/build_plan.py can parse
   it without a JavaScript engine — keep it that way.

   Task text may contain the inline HTML the site renders (<b>, <code>,
   <i>) plus HTML entities; build_plan.py converts those to markdown.

   Fields per week:
     n        week number
     title    week title
     range    the day range, shown under the heading in the markdown plan
     outcome  the one-sentence outcome for the week
     note     optional preamble paragraph, used by the markdown plan only
     days     the days in the week

   Fields per day:
     d        day number as shown ("0.1", "7", "25–27" with an en dash)
     t        title
     tasks    checklist items, in order
     done     the "Done when" sentence, used verbatim in both outputs
     lever    true to flag a high-leverage day
     ship     true to flag a ship day
     rounds   how many 90-minute rounds the day holds (the article in index.html has the same
              number of <section class="round"> blocks; tasks holds one item per round, then
              one "Teach it back" item)
   --------------------------------------------------------------------------- */

window.COURSE_WEEKS =
[
  {
    "n": 0,
    "title": "The base layer",
    "range": "Days 0.1–0.5 · optional",
    "outcome": "I have the basics the rest of the course assumes, or I have checked that I already did.",
    "note": "Take the check on the Overview first. Everything on it is taught here, so skip any day you already pass and do the ones you don't, in order. From zero, all five days take about a week and a half at 3 hours a day.",
    "days": [
      {
        "d": "0.1",
        "t": "The terminal",
        "rounds": 3,
        "tasks": [
          "<b>Round 1 — the shell loop:</b> navigate using <code>pwd</code>, <code>cd</code>, and <code>ls</code>; create files with spaces in the name; try one command without quotes and one with quotes",
          "<b>Round 2 — streams and pipes:</b> build a pipeline that searches, sorts, counts, and filters results; use redirection to save output and errors to different files",
          "<b>Round 3 — PATH and errors:</b> break a command by removing its directory from PATH; read the error message from the top; identify the failure type and fix it",
          "<b>Teach it back:</b> explain the shell loop, the three streams, and how errors flow in a pipeline, in your own words with no \"basically\""
        ],
        "done": "You can debug an install failure without panicking.",
        "week": 0
      },
      {
        "d": "0.2",
        "t": "Python, the parts you'll use",
        "tasks": [
          "Functions, modules and imports, classes where they earn their place, comprehensions",
          "Type hints — and why they pay off the moment Pydantic arrives in Week 1",
          "Isolated environments with <code>uv</code>: create, install, freeze, delete",
          "<b>Build:</b> a small typed CLI that reads any text file and reports words, lines, and the ten most common tokens"
        ],
        "done": "Fresh environment, one install command, and the CLI runs on the first try."
      },
      {
        "d": "0.3",
        "t": "Errors, async, and tests",
        "tasks": [
          "Exceptions raised and caught narrowly; context managers for cleanup",
          "<code>async</code>/<code>await</code>: what the event loop does, why it helps I/O and not math",
          "<code>pytest</code> basics: test functions, asserts, running one file",
          "<b>Build:</b> a downloader fetching ten URLs concurrently, with tests for the success and failure paths"
        ],
        "done": "You can explain why the async version is faster, and both tests pass."
      },
      {
        "d": "0.4",
        "t": "HTTP, JSON, and secrets",
        "tasks": [
          "Request anatomy: method, path, headers, body; the status-code families",
          "JSON in and out of Python; where auth lives — bearer tokens and API keys",
          "Secret hygiene: env vars, <code>.env</code>, <code>.gitignore</code> — why keys never go in code",
          "<b>Build:</b> call a real public API with the key from an env var, handling 404 and 429 explicitly"
        ],
        "done": "You can open a provider's API reference and know where the auth goes."
      },
      {
        "d": "0.5",
        "t": "Git, GitHub, and reading docs",
        "tasks": [
          "Commits as snapshots; branch, push, pull, and what a PR actually is",
          "Create a merge conflict on purpose and resolve it",
          "Documentation as a skill: reference vs guide; finding the answer faster than a video could",
          "<b>Build:</b> a practice repo with a branch, a PR, and one resolved conflict"
        ],
        "done": "The word \"conflict\" no longer raises your pulse."
      }
    ]
  },
  {
    "n": 1,
    "title": "Model fluency",
    "range": "Days 1–7",
    "outcome": "I can make a model do what I want, reliably and cheaply — and prove exactly what it cost.",
    "days": [
      {
        "d": "1",
        "t": "First-principles calls",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — the workbench:</b> one folder under git, one <code>uv</code> environment, your key in <code>.env</code> (ignored by git), and one working call that prints a reply",
          "<b>Round 2 — tokens and the call:</b> a command-line tool that turns a URL or file into capped text and asks for a title, three bullets and one question",
          "<b>Round 3 — the bill:</b> cost printed to the cent on every run, plus the stop reason, logged for five different inputs",
          "<b>Round 4 — the clocks:</b> first-token time and total time measured on every run, the temperature experiment written down, and a commit",
          "<b>Teach it back:</b> explain today out loud in your own words, with no “basically”"
        ],
        "done": "You can say, to the cent, what one run of your tool costs — and why."
      },
      {
        "d": "2",
        "t": "Prompting that survives contact with users",
        "tasks": [
          "Few-shot examples, task decomposition, explicit output contracts, negative instructions",
          "When step-by-step reasoning helps, and when it just burns tokens",
          "Prompts live in versioned files, not f-strings scattered through the code",
          "<b>Build:</b> a prompt module plus a 20-case input file you can run any prompt across"
        ],
        "done": "You can change a prompt and immediately see which of the 20 cases moved."
      },
      {
        "d": "3",
        "t": "Structured output",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — why JSON fails:</b> pick a document type, write a tiny JSON Schema, make one call with schema enforcement, get back valid JSON",
          "<b>Round 2 — Pydantic models:</b> write a Pydantic model with 6–12 fields, use it to parse one real example, show it does all three jobs",
          "<b>Round 3 — validate and repair:</b> add a validation loop, repair once on failure with the error message, cap at two attempts, log every field that fails",
          "<b>Round 4 — the full build:</b> extract 50 real inputs, log results, iterate until 95% parse first or second attempt, test edge cases, commit",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "At least 95% of 50 real inputs parse into valid objects on the first or second attempt.",
        "lever": true,
        "week": 1
      },
      {
        "d": "4",
        "t": "Long context and multimodal",
        "tasks": [
          "Images and PDFs as input; document understanding with no retrieval pipeline at all",
          "Context-window budgeting; prompt caching and what it does to cost",
          "When stuffing the whole document into the prompt beats RAG — more often than people admit",
          "<b>Build:</b> PDF in, structured cited summary out"
        ],
        "done": "You can say which documents belong in the prompt and which need retrieval."
      },
      {
        "d": "5",
        "t": "Cost, latency, streaming",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — stream end-to-end:</b> a streaming endpoint that yields chunks as SSE events, with a client that measures time to first chunk and last chunk",
          "<b>Round 2 — two caches:</b> a response cache keyed on input + params, plus prompt caching enabled, both logged, with a 30% hit rate test",
          "<b>Round 3 — route cheap first:</b> small model first with a mechanical check, escalate on failure, log which path each request took",
          "<b>Round 4 — measure P95:</b> 100 requests logged for latency, cache status, routing decision; compute P50 and P95 for all, hits, small model, and escalated",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "You have a table of P50 and P95 latency by category, a response cache hit rate, and a routing escalation rate."
      },
      {
        "d": "6",
        "t": "Failure modes",
        "tasks": [
          "Hallucination, truncation, refusal, rate limits, timeouts, provider outages",
          "Retries with exponential backoff and jitter, idempotency, circuit breaking, degraded responses",
          "<b>Build:</b> harden yesterday's service, then break it on purpose — bad keys, huge inputs, cut network"
        ],
        "done": "Every failure path returns something useful instead of a stack trace."
      },
      {
        "d": "7",
        "t": "Ship #1",
        "rounds": 2,
        "tasks": [
          "<b>Round 1 — four things change:</b> live URL with key in secret store, rate limit set, spend ceiling set, tested from a different network",
          "<b>Round 2 — tell it with numbers:</b> README with six sections and a table of real runs from the live URL",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "A stranger can use it from a link, and read what it costs to run.",
        "ship": true
      }
    ]
  },
  {
    "n": 2,
    "title": "Context engineering &amp; RAG",
    "range": "Days 8–14",
    "outcome": "I can make a model answer from my data — and prove that retrieval got better, not just different.",
    "days": [
      {
        "d": "8",
        "t": "Embeddings from scratch, no database",
        "tasks": [
          "Embeddings, cosine similarity, dimensionality, exact vs approximate nearest neighbour",
          "<b>Build:</b> a complete RAG system in ~200 lines with numpy and a list. No vector database."
        ],
        "done": "You can explain, without hand-waving, exactly what a vector DB is doing for you."
      },
      {
        "d": "9",
        "t": "Ingestion and chunking",
        "tasks": [
          "Parsing PDF, HTML, Markdown, code — the parsing is usually the hard part, not the AI",
          "Chunk size and overlap; structural vs semantic chunking; keeping headings with their content",
          "Metadata, stable document IDs, dedupe, incremental re-indexing",
          "<b>Build:</b> an ingestion pipeline over a corpus you genuinely care about"
        ],
        "done": "Re-running ingestion on a changed corpus updates only what changed."
      },
      {
        "d": "10",
        "t": "Retrieval that actually works",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — vector store:</b> your chunks live in a real database with metadata and identifiers, and re-running ingestion updates instead of duplicating",
          "<b>Round 2 — hybrid search:</b> both dense and BM25 search working on the same corpus, and ten queries where keyword wins",
          "<b>Round 3 — fusion:</b> top fifty results fused by reciprocal rank, then reranked to five, with the reranker timing logged",
          "<b>Round 4 — build it:</b> the full hybrid pipeline called as one function, before-and-after recall numbers on five test queries",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "You have before-and-after recall numbers, not a feeling.",
        "week": 2
      },
      {
        "d": "11",
        "t": "Retrieval evaluation",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 &mdash; build truth:</b> a <code>golden.jsonl</code> file holding 40 questions with their labeled chunk identifiers, including five questions the corpus cannot answer",
          "<b>Round 2 &mdash; measure retrieval:</b> a runner that scores recall@k at k of 1, 5, 10, 20 for three retrievers in one table",
          "<b>Round 3 &mdash; position matters:</b> add MRR to the table and run faithfulness over 20 answers with a judge model",
          "<b>Round 4 &mdash; the sentence:</b> the complete harness, table of all metrics, ten worst failures labeled, and one sentence you can defend",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "You can write: &ldquo;hybrid plus rerank moved recall@5 from 0.62 to 0.84 on a 40-question golden set.&rdquo; That sentence is worth more in an interview than a month of tutorials.",
        "lever": true
      },
      {
        "d": "12",
        "t": "Generation over retrieved context",
        "tasks": [
          "Inline citations, grounding, refusing to answer outside the corpus",
          "Conflicting sources, stale sources, context ordering and lost-in-the-middle",
          "<b>Build:</b> answers where every claim links back to its source chunk"
        ],
        "done": "You can click any sentence in an answer through to the text it came from."
      },
      {
        "d": "13",
        "t": "RAG in production",
        "tasks": [
          "Freshness and re-index strategy; permissions and multi-tenancy — whose documents can this user see?",
          "Index versioning and rollback; cost per query",
          "Latency budget across embed → search → rerank → generate",
          "<b>Build:</b> add auth and per-user document scoping"
        ],
        "done": "Two users with different permissions get different answers to the same question."
      },
      {
        "d": "14",
        "t": "Ship #2",
        "ship": true,
        "tasks": [
          "Deploy the RAG app",
          "README carries the Day 11 eval table",
          "Treat this one carefully — it's usually the strongest portfolio piece of the month"
        ],
        "done": "The README leads with measured retrieval quality, not a feature list."
      }
    ]
  },
  {
    "n": 3,
    "title": "Agents, tools and evals",
    "range": "Days 15–21",
    "outcome": "My system can take actions — and I can prove it still works before I ship a change.",
    "days": [
      {
        "d": "15",
        "t": "Tool use",
        "tasks": [
          "Tool definitions, JSON schemas, tool choice, parallel tool calls",
          "Feeding results — and errors — back into the conversation",
          "<b>Build:</b> a four-tool assistant (search, calculator, SQL query, file write) with no framework"
        ],
        "done": "A tool that throws produces a recovery, not a crash."
      },
      {
        "d": "16",
        "t": "The agent loop",
        "tasks": [
          "Plan → act → observe → repeat; termination conditions, step limits, budget limits",
          "Memory: short-term conversation vs long-term store; context compaction",
          "<b>When an agent is the wrong answer:</b> if you can draw the flowchart, write the flowchart — a deterministic pipeline with three LLM calls is cheaper, faster and testable",
          "<b>Build:</b> a bounded agent that completes a genuinely multi-step task"
        ],
        "done": "The agent can't loop forever, and you can say what it costs at worst."
      },
      {
        "d": "17",
        "t": "MCP and integrations",
        "tasks": [
          "Model Context Protocol: servers, tools, resources, transports — and why a standard tool interface matters",
          "<b>Build:</b> an MCP server exposing your week-2 RAG as a tool, connected to a real client"
        ],
        "done": "You can query your own corpus from inside a coding agent or desktop client."
      },
      {
        "d": "18",
        "t": "Evals I — the discipline",
        "lever": true,
        "tasks": [
          "Why evals beat vibes; the three tiers — assertions, LLM-as-judge, human review",
          "<b>Error analysis, the actual skill:</b> dump 50 failures, read all of them, label them, cluster them, and let the clusters tell you what to fix. Most teams skip this and optimise the wrong thing.",
          "Judge design: rubrics, pairwise comparison, position bias, and validating the judge against human labels",
          "Read Hamel Husain's writing on evals today, start to finish"
        ],
        "done": "You have a labelled taxonomy of how your own system fails, ranked by frequency."
      },
      {
        "d": "19",
        "t": "Evals II — build the harness",
        "lever": true,
        "tasks": [
          "Dataset → runner → judge → metrics → regression gate, wired into CI",
          "Per-commit scores; a regression fails the build",
          "<b>Build:</b> <code>make eval</code> that runs against your agent and your RAG app"
        ],
        "done": "Deliberately worsening a prompt turns your CI red."
      },
      {
        "d": "20",
        "t": "Guardrails and security",
        "tasks": [
          "<b>Prompt injection</b>, especially through retrieved documents and tool output — the number-one real-world AI security issue",
          "Data exfiltration paths, PII handling, output validation, allow-listed actions",
          "Sandboxed tool execution, human-in-the-loop for irreversible actions, rate limiting",
          "<b>Do:</b> spend two hours red-teaming your own Day 16 agent, and write down what worked"
        ],
        "done": "You have a document listing the attacks that worked and what you changed."
      },
      {
        "d": "21",
        "t": "Ship #3",
        "ship": true,
        "tasks": [
          "Public repo: agent, tools, eval suite, CI",
          "README includes a \"How I evaluate this\" section"
        ],
        "done": "Someone can read your README and reproduce your eval scores."
      }
    ]
  },
  {
    "n": 4,
    "title": "Production and proof",
    "range": "Days 22–30",
    "outcome": "Everything I built is observable, measured, deployed, and explained well enough to hire me on.",
    "days": [
      {
        "d": "22",
        "t": "Observability",
        "tasks": [
          "Trace every model call: inputs, outputs, tokens, cost, latency, tool calls, retries",
          "Dashboards for cost per day and p95 latency; capture user feedback signals",
          "Log safely — no secrets, no unredacted PII",
          "<b>Build:</b> instrument all three shipped projects with one tracing tool"
        ],
        "done": "You can open a trace for any single request from the last week."
      },
      {
        "d": "23",
        "t": "Fine-tuning, in exactly one day",
        "tasks": [
          "When it genuinely wins: fixed style or format, latency and cost at high volume, a narrow repeated task",
          "When it loses: knowledge injection (that's RAG), fast-changing data, small datasets, anything you haven't first tried to solve with a good prompt",
          "<b>Do:</b> run one small SFT/LoRA job on a hosted service and compare it head-to-head against your best prompt"
        ],
        "done": "You can defend the choice with data — and the honest answer is usually \"prompt + RAG won\", which is itself a senior signal."
      },
      {
        "d": "24",
        "t": "Open models and serving",
        "tasks": [
          "Run a model locally (Ollama or llama.cpp); quantisation tradeoffs",
          "vLLM, batching, KV cache — conceptually, not as an ops project",
          "When self-hosting is right: privacy and compliance, extreme volume, latency floors",
          "Timebox this hard. It's the biggest rabbit hole in the plan."
        ],
        "done": "You can say, in two sentences, when you'd self-host and when you wouldn't."
      },
      {
        "d": "25–27",
        "t": "Capstone",
        "ship": true,
        "tasks": [
          "One product using everything: retrieval + tools/agent + evals + tracing + auth + deploy",
          "Scope rule: something <b>you would personally use every week</b>",
          "Shapes that work: an assistant over your own domain's documents with actions attached; a workflow replacing a recurring manual task; an internal tool for a niche you know well",
          "Ship at the end of Day 27. No extensions."
        ],
        "done": "It's deployed and you've used it yourself for something real."
      },
      {
        "d": "28",
        "t": "Harden and measure",
        "tasks": [
          "Load test it; record cost per user, p95 latency, eval scores on the golden set, error rate",
          "Write a failure playbook: what breaks, how you'd know, what you'd do",
          "Fix the top two failure modes your evals surface"
        ],
        "done": "Every number in the README came from a measurement, not an estimate."
      },
      {
        "d": "29",
        "t": "Write it up",
        "lever": true,
        "tasks": [
          "Problem → architecture diagram → key tradeoffs → what failed and why → eval results → cost and latency",
          "<b>The highest-leverage day of the month.</b> Hiring managers cannot see your skill; they can see whether you reason about tradeoffs. Most candidates ship code with no story — ship the story."
        ],
        "done": "A stranger reads it and understands both what you built and why you built it that way."
      },
      {
        "d": "30",
        "t": "Position yourself",
        "tasks": [
          "Rewrite résumé and LinkedIn around shipped systems with numbers, not tools listed",
          "Drill the 15 questions until you can answer them cold",
          "Choose the next 30 days: depth (evals, retrieval quality, inference optimisation) or a domain (legal, health, devtools, finance)",
          "Start talking to people: one public write-up, one open-source PR to AI tooling, five targeted applications"
        ],
        "done": "Someone who has never met you can tell, in 60 seconds, that you ship AI systems."
      }
    ]
  }
];
