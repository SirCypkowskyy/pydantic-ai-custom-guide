"""Smoke test for chapter 12.

Two checks:

1. an offline check that Logfire can be configured and Pydantic AI instrumented
   without a token or network, which is the heart of the chapter,
2. a live check that an instrumented, tool-using agent answers, skipped when no
   Ollama Cloud key is configured so the suite stays green offline.
"""

from __future__ import annotations

import os

import logfire
import pytest
from pydantic_ai import Agent, RunContext

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


def test_logfire_instruments_offline() -> None:
    """Configuring Logfire and instrumenting agents must not require a token."""
    logfire.configure(send_to_logfire=False, service_name="ch12-smoke")
    logfire.instrument_pydantic_ai()
    with logfire.span("smoke span") as span:
        assert span is not None


@requires_key
def test_instrumented_agent_uses_tool() -> None:
    logfire.configure(send_to_logfire=False, service_name="ch12-smoke-live")
    logfire.instrument_pydantic_ai()

    agent = Agent(
        ollama_model("qwen3-coder:480b"),
        deps_type=dict[str, str],
        instructions="Use the tool to look up the value, then answer with just that value.",
    )

    @agent.tool
    def lookup(ctx: RunContext[dict[str, str]], key: str) -> str:
        return ctx.deps.get(key, "unknown")

    result = agent.run_sync("What is the value for key 'answer'?", deps={"answer": "42"})
    assert "42" in result.output
