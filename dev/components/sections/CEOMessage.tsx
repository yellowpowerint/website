"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

export function CEOMessage() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop"
              alt="Yellow Power International mining operations"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right - Quote & CEO Info */}
          <div className="flex flex-col justify-center">
            {/* Opening Quote Mark */}
            <div className="mb-6">
              <Quote className="h-12 w-12 text-gold-500 fill-gold-500" />
            </div>

            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900 leading-relaxed mb-8">
              Since our founding in 2017, we've built Yellow Power International on a foundation of excellence, safety, and integrity. Our commitment to delivering world-class drilling and mining support services across West Africa is matched only by our dedication to our people and the communities we serve. Together, we're powering Africa's mining future.
            </blockquote>

            {/* Closing Quote Mark */}
            <div className="flex justify-end mb-8">
              <Quote className="h-12 w-12 text-gold-500 fill-gold-500 rotate-180" />
            </div>

            {/* Find Out More Link */}
            <div className="mb-8">
              <Link
                href="/about/founder"
                className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-lg group"
              >
                <span>Learn more about our journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* CEO Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/ceo-emmanuel-ganu.jpg"
                  alt="Emmanuel Kweku Ganu - CEO & Founder"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-navy">Emmanuel Kweku Ganu</p>
                <p className="text-sm text-gray-600">CEO & Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
