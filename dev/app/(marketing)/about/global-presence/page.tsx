import type { Metadata } from "next";
import { MapPin, Globe, Users } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants/company";
import { ProjectMap } from "@/components/sections/ProjectMap";

export const metadata: Metadata = {
  title: "Global Presence | Yellow Power International",
  description: `Discover Yellow Power International's operations across ${COMPANY_INFO.offices} countries in Africa and North America.`,
};

const offices = [
  {
    name: "Ghana Headquarters",
    city: "Madina, Greater Accra",
    country: "Ghana",
    coordinates: [-0.1702, 5.6895] as [number, number],
  },
  {
    name: "Regional Office - Mali",
    city: "Bamako",
    country: "Mali",
    coordinates: [-8.0, 12.65] as [number, number],
  },
  {
    name: "Regional Office - Burkina Faso",
    city: "Ouagadougou",
    country: "Burkina Faso",
    coordinates: [-1.5247, 12.3714] as [number, number],
  },
  {
    name: "Regional Office - Côte d'Ivoire",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    coordinates: [-4.0267, 5.3364] as [number, number],
  },
  {
    name: "North America Office - Canada",
    city: "Canada",
    country: "Canada",
    coordinates: [-106.3468, 56.1304] as [number, number],
  },
];

export default function GlobalPresencePage() {
  return (
    <main>
      {/* Hero */}
      <section className="text-white py-20" style={{ backgroundColor: '#003087' }}>
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Global Presence
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Operating across {COMPANY_INFO.offices} countries in Africa and North America with a team of {COMPANY_INFO.employees} professionals
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 leading-relaxed">
              Yellow Power International has strategically expanded across West Africa, 
              establishing operations in key mining regions to better serve our clients. 
              Our presence in multiple countries enables us to deliver consistent, 
              high-quality services while understanding local needs and regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Globe className="h-12 w-12 text-gold mx-auto mb-4" />
              <div className="text-3xl font-bold text-navy mb-2">{COMPANY_INFO.offices}</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gold mx-auto mb-4" />
              <div className="text-3xl font-bold text-navy mb-2">{offices.length}</div>
              <div className="text-gray-600">Office Locations</div>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-gold mx-auto mb-4" />
              <div className="text-3xl font-bold text-navy mb-2">{COMPANY_INFO.employees}</div>
              <div className="text-gray-600">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy mb-4">
              Our Locations
            </h2>
            <p className="text-gray-600">
              Explore our office locations across West Africa
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ProjectMap />
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            Office Locations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office) => (
              <div key={office.name} className="p-6 bg-gray-50 rounded-xl">
                <MapPin className="h-8 w-8 text-gold mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">{office.name}</h3>
                <p className="text-gray-600 mb-1">{office.city}</p>
                <p className="text-sm text-gray-500">{office.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
