# 20 - Interfejsy i integracja z UI

Towarzyszy rozdziałowi [Interfejsy i integracja z UI](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/interfejsy-ui).

Aplikacja FastAPI, która strumieniuje agenta przez protokół Vercel AI Data Stream za pomocą
`VercelAIAdapter.dispatch_request`. Endpoint `/chat` obsłuży hook `useChat` z Next.js albo
zwykły `fetch` z aplikacji SPA. Ten sam wzorzec działa dla adaptera AG-UI.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 20-ui-integration/main.py        # serwer na http://127.0.0.1:8000

# smoke test offline (TestModel, bez klucza API)
uv run pytest 20-ui-integration/smoke_test.py
```

Serwer na żywo używa `OLLAMA_CLOUD_API_KEY` z pliku `.env` w katalogu głównym repozytorium.
