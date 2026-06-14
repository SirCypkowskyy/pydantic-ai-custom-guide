"""Chapter 15: FastAPI integration.

Serves a single Pydantic AI agent over HTTP and shows the three patterns that
matter when an agent lives behind a web API:

1. a JSON endpoint that validates the request body with a Pydantic model and
   returns a structured, typed answer (``output_type``),
2. dependency injection: FastAPI builds per-request ``Deps`` and hands them to
   the agent through ``RunContext``,
3. a streaming endpoint that forwards text chunks from ``run_stream`` to the
   client as Server-Sent Events using ``StreamingResponse``.

The app object is created by :func:`build_app` so tests can construct it with an
overridden model. Run the server with::

    uv run uvicorn main:app --reload  # from sandbox/15-fastapi-integracja/

Then, in another terminal::

    uv run python main.py  # fires example requests against a local instance
"""

from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager
from dataclasses import dataclass
from typing import TYPE_CHECKING

import httpx
import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext

from pai_sandbox_shared import ollama_model

if TYPE_CHECKING:
    from collections.abc import AsyncIterator

SSE_MEDIA_TYPE = "text/event-stream"
"""Media type browsers expect for Server-Sent Events."""


@dataclass
class SupportDeps:
    """Per-request dependencies injected by the web layer.

    In a real service these would carry a database handle or the authenticated
    customer. Here a plain customer name is enough to show the wiring.
    """

    customer_name: str


class TicketAnswer(BaseModel):
    """Structured reply returned by the JSON endpoint."""

    summary: str = Field(description="Jednozdaniowe streszczenie odpowiedzi.")
    needs_human: bool = Field(description="Czy zgłoszenie trzeba przekazać człowiekowi.")


class AskRequest(BaseModel):
    """Validated request body for the JSON endpoint."""

    customer_name: str
    question: str


class StreamRequest(BaseModel):
    """Validated request body for the streaming endpoint."""

    question: str


support_agent = Agent(
    ollama_model("qwen3-coder:480b"),
    deps_type=SupportDeps,
    output_type=TicketAnswer,
    instructions=(
        "Jesteś asystentem wsparcia technicznego. Odpowiadaj po polsku, "
        "rzeczowo i krótko."
    ),
)


@support_agent.instructions
def add_customer(ctx: RunContext[SupportDeps]) -> str:
    """Dynamic instruction reading the injected dependencies."""
    return f"Rozmawiasz z klientem o imieniu {ctx.deps.customer_name}."


# A second agent without structured output, used by the streaming endpoint.
stream_agent = Agent(
    ollama_model("qwen3-coder:480b"),
    instructions="Odpowiadaj po polsku, pełnymi zdaniami.",
)


def build_app(
    answer_agent: Agent[SupportDeps, TicketAnswer],
    text_agent: Agent[None, str],
) -> FastAPI:
    """Create the FastAPI application around two agents.

    Passing the agents in (instead of importing globals) lets tests inject
    ``TestModel`` backed agents and run completely offline.

    Args:
        answer_agent: Agent that returns a :class:`TicketAnswer`.
        text_agent: Agent that streams plain text.

    Returns:
        A configured :class:`FastAPI` application.

    """
    app = FastAPI(title="Wsparcie techniczne", version="0.1.0")

    @app.post("/ask")
    async def ask(body: AskRequest) -> TicketAnswer:
        """Validate the body, run the agent, return a typed JSON answer."""
        deps = SupportDeps(customer_name=body.customer_name)
        result = await answer_agent.run(body.question, deps=deps)
        return result.output

    @app.post("/stream")
    async def stream(body: StreamRequest) -> StreamingResponse:
        """Stream the answer back as Server-Sent Events."""

        async def event_source() -> AsyncIterator[str]:
            async with text_agent.run_stream(body.question) as run:
                async for chunk in run.stream_text(delta=True):
                    yield f"data: {chunk}\n\n"
            yield "data: [DONE]\n\n"

        return StreamingResponse(event_source(), media_type=SSE_MEDIA_TYPE)

    return app


app = build_app(support_agent, stream_agent)


@asynccontextmanager
async def _serve(target: FastAPI, port: int) -> AsyncIterator[None]:
    """Run ``target`` in the background for the duration of the context."""
    config = uvicorn.Config(target, host="127.0.0.1", port=port, log_level="warning")
    server = uvicorn.Server(config)
    task = asyncio.create_task(server.serve())
    while not server.started:  # noqa: ASYNC110
        await asyncio.sleep(0.05)
    try:
        yield
    finally:
        server.should_exit = True
        await task


async def _demo() -> None:
    """Start the app locally and fire one request at each endpoint."""
    port = 8123
    base = f"http://127.0.0.1:{port}"
    async with _serve(app, port), httpx.AsyncClient(base_url=base, timeout=120) as client:
        ask = await client.post(
            "/ask",
            json={"customer_name": "Ola", "question": "Nie mogę się zalogować."},
        )
        print("Ask:", ask.json())

        print("Stream:", end=" ")
        payload = {"question": "Powiedz cześć."}
        async with client.stream("POST", "/stream", json=payload) as response:
            async for line in response.aiter_lines():
                if line.startswith("data:"):
                    print(line.removeprefix("data:").strip(), end=" ")
        print()


if __name__ == "__main__":
    asyncio.run(_demo())
