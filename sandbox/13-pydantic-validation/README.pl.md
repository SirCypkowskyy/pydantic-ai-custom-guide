# 13 - Pydantic: walidacja w rdzeniu

Towarzyszy rozdziałowi [Pydantic](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/pydantic).

Pokazuje walidację, na której opiera się Pydantic AI: ograniczenia pól przez `Field`,
walidatory `field_validator` i `model_validator`, pola pochodne `computed_field`,
`TypeAdapter` do walidacji danych spoza modelu oraz round trip `model_validate` /
`model_dump`. Ten sam model jest użyty jako `output_type` agenta, więc odpowiedź modelu
przychodzi już zwalidowana.

Część Pydantic działa offline. Część z agentem wymaga Ollama Cloud.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 13-pydantic-validation/main.py

# smoke test (działa offline, bez klucza)
uv run pytest 13-pydantic-validation/smoke_test.py
```

Część online wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
