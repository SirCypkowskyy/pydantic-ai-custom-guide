import { Link } from "@tanstack/react-router";
import { BookOpen, FlaskConical, Languages, Trophy } from "lucide-react";
import type { ComponentType } from "react";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { MessageSquare } from "@/components/animate-ui/icons/message-square";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { site } from "@/lib/site";

export function HomeFeatures() {
  const { lang } = useLanguage();
  const pl = lang === "pl";

  return (
    <section className="border-y bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-20">
        <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {pl ? "Nie tylko do czytania" : "Not just reading material"}
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Card className="flex flex-col justify-between gap-6 p-7 lg:row-span-2">
            <div className="space-y-3">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <FlaskConical className="size-6" />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {pl ? "Działający kod w /sandbox" : "Runnable code in /sandbox"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pl
                  ? "Każdemu rozdziałowi towarzyszy projekt w uv ze ścisłym Ruffem, który naprawdę uruchamiasz - tutaj testowany na Ollama Cloud."
                  : "Every chapter ships a uv project with strict Ruff that you actually run - tested here against Ollama Cloud."}
              </p>
            </div>
            <a
              href={site.sandboxUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {pl ? "Zobacz projekty" : "Browse the projects"}
            </a>
          </Card>

          {(
            [
              {
                icon: Languages,
                title: pl ? "Po polsku i angielsku" : "Polish and English",
                body: pl
                  ? "Przełącz język jednym kliknięciem. Każdy rozdział istnieje w obu wersjach."
                  : "Switch language with one click. Every chapter exists in both versions.",
              },
              {
                icon: Trophy,
                title: pl ? "Quizy i postępy" : "Quizzes and progress",
                body: pl
                  ? "Krótki quiz kończy rozdział, a Twój wynik i postępy zapisują się lokalnie."
                  : "A short quiz closes each chapter; your score and progress are saved locally.",
              },
              {
                icon: BookOpen,
                title: pl ? "Źródła w dokumentacji" : "Linked source docs",
                body: pl
                  ? "Każdy rozdział linkuje dokładne strony dokumentacji, na których się opiera."
                  : "Each chapter links the exact documentation pages it is based on.",
              },
              {
                icon: MessageSquare,
                title: pl ? "Komentarze pod rozdziałem" : "Comments per chapter",
                body: pl
                  ? "Pytania i dyskusja działają przez giscus i GitHub Discussions."
                  : "Questions and discussion run on giscus and GitHub Discussions.",
              },
            ] satisfies {
              icon: ComponentType<{ className?: string }>;
              title: string;
              body: string;
            }[]
          ).map((feature) => (
            <AnimateIcon key={feature.title} animateOnHover asChild>
              <Card className="flex flex-col gap-2.5 p-6">
                <feature.icon className="size-5 text-primary" />
                <h3 className="font-display text-base font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.body}</p>
              </Card>
            </AnimateIcon>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/chapters"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            {pl ? "Przejdź do programu" : "Go to the curriculum"}
          </Link>
        </div>
      </div>
    </section>
  );
}
