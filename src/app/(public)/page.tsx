import { Hero } from "@/components/home/hero";
import { StatsRibbon } from "@/components/home/stats-ribbon";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { AboutSection } from "@/components/home/about-section";
import { NeighborhoodsGrid } from "@/components/home/neighborhoods-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsRibbon />
      <FeaturedProperties />
      <AboutSection />
      <NeighborhoodsGrid />
    </>
  );
}
