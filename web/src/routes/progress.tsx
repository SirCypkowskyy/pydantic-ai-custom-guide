import { createFileRoute } from "@tanstack/react-router";
import { ProgressPage } from "@/pages/progress-page";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
});
