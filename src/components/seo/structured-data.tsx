import type { PropertyWithImages } from "@/lib/types";

export function PropertyJsonLd({ property }: { property: PropertyWithImages }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.description,
    image: property.images.map((img) => img.url),
    address: {
      "@type": "PostalAddress",
      streetAddress: property.fullAddress,
      addressLocality: property.city,
      addressRegion: property.neighborhood,
      addressCountry: "TR",
    },
    ...(property.lat != null &&
      property.lng != null && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: property.lat,
          longitude: property.lng,
        },
      }),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
    },
    numberOfRooms: property.bedrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sqft,
      unitCode: "MTK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
