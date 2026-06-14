"""Smoke test for chapter 19.

Runs fully offline. ``TestEmbeddingModel`` returns deterministic vectors and
``TestModel`` answers the agent, so no API key is needed and the suite stays green.
"""

from __future__ import annotations

import asyncio

import pytest
from pydantic_ai import Embedder
from pydantic_ai.embeddings import TestEmbeddingModel
from pydantic_ai.models.test import TestModel

from pai_sandbox_shared import load_main

_m = load_main(__file__)


def test_cosine_similarity_bounds() -> None:
    """Identical vectors score 1.0 and a zero vector scores 0.0."""
    assert _m.cosine_similarity([1.0, 0.0], [1.0, 0.0]) == pytest.approx(1.0)
    assert _m.cosine_similarity([1.0, 2.0], [0.0, 0.0]) == 0.0


async def _retrieve_top_two() -> list[str]:
    """Retrieve two documents using a deterministic offline embedding model."""
    embedder = Embedder("openai:text-embedding-3-small")
    with embedder.override(model=TestEmbeddingModel()):
        return await _m.retrieve(embedder, "what is RAG?", _m.KNOWLEDGE_BASE, top_k=2)


def test_retrieve_returns_top_k() -> None:
    """Retrieval returns exactly ``top_k`` documents drawn from the knowledge base."""
    retrieved = asyncio.run(_retrieve_top_two())
    assert len(retrieved) == 2
    assert all(doc in _m.KNOWLEDGE_BASE for doc in retrieved)


async def _answer_with_context() -> str:
    """Run the agent offline with a single retrieved document as context."""
    with _m.rag_agent.override(model=TestModel()):
        result = await _m.rag_agent.run(
            "What does RAG do?",
            deps=_m.RagDeps(context=["RAG retrieves docs."]),
        )
    return result.output


def test_agent_uses_context() -> None:
    """The agent runs with retrieved context and produces a non-empty answer."""
    answer = asyncio.run(_answer_with_context())
    assert answer.strip()
