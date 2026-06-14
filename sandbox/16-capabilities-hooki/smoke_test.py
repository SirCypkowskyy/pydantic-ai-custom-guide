"""Offline smoke test for chapter 16.

Builds an agent from the project's own ``Capability`` and ``Hooks`` definitions but swaps
in a :class:`TestModel`, so the lifecycle hooks and the capability tool run with no API key.
"""

from __future__ import annotations

from pydantic_ai import Agent
from pydantic_ai.models.test import TestModel

from pai_sandbox_shared import load_main

_m = load_main(__file__)


def test_capability_tool_is_callable() -> None:
    """The capability's tool runs and the request-counting hook fires."""
    stats = _m.RunStats()
    agent = Agent(
        TestModel(call_tools=["lookup_invoice"]),
        deps_type=_m.RunStats,
        capabilities=[_m.support, _m.build_hooks()],
    )
    result = agent.run_sync("Look up invoice INV-42.", deps=stats)
    assert "lookup_invoice" in result.output
    assert stats.model_requests >= 1
    assert "lookup_invoice" in stats.tool_calls
    assert stats.blocked_calls == []


def test_guardrail_blocks_destructive_tool() -> None:
    """The guardrail hook blocks ``delete_invoice`` via ``SkipToolExecution``."""
    stats = _m.RunStats()
    agent = Agent(
        TestModel(call_tools=["delete_invoice"]),
        deps_type=_m.RunStats,
        capabilities=[_m.support, _m.build_hooks()],
    )
    result = agent.run_sync("Delete invoice INV-42.", deps=stats)
    assert "delete_invoice" in stats.tool_calls
    assert "delete_invoice" in stats.blocked_calls
    assert "approval" in result.output.lower()
