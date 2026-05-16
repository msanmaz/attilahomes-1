export const LOCALES = ['tr', 'en', 'ru'] as const;
export const DEFAULT_LOCALE: Locale = 'tr';
export type Locale = (typeof LOCALES)[number];

export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
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
    moreLabel: string;
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
  propertiesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  filters: {
    all: string;
    allNeighborhoods: string;
    allBedrooms: string;
    bed1: string;
    bed2: string;
    bed3: string;
    bed4: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortSize: string;
    sortBeds: string;
    clearAll: string;
  };
  propertyDetail: {
    backToListings: string;
    bedroomsLabel: string;
    bathroomsLabel: string;
    ownershipLabel: string;
    deed: string;
    rental: string;
    aboutSection: string;
    locationSection: string;
    nearbySection: string;
    featuresSection: string;
    openGallery: string;
    photos: string;
    notFound: string;
  };
  sidebar: {
    scheduleViewing: string;
    applyNow: string;
    requestInfo: string;
    monthlyFurnished: string;
    askingPrice: string;
  };
  sheet: {
    viewingTitle: string;
    viewingSubtitle: string;
    infoTitle: string;
    infoSubtitle: string;
    close: string;
    fullName: string;
    email: string;
    phone: string;
    preferredDate: string;
    timeSlot: string;
    selectTime: string;
    morning: string;
    afternoon: string;
    evening: string;
    messageOptional: string;
    viewingNotes: string;
    infoQuestion: string;
    sending: string;
    submitViewing: string;
    submitInfo: string;
    submitted: string;
    confirmBefore: string;
    confirmAfter: string;
    error: string;
    privacyNote: string;
  };
  contactForm: {
    title: string;
    fullName: string;
    email: string;
    phone: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    send: string;
    disclaimer: string;
    thankYou: string;
    sentMessage: string;
    anotherMessage: string;
    error: string;
  };
  aboutPage: {
    eyebrow: string;
    tagline: string;
    founderTitle: string;
    bio1: string;
    bio2: string;
    bio3: string;
    quote: string;
    contactCta: string;
    contactInfoTitle: string;
    istanbulOffice: string;
    bodrumOffice: string;
    reachUs: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    istanbulOffice: string;
    bodrumOffice: string;
    emailLabel: string;
    whatsappLabel: string;
  };
};
