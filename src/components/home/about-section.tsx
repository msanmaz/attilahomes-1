import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-16 items-center py-24 px-8 bg-bg-secondary border-t border-border">
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

      <div className="max-w-[600px]">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
          Hakkında
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light tracking-[0.15em] uppercase mb-6 leading-tight">
          Attila Utkucan
        </h2>
        <p className="text-text-secondary text-[0.9rem] leading-[1.8] font-light mb-4">
          İstanbul&apos;da kökleri olan, Bodrum ve İstanbul pazarlarına derin
          hakimiyetiyle tanınan bağımsız bir emlak danışmanı. Attila,
          itibarını potansiyeli sezme yeteneği üzerine inşa etmiştir —
          başkalarının eskimişlik gördüğü yerde değeri, yaşlanma gördüğü
          yerde karakteri keşfeder. Müşterileri ona dürüst rehberliği, yerel
          bilgisi ve bir mülkün ne olabileceğini gören keskin bakışı için
          güvenir.
        </p>
        <p className="text-text-secondary text-[0.9rem] leading-[1.8] font-light mb-6">
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
