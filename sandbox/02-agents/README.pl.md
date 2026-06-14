# 02 - Agenty

Towarzyszy rozdziałowi [Agenty](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/agenty).

Pokazuje minimalnego agenta, dynamiczne instrukcje czytające zależności przez `RunContext`
oraz różnicę między `run_sync` a `run`.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 02-agents/main.py

# smoke test
uv run pytest 02-agents/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
