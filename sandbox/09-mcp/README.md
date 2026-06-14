# 09 - MCP (Model Context Protocol)

Accompanies the [MCP](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/mcp) chapter.

Shows how an agent uses tools exposed by a **separate process** instead of
defining them inline through `@agent.tool`. A local MCP server (`dice_server.py`) is
launched through `MCPServerStdio` and wired into the agent through `toolsets=[...]`. The model
discovers the server's tools (`roll_dice`, `sum_values`) on its own and calls them during the run.

We open the MCP connection through `async with agent:`, so that the server subprocess is
started and shut down cleanly around the `run` call.

## Files

- `dice_server.py` - a minimal MCP server (FastMCP) with two tools over the stdio transport.
- `main.py` - the agent connecting to the server and performing a task that requires tools.

## Running

```bash
# from the sandbox/ directory
uv run 09-mcp/main.py

# smoke test
uv run pytest 09-mcp/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
