'use client';

import React, { useState } from 'react';
import { Play, X, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { VideoTestimonial } from '@/lib/constants/testimonials';

interface VideoTestimonialCardProps {
  testimonial: VideoTestimonial;
}

export function VideoTestimonialCard({ testimonial }: VideoTestimonialCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const categoryColors = {
    employee: 'bg-blue-100 text-blue-700',
    client: 'bg-green-100 text-green-700',
    community: 'bg-purple-100 text-purple-700',
    training: 'bg-orange-100 text-orange-700',
  };

  const categoryLabels = {
    employee: 'Employee',
    client: 'Client',
    community: 'Community',
    training: 'Training',
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-video bg-gray-900">
          {!isPlaying ? (
            <>
              {/* Thumbnail with play button */}
              <div
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gold-500 rounded-full p-4 group-hover:bg-gold-600 transition-colors group-hover:scale-110 transform duration-200">
                    <Play className="h-8 w-8 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Category and duration badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge className={categoryColors[testimonial.category]}>
                    {categoryLabels[testimonial.category]}
                  </Badge>
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {testimonial.duration}
                  </Badge>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Video iframe */}
              <iframe
                src={`${testimonial.videoUrl}?autoplay=1`}
                title={testimonial.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              {/* Close button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {testimonial.title}
          </h3>

          {/* Quote */}
          <div className="relative mb-4">
            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gold-200" />
            <p className="text-gray-600 italic pl-6">
              &quot;{testimonial.quote}&quot;
            </p>
          </div>

          {/* Speaker info */}
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-900">{testimonial.speaker}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
            {testimonial.company && (
              <p className="text-sm text-gray-500">{testimonial.company}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal overlay for fullscreen video (optional enhancement) */}
      {isPlaying && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsPlaying(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${testimonial.videoUrl}?autoplay=1`}
              title={testimonial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-3"
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Grid layout component for multiple testimonials
interface VideoTestimonialGridProps {
  testimonials: VideoTestimonial[];
  columns?: 2 | 3;
}

export function VideoTestimonialGrid({ 
  testimonials, 
  columns = 3 
}: VideoTestimonialGridProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'lg:grid-cols-3';

  return (
    <div className={`grid gap-6 md:gap-8 ${gridCols}`}>
      {testimonials.map((testimonial) => (
        <VideoTestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}
