# Challenge 2: Why Did Search Find Penguins?

> **Severity:** P1 High Escalation / VIP Customer Outage  
> **For learners:** Optional pretend mystery. The examples use fictional or public information; no account or private data is needed.
> **Target:** Eliminate sign-order inversion between distance and similarity to restore RAG precision.

---

## The mystery

Imagine asking a library robot about PostgreSQL and getting an answer about penguins. The model did not choose the penguin page at random: the search program handed it that page first.

The VP tests the copilot with a critical production question:
> *"How do we tune autovacuum freeze max age and diagnose high transaction ID wraparound bloat in PostgreSQL 16?"*

The copilot responds instantly with flawless prose and complete, absolute confidence:
> *"Antarctic emperor penguins endure winter temperatures of -40°C by huddling together in dense circular formations, taking turns rotating between the freezing outer perimeter and the warm interior core."*

Within 10 minutes, the customer support queue catches fire:
- DBAs asking about B-Tree index concurrency receive recipes for artisanal tomato sauce.
- SREs querying WAL replication lag are served historical treatises on the Peloponnesian War.
- The Product Manager barges into the war room: *"The LLM has lost its mind! It's hallucinating uncontrollably. Switch from our self-hosted model to a $30/M-token frontier model right now!"*

You tell the room to stand down. You pull the distributed OpenTelemetry trace and inspect the raw prompt injected into the LLM context window.

---

## The Forensic Crime Scene: The LLM Didn't Hallucinate

The LLM didn't hallucinate a single word. It followed instructions with robotic fidelity:

```
[SYSTEM PROMPT]
You are an expert PostgreSQL DBA assistant. Answer the user's question using ONLY the provided context chunks.

[CONTEXT CHUNK 0] (Rank 1 from Retrieval Engine)
Document ID: doc3
Text: "Antarctic weather patterns and emperor penguin thermal preservation techniques..."

[USER QUERY]
How do we tune autovacuum freeze max age in PostgreSQL 16?
```

The model didn't invent penguins. **Our retrieval engine handed it penguins on a silver platter at Rank 1.**

Out of 2,500,000 embedded documentation chunks in our pgvector database, the search pipeline selected the single most semantically irrelevant, diametrically opposed piece of text in the entire corpus and declared it the #1 match.

---

## The Physical Mechanism & Exploit

In `labs/lab_02_inverted_retrieval/search.py`, look at how candidate vectors are evaluated:

```python
def broken_search(query_vector, corpus, top_k=3):
    scored = []
    for item in corpus:
        # Cosine similarity is computed correctly: [-1.0, 1.0]
        sim = cosine_similarity(query_vector, item["vector"])
        scored.append((sim, item))

    # FATAL SIGN ORDER ERROR:
    # Python's list.sort() defaults to ASCENDING order (smallest numbers first)!
    scored.sort(key=lambda x: x[0])
    return [item for _, item in scored[:top_k]]
```

### The Metric Geometry Crash Course
Here is the key idea: some scores get better as they get bigger (**similarity**); other scores get better as they get smaller (**distance**). Mixing up which direction to sort can put the least related result first.

| Metric | Formula | Value Range | Best Match | Sort Direction |
| :--- | :--- | :--- | :--- | :--- |
| **Cosine Similarity** | $\cos(\theta) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$ | $[-1.0, +1.0]$ | $+1.0$ (Collinear) | **Descending** (`reverse=True`) |
| **Cosine Distance** | $D_C = 1 - \cos(\theta)$ | $[0.0, 2.0]$ | $0.0$ (Identical) | **Ascending** (`reverse=False`) |
| **L2 Euclidean Distance** | $\|\mathbf{u} - \mathbf{v}\|_2 = \sqrt{\sum (u_i - v_i)^2}$ | $[0.0, \infty)$ | $0.0$ (Identical) | **Ascending** (`reverse=False`) |
| **Inner Product (IP)** | $\mathbf{u} \cdot \mathbf{v}$ (Normalized) | $[-1.0, +1.0]$ | $+1.0$ (Maximum) | **Descending** (`reverse=True`) |

### The Exploit / Flaw
Python's `list.sort()` sorts in ascending order by default.
- PostgreSQL DBA Chunk: $\text{Cosine Similarity} = \mathbf{+0.95}$
- Pasta Recipe Chunk: $\text{Cosine Similarity} = \mathbf{0.00}$
- Antarctic Penguin Chunk: $\text{Cosine Similarity} = \mathbf{-0.95}$

Because `scored.sort(key=lambda x: x[0])` sorts ascending, $-0.95$ comes before $+0.95$. 
Try the tiny list of pretend documents. Change the sort direction and see which document appears first. Explain why the result changed.

### The Surgical Fix

```python
def fixed_search(query_vector, corpus, top_k=3):
    scored = []
    for item in corpus:
        sim = cosine_similarity(query_vector, item["vector"])
        scored.append((sim, item))

    # Invariant: Similarity is a MAXIMIZATION metric -> sort DESCENDING
    scored.sort(key=lambda x: x[0], reverse=True)
    return [item for _, item in scored[:top_k]]
```

Alternatively, if an algorithm operates on **Distance**, sort ascending (`1.0 - sim`).

---

## Check your idea

Run the test suite to verify vector space invariants:

```bash
python3 labs/lab_02_inverted_retrieval/test_lab02.py
```

If you run the optional test suite, it checks whether the most similar result comes first. Then make your own three-document example and see if you can predict the order.

### What the optional tests check:
1. `test_broken_search_returns_least_relevant_first`: Proves that `broken_search` systematically isolates the most distant chunk (`doc3`, Antarctic penguins) and returns it at Rank 1.
2. `test_fixed_search_ranks_highest_similarity_first`: Proves that `fixed_search` correctly restores Rank 1 to `doc1` (PostgreSQL indexing), followed by `doc2` (neutral), and demotes `doc3` (opposite) to the bottom.
