"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Zap, Shield } from "lucide-react";

export function EquipmentShowcase() {
  const features = [
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "State-of-the-Art Equipment",
      description: "Modern drilling rigs and machinery maintained to the highest standards"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Advanced Technology",
      description: "GPS-guided systems and real-time monitoring for optimal performance"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety First",
      description: "All equipment meets international safety standards and regulations"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              World-Class Equipment & Technology
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our fleet of modern mining equipment and cutting-edge technology enables us 
              to deliver superior results while maintaining the highest safety standards.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/services/equipment">
                View Full Fleet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-navy/10 to-gold/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-400">
                <Wrench className="h-16 w-16 mx-auto mb-4" />
                <p className="text-sm font-medium">Equipment Showcase Image</p>
                <p className="text-xs">(To be added in content phase)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
