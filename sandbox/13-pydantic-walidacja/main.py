"""Chapter 13: Pydantic - validation at the core.

Pydantic AI hands a model's free-form text back to you as validated Python objects.
The validation machinery is plain Pydantic, so it pays to know it well. This demo
covers the pieces that show up most often when shaping agent output:

1. ``BaseModel`` with ``Field`` constraints (bounds, lengths, patterns),
2. ``field_validator`` and ``model_validator`` for custom and cross-field rules,
3. ``computed_field`` for values derived from the validated data,
4. ``TypeAdapter`` for validating data that is not wrapped in a model,
5. ``model_validate`` / ``model_dump`` for the parse and serialize round trip,
6. the same model reused as an agent ``output_type`` so the model's answer arrives
   already validated.

The Pydantic parts run offline. The agent part needs Ollama Cloud and is only
called from ``__main__``.

Run it with: ``uv run sandbox/13-pydantic-walidacja/main.py``
"""

from __future__ import annotations

from typing import Annotated

from pydantic import (
    BaseModel,
    Field,
    TypeAdapter,
    ValidationError,
    computed_field,
    field_validator,
    model_validator,
)
from pydantic_ai import Agent

from pai_sandbox_shared import ollama_model


class Order(BaseModel):
    """A validated order line.

    Every field carries a constraint, so an instance can only exist when the data
    already makes sense. That guarantee is what makes structured agent output safe
    to use downstream.
    """

    sku: Annotated[str, Field(pattern=r"^[A-Z]{3}-\d{4}$")]
    """Stock keeping unit such as ``ABC-1234``."""

    quantity: Annotated[int, Field(ge=1, le=1000)]
    """How many units, bounded to a sane range."""

    unit_price: Annotated[float, Field(gt=0)]
    """Price per unit in PLN, strictly positive."""

    discount: Annotated[float, Field(ge=0, le=1)] = 0.0
    """Fractional discount between 0 and 1."""

    @field_validator("sku", mode="before")
    @classmethod
    def normalize_sku(cls, value: str) -> str:
        """Upper-case the SKU before the pattern constraint is enforced.

        ``mode="before"`` matters here: the ``Field`` pattern is part of the core
        string schema and runs after before-validators but ahead of after-validators,
        so lower-case input is normalized first and only then checked.
        """
        if isinstance(value, str):
            return value.strip().upper()
        return value

    @model_validator(mode="after")
    def reject_full_discount(self) -> Order:
        """Cross-field rule: a full discount on a paid item is almost always a bug."""
        if self.discount >= 1.0 and self.unit_price > 0:
            msg = "A 100% discount on a priced item is not allowed."
            raise ValueError(msg)
        return self

    @computed_field
    @property
    def total(self) -> float:
        """Net total derived from the validated fields."""
        return round(self.quantity * self.unit_price * (1 - self.discount), 2)


# A TypeAdapter validates data that is not a BaseModel, here a list of order ids.
OrderIds = TypeAdapter(list[Annotated[str, Field(pattern=r"^[A-Z]{3}-\d{4}$")]])


def demo_constraints() -> None:
    """Show that valid data parses and invalid data is rejected with detail."""
    order = Order(sku="abc-1234", quantity=3, unit_price=19.99, discount=0.1)
    print("Valid order:", order.model_dump())
    print("Computed total:", order.total)

    try:
        Order(sku="bad", quantity=0, unit_price=-1)
    except ValidationError as exc:
        print("Rejected order, error count:", exc.error_count())


def demo_round_trip() -> None:
    """Parse untrusted input with ``model_validate`` and serialize back out."""
    raw = {"sku": "xyz-9999", "quantity": 10, "unit_price": 5.0, "discount": 0.2}
    order = Order.model_validate(raw)
    print("Round trip JSON:", order.model_dump_json())


def demo_type_adapter() -> None:
    """Validate a bare list without wrapping it in a model."""
    ids = OrderIds.validate_python(["ABC-1234", "XYZ-9999"])
    print("Validated ids:", ids)


async def extract_order(text: str) -> Order:
    """Ask an agent to extract an :class:`Order` from free text.

    The ``output_type`` is our model, so the result is already validated. A
    tool-capable model is used because structured output is driven through tools.
    """
    agent = Agent(
        ollama_model("qwen3-coder:480b"),
        output_type=Order,
        instructions="Wyodrębnij zamówienie z tekstu użytkownika.",
    )
    result = await agent.run(text)
    return result.output


if __name__ == "__main__":
    import asyncio

    demo_constraints()
    demo_round_trip()
    demo_type_adapter()

    extracted = asyncio.run(
        extract_order("Poproszę 4 sztuki produktu DEF-4321 po 12.50 zł, rabat 15%."),
    )
    print("Extracted order:", extracted.model_dump())
