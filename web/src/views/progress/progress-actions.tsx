import { useState } from "react";
import { toast } from "sonner";
import { Download } from "@/components/animate-ui/icons/download";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { RotateCcw } from "@/components/animate-ui/icons/rotate-ccw";
import { Upload } from "@/components/animate-ui/icons/upload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";
import { progressStore } from "@/lib/progress-store";

export function ProgressActions() {
  const { lang, t } = useLanguage();
  const [importText, setImportText] = useState("");
  const [importOpen, setImportOpen] = useState(false);

  const exportData = async () => {
    const json = progressStore.export();
    try {
      await navigator.clipboard.writeText(json);
      toast.success(lang === "pl" ? "Skopiowano do schowka" : "Copied to clipboard");
    } catch {
      toast.error(lang === "pl" ? "Nie udało się skopiować" : "Could not copy");
    }
  };

  const runImport = () => {
    if (progressStore.import(importText.trim())) {
      toast.success(lang === "pl" ? "Zaimportowano postępy" : "Progress imported");
      setImportOpen(false);
      setImportText("");
    } else {
      toast.error(lang === "pl" ? "Niepoprawne dane" : "Invalid data");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimateIcon animateOnHover asChild>
        <Button variant="outline" size="sm" onClick={exportData} className="gap-2">
          <Download className="size-4" />
          {t("progress.export")}
        </Button>
      </AnimateIcon>

      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogTrigger asChild>
          <AnimateIcon animateOnHover asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="size-4" />
              {t("progress.import")}
            </Button>
          </AnimateIcon>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("progress.import")}</DialogTitle>
            <DialogDescription>
              {lang === "pl"
                ? "Wklej wcześniej wyeksportowane dane postępów w formacie JSON."
                : "Paste previously exported progress data in JSON format."}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder='{"version":2,...}'
            className="min-h-40 font-mono text-xs"
          />
          <DialogFooter>
            <Button onClick={runImport} disabled={!importText.trim()}>
              {t("progress.import")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <AnimateIcon animateOnHover asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <RotateCcw className="size-4" />
              {t("progress.reset")}
            </Button>
          </AnimateIcon>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("progress.reset")}</AlertDialogTitle>
            <AlertDialogDescription>
              {lang === "pl"
                ? "Ta operacja usunie wszystkie zapisane wyniki i postępy. Nie można jej cofnąć."
                : "This will delete all saved scores and progress. It cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{lang === "pl" ? "Anuluj" : "Cancel"}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                progressStore.reset();
                toast.success(lang === "pl" ? "Wyczyszczono postępy" : "Progress cleared");
              }}
            >
              {t("progress.reset")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
