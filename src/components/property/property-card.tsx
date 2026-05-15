import Image from "next/image";
import type { PropertyWithImages } from "@/lib/types";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { LocaleLink } from "@/components/ui/locale-link";

type PropertyCardProps = {
  property: PropertyWithImages;
  dict: Dictionary["property"];
  locale: Locale;
};

export function PropertyCard({ property: p, dict, locale }: PropertyCardProps) {
  const coverImage = p.images.find((i) => i.isCover) || p.images[0];

  return (
    <LocaleLink
      href={`/properties/${p.slug}`}
      locale={locale}
      className="group bg-bg-card border border-border/40 overflow-hidden transition-all duration-500 hover:border-accent/15 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      style={{ transitionTimingFunction: "var(--ease-smooth)" }}
    >
      <div className="relative overflow-hidden aspect-[16/11]">
        {coverImage && (
          <Image
            src={coverImage.url}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-800 group-hover:scale-[1.06]"
            style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          />
        )}
        <div className="absolute top-3 left-3">
          <Badge variant={p.type === "sale" ? "sale" : "rent"}>
            {p.type === "sale" ? dict.sale : dict.rent}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted mb-1.5">
          {p.neighborhood}, {p.city}
        </div>
        <div className="font-display text-[1.3rem] font-normal mb-2.5 leading-tight">
          {p.name}
        </div>
        <div className="flex gap-4 mb-3">
          <span className="text-[0.7rem] text-text-secondary">{p.bedrooms} {dict.beds}</span>
          <span className="text-[0.7rem] text-text-secondary">{p.bathrooms} {dict.baths}</span>
          <span className="text-[0.7rem] text-text-secondary">{p.sqft.toLocaleString()} {dict.sqm}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <div className="font-display text-[1.2rem] text-accent font-medium">
            {p.priceDisplay}
            {p.priceNote && (
              <span className="font-body text-[0.65rem] text-text-muted font-normal ml-1">
                {p.priceNote}
              </span>
            )}
          </div>
          <div className="w-8 h-8 flex items-center justify-center border border-border/80 rounded-full transition-all duration-300 group-hover:border-accent group-hover:bg-accent-muted">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-text-secondary stroke-[1.5] transition-[stroke] duration-300 group-hover:stroke-accent">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}
