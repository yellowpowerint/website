"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureCard {
  image: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const features: FeatureCard[] = [
  {
    image: "/images/home-cards/what-we-deliver.jpg",
    title: "What We Deliver",
    description: "Comprehensive drilling, blasting, and mining support services. From pre-split drilling to load & haul operations, we provide end-to-end solutions that power Africa's mining industry.",
    link: "/services",
    linkText: "Explore Our Services"
  },
  {
    image: "/images/home-cards/where-we-operate.jpg",
    title: "Where We Operate",
    description: "Operating across 4 African countries (Ghana, Côte d'Ivoire, Mali, Burkina Faso) and Canada, with our headquarters in Madina, Greater Accra, Ghana. We bring world-class mining support services to West Africa's most dynamic mining regions.",
    link: "/about/global-presence",
    linkText: "View Our Locations"
  },
  {
    image: "/images/home-cards/join-our-team.jpg",
    title: "Join Our Team",
    description: "Building careers in mining excellence since 2017. With over 200 employees, we offer opportunities for growth, professional development, and a commitment to safety first, always.",
    link: "/careers",
    linkText: "Explore Career Opportunities"
  }
];

export function TripleFeatureCards() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: '#f2f4f5' }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-navy mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Link - Arrow Only */}
                <Link
                  href={feature.link}
                  className="inline-flex items-center text-gold-600 hover:text-gold-700 group/link"
                  aria-label={feature.linkText}
                >
                  <ArrowRight className="h-6 w-6 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
