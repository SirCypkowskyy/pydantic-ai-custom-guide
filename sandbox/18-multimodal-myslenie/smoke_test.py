"""Smoke test for chapter 18.

Runs fully offline with ``FunctionModel`` so it stays green without an API key.
It checks two things: that a multimodal prompt carries its image part through to
the model, and that a reasoning model's thinking is surfaced as a ``ThinkingPart``.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from pydantic_ai import Agent, ImageUrl
from pydantic_ai.messages import (
    ModelResponse,
    TextPart,
    ThinkingPart,
    UserPromptPart,
)
from pydantic_ai.models.function import FunctionModel

if TYPE_CHECKING:
    from collections.abc import Sequence

    from pydantic_ai.messages import ModelMessage
    from pydantic_ai.models.function import AgentInfo


def echo_image_model(messages: Sequence[ModelMessage], _info: AgentInfo) -> ModelResponse:
    """Report back whether the latest user prompt contained an image part."""
    saw_image = False
    for message in messages:
        for part in message.parts:
            if isinstance(part, UserPromptPart) and isinstance(part.content, list):
                saw_image = any(isinstance(item, ImageUrl) for item in part.content)
    verdict = "image-seen" if saw_image else "no-image"
    return ModelResponse(parts=[TextPart(content=verdict)])


def thinking_model(_messages: Sequence[ModelMessage], _info: AgentInfo) -> ModelResponse:
    """Emit a thinking part followed by the final answer."""
    return ModelResponse(
        parts=[
            ThinkingPart(content="The ball is x, the bat is x + 1.00, so 2x = 0.10."),
            TextPart(content="0.05"),
        ],
    )


def test_image_part_reaches_model() -> None:
    """A list prompt mixing text and an image delivers the image to the model."""
    agent = Agent(FunctionModel(echo_image_model))
    result = agent.run_sync(["What is this?", ImageUrl(url="https://example.com/logo.png")])
    assert result.output == "image-seen"


def test_thinking_part_is_separated() -> None:
    """The reasoning lands in a ThinkingPart, while output holds only the answer."""
    agent = Agent(FunctionModel(thinking_model))
    result = agent.run_sync("A bat and a ball cost 1.10 ...")
    thoughts = [
        part.content
        for message in result.all_messages()
        for part in message.parts
        if isinstance(part, ThinkingPart)
    ]
    assert thoughts
    assert result.output == "0.05"
    assert "0.05" not in thoughts[0]
