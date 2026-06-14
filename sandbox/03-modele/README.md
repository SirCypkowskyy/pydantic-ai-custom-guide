# 03 - Models

Accompanies the [Models and providers](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/modele) chapter.

Shows that the model behind an agent is simply another piece of configuration:

- an OpenAI-compatible provider (Ollama Cloud) built once in a shared helper,
- model settings (`ModelSettings`) such as `temperature` or `max_tokens`,
- `FallbackModel`, which tries the next model when the first one fails.

## Running

```bash
# from the sandbox/ directory
uv run 03-modele/main.py

# smoke test
uv run pytest 03-modele/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
