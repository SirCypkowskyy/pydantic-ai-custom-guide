import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/views/layout/app-sidebar";
import { SiteFooter } from "@/views/layout/site-footer";
import { SiteHeader } from "@/views/layout/site-header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <SiteHeader />
        <div className="flex min-h-[calc(100svh-3.5rem)] flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
