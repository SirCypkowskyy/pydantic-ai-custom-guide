"""Chapter 2: Agents.

Shows the three ideas from the chapter against a real model on Ollama Cloud:

1. a minimal agent with static instructions,
2. dynamic instructions that read typed dependencies through ``RunContext``,
3. the difference between ``run_sync`` and the async ``run``.

Run it with: ``uv run sandbox/02-agenty/main.py``
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass

from pydantic_ai import Agent, RunContext

from pai_sandbox_shared import ollama_model

# A single, reusable agent defined once at module level.
basic_agent = Agent(
    ollama_model(),
    instructions="Odpowiadaj zwięźle, jednym zdaniem, po polsku.",
)


@dataclass
class User:
    """Typed dependencies passed into a run."""

    name: str


personal_agent = Agent(
    ollama_model(),
    deps_type=User,
    instructions="Zwracaj się do użytkownika po imieniu.",
)


@personal_agent.instructions
def add_user_name(ctx: RunContext[User]) -> str:
    """Dynamic instruction that depends on the run's dependencies."""
    return f"Użytkownik ma na imię {ctx.deps.name}."


def run_basic() -> None:
    """Synchronous run with ``run_sync``."""
    basic = basic_agent.run_sync("Skąd wzięła się nazwa Pydantic AI?")
    print("Basic:", basic.output)


async def run_personal() -> None:
    """Async run with ``run`` and typed dependencies."""
    personal = await personal_agent.run("Przywitaj się ze mną.", deps=User(name="Franek"))
    print("Personal:", personal.output)


if __name__ == "__main__":
    run_basic()
    asyncio.run(run_personal())
