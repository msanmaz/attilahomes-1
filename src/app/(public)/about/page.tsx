import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { StatsRibbon } from "@/components/home/stats-ribbon";

export const metadata: Metadata = {
  title: "Attila Utkucan Hakkında",
  description:
    "Attila Utkucan ile tanışın — İstanbul ve Bodrum pazarlarına derin hakimiyetiyle tanınan bağımsız bir emlak danışmanı.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 bg-bg-secondary">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
          Hakkında
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light mb-4 tracking-[0.1em] uppercase">
          Attila Utkucan
        </h1>
        <p className="text-text-secondary text-lg font-light max-w-2xl">
          İstanbul ve Bodrum&apos;da miras ile çağdaş yaşamı buluşturan
          bağımsız bir emlak danışmanı ve restorasyon uzmanı.
        </p>
      </section>

      {/* Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-8 py-20">
        <div className="relative overflow-hidden">
          <Image
            src="/images/attila-portrait.jpg"
            alt="Attila Utkucan"
            width={800}
            height={1000}
            className="w-full h-auto brightness-95"
          />
          <div className="absolute inset-0 border border-accent/10 pointer-events-none" />
        </div>
        <div className="flex flex-col justify-center max-w-lg">
          <h2 className="font-display text-3xl font-light mb-6">
            Başkalarının eskimişlik gördüğü yerde değeri keşfetmek
          </h2>
          <p className="text-text-secondary leading-[1.8] font-light mb-4">
            Attila, itibarını potansiyeli sezme yeteneği üzerine inşa
            etmiştir — başkalarının eskimişlik gördüğü yerde değeri,
            yaşlanma gördüğü yerde karakteri keşfeder. Müşterileri ona
            dürüst rehberliği, yerel bilgisi ve bir mülkün ne olabileceğini
            gören keskin bakışı için güvenir.
          </p>
          <p className="text-text-secondary leading-[1.8] font-light mb-4">
            Danışmanlığın ötesinde Attila, İstanbul&apos;un eskiyen
            apartmanlarını çağdaş yaşam alanlarına dönüştürme konusunda
            uzmanlaşmış, sahada çalışan bir geliştiricidir. Tarihi
            semtlerdeki bakımsız binaları keşfetmekten renovasyonun her
            detayını bizzat yönetmeye kadar, vizyon ile gerçeklik arasındaki
            köprüyü kurar.
          </p>
          <p className="text-text-secondary leading-[1.8] font-light mb-8">
            8 yılı aşkın deneyim ve 35 tamamlanmış renovasyon projesiyle
            Attila, mirasına sadık kalırken çağdaş standartları karşılayan
            evler sunar.
          </p>
          <div>
            <Button variant="primary">İletişime Geçin</Button>
          </div>
        </div>
      </section>

      <StatsRibbon />
    </>
  );
}
