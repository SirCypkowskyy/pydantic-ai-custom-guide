# 11 - Testy i ewaluacje

Towarzyszy rozdziałowi [Testy i ewaluacje](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/testy-i-ewaluacje).

Pokazuje, jak testować agenta bez sieci: `TestModel` generuje wynik ze schematu wyjścia,
`FunctionModel` pozwala precyzyjnie sterować odpowiedzią modelu i wywoływanymi narzędziami,
a `agent.override` podmienia model w trakcie testu. Druga część to ewaluacje za pomocą
`pydantic_evals` (`Dataset`, `Case`, własny `Evaluator`), które punktują ustrukturyzowane wyjście.

`main.py` uruchamia agenta na prawdziwym modelu (Ollama Cloud) i puszcza ewaluacje.
`smoke_test.py` działa w pełni offline, bez klucza API.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 11-testing-evals/main.py

# smoke test (offline, nie wymaga klucza)
uv run pytest 11-testing-evals/smoke_test.py
```

`main.py` wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
Same testy działają bez klucza dzięki `TestModel` i `FunctionModel`.
