# 04 - Structured output

Towarzyszy rozdziałowi [Structured output](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/structured-output).

Pokazuje, jak zamiast surowego tekstu otrzymać typowany obiekt:

- model `BaseModel` jako `output_type`, dzięki czemu `result.output` jest sparsowanym obiektem,
- unię modeli z `PromptedOutput`, gdzie agent sam wybiera właściwy kształt odpowiedzi,
- `output_validator` z `ModelRetry`, który wymusza poprawę błędnej odpowiedzi.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 04-structured-output/main.py

# smoke test
uv run pytest 04-structured-output/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
