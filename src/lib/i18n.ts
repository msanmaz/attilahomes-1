export const LOCALES = ['tr', 'en', 'ru'] as const;
export const DEFAULT_LOCALE = 'tr';
export type Locale = (typeof LOCALES)[number];

export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

export async function getDictionary(locale: Locale) {
  return (await import(`@/messages/${locale}.json`)).default as Dictionary;
}

// Shape mirrors messages/*.json — update if keys change
export type Dictionary = {
  nav: {
    home: string;
    forSale: string;
    forRent: string;
    about: string;
    contact: string;
    callUs: string;
  };
  hero: {
    location: string;
    headline1: string;
    headlineAccent: string;
    headline2: string;
    subtext: string;
    cta: string;
    scroll: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    viewAll: string;
    empty: string;
  };
  about: {
    eyebrow: string;
    name: string;
    bio1: string;
    bio2: string;
    more: string;
  };
  neighborhoods: {
    eyebrow: string;
    title: string;
    istanbulSubtitle: string;
    bodrumSubtitle: string;
  };
  footer: {
    description: string;
    properties: string;
    forSale: string;
    forRent: string;
    company: string;
    about: string;
    contact: string;
    blog: string;
    contactSection: string;
    rights: string;
    crafted: string;
  };
  property: {
    sale: string;
    rent: string;
    beds: string;
    baths: string;
    sqm: string;
  };
};
