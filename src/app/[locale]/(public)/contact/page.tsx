import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getCanonical, getHreflang } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Contact",
    description: "Contact Attila Utkucan for property enquiries in Istanbul and Bodrum.",
    openGraph: {
      images: [{ url: "/logo.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: getCanonical(locale as Locale, "/contact"),
      languages: getHreflang("/contact"),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="pt-32 pb-24 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
        <div>
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
            {dict.contactPage.eyebrow}
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light mb-6">
            {dict.contactPage.title}
          </h1>
          <p className="text-text-secondary leading-[1.8] font-light mb-10">
            {dict.contactPage.subtitle}
          </p>
          <div className="space-y-6">
            <ContactItem
              label={dict.contactPage.istanbulOffice}
              value="Yeşilköy Mah. Ahmet Taner Kışlalı Sk. No: 9/2 C Blok İç Kapı No: 1 Bakırköy/İstanbul"
              detail="+90 531 344 30 90"
            />
            <ContactItem
              label={dict.contactPage.bodrumOffice}
              value="Adnan Menderes Cad. 1708 Sokak İskender Evleri No:4 E Blok Daire: 3 Bodrum/Muğla"
              detail="+90 531 344 30 90"
            />
            <ContactItem label={dict.contactPage.emailLabel} value="info@attilahomes.com" />
            <ContactItem label={dict.contactPage.whatsappLabel} value="+90 531 344 30 90" />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

function ContactItem({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="pb-5 border-b border-border">
      <div className="text-[0.62rem] tracking-[0.2em] uppercase text-text-muted mb-1">{label}</div>
      <div className="text-[0.9rem] font-medium">{value}</div>
      {detail && <div className="text-[0.8rem] text-text-secondary mt-0.5">{detail}</div>}
    </div>
  );
}
