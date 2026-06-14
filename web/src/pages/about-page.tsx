import { ExternalLink, Globe, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";
import { Card } from "@/components/ui/card";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLanguage } from "@/hooks/use-language";
import { site } from "@/lib/site";

export function AboutPage() {
  const { lang, t } = useLanguage();
  const pl = lang === "pl";
  useDocumentMeta({
    title: t("nav.about"),
    description: pl
      ? "O przewodniku, jego autorze i o tym, jak powstał."
      : "About the guide, its author, and how it was made.",
    path: "about",
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">{t("nav.about")}</h1>
      <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
        {pl
          ? "Nieoficjalny, społecznościowy przewodnik po Pydantic AI. Otwarty kod, dwa języki, działające przykłady."
          : "An unofficial, community guide to Pydantic AI. Open source, two languages, runnable examples."}
      </p>

      <Card className="mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {pl ? "Autor" : "Author"}
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
            {site.author.name}
          </p>
          <p className="text-sm text-muted-foreground">@{site.author.handle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={site.author.site}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Globe className="size-4" />
            gburek.dev
          </a>
          <a
            href={site.author.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </Card>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
          <Sparkles className="size-5 text-primary" />
          {pl ? "Jak powstał ten przewodnik" : "How this guide was made"}
        </h2>
        <div className="mt-3 space-y-3 text-foreground/85 leading-relaxed">
          {pl ? (
            <>
              <p>
                Nie ma co tego ukrywać: ten przewodnik powstał z dużą pomocą{" "}
                <strong>Claude Code</strong> i modelu <strong>Claude Opus</strong> od Anthropic.
                Człowiek wyznaczał kierunek, zakres i poprawki, a model pisał kod, treść rozdziałów
                i przykłady w Pythonie, sprawdzane potem na żywo na Ollama Cloud.
              </p>
              <p>
                Traktuj to jako dowód, do czego nadają się dzisiejsze asystenty programistyczne, a
                nie zamiennik własnego myślenia. Każdy rozdział linkuje oficjalną dokumentację, na
                której się opiera, więc źródło zawsze masz pod ręką.
              </p>
            </>
          ) : (
            <>
              <p>
                No point hiding it: this guide was built with a lot of help from{" "}
                <strong>Claude Code</strong> and Anthropic's <strong>Claude Opus</strong> model. A
                human set the direction, scope, and corrections, while the model wrote the code, the
                chapter content, and the Python examples, which were then verified live against
                Ollama Cloud.
              </p>
              <p>
                Treat it as evidence of what today's coding assistants are good for, not a
                replacement for your own thinking. Every chapter links the official documentation it
                draws from, so the source is always one click away.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {pl ? "Dlaczego Pydantic AI" : "Why Pydantic AI"}
        </h2>
        <div className="mt-3 space-y-3 text-foreground/85 leading-relaxed">
          {pl ? (
            <>
              <p>
                W mojej ocenie Pydantic AI jest dziś jednym z najlepszych i najlepiej sprawdzonych
                frameworków do budowy agentów AI na rynku. Stoi na Pydanticu, którego używa pół
                świata, daje typowanie i walidację u podstaw, jest niezależny od dostawcy modelu, a
                doświadczenie pracy przypomina FastAPI: zwięzłe, przewidywalne i gotowe na
                produkcję.
              </p>
              <p>
                Do tego dochodzi poważna historia testów, ewaluacji i obserwowalności (Logfire,
                OpenTelemetry). Jeśli zaczynasz przygodę z agentami w Pythonie, polecam Pydantic AI
                każdemu programiście na start.
              </p>
            </>
          ) : (
            <>
              <p>
                In my assessment, Pydantic AI is currently one of the best and most proven AI agent
                frameworks on the market. It stands on Pydantic, which half the ecosystem already
                uses, it puts typing and validation at the core, it is model-agnostic, and the
                developer experience feels like FastAPI: concise, predictable, and production-ready.
              </p>
              <p>
                On top of that it has a serious testing, evals, and observability story (Logfire,
                OpenTelemetry). If you are starting with agents in Python, I recommend Pydantic AI
                to every developer as a starting point.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {pl ? "Kod i licencja" : "Source & license"}
        </h2>
        <p className="mt-3 text-foreground/85 leading-relaxed">
          {pl
            ? "Cały kod (aplikacja i przykłady w /sandbox) jest otwarty na licencji MIT."
            : "All the code (the app and the /sandbox examples) is open source under the MIT license."}
        </p>
        <a
          href={site.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-primary hover:underline"
        >
          <ExternalLink className="size-4" />
          {t("footer.sourceOnGitHub")}
        </a>
      </section>
    </div>
  );
}
