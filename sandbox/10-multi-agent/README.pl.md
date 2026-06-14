# 10 - Multi-agent i grafy

Towarzyszy rozdziałowi [Multi-agent i grafy](https://sircypkowskyy.github.io/pydantic-ai-custom-guide/chapters/multi-agent).

Pokazuje dwa wzorce składania agentów:

- **Delegacja agenta** - agent nadrzędny wywołuje innego agenta z wnętrza narzędzia
  i sumuje jego zużycie (`usage`) z głównym przebiegiem.
- **Graf `pydantic_graph`** - maszyna stanów, w której węzły `Research`, `Draft`
  i `Review` przekazują sobie sterowanie, korzystając ze wspólnego, typowanego stanu.
  Węzeł `Review` albo zatwierdza akapit, albo zawraca go do jednej poprawki.

## Uruchomienie

```bash
# z katalogu sandbox/
uv run 10-multi-agent/main.py

# smoke test
uv run pytest 10-multi-agent/smoke_test.py
```

Wymaga `OLLAMA_CLOUD_API_KEY` w pliku `.env` w katalogu głównym repozytorium.
