import {
  Activity,
  Bot,
  Boxes,
  Braces,
  FlaskConical,
  Layers,
  type LucideIcon,
  MessagesSquare,
  Plug,
  Radio,
  Rocket,
  Server,
  Settings2,
  ShieldCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import type { ComponentProps } from "react";

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Bot,
  Layers,
  Braces,
  Wrench,
  Boxes,
  MessagesSquare,
  Radio,
  Plug,
  Workflow,
  FlaskConical,
  Activity,
  ShieldCheck,
  Settings2,
  Server,
};

interface ChapterIconProps extends ComponentProps<LucideIcon> {
  name: string;
}

export function ChapterIcon({ name, ...props }: ChapterIconProps) {
  const Icon = ICONS[name] ?? Braces;
  return <Icon {...props} />;
}
