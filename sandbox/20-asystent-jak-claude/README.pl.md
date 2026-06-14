# 20 - Asystent jak Claude (capstone)

Towarzyszy rozdziałowi [Asystent jak Claude](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/asystent-jak-claude).

Pokazuje trzy filary asystenta w stylu Claude:

- umiejętność jako zestaw narzędzi (`FunctionToolset`),
- narzędzie wymagające zgody człowieka (`requires_approval=True`),
- pętlę akceptacji: `DeferredToolRequests` -> decyzja -> `DeferredToolResults` -> wznowienie.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 20-asystent-jak-claude/main.py     # scenariusz na żywo (model z obsługą narzędzi)
uv run pytest 20-asystent-jak-claude/      # smoke test offline (TestModel)
```

`main.py` używa modelu `qwen3-coder:480b` z obsługą wywołań funkcji. Smoke test działa bez
sieci, więc nie wymaga klucza API.
