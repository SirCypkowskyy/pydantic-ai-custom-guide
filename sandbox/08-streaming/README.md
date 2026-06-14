# 08 - Streaming

Towarzyszy rozdziałowi [Streaming](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/streaming).

Pokazuje trzy sposoby strumieniowania odpowiedzi:

- strumieniowanie tekstu token po tokenie przez `stream_text(delta=True)`,
- strumieniowanie częściowego, ustrukturyzowanego wyniku przez `stream_output()`,
- strumieniowanie surowych zdarzeń przebiegu przez `run_stream_events()`.

Strumieniowanie działa wyłącznie w kontekście asynchronicznym, dlatego cały
przykład jest uruchamiany przez jedno `asyncio.run`.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 08-streaming/main.py

# smoke test
uv run pytest 08-streaming/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
