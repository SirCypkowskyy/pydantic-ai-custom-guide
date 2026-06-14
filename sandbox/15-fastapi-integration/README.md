# 15 - FastAPI integration

Accompanies the [FastAPI integration](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/fastapi-integracja) chapter.

Shows how to expose a Pydantic AI agent over HTTP:

- the `/ask` endpoint validates the request body with a Pydantic model and returns a structured,
  typed response (`output_type`),
- dependency injection: FastAPI builds `Deps` for each request and passes them
  to the agent through `RunContext`,
- the `/stream` endpoint streams text chunks from `run_stream` to the client as
  Server-Sent Events through `StreamingResponse`.

## Running

```bash
# from the sandbox/ directory

# option 1: start the server and query the endpoints yourself
uv run uvicorn main:app --reload  # from the 15-fastapi-integration/ directory

# option 2: the script starts the server itself and sends example requests
uv run 15-fastapi-integration/main.py

# smoke test (works offline, without a key, thanks to TestModel)
uv run pytest 15-fastapi-integration/smoke_test.py
```

The `main.py` script and the server require `OLLAMA_CLOUD_API_KEY` in the `.env` file
in the repository root. The smoke test works without a key because it swaps
the model out for `TestModel`.
