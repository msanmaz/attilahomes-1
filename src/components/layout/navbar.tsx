"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Satılık", href: "/properties?type=sale" },
  { label: "Kiralık", href: "/properties?type=rent" },
  { label: "Hakkımızda", href: "/about" },
  { label: "İletişim", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    const [path, query] = href.split("?");
    if (!pathname.startsWith(path)) return false;
    if (query) {
      const params = new URLSearchParams(query);
      for (const [key, value] of params) {
        if (searchParams.get(key) !== value) return false;
      }
      return true;
    }
    return !searchParams.get("type");
  }

  const isHomepage = pathname === "/";

  return (
    <>
      {isHomepage && <div className="attila-nav-spacer md:h-0" />}

      <nav
        className={cn(
          "attila-nav fixed left-0 right-0 z-[1000]",
          scrolled || menuOpen
            ? "bg-[#0f0f0f] md:bg-bg-primary/95 md:backdrop-blur-[20px] border-b border-accent/8"
            : isHomepage
              ? "bg-[#0f0f0f] md:bg-transparent md:backdrop-blur-none"
              : "bg-[#0f0f0f]",
        )}
      >
        {/*
          Same 3-col grid at all sizes.
          Mobile:  col1=logo  col2=phone(center)  col3=burger
          Desktop: col1=phone col2=logo(center)   col3=nav-links
        */}
        <div className="h-full px-6 md:px-8 grid grid-cols-[1fr_auto_1fr] items-center">

          {/* ── LOGO: col-1 on mobile → col-2 on desktop ── */}
          <Link
            href="/"
            className={cn(
              "relative block",
              "col-start-1 h-9 w-[110px] justify-self-start",
              "md:col-start-2 md:h-14 md:w-[240px] md:justify-self-center",
            )}
          >
            <Image
              src="/logo-transparent.png"
              alt="Attila Homes"
              fill
              className="object-contain object-left md:object-center"
              priority
            />
          </Link>

          {/* ── PHONE: col-2 center on mobile → col-1 left on desktop ── */}
          <a
            href="tel:+905313443090"
            className={cn(
              "flex flex-col items-center gap-0 group",
              "col-start-2 justify-self-center",
              "md:col-start-1 md:items-start md:gap-0.5",
            )}
          >
            <span className="hidden md:block text-[0.5rem] tracking-[0.3em] uppercase text-accent/80 font-medium transition-colors duration-300 group-hover:text-accent">
              Bize Ulaşın
            </span>
            <span className="text-[0.62rem] md:text-[0.78rem] tracking-[0.06em] text-text-secondary font-light transition-colors duration-300 group-hover:text-text-primary">
              +90 531 344 30 90
            </span>
          </a>

          {/* ── RIGHT: nav links (desktop) + hamburger (mobile) — always col-3 ── */}
          <div className="col-start-3 flex items-center justify-end">
            <ul className="hidden md:flex items-center gap-8 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-[0.68rem] tracking-[0.15em] uppercase font-normal transition-colors duration-300",
                      "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-accent after:transition-[width] after:duration-400",
                      isActive(link.href)
                        ? "text-accent after:w-full"
                        : "text-text-secondary hover:text-accent hover:after:w-full",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer bg-transparent border-none"
              aria-label="Menü"
            >
              <span className={cn("block w-5 h-px bg-text-primary transition-all duration-300", menuOpen && "translate-y-[3.5px] rotate-45")} />
              <span className={cn("block w-5 h-px bg-text-primary transition-all duration-300", menuOpen && "opacity-0")} />
              <span className={cn("block w-5 h-px bg-text-primary transition-all duration-300", menuOpen && "-translate-y-[3.5px] -rotate-45")} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-bg-primary/98 backdrop-blur-[30px] flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "font-display text-[1.8rem] font-light tracking-[0.2em] uppercase transition-colors duration-300",
                isActive(link.href) ? "text-accent" : "text-text-secondary",
              )}
              style={{ animation: `fade-up 0.4s var(--ease-smooth) ${i * 0.08}s both` }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+905313443090"
            className="mt-4 text-[0.72rem] tracking-[0.15em] text-text-muted"
            style={{ animation: `fade-up 0.4s var(--ease-smooth) ${NAV_LINKS.length * 0.08}s both` }}
          >
            +90 531 344 30 90
          </a>
        </div>
      )}
    </>
  );
}
