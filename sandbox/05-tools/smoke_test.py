"""Smoke test for chapter 5.

Runs a tool-using agent against Ollama Cloud and checks that the tool actually
runs and influences the answer. Skipped automatically when no API key is set,
so it stays green offline.
"""

from __future__ import annotations

import os

import pytest
from pydantic_ai import Agent, RunContext

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


@requires_key
def test_agent_uses_tool() -> None:
    calls: list[str] = []
    agent = Agent(
        ollama_model("qwen3-coder:480b"),
        deps_type=list,
        instructions="Use the get_price tool to answer. Do not guess prices.",
    )

    @agent.tool
    def get_price(ctx: RunContext[list[str]], product: str) -> float:
        """Return the price of a product in dollars."""
        ctx.deps.append(product)
        calls.append(product)
        return 7.0

    result = agent.run_sync("How much does one banana cost?", deps=[])
    assert calls, "the model never called the tool"
    assert "7" in result.output
