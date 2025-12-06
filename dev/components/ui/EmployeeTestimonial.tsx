import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import type { EmployeeTestimonial as EmployeeTestimonialType } from "@/lib/constants/careers";

interface EmployeeTestimonialProps {
  testimonial: EmployeeTestimonialType;
  variant?: "compact" | "detailed";
}

export function EmployeeTestimonial({ testimonial, variant = "compact" }: EmployeeTestimonialProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-6">
        <figure>
          <Quote className="h-10 w-10 text-gold mb-4" />
          
          <blockquote className="mb-6">
            <p className="text-lg italic text-gray-700 leading-relaxed">
              &quot;{testimonial.quote}&quot;
            </p>
          </blockquote>

          {variant === "detailed" && testimonial.story && (
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {testimonial.story}
            </p>
          )}

          <figcaption className="flex items-center gap-4">
            {/* Avatar placeholder - will use image when provided */}
            <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
              {testimonial.name.charAt(0)}
            </div>
            
            <div>
              <div className="font-semibold text-navy">{testimonial.name}</div>
              <div className="text-sm text-gray-600">{testimonial.role}</div>
              <div className="text-xs text-gray-500">{testimonial.department}</div>
              {testimonial.yearsAtCompany && (
                <div className="text-xs text-gold mt-1">
                  {testimonial.yearsAtCompany} {testimonial.yearsAtCompany === 1 ? "year" : "years"} at YPI
                </div>
              )}
            </div>
          </figcaption>
        </figure>
      </CardContent>
    </Card>
  );
}
