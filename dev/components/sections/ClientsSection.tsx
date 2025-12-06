"use client";

import Image from "next/image";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    name: "John Mensah",
    role: "Operations Director",
    company: "Major Mining Corp",
    content: "Yellow Power International has consistently delivered exceptional drilling services. Their professionalism and commitment to safety is unmatched in the industry."
  },
  {
    name: "Sarah Osei",
    role: "Project Manager",
    company: "Gold Fields Ghana",
    content: "Working with YPI has transformed our operations. Their modern equipment and skilled operators ensure maximum productivity with minimal downtime."
  },
  {
    name: "Michael Addo",
    role: "Site Superintendent",
    company: "Newmont Ghana",
    content: "The team at Yellow Power brings years of expertise and a safety-first approach that aligns perfectly with our values. Highly recommended partner."
  }
];

export function ClientsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Trusted by Leading Mining Companies
          </h2>
          <p className="text-lg text-gray-600">
            Building lasting partnerships through reliable service and exceptional results
          </p>
        </div>

        {/* Client Logos */}
        <div className="mb-16 p-8 bg-white rounded-2xl shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {/* Placeholder logos using grayscale images */}
            {[
              { name: "Mining Company 1", src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=80&auto=format&fit=crop" },
              { name: "Mining Company 2", src: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?q=80&w=200&h=80&auto=format&fit=crop" },
              { name: "Mining Company 3", src: "https://images.unsplash.com/photo-1565464027194-7957a2295fb7?q=80&w=200&h=80&auto=format&fit=crop" },
              { name: "Mining Company 4", src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=200&h=80&auto=format&fit=crop" },
            ].map((client, i) => (
              <div key={i} className="relative w-full h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <Image
                  src={client.src}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Trusted by leading mining operations across West Africa
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              content={testimonial.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
