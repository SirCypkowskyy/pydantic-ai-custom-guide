# 01 - Installation

Accompanies the [Installation](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/instalacja) chapter.

Shows the simplest possible program with Pydantic AI: after installing the package you create one
agent with static instructions and call `run_sync` to get a response from the model.

## Running

```bash
# from the sandbox/ directory
uv run 01-installation/main.py

# smoke test
uv run pytest 01-installation/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
