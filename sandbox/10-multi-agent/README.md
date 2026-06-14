# 10 - Multi-agent and graphs

Accompanies the [Multi-agent and graphs](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/multi-agent) chapter.

Shows two patterns for composing agents:

- **Agent delegation** - a parent agent calls another agent from inside a tool
  and sums its usage (`usage`) with the main run.
- **A `pydantic_graph` graph** - a state machine in which the `Research`, `Draft`
  and `Review` nodes hand off control to each other, using a shared, typed state.
  The `Review` node either approves the paragraph or sends it back for one revision.

## Running

```bash
# from the sandbox/ directory
uv run 10-multi-agent/main.py

# smoke test
uv run pytest 10-multi-agent/smoke_test.py
```

Requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
