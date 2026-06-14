# 04 - Structured output

Accompanies the [Structured output](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/structured-output) chapter.

Shows how to get a typed object instead of raw text:

- a `BaseModel` model as the `output_type`, so that `result.output` is a parsed object,
- a union of models with `PromptedOutput`, where the agent itself picks the right shape of the response,
- an `output_validator` with `ModelRetry`, which forces a faulty response to be corrected.

## Running

```bash
# from the sandbox/ directory
uv run 04-structured-output/main.py

# smoke test
uv run pytest 04-structured-output/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
