import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/views/layout/app-shell";

export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <TooltipProvider delayDuration={200}>
      <AppShell>
        <Outlet />
      </AppShell>
      <Toaster position="bottom-right" richColors closeButton />
    </TooltipProvider>
  );
}
