import type { City } from "./types";

export const NEIGHBORHOODS: Record<City, string[]> = {
  Istanbul: [
    "Beşiktaş",
    "Kadıköy",
    "Nişantaşı",
    "Cihangir",
    "Galata",
    "Bebek",
    "Üsküdar",
  ],
  Bodrum: ["Yalıkavak", "Göltürkbükü", "Türkbükü", "Bodrum Center"],
};

export const NEIGHBORHOOD_COORDS: Record<
  string,
  { lat: number; lng: number }
> = {
  Beşiktaş: { lat: 41.0432, lng: 29.0056 },
  Kadıköy: { lat: 40.9823, lng: 29.0296 },
  Nişantaşı: { lat: 41.0487, lng: 28.9949 },
  Cihangir: { lat: 41.0322, lng: 28.9838 },
  Galata: { lat: 41.0256, lng: 28.9743 },
  Bebek: { lat: 41.0766, lng: 29.0434 },
  Üsküdar: { lat: 41.0232, lng: 29.0151 },
  Yalıkavak: { lat: 37.1036, lng: 27.2926 },
  Göltürkbükü: { lat: 37.0936, lng: 27.3826 },
  Türkbükü: { lat: 37.0956, lng: 27.3746 },
  "Bodrum Center": { lat: 37.0344, lng: 27.4305 },
};

export const SITE = {
  name: "ATTILA",
  tagline: "Curated Real Estate",
  description:
    "Handpicked properties across Istanbul's most sought-after neighborhoods and the Bodrum coastline. Curated by Attila Utkucan.",
  agent: {
    name: "Attila Utkucan",
    title: "Founder & Agent",
    initials: "AU",
  },
} as const;
