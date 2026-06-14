"""Smoke test for chapter 1.

Runs the first agent against Ollama Cloud and checks that it produces a non-empty
answer. Skipped automatically when no API key is configured, so it stays green offline.
"""

from __future__ import annotations

import os

import pytest
from pydantic_ai import Agent

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


@requires_key
def test_first_agent_answers() -> None:
    agent = Agent(ollama_model(), instructions="Answer in one short sentence.")
    result = agent.run_sync("Say hello.")
    assert result.output.strip()
