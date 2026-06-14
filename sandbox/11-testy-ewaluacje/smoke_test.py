"""Smoke test for chapter 11.

These tests run fully offline: ``TestModel`` and ``FunctionModel`` replace the real
model, so no API key and no network are needed. That is the whole point of the chapter:
agent logic should be testable in milliseconds without calling a provider.
"""

from __future__ import annotations

from pydantic_ai.messages import ModelMessage, ModelResponse, ToolCallPart
from pydantic_ai.models.function import AgentInfo, FunctionModel
from pydantic_ai.models.test import TestModel

from pai_sandbox_shared import load_main

_main = load_main(__file__)
Priority = _main.Priority
Ticket = _main.Ticket
build_dataset = _main.build_dataset
support_agent = _main.support_agent


def test_testmodel_fills_structured_output() -> None:
    """``TestModel`` generates a valid ``Ticket`` from the output schema alone."""
    with support_agent.override(model=TestModel()):
        result = support_agent.run_sync("Cokolwiek.")

    assert isinstance(result.output, Ticket)
    assert isinstance(result.output.priority, Priority)


def test_functionmodel_controls_the_answer() -> None:
    """``FunctionModel`` lets the test decide the exact tool call the model makes."""

    def respond(_messages: list[ModelMessage], info: AgentInfo) -> ModelResponse:
        """Return the structured output via the agent's final-output tool."""
        tool_name = info.output_tools[0].name
        args = {"category": "billing", "priority": "high"}
        return ModelResponse(parts=[ToolCallPart(tool_name, args)])

    with support_agent.override(model=FunctionModel(respond)):
        result = support_agent.run_sync("Karta odrzucana, nie moge zaplacic.")

    assert result.output.category == "billing"
    assert result.output.priority is Priority.high


def test_eval_dataset_scores_a_perfect_function() -> None:
    """A deterministic stub that always answers correctly scores 1.0 on every case."""
    dataset = build_dataset()

    def perfect(_message: str) -> Ticket:
        """Stub task that returns exactly what each case expects."""
        return Ticket(category="billing", priority=Priority.high)

    report = dataset.evaluate_sync(perfect)
    # The high-priority case must score a perfect match.
    high_case = next(c for c in report.cases if c.name == "platnosc")
    assert high_case.scores["PriorityMatch"].value == 1.0
