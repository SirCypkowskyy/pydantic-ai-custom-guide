"""Smoke test for chapter 10.

Runs the editorial graph against Ollama Cloud and checks that it walks from the
``Research`` node to an ``End`` with a non-empty draft. Skipped automatically when
no API key is configured, so it stays green offline.
"""

from __future__ import annotations

import os

import pytest

from pai_sandbox_shared import load_env, load_main

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


@requires_key
def test_pipeline_produces_draft() -> None:
    """The graph should fill state with points and return a non-empty draft."""
    # Imported lazily so test collection stays green without an API key.
    main = load_main(__file__)
    state = main.Article(topic="Czym jest agent w Pydantic AI?")
    result = main.pipeline.run_sync(main.Research(), state=state)
    assert state.points
    assert result.output.strip()
