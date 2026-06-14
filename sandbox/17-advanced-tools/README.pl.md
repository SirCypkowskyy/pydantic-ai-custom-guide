# Rozdział 17: Zaawansowane narzędzia i zestawy narzędzi

Ten przykład pokazuje, jak wyjść poza pojedyncze funkcje `@agent.tool` i zorganizować
zachowanie w wielokrotnego użytku, komponowalne zestawy narzędzi.

## Co pokazuje

1. `FunctionToolset`, który grupuje powiązane narzędzia i niesie własne instrukcje,
   więc każdy agent, który go podłączy, dziedziczy te wskazówki.
2. Dynamiczną funkcję `prepare`, która ukrywa narzędzie przed modelem, dopóki kontekst
   uruchomienia na nie nie pozwoli (tutaj narzędzie resetu hasła tylko dla administratora).
3. `CombinedToolset` razem z `prefixed` i `filtered`, aby połączyć dwa zestawy narzędzi,
   uniknąć kolizji nazw i usunąć zbędne narzędzie z pola widzenia modelu.

## Uruchomienie

```bash
uv run sandbox/17-advanced-tools/main.py
```

Skrypt potrzebuje `OLLAMA_CLOUD_API_KEY` w pliku `.env` repozytorium, ponieważ rozmawia
z prawdziwym modelem (`qwen3-coder:480b`), który obsługuje wywoływanie narzędzi.

## Testowanie

```bash
uv run pytest sandbox/17-advanced-tools/smoke_test.py
```

Test dymny działa w pełni offline. Używa `TestModel` do sprawdzenia, które narzędzia
udostępnia każde uruchomienie, więc potwierdza prefiksowanie, filtrowanie i bramkowanie
`prepare` bez klucza API.
