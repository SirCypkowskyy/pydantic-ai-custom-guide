"""Chapter 3: Models and providers.

Shows how the model behind an agent is just another piece of configuration:

1. an OpenAI-compatible provider (Ollama Cloud) built once in the shared helper,
2. per-model ``ModelSettings`` such as temperature and token limits,
3. a ``FallbackModel`` that tries a second model when the first one fails.

Run it with: ``uv run sandbox/03-modele/main.py``
"""

from __future__ import annotations

import asyncio
import os

from pydantic_ai import Agent, ModelSettings
from pydantic_ai.messages import ModelResponse
from pydantic_ai.models.fallback import FallbackModel
from pydantic_ai.models.openai import OpenAIChatModel
from pydantic_ai.providers.openai import OpenAIProvider

from pai_sandbox_shared import OLLAMA_BASE_URL, load_env, ollama_model

# 1. The simplest case: reuse the shared OpenAI-compatible model.
# ``ollama_model`` wraps ``OpenAIChatModel`` + ``OpenAIProvider`` pointed at Ollama Cloud.
plain_agent = Agent(
    ollama_model(),
    instructions="Odpowiadaj zwięźle, jednym zdaniem, po polsku.",
)


def build_tuned_model() -> OpenAIChatModel:
    """Build a model with explicit provider and ``ModelSettings``.

    This mirrors what ``ollama_model`` does internally, but spells out the
    provider and settings so the chapter can talk about each piece.

    Returns:
        A configured model with a low temperature for deterministic answers.

    """
    load_env()
    api_key = os.environ["OLLAMA_CLOUD_API_KEY"]
    return OpenAIChatModel(
        "gemma3:12b",
        provider=OpenAIProvider(base_url=OLLAMA_BASE_URL, api_key=api_key),
        settings=ModelSettings(temperature=0.0, max_tokens=200),
    )


# 2. An agent whose model carries its own settings.
tuned_agent = Agent(
    build_tuned_model(),
    instructions="Answer with a single number and nothing else.",
)


# 3. A FallbackModel: if the first model errors, the next one is tried.
# Here both point at Ollama Cloud, but the first uses an intentionally bad
# model id so the fallback to a real model is exercised.
fallback_model = FallbackModel(
    ollama_model("this-model-does-not-exist"),
    ollama_model("gemma3:12b"),
)
resilient_agent = Agent(
    fallback_model,
    instructions="Reply in one short English sentence.",
)


def run_plain() -> None:
    """Run synchronously against the shared model."""
    result = plain_agent.run_sync("Czym jest provider w Pydantic AI?")
    print("Plain:", result.output)


def run_tuned() -> None:
    """Run synchronously against the model with explicit settings."""
    result = tuned_agent.run_sync("What is two plus two?")
    print("Tuned:", result.output)


async def run_fallback() -> None:
    """Run asynchronously, falling back from a broken model to a working one."""
    result = await resilient_agent.run("Name one planet in the solar system.")
    print("Fallback:", result.output)
    responses = [m for m in result.all_messages() if isinstance(m, ModelResponse)]
    print("Used model:", responses[-1].model_name)


if __name__ == "__main__":
    run_plain()
    run_tuned()
    asyncio.run(run_fallback())
