"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/sections/JobCard";
import { JobFilter, type JobFilterValues } from "@/components/sections/JobFilter";
import { JOBS } from "@/lib/constants/careers";
import { ArrowLeft } from "lucide-react";

export function JobsClient() {
  const [filters, setFilters] = useState<JobFilterValues>({
    category: "",
    location: "",
    experienceLevel: "",
  });

  // Extract unique locations from jobs
  const availableLocations = Array.from(new Set(JOBS.map((job) => job.location)));

  // Filter jobs
  const filteredJobs = JOBS.filter((job) => {
    if (filters.category && job.categoryId !== filters.category) return false;
    if (filters.location && job.location !== filters.location) return false;
    if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-navy to-navy-700 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Current Job Openings</h1>
            <p className="text-xl text-gray-300">
              Explore opportunities across drilling operations, engineering, safety, and more
            </p>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="container max-w-7xl">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/careers" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Careers Overview
            </Link>
          </Button>
        </div>
      </section>

      {/* Filters */}
      <JobFilter
        filters={filters}
        onFilterChange={setFilters}
        availableLocations={availableLocations}
      />

      {/* Job Listings */}
      <section className="py-16">
        <div className="container max-w-7xl">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-navy">{filteredJobs.length}</span> of{" "}
              <span className="font-semibold">{JOBS.length}</span> positions
            </p>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-4">
                No jobs match your current filters. Try adjusting your selection.
              </p>
              <Button
                variant="outline"
                onClick={() => setFilters({ category: "", location: "", experienceLevel: "" })}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Don&apos;t See the Right Role?
          </h2>
          <p className="text-gray-600 mb-8">
            We&apos;re always looking for talented individuals. Submit your resume for future opportunities.
          </p>
          <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
            <Link href="/contact">Contact Our HR Team</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
