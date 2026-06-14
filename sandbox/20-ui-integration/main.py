"""Chapter 20: exposing the agent to a frontend.

A FastAPI app that streams the agent over the Vercel AI Data Stream protocol. The same
``dispatch_request`` pattern works for the AG-UI adapter; just swap the adapter class. A
Next.js ``useChat`` hook or a plain SPA ``fetch`` can consume the ``/chat`` endpoint.

Run it with: ``uv run uvicorn ch20-ui-integration.main:app`` from the sandbox directory, or
``uv run sandbox/20-ui-integration/main.py``.
"""

from __future__ import annotations

import uvicorn
from fastapi import FastAPI
from pydantic_ai import Agent
from pydantic_ai.ui.vercel_ai import VercelAIAdapter
from starlette.requests import Request  # noqa: TC002  (FastAPI resolves this at runtime)
from starlette.responses import Response  # noqa: TC002  (FastAPI resolves this at runtime)

from pai_sandbox_shared import ollama_model


def build_app(chat_agent: Agent[None, str]) -> FastAPI:
    """Build a FastAPI app that streams the agent over the Vercel AI protocol."""
    app = FastAPI()

    @app.post("/chat")
    async def chat(request: Request) -> Response:
        """Hand the request to the adapter and stream protocol events back."""
        return await VercelAIAdapter.dispatch_request(request, agent=chat_agent)

    return app


agent = Agent(ollama_model(), instructions="You are a helpful assistant.")
app = build_app(agent)


def main() -> None:
    """Serve the app locally on port 8000."""
    uvicorn.run(app, host="127.0.0.1", port=8000)


if __name__ == "__main__":
    main()
