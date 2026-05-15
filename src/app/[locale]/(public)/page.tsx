import { Hero } from "@/components/home/hero";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { AboutSection } from "@/components/home/about-section";
import { NeighborhoodsGrid } from "@/components/home/neighborhoods-grid";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

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
      <FeaturedProperties dict={dict.featured} locale={locale} />
      <AboutSection dict={dict.about} locale={locale} />
      <NeighborhoodsGrid dict={dict.neighborhoods} locale={locale} />
    </>
  );
}
