"""Chapter 1: Install and first agent.

The smallest useful Pydantic AI program. After installing the package you create
a single ``Agent``, give it static instructions, and call ``run_sync`` to get an
answer back from a real model on Ollama Cloud.

Run it with: ``uv run sandbox/01-instalacja/main.py``
"""

from __future__ import annotations

from pydantic_ai import Agent

from pai_sandbox_shared import ollama_model

# Your first agent: a model plus a line of instructions, defined once at module level.
first_agent = Agent(
    ollama_model(),
    instructions="Jestes pomocnym asystentem. Odpowiadaj krotko, po polsku.",
)


def main() -> None:
    """Ask the agent a single question and print its answer."""
    result = first_agent.run_sync("Czym jest Pydantic AI w jednym zdaniu?")
    print("Odpowiedz:", result.output)


if __name__ == "__main__":
    main()
