import { Link, useRouterState } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ChapterIcon } from "@/components/chapter-icon";
import { ProgressRing } from "@/components/progress-ring";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { chapters, parts } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";

export function AppSidebar() {
  const { lang, t } = useLanguage();
  const { state, completion, completedCount, totalChapters } = useProgress();
  const { setOpenMobile } = useSidebar();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <Link
          to="/"
          className="flex items-center gap-2 px-1 py-1.5 group-data-[collapsible=icon]:justify-center"
          onClick={() => setOpenMobile(false)}
        >
          <BrandLogo withWordmark={false} className="group-data-[collapsible=icon]:mx-auto" />
          <span className="font-display text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Pydantic<span className="text-primary"> AI</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="scrollbar-slim">
        {parts.map((part) => (
          <SidebarGroup key={part.id}>
            <SidebarGroupLabel>{part.title[lang]}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chapters
                  .filter((c) => c.partId === part.id)
                  .map((chapter) => {
                    const href = `/chapters/${chapter.slug}`;
                    const isActive = pathname === href;
                    const done = state.chapters[chapter.slug]?.completed ?? false;
                    return (
                      <SidebarMenuItem key={chapter.slug}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={`${chapter.order}. ${chapter.title[lang]}`}
                        >
                          <Link
                            to="/chapters/$slug"
                            params={{ slug: chapter.slug }}
                            onClick={() => setOpenMobile(false)}
                          >
                            <ChapterIcon name={chapter.icon} />
                            <span className="truncate">
                              <span className="text-muted-foreground tabular-nums">
                                {chapter.order}.
                              </span>{" "}
                              {chapter.title[lang]}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                        {done ? (
                          <SidebarMenuBadge className="text-chart-5">
                            <Check className="size-3.5" />
                          </SidebarMenuBadge>
                        ) : null}
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t group-data-[collapsible=icon]:hidden">
        <Link
          to="/progress"
          className="flex items-center gap-3 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-sidebar-accent"
          onClick={() => setOpenMobile(false)}
        >
          <ProgressRing value={completion} size={40} strokeWidth={4}>
            <span className="font-mono text-[0.65rem] font-semibold tabular-nums">
              {Math.round(completion * 100)}
            </span>
          </ProgressRing>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{t("sidebar.progressRing")}</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {completedCount} / {totalChapters}
            </span>
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
