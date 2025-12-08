import type { Metadata } from "next";
import { Target, Eye, Heart, Shield, Users, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission & Vision | Yellow Power International",
  description: "Learn about our mission to deliver quality mining services and our vision to become the industry leader in Africa.",
};

const coreValues = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Safety First",
    description: "Uncompromising commitment to the safety of our team and partners",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Integrity",
    description: "Honest, transparent, and ethical in all our business dealings",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Collaboration",
    description: "Working together with clients and communities for mutual success",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Innovation",
    description: "Embracing technology and modern practices to deliver superior results",
  },
];

export default function MissionVisionPage() {
  return (
    <main>
      {/* Hero */}
      <section className="text-white py-20" style={{ backgroundColor: '#FDB714' }}>
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Mission & Vision
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Driving excellence in mining support services through our commitment to 
            quality, safety, and innovation
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-6">
                <Target className="h-10 w-10 text-gold" />
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To enrich the lives and fortunes of the employees of Yellow Power International, 
                accomplished through skill development and working collaboratively with our clients 
                to ensure their expectations are met and delivering quality without compromise.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-navy/10 mb-6">
                <Eye className="h-10 w-10 text-navy" />
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become an industry and market leader in the provision of mining, drilling, 
                and construction services. To be the employer&apos;s and customer&apos;s choice by ensuring 
                that transparency prevails in our business relationships while supporting mining 
                operations with state-of-the-art modern machinery and equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our decisions and define our culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
