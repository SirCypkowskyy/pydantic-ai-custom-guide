# 08 - Streaming

Accompanies the [Streaming](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/streaming) chapter.

Shows three ways to stream a response:

- streaming text token by token through `stream_text(delta=True)`,
- streaming a partial, structured result through `stream_output()`,
- streaming raw run events through `run_stream_events()`.

Streaming works only in an asynchronous context, which is why the whole
example is run through a single `asyncio.run`.

## Running

```bash
# from the sandbox/ directory
uv run 08-streaming/main.py

# smoke test
uv run pytest 08-streaming/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
