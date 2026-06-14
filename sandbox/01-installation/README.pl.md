# 01 - Instalacja

Towarzyszy rozdziałowi [Instalacja](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/instalacja).

Pokazuje najprostszy możliwy program z Pydantic AI: po instalacji pakietu tworzysz jednego
agenta ze statycznymi instrukcjami i wywołujesz `run_sync`, żeby otrzymać odpowiedź od modelu.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 01-installation/main.py

# smoke test
uv run pytest 01-installation/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
