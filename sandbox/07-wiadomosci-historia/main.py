"""Chapter 7: Messages and history.

Shows the three ideas from the chapter against a real model on Ollama Cloud:

1. continuing a conversation by passing ``message_history`` to the next run,
2. inspecting the captured messages with ``all_messages`` and ``new_messages``,
3. serializing history to JSON and validating it back with
   ``ModelMessagesTypeAdapter`` so a conversation can survive a process restart.

Run it with: ``uv run sandbox/07-wiadomosci-historia/main.py``
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from pydantic_ai import Agent, ModelMessagesTypeAdapter
from pydantic_core import to_jsonable_python

from pai_sandbox_shared import ollama_model

if TYPE_CHECKING:
    from pydantic_ai.messages import ModelMessage

# A single, reusable agent that remembers nothing on its own. Memory comes from
# the message history we hand back to it on each run.
agent = Agent(
    ollama_model(),
    instructions="Odpowiadaj zwięźle, jednym zdaniem, po polsku.",
)


def multi_turn() -> list[ModelMessage]:
    """Run two turns where the second turn relies on the first for context.

    Returns:
        The full message history after both turns, ready to be persisted.

    """
    first = agent.run_sync("Zapamiętaj liczbę 42.")
    print("Tura 1:", first.output)

    # ``new_messages`` carries only this run's request and response, which is
    # exactly what the next run needs to continue the conversation.
    second = agent.run_sync(
        "Jaką liczbę kazałem ci zapamiętać?",
        message_history=first.new_messages(),
    )
    print("Tura 2:", second.output)

    # ``all_messages`` returns the whole transcript, including the earlier turn.
    return second.all_messages()


def round_trip(history: list[ModelMessage]) -> None:
    """Serialize history to JSON-friendly objects and validate it back.

    Args:
        history: The transcript captured from a previous conversation.

    """
    as_python = to_jsonable_python(history)
    restored = ModelMessagesTypeAdapter.validate_python(as_python)
    print("Zapisanych wiadomości:", len(restored))

    # The restored history behaves like the original: the agent still remembers.
    resumed = agent.run_sync(
        "Powtórz tę liczbę raz jeszcze.",
        message_history=restored,
    )
    print("Wznowienie:", resumed.output)


if __name__ == "__main__":
    transcript = multi_turn()
    round_trip(transcript)
