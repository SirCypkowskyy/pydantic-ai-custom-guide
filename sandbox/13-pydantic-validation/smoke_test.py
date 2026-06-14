"""Smoke test for chapter 13.

These checks exercise the validation rules directly, so they run fully offline
without an API key. An optional online check confirms the same model works as an
agent ``output_type`` when Ollama Cloud is configured.
"""

from __future__ import annotations

import os

import pytest
from pydantic import ValidationError
from pydantic_ai import Agent
from pydantic_ai.models.test import TestModel

from pai_sandbox_shared import load_env, load_main, ollama_model

load_env()
_main = load_main(__file__)
Order = _main.Order
OrderIds = _main.OrderIds

requires_key = pytest.mark.skipif(
    not os.getenv("OLLAMA_CLOUD_API_KEY"),
    reason="OLLAMA_CLOUD_API_KEY not set",
)


def test_valid_order_normalizes_and_computes() -> None:
    order = Order(sku="abc-1234", quantity=2, unit_price=10.0, discount=0.5)
    assert order.sku == "ABC-1234"
    assert order.total == 10.0


def test_bad_sku_is_rejected() -> None:
    with pytest.raises(ValidationError):
        Order(sku="nope", quantity=1, unit_price=1.0)


def test_quantity_bounds_are_enforced() -> None:
    with pytest.raises(ValidationError):
        Order(sku="ABC-1234", quantity=0, unit_price=1.0)


def test_full_discount_is_rejected_by_model_validator() -> None:
    with pytest.raises(ValidationError):
        Order(sku="ABC-1234", quantity=1, unit_price=5.0, discount=1.0)


def test_type_adapter_validates_id_list() -> None:
    assert OrderIds.validate_python(["ABC-1234"]) == ["ABC-1234"]
    with pytest.raises(ValidationError):
        OrderIds.validate_python(["bad"])


def test_offline_agent_returns_validated_order() -> None:
    """``TestModel`` returns canned output that still flows through validation.

    The constraints on ``Order`` are strict, so we hand ``TestModel`` an output
    payload that satisfies them. This proves the agent wiring and the validation
    of structured output without touching the network.
    """
    valid_output = {
        "sku": "ABC-1234",
        "quantity": 2,
        "unit_price": 9.5,
        "discount": 0.1,
    }
    agent = Agent(TestModel(custom_output_args=valid_output), output_type=Order)
    result = agent.run_sync("Wyodrębnij zamówienie.")
    assert isinstance(result.output, Order)
    assert result.output.sku == "ABC-1234"


@requires_key
def test_online_agent_extracts_order() -> None:
    agent = Agent(
        ollama_model("qwen3-coder:480b"),
        output_type=Order,
        instructions="Wyodrębnij zamówienie z tekstu użytkownika.",
    )
    result = agent.run_sync("Poproszę 5 sztuk GHI-7777 po 3.00 zł.")
    assert isinstance(result.output, Order)
    assert result.output.quantity >= 1
