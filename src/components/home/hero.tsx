import Image from "next/image";
import { LocaleLink } from "@/components/ui/locale-link";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/lib/i18n";

type HeroProps = {
  dict: Dictionary["hero"];
  locale: Locale;
};

export function Hero({ dict, locale }: HeroProps): React.ReactElement {
  return (
    <section className="h-[65vh] md:h-screen relative flex items-end px-6 md:px-8 pb-10 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Bodrum kıyıları"
          fill
          priority
          className="object-cover brightness-[0.35] saturate-[0.8] scale-105 animate-[hero-zoom_20s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />
      </div>

      <div className="relative z-10 max-w-[900px]">
        <div className="text-[0.7rem] tracking-[0.3em] uppercase text-accent font-medium mb-6 animate-[fade-up_0.8s_var(--ease-smooth)_0.3s_both]">
          {dict.location}
        </div>
        <h1 className="font-display text-[clamp(2rem,7vw,6.5rem)] font-light leading-[1.05] mb-4 md:mb-6 animate-[fade-up_1s_var(--ease-smooth)_0.5s_both]">
          {dict.headline1}
          <br />
          <em className="italic text-accent">{dict.headlineAccent}</em>{" "}
          {dict.headline2}
        </h1>
        <p className="text-base text-text-secondary max-w-[500px] leading-[1.7] font-light animate-[fade-up_0.8s_var(--ease-smooth)_0.7s_both]">
          {dict.subtext}
        </p>
        <div className="flex gap-4 mt-10 animate-[fade-up_0.8s_var(--ease-smooth)_0.9s_both]">
          <LocaleLink href="/properties" locale={locale}>
            <Button variant="primary" size="lg">
              {dict.cta}
            </Button>
          </LocaleLink>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-12 right-8 z-10 flex-col items-center gap-3 animate-[fade-up_0.8s_var(--ease-smooth)_1.2s_both]">
        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted [writing-mode:vertical-rl]">
          {dict.scroll}
        </span>
        <div className="w-px h-[60px] bg-gradient-to-b from-accent to-transparent animate-[scroll-pulse_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
