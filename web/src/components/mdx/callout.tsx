import { AlertTriangle, Info, Lightbulb, OctagonAlert, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

type CalloutKind = "note" | "tip" | "warning" | "danger" | "key";

const CONFIG: Record<
  CalloutKind,
  { icon: typeof Info; cls: string; label: Record<"pl" | "en", string> }
> = {
  note: {
    icon: Info,
    cls: "border-chart-3/40 bg-chart-3/8 [&_.callout-icon]:text-chart-3",
    label: { pl: "Uwaga", en: "Note" },
  },
  tip: {
    icon: Lightbulb,
    cls: "border-chart-5/40 bg-chart-5/8 [&_.callout-icon]:text-chart-5",
    label: { pl: "Wskazówka", en: "Tip" },
  },
  warning: {
    icon: AlertTriangle,
    cls: "border-chart-2/50 bg-chart-2/10 [&_.callout-icon]:text-chart-2",
    label: { pl: "Ostrożnie", en: "Watch out" },
  },
  danger: {
    icon: OctagonAlert,
    cls: "border-destructive/40 bg-destructive/8 [&_.callout-icon]:text-destructive",
    label: { pl: "Pułapka", en: "Pitfall" },
  },
  key: {
    icon: Sparkles,
    cls: "border-primary/40 bg-primary/8 [&_.callout-icon]:text-primary",
    label: { pl: "Najważniejsze", en: "Key idea" },
  },
};

interface CalloutProps {
  kind?: CalloutKind;
  title?: string;
  children: ReactNode;
}

export function Callout({ kind = "note", title, children }: CalloutProps) {
  const { lang } = useLanguage();
  const { icon: Icon, cls, label } = CONFIG[kind];
  return (
    <div className={cn("my-6 rounded-xl border p-4 pl-4", cls)}>
      <div className="mb-1.5 flex items-center gap-2">
        <Icon className="callout-icon size-4.5 shrink-0" />
        <span className="font-display text-sm font-semibold tracking-tight">
          {title ?? label[lang]}
        </span>
      </div>
      <div className="callout-body text-sm leading-relaxed text-foreground/85 [&>:first-child]:mt-0 [&>:last-child]:mb-0 [&>p]:my-2">
        {children}
      </div>
    </div>
  );
}
