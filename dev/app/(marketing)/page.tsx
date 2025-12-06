import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { StatsSection } from "@/components/sections/StatsSection";
import { EquipmentShowcase } from "@/components/sections/EquipmentShowcase";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { CareersCTA } from "@/components/sections/CareersCTA";

export const metadata: Metadata = {
  title: "Yellow Power International | Mining Support Services in Africa",
  description: "Leading provider of comprehensive drilling and mining support services across Africa. Pre Split Drilling, Production Drilling, Reverse Circulation Drilling, Load & Haul Operations, and Construction Services. Established 2017 in Ghana.",
  keywords: [
    "mining support services",
    "drilling services Africa",
    "Yellow Power International",
    "Ghana mining services",
    "Pre Split Drilling",
    "Production Drilling",
    "Reverse Circulation Drilling",
    "Load and Haul Operations",
    "Mining Construction Services",
    "African mining industry"
  ],
  openGraph: {
    title: "Yellow Power International | Mining Support Services in Africa",
    description: "Leading provider of comprehensive drilling and mining support services across Africa since 2017.",
    type: "website",
    locale: "en_US",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <EquipmentShowcase />
      <ClientsSection />
      <WhyChooseUs />
      <NewsGrid />
      <CareersCTA />
    </main>
  );
}
