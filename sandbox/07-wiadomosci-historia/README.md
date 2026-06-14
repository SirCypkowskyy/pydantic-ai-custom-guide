# 07 - Messages and history

Accompanies the [Messages and history](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/wiadomosci-historia) chapter.

Shows how to carry on a multi-turn conversation by passing `message_history`,
how to read the transcript through `all_messages` and `new_messages`, and how to serialize
the history to JSON and restore it back using `ModelMessagesTypeAdapter`.

## Running

```bash
# from the sandbox/ directory
uv run 07-wiadomosci-historia/main.py

# smoke test
uv run pytest 07-wiadomosci-historia/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
