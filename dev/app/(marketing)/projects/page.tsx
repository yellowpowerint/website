"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectFilter, type FilterValues } from "@/components/sections/ProjectFilter";
import { ProjectMap } from "@/components/sections/ProjectMap";
import { PROJECTS } from "@/lib/constants/projects";
import { MapPin } from "lucide-react";

// Helper function to get approximate coordinates for project locations
function getProjectCoordinates(location: string, country: string): { lat: number; lng: number } {
  const coordinates: Record<string, { lat: number; lng: number }> = {
    // Ghana
    'Tarkwa': { lat: 5.3033, lng: -1.9833 },
    'Obuasi': { lat: 6.1894, lng: -1.6688 },
    'Akyem': { lat: 6.25, lng: -0.95 },
    'Prestea': { lat: 5.4333, lng: -2.15 },
    'Asankrangwa': { lat: 5.4667, lng: -2.4833 },
    // Burkina Faso
    'Banfora': { lat: 10.6333, lng: -4.7667 },
    'Ouagadougou': { lat: 12.3686, lng: -1.5275 },
    'Bobo-Dioulasso': { lat: 11.1833, lng: -4.2833 },
    // Mali
    'Kayes': { lat: 14.4461, lng: -11.4425 },
    'Bamako': { lat: 12.6392, lng: -8.0029 },
    // Côte d\'Ivoire
    'Abidjan': { lat: 5.3364, lng: -4.0267 },
    'Yamoussoukro': { lat: 6.8276, lng: -5.2893 },
  };

  // Try to find exact match first
  if (coordinates[location]) {
    return coordinates[location];
  }

  // Fallback to country center
  const countryDefaults: Record<string, { lat: number; lng: number }> = {
    'Ghana': { lat: 7.9465, lng: -1.0232 },
    'Burkina Faso': { lat: 12.3686, lng: -1.5275 },
    'Mali': { lat: 17.5707, lng: -3.9962 },
    'Côte d\'Ivoire': { lat: 7.54, lng: -5.5471 },
  };

  return countryDefaults[country] || { lat: 7.9465, lng: -1.0232 };
}

const COUNTRY_PROJECTS = [
  {
    id: "ghana",
    name: "Ghana Operations",
    location: "Ghana",
    services: ["Drilling", "Load & Haul", "Construction"],
    status: "Active",
    coordinates: getProjectCoordinates("Ghana", "Ghana"),
    year: "2017",
  },
  {
    id: "mali",
    name: "Mali Operations",
    location: "Mali",
    services: ["Drilling", "Load & Haul"],
    status: "Active",
    coordinates: getProjectCoordinates("Mali", "Mali"),
    year: "2020",
  },
  {
    id: "burkina-faso",
    name: "Burkina Faso Operations",
    location: "Burkina Faso",
    services: ["Drilling", "Construction"],
    status: "Active",
    coordinates: getProjectCoordinates("Burkina Faso", "Burkina Faso"),
    year: "2019",
  },
];

export default function ProjectsPage() {
  const [filters, setFilters] = useState<FilterValues>({
    service: "",
    status: "",
    country: "",
  });

  // Set document metadata programmatically since client components can't export metadata
  useEffect(() => {
    document.title = "Project Portfolio | Yellow Power International";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Browse our portfolio of completed and ongoing mining projects across West Africa. Explore case studies from Ghana, Mali, and Burkina Faso."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Browse our portfolio of completed and ongoing mining projects across West Africa. Explore case studies from Ghana, Mali, and Burkina Faso.";
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Project Portfolio | Yellow Power International");
    } else {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      ogTitle.setAttribute("content", "Project Portfolio | Yellow Power International");
      document.head.appendChild(ogTitle);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Browse our portfolio of completed and ongoing mining projects across West Africa.");
    } else {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      ogDescription.setAttribute("content", "Browse our portfolio of completed and ongoing mining projects across West Africa.");
      document.head.appendChild(ogDescription);
    }
  }, []);

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
      <section className="text-white py-20" style={{ backgroundColor: '#003087' }}>
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

      {/* Project Map Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gold-500" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Regional Presence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our operations span three key mining regions across West Africa: Ghana, Mali, and Burkina Faso.
            </p>
          </div>
          <ProjectMap 
            projects={COUNTRY_PROJECTS}
            height="600px"
            zoom={4}
          />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
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
