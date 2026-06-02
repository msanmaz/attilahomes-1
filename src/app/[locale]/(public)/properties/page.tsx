import { Suspense } from "react";
import type { Metadata } from "next";
import { getActiveProperties } from "@/lib/queries/properties";
import { PropertyFilters } from "@/components/property/property-filters";
import { ListingsView } from "@/components/property/listings-view";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getCanonical, getHreflang } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Properties",
    description:
      "Explore carefully curated properties in Istanbul and Bodrum. Filter by city, type, bedrooms and price.",
    openGraph: {
      images: [{ url: "/logo.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: getCanonical(locale as Locale, "/properties"),
      languages: getHreflang("/properties"),
    },
  };
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function PropertiesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const searchParamsResolved = await searchParams;
  const filtered = await getActiveProperties({
    city: searchParamsResolved.city,
    type: searchParamsResolved.type,
    neighborhood: searchParamsResolved.neighborhood,
    bedrooms: searchParamsResolved.bedrooms,
    sort: searchParamsResolved.sort,
  });

  return (
    <>
      <div className="pt-32 pb-12 px-8 bg-bg-secondary border-b border-border">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
          {dict.propertiesPage.eyebrow}
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light mb-2">
          {dict.propertiesPage.title}
        </h1>
        <p className="text-text-secondary text-[0.9rem] font-light">
          {dict.propertiesPage.subtitle}
        </p>
      </div>

      <Suspense fallback={null}>
        <PropertyFilters />
      </Suspense>

      <ListingsView properties={filtered} total={filtered.length} propertyDict={dict.property} locale={locale as Locale} />
    </>
  );
}
