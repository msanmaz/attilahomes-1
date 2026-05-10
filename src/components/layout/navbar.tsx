"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "İlanlar", href: "/properties" },
  { label: "Satılık", href: "/properties?type=sale" },
  { label: "Kiralık", href: "/properties?type=rent" },
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
      {/* Spacer to push content below navbar on mobile (homepage only — other pages have their own pt) */}
      {isHomepage && <div className="h-[calc(3.5rem+env(safe-area-inset-top))] md:h-0" />}

      {/* Safe area background — always covers the notch/Dynamic Island area */}
      <div
        className="fixed top-0 left-0 right-0 z-[999] bg-[#0f0f0f] md:bg-transparent"
        style={{ height: "env(safe-area-inset-top, 0px)" }}
      />

      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-600",
          scrolled || menuOpen
            ? "bg-[#0f0f0f] md:bg-bg-primary/95 md:backdrop-blur-[20px] border-b border-accent/8"
            : isHomepage
              ? "bg-[#0f0f0f] md:bg-transparent md:backdrop-blur-none"
              : "bg-[#0f0f0f]",
        )}
        style={{
          transitionTimingFunction: "var(--ease-smooth)",
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className={cn(
          "flex items-center justify-between transition-all duration-600",
          scrolled ? "py-3 px-6 md:px-8" : "py-3 px-6 md:py-6 md:px-8",
        )}>
          <Link href="/" className="font-display text-[1.5rem] md:text-[1.8rem] font-light tracking-[0.35em] uppercase text-text-primary">
            ATTIL<span className="text-accent">A</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-10 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-[0.75rem] tracking-[0.15em] uppercase font-normal transition-colors duration-300",
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

          {/* Mobile hamburger */}
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

      {/* Mobile menu overlay */}
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
        </div>
      )}
    </>
  );
}
