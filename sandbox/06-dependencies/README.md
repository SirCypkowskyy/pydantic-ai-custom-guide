# 06 - Dependencies (DI)

Accompanies the [Dependencies](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/zaleznosci) chapter.

Shows dependency injection in Pydantic AI: a typed
`SupportDeps` dataclass passed via `deps=` on every run, then
read in a dynamic instruction and in a tool through `RunContext`. The same agent
behaves differently for different clients, without changing its definition.

## Running

```bash
# from the sandbox/ directory
uv run 06-dependencies/main.py

# smoke test
uv run pytest 06-dependencies/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
