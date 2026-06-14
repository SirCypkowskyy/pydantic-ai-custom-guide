import { ArrowRight, Check, RotateCcw, Trophy, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ChapterQuiz as ChapterQuizData } from "@/content/quiz-types";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";
import { progressStore } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

type Phase = "intro" | "active" | "done";

export function ChapterQuiz({ slug, quiz }: { slug: string; quiz: ChapterQuizData }) {
  const { lang, t } = useLanguage();
  const { state } = useProgress();
  const total = quiz.questions.length;

  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const question = quiz.questions[current];
  const best = state.chapters[slug];

  const reset = () => {
    setPhase("intro");
    setCurrent(0);
    setSelected(null);
    setChecked(false);
    setAnswers({});
  };

  const check = () => {
    if (selected === null || !question) return;
    const correct = selected === question.answer;
    setAnswers((prev) => ({ ...prev, [current]: correct }));
    setChecked(true);
    toast[correct ? "success" : "error"](correct ? t("quiz.correct") : t("quiz.incorrect"));
  };

  const advance = () => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setChecked(false);
      return;
    }
    const finalAnswers = answers;
    const correctCount = Object.values(finalAnswers).filter(Boolean).length;
    progressStore.recordQuizResult(slug, finalAnswers, total);
    setPhase("done");
    toast(t("quiz.yourScore"), { description: `${correctCount} / ${total}` });
  };

  if (phase === "intro") {
    return (
      <Card className="my-4 flex flex-col items-start gap-4 border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Trophy className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight">{t("quiz.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("quiz.subtitle")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {best ? (
            <span className="text-sm text-muted-foreground">
              {t("quiz.bestScore")}:{" "}
              <span className="font-semibold tabular-nums">
                {best.bestCorrect}/{best.total}
              </span>
            </span>
          ) : null}
          <Button onClick={() => setPhase("active")} className="gap-2">
            {t("quiz.start")}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
    );
  }

  if (phase === "done") {
    const correctCount = Object.values(answers).filter(Boolean).length;
    const passed = correctCount / total >= 0.6;
    return (
      <Card className="my-4 flex flex-col items-center gap-5 p-8 text-center">
        <span
          className={cn(
            "grid size-16 place-items-center rounded-2xl",
            passed ? "bg-chart-5/15 text-chart-5" : "bg-chart-2/15 text-chart-2",
          )}
        >
          <Trophy className="size-8" />
        </span>
        <div>
          <p className="font-display text-5xl font-semibold tabular-nums">
            <CountingNumber number={correctCount} /> / {total}
          </p>
          <p className="mt-1 text-muted-foreground">{t("quiz.yourScore")}</p>
        </div>
        {passed ? <Badge className="bg-chart-5/15 text-chart-5">{t("quiz.passed")}</Badge> : null}
        <div className="mt-2 flex flex-col gap-3 text-left">
          {quiz.questions.map((q, i) => (
            <div key={q.prompt[lang]} className="flex items-start gap-2 text-sm">
              {answers[i] ? (
                <Check className="mt-0.5 size-4 shrink-0 text-chart-5" />
              ) : (
                <X className="mt-0.5 size-4 shrink-0 text-destructive" />
              )}
              <span>
                <span className="font-medium">{q.prompt[lang]}</span>
                <span className="mt-0.5 block text-muted-foreground">{q.explanation[lang]}</span>
              </span>
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={reset} className="gap-2">
          <RotateCcw className="size-4" />
          {t("quiz.retry")}
        </Button>
      </Card>
    );
  }

  if (!question) return null;

  return (
    <Card className="my-4 flex flex-col gap-5 p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-muted-foreground tabular-nums">
          {t("quiz.question")} {current + 1} {t("quiz.of")} {total}
        </span>
        <Progress value={((current + (checked ? 1 : 0)) / total) * 100} className="h-1.5 w-32" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight">
            {question.prompt[lang]}
          </h3>

          <RadioGroup
            value={selected === null ? "" : String(selected)}
            onValueChange={(v) => !checked && setSelected(Number(v))}
            className="gap-2"
          >
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answer;
              const isSelected = i === selected;
              const optionId = `q${current}-o${i}`;
              return (
                <label
                  key={opt.text[lang]}
                  htmlFor={optionId}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                    !checked && "hover:border-primary/40 hover:bg-accent/40",
                    checked && isCorrect && "border-chart-5/50 bg-chart-5/10",
                    checked &&
                      isSelected &&
                      !isCorrect &&
                      "border-destructive/50 bg-destructive/10",
                    checked && "cursor-default",
                  )}
                >
                  <RadioGroupItem id={optionId} value={String(i)} disabled={checked} />
                  <span className="flex-1">{opt.text[lang]}</span>
                  {checked && isCorrect ? <Check className="size-4 text-chart-5" /> : null}
                  {checked && isSelected && !isCorrect ? (
                    <X className="size-4 text-destructive" />
                  ) : null}
                </label>
              );
            })}
          </RadioGroup>

          {checked ? (
            <div className="rounded-lg border bg-muted/40 p-3 text-sm leading-relaxed">
              <span className="font-semibold">{t("quiz.explanation")}: </span>
              {question.explanation[lang]}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end">
        {checked ? (
          <Button onClick={advance} className="gap-2">
            {current + 1 < total ? t("quiz.next") : t("quiz.finish")}
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button onClick={check} disabled={selected === null}>
            {t("quiz.check")}
          </Button>
        )}
      </div>
    </Card>
  );
}
