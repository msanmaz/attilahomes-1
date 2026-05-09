"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { NEIGHBORHOODS } from "@/lib/constants";
import type { City } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "", label: "Öne Çıkan" },
  { value: "price-low", label: "Fiyat: Düşükten Yükseğe" },
  { value: "price-high", label: "Fiyat: Yüksekten Düşüğe" },
  { value: "size", label: "En Büyük Önce" },
  { value: "beds", label: "En Çok Yatak Odası" },
];

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || "";
  const type = searchParams.get("type") || "";
  const neighborhood = searchParams.get("neighborhood") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const sort = searchParams.get("sort") || "";

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key === "city") params.delete("neighborhood");
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams],
  );

  const clearAll = () => router.push("/properties");

  const neighborhoods = city
    ? NEIGHBORHOODS[city as City] || []
    : [...NEIGHBORHOODS.Istanbul, ...NEIGHBORHOODS.Bodrum];

  const hasFilters = city || type || neighborhood || bedrooms;

  return (
    <div className="py-4 md:py-5 px-4 md:px-8 bg-bg-secondary border-b border-border sticky top-[calc(3.5rem+env(safe-area-inset-top))] md:top-[60px] z-50">
      <div className="flex items-center gap-3 flex-wrap">
        {/* City */}
        <div className="flex bg-bg-elevated border border-border overflow-hidden">
          {["", "Istanbul", "Bodrum"].map((c) => (
            <button
              key={c || "all"}
              onClick={() => setFilter("city", c)}
              className={cn(
                "px-5 py-[0.7rem] text-[0.72rem] tracking-[0.1em] uppercase font-body transition-all duration-300 cursor-pointer border-none",
                city === c
                  ? "bg-accent text-bg-primary"
                  : "bg-transparent text-text-secondary hover:text-text-primary",
              )}
            >
              {c || "Tümü"}
            </button>
          ))}
        </div>

        {/* Type — hidden on mobile (nav already has Satılık/Kiralık links) */}
        <div className="hidden md:flex bg-bg-elevated border border-border overflow-hidden">
          {[
            { v: "", l: "Tümü" },
            { v: "sale", l: "Satılık" },
            { v: "rent", l: "Kiralık" },
          ].map((t) => (
            <button
              key={t.v || "all"}
              onClick={() => setFilter("type", t.v)}
              className={cn(
                "px-5 py-[0.7rem] text-[0.72rem] tracking-[0.1em] uppercase font-body transition-all duration-300 cursor-pointer border-none",
                type === t.v
                  ? "bg-accent text-bg-primary"
                  : "bg-transparent text-text-secondary hover:text-text-primary",
              )}
            >
              {t.l}
            </button>
          ))}
        </div>

        {/* Neighborhood — hidden on mobile */}
        <select
          value={neighborhood}
          onChange={(e) => setFilter("neighborhood", e.target.value)}
          className="hidden md:block px-4 py-[0.7rem] bg-bg-elevated border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer outline-none transition-[border-color] duration-300 focus:border-accent appearance-none pr-8 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.7rem_center]"
        >
          <option value="">Tüm Semtler</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {/* Bedrooms + Sort: side by side on mobile, inline on desktop */}
        <div className="flex w-full md:w-auto md:contents gap-3">
          <select
            value={bedrooms}
            onChange={(e) => setFilter("bedrooms", e.target.value)}
            className="flex-1 md:flex-none px-4 py-[0.7rem] bg-bg-elevated border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer outline-none transition-[border-color] duration-300 focus:border-accent appearance-none pr-8 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.7rem_center]"
          >
            <option value="">Yatak Odası</option>
            <option value="1">1 Yatak Odası</option>
            <option value="2">2 Yatak Odası</option>
            <option value="3">3 Yatak Odası</option>
            <option value="4">4+ Yatak Odası</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setFilter("sort", e.target.value)}
            className="flex-1 md:flex-none px-4 py-[0.7rem] bg-bg-elevated border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer outline-none transition-[border-color] duration-300 focus:border-accent appearance-none pr-8 md:ml-auto bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.7rem_center]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="px-4 py-[0.7rem] bg-transparent border-none text-text-muted font-body text-[0.72rem] tracking-[0.05em] cursor-pointer transition-colors duration-300 hover:text-rose"
          >
            Tümünü Temizle
          </button>
        )}
      </div>
    </div>
  );
}
