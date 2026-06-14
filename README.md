# Pydantic AI - przewodnik (PL/EN)

Kompletny, dwujęzyczny (polski i angielski) tutorial Pydantic AI na czerwiec 2026.
Statyczna aplikacja SPA wystawiana przez GitHub Pages, z serią działających przykładów
w Pythonie testowanych na Ollama Cloud.

**Na żywo:** https://sircypkowskyy.github.io/pydantic-ai-custom-guide/

## Co jest w środku

| Katalog | Opis |
| --- | --- |
| `web/` | Aplikacja React + Vite (SPA): treść w MDX, quizy, panel postępów, komentarze giscus. |
| `sandbox/` | Przestrzeń robocza `uv` z mini-projektami Pydantic AI, po jednym na rozdział. |
| `docs/` | Specyfikacja projektu. |

## Stos technologiczny

React 19, Vite, TypeScript (strict), Tailwind v4, shadcn/ui, animate-ui, TanStack Router
i Query, MDX z podświetlaniem Shiki, Mermaid, Recharts. Jakość pilnują Biome i `tsc`.
Sandbox: `uv`, ścisły Ruff i basedpyright.

## Praca lokalna

```bash
# Aplikacja
cd web
pnpm install
pnpm dev          # serwer deweloperski
pnpm build        # produkcyjny build + sitemap + llms.txt
pnpm lint         # Biome
pnpm typecheck    # tsc

# Przykłady w Pythonie
cd sandbox
uv sync --all-packages
uv run 02-agenty/main.py
uv run pytest
```

Klucz do Ollama Cloud umieść w pliku `.env` w katalogu głównym:

```
OLLAMA_CLOUD_API_KEY=...
```

## Wdrożenie

Push na gałąź `main` uruchamia workflow `.github/workflows/deploy.yml`, który buduje
`web/` i publikuje na GitHub Pages.

## Komentarze (giscus) - jednorazowa konfiguracja

Komentarze pod rozdziałami działają przez [giscus](https://giscus.app/pl). Repozytorium ma
już włączone Discussions, a identyfikatory są wpisane w `web/src/lib/site.ts`. Pozostał
jeden krok ręczny:

1. Wejdź na https://github.com/apps/giscus i zainstaluj aplikację giscus na repozytorium
   `SirCypkowskyy/pydantic-ai-custom-guide`.

To wszystko. Bez tego kroku sekcja komentarzy się nie załaduje.

## llms.txt

Build generuje `llms.txt` (indeks), `llms-full.txt` (cała treść) oraz wersje markdown
każdego rozdziału pod `/chapters/<slug>.md`, zgodnie z [llmstxt.org](https://llmstxt.org).

## Licencja

Nieoficjalny przewodnik społecznościowy. Kod na licencji [MIT](LICENSE).
Autor: [Cyprian Gburek](https://gburek.dev) (SirCypkowskyy). Powstał z asystą Claude Code i Opusa.
