import { createFileRoute } from "@tanstack/react-router";
import { ChaptersPage } from "@/pages/chapters-page";

export const Route = createFileRoute("/chapters/")({
  component: ChaptersPage,
});
