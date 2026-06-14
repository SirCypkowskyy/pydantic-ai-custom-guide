"""Chapter 6: Dependencies (DI).

Shows how typed dependencies flow into an agent run and become available to both
dynamic instructions and tools through ``RunContext``:

1. a frozen dataclass describing everything the run needs (a customer profile and
   an in-memory order book that stands in for a database or API client),
2. ``deps_type=`` on the ``Agent`` so the dependency type is checked statically,
3. a dynamic instruction that reads ``ctx.deps`` to personalise the system prompt,
4. a tool that reads ``ctx.deps`` to look an order up instead of hard-coding data.

Swapping the dependencies at call time (different customer, different order book)
changes the agent's behaviour without touching the agent definition.

Run it with: ``uv run sandbox/06-dependencies/main.py``
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass, field

from pydantic_ai import Agent, RunContext

from pai_sandbox_shared import ollama_model


@dataclass(frozen=True)
class SupportDeps:
    """Typed dependencies for one support conversation.

    A real application would put a database session or an HTTP client here. We use a
    plain dictionary so the example stays self-contained and offline-friendly.
    """

    customer_name: str
    orders: dict[str, str] = field(default_factory=dict)


# The agent is defined once. It does not know anything about a concrete customer or
# order book. ``deps_type`` ties every run to a ``SupportDeps`` instance.
support_agent = Agent(
    ollama_model("qwen3-coder:480b"),
    deps_type=SupportDeps,
    instructions=(
        "Jestes asystentem obslugi klienta. Odpowiadaj zwiezle, po polsku. "
        "Aby sprawdzic status zamowienia, uzywaj narzedzia order_status."
    ),
)


@support_agent.instructions
def greet_customer(ctx: RunContext[SupportDeps]) -> str:
    """Dynamic instruction built from the run's dependencies."""
    return f"Rozmawiasz z klientem o imieniu {ctx.deps.customer_name}."


@support_agent.tool
def order_status(ctx: RunContext[SupportDeps], order_id: str) -> str:
    """Look up the status of an order in the injected order book.

    Args:
        ctx: Run context carrying the typed dependencies.
        order_id: Identifier the customer is asking about.

    Returns:
        A human-readable status, or a not-found message.

    """
    return ctx.deps.orders.get(order_id, f"Nie znaleziono zamowienia {order_id}.")


async def main() -> None:
    """Run the same agent twice with different injected dependencies."""
    alice_deps = SupportDeps(
        customer_name="Alicja",
        orders={"A-100": "wyslane", "A-101": "w przygotowaniu"},
    )
    bob_deps = SupportDeps(
        customer_name="Bartek",
        orders={"B-200": "dostarczone"},
    )

    alice = await support_agent.run("Jaki jest status zamowienia A-100?", deps=alice_deps)
    print("Alicja:", alice.output)

    bob = await support_agent.run("Co z moim zamowieniem B-200?", deps=bob_deps)
    print("Bartek:", bob.output)


if __name__ == "__main__":
    asyncio.run(main())
