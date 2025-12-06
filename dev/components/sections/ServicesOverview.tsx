import { Drill, Hammer, Pickaxe, Truck, Building2 } from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants/company";

const serviceDetails = [
  {
    title: SERVICES[0], // Pre Split Drilling
    description: "Precision drilling solutions for controlled rock fragmentation, ensuring safe and efficient blasting operations in mining environments.",
    icon: <Drill className="h-6 w-6" />,
    href: "/services/pre-split-drilling"
  },
  {
    title: SERVICES[1], // Production Drilling
    description: "High-performance drilling services optimized for maximum productivity, utilizing state-of-the-art equipment and experienced operators.",
    icon: <Pickaxe className="h-6 w-6" />,
    href: "/services/production-drilling"
  },
  {
    title: SERVICES[2], // Reverse Circulation Drilling
    description: "Advanced RC drilling technology for accurate mineral exploration and grade control with minimal environmental impact.",
    icon: <Hammer className="h-6 w-6" />,
    href: "/services/reverse-circulation-drilling"
  },
  {
    title: SERVICES[3], // Load & Haul Operations
    description: "Comprehensive material handling services with modern fleet management, ensuring efficient transport and logistics operations.",
    icon: <Truck className="h-6 w-6" />,
    href: "/services/load-haul"
  },
  {
    title: SERVICES[4], // Construction Services
    description: "Full-scale mining infrastructure construction and civil works, delivered on time with the highest quality standards.",
    icon: <Building2 className="h-6 w-6" />,
    href: "/services/construction"
  }
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Our Core Services
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive mining support solutions tailored to meet the unique challenges 
            of the African mining industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceDetails.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
