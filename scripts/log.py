#!/usr/bin/env python3
"""Daily learning log assistant for the 30-Day AI Engineer plan.

Features:
1. Interactive or command-line entry for logging daily progress into LOG.md.
2. Reads topics from site/course-data.js to provide context.
3. --status flag to show current course completion stats.

Usage:
    python3 scripts/log.py               # interactive mode
    python3 scripts/log.py --status      # show progress summary
    python3 scripts/log.py --day 1 --built "CLI summarizer" ...
"""

from __future__ import annotations

import argparse
import datetime
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOG_PATH = ROOT / "LOG.md"
COURSE_DATA_PATH = ROOT / "site" / "course-data.js"

DRILL_QUESTIONS: list[dict[str, str]] = [
    {
        "topic": "Python Async & I/O",
        "question": "Why does async/await speed up network API calls but NOT CPU-bound mathematical operations?",
        "answer": "Network I/O is non-blocking at the OS kernel level via epoll/kqueue. When a coroutine awaits I/O (e.g. socket read/write), it yields control to the single-threaded event loop, which schedules other tasks. CPU math continuously executes bytecode on the CPU while holding the Global Interpreter Lock (GIL); without an explicit yield point or OS thread dispatch, the thread blocks and cooperative multitasking cannot occur without multiprocessing.",
    },
    {
        "topic": "Tokenization & Character Reasoning",
        "question": "Why do LLMs frequently fail at counting characters in a word or reversing a string?",
        "answer": "Byte-Pair Encoding (BPE) merges character sequences into multi-character token IDs (e.g. 'strawberry' -> ['str', 'aw', 'berry']). The self-attention matrix and feedforward layers operate exclusively on token embedding vectors; the model has no physical representation or positional indices for individual constituent character glyphs inside a token.",
    },
    {
        "topic": "Embedding Geometry & Negation Failure",
        "question": "Why does bi-encoder cosine similarity fail on negated queries like 'hotels not in London'?",
        "answer": "Bi-encoders encode queries and documents independently via mean pooling over hidden states (u = Enc(q), v = Enc(d)). The semantic vector space captures topical co-occurrence geometry. 'Hotels not in London' and 'hotels in London' share almost identical token distributions and high cosine collinearity (~0.9+). Without joint query-document cross-attention, syntactic negation tokens ('not') cannot modulate document token representations.",
    },
    {
        "topic": "Hybrid Search & Reciprocal Rank Fusion",
        "question": "What is Reciprocal Rank Fusion (RRF), and why is constant k (typically k=60) added to the denominator?",
        "answer": "BM25 produces unbounded TF-IDF scores ([0, inf)), while dense search produces bounded cosine scores ([-1, 1]). Normalizing and interpolating disparate score distributions is mathematically unstable. RRF discards raw scores and sums rank inverses: RRF(d) = sum(1 / (k + rank_i)). Constant k=60 compresses the steep gradient between rank 1 (1/1) and rank 2 (1/2), preventing a single top-ranked outlier in one noisy lane from dominating multi-lane consensus.",
    },
    {
        "topic": "Cross-Encoders vs Bi-Encoders",
        "question": "What is the physical architectural difference between a bi-encoder and a cross-encoder?",
        "answer": "A bi-encoder passes query and document through separate forward passes into independent vectors u, v in R^D (O(N^2 + M^2) attention), enabling pre-computed sub-millisecond ANN index search. A cross-encoder concatenates [CLS] + q + [SEP] + d + [SEP] into a single transformer, computing full all-to-all cross-attention across all N+M tokens at every layer (O((N+M)^2)), enabling direct query-document token interactions at higher computational cost.",
    },
    {
        "topic": "RAG Evaluation Metrics",
        "question": "What is the mathematical and operational difference between Recall@5 and Mean Reciprocal Rank (MRR)?",
        "answer": "Recall@5 is a binary set-membership metric: (1/|Q|) * sum(I(relevant in top 5)), weighting rank 1 and rank 5 identically. MRR is an ordinal position penalty: (1/|Q|) * sum(1 / rank_first). MRR penalizes context stuffing: rank 1 scores 1.0, rank 2 scores 0.5, and rank 5 scores 0.2, reflecting that earlier relevant chunks reduce LLM distraction and generation latency.",
    },
    {
        "topic": "Compound AI Architecture",
        "question": "Name the 4 primary Compound AI patterns. When should you use a Router vs an Orchestrator?",
        "answer": "1. Router (static 1-of-N conditional branch). 2. Orchestrator-Workers (central planner decomposes tasks into dynamic parallel subtasks). 3. Evaluator-Optimizer (iterative generator-critic refinement loop). 4. Parallel Consensus (ensembles N stochastic generations via voting/clustering). Use a Router for predictable, single-step intent classification; use an Orchestrator when multi-step dependency DAGs and state aggregation across tools are required.",
    },
    {
        "topic": "Model Context Protocol (MCP)",
        "question": "What are the three primary primitives defined in the Model Context Protocol (MCP), and how do they differ in execution?",
        "answer": "Over JSON-RPC 2.0: 1. Tools (executable functions with JSON Schema; model generates arguments, host executes side effects, returns output). 2. Resources (read-only passive data payloads addressed by URI like file:// or db://; attached without model execution). 3. Prompts (parameterized interactive templates surfaced to users/clients for workflow orchestration).",
    },
    {
        "topic": "Production Security: Prompt Injection",
        "question": "How does an indirect prompt injection attack differ from a direct jailbreak, and why do transformers fail to prevent it natively?",
        "answer": "Direct jailbreaks originate in user prompts trying to bypass guardrails. Indirect prompt injection originates from untrusted data (PDFs, web scrapes, tool outputs) containing adversarial directives. Transformers process instructions and data as an undifferentiated, flat token sequence in the same self-attention context window. With no hardware-level separation between instruction pointer and data buffer (no NX/DEP bit), adversarial data tokens hijack attention heads and override system prompts.",
    },
    {
        "topic": "Open Model Serving: PagedAttention",
        "question": "What physical memory problem does PagedAttention solve in inference engines like vLLM?",
        "answer": "In autoregressive decoding, dynamic Key-Value (KV) cache tensors grow per generated token. Traditional engines pre-allocate contiguous GPU VRAM for the maximum context window (e.g. 8k tokens), causing 60-80% memory waste via internal/external fragmentation. PagedAttention mirrors OS virtual memory: it partitions the KV cache into fixed-size physical blocks (e.g. 16 tokens) mapped via a page table, eliminating contiguous allocation constraints and enabling near-zero waste with copy-on-write branching.",
    },
    {
        "topic": "Fine-Tuning: LoRA Parameterization",
        "question": "In LoRA, what physical mechanisms do the hyperparameters Rank (r) and Alpha (alpha) govern?",
        "answer": "LoRA reparameterizes weight updates as delta_W = B * A, where B in R^(d x r) (zero initialized) and A in R^(r x k) (Gaussian initialized). Rank r << min(d, k) defines the dimension of the low-rank update subspace, setting parameter capacity and memory footprint. Alpha is a constant scaling multiplier in the forward pass: W = W0 + (alpha / r) * (B * A). Scaling by (alpha / r) stabilizes gradient updates and activations, decoupling rank changes from learning rate tuning.",
    },
    {
        "topic": "Production Resiliency: The Thundering Herd",
        "question": "Why is 'full jitter' strictly superior to exponential backoff without jitter during upstream rate-limit events?",
        "answer": "Deterministic backoff (delay = base * 2^attempt) lacks phase entropy. N workers failing at time T0 all sleep for the exact same duration and wake up at T0 + delta_t, firing a synchronized shockwave that repeatedly re-exhausts the provider's token bucket. Full jitter draws sleep times uniformly from U(0, min(max_backoff, base * 2^attempt)), de-correlating worker phases into a flat Poisson arrival stream that allows token buckets to refill smoothly.",
    },
    {
        "topic": "Vector Space Geometry: Metric Ordering",
        "question": "What is the mathematical and operational difference between Cosine Similarity and Cosine Distance, and what happens if their sort orders are inverted?",
        "answer": "Cosine Similarity is an inner product metric in [-1.0, 1.0]: cos(theta) = (u . v) / (||u|| * ||v||), where +1.0 represents collinearity (maximum match); it requires descending sort order (reverse=True). Cosine Distance is D_C = 1.0 - cos(theta) in [0.0, 2.0], where 0.0 represents identity; it requires ascending sort order. Inverting the sort order causes the engine to return the most semantically antithetical chunk in the corpus at Rank 1.",
    },
    {
        "topic": "Async Generator Lifecycle: Client Disconnects",
        "question": "What occurs inside an ASGI server and async generator when a streaming client disconnects mid-response?",
        "answer": "When a client terminates the TCP socket, the ASGI server detects socket hangup and calls await generator.aclose(). Python raises asyncio.CancelledError at the generator's active await suspension point. If resource cleanup is placed sequentially after the for/yield loop instead of inside a finally: block, execution halts immediately and the cleanup code never runs, leaking open sockets, file descriptors, and upstream connections.",
    },
    {
        "topic": "Attention Dynamics: Lost in the Middle",
        "question": "What is the 'Lost in the Middle' phenomenon, and what physical attention dynamics cause it?",
        "answer": "In long contexts, LLM recall accuracy forms a U-shaped curve: information placed in the first 10% (primacy) or last 10% (recency) is retrieved with high fidelity, while performance degrades significantly in the middle 80%. This is driven by attention sink dynamics (initial tokens absorb large softmax denominator mass as anchor states) combined with RoPE positional decay and causal attention masking, which biases query-key dot products toward context boundaries.",
    },
    {
        "topic": "Structured Outputs: Constrained Decoding",
        "question": "How does grammar-constrained decoding physically guarantee valid JSON compared to prompt engineering?",
        "answer": "Prompting relies on stochastic token sampling where syntax-violating tokens always have non-zero probability. Constrained decoding compiles a JSON Schema/CFG into a Deterministic Finite Automaton (DFA). At each autoregressive decoding step, the DFA computes the exact set of valid next characters, and a vocabulary trie maps them to valid token IDs. The engine sets invalid token logits to -inf prior to softmax, reducing their sampling probability to absolute zero.",
    },
]


def run_drill():
    """Runs a 10-minute active recall drill."""
    import random

    drill = random.choice(DRILL_QUESTIONS)
    print("========================================")
    print("      10-Minute Spaced Retrieval Drill   ")
    print(f"Topic: {drill['topic']}")
    print("========================================")
    print(f"\nChallenge:\n{drill['question']}\n")
    try:
        input("Take 60 seconds to answer mentally (or write it down). Press Enter to check...")
    except EOFError:
        pass
    print("\n--- Senior Reference Answer ---")
    print(drill["answer"])
    print("========================================\n")


def load_course_days() -> dict[str, str]:
    """Extracts a mapping of day identifier -> title from course-data.js."""
    if not COURSE_DATA_PATH.exists():
        return {}
    try:
        text = COURSE_DATA_PATH.read_text(encoding="utf-8")
        match = re.search(r"window\.COURSE_WEEKS\s*=\s*(\[.*\])\s*;\s*$", text, re.DOTALL)
        if not match:
            return {}
        weeks = json.loads(match.group(1))
        mapping = {}
        for w in weeks:
            for d in w.get("days", []):
                # Strip HTML tags
                title = re.sub(r"<[^>]+>", "", d.get("t", ""))
                mapping[str(d.get("d"))] = title
        return mapping
    except Exception:
        return {}


def parse_logged_days() -> list[str]:
    """Finds all logged day identifiers in LOG.md."""
    if not LOG_PATH.exists():
        return []
    content = LOG_PATH.read_text(encoding="utf-8")
    # Matches '## Day <id>' or '## Days <id>'
    matches = re.findall(r"^##\s+Days?\s+([\d\.\-]+)", content, re.MULTILINE)
    return matches


def show_status():
    course_days = load_course_days()
    logged_days = parse_logged_days()
    total = len(course_days)
    logged_count = len(logged_days)
    percent = (logged_count / total * 100.0) if total else 0.0

    print("========================================")
    print("     The 80/20 AI Engineer Progress     ")
    print("      (3 Months: 0 to 100 Roadmap)      ")
    print("========================================")
    print(f"Logged: {logged_count} / {total} days ({percent:.1f}%)")
    print(f"Active Log: {LOG_PATH.relative_to(ROOT)}")
    print("----------------------------------------")
    if logged_days:
        print(
            "Logged entries so far: "
            + ", ".join(logged_days[:10])
            + ("..." if len(logged_days) > 10 else "")
        )
    else:
        print("No days logged yet. Start today with Day 0 or Day 1!")
    print("========================================")


def append_or_update_log(
    day: str,
    topic: str,
    date_str: str,
    hours: str,
    built: str,
    worked: str,
    surprised: str,
    fuzzy: str,
    numbers: str,
):
    entry_header = f"## Day {day} — {topic} ({date_str}, {hours}h)"
    entry_body = (
        f"{entry_header}\n"
        f"- Built: {built}\n"
        f"- Worked: {worked}\n"
        f"- Surprised me: {surprised}\n"
        f"- Still fuzzy: {fuzzy}\n"
        f"- Numbers: {numbers}\n"
    )

    current_text = (
        LOG_PATH.read_text(encoding="utf-8") if LOG_PATH.exists() else "# Learning log\n\n"
    )

    # Check if Day entry already exists
    pattern = rf"^##\s+Days?\s+{re.escape(day)}\b.*?(?=\n##\s+Days?|\Z)"
    if re.search(pattern, current_text, flags=re.MULTILINE | re.DOTALL):
        # Update existing
        updated = re.sub(pattern, entry_body.strip(), current_text, flags=re.MULTILINE | re.DOTALL)
        LOG_PATH.write_text(updated, encoding="utf-8")
        print(f"Updated Day {day} entry in {LOG_PATH.name}.")
    else:
        # Append to end
        with open(LOG_PATH, "a", encoding="utf-8") as f:
            if not current_text.endswith("\n\n"):
                f.write("\n")
            f.write(entry_body + "\n")
        print(f"Added Day {day} entry to {LOG_PATH.name}.")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Log daily learning progress.")
    parser.add_argument("--status", action="store_true", help="Print overall progress status.")
    parser.add_argument("--drill", action="store_true", help="Run a 10-minute active recall drill.")
    parser.add_argument("--day", type=str, help="Day number (e.g., 1, 0.2, 16).")
    parser.add_argument("--hours", type=str, default="5", help="Hours spent (default: 5).")
    parser.add_argument("--built", type=str, help="What you built today.")
    parser.add_argument("--worked", type=str, help="What worked well.")
    parser.add_argument("--surprised", type=str, help="What surprised you.")
    parser.add_argument("--fuzzy", type=str, help="What is still fuzzy.")
    parser.add_argument("--numbers", type=str, help="Metrics: cost/request, p95, eval score.")

    args = parser.parse_args(argv)

    if args.drill:
        run_drill()
        return 0

    if args.status:
        show_status()
        return 0

    course_days = load_course_days()
    logged = parse_logged_days()

    # Determine day
    day = args.day
    if not day:
        # Suggest next unlogged day
        next_day = "1"
        for d in course_days:
            if d not in logged:
                next_day = d
                break
        try:
            day = input(f"Day identifier [{next_day}]: ").strip() or next_day
        except EOFError:
            day = next_day

    topic = course_days.get(day, "Engineering Focus")

    date_str = datetime.datetime.now(tz=datetime.UTC).date().isoformat()
    hours = args.hours

    built = args.built
    if built is None:
        try:
            built = input("Built (deliverable): ").strip()
        except EOFError:
            built = ""

    worked = args.worked
    if worked is None:
        try:
            worked = input("Worked: ").strip()
        except EOFError:
            worked = ""

    surprised = args.surprised
    if surprised is None:
        try:
            surprised = input("Surprised me: ").strip()
        except EOFError:
            surprised = ""

    fuzzy = args.fuzzy
    if fuzzy is None:
        try:
            fuzzy = input("Still fuzzy: ").strip()
        except EOFError:
            fuzzy = ""

    numbers = args.numbers
    if numbers is None:
        default_num = "cost/req $0.00 · p95 0ms · eval 0.00"
        try:
            numbers = input(f"Numbers [{default_num}]: ").strip() or default_num
        except EOFError:
            numbers = default_num

    append_or_update_log(
        day=day,
        topic=topic,
        date_str=date_str,
        hours=hours,
        built=built,
        worked=worked,
        surprised=surprised,
        fuzzy=fuzzy,
        numbers=numbers,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
