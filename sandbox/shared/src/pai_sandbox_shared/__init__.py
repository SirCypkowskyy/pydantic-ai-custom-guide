"""Shared helpers for the Pydantic AI sandbox.

Every example reuses :func:`ollama_model` so the Ollama Cloud configuration lives in one
place. The API key is read from the repository ``.env`` file.
"""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv
from pydantic_ai.models.openai import OpenAIChatModel
from pydantic_ai.providers.openai import OpenAIProvider

OLLAMA_BASE_URL = "https://ollama.com/v1"
"""OpenAI-compatible endpoint exposed by Ollama Cloud."""

DEFAULT_MODEL = "gemma3:12b"
"""Small, fast default used for smoke tests. Override per call or via ``OLLAMA_MODEL``."""


def load_env() -> None:
    """Load the repository ``.env`` from the current directory or the repo root."""
    for candidate in (Path.cwd() / ".env", Path(__file__).resolve().parents[4] / ".env"):
        if candidate.exists():
            load_dotenv(candidate)
            return
    load_dotenv()


def ollama_model(name: str | None = None) -> OpenAIChatModel:
    """Build an :class:`OpenAIChatModel` pointed at Ollama Cloud.

    Args:
        name: Model id to use. Falls back to ``OLLAMA_MODEL`` then :data:`DEFAULT_MODEL`.

    Returns:
        A configured model ready to pass to ``Agent``.

    Raises:
        RuntimeError: If ``OLLAMA_CLOUD_API_KEY`` is not set.

    """
    load_env()
    api_key = os.getenv("OLLAMA_CLOUD_API_KEY")
    if not api_key:
        msg = "Set OLLAMA_CLOUD_API_KEY in the repository .env file to run the examples."
        raise RuntimeError(msg)

    model_name = name or os.getenv("OLLAMA_MODEL") or DEFAULT_MODEL
    return OpenAIChatModel(
        model_name,
        provider=OpenAIProvider(base_url=OLLAMA_BASE_URL, api_key=api_key),
    )


__all__ = ["DEFAULT_MODEL", "OLLAMA_BASE_URL", "load_env", "ollama_model"]
