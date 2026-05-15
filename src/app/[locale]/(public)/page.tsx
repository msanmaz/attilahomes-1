import { Hero } from "@/components/home/hero";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { AboutSection } from "@/components/home/about-section";
import { NeighborhoodsGrid } from "@/components/home/neighborhoods-grid";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale available for future use
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <AboutSection />
      <NeighborhoodsGrid />
    </>
  );
}
