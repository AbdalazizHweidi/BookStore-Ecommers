import AboutSection from "../components/home/AboutSection";
import CategoryTiles from "../components/home/CategoryTiles";
import ClosingBand from "../components/home/ClosingBand";
import FeaturedBooksSection from "../components/home/FeaturedBooksSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import WeeklyDealSection from "../components/home/WeeklyDealSection";
import WhyReadersLoveSection from "../components/home/WhyReadersLoveSection";

// The sections are in the same order as Hairnic's home page.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryTiles />
      <AboutSection />
      <WeeklyDealSection />
      <WhyReadersLoveSection />
      <HowItWorksSection />
      <FeaturedBooksSection />
      <ClosingBand />
    </>
  );
}
