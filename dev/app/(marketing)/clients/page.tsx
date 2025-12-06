import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CLIENTS, TESTIMONIALS } from "@/lib/constants/projects";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";

export const metadata: Metadata = {
  title: "Our Clients & Testimonials | Yellow Power International",
  description: "Trusted by leading mining companies across West Africa. See what our clients say about our services.",
};

export default function ClientsPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Clients</h1>
            <p className="text-xl text-gray-300">
              Trusted by leading mining companies across West Africa for over 8 years
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Client Portfolio</h2>
            <p className="text-gray-600">Working with the best in the mining industry</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {CLIENTS.map((client) => (
              <ClientLogo key={client.id} client={client} size="medium" showName />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Client Testimonials</h2>
            <p className="text-gray-600">Hear from our satisfied clients</p>
          </div>
          <TestimonialSlider testimonials={TESTIMONIALS} />
        </div>
      </section>

      <section className="py-16 bg-navy text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Become a Client</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the growing list of satisfied clients who trust Yellow Power for their mining operations
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/services#quote-form">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/partnerships">Explore Partnerships</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
