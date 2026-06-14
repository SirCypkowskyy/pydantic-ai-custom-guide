"""Chapter 9: MCP (Model Context Protocol).

Shows how an agent uses tools that live in a separate process instead of being
defined inline with ``@agent.tool``:

1. spawn a local MCP server (``dice_server.py``) over the stdio transport,
2. attach it to the agent through ``toolsets=[...]``,
3. let the model discover and call the server's tools during a run.

The agent talks to a tool capable model on Ollama Cloud so the dice tools are
actually invoked. The MCP connection is opened with ``async with agent`` so the
subprocess is started and shut down cleanly around the run.

Run it with: ``uv run sandbox/09-mcp/main.py``
"""

from __future__ import annotations

import asyncio
import sys
from pathlib import Path

from pydantic_ai import Agent
from pydantic_ai.mcp import MCPServerStdio

from pai_sandbox_shared import ollama_model

SERVER_PATH = Path(__file__).with_name("dice_server.py")

# Run the MCP server as a subprocess and speak to it over stdin/stdout.
# ``sys.executable`` makes sure the subprocess uses the same interpreter, so the
# ``mcp`` dependency is importable.
dice_server = MCPServerStdio(sys.executable, args=[str(SERVER_PATH)], timeout=20)

# A tool capable model so the dice and sum tools are really called.
agent = Agent(
    ollama_model("qwen3-coder:480b"),
    toolsets=[dice_server],
    instructions=(
        "Korzystaj z narzedzi MCP, aby rzucac koscia i sumowac wyniki. "
        "Odpowiadaj zwiezle po polsku."
    ),
)


async def main() -> None:
    """Open the MCP server and run a prompt that needs its tools."""
    async with agent:
        result = await agent.run(
            "Rzuc trzy razy szescienna koscia, zsumuj wyniki i podaj sume.",
        )
    print("Output:", result.output)


if __name__ == "__main__":
    asyncio.run(main())
