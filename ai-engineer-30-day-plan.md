# The 80/20 AI Engineer — a 3-month plan

> Start date: 2026-09-28 · Target: employable AI engineer in 3 months
> Method: find the ~20% of the field that produces ~80% of real-world results, and build in it every single day.

---

## 0. The reframe that saves you months

**An AI engineer builds products on top of foundation models they did not train.**

That one sentence cuts out most of what people think they need to learn. You are not becoming a researcher or an ML engineer. You are becoming the person who takes a model that already exists and turns it into something that is reliable, fast, cheap, safe, and measurably good.

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

None of this is worthless. All of it is a worse use of your next three months than the list above. Come back to it in month four, when you have a shipped system that tells you what actually needs fixing.

---

## 1. Day 0 gate — prerequisites

You need these before Day 1. Be honest about them; the plan assumes you have them.

- [ ] **Python**: functions, classes, type hints, `async`/`await` basics, virtualenvs, `pytest`
- [ ] **HTTP & JSON**: REST, status codes, headers, auth tokens, env vars and secret hygiene
- [ ] **Git/GitHub**: branch, commit, push, PR, resolve a conflict
- [ ] **Terminal comfort**: you can debug an install failure without panicking
- [ ] **Reading docs**: you'd rather read the provider's API reference than watch a tutorial

Missing two or more? Start with Week 0 below. Everything the gate checks is taught there. Take only the days you don't pass, in order. Starting this plan without Python is the single most common way it fails.

**Budget:** ~$50–100 of API credits across the three months. Iterate on small/cheap models, verify on frontier models. Track spend from Day 1. It's part of the curriculum.

---

## 2. Ground rules (these matter more than the syllabus)

1. **75% building, 25% reading.** Never read two rounds in a row without shipping code.
2. **Every study day ends with a commit.** No exceptions, even if it went badly.
3. **Stuck for 10 minutes? Open a hint. Stuck for 45? Ship the ugly version.** Write down what is missing and move on.
4. **One repo per weekly ship, public.** Four public repos by the end.
5. **Write down numbers.** Cost per request, latency, eval score. Numbers are what make you credible.
6. **No framework until you feel the pain it solves.** Raw SDK first for a full week. You'll understand every abstraction you later adopt.
7. **The error log is how you learn from mistakes.** Every round, four questions: what did you get wrong, why, which idea were you missing, how will you spot it next time. It takes two minutes. It removes a whole family of future mistakes.
8. **Keep `LOG.md`.** Six lines a day: built, worked, surprised me, still fuzzy, mistakes I studied, numbers. It becomes your Day 29 write-up.
9. **The second round makes the first one stick.** Sleep between the second and third rounds. That is not a break from the method. That is when your brain files things away.

### One round: 90 minutes

| Minutes | Part | What you do |
|---------|------|-------------|
| 10 | Warm-up | Answer questions from earlier rounds, from memory. Write an answer before you open the check. |
| 25 | Learn | One or two small ideas, with a picture. Read once. Then close the page and say it back. |
| 40 | Try | Build the thing before you read the steps. Three hints wait, and you open them one at a time. Being stuck here is the point. |
| 10 | Mistakes | Four questions in your error log. Check your work against the traps listed for the round. |
| 5 | Tomorrow | Read the one sentence that says what you must be able to rebuild tomorrow. Then stop. |

Two rounds make one study day: 90 minutes, a break, 90 minutes. Sleep comes after the second round, before the third.

### The learning loop

1. Draw a rough map first, just once.
2. Learn one small chunk.
3. Close it, then rebuild it from memory.
4. Do something hard with it, right away.
5. Study your mistakes.
6. Explain it simply.
7. Come back after longer gaps.
8. Mix related problems.

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

Add orchestration (LangGraph, LlamaIndex, Pydantic AI) only when you have hit the problem it solves. That happens around Week 3 for most people.

---

<!-- BEGIN GENERATED DAYS -->

<!-- Generated from site/course-data.js by scripts/build_plan.py — do not edit
     this region by hand. Edit the data file and run `make plan`. -->

> **The whole course is 25 rounds** of 90 minutes: about 13 study days, or about 3 weeks at 3 hours a day and 5 days a week. Skip Week 0 if you already have the basics and it is about 3 weeks.

## Week 0 — The base layer
*Days 0.1–0.5 · optional*

**Outcome: "I have the basics the rest of the course assumes, or I have checked that I already did."**

Take the check on the Overview first. Everything on it is taught here, so skip any day you already pass and do the ones you don't, in order. From zero, all five days take about a week and a half at 3 hours a day.

### Day 0.1 — The terminal
*3 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — the shell loop:** navigate using `pwd`, `cd`, and `ls`; create files with spaces in the name; try one command without quotes and one with quotes
- [ ] **Round 2 — streams and pipes:** build a pipeline that searches, sorts, counts, and filters results; use redirection to save output and errors to different files
- [ ] **Round 3 — PATH and errors:** break a command by removing its directory from PATH; read the error message from the top; identify the failure type and fix it
- [ ] **Teach it back:** explain the shell loop, the three streams, and how errors flow in a pipeline, in your own words with no "basically"
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
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — the workbench:** one folder under git, one `uv` environment, your key in `.env` (ignored by git), and one working call that prints a reply
- [ ] **Round 2 — tokens and the call:** a command-line tool that turns a URL or file into capped text and asks for a title, three bullets and one question
- [ ] **Round 3 — the bill:** cost printed to the cent on every run, plus the stop reason, logged for five different inputs
- [ ] **Round 4 — the clocks:** first-token time and total time measured on every run, the temperature experiment written down, and a commit
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** You can say, to the cent, what one run of your tool costs — and why.

### Day 2 — Prompting that survives contact with users
- [ ] Few-shot examples, task decomposition, explicit output contracts, negative instructions
- [ ] When step-by-step reasoning helps, and when it just burns tokens
- [ ] Prompts live in versioned files, not f-strings scattered through the code
- [ ] **Build:** a prompt module plus a 20-case input file you can run any prompt across
- [ ] **Done when:** You can change a prompt and immediately see which of the 20 cases moved.

### Day 3 — Structured output ⭐
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — why JSON fails:** pick a document type, write a tiny JSON Schema, make one call with schema enforcement, get back valid JSON
- [ ] **Round 2 — Pydantic models:** write a Pydantic model with 6–12 fields, use it to parse one real example, show it does all three jobs
- [ ] **Round 3 — validate and repair:** add a validation loop, repair once on failure with the error message, cap at two attempts, log every field that fails
- [ ] **Round 4 — the full build:** extract 50 real inputs, log results, iterate until 95% parse first or second attempt, test edge cases, commit
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** At least 95% of 50 real inputs parse into valid objects on the first or second attempt.

### Day 4 — Long context and multimodal
- [ ] Images and PDFs as input; document understanding with no retrieval pipeline at all
- [ ] Context-window budgeting; prompt caching and what it does to cost
- [ ] When stuffing the whole document into the prompt beats RAG — more often than people admit
- [ ] **Build:** PDF in, structured cited summary out
- [ ] **Done when:** You can say which documents belong in the prompt and which need retrieval.

### Day 5 — Cost, latency, streaming
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — stream end-to-end:** a streaming endpoint that yields chunks as SSE events, with a client that measures time to first chunk and last chunk
- [ ] **Round 2 — two caches:** a response cache keyed on input + params, plus prompt caching enabled, both logged, with a 30% hit rate test
- [ ] **Round 3 — route cheap first:** small model first with a mechanical check, escalate on failure, log which path each request took
- [ ] **Round 4 — measure P95:** 100 requests logged for latency, cache status, routing decision; compute P50 and P95 for all, hits, small model, and escalated
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** You have a table of P50 and P95 latency by category, a response cache hit rate, and a routing escalation rate.

### Day 6 — Failure modes
- [ ] Hallucination, truncation, refusal, rate limits, timeouts, provider outages
- [ ] Retries with exponential backoff and jitter, idempotency, circuit breaking, degraded responses
- [ ] **Build:** harden yesterday's service, then break it on purpose — bad keys, huge inputs, cut network
- [ ] **Done when:** Every failure path returns something useful instead of a stack trace.

### Day 7 — Ship #1
*2 rounds of 90 minutes · about 1 study day*

- [ ] **Round 1 — four things change:** live URL with key in secret store, rate limit set, spend ceiling set, tested from a different network
- [ ] **Round 2 — tell it with numbers:** README with six sections and a table of real runs from the live URL
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
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
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — vector store:** your chunks live in a real database with metadata and identifiers, and re-running ingestion updates instead of duplicating
- [ ] **Round 2 — hybrid search:** both dense and BM25 search working on the same corpus, and ten queries where keyword wins
- [ ] **Round 3 — fusion:** top fifty results fused by reciprocal rank, then reranked to five, with the reranker timing logged
- [ ] **Round 4 — build it:** the full hybrid pipeline called as one function, before-and-after recall numbers on five test queries
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** You have before-and-after recall numbers, not a feeling.

### Day 11 — Retrieval evaluation ⭐
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — build truth:** a `golden.jsonl` file holding 40 questions with their labeled chunk identifiers, including five questions the corpus cannot answer
- [ ] **Round 2 — measure retrieval:** a runner that scores recall@k at k of 1, 5, 10, 20 for three retrievers in one table
- [ ] **Round 3 — position matters:** add MRR to the table and run faithfulness over 20 answers with a judge model
- [ ] **Round 4 — the sentence:** the complete harness, table of all metrics, ten worst failures labeled, and one sentence you can defend
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** You can write: “hybrid plus rerank moved recall@5 from 0.62 to 0.84 on a 40-question golden set.” That sentence is worth more in an interview than a month of tutorials.

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

If a question here makes you uncomfortable, that is your next study session.

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

## 5. Portfolio bar (what done looks like)

Four public repos. Three are weekly ships, one is the capstone. Each README contains:

- The problem, in one paragraph, for a non-expert
- An architecture diagram (a Mermaid block is fine)
- Eval results with numbers
- Cost per request and p95 latency
- Known failure modes and what you'd do with another week
- A live link

Plus one write-up that a stranger can read and conclude: this person has actually shipped.

---

## 6. Weekly checkpoints

| End of | You can... | Red flag if... |
|--------|-----------|----------------|
| Week 1 | State the cost and p95 latency of any call you make; get reliable structured output | You are still copy-pasting into a chat UI to test prompts |
| Week 2 | Improve retrieval and measure the improvement | You have a RAG demo but no golden set |
| Week 3 | Fail your own CI by making the prompt worse | Your agent works "usually" and you cannot quantify "usually" |
| Week 4 | Explain every architectural tradeoff you made and why | Your README is `pip install -r requirements.txt` |

---

## 7. The short resource list (one per category, resist adding more)

- **Book:** *AI Engineering* — Chip Huyen (O'Reilly). The one book that matches this job title.
- **Provider docs:** your primary provider's API docs, read properly, including the prompting and tool-use guides. `docs.claude.com` / `platform.openai.com`.
- **Evals:** Hamel Husain — `hamel.dev`. Read the eval and error-analysis posts twice.
- **Field awareness:** Simon Willison — `simonwillison.net`. Best signal-to-noise on what actually changed this week.
- **RAG evaluation:** Ragas docs — `docs.ragas.io`.
- **Tracing:** Langfuse / LangSmith / Braintrust docs. Whichever you picked.
- **Protocol:** MCP spec — `modelcontextprotocol.io`.
- **Cookbooks:** your provider's official cookbook repo, for patterns you can lift directly.

That is the list. Adding a ninth resource does not make you faster. It is the most comfortable way to avoid building.

---

## 8. Variants

### 1–2 hours a day (about 5–6 months)
One round a day. Same order, same rounds, about twice as many weeks. Keep the warm-ups and protect the ship days (7, 14, 21, 25–27). That is where the learning locks in.

### 5–6 hours a day (about 7 weeks)
Three or four rounds a day. Same order, same rounds. Do not skip the sleep between rounds: put the second half of the day after a real break, and finish with the mistakes log. This pace only works if you have no other work.

### Only 10 days
Days 1, 2, 3, 5 → 8, 9, 10, 11 → 15, 18/19 merged. You get: reliable structured output, a measured RAG system, tool use, and an eval harness. Skip agents-in-depth, fine-tuning, open models, and the capstone. Ship one project instead of four.

### Already a backend developer
Squeeze Week 1 into Days 2, 3 and 5, and spend the time you saved on Days 11, 18 and 19. Evals and retrieval quality are where experienced engineers still have the biggest gap.

---

## 9. Honest expectations

Three months of focused work gets you to **junior-to-mid AI engineer, employable, with proof** — someone who can own an LLM feature end to end. It does not make you a senior engineer. That comes from production incidents, real users, and scale, which take time you cannot compress. Anyone selling that second outcome in three months is selling something.

What this plan really buys you is the thing that compounds: you will have shipped four systems, measured them, and broken them on purpose. From there, every new model release is a small change on top of a foundation you already own, instead of one more thing you feel behind on.

Start today. Day 1 is a CLI that summarizes a file. Go.
