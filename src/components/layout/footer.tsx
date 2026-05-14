import Link from "next/link";

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-8 border-t border-border bg-bg-secondary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 mb-12">
        <div>
          <div className="font-display text-2xl font-light tracking-[0.2em] mb-4">
            ATTIL<span className="text-accent">A</span>
          </div>
          <p className="text-[0.8rem] text-text-muted leading-relaxed max-w-[300px]">
            İstanbul ve Bodrum yarımadasında özenle seçilmiş emlak. Her mülk
            Attila Utkucan ve ekibi tarafından bizzat değerlendirilir.
          </p>
        </div>

        <FooterCol title="Emlaklar">
          <FooterLink href="/properties?type=sale">Satılık</FooterLink>
          <FooterLink href="/properties?type=rent">Kiralık</FooterLink>
          <FooterLink href="/properties?city=Istanbul">İstanbul</FooterLink>
          <FooterLink href="/properties?city=Bodrum">Bodrum</FooterLink>
        </FooterCol>

        <FooterCol title="Şirket">
          <FooterLink href="/about">Attila Hakkında</FooterLink>
          <FooterLink href="#">Renovasyon Projeleri</FooterLink>
          <FooterLink href="#">Basın</FooterLink>
          <FooterLink href="#">İş Birlikleri</FooterLink>
        </FooterCol>

        <FooterCol title="İletişim">
          <FooterText>Yeşilköy Mah. Ahmet Taner Kışlalı Sk. No: 9/2 C Blok İç Kapı No: 1 Bakırköy/İstanbul</FooterText>
          <FooterText>Adnan Menderes Cad. 1708 Sokak İskender Evleri No:4 E Blok Daire: 3 Bodrum/Muğla</FooterText>
          <FooterLink href="mailto:info@attilahomes.com">info@attilahomes.com</FooterLink>
        </FooterCol>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border/60 gap-2">
        <p className="text-[0.7rem] text-text-muted">
          &copy; {new Date().getFullYear()} Attila Homes. Tüm hakları
          saklıdır.
        </p>
        <p className="text-[0.7rem] text-text-muted">
          Titizlikle tasarlandı
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-text-secondary mb-5 font-medium">
        {title}
      </h4>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block text-[0.8rem] text-text-muted mb-2.5 transition-colors duration-300 hover:text-accent"
    >
      {children}
    </Link>
  );
}

function FooterText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.75rem] text-text-muted mb-3 leading-relaxed">
      {children}
    </p>
  );
}
