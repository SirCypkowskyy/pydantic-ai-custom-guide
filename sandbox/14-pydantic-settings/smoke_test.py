"""Smoke test for chapter 14.

Runs fully offline. It checks that settings are parsed from environment
variables (including the nested ``__`` block) and that an agent built from
those settings answers when driven by ``TestModel`` instead of a real model.
"""

from __future__ import annotations

import pytest
from main import AppSettings, build_agent
from pydantic_ai.models.test import TestModel

from pai_sandbox_shared import load_env

load_env()


@pytest.fixture
def env(monkeypatch: pytest.MonkeyPatch) -> None:
    """Set the chapter's environment variables for a single test."""
    monkeypatch.setenv("CH14_LANGUAGE", "en")
    monkeypatch.setenv("CH14_TUNING__TEMPERATURE", "0.7")
    monkeypatch.setenv("CH14_TUNING__MAX_SENTENCES", "3")


@pytest.mark.usefixtures("env")
def test_settings_parse_nested_block() -> None:
    settings = AppSettings()
    assert settings.language == "en"
    assert settings.tuning.temperature == pytest.approx(0.7)
    assert settings.tuning.max_sentences == 3


@pytest.mark.usefixtures("env")
def test_agent_uses_settings_offline() -> None:
    settings = AppSettings()
    agent = build_agent(settings, model=TestModel())
    result = agent.run_sync("Hello?")
    assert result.output.strip()
