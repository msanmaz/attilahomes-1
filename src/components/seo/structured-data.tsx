import type { PropertyWithImages } from "@/lib/types";

// U+2028 (LINE SEPARATOR) and U+2029 (PARAGRAPH SEPARATOR) can break JSON
// embedded in <script> tags — avoid regex literals for them to prevent source
// encoding issues; use charCode references instead.
const LS = String.fromCharCode(0x2028);
const PS = String.fromCharCode(0x2029);

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .split(LS)
    .join("\\u2028")
    .split(PS)
    .join("\\u2029");
}

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
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}
