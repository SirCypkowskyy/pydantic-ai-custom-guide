import {
  Activity,
  AppWindow,
  Boxes,
  Braces,
  Database,
  FlaskConical,
  Image,
  MessagesSquare,
  PencilRuler,
  Plug,
  Puzzle,
  Rocket,
  Server,
  Settings2,
  ShieldCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";
import { Bot } from "@/components/animate-ui/icons/bot";
import { Layers } from "@/components/animate-ui/icons/layers";
import { Radio } from "@/components/animate-ui/icons/radio";

// Common props shared by both lucide and animate-ui icon components. Narrow on
// purpose so the two icon families are assignable to a single map type.
type IconComponent = ComponentType<{ className?: string; size?: number }>;

// Icons with an animate-ui equivalent animate when a parent <AnimateIcon> (card,
// sidebar item, search result) is hovered; the rest stay as static lucide icons.
const ICONS: Record<string, IconComponent> = {
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
  Puzzle,
  PencilRuler,
  Image,
  Database,
  AppWindow,
};

interface ChapterIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function ChapterIcon({ name, ...props }: ChapterIconProps) {
  const Icon = ICONS[name] ?? Braces;
  return <Icon {...props} />;
}
