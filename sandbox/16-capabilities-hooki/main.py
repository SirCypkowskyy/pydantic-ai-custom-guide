"""Chapter 16: Capabilities and hooks.

Shows the two extension points from the chapter against a real model on Ollama Cloud:

1. a ``Capability`` that bundles instructions plus a function tool into one unit,
2. a ``Hooks`` capability that intercepts the run lifecycle for logging and metrics,
3. a guardrail hook that blocks a destructive tool with ``SkipToolExecution``.

A capability is a reusable, composable unit of agent behavior. Hooks let you observe
and modify what happens at each stage of a run without subclassing anything.

Run it with: ``uv run sandbox/16-capabilities-hooki/main.py``
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import TYPE_CHECKING

from pydantic_ai import Agent, ModelRequestContext, RunContext
from pydantic_ai.capabilities import Capability, Hooks, ValidatedToolArgs
from pydantic_ai.exceptions import SkipToolExecution

from pai_sandbox_shared import ollama_model

if TYPE_CHECKING:
    from pydantic_ai.messages import ToolCallPart
    from pydantic_ai.tools import ToolDefinition


@dataclass
class RunStats:
    """Typed dependencies that the hooks fill in as the run progresses."""

    model_requests: int = 0
    tool_calls: list[str] = field(default_factory=list)
    blocked_calls: list[str] = field(default_factory=list)


# A Capability bundles instructions and tools into one reusable unit. Instead of
# threading instructions and a toolset separately into the Agent, they travel together.
support = Capability(
    id="support",
    instructions="You are a billing support agent. Use the tools to look things up.",
)


@support.tool_plain
def lookup_invoice(invoice_id: str) -> str:
    """Look up the status of an invoice by its id."""
    return f"Invoice {invoice_id}: paid on 2026-05-01, amount 49.00 PLN."


@support.tool_plain
def delete_invoice(invoice_id: str) -> str:
    """Permanently delete an invoice. This is a destructive action."""
    return f"Invoice {invoice_id} deleted."


def build_hooks() -> Hooks[RunStats]:
    """Build a ``Hooks`` capability that logs requests and guards a destructive tool.

    Returns:
        A configured :class:`Hooks` instance ready to pass into an agent.

    """
    hooks: Hooks[RunStats] = Hooks()

    @hooks.on.before_model_request
    async def count_requests(
        ctx: RunContext[RunStats],
        request_context: ModelRequestContext,
    ) -> ModelRequestContext:
        """Count every outgoing model request before it is sent."""
        ctx.deps.model_requests += 1
        return request_context

    @hooks.on.before_tool_execute
    async def guard_tools(
        ctx: RunContext[RunStats],
        *,
        call: ToolCallPart,
        tool_def: ToolDefinition,
        args: ValidatedToolArgs,
    ) -> ValidatedToolArgs:
        """Record each tool call and block the destructive one with a safe result."""
        _ = tool_def
        ctx.deps.tool_calls.append(call.tool_name)
        if call.tool_name == "delete_invoice":
            ctx.deps.blocked_calls.append(call.tool_name)
            raise SkipToolExecution("Refused: deleting invoices needs human approval.")
        return args

    return hooks


agent = Agent(
    ollama_model("qwen3-coder:480b"),
    deps_type=RunStats,
    capabilities=[support, build_hooks()],
)


def run_demo() -> None:
    """Run one turn and print the model output alongside the stats the hooks gathered."""
    stats = RunStats()
    result = agent.run_sync(
        "Look up invoice INV-42, then delete it.",
        deps=stats,
    )
    print("Output:", result.output)
    print("Model requests:", stats.model_requests)
    print("Tool calls:", stats.tool_calls)
    print("Blocked calls:", stats.blocked_calls)


if __name__ == "__main__":
    run_demo()
