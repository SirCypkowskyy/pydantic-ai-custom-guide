# 12 - Observability with Logfire

Accompanies the [Observability with Logfire](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/logfire) chapter.

Shows how to enable full tracing of agent runs with just a few lines of code:
messages exchanged with the model, tool calls along with their arguments and results,
token usage, and response times.

Key elements:

- `logfire.configure(...)` configures the SDK,
- `logfire.instrument_pydantic_ai()` traces every agent run,
- `logfire.instrument_httpx(...)` adds traces of the HTTP requests to the model themselves,
- `logfire.span(...)` groups related operations into a single trace.

We use `send_to_logfire="if-token-present"`, so the example works the same way
with and without a token. With a token the traces go to your Logfire project, without one
the instrumentation stays local.

## Running

```bash
# from the sandbox/ directory
uv run 12-logfire-observability/main.py

# smoke test
uv run pytest 12-logfire-observability/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
To see traces in the Logfire panel, additionally set `LOGFIRE_TOKEN` in the same file.
