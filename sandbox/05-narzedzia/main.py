"""Chapter 5: Tools and function calling.

Shows how an agent calls Python functions to get information it cannot make up:

1. ``@agent.tool_plain`` for a stateless tool that needs no run context,
2. ``@agent.tool`` for a tool that reads typed dependencies via ``RunContext``,
3. ``ModelRetry`` to push back on bad arguments and let the model try again.

Tool descriptions and argument schemas are taken from the type hints and
docstrings, so writing a good docstring is part of designing the tool.

Run it with: ``uv run sandbox/05-narzedzia/main.py``
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass, field

from pydantic_ai import Agent, ModelRetry, RunContext

from pai_sandbox_shared import ollama_model

# A tool-capable model so the provider can emit function calls.
MODEL = ollama_model("qwen3-coder:480b")


@dataclass
class Store:
    """Typed dependencies: a tiny in-memory product catalogue."""

    prices: dict[str, float] = field(
        default_factory=lambda: {"jablko": 2.5, "chleb": 4.0, "mleko": 3.2},
    )


shop_agent = Agent(
    MODEL,
    deps_type=Store,
    instructions=(
        "Jestes asystentem sklepu. Uzywaj narzedzi, aby poznac ceny i policzyc koszt. "
        "Nie zgaduj cen. Odpowiadaj zwiezle, po polsku."
    ),
)


@shop_agent.tool_plain
def add_tax(net_price: float) -> float:
    """Return the gross price by adding 23 percent VAT to a net price.

    Args:
        net_price: Net price in PLN.

    Returns:
        Gross price in PLN, rounded to two decimals.

    """
    return round(net_price * 1.23, 2)


@shop_agent.tool
def price_of(ctx: RunContext[Store], product: str) -> float:
    """Look up the net price of a product in the store catalogue.

    Args:
        ctx: Run context carrying the store dependencies.
        product: Product name, lowercase, without Polish diacritics.

    Returns:
        Net price in PLN.

    Raises:
        ModelRetry: If the product is not in the catalogue.

    """
    price = ctx.deps.prices.get(product)
    if price is None:
        known = ", ".join(sorted(ctx.deps.prices))
        raise ModelRetry(f"Brak produktu {product!r}. Dostepne produkty: {known}.")
    return price


async def main() -> None:
    """Ask a question that forces the model to chain both tools."""
    store = Store()
    result = await shop_agent.run(
        "Ile kosztuja brutto dwa jablka i jeden chleb?",
        deps=store,
    )
    print("Odpowiedz:", result.output)
    print("Liczba wiadomosci:", len(result.all_messages()))


if __name__ == "__main__":
    asyncio.run(main())
