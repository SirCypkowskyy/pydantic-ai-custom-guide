"""Offline smoke test for chapter 20.

Builds the FastAPI app and checks that the ``/chat`` route is registered, and that the agent
runs with ``TestModel`` so the test needs no API key and no network.
"""

from __future__ import annotations

from pydantic_ai import Agent
from pydantic_ai.models.test import TestModel

from pai_sandbox_shared import load_main


def test_app_exposes_chat_route() -> None:
    main = load_main(__file__)
    paths = {getattr(route, "path", None) for route in main.app.routes}
    assert "/chat" in paths


def test_agent_runs_offline() -> None:
    agent = Agent(TestModel(), instructions="Be brief.")
    result = agent.run_sync("Hello?")
    assert result.output.strip()
