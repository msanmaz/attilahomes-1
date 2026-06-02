import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PropertyJsonLd } from "@/components/seo/structured-data";
import { LocaleLink } from "@/components/ui/locale-link";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getPropertyBySlug } from "@/lib/queries/properties";
import { getCanonical, getHreflang } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyFeatures } from "@/components/property/property-features";
import { PropertySidebar } from "@/components/property/property-sidebar";
import { DetailMap } from "@/components/map/map-provider";
import type { NearbyIcon } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const property = await getPropertyBySlug(slug);
  const dict = isValidLocale(locale) ? await getDictionary(locale as Locale) : null;
  if (!property) return { title: dict?.propertyDetail.notFound ?? "Property Not Found" };
  return {
    title: property.name,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.name} — ATTILA`,
      description: property.description.slice(0, 160),
      images: property.images[0]
        ? [{ url: property.images[0].url, width: 1200, height: 630 }]
        : [],
    },
    alternates: {
      canonical: getCanonical(locale as Locale, `/properties/${slug}`),
      languages: getHreflang(`/properties/${slug}`),
    },
  };
}

const NEARBY_ICONS: Record<NearbyIcon, React.ReactNode> = {
  tree: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><path d="M12 22V8M5 12l7-8 7 8M7 16l5-6 5 6" /></svg>,
  anchor: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><circle cx="12" cy="5" r="3" /><path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" /></svg>,
  shop: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><path d="M3 9l1-4h16l1 4M3 9v11h18V9M9 21V13h6v8" /></svg>,
  train: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><rect x="4" y="3" width="16" height="16" rx="2" /><path d="M4 11h16M12 3v8" /></svg>,
  walk: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><circle cx="12" cy="5" r="2" /><path d="M10 22l3-8 4 2M10 13l-2 9M14 13l2-3-4-2-3 3" /></svg>,
  glass: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><path d="M8 21h8M12 15v6M5 3l1 9a6 6 0 0012 0l1-9" /></svg>,
  landmark: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><path d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-4h6v4" /></svg>,
};

export default async function PropertyDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const stats = [
    { value: property.bedrooms.toString(), label: dict.propertyDetail.bedroomsLabel },
    { value: property.bathrooms.toString(), label: dict.propertyDetail.bathroomsLabel },
    { value: property.sqft.toLocaleString(), label: dict.property.sqm },
    {
      value: property.type === "sale" ? dict.propertyDetail.deed : dict.propertyDetail.rental,
      label: dict.propertyDetail.ownershipLabel,
    },
  ];

  return (
    <div className="pt-20">
      <PropertyJsonLd property={property} />
      <LocaleLink
        href="/properties"
        locale={locale as Locale}
        className="inline-flex items-center gap-2 px-8 py-6 text-text-secondary text-[0.72rem] tracking-[0.1em] uppercase transition-colors duration-300 hover:text-accent"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {dict.propertyDetail.backToListings}
      </LocaleLink>

      <PropertyGallery images={property.images} name={property.name} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-12 p-8">
        <div>
          <div className="mb-2">
            <Badge variant={property.type === "sale" ? "sale" : "rent"}>
              {property.type === "sale" ? dict.property.sale : dict.property.rent}
            </Badge>
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light mb-1">
            {property.name}
          </h1>
          <div className="flex items-center gap-1.5 text-[0.8rem] text-text-secondary mb-8">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5]">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.fullAddress}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 bg-bg-secondary border border-border">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-medium">{s.value}</div>
                <div className="text-[0.62rem] tracking-[0.15em] uppercase text-text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <h3 className="font-display text-2xl font-normal mb-4">{dict.propertyDetail.aboutSection}</h3>
            <p className="text-text-secondary leading-[1.8] text-[0.9rem] font-light">{property.description}</p>
          </div>

          <PropertyFeatures features={property.features} heading={dict.propertyDetail.featuresSection} />

          {property.lat && property.lng && (
            <div className="mb-10">
              <h3 className="font-display text-2xl font-normal mb-4">{dict.propertyDetail.locationSection}</h3>
              <div className="h-[300px] border border-border">
                <DetailMap
                  lat={property.lat}
                  lng={property.lng}
                  name={property.name}
                  price={property.priceDisplay}
                />
              </div>
              <div className="flex items-center gap-2 mt-3 text-[0.8rem] text-text-secondary">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {property.fullAddress}
              </div>
            </div>
          )}

          {property.nearbyPlaces.length > 0 && (
            <div className="mb-10">
              <h3 className="font-display text-2xl font-normal mb-4">{dict.propertyDetail.nearbySection}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {property.nearbyPlaces.map((n) => (
                  <div key={n.id} className="flex items-center gap-2.5 p-3 bg-bg-secondary text-[0.75rem] text-text-secondary">
                    {NEARBY_ICONS[n.icon]}
                    {n.name}
                    <span className="ml-auto text-[0.65rem] text-text-muted">{n.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <PropertySidebar property={property} />
      </div>
    </div>
  );
}
