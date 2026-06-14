# 16 - Capabilities & hooks

Accompanies the [Capabilities & hooks](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/capabilities-hooki) chapter.

Shows a `Capability` that bundles instructions and tools into one reusable unit, a `Hooks`
capability that intercepts the run lifecycle to count model requests and log tool calls, and
a guardrail hook that blocks a destructive tool by raising `SkipToolExecution`.

## Running

```bash
# from the sandbox/ directory
uv run 16-capabilities-hooks/main.py

# smoke test (offline, uses TestModel, no API key needed)
uv run pytest 16-capabilities-hooks/smoke_test.py
```

Running `main.py` requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
The smoke test runs offline because it swaps in `TestModel`.
