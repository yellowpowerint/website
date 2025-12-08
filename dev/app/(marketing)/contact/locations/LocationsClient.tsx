'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import { OfficeCard } from '@/components/sections/OfficeCard';
import { OFFICE_LOCATIONS, getAllCountries } from '@/lib/constants/offices';

// Dynamic import for OfficeMap to avoid SSR issues with Leaflet
const OfficeMap = dynamic(
  () => import('@/components/sections/OfficeMap').then((mod) => mod.OfficeMap),
  {
    loading: () => (
      <div className="bg-gray-200 rounded-xl flex items-center justify-center h-[500px]">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
    ssr: false,
  }
);

export function LocationsClient() {
  const countries = getAllCountries();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-12 w-12 text-gold-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Locations
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yellow Power International operates across 4 African countries and 1 North American country (Canada), 
            with offices strategically located to serve major mining regions.
          </p>
        </div>

        {/* Interactive Map with OpenStreetMap */}
        <div className="mb-16">
          <OfficeMap offices={OFFICE_LOCATIONS} height="500px" />
        </div>

        {/* Office Cards by Country */}
        {countries.map((country) => {
          const offices = OFFICE_LOCATIONS.filter(office => office.country === country);
          
          return (
            <div key={country} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {country}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {offices.map((office) => (
                  <OfficeCard key={office.id} office={office} />
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Need Directions or More Information?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gold-50">
            Contact our offices directly or reach out to our customer support team 
            for detailed directions and local information.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gold-600 hover:bg-gray-100 rounded-md font-semibold transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:+233268066942"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white hover:bg-white/10 rounded-md font-semibold transition-colors"
            >
              Call +233 268 066 942
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
