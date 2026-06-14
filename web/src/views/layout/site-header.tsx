import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Search } from "@/components/animate-ui/icons/search";
import { ChapterIcon } from "@/components/chapter-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { chapters, parts } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";
import { site } from "@/lib/site";

export function SiteHeader() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/85 px-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <SidebarTrigger className="text-muted-foreground" />
      <Separator orientation="vertical" className="mr-1 h-5" />

      <AnimateIcon animateOnHover asChild>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="inline-flex h-9 flex-1 items-center gap-2 rounded-lg border bg-card/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-card sm:max-w-xs"
        >
          <Search className="size-4" />
          <span className="flex-1 text-left">{t("sidebar.search")}</span>
          <kbd className="hidden rounded border bg-muted px-1.5 font-mono text-[0.65rem] sm:inline">
            ⌘K
          </kbd>
        </button>
      </AnimateIcon>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hidden text-muted-foreground sm:inline-flex"
        >
          <Link to="/about">{t("nav.about")}</Link>
        </Button>
        <LanguageToggle />
        <ThemeToggle />
        <Button asChild variant="ghost" size="icon" className="text-muted-foreground">
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={t("footer.sourceOnGitHub")}
          >
            <GithubIcon className="size-4.5" />
          </a>
        </Button>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder={t("sidebar.search")} />
        <CommandList>
          <CommandEmpty>{lang === "pl" ? "Brak wyników." : "No results."}</CommandEmpty>
          {parts.map((part) => (
            <CommandGroup key={part.id} heading={part.title[lang]}>
              {chapters
                .filter((c) => c.partId === part.id)
                .map((chapter) => (
                  <AnimateIcon key={chapter.slug} animateOnHover asChild>
                    <CommandItem
                      value={`${chapter.order} ${chapter.title[lang]} ${chapter.title.en}`}
                      onSelect={() => {
                        setSearchOpen(false);
                        void navigate({ to: "/chapters/$slug", params: { slug: chapter.slug } });
                      }}
                    >
                      <ChapterIcon name={chapter.icon} className="text-muted-foreground" />
                      <span>
                        <span className="text-muted-foreground tabular-nums">{chapter.order}.</span>{" "}
                        {chapter.title[lang]}
                      </span>
                    </CommandItem>
                  </AnimateIcon>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </header>
  );
}
