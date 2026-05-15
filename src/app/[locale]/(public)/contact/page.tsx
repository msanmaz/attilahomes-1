import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "İstanbul ve Bodrum'daki mülk sorularınız için Attila Utkucan ile iletişime geçin.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale available for future use
  return (
    <div className="pt-32 pb-24 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
        <div>
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
            İletişim
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light mb-6">
            İletişime Geçin
          </h1>
          <p className="text-text-secondary leading-[1.8] font-light mb-10">
            Satın alma, satış veya kiralama konusunda — ya da bir renovasyon
            projesi hakkında — Attila kişisel danışmanlık için hazırdır.
          </p>
          <div className="space-y-6">
            <ContactItem label="İstanbul Ofisi" value="Beşiktaş, İstanbul" detail="+90 531 344 30 90" />
            <ContactItem label="Bodrum Ofisi" value="Bodrum Merkez, Muğla" detail="+90 531 344 30 90" />
            <ContactItem label="E-posta" value="info@attilahomes.com" />
            <ContactItem label="WhatsApp" value="+90 531 344 30 90" />
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
