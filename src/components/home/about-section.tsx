import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/lib/i18n";

type AboutSectionProps = {
  dict: Dictionary["about"];
  locale: Locale;
};

export function AboutSection({ dict: _dict, locale: _locale }: AboutSectionProps) {
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
            Hakkında
          </span>
        </div>

        {/* Name */}
        <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-light tracking-[0.12em] uppercase mb-10 leading-[1.1]">
          Attila Utkucan
        </h2>

        {/* Tagline */}
        <p className="font-display text-[1.15rem] italic font-light text-accent/80 leading-[1.6] mb-8 tracking-[0.02em]">
          İstanbul&apos;un enerjisi, Bodrum&apos;un ayrıcalığı —<br />
          tek bir çatı altında.
        </p>

        {/* First paragraph with left accent rule */}
        <div className="flex gap-5 mb-8">
          <div className="w-px shrink-0 bg-accent/25 self-stretch mt-1" />
          <p className="text-text-secondary text-[1.05rem] leading-[1.9] font-light">
            Attila Utkucan, İstanbul&apos;da büyüdü; her yaz Bodrum&apos;da
            geçirdi. Her iki şehirde de küçüklüğünden beri inşaat ve
            gayrimenkul dünyasının içinde olan biri olarak, bu iki kentin
            sadece coğrafyasını değil, ruhunu da tanıyor. Attila Homes, bu
            kişisel hikayeden doğan bir marka.
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
          Gayrimenkulü bir satış kalemi olarak değil, yaşam tarzı ve
          stratejik yatırım olarak değerlendiriyoruz. Bu yüzden standart
          bir satış süreci değil, kişiselleştirilmiş ve sonuç odaklı bir
          deneyim sunuyoruz.
        </p>

        <Button variant="outline">Daha Fazla</Button>
      </div>
    </section>
  );
}
