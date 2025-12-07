"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface ProjectLocation {
  id: string;
  name: string;
  location: string;
  services: string[];
  status: string;
  coordinates: { lat: number; lng: number };
  year: string;
}

interface ProjectMapProps {
  projects: ProjectLocation[];
}

export function ProjectMap({ projects }: ProjectMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Load Leaflet dynamically (OpenStreetMap library)
    const loadMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = (await import("leaflet")).default;

        // Check if CSS is already loaded
        const existingLink = document.querySelector('link[href*="leaflet.css"]');
        if (!existingLink) {
          // Import Leaflet CSS
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);

          // Wait for CSS to load properly
          await new Promise(resolve => {
            link.onload = () => resolve(true);
            setTimeout(resolve, 500); // Fallback timeout
          });
        }

        // Initialize map centered on West Africa
        if (!mapContainer.current) return;
        const map = L.map(mapContainer.current).setView([10.0, -2.0], 5);

        // Force map to invalidate size after creation
        setTimeout(() => {
          map.invalidateSize();
        }, 100);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Custom icon for markers (gold pins)
        const goldIcon = L.divIcon({
          className: "custom-pin",
          html: `
            <div style="position: relative; width: 40px; height: 40px;">
              <div style="
                position: absolute;
                width: 30px;
                height: 30px;
                background: linear-gradient(135deg, #FDB714 0%, #F59E0B 100%);
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        // Add markers for each project
        projects.forEach((project) => {
          const marker = L.marker([project.coordinates.lat, project.coordinates.lng], {
            icon: goldIcon,
          }).addTo(map);

          // Add popup with project info
          marker.bindPopup(`
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="font-weight: 600; color: #003087; margin-bottom: 4px; font-size: 16px;">
                ${project.name}
              </h3>
              <p style="color: #6B7280; font-size: 14px; margin: 4px 0;">
                ${project.location}
              </p>
              <p style="color: #059669; font-size: 12px; font-weight: 600; margin: 4px 0;">
                ${project.status} · Since ${project.year}
              </p>
              <p style="color: #6B7280; font-size: 12px; margin: 4px 0;">
                ${project.services.join(", ")}
              </p>
            </div>
          `);
        });

        // Fit map to show all markers
        if (projects.length > 0) {
          const bounds = L.latLngBounds(
            projects.map((project) => [project.coordinates.lat, project.coordinates.lng])
          );
          map.fitBounds(bounds, { padding: [50, 50] });
        }

        setMapLoaded(true);
      } catch (error) {
        console.error("Error loading map:", error);
        setMapError("Failed to load map. Please check your internet connection.");
      }
    };

    loadMap();
  }, [projects]);

  if (mapError) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center text-center p-8">
        <div>
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 max-w-md">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        ref={mapContainer}
        className="w-full rounded-2xl overflow-hidden shadow-lg"
        style={{ height: "500px", minHeight: "500px", width: "100%" }}
      />
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
