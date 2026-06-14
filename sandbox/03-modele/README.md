# 03 - Modele

Towarzyszy rozdziałowi [Modele i dostawcy](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/modele).

Pokazuje, że model za agentem to po prostu kolejny element konfiguracji:

- dostawca zgodny z OpenAI (Ollama Cloud) zbudowany raz we współdzielonym helperze,
- ustawienia modelu (`ModelSettings`) takie jak `temperature` czy `max_tokens`,
- `FallbackModel`, który próbuje kolejnego modelu, gdy pierwszy zawiedzie.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 03-modele/main.py

# smoke test
uv run pytest 03-modele/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
