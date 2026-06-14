"""Smoke test for chapter 8.

Streams a plain text answer from Ollama Cloud and checks that the deltas
accumulate into a non-empty response. Skipped automatically when no API key is
configured, so it stays green offline.
"""

from __future__ import annotations

import asyncio
import os

import pytest
from pydantic_ai import Agent

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


async def _collect_answer() -> str:
    """Stream a short answer and join the deltas into one string."""
    agent = Agent(ollama_model(), instructions="Answer in one short sentence.")
    async with agent.run_stream("What is the capital of Poland?") as result:
        chunks = [chunk async for chunk in result.stream_text(delta=True)]
    return "".join(chunks)


@requires_key
def test_stream_text_accumulates() -> None:
    """The streamed deltas should join into a non-empty answer."""
    answer = asyncio.run(_collect_answer())
    assert answer.strip()
    assert "warsaw" in answer.lower() or "warszawa" in answer.lower()
