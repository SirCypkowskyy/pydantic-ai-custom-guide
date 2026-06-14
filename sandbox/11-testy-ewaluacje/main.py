"""Chapter 11: Testing and evals.

The agent under test classifies a short support message into a structured ticket.
The same agent is exercised three ways:

1. against a real model on Ollama Cloud (the production path),
2. offline with ``TestModel`` so a unit test needs no network and no API key,
3. against a ``pydantic_evals`` dataset that scores the structured output.

Run it with: ``uv run sandbox/11-testy-ewaluacje/main.py``
"""

from __future__ import annotations

from enum import StrEnum

from pydantic import BaseModel, Field
from pydantic_ai import Agent
from pydantic_evals import Case, Dataset
from pydantic_evals.evaluators import Evaluator, EvaluatorContext

from pai_sandbox_shared import ollama_model


class Priority(StrEnum):
    """How urgent a support ticket is."""

    low = "low"
    medium = "medium"
    high = "high"


class Ticket(BaseModel):
    """Structured output the agent must produce for every message."""

    category: str = Field(description="Short category, for example 'billing' or 'bug'.")
    priority: Priority = Field(description="Urgency of the request.")


support_agent = Agent(
    ollama_model("qwen3-coder:480b"),
    output_type=Ticket,
    instructions=(
        "Jestes systemem klasyfikacji zgloszen. Na podstawie wiadomosci uzytkownika "
        "zwroc kategorie oraz priorytet. Awarie platnosci maja priorytet 'high'."
    ),
)
"""Agent under test. The smoke test overrides this same object with ``TestModel``."""


def classify(message: str) -> Ticket:
    """Production entry point: classify one message into a :class:`Ticket`."""
    return support_agent.run_sync(message).output


class PriorityMatch(Evaluator[str, Ticket]):
    """Score 1.0 when the predicted priority equals the expected one."""

    def evaluate(self, ctx: EvaluatorContext[str, Ticket]) -> float:
        """Compare the run output against the case's expected output."""
        if ctx.expected_output is None:
            return 0.0
        return 1.0 if ctx.output.priority == ctx.expected_output.priority else 0.0


def build_dataset() -> Dataset[str, Ticket]:
    """Build a tiny eval dataset of message to expected ticket."""
    return Dataset[str, Ticket](
        name="support_tickets",
        cases=[
            Case(
                name="platnosc",
                inputs="Nie moge zaplacic, karta jest odrzucana od godziny.",
                expected_output=Ticket(category="billing", priority=Priority.high),
            ),
            Case(
                name="pytanie",
                inputs="Jak zmienic adres email na koncie?",
                expected_output=Ticket(category="account", priority=Priority.low),
            ),
        ],
        evaluators=[PriorityMatch()],
    )


def run_live() -> None:
    """Hit the real model once to show the production path."""
    ticket = classify("Aplikacja sie zawiesza za kazdym razem przy logowaniu.")
    print("Live:", ticket)


def run_eval() -> None:
    """Score the live agent against the dataset and print a report."""
    dataset = build_dataset()

    async def task(message: str) -> Ticket:
        """Adapter the dataset calls for every case input."""
        result = await support_agent.run(message)
        return result.output

    report = dataset.evaluate_sync(task)
    report.print(include_input=True, include_output=True, include_durations=False)


if __name__ == "__main__":
    run_live()
    run_eval()
