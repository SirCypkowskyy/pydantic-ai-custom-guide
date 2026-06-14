"""Chapter 8: Streaming.

Shows the three streaming patterns from the chapter against a real model on
Ollama Cloud:

1. streaming plain text token by token with ``stream_text(delta=True)``,
2. streaming a structured output that fills in field by field with
   ``stream_output()``,
3. streaming raw run events with ``run_stream_events()`` to watch the model
   build its response part by part.

Streaming only works inside an async context, so every demo here is awaited
and the whole script is driven by a single ``asyncio.run`` at the bottom.

Run it with: ``uv run sandbox/08-streaming/main.py``
"""

from __future__ import annotations

import asyncio

from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.messages import PartDeltaEvent, PartStartEvent, TextPartDelta

from pai_sandbox_shared import ollama_model

# A plain text agent used to demonstrate token streaming.
text_agent = Agent(
    ollama_model(),
    instructions="Odpowiadaj po polsku, jednym akapitem.",
)


class Recipe(BaseModel):
    """Structured output that the model fills in gradually while streaming."""

    name: str
    ingredients: list[str]
    steps: list[str]


# A structured agent whose output is built up field by field during the stream.
recipe_agent = Agent(
    ollama_model(),
    output_type=Recipe,
    instructions="Zwracaj prosty przepis kulinarny po polsku.",
)


async def stream_plain_text() -> None:
    """Stream a text answer as deltas, printing each chunk as it arrives."""
    print("--- stream_text (delta) ---")
    async with text_agent.run_stream("Opisz krótko, czym jest Pydantic AI.") as result:
        async for chunk in result.stream_text(delta=True):
            print(chunk, end="", flush=True)
    print()


async def stream_structured_output() -> None:
    """Stream a structured output, printing each partial snapshot."""
    print("--- stream_output (partial structured) ---")
    async with recipe_agent.run_stream("Podaj przepis na naleśniki.") as result:
        async for partial in result.stream_output():
            print(partial)


async def stream_events() -> None:
    """Stream low level run events and print every text delta the model emits."""
    print("--- run_stream_events ---")
    async with text_agent.run_stream_events("Wymień trzy zalety strumieniowania.") as stream:
        async for event in stream:
            if isinstance(event, PartStartEvent):
                print(f"[start part {event.index}]")
            elif isinstance(event, PartDeltaEvent) and isinstance(event.delta, TextPartDelta):
                print(event.delta.content_delta, end="", flush=True)
    print()


async def main() -> None:
    """Run the three streaming demos in order."""
    await stream_plain_text()
    await stream_structured_output()
    await stream_events()


if __name__ == "__main__":
    asyncio.run(main())
