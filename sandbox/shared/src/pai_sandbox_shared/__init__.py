"""Shared helpers for the Pydantic AI sandbox.

Every example reuses :func:`ollama_model` so the Ollama Cloud configuration lives in one
place. The API key is read from the repository ``.env`` file.
"""

from __future__ import annotations

import importlib.util
import os
import sys
from pathlib import Path
from typing import TYPE_CHECKING

from dotenv import load_dotenv
from pydantic_ai.models.openai import OpenAIChatModel
from pydantic_ai.providers.openai import OpenAIProvider

if TYPE_CHECKING:
    from types import ModuleType

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

    Construction never fails so that example modules import cleanly even without a key
    (offline tests override the model anyway). A real request without ``OLLAMA_CLOUD_API_KEY``
    set returns an authentication error from the API.

    Args:
        name: Model id to use. Falls back to ``OLLAMA_MODEL`` then :data:`DEFAULT_MODEL`.

    Returns:
        A configured model ready to pass to ``Agent``.

    """
    load_env()
    api_key = os.getenv("OLLAMA_CLOUD_API_KEY") or "OLLAMA_CLOUD_API_KEY-not-set"
    model_name = name or os.getenv("OLLAMA_MODEL") or DEFAULT_MODEL
    return OpenAIChatModel(
        model_name,
        provider=OpenAIProvider(base_url=OLLAMA_BASE_URL, api_key=api_key),
    )


def load_main(test_file: str) -> ModuleType:
    """Import the ``main.py`` next to a test file under a unique module name.

    Lets every example keep a ``main.py`` while ``pytest`` collects them all together,
    without the modules colliding in ``sys.modules``.

    Args:
        test_file: Pass ``__file__`` from the calling test.

    Returns:
        The imported ``main`` module.

    """
    main_path = Path(test_file).resolve().parent / "main.py"
    unique = f"sandbox_main_{main_path.parent.name.replace('-', '_')}"
    spec = importlib.util.spec_from_file_location(unique, main_path)
    if spec is None or spec.loader is None:
        msg = f"Could not load {main_path}"
        raise ImportError(msg)
    module = importlib.util.module_from_spec(spec)
    sys.modules[unique] = module
    spec.loader.exec_module(module)
    return module


__all__ = ["DEFAULT_MODEL", "OLLAMA_BASE_URL", "load_env", "load_main", "ollama_model"]
