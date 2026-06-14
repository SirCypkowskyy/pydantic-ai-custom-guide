# 14 - pydantic-settings

Accompanies the [pydantic-settings](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/pydantic-settings) chapter.

Shows how to drive an agent from typed, validated configuration instead of scattered
`os.getenv` calls. The `AppSettings` class inherits from `BaseSettings`, reads environment
variables with the `CH14_` prefix and the `.env` file, and the nested `tuning` block is
read through the `__` delimiter.

## Configuration

Environment variables (all optional, with default values):

```bash
CH14_LANGUAGE=en
CH14_TUNING__TEMPERATURE=0.7
CH14_TUNING__MAX_SENTENCES=3
```

## Running

```bash
# from the sandbox/ directory
uv run 14-pydantic-settings/main.py

# smoke test (works offline, uses TestModel)
uv run pytest 14-pydantic-settings/smoke_test.py
```

`main.py` requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
The smoke test works without the network and without a key.
