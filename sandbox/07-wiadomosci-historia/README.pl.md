# 07 - Wiadomości i historia

Towarzyszy rozdziałowi [Wiadomości i historia](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/wiadomosci-historia).

Pokazuje, jak prowadzić wieloturową rozmowę przez przekazywanie `message_history`,
jak czytać transkrypt przez `all_messages` i `new_messages` oraz jak serializować
historię do JSON i odtwarzać ją z powrotem przy użyciu `ModelMessagesTypeAdapter`.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 07-wiadomosci-historia/main.py

# smoke test
uv run pytest 07-wiadomosci-historia/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
