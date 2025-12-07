import type { Metadata } from "next";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { OverlapCards } from "@/components/sections/OverlapCards";
import { TripleFeatureCards } from "@/components/sections/TripleFeatureCards";
import { CEOMessage } from "@/components/sections/CEOMessage";
import { InfoCards } from "@/components/sections/InfoCards";
import { LatestNews } from "@/components/sections/LatestNews";
// Temporarily hidden sections - uncomment imports when sections are re-enabled
// import { ServicesOverview } from "@/components/sections/ServicesOverview";
// import { StatsSection } from "@/components/sections/StatsSection";
// import { EquipmentShowcase } from "@/components/sections/EquipmentShowcase";
// import { ClientsSection } from "@/components/sections/ClientsSection";
// import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
// import { CareersCTA } from "@/components/sections/CareersCTA";
import { NEWS_ARTICLES } from "@/lib/constants/news";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Leading Mining & Drilling Services in West Africa",
  description: "Yellow Power International provides comprehensive drilling, blasting, and mining support services across West Africa. Specialized in production drilling, pre-split drilling, load & haul operations, and construction services. Established 2017 in Ghana.",
  path: "/",
  type: "website",
});

export default function HomePage() {
  // Get latest 4 news articles for homepage
  const latestNews = NEWS_ARTICLES.slice(0, 4);

  return (
    <main>
      <HeroSlider />
      <OverlapCards />
      <TripleFeatureCards />
      <CEOMessage />
      <InfoCards />
      <LatestNews articles={latestNews} />
      {/* Temporarily hidden sections - coming soon */}
      {/* <ServicesOverview /> */}
      {/* <StatsSection /> */}
      {/* <EquipmentShowcase /> */}
      {/* <ClientsSection /> */}
      {/* <WhyChooseUs /> */}
      <div className="py-16 bg-gray-50">
        <div className="container">
          <NewsletterSignup />
        </div>
      </div>
      {/* <CareersCTA /> */}
    </main>
  );
}
