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

Missing two or more? Spend 3–5 days on them first. Starting this plan without Python
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

## Week 1 — Model fluency
**Outcome: "I can make a model do what I want, reliably, cheaply, and I can prove the cost."**

### Day 1 — First principles calls
- [ ] Set up repo, `uv` env, API keys in env vars (never in code)
- [ ] Raw SDK: messages, system prompt, temperature, `max_tokens`, stop sequences
- [ ] Count tokens for input and output; compute exact cost per call
- [ ] Measure latency: time-to-first-token vs total
- [ ] **Build:** a CLI that takes a URL or file and returns a structured summary
- [ ] **Done when:** you can state, to the cent, what one run of your CLI costs and why

### Day 2 — Prompting that survives contact with users
- [ ] Few-shot examples, task decomposition, explicit output contracts, negative instructions
- [ ] When step-by-step reasoning helps and when it just burns tokens
- [ ] Prompts live in versioned files, not f-strings scattered through code
- [ ] **Build:** a prompt module + a 20-case input file you can run the same prompt across
- [ ] **Done when:** you can change a prompt and immediately see which of the 20 cases moved

### Day 3 — Structured output (the highest-ROI day of the week)
- [ ] JSON schema / tool-based structured outputs; Pydantic models as the contract
- [ ] Validation, retry-on-invalid, repair prompts, partial/streaming JSON
- [ ] **Build:** an extractor turning messy text (invoices, emails, resumes, job posts) into typed objects
- [ ] **Done when:** ≥95% of 50 real inputs parse into valid objects on the first or second attempt

### Day 4 — Long context and multimodal
- [ ] Images and PDFs as input; document understanding without a retrieval pipeline
- [ ] Context-window budgeting; prompt caching and what it does to cost
- [ ] When "just put the whole document in the prompt" beats RAG (more often than people admit)
- [ ] **Build:** PDF in → structured, cited summary out

### Day 5 — Cost, latency, streaming
- [ ] Stream tokens end-to-end (SSE) from a FastAPI endpoint to a client
- [ ] Model routing: cheap model first, escalate on low confidence or failure
- [ ] Prompt caching + a response cache; measure the hit rate
- [ ] **Build:** a streaming API endpoint with caching
- [ ] **Done when:** you have a table of p50/p95 latency and cost/request, cached vs uncached

### Day 6 — Failure modes
- [ ] Hallucination, truncation, refusal, rate limits, timeouts, provider outages
- [ ] Retries with exponential backoff + jitter, idempotency, circuit breaking, degraded responses
- [ ] **Build:** harden Day 5's service; deliberately break it (bad keys, huge inputs, network cuts)
- [ ] **Done when:** every failure path returns something useful instead of a stack trace

### Day 7 — SHIP #1
- [ ] Deploy the tool publicly. README with: what it does, architecture, cost/request, p95 latency
- [ ] Half day off. Rest is part of the plan; burnout on Day 19 costs more than a Sunday.

---

## Week 2 — Context engineering & RAG
**Outcome: "I can make a model answer from *my* data, and I can prove retrieval got better."**

### Day 8 — Embeddings from scratch, no vector DB
- [ ] Embeddings, cosine similarity, dimensionality, exact vs approximate nearest neighbour
- [ ] **Build:** a complete RAG system in ~200 lines with numpy and a list. No database.
- [ ] **Done when:** you can explain, without hand-waving, exactly what a vector DB is doing for you

### Day 9 — Ingestion and chunking
- [ ] Parsing PDF/HTML/Markdown/code; the parsing is usually the hard part, not the AI
- [ ] Chunk size and overlap; structural vs semantic chunking; keeping headings with content
- [ ] Metadata, stable document IDs, dedupe, incremental re-indexing
- [ ] **Build:** an ingestion pipeline over a corpus you genuinely care about (your notes, a codebase, a docs site, company policies)

### Day 10 — Retrieval that actually works
- [ ] Move into a real vector store; hybrid search (BM25 + dense) and why pure vector search fails on names, IDs, and rare terms
- [ ] Metadata filters, MMR/diversity, reranking, query rewriting and multi-query
- [ ] **Build:** upgrade Day 9 to hybrid + rerank
- [ ] **Done when:** you have before/after recall numbers, not a feeling

### Day 11 — Retrieval evaluation ⭐
- [ ] Hand-build a golden set: 30–50 questions with known correct source chunks
- [ ] Metrics: recall@k, MRR, faithfulness/groundedness, answer relevance
- [ ] Ragas or a hand-rolled harness — either is fine; understanding the metric is the point
- [ ] **Done when:** you can write a sentence like *"hybrid + rerank moved recall@5 from 0.62 → 0.84 on a 40-question golden set"*. That sentence is worth more in an interview than a month of tutorials.

### Day 12 — Generation over retrieved context
- [ ] Inline citations, grounding, refusing to answer outside the corpus
- [ ] Conflicting sources, stale sources, context ordering ("lost in the middle")
- [ ] **Build:** cited answers where every claim links to its source chunk

### Day 13 — RAG in production
- [ ] Freshness and re-index strategy; permissions and multi-tenancy (whose documents can this user see?)
- [ ] Index versioning and rollback; cost per query; latency budget across embed → search → rerank → generate
- [ ] **Build:** add auth + per-user document scoping

### Day 14 — SHIP #2
- [ ] Deploy the RAG app. README includes the eval table from Day 11.
- [ ] This is usually the strongest portfolio piece of the month. Treat it that way.

---

## Week 3 — Agents, tools, and evals
**Outcome: "My system can take actions, and I can prove it works before I ship a change."**

### Day 15 — Tool use
- [ ] Tool/function definitions, JSON schemas, tool choice, parallel tool calls
- [ ] Feeding results (and errors) back into the conversation
- [ ] **Build:** a 4-tool assistant — web search, calculator, SQL query, file write — with no framework

### Day 16 — The agent loop
- [ ] Plan → act → observe → repeat; termination conditions, step limits, budget limits
- [ ] State and memory: short-term (conversation) vs long-term (store); context compaction
- [ ] **When an agent is the wrong answer:** if you can draw the flowchart, write the flowchart. A deterministic pipeline with 3 LLM calls beats an agent for most tasks — cheaper, faster, testable.
- [ ] **Build:** a bounded agent that completes a genuinely multi-step task

### Day 17 — MCP and integrations
- [ ] Model Context Protocol: servers, tools, resources, transports; why a standard tool interface matters
- [ ] **Build:** an MCP server exposing your Week-2 RAG as a tool, connected to a real client
- [ ] **Done when:** you can query your own corpus from inside a coding agent or desktop client

### Day 18 — Evals I: the discipline ⭐⭐
- [ ] Why evals beat vibes; the three tiers: assertions/unit tests → LLM-as-judge → human review
- [ ] **Error analysis** — the actual skill: dump 50 failures, read them all, label them, cluster them, and let the clusters tell you what to fix. Most teams skip this and optimize the wrong thing.
- [ ] LLM-as-judge design: rubrics, pairwise comparison, position bias, and how you validate the judge against human labels
- [ ] Read Hamel Husain's writing on evals today, start to finish

### Day 19 — Evals II: build the harness
- [ ] Dataset → runner → judge → metrics → regression gate, wired into CI
- [ ] Per-commit scores; a regression fails the build
- [ ] **Build:** `make eval` runs against your agent *and* your RAG app
- [ ] **Done when:** deliberately worsening a prompt turns your CI red

### Day 20 — Guardrails and security
- [ ] **Prompt injection**, especially via retrieved documents and tool output — the #1 real-world AI security issue
- [ ] Data exfiltration paths, PII handling, output validation, allow-listed actions
- [ ] Sandboxing tool execution, human-in-the-loop for destructive/irreversible actions, rate limiting
- [ ] **Do:** spend two hours red-teaming your own Day 16 agent. Write down what worked.

### Day 21 — SHIP #3
- [ ] Public repo: agent + tools + eval suite + CI, with a "How I evaluate this" section in the README

---

## Week 4 — Production and proof

### Day 22 — Observability
- [ ] Trace every model call: inputs, outputs, tokens, cost, latency, tool calls, retries
- [ ] Dashboards for cost/day and p95 latency; capture user feedback signals (thumbs, corrections)
- [ ] Log safely — no secrets, no unredacted PII
- [ ] **Build:** instrument all three shipped projects with one tracing tool

### Day 23 — Fine-tuning, in exactly one day
- [ ] When it genuinely wins: fixed style/format, latency and cost at high volume, a narrow repeated task
- [ ] When it loses: knowledge injection (that's RAG), fast-changing data, small datasets, anything you haven't first tried to solve with a good prompt
- [ ] **Do:** run one small SFT/LoRA job on a hosted service and compare it head-to-head against your best prompt
- [ ] **The deliverable is the judgment**, and usually the honest conclusion is "prompt + RAG won." Being able to say that with data is a senior signal.

### Day 24 — Open models and serving
- [ ] Run a model locally (Ollama / llama.cpp); quantization tradeoffs
- [ ] vLLM basics, batching, KV cache — conceptually, not as an ops project
- [ ] When self-hosting is right: privacy/compliance, extreme volume, latency floors
- [ ] Timebox this hard. It's the biggest rabbit hole in the plan.

### Days 25–27 — CAPSTONE
- [ ] One product that uses everything: retrieval + tools/agent + evals + tracing + auth + deploy
- [ ] Scope rule: something **you would personally use every week**. Ship end of Day 27, no extensions.
- [ ] Suggested shapes: an assistant over your own domain's documents with actions attached; a workflow that replaces a recurring manual task; an internal tool for a niche you know well.

### Day 28 — Harden and measure
- [ ] Load test it. Record: cost per user, p95 latency, eval scores on the golden set, error rate
- [ ] Write a failure playbook: what breaks, how you'd know, what you'd do
- [ ] Fix the top two failure modes your evals surface

### Day 29 — Write it up
- [ ] A real write-up (blog post or a serious README): problem → architecture diagram → key tradeoffs → what failed and why → eval results → cost/latency numbers
- [ ] **This is the highest-leverage day of the month.** Hiring managers cannot see your skill; they can see whether you reason about tradeoffs. Most candidates ship code with no story. Ship the story.

### Day 30 — Position yourself
- [ ] Rewrite resume/LinkedIn around **shipped systems with numbers**, not tools listed
- [ ] Prep the 15 questions below until you can answer them cold
- [ ] Pick your next 30 days: depth (evals, retrieval quality, inference optimization) or breadth (a domain — legal, health, devtools, finance)
- [ ] Start talking to people: open-source PRs to AI tooling, one write-up shared publicly, five targeted applications

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
