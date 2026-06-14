# Chapter 17: Advanced tools and toolsets

This example shows how to move beyond single `@agent.tool` functions and organize
behaviour into reusable, composable toolsets.

## What it shows

1. A `FunctionToolset` that groups related tools and carries its own instructions,
   so any agent that mounts it inherits the guidance.
2. A dynamic `prepare` function that hides a tool from the model unless the run
   context allows it (here, an admin-only password reset tool).
3. `CombinedToolset` together with `prefixed` and `filtered` to merge two toolsets,
   avoid name clashes, and trim a noisy tool out of the model's view.

## Run it

```bash
uv run sandbox/17-advanced-tools/main.py
```

The script needs `OLLAMA_CLOUD_API_KEY` in the repository `.env` because it talks to
a real model (`qwen3-coder:480b`) that supports tool calling.

## Test it

```bash
uv run pytest sandbox/17-advanced-tools/smoke_test.py
```

The smoke test is fully offline. It uses `TestModel` to inspect which tools each run
exposes, so it confirms the prefixing, filtering, and `prepare` gating without an API key.
