"""Chapter 14: pydantic-settings.

Shows how to drive an agent from typed, validated configuration instead of
scattered ``os.getenv`` calls:

1. a ``BaseSettings`` class that reads from environment variables and ``.env``,
2. a nested settings model loaded through the ``__`` delimiter,
3. building and running an agent from those settings.

Settings are read once, validated by Pydantic, and then passed explicitly into
the agent. Nothing in the rest of the program touches the environment directly.

Run it with: ``uv run sandbox/14-pydantic-settings/main.py``
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from pydantic import BaseModel, Field
from pydantic_ai import Agent
from pydantic_settings import BaseSettings, SettingsConfigDict

from pai_sandbox_shared import ollama_model

if TYPE_CHECKING:
    from pydantic_ai.models import Model


class AgentTuning(BaseModel):
    """Nested block controlling how chatty and how creative the agent is."""

    temperature: float = Field(default=0.2, ge=0.0, le=2.0)
    max_sentences: int = Field(default=1, ge=1, le=5)


class AppSettings(BaseSettings):
    """Application configuration sourced from the environment and ``.env``.

    Environment variables are prefixed with ``CH14_``. The nested ``tuning``
    block is reached with the ``__`` delimiter, for example::

        CH14_LANGUAGE=en
        CH14_TUNING__TEMPERATURE=0.7
        CH14_TUNING__MAX_SENTENCES=3
    """

    model_config = SettingsConfigDict(
        env_prefix="CH14_",
        env_file=".env",
        env_nested_delimiter="__",
        extra="ignore",
    )

    language: str = "pl"
    tuning: AgentTuning = Field(default_factory=AgentTuning)


def build_agent(settings: AppSettings, model: Model | None = None) -> Agent[None, str]:
    """Create an agent whose behaviour is fully derived from ``settings``.

    Args:
        settings: Validated application configuration.
        model: Model to use. Defaults to the Ollama Cloud model. Tests pass a
            ``TestModel`` here so they can run without a network or API key.

    Returns:
        An agent ready to run.

    """
    instructions = (
        f"Answer in the language with code '{settings.language}'. "
        f"Use at most {settings.tuning.max_sentences} sentence(s)."
    )
    return Agent(model or ollama_model(), instructions=instructions)


def main() -> None:
    """Load settings, build the agent from them, and run a single question."""
    settings = AppSettings()
    print("Loaded settings:", settings.model_dump())

    agent = build_agent(settings)
    result = agent.run_sync("Skąd wzięła się nazwa Pydantic AI?")
    print("Answer:", result.output)


if __name__ == "__main__":
    main()
