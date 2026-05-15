import Image from "next/image";
import { getFeaturedProperties } from "@/lib/queries/properties";
import type { PropertyWithImages } from "@/lib/types";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LocaleLink } from "@/components/ui/locale-link";

type FeaturedPropertiesProps = {
  dict: Dictionary["featured"];
  locale: Locale;
};

export async function FeaturedProperties({ dict, locale }: FeaturedPropertiesProps) {
  const properties = await getFeaturedProperties(8);

  return (
    <section className="py-16 px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-[0.55rem] tracking-[0.3em] uppercase text-accent font-medium mb-1.5">
            {dict.eyebrow}
          </div>
          <div className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-light tracking-[0.06em] leading-none">
            {dict.title}
          </div>
        </div>

        <LocaleLink
          href="/properties"
          locale={locale}
          className="text-text-secondary text-[0.72rem] tracking-[0.15em] uppercase flex items-center gap-2 transition-colors duration-300 hover:text-accent group pb-0.5"
        >
          {dict.viewAll}
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-current stroke-[1.5] transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </LocaleLink>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-text-muted text-center py-12">
          {dict.empty}
        </p>
      )}
    </section>
  );
}

function PropertyCard({ property: p, locale }: { property: PropertyWithImages; locale: Locale }) {
  const coverImage = p.images.find((i) => i.isCover) || p.images[0];

  return (
    <LocaleLink
      href={`/properties/${p.slug}`}
      locale={locale}
      className="group relative aspect-[4/3] overflow-hidden border border-border/40 transition-all duration-500 hover:border-accent/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:z-10"
    >
      <div className="absolute inset-0 overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover brightness-[0.55] saturate-[0.8] transition-all duration-800 group-hover:scale-[1.08] group-hover:brightness-[0.4] group-hover:saturate-[0.9]"
          />
        ) : (
          <div className="w-full h-full bg-bg-elevated" />
        )}
      </div>

      <div
        className={`absolute top-3 left-3 px-2.5 py-1 text-[0.5rem] tracking-[0.15em] uppercase font-semibold z-10 ${
          p.type === "sale"
            ? "bg-accent text-bg-primary"
            : "bg-sage text-text-primary"
        }`}
      >
        {p.type === "sale" ? "Satılık" : "Kiralık"}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[rgba(10,10,8,0.92)] via-[rgba(10,10,8,0.6)] to-transparent z-10">
        <div className="text-[0.55rem] tracking-[0.2em] uppercase text-accent mb-1">
          {p.neighborhood}
        </div>
        <div className="font-display text-[1.15rem] font-normal mb-2 leading-tight">
          {p.name}
        </div>
        <div className="flex gap-3 mb-2">
          <span className="text-[0.65rem] text-text-secondary">{p.bedrooms} Yatak</span>
          <span className="text-[0.65rem] text-text-secondary">{p.bathrooms} Banyo</span>
          <span className="text-[0.65rem] text-text-secondary">{p.sqft.toLocaleString()} m²</span>
        </div>
        <div className="font-display text-[1.1rem] text-accent font-medium">
          {p.priceDisplay}
          {p.priceNote && (
            <span className="font-body text-[0.6rem] text-text-muted font-normal ml-1">
              {p.priceNote}
            </span>
          )}
        </div>
      </div>
    </LocaleLink>
  );
}
