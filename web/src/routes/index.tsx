import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <div className="p-10 font-display text-3xl">Pydantic AI - Przewodnik</div>;
}
