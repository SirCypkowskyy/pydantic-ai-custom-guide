"""Chapter 21: a Claude-like assistant.

Brings together a skill packaged as a capability and a human-in-the-loop approval loop for a
sensitive tool. The scenario is scripted so it runs end to end without manual input: the
weather skill is allowed, deleting a file is denied.

Run it with: ``uv run sandbox/21-claude-like-assistant/main.py``
"""

from __future__ import annotations

from pydantic_ai import (
    Agent,
    DeferredToolRequests,
    DeferredToolResults,
    ToolDenied,
)
from pydantic_ai.capabilities import Capability

from pai_sandbox_shared import ollama_model

# A "weather" skill packaged as a capability. Capabilities are the primary extension point:
# one unit can bundle tools, instructions, model settings, and lifecycle hooks. Add
# defer_loading=True to make it load on demand, the way Claude reveals skills progressively.
weather = Capability(
    id="weather",
    description="Check the weather for a city.",
    instructions="Report the temperature concisely.",
)


@weather.tool_plain
def temperature(city: str) -> str:
    """Return the current temperature for a city."""
    return f"It is 18 degrees in {city}."


agent = Agent(
    # A tool-capable model. Swap for any model that supports function calling.
    ollama_model("qwen3-coder:480b"),
    instructions="You are a helpful assistant. Use the skills you have.",
    output_type=[str, DeferredToolRequests],
    capabilities=[weather],
)


@agent.tool_plain(requires_approval=True)
def delete_file(path: str) -> str:
    """Delete a file. Always requires human approval."""
    return f"Deleted {path!r}."


def decide(requests: DeferredToolRequests) -> DeferredToolResults:
    """Approve everything except file deletion (the human in the loop)."""
    results = DeferredToolResults()
    for call in requests.approvals:
        if call.tool_name == "delete_file":
            results.approvals[call.tool_call_id] = ToolDenied("Deleting files is not allowed.")
        else:
            results.approvals[call.tool_call_id] = True
    return results


def main() -> None:
    """Run one turn, resolve any approval requests, then resume."""
    result = agent.run_sync("What is the weather in Krakow, and please delete temp.txt.")

    while isinstance(result.output, DeferredToolRequests):
        print("Approval requested for:", [c.tool_name for c in result.output.approvals])
        results = decide(result.output)
        result = agent.run_sync(
            "",
            message_history=result.all_messages(),
            deferred_tool_results=results,
        )

    print("Assistant:", result.output)


if __name__ == "__main__":
    main()
