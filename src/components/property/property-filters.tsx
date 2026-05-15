"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { NEIGHBORHOODS } from "@/lib/constants";
import { useDictionary } from "@/components/providers/dictionary-provider";
import type { City } from "@/lib/types";

export function PropertyFilters() {
  const dict = useDictionary();
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || "";
  const type = searchParams.get("type") || "";
  const neighborhood = searchParams.get("neighborhood") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const sort = searchParams.get("sort") || "";

  const SORT_OPTIONS = [
    { value: "", label: dict.filters.sortFeatured },
    { value: "price-low", label: dict.filters.sortPriceLow },
    { value: "price-high", label: dict.filters.sortPriceHigh },
    { value: "size", label: dict.filters.sortSize },
    { value: "beds", label: dict.filters.sortBeds },
  ];

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
              {c || dict.filters.all}
            </button>
          ))}
        </div>

        {/* Type */}
        <div className="hidden md:flex bg-bg-elevated border border-border overflow-hidden">
          {[
            { v: "", l: dict.filters.all },
            { v: "sale", l: dict.property.sale },
            { v: "rent", l: dict.property.rent },
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

        {/* Neighborhood */}
        <select
          value={neighborhood}
          onChange={(e) => setFilter("neighborhood", e.target.value)}
          className="hidden md:block px-4 py-[0.7rem] bg-bg-elevated border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer outline-none transition-[border-color] duration-300 focus:border-accent appearance-none pr-8 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.7rem_center]"
        >
          <option value="">{dict.filters.allNeighborhoods}</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {/* Bedrooms + Sort */}
        <div className="flex w-full md:w-auto md:contents gap-3">
          <select
            value={bedrooms}
            onChange={(e) => setFilter("bedrooms", e.target.value)}
            className="flex-1 md:flex-none px-4 py-[0.7rem] bg-bg-elevated border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer outline-none transition-[border-color] duration-300 focus:border-accent appearance-none pr-8 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.7rem_center]"
          >
            <option value="">{dict.filters.allBedrooms}</option>
            <option value="1">{dict.filters.bed1}</option>
            <option value="2">{dict.filters.bed2}</option>
            <option value="3">{dict.filters.bed3}</option>
            <option value="4">{dict.filters.bed4}</option>
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
            {dict.filters.clearAll}
          </button>
        )}
      </div>
    </div>
  );
}
