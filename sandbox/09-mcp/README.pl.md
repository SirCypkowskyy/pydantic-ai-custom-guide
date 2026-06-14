# 09 - MCP (Model Context Protocol)

Towarzyszy rozdziałowi [MCP](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/mcp).

Pokazuje, jak agent korzysta z narzędzi udostępnianych przez **osobny proces** zamiast
definiować je inline przez `@agent.tool`. Lokalny serwer MCP (`dice_server.py`) jest
uruchamiany przez `MCPServerStdio` i podpinany do agenta przez `toolsets=[...]`. Model
sam odkrywa narzędzia serwera (`roll_dice`, `sum_values`) i wywołuje je w trakcie biegu.

Połączenie MCP otwieramy przez `async with agent:`, dzięki czemu podproces serwera jest
startowany i zamykany czysto wokół wywołania `run`.

## Pliki

- `dice_server.py` - minimalny serwer MCP (FastMCP) z dwoma narzędziami na transporcie stdio.
- `main.py` - agent łączący się z serwerem i wykonujący zadanie wymagające narzędzi.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 09-mcp/main.py

# smoke test
uv run pytest 09-mcp/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
