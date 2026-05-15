"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import { useTransition, type ReactElement } from "react";
import { LOCALES } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LOCALE_META: Record<Locale, { label: string; name: string }> = {
  tr: { label: "TR", name: "Türkçe" },
  en: { label: "EN", name: "English" },
  ru: { label: "RU", name: "Русский" },
};

type Props = {
  /**
   * "inline"  — horizontal TR | EN | RU strip (navbar desktop)
   * "stacked" — vertical full-name list (mobile menu)
   */
  variant?: "inline" | "stacked";
};

export function LanguageSwitcher({ variant = "inline" }: Props): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = (params?.locale as Locale) ?? "tr";

  function switchLocale(next: Locale): void {
    if (next === currentLocale) return;
    // Replace the locale segment (first segment) in the path
    const segments = pathname.split("/");
    segments[1] = next;
    startTransition(() => {
      router.push(segments.join("/"));
    });
  }

  if (variant === "stacked") {
    return (
      <div className="flex gap-6 mt-2">
        {LOCALES.map((locale) => {
          const meta = LOCALE_META[locale];
          return (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              disabled={isPending}
              className={cn(
                "font-display text-[1.1rem] font-light tracking-[0.2em] uppercase transition-colors duration-300",
                currentLocale === locale
                  ? "text-accent"
                  : "text-text-muted hover:text-text-secondary",
              )}
            >
              {meta.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300",
        isPending && "pointer-events-none opacity-40",
      )}
      aria-label="Select language"
    >
      {LOCALES.map((locale, i) => {
        const meta = LOCALE_META[locale];
        return (
          <span key={locale} className="flex items-center">
            {i > 0 && (
              <span className="mx-2 text-text-muted/30 text-[0.6rem] select-none">
                |
              </span>
            )}
            <button
              onClick={() => switchLocale(locale)}
              disabled={isPending || currentLocale === locale}
              className={cn(
                "text-[0.62rem] tracking-[0.18em] uppercase font-medium transition-colors duration-300",
                currentLocale === locale
                  ? "text-accent cursor-default"
                  : "text-text-muted hover:text-text-secondary",
              )}
            >
              {meta.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
