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
        "rounds": 3,
        "tasks": [
          "<b>Round 1 — functions and modules:</b> two functions in one file, import and use them in another",
          "<b>Round 2 — containers and loops:</b> a function using <code>Counter</code> and a comprehension to find the top words",
          "<b>Round 3 — types and environment:</b> full type hints on all functions, mypy passes, rebuild from scratch",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "Fresh environment, one install command, and the CLI runs on the first try.",
        "week": 0
      },
      {
        "d": "0.3",
        "t": "Errors, async, and tests",
        "rounds": 3,
        "tasks": [
          "<b>Round 1 — errors and cleanup:</b> a function that fetches URLs, catches errors narrowly, and returns them as data",
          "<b>Round 2 — async and concurrency:</b> rewrite the fetcher as async, time both versions, watch sync vs. async",
          "<b>Round 3 — tests that work:</b> write tests for success and failure, mark them async, and run pytest",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "You can explain why the async version is faster, and both tests pass.",
        "week": 0
      },
      {
        "d": "0.4",
        "t": "HTTP, JSON, and secrets",
        "rounds": 3,
        "tasks": [
          "<b>Round 1 — HTTP basics:</b> an HTTP request and response as plain text, with method, headers, blank line, and body",
          "<b>Round 2 — status codes and JSON:</b> a script that branches on status code and parses <code>r.json()</code> from the response",
          "<b>Round 3 — secrets safe:</b> a script that reads the API key from <code>.env</code>, not committed, and passes it in a header",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "You can open a provider's API reference and know where the auth goes.",
        "week": 0
      },
      {
        "d": "0.5",
        "t": "Git, GitHub, and reading docs",
        "rounds": 3,
        "tasks": [
          "<b>Round 1 — commits and branches:</b> a practice repo with three commits on main and one branch with its own commits",
          "<b>Round 2 — merging and conflicts:</b> cause a merge conflict on purpose, resolve it by hand, and use <code>git merge --abort</code>",
          "<b>Round 3 — reading docs:</b> read a reference page, then a tutorial, then check the changelog and answer a question",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "The word \"conflict\" no longer raises your pulse.",
        "week": 0
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
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — contracts:</b> a prompt with a tight output contract and three carefully chosen examples that return consistent structure across five test inputs",
          "<b>Round 2 — examples:</b> one failing case fixed either by decomposing into two calls or by turning off reasoning; measured comparison",
          "<b>Round 3 — versioning:</b> prompt module with loader, 20-case test file, and runner that produces result files with version strings",
          "<b>Round 4 — measurement:</b> three result files (v1, v2, split), a table showing accuracy and tokens, and a commit with evidence",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
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
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — input:</b> extract text from a PDF per page, print character counts, identify scanned pages",
          "<b>Round 2 — budgeting:</b> count document tokens, plan the window (output reserve, document size, spare room), verify cache hits",
          "<b>Round 3 — citations:</b> summarizer with findings (claim, page, quote), verify every quote with string search, report pass rate",
          "<b>Round 4 — measurement:</b> results table (tokens, cost, pass rate for 20 documents), cache performance table, commit evidence",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "You can say which documents belong in the prompt and which need retrieval.",
        "ship": false
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
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — name the failure:</b> a classifier function that takes an exception or status code and returns retryable, not_retryable, or not_an_error, used everywhere a call might fail",
          "<b>Round 2 — retry smart:</b> exponential backoff (1, 2, 4, 8 seconds) with jitter, honoring <code>retry-after</code>, capped by latency budget not attempt count",
          "<b>Round 3 — stay idempotent:</b> accept an idempotency key, check if it exists before running work, store and return cached results for known keys",
          "<b>Round 4 — degrade gracefully:</b> a five-rung ladder from fresh answer to cached to small model to partial to error message, with request id logged for each",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "Every failure path returns something useful. The user gets an answer or a request id, never a stack trace."
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
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — embeddings:</b> embed three texts with the same model and save to a numpy array",
          "<b>Round 2 — similarity:</b> normalize all embeddings, compute dot products, and measure your model's scale",
          "<b>Round 3 — dimensions:</b> truncate embeddings to 256 and 64 dimensions and see how similarity scores change",
          "<b>Round 4 — search types:</b> a complete RAG system in ~200 lines with numpy and a list, using exact search",
          "<b>Teach it back:</b> explain embeddings and retrieval out loud in your own words, with no \"basically\""
        ],
        "done": "You can explain, without hand-waving, exactly what a vector database is doing for you."
      },
      {
        "d": "9",
        "t": "Ingestion and chunking",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — parsing:</b> one parser for your corpus format and read 20 outputs to find the two worst problems",
          "<b>Round 2 — chunking:</b> chunk by token count with overlap and print the token distribution",
          "<b>Round 3 — structure:</b> chunk structurally on heading boundaries, prepend breadcrumbs, store metadata",
          "<b>Round 4 — deduplication:</b> stable IDs, content deduplication, incremental re-indexing",
          "<b>Teach it back:</b> explain ingestion and chunking out loud in your own words, with no \"basically\""
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
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — grounding:</b> chunks tagged S1 to S5, model answers with tags, every tag checked against the pack and retried on failure",
          "<b>Round 2 — refusing:</b> a gate that refuses on low reranker scores, calibrated on your golden set, and a refusal prompt the model can produce",
          "<b>Round 3 — dates:</b> chunk headers with source, section, and date, a tie-break rule in the prompt, tested on conflicting sources",
          "<b>Round 4 — ordering:</b> chunks ordered by reranker score best-first, question repeated at the end, tested in both orders",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "You can click any sentence in an answer through to the text it came from.",
        "week": 2
      },
      {
        "d": "13",
        "t": "RAG in production",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — permissions:</b> two users with different access ask the same question and get different answers; the access filter is derived from the session, never from the request body",
          "<b>Round 2 — freshness:</b> a reconciliation job lists source documents, lists indexed documents, and deletes the difference",
          "<b>Round 3 — versions:</b> build a second index with a different configuration, test both against the golden set, and flip the alias to point at the winner, then flip back",
          "<b>Round 4 — the budget:</b> measure each stage: embed, search, rerank, generate; calculate P50 and P95 latency over 20+ queries; record cost per query",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "Two users with different permissions get different answers to the same question.",
        "week": 2
      },
      {
        "d": "14",
        "t": "Ship #2",
        "rounds": 2,
        "tasks": [
          "<b>Round 1 — the numbers:</b> a README with six sections: what it does, the eval table from Day 11, architecture, cost and latency measured on the deployed service, known failure modes, and a live link",
          "<b>Round 2 — ship it:</b> the service deployed with the index in a managed store; keys read from environment; demo corpus public and working; ingestion command documented",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "The README leads with measured retrieval quality, not a feature list.",
        "ship": true,
        "week": 2
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
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — a tool is text:</b> four tool definitions by hand, each with a name, description, and JSON Schema",
          "<b>Round 2 — the round trip:</b> a simple loop that does the four steps once, sending a tool request and getting a result back",
          "<b>Round 3 — parallel calls:</b> detect two independent tool calls, run them at the same time, return both results in one message",
          "<b>Round 4 — error handling:</b> a SQL tool that validates arguments, catches errors, returns them as results, and truncates long output",
          "<b>Teach it back:</b> explain today out loud in your own words, with no 'basically'"
        ],
        "done": "A tool that throws produces a recovery, not a crash."
      },
      {
        "d": "16",
        "t": "The agent loop",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — the loop:</b> a simple <code>while</code> loop that sends, parses, runs a tool if needed, and appends",
          "<b>Round 2 — termination:</b> the loop now with four ceilings: steps, budget, wall-clock time, and no-progress rule",
          "<b>Round 3 — memory:</b> the loop with compaction: when the message list gets long, summarize and keep only the last two steps",
          "<b>Round 4 — pipelines:</b> write the same task as both an agent loop and a three-call pipeline; compare time, cost, and reliability",
          "<b>Teach it back:</b> explain today out loud in your own words, with no 'basically'"
        ],
        "done": "The agent can't loop forever, and you can say what it costs at worst."
      },
      {
        "d": "17",
        "t": "MCP and integrations",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — the problem:</b> explain why connecting N applications to M tools requires multiplication, and how MCP changes it to addition",
          "<b>Round 2 — three things:</b> design a server for your corpus: name the tools, resources, and prompts it will expose",
          "<b>Round 3 — the risks:</b> audit your server design for security: what files does it read, what secrets does it need, what harm could it do?",
          "<b>Round 4 — build one:</b> an MCP server exposing your Week-2 search as a tool and your document list as a resource, registered in a real client",
          "<b>Teach it back:</b> explain today out loud in your own words, with no basically"
        ],
        "done": "You can query your own corpus from inside a coding agent or desktop client.",
        "week": 3
      },
      {
        "d": "18",
        "t": "Evals I — the discipline",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — vibes fail:</b> design a 40-case eval, run your system on all of them, and record a baseline score",
          "<b>Round 2 — three tiers:</b> write five assertions that code can check without a model, then code one and count passes",
          "<b>Round 3 — error analysis:</b> export 50 failures, read all of them, label each one, group the labels, and sort by frequency",
          "<b>Round 4 — judge design:</b> write one judge prompt, validate it on 40 hand-labeled cases, and tighten it until agreement clears 80 percent",
          "<b>Teach it back:</b> explain today out loud in your own words, with no basically"
        ],
        "done": "You have a labelled taxonomy of how your own system fails, ranked by frequency.",
        "lever": true,
        "week": 3
      },
      {
        "d": "19",
        "t": "Evals II — build the harness",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — five parts:</b> 40-case dataset, runner that records everything per case, one results file",
          "<b>Round 2 — measure the noise:</b> run three times unchanged, measure the wobble, set the threshold outside it, commit baseline.json",
          "<b>Round 3 — make it fast:</b> smoke set on 15 cases with assertions only, full set on 40 with the judge, cache by prompt hash, concurrent runs",
          "<b>Round 4 — test the test:</b> break the system on purpose, watch the eval fail and the gate block it, revert, confirm it passes",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "You have a harness that catches when you break something, because you broke it on purpose and watched it fail.",
        "lever": true
      },
      {
        "d": "20",
        "t": "Guardrails and security",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — how it works:</b> list your tools, mark which ones read private data, accept untrusted input, and send data outward",
          "<b>Round 2 — three legs:</b> identify dangerous tools, see which legs you can remove",
          "<b>Round 3 — what holds:</b> for each dangerous tool, add an allow-list, sandbox, user scoping, and output validation",
          "<b>Round 4 — attack it:</b> spend two hours red-teaming, log every attack, convert each success into an eval case",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "You have a document listing the attacks that worked and eval cases that stop them."
      },
      {
        "d": "21",
        "t": "Ship #3",
        "rounds": 2,
        "tasks": [
          "<b>Round 1 — what readers believe:</b> public repo with clean structure, eval suite working, CI gate blocking bad changes, README with evaluation section",
          "<b>Round 2 — proof with numbers:</b> README includes five numbers with denominators and dates, failure cluster analysis, spend ceiling set, fresh clone works in one command",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \\\"basically\\\""
        ],
        "done": "Someone can read your README and reproduce your eval scores.",
        "ship": true,
        "week": 3
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
        "rounds": 4,
        "tasks": [
          "<b>Round 1 — traces:</b> every request has a trace id; every step is a span with model name, tokens, cost, latency, and stop reason",
          "<b>Round 2 — dashboards:</b> cost per day with alarm at 3x normal, and p50/p95 latency per endpoint",
          "<b>Round 3 — feedback:</b> thumbs up and thumbs down buttons keyed by trace id, so a score is also a diagnosis",
          "<b>Round 4 — safety:</b> a redaction function catches emails, card numbers, keys, and environment values before they leave your code",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "You can open a trace for any single request from the last week, and you know what the last one cost."
      },
      {
        "d": "23",
        "t": "Fine-tuning, in exactly one day",
        "rounds": 3,
        "tasks": [
          "<b>Round 1 — what changes:</b> LoRA trains small matrices, not the whole model; tuning shapes behavior, not knowledge",
          "<b>Round 2 — when to use:</b> tuning wins at fixed format and high volume; it loses at knowledge, changing data, and small datasets",
          "<b>Round 3 — the verdict:</b> a table comparing your best prompt, prompt plus retrieval, and a tuned model; three numbers per column; your judgment in writing",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "You can defend the choice with data — and the honest answer is usually \"prompt + retrieval won\", which is itself a senior signal."
      },
      {
        "d": "24",
        "t": "Open models and serving",
        "rounds": 3,
        "tasks": [
          "<b>Round 1 &mdash; weights on your machine:</b> a local model running, with memory and tokens-per-second measured",
          "<b>Round 2 &mdash; quantization trade-off:</b> scores from your golden set on hosted, 8-bit local, and 4-bit local",
          "<b>Round 3 &mdash; self-hosting decision:</b> your break-even calculation and four-sentence judgment on when you would choose it",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "You can say in two sentences when you would self-host and when you would not."
      },
      {
        "d": "25–27",
        "t": "Capstone",
        "rounds": 8,
        "tasks": [
          "<b>Round 1 — Scope and design:</b> a one-sentence product description, the domain you know, and three things you are explicitly <i>not</i> building",
          "<b>Round 2 — The spine:</b> a README with the problem, the six pieces of the architecture, and why you chose this shape",
          "<b>Round 3 — Agent or pipeline:</b> README updated with whether you are building a pipeline or an agent loop, the steps in order, and your reason",
          "<b>Round 4 — Deploy on Day 25:</b> a deployed skeleton with retrieval, tracing wired before the first model call, questions answered with cited sources, and a public URL",
          "<b>Round 5 — Retrieval:</b> hybrid search plus reranking working end-to-end, the top result with metadata passed to the model, answers that cite their sources, tested on ten real questions",
          "<b>Round 6 — Tools:</b> one tool that does something real, with a dry-run mode and a confirmation step, tested on five commands",
          "<b>Round 7 — Evals:</b> a golden set of twenty to thirty real cases from your own use, a harness that runs them all, a judge that scores each one, and failures grouped by cause",
          "<b>Round 8 — Auth and ship:</b> login and per-user scoping, every failure path with a clear error message, README with real metrics (cost, latency, eval score), deployed and used for a task you actually needed",
          "<b>Teach it back:</b> explain your capstone to a smart friend, from login to question to answer, five to seven sentences, with no gaps"
        ],
        "done": "It's deployed and you've used it yourself for something real.",
        "ship": true
      },
      {
        "d": "28",
        "t": "Harden and measure",
        "rounds": 4,
        "tasks": [
          "<b>Round 1 &mdash; load testing:</b> a ramp showing p50, p95, p99 and error rate at 1, 5, 10, 25 and 50 concurrent users, with the knee marked",
          "<b>Round 2 &mdash; the four numbers:</b> cost per user, p95 latency broken down by span, eval score on deployed, error rate split by cause",
          "<b>Round 3 &mdash; failure playbook:</b> at least six rows showing what breaks, how you would know, what you would do, with alarms for gaps",
          "<b>Round 4 &mdash; fix the top two:</b> before-and-after scores from the error analysis loop, top two fixes described, cases promoted to permanent evals",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "Every number in the README came from a measurement, with the date and conditions beside it."
      },
      {
        "d": "29",
        "t": "Write it up",
        "rounds": 3,
        "tasks": [
          "<b>Round 1 — build your case:</b> read <code>LOG.md</code> and sort every number and surprise into six piles under the six section headings",
          "<b>Round 2 — measure claims:</b> draw the architecture diagram, list three to five tradeoffs with the cost of each, and list three failures or approaches you tried and rejected",
          "<b>Round 3 — ship it:</b> assemble the six sections, publish on a stable link, link from your four READMEs and resume, send to two readers, and commit",
          "<b>Teach it back:</b> explain today out loud in your own words, with no \"basically\""
        ],
        "done": "A stranger reads it and understands both what you built and why you built it that way.",
        "lever": true
      },
      {
        "d": "30",
        "t": "Position yourself",
        "rounds": 2,
        "tasks": [
          "<b>Round 1 — what you shipped:</b> resume rewritten as four bullets with systems instead of tools, each with one number and a link, LinkedIn profile updated the same way, fifteen question answers recorded",
          "<b>Round 2 — your next move:</b> next 30 days written in <code>LOG.md</code> with depth or breadth choice, deliverable, and date, three public actions taken (write-up published, PR opened, messages sent)",
          "<b>Teach it back:</b> explain today out loud in your own words, with no &ldquo;basically&rdquo;"
        ],
        "done": "Someone who has never met you can tell, in 60 seconds, that you ship AI systems.",
        "week": 4
      }
    ]
  }
];
