"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  image: string;
  headline: string;
  subHeadline: string;
  ctaText: string;
  ctaLink: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
    headline: "Powering Africa's Mining Future",
    subHeadline: "Comprehensive drilling and mining support services across West Africa since 2017",
    ctaText: "Explore Our Services",
    ctaLink: "/services",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
    headline: "Expert Production Drilling Solutions",
    subHeadline: "Advanced drilling technology and experienced teams delivering excellence in every project",
    ctaText: "View Our Projects",
    ctaLink: "/projects",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1590496792942-84da40a8f6e7?q=80&w=2070&auto=format&fit=crop",
    headline: "Safety First, Quality Always",
    subHeadline: "Zero harm philosophy with ISO-certified operations and world-class safety standards",
    ctaText: "Our Commitment",
    ctaLink: "/sustainability/safety",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1513828000090-2beaca79912e?q=80&w=2070&auto=format&fit=crop",
    headline: "Building Sustainable Mining Communities",
    subHeadline: "Empowering local communities through responsible mining practices and social development",
    ctaText: "Learn More",
    ctaLink: "/sustainability",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const autoPlayRef = React.useRef<NodeJS.Timeout | null>(null);

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // 5 seconds per slide
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark Overlay for better text readability - stronger at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </div>

          {/* Text Content - Bottom Left */}
          <div className="relative z-20 h-full flex items-end pb-20 md:pb-24 lg:pb-28">
            <div className="container">
              <div className="flex flex-col max-w-2xl">
                {/* Headline */}
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-lg"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
                  }}
                >
                  {slide.headline}
                </h1>

                {/* Sub-headline */}
                <p 
                  className="text-base md:text-lg lg:text-xl mb-6 text-white/95 font-medium drop-shadow-md"
                  style={{
                    textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)'
                  }}
                >
                  {slide.subHeadline}
                </p>

                {/* CTA Button */}
                <div>
                  <Button
                    size="lg"
                    className="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-6 py-5 text-base md:text-lg shadow-2xl"
                    asChild
                  >
                    <Link href={slide.ctaLink}>
                      {slide.ctaText}
                      <ArrowRight className="ml-2 h-5 w-5 text-black" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dot Navigation */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-gold-500 w-8"
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/20">
        <div
          className="h-full bg-gold-500 transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / SLIDES.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
