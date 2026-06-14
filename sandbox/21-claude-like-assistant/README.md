# 21 - An assistant like Claude (capstone)

Accompanies the [An assistant like Claude](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/asystent-jak-claude) chapter.

Shows the three pillars of a Claude-style assistant:

- a skill as a set of tools (`FunctionToolset`),
- a tool that requires human approval (`requires_approval=True`),
- the approval loop: `DeferredToolRequests` -> decision -> `DeferredToolResults` -> resume.

## Running

```bash
# from the sandbox/ directory
uv run 21-claude-like-assistant/main.py     # live scenario (model with tool support)
uv run pytest 21-claude-like-assistant/      # offline smoke test (TestModel)
```

`main.py` uses the `qwen3-coder:480b` model with function calling support. The smoke test works without
the network, so it does not require an API key.
