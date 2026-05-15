import { Suspense } from "react";
import type { Metadata } from "next";
import { getActiveProperties } from "@/lib/queries/properties";
import { PropertyFilters } from "@/components/property/property-filters";
import { ListingsView } from "@/components/property/listings-view";

export const metadata: Metadata = {
  title: "Mülkler",
  description:
    "İstanbul ve Bodrum'daki özenle seçilmiş mülkleri keşfedin. Şehir, tür, yatak odası ve fiyata göre filtreleyin.",
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function PropertiesPage({ params, searchParams }: Props) {
  await params; // locale available for future use
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
          Portföy
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light mb-2">
          Tüm Mülkler
        </h1>
        <p className="text-text-secondary text-[0.9rem] font-light">
          Özenle seçilmiş konut koleksiyonumuzu keşfedin
        </p>
      </div>

      <Suspense fallback={null}>
        <PropertyFilters />
      </Suspense>

      <ListingsView properties={filtered} total={filtered.length} />
    </>
  );
}
