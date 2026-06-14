"""Smoke test for chapter 7.

Runs a two-turn conversation against Ollama Cloud and checks that the second
turn can use the history from the first. Skipped automatically when no API key
is configured, so it stays green offline.
"""

from __future__ import annotations

import os

import pytest
from pydantic_ai import Agent, ModelMessagesTypeAdapter
from pydantic_core import to_jsonable_python

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


@requires_key
def test_history_is_remembered() -> None:
    agent = Agent(ollama_model(), instructions="Answer in one short sentence.")

    first = agent.run_sync("Remember the number 42.")
    assert first.output.strip()

    second = agent.run_sync(
        "Which number did I ask you to remember? Reply with just the number.",
        message_history=first.new_messages(),
    )
    assert "42" in second.output


@requires_key
def test_history_survives_serialization() -> None:
    agent = Agent(ollama_model(), instructions="Answer in one short sentence.")

    first = agent.run_sync("Remember the number 42.")
    restored = ModelMessagesTypeAdapter.validate_python(
        to_jsonable_python(first.all_messages()),
    )
    assert len(restored) == len(first.all_messages())

    resumed = agent.run_sync(
        "Which number did I ask you to remember? Reply with just the number.",
        message_history=restored,
    )
    assert "42" in resumed.output
