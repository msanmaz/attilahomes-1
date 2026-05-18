import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale, LOCALES } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { DictionaryProvider } from "@/components/providers/dictionary-provider";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f0f0f" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Attila Homes",
    template: "%s — Attila Homes",
  },
  description:
    "Curated real estate in Istanbul and Bodrum. Selected by Attila Utkucan.",
  openGraph: {
    type: "website",
    siteName: "Attila Homes",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.ReactElement> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const dictionary = await getDictionary(locale as Locale);

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${outfit.variable}`}
    >
      <body>
        {/* Fills the Dynamic Island / notch zone with nav color on all browsers.
            Inline style so it applies before any stylesheet is parsed. */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "env(safe-area-inset-top, 0px)",
            backgroundColor: "#0f0f0f",
            zIndex: 1001,
            pointerEvents: "none",
          }}
        />
        <DictionaryProvider dictionary={dictionary}>
          {children}
        </DictionaryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
