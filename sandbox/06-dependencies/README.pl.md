# 06 - Zaleznosci (DI)

Towarzyszy rozdziałowi [Zależności](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/zaleznosci).

Pokazuje wstrzykiwanie zależności (dependency injection) w Pydantic AI: typowana
dataklasa `SupportDeps` przekazywana przez `deps=` przy każdym uruchomieniu, a następnie
odczytywana w dynamicznej instrukcji oraz w narzędziu przez `RunContext`. Ten sam agent
zachowuje się inaczej dla różnych klientów, bez zmiany jego definicji.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 06-dependencies/main.py

# smoke test
uv run pytest 06-dependencies/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
