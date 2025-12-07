'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/constants/services";
import { TechnicalSpecs } from "./TechnicalSpecs";
import { EquipmentCard } from "@/components/ui/EquipmentCard";
import { getEquipmentByService } from "@/lib/constants/services";

interface ServiceDetailProps {
  service: Service;
  children?: React.ReactNode;
}

export function ServiceDetail({ service, children }: ServiceDetailProps) {
  const equipment = getEquipmentByService(service.id);

  return (
    <main>
      {/* Hero Section */}
      <section className="text-white py-20 pt-32" style={{ backgroundColor: '#003087' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-white leading-relaxed mb-8">
              {service.longDescription}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy font-semibold" asChild>
                <Link href="/services#quote-form">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white border-white text-navy hover:bg-white/90" asChild>
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.keyBenefits.map((benefit, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">
            Applications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.applications.map((application, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold font-bold">
                    {index + 1}
                  </div>
                  <p className="text-navy font-medium">{application}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      {service.technicalSpecs && service.technicalSpecs.length > 0 && (
        <TechnicalSpecs specs={service.technicalSpecs} />
      )}

      {/* Equipment Used */}
      {equipment.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">
              Equipment Used
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {equipment.map((item) => (
                <EquipmentCard key={item.id} equipment={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Safety Highlights */}
      <section className="py-16 bg-navy text-white">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Safety & Compliance
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.safetyHighlights.map((highlight, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom content */}
      {children}

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us today to discuss your project requirements and receive a customized quote.
          </p>
          <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy font-semibold" asChild>
            <Link href="/services#quote-form">
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
