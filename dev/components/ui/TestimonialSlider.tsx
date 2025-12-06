"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/lib/constants/projects";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <Quote className="h-12 w-12 text-gold/20 mb-6" />
        
        <blockquote className="mb-8">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
            &quot;{current.quote}&quot;
          </p>
        </blockquote>

        <div className="flex items-center gap-4">
          {current.avatar ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={current.avatar}
                alt={current.clientName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-navy">
                {current.clientName.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1">
            <p className="font-semibold text-navy">{current.clientName}</p>
            <p className="text-sm text-gray-600">{current.role}</p>
            <p className="text-sm text-gold font-medium">{current.company}</p>
          </div>

          {current.rating && (
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < current.rating! ? "fill-gold text-gold" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              aria-label="Previous testimonial"
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-gold w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              aria-label="Next testimonial"
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
