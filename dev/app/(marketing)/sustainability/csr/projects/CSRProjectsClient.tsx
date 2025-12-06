"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CSRProjectCard } from "@/components/sections/CSRProjectCard";
import { CSR_PROJECTS, type CSRProject } from "@/lib/constants/sustainability";
import { Filter, ArrowLeft } from "lucide-react";

export function CSRProjectsClient() {
  const [filterCategory, setFilterCategory] = useState<CSRProject["category"] | "All">("All");
  const [filterStatus, setFilterStatus] = useState<CSRProject["status"] | "All">("All");
  const [filterCountry, setFilterCountry] = useState<string>("All");

  const categories: Array<CSRProject["category"] | "All"> = [
    "All",
    "Education",
    "Healthcare",
    "Infrastructure",
    "Community Development",
    "Environment",
  ];

  const statuses: Array<CSRProject["status"] | "All"> = ["All", "completed", "ongoing"];

  const countries = ["All", ...Array.from(new Set(CSR_PROJECTS.map((p) => p.country)))];

  const filteredProjects = CSR_PROJECTS.filter((project) => {
    if (filterCategory !== "All" && project.category !== filterCategory) return false;
    if (filterStatus !== "All" && project.status !== filterStatus) return false;
    if (filterCountry !== "All" && project.country !== filterCountry) return false;
    return true;
  });

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 via-pink-600 to-rose-600 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">CSR Project Showcase</h1>
            <p className="text-xl text-purple-100">
              Explore our complete portfolio of community impact initiatives across West Africa
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb / Back Link */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="container max-w-7xl">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sustainability/csr" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to CSR Programs
            </Link>
          </Button>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-navy">Filter Projects</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={filterCategory === cat ? "default" : "outline"}
                    onClick={() => setFilterCategory(cat)}
                    className={filterCategory === cat ? "bg-gold hover:bg-gold-600 text-navy" : ""}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex gap-2">
                {statuses.map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={filterStatus === status ? "default" : "outline"}
                    onClick={() => setFilterStatus(status)}
                    className={filterStatus === status ? "bg-gold hover:bg-gold-600 text-navy" : ""}
                  >
                    {status === "All" ? "All" : status === "completed" ? "Completed" : "Ongoing"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <Button
                    key={country}
                    size="sm"
                    variant={filterCountry === country ? "default" : "outline"}
                    onClick={() => setFilterCountry(country)}
                    className={filterCountry === country ? "bg-gold hover:bg-gold-600 text-navy" : ""}
                  >
                    {country}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProjects.length} of {CSR_PROJECTS.length} projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container max-w-7xl">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <CSRProjectCard key={project.id} project={project} detailed />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects match your filters. Try adjusting your selection.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Want to Learn More or Partner With Us?
          </h2>
          <p className="text-gray-600 mb-8">
            We&apos;re always looking for partners to amplify our community impact
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/partnerships">Partnership Opportunities</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
