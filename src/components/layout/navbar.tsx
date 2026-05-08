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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-600",
        scrolled
          ? "py-3 px-8 bg-bg-primary/92 backdrop-blur-[20px] border-b border-accent/8"
          : "py-6 px-8 bg-transparent",
      )}
      style={{ transitionTimingFunction: "var(--ease-smooth)" }}
    >
      <Link href="/" className="font-display text-[1.8rem] font-light tracking-[0.35em] uppercase text-text-primary">
        ATTIL<span className="text-accent">A</span>
      </Link>

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
    </nav>
  );
}
