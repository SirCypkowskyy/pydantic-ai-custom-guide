import { ChapterCard } from "@/components/chapter-card";
import { chapters, parts } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";

export function HomeCurriculum() {
  const { lang } = useLanguage();
  const { state } = useProgress();

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-20">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {lang === "pl" ? "Program kursu" : "Course curriculum"}
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {lang === "pl"
            ? "Piętnaście rozdziałów prowadzących od pierwszego agenta do wdrożenia na produkcję, z quizem i działającym kodem na końcu każdego z nich."
            : "Fifteen chapters that take you from your first agent to a production deployment, each ending with a quiz and runnable code."}
        </p>
      </div>

      <div className="space-y-12">
        {parts.map((part, partIndex) => (
          <div key={part.id}>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-primary tabular-nums">
                {String(partIndex + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {part.title[lang]}
              </h3>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chapters
                .filter((c) => c.partId === part.id)
                .map((chapter) => (
                  <ChapterCard
                    key={chapter.slug}
                    chapter={chapter}
                    done={state.chapters[chapter.slug]?.completed ?? false}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
