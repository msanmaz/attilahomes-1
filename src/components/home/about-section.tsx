import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LocaleLink } from "@/components/ui/locale-link";

type AboutSectionProps = {
  dict: Dictionary["about"];
  locale: Locale;
};

export function AboutSection({ dict, locale }: AboutSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-20 items-center py-28 px-8 bg-bg-secondary border-t border-border">
      <div className="relative overflow-hidden group">
        <Image
          src="/images/attila-portrait.jpg"
          alt="Attila Utkucan"
          width={600}
          height={800}
          className="w-full h-auto brightness-95 transition-transform duration-800 group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "var(--ease-smooth)" }}
        />
        <div className="absolute inset-0 border border-accent/10 pointer-events-none" />
      </div>

      <div className="max-w-[580px]">
        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="block w-8 h-px bg-accent/60" />
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-accent font-medium">
            {dict.eyebrow}
          </span>
        </div>

        {/* Name */}
        <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-light tracking-[0.12em] uppercase mb-10 leading-[1.1]">
          {dict.name}
        </h2>

        {/* First paragraph with left accent rule */}
        <div className="flex gap-5 mb-8">
          <div className="w-px shrink-0 bg-accent/25 self-stretch mt-1" />
          <p className="text-text-secondary text-[1.05rem] leading-[1.9] font-light">
            {dict.bio1}
          </p>
        </div>

        {/* Decorative ornament */}
        <div className="flex items-center gap-4 mb-8">
          <span className="block flex-1 h-px bg-border" />
          <span className="text-accent/40 text-[0.6rem] tracking-[0.4em] uppercase font-medium">✦</span>
          <span className="block flex-1 h-px bg-border" />
        </div>

        {/* Second paragraph */}
        <p className="text-text-secondary text-[1.05rem] leading-[1.9] font-light mb-10">
          {dict.bio2}
        </p>

        <LocaleLink href="/about" locale={locale}>
          <Button variant="outline">{dict.more}</Button>
        </LocaleLink>
      </div>
    </section>
  );
}
