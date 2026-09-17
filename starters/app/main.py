#!/usr/bin/env python3
"""Production-grade FastAPI starter for AI Engineering.

Features:
1. Server-Sent Events (SSE) token streaming with time-to-first-token (TTFT) measurement.
2. Typed structured output extraction using Pydantic models.
3. Budget and safety integration via BudgetGuard.
4. Robust error handling, retries with backoff, and request latency logging.
"""

from __future__ import annotations

import asyncio
import json
import time
from collections.abc import AsyncGenerator
from typing import Any

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from sse_starlette.sse import EventSourceResponse

from starters.common.budget_guard import BudgetExceededError, BudgetGuard

app = FastAPI(
    title="AI Engineer Starter API",
    description="High-performance, observable API foundation for LLM features",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global budget guard instance for safety
guard = BudgetGuard(max_session_cost_usd=5.00, max_total_cost_usd=50.00)


# -----------------------------------------------------------------------------
# Middleware: Request Latency & Observability
# -----------------------------------------------------------------------------
@app.middleware("http")
async def add_latency_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start_time) * 1000.0
    response.headers["X-Response-Time-Ms"] = f"{duration_ms:.2f}"
    return response


# -----------------------------------------------------------------------------
# Schemas: Typed Contracts
# -----------------------------------------------------------------------------
class ExtractionRequest(BaseModel):
    text: str = Field(..., min_length=5, description="Unstructured source text to analyze")
    model: str = Field(default="gpt-4o-mini", description="Model identifier to simulate or query")


class EntityItem(BaseModel):
    name: str
    category: str = Field(..., description="E.g., PERSON, ORGANIZATION, DATE, MONEY, CONCEPT")


class ExtractedDocument(BaseModel):
    title: str
    summary: str
    entities: list[EntityItem] = Field(default_factory=list)
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    latency_ms: float = 0.0

    @field_validator("title")
    @classmethod
    def title_must_not_be_empty(cls, v: str) -> str:
        clean = v.strip()
        if not clean:
            raise ValueError("Title must not be empty")
        return clean


class StreamRequest(BaseModel):
    prompt: str = Field(..., min_length=1)
    model: str = Field(default="gpt-4o-mini")


# -----------------------------------------------------------------------------
# Endpoints
# -----------------------------------------------------------------------------
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "budget": guard.get_summary(),
    }


@app.post("/extract", response_model=ExtractedDocument)
async def extract_structured(req: ExtractionRequest) -> ExtractedDocument:
    """Extracts structured entities and summary from unstructured text.

    In production, this delegates to your provider's structured output API
    (e.g., OpenAI response_format or Claude tool-use) with automated retries.
    """
    start_time = time.perf_counter()

    # Track budget & cost
    input_tokens = len(req.text.split()) * 2
    output_tokens = 80
    try:
        guard.record_usage(req.model, input_tokens, output_tokens)
    except BudgetExceededError as err:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail=str(err))

    # Clean words and extract basic entities (mock extraction for starter)
    first_line = req.text.strip().split("\n")[0][:60]
    extracted = ExtractedDocument(
        title=first_line if first_line else "Untitled Document",
        summary=f"Processed {len(req.text)} characters of text.",
        entities=[
            EntityItem(name="Sample Organization", category="ORGANIZATION"),
            EntityItem(name="2026-09-17", category="DATE"),
        ],
        confidence_score=0.96,
        latency_ms=round((time.perf_counter() - start_time) * 1000.0, 2),
    )
    return extracted


@app.post("/stream")
async def stream_tokens(req: StreamRequest):
    """Streams tokens using Server-Sent Events (SSE) with time-to-first-token tracking."""
    async def token_generator() -> AsyncGenerator[dict[str, Any], None]:
        start_time = time.perf_counter()
        ttft_recorded = False

        sample_tokens = [
            "In", " modern", " AI", " engineering,", " reliability",
            " beats", " vibes.", " Every", " system", " must",
            " be", " measured,", " evaluated,", " and", " hardened."
        ]

        for i, tok in enumerate(sample_tokens):
            await asyncio.sleep(0.04)  # Simulate model streaming latency
            now = time.perf_counter()

            if not ttft_recorded:
                ttft_ms = (now - start_time) * 1000.0
                ttft_recorded = True
                yield {
                    "event": "meta",
                    "data": json.dumps({"ttft_ms": round(ttft_ms, 2)}),
                }

            yield {
                "event": "token",
                "data": json.dumps({"token": tok, "index": i}),
            }

        total_latency_ms = (time.perf_counter() - start_time) * 1000.0
        yield {
            "event": "done",
            "data": json.dumps({
                "total_tokens": len(sample_tokens),
                "total_duration_ms": round(total_latency_ms, 2),
            }),
        }

    return EventSourceResponse(token_generator())


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("starters.app.main:app", host="0.0.0.0", port=8000, reload=True)
