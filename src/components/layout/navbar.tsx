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
  const [menuOpen, setMenuOpen] = useState(false);

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
      {isHomepage && <div className="attila-nav-spacer" />}

      <nav
        className={cn(
          "attila-nav fixed left-0 right-0 z-[1000]",
          "bg-[#0f0f0f] border-b border-accent/8",
        )}
      >
        {/*
          Desktop: phone(auto-placed col1) | logo(auto-placed col2) | nav(col-start-3)
          Mobile:  logo(auto-placed col1)  | [col2 empty]           | burger(col-start-3)
                   phone is absolute-centered, out of grid flow on mobile
        */}
        <div className="relative h-full px-6 md:px-8 grid grid-cols-[1fr_auto_1fr] items-center">

          {/* ── PHONE desktop: first in-flow item → auto-placed at col 1 ── */}
          <a
            href="tel:+905313443090"
            className="hidden md:flex flex-col gap-0.5 group"
          >
            <span className="text-[0.5rem] tracking-[0.3em] uppercase text-accent/80 font-medium transition-colors duration-300 group-hover:text-accent">
              Bize Ulaşın
            </span>
            <span className="text-[0.78rem] tracking-[0.06em] text-text-secondary font-light transition-colors duration-300 group-hover:text-text-primary">
              +90 531 344 30 90
            </span>
          </a>

          {/* ── PHONE mobile: absolute center, out of grid flow ── */}
          <a
            href="tel:+905313443090"
            className="md:hidden absolute left-1/2 -translate-x-1/2 text-[0.62rem] tracking-[0.08em] text-text-secondary font-light transition-colors duration-300 hover:text-accent whitespace-nowrap"
          >
            +90 531 344 30 90
          </a>

          {/* ── LOGO: auto-placed at col 2 (desktop) / col 1 (mobile, only in-flow item left) ── */}
          <Link
            href="/"
            className="relative block h-9 md:h-14 w-[110px] md:w-[240px] justify-self-start md:justify-self-center"
          >
            <Image
              src="/logo-transparent.png"
              alt="Attila Homes"
              fill
              className="object-contain object-left md:object-center"
              priority
            />
          </Link>

          {/* ── RIGHT: nav links (desktop) + hamburger (mobile) — pinned to col 3 ── */}
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
