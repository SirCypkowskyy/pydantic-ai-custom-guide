# 16 - Capabilities i hooki

Towarzyszy rozdziałowi [Capabilities i hooki](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/capabilities-hooki).

Pokazuje `Capability`, która łączy instrukcje i narzędzia w jedną wielokrotnie używaną
jednostkę, capability `Hooks`, która przechwytuje cykl życia uruchomienia, aby liczyć żądania
do modelu i logować wywołania narzędzi, oraz hook strażniczy, który blokuje destrukcyjne
narzędzie przez podniesienie `SkipToolExecution`.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 16-capabilities-hooks/main.py

# smoke test (offline, używa TestModel, nie wymaga klucza API)
uv run pytest 16-capabilities-hooks/smoke_test.py
```

Uruchomienie `main.py` wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym
repozytorium. Smoke test działa offline, ponieważ podstawia `TestModel`.
