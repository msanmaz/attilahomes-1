import type { Metadata } from "next";
import Image from "next/image";
import { LocaleLink } from "@/components/ui/locale-link";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "About — Attila Homes",
  description:
    "Istanbul's energy, Bodrum's exclusivity — under one roof. Discover Attila Homes' story and philosophy.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 bg-bg-secondary border-b border-border">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
          {dict.aboutPage.eyebrow}
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light mb-4 tracking-[0.05em]">
          Attila Homes
        </h1>
        <p className="font-display text-xl italic font-light text-accent/75 max-w-2xl leading-[1.6]">
          {dict.aboutPage.tagline}
        </p>
      </section>

      {/* Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-8 py-20">
        <div className="relative overflow-hidden aspect-[4/5]">
          <Image
            src="/attila-portrait.jpg"
            alt="Attila Utkucan"
            fill
            className="object-cover brightness-95"
          />
          <div className="absolute inset-0 border border-accent/10 pointer-events-none" />
        </div>
        <div className="flex flex-col justify-center max-w-lg">
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {dict.aboutPage.founderTitle}
          </div>
          <h2 className="font-display text-3xl font-light mb-6">
            Attila Utkucan
          </h2>
          <p className="text-text-secondary leading-[1.8] font-light mb-5">
            {dict.aboutPage.bio1}
          </p>
          <p className="text-text-secondary leading-[1.8] font-light mb-5">
            {dict.aboutPage.bio2}
          </p>
          <p className="text-text-secondary leading-[1.8] font-light mb-6">
            {dict.aboutPage.bio3}
          </p>
          <p className="text-accent/70 font-display italic text-[1.05rem] leading-[1.6] mb-6">
            {dict.aboutPage.quote}
          </p>
          <div className="mt-2">
            <LocaleLink
              href="/contact"
              locale={locale as Locale}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary text-[0.72rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:bg-accent-hover"
            >
              {dict.aboutPage.contactCta}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-8 py-16 bg-bg-secondary border-t border-border">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-8">
          {dict.aboutPage.contactInfoTitle}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-lg font-light mb-3">{dict.aboutPage.istanbulOffice}</h3>
            <p className="text-text-secondary text-[0.85rem] leading-[1.8]">
              Yeşilköy Mah. Ahmet Taner Kışlalı Sk.<br />
              No: 9/2 C Blok İç Kapı No: 1<br />
              Bakırköy / İstanbul
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-light mb-3">{dict.aboutPage.bodrumOffice}</h3>
            <p className="text-text-secondary text-[0.85rem] leading-[1.8]">
              Adnan Menderes Cad. 1708 Sokak<br />
              İskender Evleri No:4 E Blok Daire: 3<br />
              Bodrum / Muğla
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-light mb-3">{dict.aboutPage.reachUs}</h3>
            <div className="space-y-2">
              <a
                href="mailto:info@attilahomes.com"
                className="block text-text-secondary text-[0.85rem] transition-colors duration-300 hover:text-accent"
              >
                info@attilahomes.com
              </a>
              <a
                href="https://wa.me/905313443090"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-secondary text-[0.85rem] transition-colors duration-300 hover:text-accent"
              >
                +90 531 344 30 90
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
