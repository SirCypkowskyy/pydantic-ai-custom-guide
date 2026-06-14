"""Chapter 17: Advanced tools and toolsets.

Shows how to move beyond single ``@agent.tool`` functions and organize behaviour
into reusable, composable toolsets:

1. a ``FunctionToolset`` that groups related tools and carries its own instructions,
2. a dynamic ``prepare`` function that hides a tool unless the run context allows it,
3. ``CombinedToolset`` with ``prefixed`` and ``filtered`` to merge and trim toolsets.

Run it with: ``uv run sandbox/17-advanced-tools/main.py``
"""

from __future__ import annotations

from dataclasses import dataclass

from pydantic_ai import (
    Agent,
    CombinedToolset,
    FunctionToolset,
    RunContext,
    ToolDefinition,
)

from pai_sandbox_shared import ollama_model


@dataclass
class Session:
    """Typed dependencies that control which tools a run may use."""

    user: str
    is_admin: bool


# A toolset groups related tools and ships its own usage instructions, so any
# agent that mounts it inherits the guidance without repeating it.
weather_toolset = FunctionToolset[Session](
    instructions="Use the weather tools to answer any question about temperature.",
)


@weather_toolset.tool_plain
def temperature_celsius(city: str) -> float:
    """Return the temperature in a city in degrees Celsius."""
    return {"Krakow": 21.0, "Gdansk": 18.0}.get(city, 20.0)


@weather_toolset.tool
def conditions(ctx: RunContext[Session], city: str) -> str:
    """Return the current sky conditions, alternating across run steps."""
    _ = city
    return "It is sunny." if ctx.run_step % 2 == 0 else "It is raining."


# A second toolset whose admin tool is gated by a dynamic prepare function.
admin_toolset = FunctionToolset[Session]()


async def only_for_admins(
    ctx: RunContext[Session],
    tool_def: ToolDefinition,
) -> ToolDefinition | None:
    """Expose the tool only when the session belongs to an administrator."""
    return tool_def if ctx.deps.is_admin else None


@admin_toolset.tool(prepare=only_for_admins)
def reset_password(ctx: RunContext[Session], account: str) -> str:
    """Reset the password for an account, available to admins only."""
    return f"{ctx.deps.user} reset the password for {account}."


# Compose both toolsets into one, prefixing names to avoid clashes and filtering
# out the noisy raw conditions tool from the model's view.
combined_toolset = CombinedToolset[Session](
    [
        weather_toolset.prefixed("weather"),
        admin_toolset.prefixed("admin"),
    ],
).filtered(lambda _ctx, tool_def: not tool_def.name.endswith("conditions"))

agent = Agent(
    ollama_model("qwen3-coder:480b"),
    deps_type=Session,
    instructions="Answer in one short sentence. Call a tool when one fits.",
    toolsets=[combined_toolset],
)


def run_guest() -> None:
    """Run as a guest, where the admin tool is hidden by ``prepare``."""
    result = agent.run_sync(
        "What is the temperature in Krakow?",
        deps=Session(user="guest", is_admin=False),
    )
    print("Guest:", result.output)


def run_admin() -> None:
    """Run as an admin, where the gated password tool becomes available."""
    result = agent.run_sync(
        "Reset the password for the account 'finance'.",
        deps=Session(user="root", is_admin=True),
    )
    print("Admin:", result.output)


if __name__ == "__main__":
    run_guest()
    run_admin()
