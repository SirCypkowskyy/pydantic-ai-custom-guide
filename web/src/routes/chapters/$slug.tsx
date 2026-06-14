import { createFileRoute } from "@tanstack/react-router";
import { ChapterPage } from "@/pages/chapter-page";

export const Route = createFileRoute("/chapters/$slug")({
  component: ChapterRoute,
});

function ChapterRoute() {
  const { slug } = Route.useParams();
  return <ChapterPage slug={slug} />;
}
