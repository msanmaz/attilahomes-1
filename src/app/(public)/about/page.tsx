import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda — Attila Homes",
  description:
    "Attila Utkucan ile tanışın — İstanbul ve Bodrum pazarlarına derin hakimiyetiyle tanınan bağımsız bir emlak danışmanı.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 bg-bg-secondary border-b border-border">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
          Hakkımızda
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light mb-4 tracking-[0.05em]">
          Attila Homes
        </h1>
        <p className="text-text-secondary text-lg font-light max-w-2xl">
          İstanbul ve Bodrum&apos;da miras ile çağdaş yaşamı buluşturan
          bağımsız bir emlak danışmanlığı ve restorasyon firması.
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
            Kurucu & Danışman
          </div>
          <h2 className="font-display text-3xl font-light mb-6">
            Attila Utkucan
          </h2>
          <p className="text-text-secondary leading-[1.8] font-light mb-4">
            İstanbul&apos;da kökleri olan, Bodrum ve İstanbul pazarlarına
            derin hakimiyetiyle tanınan bağımsız bir emlak danışmanı. Attila,
            itibarını potansiyeli sezme yeteneği üzerine inşa etmiştir —
            başkalarının eskimişlik gördüğü yerde değeri, yaşlanma gördüğü
            yerde karakteri keşfeder. Müşterileri ona dürüst rehberliği, yerel
            bilgisi ve bir mülkün ne olabileceğini gören keskin bakışı için
            güvenir.
          </p>
          <p className="text-text-secondary leading-[1.8] font-light mb-4">
            Danışmanlığın ötesinde Attila, İstanbul&apos;un eskiyen
            apartmanlarını çağdaş yaşam alanlarına dönüştürme konusunda
            uzmanlaşmış, sahada çalışan bir geliştiricidir. Tarihi
            semtlerdeki bakımsız binaları keşfetmekten renovasyonun her
            detayını bizzat yönetmeye kadar, vizyon ile gerçeklik arasındaki
            köprüyü kurar — mirasına sadık kalırken çağdaş standartları
            karşılayan evler sunar.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary text-[0.72rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:bg-accent-hover"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-8 py-16 bg-bg-secondary border-t border-border">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-8">
          İletişim Bilgileri
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-lg font-light mb-3">İstanbul Ofisi</h3>
            <p className="text-text-secondary text-[0.85rem] leading-[1.8]">
              Yeşilköy Mah. Ahmet Taner Kışlalı Sk.<br />
              No: 9/2 C Blok İç Kapı No: 1<br />
              Bakırköy / İstanbul
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-light mb-3">Bodrum Ofisi</h3>
            <p className="text-text-secondary text-[0.85rem] leading-[1.8]">
              Adnan Menderes Cad. 1708 Sokak<br />
              İskender Evleri No:4 E Blok Daire: 3<br />
              Bodrum / Muğla
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-light mb-3">Ulaşın</h3>
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
