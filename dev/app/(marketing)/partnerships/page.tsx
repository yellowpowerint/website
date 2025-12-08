import type { Metadata } from "next";
import { CheckCircle2, Handshake, Target, TrendingUp } from "lucide-react";
import { PartnershipForm } from "@/components/forms/PartnershipForm";

export const metadata: Metadata = {
  title: "Partnership Opportunities | Yellow Power International",
  description: "Explore partnership opportunities with Yellow Power International. Join us in delivering excellence across Africa's mining sector.",
};

export default function PartnershipsPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Partnership Opportunities</h1>
            <p className="text-xl text-gray-300">
              Join us in delivering world-class mining support services across Africa and North America
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Why Partner With Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Strong Market Position</h3>
              <p className="text-gray-600">Established presence in 4 African countries and Canada with major mining clients</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">Expanding operations with new projects and service offerings</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Proven Track Record</h3>
              <p className="text-gray-600">8+ years of successful project delivery and client satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Partnership Models</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Joint Ventures", desc: "Collaborate on specific projects or long-term operations" },
              { title: "Strategic Alliances", desc: "Complementary services and shared market access" },
              { title: "Subcontracting", desc: "Specialized work packages within our projects" },
              { title: "Technology Partnerships", desc: "Equipment suppliers and technology providers" },
            ].map((model, i) => (
              <div key={i} className="bg-white p-6 rounded-lg">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{model.title}</h3>
                    <p className="text-gray-600 text-sm">{model.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Apply for Partnership</h2>
            <p className="text-gray-600">Fill out the form below to start the conversation</p>
          </div>
          <PartnershipForm />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl text-center">
          <h3 className="text-2xl font-bold text-navy mb-4">
            Interested in Becoming a Supplier?
          </h3>
          <p className="text-gray-600 mb-6">
            If you&apos;re looking to supply equipment, parts, or services to Yellow Power International, 
            visit our Supplier Portal to register.
          </p>
          <a
            href="/suppliers"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-600 font-semibold"
          >
            Visit Supplier Portal →
          </a>
        </div>
      </section>
    </main>
  );
}
