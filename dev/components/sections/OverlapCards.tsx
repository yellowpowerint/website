"use client";

import Link from "next/link";
import { ArrowRight, Target, Leaf, Shield, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const cards: CardItem[] = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Excellence in Mining Services",
    description: "Learn more about our focus on delivering world-class drilling, blasting, and mining support services across West Africa.",
    link: "/services",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Committed to Sustainability",
    description: "Find out why it's in the interests of our people, business, shareholders and communities that we play our part in environmental stewardship.",
    link: "/sustainability",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Safety First, Always",
    description: "We are committed to zero harm. Learn more about our policies, standards, systems and processes that help us achieve safety excellence.",
    link: "/sustainability/safety",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Our Track Record",
    description: "Yellow Power International is committed to building lasting partnerships while delivering value for our clients and the broader mining community.",
    link: "/about",
  },
];

export function OverlapCards() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="container">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
              <Link
                key={index}
                href={card.link}
                className={cn(
                  "group p-8 hover:bg-gray-50 transition-colors duration-300",
                  index < cards.length - 1 && "lg:border-r border-gray-200"
                )}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                    {card.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-gold-600 transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {card.description}
                </p>

                {/* Arrow Link */}
                <div className="flex items-center text-gold-600 font-medium group-hover:text-gold-700">
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
