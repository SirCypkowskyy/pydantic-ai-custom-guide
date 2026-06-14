# 20 - Interfaces & UI integration

Accompanies the [Interfaces & UI integration](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/interfejsy-ui) chapter.

A FastAPI app that streams the agent over the Vercel AI Data Stream protocol through
`VercelAIAdapter.dispatch_request`. A Next.js `useChat` hook or a plain SPA `fetch` can
consume the `/chat` endpoint. The same pattern works for the AG-UI adapter.

## Running

```bash
# from the sandbox/ directory
uv run 20-ui-integration/main.py        # serves on http://127.0.0.1:8000

# offline smoke test (TestModel, no API key)
uv run pytest 20-ui-integration/smoke_test.py
```

The live server uses `OLLAMA_CLOUD_API_KEY` from the repository root `.env`.
