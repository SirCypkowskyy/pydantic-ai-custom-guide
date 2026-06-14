import { Link } from "@tanstack/react-router";
import { Heart } from "@/components/animate-ui/icons/heart";
import { BrandLogo } from "@/components/brand-logo";
import { GithubIcon } from "@/components/icons/github-icon";
import { useLanguage } from "@/hooks/use-language";
import { site } from "@/lib/site";

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-card/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <BrandLogo />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {site.description} {t("footer.notAffiliated")}
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <Link
            to="/chapters"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.chapters")}
          </Link>
          <Link
            to="/progress"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.progress")}
          </Link>
          <Link
            to="/playground"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.playground")}
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.about")}
          </Link>
          <a
            href={`${import.meta.env.BASE_URL}llms.txt`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            llms.txt
          </a>
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-3.5" />
            {t("footer.sourceOnGitHub")}
          </a>
        </nav>
      </div>
      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-1.5">
            {t("footer.builtWith")} React, Vite, shadcn/ui, animate-ui
            <Heart className="size-3 fill-primary text-primary" animateOnView />
          </p>
          <p>
            {t("footer.author")}{" "}
            <a
              href={site.author.site}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              {site.author.name}
            </a>{" "}
            {t("footer.withClaude")}
          </p>
        </div>
      </div>
    </footer>
  );
}
