# 18 - Wejście multimodalne i myślenie

Towarzyszy rozdziałowi [Wejście multimodalne i myślenie](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/multimodal-myslenie).

Pokazuje, jak wysłać do modelu wizyjnego prompt łączący tekst z `ImageUrl`,
oraz jak włączyć krokowe rozumowanie przez możliwość `Thinking` i odczytać
powstały `ThinkingPart` osobno od finalnej odpowiedzi.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 18-multimodal-thinking/main.py

# smoke test (offline, bez klucza API)
uv run pytest 18-multimodal-thinking/smoke_test.py
```

Demo w `main.py` wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym
repozytorium. Smoke test działa w pełni offline dzięki `FunctionModel`.
