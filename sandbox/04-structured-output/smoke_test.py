"""Smoke test for chapter 4.

Runs the agent against Ollama Cloud and checks that it returns a parsed,
typed object instead of free-form text. Skipped when no API key is set,
so the suite stays green offline.
"""

from __future__ import annotations

import os

import pytest
from pydantic import BaseModel
from pydantic_ai import Agent

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


class CityLocation(BaseModel):
    """Minimal structured output used by the smoke test."""

    city: str
    country: str


@requires_key
def test_structured_output() -> None:
    agent = Agent(
        ollama_model("qwen3-coder:480b"),
        output_type=CityLocation,
        instructions="Return the city and country.",
    )
    result = agent.run_sync("Where were the 2012 Olympics held?")
    assert isinstance(result.output, CityLocation)
    assert "london" in result.output.city.lower()
