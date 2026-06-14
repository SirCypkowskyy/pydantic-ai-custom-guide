"""Offline smoke test for chapter 17.

Uses ``TestModel`` to inspect which tools each run exposes, so the composition,
prefixing, filtering, and ``prepare`` gating are verified without an API key.
"""

from __future__ import annotations

from pydantic_ai import Agent
from pydantic_ai.models.test import TestModel

from pai_sandbox_shared import load_main

_m = load_main(__file__)


def _available_tool_names(test_model: TestModel) -> list[str]:
    """Return the tool names the model saw on its last request."""
    params = test_model.last_model_request_parameters
    assert params is not None
    return [tool.name for tool in params.function_tools]


def test_guest_hides_admin_tool() -> None:
    """A non-admin session exposes weather tools but not the gated admin tool."""
    test_model = TestModel(call_tools=[])
    agent = Agent(test_model, deps_type=_m.Session, toolsets=[_m.combined_toolset])
    agent.run_sync("hi", deps=_m.Session(user="guest", is_admin=False))

    names = _available_tool_names(test_model)
    assert "weather_temperature_celsius" in names
    assert "admin_reset_password" not in names
    # The filtered toolset drops the conditions tool for everyone.
    assert not any(name.endswith("conditions") for name in names)


def test_admin_unlocks_gated_tool() -> None:
    """An admin session unlocks the prepare-gated admin tool."""
    test_model = TestModel(call_tools=[])
    agent = Agent(test_model, deps_type=_m.Session, toolsets=[_m.combined_toolset])
    agent.run_sync("hi", deps=_m.Session(user="root", is_admin=True))

    assert "admin_reset_password" in _available_tool_names(test_model)
