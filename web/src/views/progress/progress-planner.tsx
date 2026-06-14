import { differenceInCalendarDays } from "date-fns";
import { CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";

const GOAL_KEY = "pai-goal-date";

function readGoal(): Date | undefined {
  try {
    const raw = window.localStorage.getItem(GOAL_KEY);
    return raw ? new Date(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function ProgressPlanner() {
  const { lang, t } = useLanguage();
  const { completedCount, totalChapters } = useProgress();
  const [goal, setGoal] = useState<Date | undefined>(readGoal);

  useEffect(() => {
    try {
      if (goal) window.localStorage.setItem(GOAL_KEY, goal.toISOString());
      else window.localStorage.removeItem(GOAL_KEY);
    } catch {
      /* storage unavailable */
    }
  }, [goal]);

  const remaining = totalChapters - completedCount;
  const daysLeft = goal ? Math.max(0, differenceInCalendarDays(goal, new Date())) : null;
  const perWeek =
    daysLeft && daysLeft > 0 ? Math.ceil(remaining / Math.max(1, daysLeft / 7)) : remaining;

  return (
    <Card className="flex flex-col gap-4 p-5">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
        <CalendarClock className="size-5 text-primary" />
        {t("progress.planner")}
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Calendar
          mode="single"
          selected={goal}
          onSelect={setGoal}
          disabled={{ before: new Date() }}
          className="rounded-lg border"
        />
        <div className="flex-1 space-y-3 text-sm">
          {goal ? (
            <>
              <p className="text-muted-foreground">
                {lang === "pl" ? "Cel ukończenia" : "Target completion"}:{" "}
                <span className="font-semibold text-foreground">
                  {goal.toLocaleDateString(lang === "pl" ? "pl-PL" : "en-US")}
                </span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Stat value={daysLeft ?? 0} label={lang === "pl" ? "dni" : "days left"} />
                <Stat value={remaining} label={lang === "pl" ? "rozdziałów" : "chapters left"} />
              </div>
              <p className="rounded-lg bg-muted/50 p-3 text-muted-foreground">
                {lang === "pl"
                  ? `Aby zdążyć, ucz się około ${perWeek} rozdziałów tygodniowo.`
                  : `To stay on track, study about ${perWeek} chapters per week.`}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground">
              {lang === "pl"
                ? "Wybierz datę, do której chcesz ukończyć kurs, a policzymy tempo nauki."
                : "Pick a date to finish the course by and we will work out the pace."}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg border p-3 text-center">
      <p className="font-display text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
