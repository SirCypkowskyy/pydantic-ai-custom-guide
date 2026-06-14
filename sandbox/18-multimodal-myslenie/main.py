"""Chapter 18: Multimodal input and thinking.

Shows the two ideas from the chapter against real models on Ollama Cloud:

1. multimodal input: a user prompt that mixes plain text with an ``ImageUrl``,
   answered by a vision-capable model,
2. thinking: enabling step-by-step reasoning through the ``Thinking`` capability
   and reading the resulting ``ThinkingPart`` out of the response.

A user prompt is a list whose items can be plain strings or content objects such
as ``ImageUrl``, ``BinaryContent`` or ``DocumentUrl``. The model receives every
item in order, so text and media can be interleaved freely.

Run it with: ``uv run sandbox/18-multimodal-myslenie/main.py``
"""

from __future__ import annotations

import asyncio

from pydantic_ai import Agent, ImageUrl
from pydantic_ai.capabilities import Thinking
from pydantic_ai.messages import ThinkingPart

from pai_sandbox_shared import ollama_model

# Logo of the Pydantic project, used as the multimodal demo image.
PYDANTIC_LOGO_URL = "https://iili.io/3Hs4FMg.png"

# A vision-capable model is required to read an image part.
vision_agent = Agent(
    ollama_model("qwen3-vl:235b-instruct"),
    instructions="Describe the image briefly, in one sentence, in English.",
)

# Thinking is requested with the unified Thinking capability so the model reasons
# step by step before answering. The reasoning lands in a ThinkingPart.
thinking_agent = Agent(
    ollama_model("qwen3:32b"),
    instructions="Solve the puzzle and give only the final answer.",
    capabilities=[Thinking(effort="high")],
)


async def run_vision() -> None:
    """Send a prompt that mixes text and an image to the vision agent."""
    result = await vision_agent.run(
        [
            "What company does this logo belong to?",
            ImageUrl(url=PYDANTIC_LOGO_URL),
        ],
    )
    print("Vision:", result.output)


async def run_thinking() -> None:
    """Ask a reasoning model to think, then read its thinking and answer apart."""
    result = await thinking_agent.run(
        "A bat and a ball cost 1.10 in total. The bat costs 1.00 more than the "
        "ball. How much does the ball cost?",
    )
    thoughts = [
        part.content
        for message in result.all_messages()
        for part in message.parts
        if isinstance(part, ThinkingPart)
    ]
    if thoughts:
        print("Thinking:", thoughts[0][:200])
    print("Answer:", result.output)


async def main() -> None:
    """Run the multimodal demo and the thinking demo in sequence."""
    await run_vision()
    await run_thinking()


if __name__ == "__main__":
    asyncio.run(main())
