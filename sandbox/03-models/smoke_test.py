"""Smoke test for chapter 3.

Checks that a ``FallbackModel`` recovers from a broken first model and that the
shared provider answers. Skipped automatically when no API key is configured, so
it stays green offline.
"""

from __future__ import annotations

import os

import pytest
from pydantic_ai import Agent
from pydantic_ai.messages import ModelResponse
from pydantic_ai.models.fallback import FallbackModel

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


@requires_key
def test_fallback_recovers_from_broken_model() -> None:
    """A bad first model must hand off to the working second model."""
    model = FallbackModel(
        ollama_model("this-model-does-not-exist"),
        ollama_model("gemma3:12b"),
    )
    agent = Agent(model, instructions="Answer in one short sentence.")
    result = agent.run_sync("What is the capital of Poland?")
    assert result.output.strip()
    assert "warsaw" in result.output.lower() or "warszawa" in result.output.lower()
    responses = [m for m in result.all_messages() if isinstance(m, ModelResponse)]
    assert responses[-1].model_name == "gemma3:12b"
