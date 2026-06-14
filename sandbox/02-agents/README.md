# 02 - Agents

Accompanies the [Agents](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/agenty) chapter.

Shows a minimal agent, dynamic instructions that read dependencies through `RunContext`,
and the difference between `run_sync` and `run`.

## Running

```bash
# from the sandbox/ directory
uv run 02-agents/main.py

# smoke test
uv run pytest 02-agents/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
