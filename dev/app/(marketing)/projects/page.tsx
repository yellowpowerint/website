"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectFilter, type FilterValues } from "@/components/sections/ProjectFilter";
import { PROJECTS } from "@/lib/constants/projects";

export default function ProjectsPage() {
  const [filters, setFilters] = useState<FilterValues>({
    service: "",
    status: "",
    country: "",
  });

  const filteredProjects = PROJECTS.filter((project) => {
    if (filters.service && !project.services.includes(filters.service)) {
      return false;
    }
    if (filters.status && project.status !== filters.status) {
      return false;
    }
    if (filters.country && project.country !== filters.country) {
      return false;
    }
    return true;
  });

  return (
    <main>
      <section className="bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Project Portfolio
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our track record of successful mining support projects across West Africa. 
              From precision drilling to complete infrastructure development, we deliver excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container">
          <ProjectFilter onFilterChange={setFilters} currentFilters={filters} />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {filteredProjects.length > 0 ? (
            <>
              <p className="text-gray-600 mb-8">
                Showing {filteredProjects.length} of {PROJECTS.length} projects
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No projects match your filter criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
