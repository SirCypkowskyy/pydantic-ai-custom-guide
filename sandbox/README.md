# Sandbox - działające przykłady Pydantic AI

Seria mini-projektów w Pythonie, po jednym na rozdział przewodnika. Każdy jest osobnym
pakietem w przestrzeni roboczej `uv`, ze ścisłą konfiguracją Ruff i basedpyright. Przykłady
korzystają z modeli na **Ollama Cloud**.

## Wymagania

- [uv](https://docs.astral.sh/uv/)
- Klucz `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium
  (skopiuj `sandbox/.env.example`).

## Instalacja

```bash
cd sandbox
uv sync --all-packages
```

## Uruchamianie

```bash
# pojedynczy przykład
uv run 02-agenty/main.py

# wszystkie smoke testy (pomijane, gdy brak klucza API)
uv run pytest
```

## Jakość

```bash
uv run ruff check .          # lint (reguły "ALL" z wąską listą wyjątków)
uv run ruff format --check . # formatowanie
uv run basedpyright          # typy
```

## Struktura

- `shared/` - wspólny pakiet `pai_sandbox_shared` z fabryką modelu (`ollama_model`).
- `NN-nazwa/` - projekt przypisany do rozdziału `NN`, z `main.py`, `smoke_test.py` i `README.md`.

Domyślny model to `gemma3:12b` (szybki, do smoke testów). Zmienisz go przez zmienną
`OLLAMA_MODEL` albo argument `ollama_model("nazwa-modelu")`.
