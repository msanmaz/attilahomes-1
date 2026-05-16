"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useDictionary } from "@/components/providers/dictionary-provider";
import type { PropertyImage } from "@/lib/types";

type Props = {
  images: PropertyImage[];
  name: string;
};

export function PropertyGallery({ images, name }: Props) {
  const dict = useDictionary();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const open = (index: number) => setLightboxIndex(index);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex, images.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, prev, next]);

  useEffect(() => {
    if (lightboxIndex === null || !thumbStripRef.current) return;
    const activeThumb = thumbStripRef.current.children[lightboxIndex] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const toPreload = [lightboxIndex - 1, lightboxIndex + 1]
      .map(i => (i + images.length) % images.length)
      .filter(i => i !== lightboxIndex);
    toPreload.forEach(i => {
      const img = new window.Image();
      img.src = images[i].url;
    });
  }, [lightboxIndex, images]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-2 px-4 md:px-8 h-auto lg:h-[520px]">
        <div
          className="relative overflow-hidden group cursor-pointer h-[250px] md:h-[350px] lg:h-full"
          onClick={() => open(0)}
        >
          <Image
            src={images[0].url}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-800 group-hover:scale-[1.03]"
            style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-primary/60 backdrop-blur-sm px-4 py-2 text-[0.72rem] tracking-[0.1em] uppercase text-text-primary">
              {dict.propertyDetail.openGallery}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-2 h-[140px] md:h-[180px] lg:h-full">
          {images.slice(1, 3).map((img, i) => (
            <div
              key={img.id}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => open(i + 1)}
            >
              <Image
                src={img.url}
                alt={`${name} ${i + 2}`}
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover transition-transform duration-800 group-hover:scale-[1.05]"
                style={{ transitionTimingFunction: "var(--ease-smooth)" }}
              />
              {i === 1 && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-end p-4">
                  <div className="px-3 py-1.5 bg-bg-primary/70 backdrop-blur-[10px] text-[0.68rem] tracking-[0.1em]">
                    {images.length} {dict.propertyDetail.photos}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ animation: "lightbox-in 0.3s var(--ease-smooth)" }}
        >
          <div
            className="absolute inset-0 bg-bg-primary/95"
            onClick={close}
          />

          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
            <div className="text-[0.72rem] tracking-[0.15em] uppercase text-text-muted">
              <span className="text-text-primary font-medium">{lightboxIndex + 1}</span>
              {" / "}
              {images.length}
            </div>
            <button
              onClick={close}
              className="w-10 h-10 flex items-center justify-center border border-border hover:border-accent transition-colors cursor-pointer bg-transparent"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-text-secondary fill-none stroke-[1.5] hover:stroke-accent">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={lightboxIndex}
            src={images[lightboxIndex].url}
            alt={`${name} ${lightboxIndex + 1}`}
            className="relative max-w-[90vw] max-h-[80vh] object-contain z-[1]"
            style={{ animation: "lightbox-img 0.2s var(--ease-smooth)" }}
          />

          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-border hover:border-accent hover:bg-accent-muted transition-all cursor-pointer bg-bg-primary/50 backdrop-blur-sm z-10"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-text-secondary fill-none stroke-[1.5]">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-border hover:border-accent hover:bg-accent-muted transition-all cursor-pointer bg-bg-primary/50 backdrop-blur-sm z-10"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-text-secondary fill-none stroke-[1.5]">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {images.length > 1 && (
            <div
              ref={thumbStripRef}
              className="absolute bottom-6 left-8 right-8 flex gap-2 z-10 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setLightboxIndex(i)}
                  className={`relative w-16 h-11 overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${
                    i === lightboxIndex
                      ? "border-accent opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={`Thumbnail ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          <style jsx>{`
            @keyframes lightbox-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes lightbox-img {
              from { opacity: 0; transform: scale(0.97); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
