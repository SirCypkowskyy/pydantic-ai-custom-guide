"""Offline smoke test for chapter 15.

Exercises the FastAPI endpoints end to end without touching the network by
overriding both agents with ``TestModel``. The structured ``/ask`` endpoint and
the streaming ``/stream`` endpoint are both checked, so the test stays green
with no ``OLLAMA_CLOUD_API_KEY`` configured.
"""

from __future__ import annotations

from fastapi.testclient import TestClient
from pydantic_ai.models.test import TestModel

from pai_sandbox_shared import load_env, load_main

load_env()
_main = load_main(__file__)
build_app = _main.build_app
stream_agent = _main.stream_agent
support_agent = _main.support_agent


def test_ask_returns_structured_answer() -> None:
    """The /ask endpoint validates input and returns a TicketAnswer."""
    app = build_app(support_agent, stream_agent)
    with support_agent.override(model=TestModel()), TestClient(app) as client:
        response = client.post(
            "/ask",
            json={"customer_name": "Ola", "question": "Nie mogę się zalogować."},
        )
    assert response.status_code == 200
    body = response.json()
    assert "summary" in body
    assert isinstance(body["needs_human"], bool)


def test_ask_rejects_invalid_body() -> None:
    """A missing required field is rejected by FastAPI validation."""
    app = build_app(support_agent, stream_agent)
    with TestClient(app) as client:
        response = client.post("/ask", json={"question": "brak imienia"})
    assert response.status_code == 422


def test_stream_emits_sse_chunks() -> None:
    """The /stream endpoint returns Server-Sent Events ending with [DONE]."""
    app = build_app(support_agent, stream_agent)
    with stream_agent.override(model=TestModel()), TestClient(app) as client:
        response = client.post("/stream", json={"question": "Powiedz cześć."})
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    assert "data:" in response.text
    assert "[DONE]" in response.text
