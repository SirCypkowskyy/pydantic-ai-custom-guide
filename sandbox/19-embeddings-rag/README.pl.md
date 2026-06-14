# Rozdział 19: Embeddingi i RAG

Ten przykład pokazuje podstawową pętlę RAG (retrieval-augmented generation) w Pydantic AI:

1. zamień małą bazę wiedzy na wektory za pomocą `Embedder`,
2. zamień pytanie na wektor i uszereguj dokumenty według podobieństwa kosinusowego,
3. przekaż agentowi tylko najlepiej pasujące dokumenty jako kontekst (grounding).

## Kluczowe pojęcia

- `Embedder('openai:text-embedding-3-small')` to wysokopoziomowy interfejs do zamiany tekstu
  na wektory. Używaj `embed_documents()` dla treści, którą indeksujesz, oraz `embed_query()`
  dla zapytania, bo niektóre modele optymalizują te dwa przypadki inaczej.
- `result.embeddings` zawiera po jednym wektorze na każde wejście. Porównujemy je podobieństwem
  kosinusowym, aby znaleźć dokumenty najbliższe znaczeniowo pytaniu.
- Wyszukane dokumenty są wstrzykiwane do promptu przez dynamiczną funkcję
  `@agent.instructions`, która odczytuje typowane zależności przez `RunContext`.

## Embeddingi a Ollama Cloud

Ollama Cloud nie udostępnia modeli embeddingowych, więc demo na żywo używa zgodnego z OpenAI
endpointu embeddingowego. Ustaw `OPENAI_API_KEY` (i opcjonalnie `EMBEDDING_MODEL`), aby uruchomić
je naprawdę. Bez klucza moduł nadal importuje się poprawnie i zamiast wywoływać API wypisuje
podpowiedź.

## Uruchomienie

```bash
uv run sandbox/19-embeddings-rag/main.py
```

## Testy

Smoke test działa w pełni offline. Podmienia embedder na `TestEmbeddingModel` (deterministyczne
wektory) oraz agenta na `TestModel`, dzięki czemu przechodzi bez żadnego klucza API:

```bash
uv run pytest sandbox/19-embeddings-rag
```
