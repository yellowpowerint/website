"use client";

import Link from "next/link";
import Image from "next/image";
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

          {/* Equipment Image */}
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1625231334168-35067f8853ed?q=80&w=2070&auto=format&fit=crop"
                alt="Modern mining equipment and drilling machinery"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              {/* Accent border */}
              <div className="absolute inset-0 rounded-2xl ring-4 ring-gold/20 ring-offset-4" />
            </div>
            {/* Secondary image overlay for visual interest */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop"
                alt="Mining drill in action"
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
