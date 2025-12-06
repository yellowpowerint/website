"use client";

import { Button } from "@/components/ui/button";
import { JOB_CATEGORIES } from "@/lib/constants/careers";
import { Filter, X } from "lucide-react";
import type { Job } from "@/lib/constants/careers";

export interface JobFilterValues {
  category: string;
  location: string;
  experienceLevel: string;
}

interface JobFilterProps {
  filters: JobFilterValues;
  onFilterChange: (filters: JobFilterValues) => void;
  availableLocations: string[];
}

export function JobFilter({ filters, onFilterChange, availableLocations }: JobFilterProps) {
  const experienceLevels: Array<Job["experienceLevel"]> = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive",
  ];

  const hasActiveFilters = filters.category || filters.location || filters.experienceLevel;

  const clearFilters = () => {
    onFilterChange({
      category: "",
      location: "",
      experienceLevel: "",
    });
  };

  return (
    <section className="py-8 bg-gray-50 border-b">
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-navy">Filter Jobs</h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-600 hover:text-navy"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Category
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={filters.category === "" ? "default" : "outline"}
                onClick={() => onFilterChange({ ...filters, category: "" })}
                className={filters.category === "" ? "bg-gold hover:bg-gold-600 text-navy" : ""}
              >
                All
              </Button>
              {JOB_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  size="sm"
                  variant={filters.category === cat.id ? "default" : "outline"}
                  onClick={() => onFilterChange({ ...filters, category: cat.id })}
                  className={filters.category === cat.id ? "bg-gold hover:bg-gold-600 text-navy" : ""}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={filters.location === "" ? "default" : "outline"}
                onClick={() => onFilterChange({ ...filters, location: "" })}
                className={filters.location === "" ? "bg-gold hover:bg-gold-600 text-navy" : ""}
              >
                All
              </Button>
              {availableLocations.map((loc) => (
                <Button
                  key={loc}
                  size="sm"
                  variant={filters.location === loc ? "default" : "outline"}
                  onClick={() => onFilterChange({ ...filters, location: loc })}
                  className={filters.location === loc ? "bg-gold hover:bg-gold-600 text-navy" : ""}
                >
                  {loc}
                </Button>
              ))}
            </div>
          </div>

          {/* Experience Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={filters.experienceLevel === "" ? "default" : "outline"}
                onClick={() => onFilterChange({ ...filters, experienceLevel: "" })}
                className={filters.experienceLevel === "" ? "bg-gold hover:bg-gold-600 text-navy" : ""}
              >
                All
              </Button>
              {experienceLevels.map((level) => (
                <Button
                  key={level}
                  size="sm"
                  variant={filters.experienceLevel === level ? "default" : "outline"}
                  onClick={() => onFilterChange({ ...filters, experienceLevel: level })}
                  className={filters.experienceLevel === level ? "bg-gold hover:bg-gold-600 text-navy" : ""}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
