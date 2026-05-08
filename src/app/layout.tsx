import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ATTILA HOMES",
    template: "%s — ATTILA Emlak",
  },
  description:
    "İstanbul'un en gözde semtleri ve Bodrum kıyılarından özenle seçilmiş mülkler. Attila Utkucan küratörlüğünde.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "ATTILA Emlak",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
