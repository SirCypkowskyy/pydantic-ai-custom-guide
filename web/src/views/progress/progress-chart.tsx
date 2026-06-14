import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chapters, parts } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";

export function ProgressChart() {
  const { lang } = useLanguage();
  const { state } = useProgress();

  const data = parts.map((part) => {
    const inPart = chapters.filter((c) => c.partId === part.id);
    const done = inPart.filter((c) => state.chapters[c.slug]?.completed).length;
    return {
      part: part.title[lang],
      done,
      remaining: inPart.length - done,
    };
  });

  const config = {
    done: { label: lang === "pl" ? "Ukończone" : "Completed", color: "var(--chart-1)" },
    remaining: { label: lang === "pl" ? "Pozostałe" : "Remaining", color: "var(--muted)" },
  } satisfies ChartConfig;

  return (
    <Card className="p-5">
      <h2 className="mb-4 font-display text-lg font-semibold tracking-tight">
        {lang === "pl" ? "Ukończenie według części" : "Completion by part"}
      </h2>
      <ChartContainer config={config} className="h-[220px] w-full">
        <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 8 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="part"
            tickLine={false}
            axisLine={false}
            width={140}
            tick={{ fontSize: 12 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="done" stackId="a" fill="var(--color-done)" radius={[4, 0, 0, 4]} />
          <Bar
            dataKey="remaining"
            stackId="a"
            fill="var(--color-remaining)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
