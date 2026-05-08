"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { PropertyWithImages } from "@/lib/types";
import { deleteProperty, updateProperty } from "@/lib/actions/property-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  properties: PropertyWithImages[];
};

export function PropertiesTable({ properties }: Props) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [togglingFeatured, setTogglingFeatured] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleToggleFeatured(id: string, currentValue: boolean) {
    setTogglingFeatured(id);
    try {
      await updateProperty(id, { featured: !currentValue });
      startTransition(() => router.refresh());
    } catch (err) {
      alert("Failed: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setTogglingFeatured(null);
    }
  }

  const filtered = useMemo(() => {
    let result = [...properties];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q),
      );
    }
    if (typeFilter !== "all") result = result.filter((p) => p.type === typeFilter);
    return result;
  }, [properties, search, typeFilter]);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteProperty(id);
      startTransition(() => router.refresh());
      window.dispatchEvent(new Event("sidebar-refresh"));
    } catch (err) {
      alert("Failed to delete: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-[0.82rem] text-text-muted">
          Manage your property portfolio
        </p>
        <Link href="/dashboard/properties/new">
          <Button variant="primary">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Property
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-border flex-1 max-w-[350px]">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-text-muted fill-none stroke-[1.5] shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none text-text-primary font-body text-[0.8rem] outline-none w-full placeholder:text-text-muted"
          />
        </div>
        <button
          onClick={() => {
            const types = ["all", "sale", "rent"];
            setTypeFilter(types[(types.indexOf(typeFilter) + 1) % types.length]);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.5]">
            <path d="M3 6h18M6 12h12M9 18h6" />
          </svg>
          {typeFilter === "all" ? "All Types" : typeFilter === "sale" ? "For Sale" : "For Rent"}
        </button>
      </div>

      <div className="bg-bg-card border border-border overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-bg-secondary">
              {["Property", "Location", "Type", "Price", "Featured", "Status", "Views", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[0.6rem] tracking-[0.2em] uppercase text-text-muted font-medium border-b border-border whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const cover = p.images.find((i) => i.isCover) || p.images[0];
              return (
                <tr key={p.id} className="transition-colors duration-200 hover:bg-accent-dim border-b border-border last:border-b-0">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {cover && (
                        <Image src={cover.url} alt={p.name} width={64} height={44} className="object-cover border border-border shrink-0" />
                      )}
                      <div>
                        <div className="text-[0.82rem] font-medium leading-tight">{p.name}</div>
                        <div className="text-[0.68rem] text-text-muted">{p.neighborhood}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[0.82rem] text-text-secondary">{p.city}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={p.type === "sale" ? "sale" : "rent"}>
                      {p.type === "sale" ? "Sale" : "Rent"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 font-display text-[1.05rem] text-accent font-medium">{p.priceDisplay}</td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => handleToggleFeatured(p.id, p.featured)}
                      disabled={togglingFeatured === p.id}
                      className={`w-7 h-7 flex items-center justify-center border transition-all duration-250 cursor-pointer bg-transparent ${
                        p.featured
                          ? "border-accent bg-accent-muted"
                          : "border-border hover:border-accent/50"
                      } disabled:opacity-50`}
                      title={p.featured ? "Remove from featured" : "Add to featured"}
                    >
                      <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 stroke-[1.5] ${p.featured ? "fill-accent stroke-accent" : "fill-none stroke-text-muted"}`}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={p.status as "active" | "draft" | "sold" | "rented"}>{p.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-[0.82rem] text-text-secondary">{p.views.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <Link
                        href={`/dashboard/properties/${p.id}/edit`}
                        className="w-[30px] h-[30px] flex items-center justify-center border border-transparent transition-all duration-250 hover:border-border-hover hover:bg-bg-elevated"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-text-muted fill-none stroke-[1.5]">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/properties/${p.slug}`}
                        target="_blank"
                        className="w-[30px] h-[30px] flex items-center justify-center border border-transparent transition-all duration-250 hover:border-border-hover hover:bg-bg-elevated"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-text-muted fill-none stroke-[1.5]">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleting === p.id || isPending}
                        className="w-[30px] h-[30px] flex items-center justify-center border border-transparent transition-all duration-250 hover:border-rose-muted hover:bg-rose-muted cursor-pointer bg-transparent disabled:opacity-50"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-text-muted fill-none stroke-[1.5] hover:stroke-rose">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-text-muted text-sm">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-5 py-4 border-t border-border">
          <span className="text-[0.72rem] text-text-muted">
            Showing {filtered.length} of {properties.length} properties
          </span>
        </div>
      </div>
    </div>
  );
}
