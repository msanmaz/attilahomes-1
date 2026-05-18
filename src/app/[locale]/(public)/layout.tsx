import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ScrollContainer } from "@/components/layout/scroll-container";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Fixed elements outside the scroll container — they are always
          above the scroll layer and never affected by iOS compositor issues */}
      <Suspense>
        <Navbar />
      </Suspense>
      <WhatsAppButton />

      {/* All scrollable content lives inside this fixed container.
          The document itself never scrolls, so iOS Safari's compositor
          cannot place scroll content above the fixed navbar/fill bar. */}
      <ScrollContainer>
        <main>{children}</main>
        <Footer dict={dict.footer} locale={locale as Locale} />
      </ScrollContainer>
    </>
  );
}
