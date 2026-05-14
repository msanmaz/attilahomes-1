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
        <div className={cn(
          "h-full px-6 md:px-8",
          /* Mobile: flex, logo left + hamburger right */
          "flex items-center justify-between",
          /* Desktop: 3-column grid so logo is always centred */
          "md:grid md:grid-cols-[1fr_auto_1fr]",
        )}>

          {/* ── LEFT: phone number ── */}
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

          {/* ── CENTER: logo ── */}
          <Link
            href="/"
            className="relative h-10 md:h-14 w-[160px] md:w-[240px] block md:justify-self-center"
          >
            <Image
              src="/logo-transparent.png"
              alt="Attila Homes"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* ── RIGHT: nav links ── */}
          <ul className="hidden md:flex items-center justify-end gap-8 list-none">
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

          {/* ── MOBILE: hamburger ── */}
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
