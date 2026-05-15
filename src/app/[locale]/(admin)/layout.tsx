"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type SidebarLink = {
  label: string;
  href: string;
  icon: string;
  badgeKey?: "properties" | "media";
};

const SIDEBAR_LINKS: { section: string; links: SidebarLink[] }[] = [
  {
    section: "Main",
    links: [
      { label: "Dashboard", href: "/dashboard", icon: "grid" },
      { label: "Properties", href: "/dashboard/properties", icon: "home", badgeKey: "properties" },
      { label: "Add Property", href: "/dashboard/properties/new", icon: "plus" },
      { label: "Media Library", href: "/dashboard/media", icon: "image", badgeKey: "media" },
    ],
  },
  {
    section: "Settings",
    links: [
      { label: "Settings", href: "/dashboard/settings", icon: "settings" },
    ],
  },
];

const ICONS: Record<string, React.ReactNode> = {
  grid: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.5]"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
  home: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.5]"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  plus: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.5]"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>,
  image: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.5]"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
  settings: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.5]"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchCounts() {
      const supabase = createClient();
      const [propsRes, imagesRes] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("property_images").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        properties: propsRes.count ?? 0,
        media: imagesRes.count ?? 0,
      });
    }
    fetchCounts();

    window.addEventListener("sidebar-refresh", fetchCounts);
    return () => window.removeEventListener("sidebar-refresh", fetchCounts);
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[260px] min-h-screen bg-bg-secondary border-r border-border fixed top-0 left-0 z-50 flex flex-col">
        <div className="px-6 py-7 border-b border-border flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-2xl font-light tracking-[0.3em] uppercase"
          >
            ATTIL<span className="text-accent">A</span>
          </Link>
          <span className="px-2 py-0.5 text-[0.55rem] tracking-[0.12em] uppercase font-semibold bg-accent-muted text-accent border border-accent/20">
            Admin
          </span>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {SIDEBAR_LINKS.map((group) => (
            <div key={group.section}>
              <div className="px-6 pt-3 pb-2 text-[0.58rem] tracking-[0.25em] uppercase text-text-muted font-medium">
                {group.section}
              </div>
              {group.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-6 py-[0.7rem] text-[0.82rem] font-normal transition-all duration-250 relative",
                      active
                        ? "text-accent bg-accent-muted before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-accent"
                        : "text-text-secondary hover:text-text-primary hover:bg-accent-dim",
                    )}
                  >
                    {ICONS[link.icon]}
                    {link.label}
                    {link.badgeKey && counts[link.badgeKey] !== undefined && (
                      <span className="ml-auto px-2 py-0.5 text-[0.6rem] font-semibold bg-accent text-bg-primary rounded-full min-w-[20px] text-center">
                        {counts[link.badgeKey]}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-accent-muted flex items-center justify-center font-display text-accent text-[0.9rem] shrink-0">
              AU
            </div>
            <div>
              <div className="text-[0.82rem] font-medium">Attila Utkucan</div>
              <div className="text-[0.65rem] text-text-muted">Administrator</div>
            </div>
          </div>
          <button
            onClick={async () => {
              const { signOut } = await import("@/lib/actions/auth-actions");
              await signOut();
            }}
            className="w-full text-left px-3 py-2 text-[0.72rem] text-text-muted hover:text-rose transition-colors cursor-pointer bg-transparent border-none font-body"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-[260px] min-h-screen">
        <div className="sticky top-0 z-40 px-8 py-4 bg-bg-primary/85 backdrop-blur-[20px] border-b border-border flex items-center justify-between">
          <h1 className="font-display text-[1.6rem] font-normal">
            {pathname === "/dashboard" && "Dashboard"}
            {pathname === "/dashboard/properties" && "Properties"}
            {pathname === "/dashboard/properties/new" && "Add Property"}
            {pathname.includes("/edit") && "Edit Property"}
            {pathname === "/dashboard/media" && "Media Library"}
            {pathname === "/dashboard/settings" && "Settings"}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border w-[280px]">
              <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-text-muted fill-none stroke-[1.5] shrink-0">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search properties, media…"
                className="bg-transparent border-none text-text-primary font-body text-[0.8rem] outline-none w-full placeholder:text-text-muted"
              />
            </div>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
