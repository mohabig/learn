#!/usr/bin/env python3
"""Test suite for Lab 02: Inverted Retrieval Bug."""

import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from labs.lab_02_inverted_retrieval.search import (
    broken_search,
    fixed_search,
    cosine_similarity,
)


class TestLab02(unittest.TestCase):
    def setUp(self):
        # Query about database indexing
        self.query_vec = [1.0, 0.0, 0.0]

        # 3 documents: doc1 is closest, doc2 is neutral, doc3 is opposite
        self.corpus = [
            {"id": "doc1", "text": "PostgreSQL indexing and B-trees", "vector": [0.95, 0.05, 0.0]},
            {"id": "doc2", "text": "Cooking pasta and tomato sauce", "vector": [0.0, 1.0, 0.0]},
            {"id": "doc3", "text": "Antarctic weather patterns", "vector": [-0.95, -0.05, 0.0]},
        ]

    def test_broken_search_returns_least_relevant_first(self):
        results = broken_search(self.query_vec, self.corpus, top_k=1)
        # Broken search puts the opposite document (doc3) at rank 1!
        self.assertEqual(results[0]["id"], "doc3")

    def test_fixed_search_ranks_highest_similarity_first(self):
        results = fixed_search(self.query_vec, self.corpus, top_k=3)
        self.assertEqual(results[0]["id"], "doc1")
        self.assertEqual(results[1]["id"], "doc2")
        self.assertEqual(results[2]["id"], "doc3")


if __name__ == "__main__":
    unittest.main()
