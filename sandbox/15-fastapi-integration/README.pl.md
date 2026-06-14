# 15 - Integracja z FastAPI

Towarzyszy rozdziałowi [Integracja z FastAPI](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/fastapi-integracja).

Pokazuje, jak wystawić agenta Pydantic AI przez HTTP:

- endpoint `/ask` waliduje ciało żądania modelem Pydantic i zwraca ustrukturyzowaną,
  typowaną odpowiedź (`output_type`),
- wstrzykiwanie zależności: FastAPI buduje `Deps` dla każdego żądania i przekazuje je
  agentowi przez `RunContext`,
- endpoint `/stream` przesyła fragmenty tekstu z `run_stream` do klienta jako
  Server-Sent Events przez `StreamingResponse`.

## Uruchomienie

```bash
# z katalogu sandbox/

# wariant 1: uruchom serwer i samodzielnie odpytaj endpointy
uv run uvicorn main:app --reload  # z katalogu 15-fastapi-integration/

# wariant 2: skrypt sam startuje serwer i wysyła przykładowe żądania
uv run 15-fastapi-integration/main.py

# smoke test (działa offline, bez klucza, dzięki TestModel)
uv run pytest 15-fastapi-integration/smoke_test.py
```

Skrypt `main.py` oraz serwer wymagają `OLLAMA_CLOUD_API_KEY` w pliku `.env`
w katalogu głównym repozytorium. Smoke test działa bez klucza, ponieważ podmienia
model na `TestModel`.
