# 05 - Narzedzia

Towarzyszy rozdziałowi [Narzędzia](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/narzedzia).

Pokazuje wywoływanie funkcji przez agenta: `@agent.tool_plain` dla narzędzia bez
kontekstu, `@agent.tool` z dostępem do zależności przez `RunContext` oraz
`ModelRetry`, które każe modelowi poprawić błędne argumenty. Opisy narzędzi i
schematy argumentów pochodzą z podpowiedzi typów i docstringów.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 05-narzedzia/main.py

# smoke test
uv run pytest 05-narzedzia/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
Używa modelu `qwen3-coder:480b`, który potrafi wywoływać funkcje.
