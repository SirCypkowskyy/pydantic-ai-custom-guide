# 13 - Pydantic: validation at the core

Accompanies the [Pydantic](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/pydantic) chapter.

Shows the validation that Pydantic AI is built on: field constraints via `Field`,
`field_validator` and `model_validator` validators, derived fields via `computed_field`,
`TypeAdapter` for validating data from outside a model, and the `model_validate` /
`model_dump` round trip. The same model is used as the agent's `output_type`, so the model's response
arrives already validated.

The Pydantic part works offline. The part with the agent requires Ollama Cloud.

## Running

```bash
# from the sandbox/ directory
uv run 13-pydantic-walidacja/main.py

# smoke test (works offline, without a key)
uv run pytest 13-pydantic-walidacja/smoke_test.py
```

The online part requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
