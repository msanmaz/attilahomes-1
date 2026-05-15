import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AboutSection() {
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

        {/* First paragraph with left accent rule */}
        <div className="flex gap-5 mb-8">
          <div className="w-px shrink-0 bg-accent/25 self-stretch mt-1" />
          <p className="text-text-secondary text-[1.05rem] leading-[1.9] font-light">
            İstanbul&apos;da kökleri olan, Bodrum ve İstanbul pazarlarına derin
            hakimiyetiyle tanınan bağımsız bir emlak danışmanı. Attila,
            itibarını potansiyeli sezme yeteneği üzerine inşa etmiştir —
            başkalarının eskimişlik gördüğü yerde değeri, yaşlanma gördüğü
            yerde karakteri keşfeder. Müşterileri ona dürüst rehberliği, yerel
            bilgisi ve bir mülkün ne olabileceğini gören keskin bakışı için
            güvenir.
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
          Danışmanlığın ötesinde Attila, İstanbul&apos;un eskiyen
          apartmanlarını çağdaş yaşam alanlarına dönüştürme konusunda
          uzmanlaşmış, sahada çalışan bir geliştiricidir. Tarihi
          semtlerdeki bakımsız binaları keşfetmekten renovasyonun her
          detayını bizzat yönetmeye kadar, vizyon ile gerçeklik arasındaki
          köprüyü kurar — mirasına sadık kalırken çağdaş standartları
          karşılayan evler sunar.
        </p>

        <Button variant="outline">Daha Fazla</Button>
      </div>
    </section>
  );
}
