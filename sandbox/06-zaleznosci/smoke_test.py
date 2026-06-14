"""Smoke test for chapter 6.

Runs an agent that must read injected dependencies through a tool to answer.
Skipped automatically when no API key is configured, so it stays green offline.
"""

from __future__ import annotations

import os
from dataclasses import dataclass

import pytest
from pydantic_ai import Agent, RunContext

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


@dataclass(frozen=True)
class Deps:
    """Dependencies the tool reads at run time."""

    ticket_code: str


@requires_key
def test_tool_reads_injected_deps() -> None:
    agent = Agent(
        ollama_model("qwen3-coder:480b"),
        deps_type=Deps,
        instructions="Use the reveal_code tool, then reply with exactly the code it returns.",
    )

    @agent.tool
    def reveal_code(ctx: RunContext[Deps]) -> str:
        """Return the ticket code carried by the dependencies."""
        return ctx.deps.ticket_code

    result = agent.run_sync("What is the code?", deps=Deps(ticket_code="ZEBRA42"))
    assert "ZEBRA42" in result.output
