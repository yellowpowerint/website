"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InfoCard {
  image: string;
  title: string;
  description: string;
  link: string;
}

const cards: InfoCard[] = [
  {
    image: "/images/home/info-cards/making-positive-impact.jpg",
    title: "Making a positive impact",
    description: "As corporate sponsors of Vision Football Club, we invest in youth development and community pride—supporting talent on and off the pitch while continuing to deliver reliable mining support services.",
    link: "/sustainability"
  },
  {
    image: "/images/home/info-cards/excellence-since-2017excellence-since-2017.jpg",
    title: "Excellence since 2017",
    description: "Since our founding in 2017, we have been at the forefront of Ghana&apos;s mining industry, delivering exceptional drilling services and continuously raising standards of operational excellence.",
    link: "/about"
  },
  {
    image: "/images/home/info-cards/delivering-for-our-clients.jpg",
    title: "Delivering for our clients",
    description: "Our teams consistently deliver outstanding results for mining operations across West Africa. Learn more about our commitment to safety, quality, and client satisfaction.",
    link: "/projects"
  }
];

export function InfoCards() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 md:bg-white border-t border-gray-200 md:border-t-0">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="group block rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: '#f2f4f5' }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Arrow Only */}
                <div className="text-gold-600 group-hover:text-gold-700">
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
