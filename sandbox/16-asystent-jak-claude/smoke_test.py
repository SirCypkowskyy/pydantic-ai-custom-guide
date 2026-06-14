"""Smoke test for chapter 16.

Exercises the human-in-the-loop approval loop with ``TestModel`` so it runs offline and
deterministically: a tool that requires approval is deferred, denied, and the run resumes.
"""

from __future__ import annotations

from pydantic_ai import Agent, DeferredToolRequests, DeferredToolResults, ToolDenied
from pydantic_ai.models.test import TestModel


def build_agent() -> Agent[None, str | DeferredToolRequests]:
    """Build an agent with one approval-gated tool, backed by TestModel."""
    agent = Agent(TestModel(), output_type=[str, DeferredToolRequests])

    @agent.tool_plain(requires_approval=True)
    def delete_file(path: str) -> str:
        return f"Deleted {path!r}."

    return agent


def test_approval_loop_can_deny() -> None:
    agent = build_agent()

    result = agent.run_sync("Delete temp.txt")
    assert isinstance(result.output, DeferredToolRequests)
    assert any(call.tool_name == "delete_file" for call in result.output.approvals)

    decisions = DeferredToolResults()
    for call in result.output.approvals:
        decisions.approvals[call.tool_call_id] = ToolDenied("Deleting files is not allowed.")

    final = agent.run_sync(
        "",
        message_history=result.all_messages(),
        deferred_tool_results=decisions,
    )
    assert isinstance(final.output, str)
