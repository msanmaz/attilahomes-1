"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { PropertyWithImages } from "@/lib/types";
import { PropertyCard } from "@/components/property/property-card";
import { ListingsMap } from "@/components/map/map-provider";

type Props = {
  properties: PropertyWithImages[];
  total: number;
};

export function ListingsView({ properties, total }: Props) {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const router = useRouter();

  const goToProperty = useCallback(
    (slug: string) => router.push(`/properties/${slug}`),
    [router],
  );

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-8 pt-6">
        <div className="text-[0.72rem] text-text-muted tracking-[0.1em] uppercase">
          Gösterilen{" "}
          <strong className="text-text-primary font-medium">{properties.length}</strong>
          {" / "}{total} mülk
        </div>
        <div className="flex bg-bg-elevated border border-border overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex items-center justify-center w-10 h-9 transition-all duration-300 cursor-pointer border-none",
              viewMode === "grid" ? "bg-accent" : "bg-transparent hover:bg-accent-dim",
            )}
          >
            <svg viewBox="0 0 24 24" className={cn("w-4 h-4 fill-none stroke-[1.5]", viewMode === "grid" ? "stroke-bg-primary" : "stroke-text-muted")}>
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={cn(
              "flex items-center justify-center w-10 h-9 transition-all duration-300 cursor-pointer border-none border-l border-border",
              viewMode === "map" ? "bg-accent" : "bg-transparent hover:bg-accent-dim",
            )}
          >
            <svg viewBox="0 0 24 24" className={cn("w-4 h-4 fill-none stroke-[1.5]", viewMode === "map" ? "stroke-bg-primary" : "stroke-text-muted")}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-8 pb-24">
          {properties.length > 0 ? (
            properties.map((p) => <PropertyCard key={p.id} property={p} />)
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="font-display text-2xl mb-2">Kriterlerinize uygun mülk bulunamadı</p>
              <p className="text-text-muted text-[0.85rem]">Daha fazla sonuç görmek için filtrelerinizi ayarlayın</p>
            </div>
          )}
        </div>
      )}

      {/* Map Mode */}
      {viewMode === "map" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100dvh-200px)]">
          {/* List panel — hidden on mobile */}
          <div className="hidden lg:block overflow-y-auto p-4 order-1">
            <div className="flex flex-col gap-3">
              {properties.map((p) => (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "transition-all duration-300 border",
                    hoveredId === p.id
                      ? "border-accent shadow-[0_0_0_1px_var(--color-accent),0_8px_30px_rgba(200,165,92,0.15)]"
                      : "border-transparent",
                  )}
                >
                  <PropertyCard property={p} />
                </div>
              ))}
            </div>
          </div>
          {/* Map panel — full width on mobile */}
          <div className="lg:border-l border-border order-1 lg:order-2 h-[calc(100dvh-280px)] lg:h-full">
            <ListingsMap
              properties={properties}
              hoveredId={hoveredId}
              onMarkerClick={goToProperty}
              onMarkerHover={setHoveredId}
              onMarkerLeave={() => setHoveredId(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
