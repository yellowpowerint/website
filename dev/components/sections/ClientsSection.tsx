"use client";

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

        {/* Client Logos Placeholder */}
        <div className="mb-16 p-8 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm font-medium">
                Client Logo {i}
              </div>
            ))}
          </div>
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
