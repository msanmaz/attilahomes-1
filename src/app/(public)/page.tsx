import { Hero } from "@/components/home/hero";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { AboutSection } from "@/components/home/about-section";
import { NeighborhoodsGrid } from "@/components/home/neighborhoods-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <AboutSection />
      <NeighborhoodsGrid />
    </>
  );
}
