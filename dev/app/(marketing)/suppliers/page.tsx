import type { Metadata } from "next";
import { CheckCircle2, Award, Clock, Shield } from "lucide-react";
import { SupplierRegistrationForm } from "@/components/forms/SupplierRegistrationForm";

export const metadata: Metadata = {
  title: "Supplier Portal | Yellow Power International",
  description: "Become an approved supplier for Yellow Power International. Join our network of trusted partners.",
};

export default function SuppliersPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Supplier Portal</h1>
            <p className="text-xl text-gray-300">
              Become part of our trusted supplier network supporting mining operations across West Africa
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Supplier Benefits</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Award className="h-8 w-8" />, title: "Consistent Work", desc: "Regular projects across 3 countries" },
              { icon: <Clock className="h-8 w-8" />, title: "Timely Payments", desc: "Professional payment terms" },
              { icon: <Shield className="h-8 w-8" />, title: "Long-Term Relationships", desc: "Partnership approach" },
              { icon: <CheckCircle2 className="h-8 w-8" />, title: "Growth Opportunities", desc: "Expanding operations" },
            ].map((benefit, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-navy mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Supplier Categories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Equipment & Machinery Suppliers",
              "Spare Parts & Components",
              "Fuel & Lubricants",
              "Safety Equipment & PPE",
              "Professional Services",
              "Catering & Camp Services",
              "Transportation Services",
              "Maintenance & Repair Services",
            ].map((category, i) => (
              <div key={i} className="flex gap-3 bg-white p-4 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Register as a Supplier</h2>
            <p className="text-gray-600">Complete the form below to begin the registration process</p>
          </div>
          <SupplierRegistrationForm />
        </div>
      </section>
    </main>
  );
}
