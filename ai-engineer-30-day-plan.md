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

> **The whole course is 120 rounds** of 90 minutes: about 60 study days, or about 12 weeks at 3 hours a day and 5 days a week. Skip Week 0 if you already have the basics and it is about 11 weeks.

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
*3 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — functions and modules:** two functions in one file, import and use them in another
- [ ] **Round 2 — containers and loops:** a function using `Counter` and a comprehension to find the top words
- [ ] **Round 3 — types and environment:** full type hints on all functions, mypy passes, rebuild from scratch
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** Fresh environment, one install command, and the CLI runs on the first try.

### Day 0.3 — Errors, async, and tests
*3 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — errors and cleanup:** a function that fetches URLs, catches errors narrowly, and returns them as data
- [ ] **Round 2 — async and concurrency:** rewrite the fetcher as async, time both versions, watch sync vs. async
- [ ] **Round 3 — tests that work:** write tests for success and failure, mark them async, and run pytest
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** You can explain why the async version is faster, and both tests pass.

### Day 0.4 — HTTP, JSON, and secrets
*3 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — HTTP basics:** an HTTP request and response as plain text, with method, headers, blank line, and body
- [ ] **Round 2 — status codes and JSON:** a script that branches on status code and parses `r.json()` from the response
- [ ] **Round 3 — secrets safe:** a script that reads the API key from `.env`, not committed, and passes it in a header
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** You can open a provider's API reference and know where the auth goes.

### Day 0.5 — Git, GitHub, and reading docs
*3 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — commits and branches:** a practice repo with three commits on main and one branch with its own commits
- [ ] **Round 2 — merging and conflicts:** cause a merge conflict on purpose, resolve it by hand, and use `git merge --abort`
- [ ] **Round 3 — reading docs:** read a reference page, then a tutorial, then check the changelog and answer a question
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
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
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — contracts:** a prompt with a tight output contract and three carefully chosen examples that return consistent structure across five test inputs
- [ ] **Round 2 — examples:** one failing case fixed either by decomposing into two calls or by turning off reasoning; measured comparison
- [ ] **Round 3 — versioning:** prompt module with loader, 20-case test file, and runner that produces result files with version strings
- [ ] **Round 4 — measurement:** three result files (v1, v2, split), a table showing accuracy and tokens, and a commit with evidence
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
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
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — input:** extract text from a PDF per page, print character counts, identify scanned pages
- [ ] **Round 2 — budgeting:** count document tokens, plan the window (output reserve, document size, spare room), verify cache hits
- [ ] **Round 3 — citations:** summarizer with findings (claim, page, quote), verify every quote with string search, report pass rate
- [ ] **Round 4 — measurement:** results table (tokens, cost, pass rate for 20 documents), cache performance table, commit evidence
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
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
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — name the failure:** a classifier function that takes an exception or status code and returns retryable, not_retryable, or not_an_error, used everywhere a call might fail
- [ ] **Round 2 — retry smart:** exponential backoff (1, 2, 4, 8 seconds) with jitter, honoring `retry-after`, capped by latency budget not attempt count
- [ ] **Round 3 — stay idempotent:** accept an idempotency key, check if it exists before running work, store and return cached results for known keys
- [ ] **Round 4 — degrade gracefully:** a five-rung ladder from fresh answer to cached to small model to partial to error message, with request id logged for each
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** Every failure path returns something useful. The user gets an answer or a request id, never a stack trace.

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
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — embeddings:** embed three texts with the same model and save to a numpy array
- [ ] **Round 2 — similarity:** normalize all embeddings, compute dot products, and measure your model's scale
- [ ] **Round 3 — dimensions:** truncate embeddings to 256 and 64 dimensions and see how similarity scores change
- [ ] **Round 4 — search types:** a complete RAG system in ~200 lines with numpy and a list, using exact search
- [ ] **Teach it back:** explain embeddings and retrieval out loud in your own words, with no "basically"
- [ ] **Done when:** You can explain, without hand-waving, exactly what a vector database is doing for you.

### Day 9 — Ingestion and chunking
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — parsing:** one parser for your corpus format and read 20 outputs to find the two worst problems
- [ ] **Round 2 — chunking:** chunk by token count with overlap and print the token distribution
- [ ] **Round 3 — structure:** chunk structurally on heading boundaries, prepend breadcrumbs, store metadata
- [ ] **Round 4 — deduplication:** stable IDs, content deduplication, incremental re-indexing
- [ ] **Teach it back:** explain ingestion and chunking out loud in your own words, with no "basically"
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
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — grounding:** chunks tagged S1 to S5, model answers with tags, every tag checked against the pack and retried on failure
- [ ] **Round 2 — refusing:** a gate that refuses on low reranker scores, calibrated on your golden set, and a refusal prompt the model can produce
- [ ] **Round 3 — dates:** chunk headers with source, section, and date, a tie-break rule in the prompt, tested on conflicting sources
- [ ] **Round 4 — ordering:** chunks ordered by reranker score best-first, question repeated at the end, tested in both orders
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** You can click any sentence in an answer through to the text it came from.

### Day 13 — RAG in production
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — permissions:** two users with different access ask the same question and get different answers; the access filter is derived from the session, never from the request body
- [ ] **Round 2 — freshness:** a reconciliation job lists source documents, lists indexed documents, and deletes the difference
- [ ] **Round 3 — versions:** build a second index with a different configuration, test both against the golden set, and flip the alias to point at the winner, then flip back
- [ ] **Round 4 — the budget:** measure each stage: embed, search, rerank, generate; calculate P50 and P95 latency over 20+ queries; record cost per query
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** Two users with different permissions get different answers to the same question.

### Day 14 — Ship #2
*2 rounds of 90 minutes · about 1 study day*

- [ ] **Round 1 — the numbers:** a README with six sections: what it does, the eval table from Day 11, architecture, cost and latency measured on the deployed service, known failure modes, and a live link
- [ ] **Round 2 — ship it:** the service deployed with the index in a managed store; keys read from environment; demo corpus public and working; ingestion command documented
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** The README leads with measured retrieval quality, not a feature list.

---

## Week 3 — Agents, tools and evals
*Days 15–21*

**Outcome: "My system can take actions — and I can prove it still works before I ship a change."**

### Day 15 — Tool use
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — a tool is text:** four tool definitions by hand, each with a name, description, and JSON Schema
- [ ] **Round 2 — the round trip:** a simple loop that does the four steps once, sending a tool request and getting a result back
- [ ] **Round 3 — parallel calls:** detect two independent tool calls, run them at the same time, return both results in one message
- [ ] **Round 4 — error handling:** a SQL tool that validates arguments, catches errors, returns them as results, and truncates long output
- [ ] **Teach it back:** explain today out loud in your own words, with no 'basically'
- [ ] **Done when:** A tool that throws produces a recovery, not a crash.

### Day 16 — The agent loop
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — the loop:** a simple `while` loop that sends, parses, runs a tool if needed, and appends
- [ ] **Round 2 — termination:** the loop now with four ceilings: steps, budget, wall-clock time, and no-progress rule
- [ ] **Round 3 — memory:** the loop with compaction: when the message list gets long, summarize and keep only the last two steps
- [ ] **Round 4 — pipelines:** write the same task as both an agent loop and a three-call pipeline; compare time, cost, and reliability
- [ ] **Teach it back:** explain today out loud in your own words, with no 'basically'
- [ ] **Done when:** The agent can't loop forever, and you can say what it costs at worst.

### Day 17 — MCP and integrations
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — the problem:** explain why connecting N applications to M tools requires multiplication, and how MCP changes it to addition
- [ ] **Round 2 — three things:** design a server for your corpus: name the tools, resources, and prompts it will expose
- [ ] **Round 3 — the risks:** audit your server design for security: what files does it read, what secrets does it need, what harm could it do?
- [ ] **Round 4 — build one:** an MCP server exposing your Week-2 search as a tool and your document list as a resource, registered in a real client
- [ ] **Teach it back:** explain today out loud in your own words, with no basically
- [ ] **Done when:** You can query your own corpus from inside a coding agent or desktop client.

### Day 18 — Evals I — the discipline ⭐
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — vibes fail:** design a 40-case eval, run your system on all of them, and record a baseline score
- [ ] **Round 2 — three tiers:** write five assertions that code can check without a model, then code one and count passes
- [ ] **Round 3 — error analysis:** export 50 failures, read all of them, label each one, group the labels, and sort by frequency
- [ ] **Round 4 — judge design:** write one judge prompt, validate it on 40 hand-labeled cases, and tighten it until agreement clears 80 percent
- [ ] **Teach it back:** explain today out loud in your own words, with no basically
- [ ] **Done when:** You have a labelled taxonomy of how your own system fails, ranked by frequency.

### Day 19 — Evals II — build the harness ⭐
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — five parts:** 40-case dataset, runner that records everything per case, one results file
- [ ] **Round 2 — measure the noise:** run three times unchanged, measure the wobble, set the threshold outside it, commit baseline.json
- [ ] **Round 3 — make it fast:** smoke set on 15 cases with assertions only, full set on 40 with the judge, cache by prompt hash, concurrent runs
- [ ] **Round 4 — test the test:** break the system on purpose, watch the eval fail and the gate block it, revert, confirm it passes
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** You have a harness that catches when you break something, because you broke it on purpose and watched it fail.

### Day 20 — Guardrails and security
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — how it works:** list your tools, mark which ones read private data, accept untrusted input, and send data outward
- [ ] **Round 2 — three legs:** identify dangerous tools, see which legs you can remove
- [ ] **Round 3 — what holds:** for each dangerous tool, add an allow-list, sandbox, user scoping, and output validation
- [ ] **Round 4 — attack it:** spend two hours red-teaming, log every attack, convert each success into an eval case
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** You have a document listing the attacks that worked and eval cases that stop them.

### Day 21 — Ship #3
*2 rounds of 90 minutes · about 1 study day*

- [ ] **Round 1 — what readers believe:** public repo with clean structure, eval suite working, CI gate blocking bad changes, README with evaluation section
- [ ] **Round 2 — proof with numbers:** README includes five numbers with denominators and dates, failure cluster analysis, spend ceiling set, fresh clone works in one command
- [ ] **Teach it back:** explain today out loud in your own words, with no \"basically\"
- [ ] **Done when:** Someone can read your README and reproduce your eval scores.

---

## Week 4 — Production and proof
*Days 22–30*

**Outcome: "Everything I built is observable, measured, deployed, and explained well enough to hire me on."**

### Day 22 — Observability
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — traces:** every request has a trace id; every step is a span with model name, tokens, cost, latency, and stop reason
- [ ] **Round 2 — dashboards:** cost per day with alarm at 3x normal, and p50/p95 latency per endpoint
- [ ] **Round 3 — feedback:** thumbs up and thumbs down buttons keyed by trace id, so a score is also a diagnosis
- [ ] **Round 4 — safety:** a redaction function catches emails, card numbers, keys, and environment values before they leave your code
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** You can open a trace for any single request from the last week, and you know what the last one cost.

### Day 23 — Fine-tuning, in exactly one day
*3 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — what changes:** LoRA trains small matrices, not the whole model; tuning shapes behavior, not knowledge
- [ ] **Round 2 — when to use:** tuning wins at fixed format and high volume; it loses at knowledge, changing data, and small datasets
- [ ] **Round 3 — the verdict:** a table comparing your best prompt, prompt plus retrieval, and a tuned model; three numbers per column; your judgment in writing
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** You can defend the choice with data — and the honest answer is usually "prompt + retrieval won", which is itself a senior signal.

### Day 24 — Open models and serving
*3 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — weights on your machine:** a local model running, with memory and tokens-per-second measured
- [ ] **Round 2 — quantization trade-off:** scores from your golden set on hosted, 8-bit local, and 4-bit local
- [ ] **Round 3 — self-hosting decision:** your break-even calculation and four-sentence judgment on when you would choose it
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** You can say in two sentences when you would self-host and when you would not.

### Days 25–27 — Capstone
*8 rounds of 90 minutes · about 4 study days*

- [ ] **Round 1 — Scope and design:** a one-sentence product description, the domain you know, and three things you are explicitly *not* building
- [ ] **Round 2 — The spine:** a README with the problem, the six pieces of the architecture, and why you chose this shape
- [ ] **Round 3 — Agent or pipeline:** README updated with whether you are building a pipeline or an agent loop, the steps in order, and your reason
- [ ] **Round 4 — Deploy on Day 25:** a deployed skeleton with retrieval, tracing wired before the first model call, questions answered with cited sources, and a public URL
- [ ] **Round 5 — Retrieval:** hybrid search plus reranking working end-to-end, the top result with metadata passed to the model, answers that cite their sources, tested on ten real questions
- [ ] **Round 6 — Tools:** one tool that does something real, with a dry-run mode and a confirmation step, tested on five commands
- [ ] **Round 7 — Evals:** a golden set of twenty to thirty real cases from your own use, a harness that runs them all, a judge that scores each one, and failures grouped by cause
- [ ] **Round 8 — Auth and ship:** login and per-user scoping, every failure path with a clear error message, README with real metrics (cost, latency, eval score), deployed and used for a task you actually needed
- [ ] **Teach it back:** explain your capstone to a smart friend, from login to question to answer, five to seven sentences, with no gaps
- [ ] **Done when:** It's deployed and you've used it yourself for something real.

### Day 28 — Harden and measure
*4 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — load testing:** a ramp showing p50, p95, p99 and error rate at 1, 5, 10, 25 and 50 concurrent users, with the knee marked
- [ ] **Round 2 — the four numbers:** cost per user, p95 latency broken down by span, eval score on deployed, error rate split by cause
- [ ] **Round 3 — failure playbook:** at least six rows showing what breaks, how you would know, what you would do, with alarms for gaps
- [ ] **Round 4 — fix the top two:** before-and-after scores from the error analysis loop, top two fixes described, cases promoted to permanent evals
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
- [ ] **Done when:** Every number in the README came from a measurement, with the date and conditions beside it.

### Day 29 — Write it up ⭐
*3 rounds of 90 minutes · about 2 study days*

- [ ] **Round 1 — build your case:** read `LOG.md` and sort every number and surprise into six piles under the six section headings
- [ ] **Round 2 — measure claims:** draw the architecture diagram, list three to five tradeoffs with the cost of each, and list three failures or approaches you tried and rejected
- [ ] **Round 3 — ship it:** assemble the six sections, publish on a stable link, link from your four READMEs and resume, send to two readers, and commit
- [ ] **Teach it back:** explain today out loud in your own words, with no "basically"
- [ ] **Done when:** A stranger reads it and understands both what you built and why you built it that way.

### Day 30 — Position yourself
*2 rounds of 90 minutes · about 1 study day*

- [ ] **Round 1 — what you shipped:** resume rewritten as four bullets with systems instead of tools, each with one number and a link, LinkedIn profile updated the same way, fifteen question answers recorded
- [ ] **Round 2 — your next move:** next 30 days written in `LOG.md` with depth or breadth choice, deliverable, and date, three public actions taken (write-up published, PR opened, messages sent)
- [ ] **Teach it back:** explain today out loud in your own words, with no “basically”
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
