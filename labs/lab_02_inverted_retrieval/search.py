"""Lab 02: Inverted Vector Retrieval Bug.

Scenario:
A RAG system is returning completely nonsensical chunks for user queries.
Upon inspection, the retrieval engine calculates vector cosine similarity,
but sorts candidates in ASCENDING order (or confuses cosine distance with cosine similarity).
"""

from __future__ import annotations

import math


def dot_product(v1: list[float], v2: list[float]) -> float:
    return sum(a * b for a, b in zip(v1, v2))


def vector_norm(v: list[float]) -> float:
    return math.sqrt(sum(a * a for a in v))


def cosine_similarity(v1: list[float], v2: list[float]) -> float:
    norm1 = vector_norm(v1)
    norm2 = vector_norm(v2)
    if norm1 == 0.0 or norm2 == 0.0:
        return 0.0
    return dot_product(v1, v2) / (norm1 * norm2)


def cosine_distance(v1: list[float], v2: list[float]) -> float:
    """Cosine distance = 1 - cosine similarity."""
    return 1.0 - cosine_similarity(v1, v2)


def broken_search(
    query_vector: list[float],
    corpus: list[dict[str, any]],
    top_k: int = 3,
) -> list[dict[str, any]]:
    """BROKEN: Sorts cosine similarities in ascending order.

    Returns the chunks that are LEAST similar to the query at rank 1!
    """
    scored = []
    for item in corpus:
        sim = cosine_similarity(query_vector, item["vector"])
        scored.append((sim, item))

    # BUG: default ascending order sorts lowest similarity first!
    scored.sort(key=lambda x: x[0])
    return [item for _, item in scored[:top_k]]


def fixed_search(
    query_vector: list[float],
    corpus: list[dict[str, any]],
    top_k: int = 3,
) -> list[dict[str, any]]:
    """FIXED: Sorts cosine similarities in descending order (highest score first)."""
    scored = []
    for item in corpus:
        sim = cosine_similarity(query_vector, item["vector"])
        scored.append((sim, item))

    # Sort descending by similarity
    scored.sort(key=lambda x: x[0], reverse=True)
    return [item for _, item in scored[:top_k]]
