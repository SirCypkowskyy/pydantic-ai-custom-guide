"""Chapter 19: Embeddings and RAG.

Shows the core retrieval-augmented-generation loop with Pydantic AI:

1. embed a small set of documents with an ``Embedder``,
2. embed a question and rank the documents by cosine similarity,
3. feed only the best-matching documents to an agent as grounded context.

Embedding models are not exposed by Ollama Cloud, so the live demo uses an
OpenAI-compatible embedding endpoint. Set ``OPENAI_API_KEY`` (and optionally
``EMBEDDING_MODEL``) to run it for real. Without a key the module still imports
cleanly, and the smoke test stays fully offline via ``TestEmbeddingModel``.

Run it with: ``uv run sandbox/19-embeddings-rag/main.py``
"""

from __future__ import annotations

import asyncio
import math
import os
from dataclasses import dataclass
from typing import TYPE_CHECKING

from pydantic_ai import Agent, Embedder, RunContext

from pai_sandbox_shared import ollama_model

if TYPE_CHECKING:
    from collections.abc import Sequence

# A tiny knowledge base. In a real system these come from a vector database.
KNOWLEDGE_BASE: tuple[str, ...] = (
    "Pydantic AI is an agent framework built by the team behind Pydantic.",
    "An Embedder turns text into vectors that capture semantic meaning.",
    "Cosine similarity measures the angle between two vectors, ignoring length.",
    "RAG retrieves relevant documents and passes them to the model as context.",
    "Ollama Cloud exposes an OpenAI-compatible endpoint for chat models.",
)


def cosine_similarity(left: Sequence[float], right: Sequence[float]) -> float:
    """Return the cosine similarity of two equal-length vectors.

    Args:
        left: First embedding vector.
        right: Second embedding vector.

    Returns:
        A score in ``[-1, 1]`` where higher means more semantically similar.

    """
    dot = sum(a * b for a, b in zip(left, right, strict=True))
    norm_left = math.sqrt(sum(a * a for a in left))
    norm_right = math.sqrt(sum(b * b for b in right))
    if norm_left == 0.0 or norm_right == 0.0:
        return 0.0
    return dot / (norm_left * norm_right)


@dataclass
class RagDeps:
    """Dependencies carrying the documents retrieved for a single question."""

    context: list[str]


rag_agent = Agent(
    ollama_model(),
    deps_type=RagDeps,
    instructions="Answer the question using only the provided context. Be concise.",
)


@rag_agent.instructions
def add_context(ctx: RunContext[RagDeps]) -> str:
    """Inject the retrieved documents into the prompt as grounded context."""
    joined = "\n".join(f"- {doc}" for doc in ctx.deps.context)
    return f"Context:\n{joined}"


async def retrieve(
    embedder: Embedder,
    question: str,
    documents: tuple[str, ...],
    top_k: int,
) -> list[str]:
    """Embed the question and return the ``top_k`` most similar documents.

    Args:
        embedder: The embedder used for both documents and the query.
        question: The natural-language question to ground.
        documents: The candidate documents to search over.
        top_k: How many of the closest documents to keep.

    Returns:
        The best-matching documents, ordered from most to least relevant.

    """
    doc_result = await embedder.embed_documents(list(documents))
    query_result = await embedder.embed_query(question)
    query_vector = query_result.embeddings[0]
    scored = [
        (cosine_similarity(query_vector, doc_result.embeddings[index]), documents[index])
        for index in range(len(documents))
    ]
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return [doc for _, doc in scored[:top_k]]


async def run_rag(question: str) -> None:
    """Run the full retrieve-then-answer loop against live providers."""
    embedder = Embedder(os.getenv("EMBEDDING_MODEL", "openai:text-embedding-3-small"))
    context = await retrieve(embedder, question, KNOWLEDGE_BASE, top_k=2)
    print("Retrieved:", context)
    answer = await rag_agent.run(question, deps=RagDeps(context=context))
    print("Answer:", answer.output)


if __name__ == "__main__":
    if not os.getenv("OPENAI_API_KEY"):
        print("Set OPENAI_API_KEY to run the live embedding demo.")
    else:
        asyncio.run(run_rag("What does RAG do?"))
