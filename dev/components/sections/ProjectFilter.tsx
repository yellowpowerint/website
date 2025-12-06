"use client";

import { Label } from "@/components/ui/label";
import { SERVICES } from "@/lib/constants/services";
import { PROJECTS } from "@/lib/constants/projects";

interface ProjectFilterProps {
  onFilterChange: (filters: FilterValues) => void;
  currentFilters: FilterValues;
}

export interface FilterValues {
  service: string;
  status: string;
  country: string;
}

export function ProjectFilter({ onFilterChange, currentFilters }: ProjectFilterProps) {
  const countries = Array.from(new Set(PROJECTS.map((p) => p.country))).sort();
  
  const handleChange = (key: keyof FilterValues, value: string) => {
    onFilterChange({
      ...currentFilters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-navy mb-4">Filter Projects</h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="service-filter" className="mb-2 block">
            Service Type
          </Label>
          <select
            id="service-filter"
            value={currentFilters.service}
            onChange={(e) => handleChange("service", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">All Services</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="status-filter" className="mb-2 block">
            Project Status
          </Label>
          <select
            id="status-filter"
            value={currentFilters.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="planned">Planned</option>
          </select>
        </div>

        <div>
          <Label htmlFor="country-filter" className="mb-2 block">
            Country
          </Label>
          <select
            id="country-filter"
            value={currentFilters.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(currentFilters.service || currentFilters.status || currentFilters.country) && (
        <button
          onClick={() => onFilterChange({ service: "", status: "", country: "" })}
          className="mt-4 text-sm text-gold hover:text-gold-600 font-medium"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
