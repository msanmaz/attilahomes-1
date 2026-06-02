import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { AboutSection } from "@/components/home/about-section";
import { NeighborhoodsGrid } from "@/components/home/neighborhoods-grid";
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
    title: "Curated Real Estate in Istanbul & Bodrum",
    description:
      "Hand-picked luxury properties in Istanbul and Bodrum, selected by Attila Utkucan.",
    openGraph: {
      title: "Attila Homes — Istanbul & Bodrum Real Estate",
      description:
        "Hand-picked luxury properties in Istanbul and Bodrum, selected by Attila Utkucan.",
      images: [{ url: "/logo.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: getCanonical(locale as Locale, ""),
      languages: getHreflang(""),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.ReactElement> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero dict={dict.hero} locale={locale} />
      <FeaturedProperties dict={dict.featured} propertyDict={dict.property} locale={locale} />
      <AboutSection dict={dict.about} locale={locale} />
      <NeighborhoodsGrid dict={dict.neighborhoods} locale={locale} />
    </>
  );
}
