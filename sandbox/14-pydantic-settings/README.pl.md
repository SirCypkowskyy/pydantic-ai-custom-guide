# 14 - pydantic-settings

Towarzyszy rozdziałowi [pydantic-settings](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/pydantic-settings).

Pokazuje, jak sterować agentem z typowanej, walidowanej konfiguracji zamiast rozproszonych
wywołań `os.getenv`. Klasa `AppSettings` dziedziczy po `BaseSettings`, czyta zmienne
środowiskowe z prefiksem `CH14_` oraz plik `.env`, a zagnieżdżony blok `tuning` jest
odczytywany przez delimiter `__`.

## Konfiguracja

Zmienne środowiskowe (wszystkie opcjonalne, mają wartości domyślne):

```bash
CH14_LANGUAGE=en
CH14_TUNING__TEMPERATURE=0.7
CH14_TUNING__MAX_SENTENCES=3
```

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 14-pydantic-settings/main.py

# smoke test (działa offline, używa TestModel)
uv run pytest 14-pydantic-settings/smoke_test.py
```

`main.py` wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
Smoke test działa bez sieci i bez klucza.
