"""A tiny MCP server used by chapter 9.

It exposes two tools over the stdio transport so the agent in ``main.py`` can call
them through the Model Context Protocol. Keeping the server in the repository makes
the example fully self contained: no external MCP process is required.

Run it directly with ``python dice_server.py`` to start a stdio MCP server, or let
``main.py`` spawn it through ``MCPServerStdio``.
"""

from __future__ import annotations

import secrets

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("dice")


@mcp.tool()
def roll_dice(sides: int = 6) -> int:
    """Roll a single die and return the result.

    Args:
        sides: Number of faces on the die. Defaults to a standard six sided die.

    Returns:
        A random integer between 1 and ``sides`` inclusive.

    """
    if sides < 2:
        msg = "A die needs at least two sides."
        raise ValueError(msg)
    return secrets.randbelow(sides) + 1


@mcp.tool()
def sum_values(values: list[int]) -> int:
    """Add a list of integers together.

    Args:
        values: The integers to sum.

    Returns:
        The total of every value in ``values``.

    """
    return sum(values)


if __name__ == "__main__":
    mcp.run()
