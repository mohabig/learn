#!/usr/bin/env python3
"""Integration tests for AI Engineering Starter API."""

import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

try:
    from fastapi.testclient import TestClient
    from starters.app.main import app
    HAS_DEPS = True
except ImportError as err:
    HAS_DEPS = False
    IMPORT_ERROR = err


class TestStarterAPI(unittest.TestCase):
    def setUp(self):
        if not HAS_DEPS:
            self.fail(
                f"Missing dependencies ({IMPORT_ERROR}). "
                "Tests must be executed via 'uv run --directory starters --extra dev pytest' or after installing dev dependencies."
            )
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "ok")
        self.assertIn("budget", data)
        self.assertIn("session", data["budget"])

    def test_structured_extraction(self):
        payload = {
            "text": "Acme Corp announced record quarterly profits on 2026-09-17.",
            "model": "gpt-4o-mini",
        }
        response = self.client.post("/extract", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(len(data["title"]) > 0)
        self.assertGreaterEqual(data["confidence_score"], 0.0)
        self.assertLessEqual(data["confidence_score"], 1.0)
        self.assertIn("entities", data)

    def test_extraction_validation_failure(self):
        # Text under 5 chars should trigger validation 422
        payload = {"text": "abc"}
        response = self.client.post("/extract", json=payload)
        self.assertEqual(response.status_code, 422)


if __name__ == "__main__":
    unittest.main()
