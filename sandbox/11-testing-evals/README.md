# 11 - Tests and evaluations

Accompanies the [Tests and evaluations](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/testy-i-ewaluacje) chapter.

Shows how to test an agent without the network: `TestModel` generates a result from the output schema,
`FunctionModel` lets you precisely control the model's response and the tools it calls,
and `agent.override` swaps out the model during the test. The second part is evaluations using
`pydantic_evals` (`Dataset`, `Case`, a custom `Evaluator`), which score the structured output.

`main.py` runs the agent on a real model (Ollama Cloud) and runs the evaluations.
`smoke_test.py` works fully offline, without an API key.

## Running

```bash
# from the sandbox/ directory
uv run 11-testing-evals/main.py

# smoke test (offline, does not require a key)
uv run pytest 11-testing-evals/smoke_test.py
```

`main.py` requires `OLLAMA_CLOUD_API_KEY` in the `.env` file in the repository root.
The tests themselves work without a key thanks to `TestModel` and `FunctionModel`.
