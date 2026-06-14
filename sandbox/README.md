# Sandbox - working Pydantic AI examples

A series of mini-projects in Python, one per guide chapter. Each is a separate
package in a `uv` workspace, with strict Ruff and basedpyright configuration. The examples
use models on **Ollama Cloud**.

## Requirements

- [uv](https://docs.astral.sh/uv/)
- An `OLLAMA_CLOUD_API_KEY` key in the `.env` file in the repository root
  (copy `sandbox/.env.example`).

## Installation

```bash
cd sandbox
uv sync --all-packages
```

## Running

```bash
# a single example
uv run 02-agenty/main.py

# all smoke tests (skipped when the API key is missing)
uv run pytest
```

## Quality

```bash
uv run ruff check .          # lint ("ALL" rules with a narrow list of exceptions)
uv run ruff format --check . # formatting
uv run basedpyright          # types
```

## Structure

- `shared/` - the shared `pai_sandbox_shared` package with the model factory (`ollama_model`).
- `NN-name/` - a project tied to chapter `NN`, with `main.py`, `smoke_test.py` and `README.md`.

The default model is `gemma3:12b` (fast, for smoke tests). You can change it via the
`OLLAMA_MODEL` variable or the `ollama_model("model-name")` argument.
