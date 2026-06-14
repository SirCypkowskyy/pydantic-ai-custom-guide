"""Smoke test for chapter 9.

Spawns the local MCP server over stdio and checks the round trip directly:
the server advertises its tools and ``direct_call_tool`` runs one of them. This
exercises the real MCP transport without depending on a model deciding to call a
tool, so it is deterministic. Skipped when no API key is configured, matching the
other chapters, since the model is still built through the shared helper.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest
from pydantic_ai import Agent
from pydantic_ai.mcp import MCPServerStdio

from pai_sandbox_shared import load_env, ollama_model

load_env()

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)

SERVER_PATH = Path(__file__).with_name("dice_server.py")


@pytest.fixture
def anyio_backend() -> str:
    """Force the anyio plugin to run async tests on asyncio."""
    return "asyncio"


@requires_key
@pytest.mark.anyio
async def test_mcp_server_round_trip() -> None:
    server = MCPServerStdio(sys.executable, args=[str(SERVER_PATH)], timeout=20)
    agent = Agent(ollama_model("qwen3-coder:480b"), toolsets=[server])
    async with agent:
        tool_names = {tool.name for tool in await server.list_tools()}
        assert {"roll_dice", "sum_values"} <= tool_names

        total = await server.direct_call_tool("sum_values", {"values": [2, 3, 4]})
    assert total == 9
