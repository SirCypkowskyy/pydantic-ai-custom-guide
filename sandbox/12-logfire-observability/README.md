# 12 - Obserwowalnosc z Logfire

Towarzyszy rozdzialowi [Obserwowalnosc z Logfire](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/logfire).

Pokazuje, jak kilkoma liniami kodu wlaczyc pelne sledzenie przebiegow agenta:
wiadomosci wymieniane z modelem, wywolania narzedzi wraz z argumentami i wynikami,
zuzycie tokenow oraz czasy odpowiedzi.

Kluczowe elementy:

- `logfire.configure(...)` konfiguruje SDK,
- `logfire.instrument_pydantic_ai()` sledzi kazdy przebieg agenta,
- `logfire.instrument_httpx(...)` dodaje slady samych zapytan HTTP do modelu,
- `logfire.span(...)` grupuje powiazane operacje w jeden trace.

Uzywamy `send_to_logfire="if-token-present"`, dzieki czemu przyklad dziala tak samo
z tokenem i bez niego. Z tokenem slady trafiaja do Twojego projektu Logfire, bez niego
instrumentacja pozostaje lokalna.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 12-logfire-observability/main.py

# smoke test
uv run pytest 12-logfire-observability/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu glownym repozytorium.
Aby zobaczyc slady w panelu Logfire, ustaw dodatkowo `LOGFIRE_TOKEN` w tym samym pliku.
