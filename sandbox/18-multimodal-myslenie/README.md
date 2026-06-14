# 18 - Multimodal input and thinking

Accompanies the [Multimodal input and thinking](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/multimodal-myslenie) chapter.

Shows how to send a prompt that mixes text with an `ImageUrl` to a vision model,
and how to enable step-by-step reasoning through the `Thinking` capability and
read the resulting `ThinkingPart` apart from the final answer.

## Running

```bash
# from the sandbox/ directory
uv run 18-multimodal-myslenie/main.py

# smoke test (offline, no API key needed)
uv run pytest 18-multimodal-myslenie/smoke_test.py
```

The demo in `main.py` requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the
repository root. The smoke test runs fully offline with `FunctionModel`.
