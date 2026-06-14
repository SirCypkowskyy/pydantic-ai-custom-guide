# 05 - Tools

Accompanies the [Tools](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/narzedzia) chapter.

Shows function calling by the agent: `@agent.tool_plain` for a tool without
context, `@agent.tool` with access to dependencies through `RunContext`, and
`ModelRetry`, which tells the model to fix faulty arguments. Tool descriptions and
argument schemas come from type hints and docstrings.

## Running

```bash
# from the sandbox/ directory
uv run 05-narzedzia/main.py

# smoke test
uv run pytest 05-narzedzia/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
Uses the `qwen3-coder:480b` model, which can call functions.
