"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";

const allImages = properties.flatMap((p) =>
  p.images.map((img) => ({
    ...img,
    propertyName: p.name,
    propertySlug: p.slug,
  })),
);

export default function MediaPage() {
  const [search, setSearch] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = search
    ? allImages.filter((img) =>
        img.propertyName.toLowerCase().includes(search.toLowerCase()),
      )
    : allImages;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-border w-[300px]">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-text-muted fill-none stroke-[1.5] shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search media…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-text-primary font-body text-[0.8rem] outline-none w-full placeholder:text-text-muted"
            />
          </div>
          <span className="text-[0.72rem] text-text-muted">
            {filtered.length} items
          </span>
        </div>
        <Button variant="primary" onClick={() => fileRef.current?.click()}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload
        </Button>
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {filtered.map((img) => (
          <div
            key={img.id}
            className="group relative aspect-square overflow-hidden border border-border cursor-pointer transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          >
            <Image
              src={img.url}
              alt={img.propertyName}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              style={{ transitionTimingFunction: "var(--ease-smooth)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,8,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <div className="text-[0.72rem] font-medium leading-tight mb-0.5 truncate">
                {img.propertyName}
              </div>
              <div className="text-[0.6rem] text-text-muted">
                {img.isCover ? "Cover image" : `Image ${img.sortOrder + 1}`}
              </div>
            </div>
            {img.isCover && (
              <div className="absolute top-2 left-2 px-1.5 py-0.5 text-[0.5rem] tracking-[0.1em] uppercase font-semibold bg-accent text-bg-primary">
                Cover
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
