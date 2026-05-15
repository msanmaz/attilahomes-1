import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-8 border-t border-border bg-bg-secondary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 mb-12">
        <div>
          <div className="relative h-10 w-[160px] mb-4">
            <Image
              src="/logo-transparent.png"
              alt="Attila Homes"
              fill
              className="object-contain object-left"
            />
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
          <FooterLink href="/about">Hakkımızda</FooterLink>
          <FooterLink href="/contact">İletişim</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
        </FooterCol>

        <FooterCol title="İletişim">
          <FooterLink href="mailto:info@attilahomes.com">info@attilahomes.com</FooterLink>
          <FooterLink href="tel:+905313443090">+90 531 344 30 90</FooterLink>
          <a
            href="https://www.instagram.com/attilahomes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.8rem] text-text-muted mt-1 transition-colors duration-300 hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
            @attilahomes
          </a>
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

