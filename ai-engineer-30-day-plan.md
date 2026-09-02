# The 80/20 AI Engineer — a 30-Day Plan

> Start date: 2026-08-29 · Target: employable AI engineer in 30 days
> Method: find the ~20% of the field that produces ~80% of real-world results, and build in it every single day.

---

## 0. The reframe that saves you six months

**An AI engineer builds products on top of foundation models they did not train.**

That single sentence deletes most of the curriculum people think they need. You are not
becoming a researcher or an ML engineer. You are becoming the person who can take a
model that already exists and turn it into a system that is reliable, fast, cheap, safe,
and measurably good.

### The 20% that produces 80% of the value

| # | Skill | Why it's in the 20% |
|---|-------|---------------------|
| 1 | **Model API fluency** | Everything else sits on top of it. Tokens, cost, latency, streaming, structured output. |
| 2 | **Context engineering / RAG** | Most product value comes from getting *the right context* into the prompt, not from a better model. |
| 3 | **Tools & agent loops** | The difference between a chatbot and something that does work. |
| 4 | **Evaluation** | The actual moat. Nearly everyone ships on vibes; the people who can measure quality get hired and promoted. |
| 5 | **Production hardening** | Observability, cost control, latency budgets, prompt injection, graceful failure. |
| 6 | **One real shipped product** | Proof. Nobody hires from a certificate; they hire from a repo and a write-up. |

### The 80% you are deliberately skipping (for now)

- Backpropagation math, transformer internals from scratch, attention derivations
- Training loops, CUDA, distributed training, GPU cluster ops
- Fine-tuning as a first resort (you'll spend exactly one day on it, on purpose)
- Classical ML pipelines (sklearn, feature engineering, XGBoost)
- Building your own vector database or embedding model
- Reading the arXiv firehose
- Framework tourism — evaluating six agent frameworks before writing any code

None of this is worthless. All of it is a worse use of your next 30 days than the list above.
Revisit it in month 3, when you have a shipped system telling you which gap actually hurts.

---

## 1. Day 0 gate — prerequisites

You need these *before* Day 1. Be honest; the plan assumes them.

- [ ] **Python**: functions, classes, type hints, `async`/`await` basics, virtualenvs, `pytest`
- [ ] **HTTP & JSON**: REST, status codes, headers, auth tokens, env vars and secret hygiene
- [ ] **Git/GitHub**: branch, commit, push, PR, resolve a conflict
- [ ] **Terminal comfort**: you can debug an install failure without panicking
- [ ] **Reading docs**: you'd rather read the provider's API reference than watch a tutorial

Missing two or more? Start with Week 0 below — everything the gate checks is taught
there, and you take only the days you're missing. Starting this plan without Python
fluency is the single most common way it fails.

**Budget:** ~$50–100 of API credits across the 30 days. Iterate on small/cheap models,
verify on frontier models. Track spend from Day 1 — it's part of the curriculum.

---

## 2. Ground rules (these matter more than the syllabus)

1. **75% building, 25% reading.** Never read two days in a row without shipping code.
2. **Every day ends with a commit.** No exceptions, even if the day went badly.
3. **Timebox at 45 minutes.** Stuck longer than that? Ship the ugly version, note the debt, move on.
4. **One repo per weekly project, public.** Four public repos by Day 30.
5. **Write down numbers.** Cost per request, p95 latency, eval score. Numbers are what make you credible.
6. **No framework until you feel the pain it solves.** Raw SDK first for a full week. You'll understand every abstraction you later adopt.
7. **Full-time pace = 5–6 h/day.** Part-time (2–3 h/day) works too — see §8, it becomes ~55–60 days in the same order. Don't reorder it.

### Daily rhythm (5–6 h)

| Block | Time | What |
|-------|------|------|
| Read | 45 min | The day's concept, from primary docs. Not YouTube. |
| Build | 3 h | The day's deliverable. |
| Break it | 45 min | Adversarial pass — what input makes this fail? |
| Log | 30 min | Commit + 5 bullet notes in `LOG.md`: what worked, what surprised you, what's still fuzzy. |

That `LOG.md` becomes your Day 29 write-up. Start it on Day 1.

---

## 3. Pick your stack once, then stop shopping

| Layer | Choice | Note |
|-------|--------|------|
| Language | Python 3.11+, `uv` for envs | Node/TS is equally valid if that's your strength |
| Model provider | One primary (Anthropic or OpenAI), one secondary | The secondary teaches you portability |
| API access | Raw provider SDK | No LangChain in Week 1. Seriously. |
| Service | FastAPI | Streaming, async, easy deploy |
| Vector store | pgvector, Qdrant, or Chroma locally | Any of them. Do not spend a day comparing. |
| Tracing/evals | Langfuse **or** LangSmith **or** Braintrust | Pick one on Day 22 and commit |
| UI | Streamlit (or Next.js if you're already a frontend dev) | The UI is not the point |
| Deploy | Render / Fly.io / Railway / Vercel | Whatever deploys in under 20 minutes |

Add orchestration (LangGraph, LlamaIndex, Pydantic AI) **only** when you have personally
hit the problem it solves. That moment arrives around Day 16 for most people.

---

<!-- BEGIN GENERATED DAYS -->

<!-- Generated from site/course-data.js by scripts/build_plan.py — do not edit
     this region by hand. Edit the data file and run `make plan`. -->

## Week 0 — The base layer
*Days 0.1–0.5 · optional*

**Outcome: "I have the foundations the 30 days assume — or I've confirmed I already did."**

Run the Day 0 gate first. Everything it checks is taught here — skip any day you already pass, and do the ones you don't, in order. All five from zero is the 3–5 days the gate warned you about, at the normal daily rhythm.

### Day 0.1 — The terminal
- [ ] Navigate and manipulate files from the shell: paths, flags, pipes, redirection
- [ ] Read error messages top to bottom; `--help` and `man` before a search engine
- [ ] Understand `PATH` and environment variables — where "command not found" comes from
- [ ] **Build:** a drill — create a project tree, search it with `grep`/`find`, break an install on purpose and fix it
- [ ] **Done when:** You can debug an install failure without panicking.

### Day 0.2 — Python, the parts you'll use
- [ ] Functions, modules and imports, classes where they earn their place, comprehensions
- [ ] Type hints — and why they pay off the moment Pydantic arrives in Week 1
- [ ] Isolated environments with `uv`: create, install, freeze, delete
- [ ] **Build:** a small typed CLI that reads any text file and reports words, lines, and the ten most common tokens
- [ ] **Done when:** Fresh environment, one install command, and the CLI runs on the first try.

### Day 0.3 — Errors, async, and tests
- [ ] Exceptions raised and caught narrowly; context managers for cleanup
- [ ] `async`/`await`: what the event loop does, why it helps I/O and not math
- [ ] `pytest` basics: test functions, asserts, running one file
- [ ] **Build:** a downloader fetching ten URLs concurrently, with tests for the success and failure paths
- [ ] **Done when:** You can explain why the async version is faster, and both tests pass.

### Day 0.4 — HTTP, JSON, and secrets
- [ ] Request anatomy: method, path, headers, body; the status-code families
- [ ] JSON in and out of Python; where auth lives — bearer tokens and API keys
- [ ] Secret hygiene: env vars, `.env`, `.gitignore` — why keys never go in code
- [ ] **Build:** call a real public API with the key from an env var, handling 404 and 429 explicitly
- [ ] **Done when:** You can open a provider's API reference and know where the auth goes.

### Day 0.5 — Git, GitHub, and reading docs
- [ ] Commits as snapshots; branch, push, pull, and what a PR actually is
- [ ] Create a merge conflict on purpose and resolve it
- [ ] Documentation as a skill: reference vs guide; finding the answer faster than a video could
- [ ] **Build:** a practice repo with a branch, a PR, and one resolved conflict
- [ ] **Done when:** The word "conflict" no longer raises your pulse.

---

## Week 1 — Model fluency
*Days 1–7*

**Outcome: "I can make a model do what I want, reliably and cheaply — and prove exactly what it cost."**

### Day 1 — First-principles calls
- [ ] Set up the repo, a `uv` env, API keys in env vars — never in code
- [ ] Raw SDK: messages, system prompt, temperature, `max_tokens`, stop sequences
- [ ] Count input and output tokens; compute the exact cost of a call
- [ ] Measure latency: time-to-first-token vs total
- [ ] **Build:** a CLI that takes a URL or file and returns a structured summary
- [ ] **Done when:** You can state, to the cent, what one run of your CLI costs — and why.

### Day 2 — Prompting that survives contact with users
- [ ] Few-shot examples, task decomposition, explicit output contracts, negative instructions
- [ ] When step-by-step reasoning helps, and when it just burns tokens
- [ ] Prompts live in versioned files, not f-strings scattered through the code
- [ ] **Build:** a prompt module plus a 20-case input file you can run any prompt across
- [ ] **Done when:** You can change a prompt and immediately see which of the 20 cases moved.

### Day 3 — Structured output ⭐
- [ ] JSON schema / tool-based structured output, with Pydantic models as the contract
- [ ] Validation, retry-on-invalid, repair prompts, streaming partial JSON
- [ ] **Build:** an extractor turning messy text — invoices, emails, résumés, job posts — into typed objects
- [ ] **Done when:** At least 95% of 50 real inputs parse into valid objects on the first or second attempt.

### Day 4 — Long context and multimodal
- [ ] Images and PDFs as input; document understanding with no retrieval pipeline at all
- [ ] Context-window budgeting; prompt caching and what it does to cost
- [ ] When stuffing the whole document into the prompt beats RAG — more often than people admit
- [ ] **Build:** PDF in, structured cited summary out
- [ ] **Done when:** You can say which documents belong in the prompt and which need retrieval.

### Day 5 — Cost, latency, streaming
- [ ] Stream tokens end-to-end (SSE) from a FastAPI endpoint to a client
- [ ] Model routing: cheap model first, escalate on low confidence or failure
- [ ] Prompt caching plus a response cache — then measure the hit rate
- [ ] **Build:** a streaming API endpoint with caching
- [ ] **Done when:** You have a table of p50/p95 latency and cost per request, cached vs uncached.

### Day 6 — Failure modes
- [ ] Hallucination, truncation, refusal, rate limits, timeouts, provider outages
- [ ] Retries with exponential backoff and jitter, idempotency, circuit breaking, degraded responses
- [ ] **Build:** harden yesterday's service, then break it on purpose — bad keys, huge inputs, cut network
- [ ] **Done when:** Every failure path returns something useful instead of a stack trace.

### Day 7 — Ship #1
- [ ] Deploy the tool publicly
- [ ] README: what it does, architecture, cost per request, p95 latency
- [ ] Take a half day off — burnout on Day 19 costs more than a Sunday does
- [ ] **Done when:** A stranger can use it from a link, and read what it costs to run.

---

## Week 2 — Context engineering & RAG
*Days 8–14*

**Outcome: "I can make a model answer from my data — and prove that retrieval got better, not just different."**

### Day 8 — Embeddings from scratch, no database
- [ ] Embeddings, cosine similarity, dimensionality, exact vs approximate nearest neighbour
- [ ] **Build:** a complete RAG system in ~200 lines with numpy and a list. No vector database.
- [ ] **Done when:** You can explain, without hand-waving, exactly what a vector DB is doing for you.

### Day 9 — Ingestion and chunking
- [ ] Parsing PDF, HTML, Markdown, code — the parsing is usually the hard part, not the AI
- [ ] Chunk size and overlap; structural vs semantic chunking; keeping headings with their content
- [ ] Metadata, stable document IDs, dedupe, incremental re-indexing
- [ ] **Build:** an ingestion pipeline over a corpus you genuinely care about
- [ ] **Done when:** Re-running ingestion on a changed corpus updates only what changed.

### Day 10 — Retrieval that actually works
- [ ] Move into a real vector store
- [ ] Hybrid search (BM25 + dense) — and why pure vector search fails on names, IDs and rare terms
- [ ] Metadata filters, MMR/diversity, reranking, query rewriting and multi-query
- [ ] **Build:** upgrade yesterday's pipeline to hybrid plus a reranker
- [ ] **Done when:** You have before/after recall numbers, not a feeling.

### Day 11 — Retrieval evaluation ⭐
- [ ] Hand-build a golden set: 30–50 questions with known correct source chunks
- [ ] Metrics: recall@k, MRR, faithfulness/groundedness, answer relevance
- [ ] Ragas or a hand-rolled harness — understanding the metric is the point
- [ ] **Done when:** You can write: "hybrid + rerank moved recall@5 from 0.62 to 0.84 on a 40-question golden set." That sentence is worth more in an interview than a month of tutorials.

### Day 12 — Generation over retrieved context
- [ ] Inline citations, grounding, refusing to answer outside the corpus
- [ ] Conflicting sources, stale sources, context ordering and lost-in-the-middle
- [ ] **Build:** answers where every claim links back to its source chunk
- [ ] **Done when:** You can click any sentence in an answer through to the text it came from.

### Day 13 — RAG in production
- [ ] Freshness and re-index strategy; permissions and multi-tenancy — whose documents can this user see?
- [ ] Index versioning and rollback; cost per query
- [ ] Latency budget across embed → search → rerank → generate
- [ ] **Build:** add auth and per-user document scoping
- [ ] **Done when:** Two users with different permissions get different answers to the same question.

### Day 14 — Ship #2
- [ ] Deploy the RAG app
- [ ] README carries the Day 11 eval table
- [ ] Treat this one carefully — it's usually the strongest portfolio piece of the month
- [ ] **Done when:** The README leads with measured retrieval quality, not a feature list.

---

## Week 3 — Agents, tools and evals
*Days 15–21*

**Outcome: "My system can take actions — and I can prove it still works before I ship a change."**

### Day 15 — Tool use
- [ ] Tool definitions, JSON schemas, tool choice, parallel tool calls
- [ ] Feeding results — and errors — back into the conversation
- [ ] **Build:** a four-tool assistant (search, calculator, SQL query, file write) with no framework
- [ ] **Done when:** A tool that throws produces a recovery, not a crash.

### Day 16 — The agent loop
- [ ] Plan → act → observe → repeat; termination conditions, step limits, budget limits
- [ ] Memory: short-term conversation vs long-term store; context compaction
- [ ] **When an agent is the wrong answer:** if you can draw the flowchart, write the flowchart — a deterministic pipeline with three LLM calls is cheaper, faster and testable
- [ ] **Build:** a bounded agent that completes a genuinely multi-step task
- [ ] **Done when:** The agent can't loop forever, and you can say what it costs at worst.

### Day 17 — MCP and integrations
- [ ] Model Context Protocol: servers, tools, resources, transports — and why a standard tool interface matters
- [ ] **Build:** an MCP server exposing your week-2 RAG as a tool, connected to a real client
- [ ] **Done when:** You can query your own corpus from inside a coding agent or desktop client.

### Day 18 — Evals I — the discipline ⭐
- [ ] Why evals beat vibes; the three tiers — assertions, LLM-as-judge, human review
- [ ] **Error analysis, the actual skill:** dump 50 failures, read all of them, label them, cluster them, and let the clusters tell you what to fix. Most teams skip this and optimise the wrong thing.
- [ ] Judge design: rubrics, pairwise comparison, position bias, and validating the judge against human labels
- [ ] Read Hamel Husain's writing on evals today, start to finish
- [ ] **Done when:** You have a labelled taxonomy of how your own system fails, ranked by frequency.

### Day 19 — Evals II — build the harness ⭐
- [ ] Dataset → runner → judge → metrics → regression gate, wired into CI
- [ ] Per-commit scores; a regression fails the build
- [ ] **Build:** `make eval` that runs against your agent and your RAG app
- [ ] **Done when:** Deliberately worsening a prompt turns your CI red.

### Day 20 — Guardrails and security
- [ ] **Prompt injection**, especially through retrieved documents and tool output — the number-one real-world AI security issue
- [ ] Data exfiltration paths, PII handling, output validation, allow-listed actions
- [ ] Sandboxed tool execution, human-in-the-loop for irreversible actions, rate limiting
- [ ] **Do:** spend two hours red-teaming your own Day 16 agent, and write down what worked
- [ ] **Done when:** You have a document listing the attacks that worked and what you changed.

### Day 21 — Ship #3
- [ ] Public repo: agent, tools, eval suite, CI
- [ ] README includes a "How I evaluate this" section
- [ ] **Done when:** Someone can read your README and reproduce your eval scores.

---

## Week 4 — Production and proof
*Days 22–30*

**Outcome: "Everything I built is observable, measured, deployed, and explained well enough to hire me on."**

### Day 22 — Observability
- [ ] Trace every model call: inputs, outputs, tokens, cost, latency, tool calls, retries
- [ ] Dashboards for cost per day and p95 latency; capture user feedback signals
- [ ] Log safely — no secrets, no unredacted PII
- [ ] **Build:** instrument all three shipped projects with one tracing tool
- [ ] **Done when:** You can open a trace for any single request from the last week.

### Day 23 — Fine-tuning, in exactly one day
- [ ] When it genuinely wins: fixed style or format, latency and cost at high volume, a narrow repeated task
- [ ] When it loses: knowledge injection (that's RAG), fast-changing data, small datasets, anything you haven't first tried to solve with a good prompt
- [ ] **Do:** run one small SFT/LoRA job on a hosted service and compare it head-to-head against your best prompt
- [ ] **Done when:** You can defend the choice with data — and the honest answer is usually "prompt + RAG won", which is itself a senior signal.

### Day 24 — Open models and serving
- [ ] Run a model locally (Ollama or llama.cpp); quantisation tradeoffs
- [ ] vLLM, batching, KV cache — conceptually, not as an ops project
- [ ] When self-hosting is right: privacy and compliance, extreme volume, latency floors
- [ ] Timebox this hard. It's the biggest rabbit hole in the plan.
- [ ] **Done when:** You can say, in two sentences, when you'd self-host and when you wouldn't.

### Days 25–27 — Capstone
- [ ] One product using everything: retrieval + tools/agent + evals + tracing + auth + deploy
- [ ] Scope rule: something **you would personally use every week**
- [ ] Shapes that work: an assistant over your own domain's documents with actions attached; a workflow replacing a recurring manual task; an internal tool for a niche you know well
- [ ] Ship at the end of Day 27. No extensions.
- [ ] **Done when:** It's deployed and you've used it yourself for something real.

### Day 28 — Harden and measure
- [ ] Load test it; record cost per user, p95 latency, eval scores on the golden set, error rate
- [ ] Write a failure playbook: what breaks, how you'd know, what you'd do
- [ ] Fix the top two failure modes your evals surface
- [ ] **Done when:** Every number in the README came from a measurement, not an estimate.

### Day 29 — Write it up ⭐
- [ ] Problem → architecture diagram → key tradeoffs → what failed and why → eval results → cost and latency
- [ ] **The highest-leverage day of the month.** Hiring managers cannot see your skill; they can see whether you reason about tradeoffs. Most candidates ship code with no story — ship the story.
- [ ] **Done when:** A stranger reads it and understands both what you built and why you built it that way.

### Day 30 — Position yourself
- [ ] Rewrite résumé and LinkedIn around shipped systems with numbers, not tools listed
- [ ] Drill the 15 questions until you can answer them cold
- [ ] Choose the next 30 days: depth (evals, retrieval quality, inference optimisation) or a domain (legal, health, devtools, finance)
- [ ] Start talking to people: one public write-up, one open-source PR to AI tooling, five targeted applications
- [ ] **Done when:** Someone who has never met you can tell, in 60 seconds, that you ship AI systems.

<!-- END GENERATED DAYS -->

---

## 4. The 15 questions you must be able to answer cold

If a question here makes you uncomfortable, that's your next study session.

1. RAG vs fine-tuning vs a longer prompt — how do you choose?
2. How do you chunk documents, and why that size?
3. What does hybrid search fix that dense-only retrieval can't?
4. What's a reranker, where does it sit, and what does it cost you in latency?
5. How do you evaluate a RAG system? Which metrics, and how did you build the golden set?
6. LLM-as-judge: how do you know the judge itself is any good?
7. How do you stop prompt injection arriving through retrieved documents or tool output?
8. What's your p95 latency, and where exactly does the time go?
9. Break down your cost per request.
10. When is an agent the wrong architecture?
11. What happens when the model returns invalid JSON?
12. What does prompt caching change about how you structure a prompt?
13. How do you version prompts and roll back a quality regression?
14. What breaks when you swap model providers?
15. How do you decide something is good enough to ship, without vibes?

---

## 5. Portfolio bar (what "done" looks like on Day 30)

Four public repos — three weekly ships plus the capstone. Each README contains:

- The problem, in one paragraph, for a non-expert
- An architecture diagram (a Mermaid block is fine)
- **Eval results with numbers**
- Cost per request and p95 latency
- Known failure modes and what you'd do with another week
- A live link

Plus one write-up (Day 29) that a stranger can read and conclude: *this person has actually shipped.*

---

## 6. Weekly checkpoints

| End of | You can... | Red flag if... |
|--------|-----------|----------------|
| Week 1 | State the cost and p95 latency of any call you make; get reliable structured output | You're still copy-pasting into a chat UI to test prompts |
| Week 2 | Improve retrieval and *measure* the improvement | You have a RAG demo but no golden set |
| Week 3 | Fail your own CI by making the prompt worse | Your agent works "usually" and you can't quantify "usually" |
| Week 4 | Explain every architectural tradeoff you made and why | Your README is `pip install -r requirements.txt` |

---

## 7. The short resource list (one per category — resist adding more)

- **Book:** *AI Engineering* — Chip Huyen (O'Reilly). The one book that matches this job title.
- **Provider docs:** your primary provider's API docs, read properly, including the prompting and tool-use guides. `docs.claude.com` / `platform.openai.com`.
- **Evals:** Hamel Husain — `hamel.dev`. Read the eval and error-analysis posts twice.
- **Field awareness:** Simon Willison — `simonwillison.net`. Best signal-to-noise on what actually changed this week.
- **RAG evaluation:** Ragas docs — `docs.ragas.io`.
- **Tracing:** Langfuse / LangSmith / Braintrust docs — whichever you picked.
- **Protocol:** MCP spec — `modelcontextprotocol.io`.
- **Cookbooks:** your provider's official cookbook repo, for patterns you can lift directly.

That's the list. Adding a ninth resource does not make you an AI engineer faster; it's the
most comfortable way to avoid building.

---

## 8. Variants

### Part-time (2–3 h/day, ~55–60 days)
Same order, same deliverables. Do one day's *reading* block in the evening and the *build*
block the next session. Protect the ship days (7, 14, 21, 27) — they're where the learning consolidates.

### If you only have 10 days
Days 1, 2, 3, 5 → 8, 9, 10, 11 → 15, 18/19 merged. You get: reliable structured output,
a measured RAG system, tool use, and an eval harness. Skip agents-in-depth, fine-tuning,
open models, and the capstone. Ship one project instead of four.

### If you already write production backend code
Compress Week 1 to three days (Days 2, 3, 5) and spend the recovered time on Days 11, 18,
and 19. Evals and retrieval quality are where experienced engineers still have the biggest gap.

---

## 9. Honest expectations

Thirty focused days gets you to **junior-to-mid AI engineer, employable, with proof** —
someone who can own an LLM feature end to end. It does not make you a senior AI engineer;
that comes from production incidents, real users, and scale, which take months you can't
compress. Anyone selling the second outcome in 30 days is selling something.

What this plan really buys you is the thing that compounds: you'll have shipped four
systems, measured them, and broken them on purpose. From there, every new model release
and every new tool is a small delta on a foundation you already own — instead of another
thing you feel behind on.

Start today. Day 1 is a CLI that summarizes a file. Go.
