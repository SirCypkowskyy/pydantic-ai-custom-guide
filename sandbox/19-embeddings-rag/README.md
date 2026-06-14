# Chapter 19: Embeddings and RAG

This example shows the core retrieval-augmented-generation (RAG) loop with Pydantic AI:

1. embed a small knowledge base with an `Embedder`,
2. embed a question and rank the documents by cosine similarity,
3. feed only the best-matching documents to an agent as grounded context.

## Key ideas

- `Embedder('openai:text-embedding-3-small')` is the high-level interface for turning text
  into vectors. Use `embed_documents()` for content you index and `embed_query()` for a search
  query, because some models optimize the two differently.
- `result.embeddings` holds one vector per input. We compare them with cosine similarity to find
  the documents that are closest in meaning to the question.
- The retrieved documents are injected into the prompt through a dynamic
  `@agent.instructions` function that reads typed dependencies via `RunContext`.

## Embeddings and Ollama Cloud

Ollama Cloud does not expose embedding models, so the live demo uses an OpenAI-compatible
embedding endpoint. Set `OPENAI_API_KEY` (and optionally `EMBEDDING_MODEL`) to run it for real.
Without a key the module still imports cleanly and prints a hint instead of calling the API.

## Run it

```bash
uv run sandbox/19-embeddings-rag/main.py
```

## Test it

The smoke test is fully offline. It overrides the embedder with `TestEmbeddingModel` (deterministic
vectors) and the agent with `TestModel`, so it stays green with no API key:

```bash
uv run pytest sandbox/19-embeddings-rag
```
