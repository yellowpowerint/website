'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, X } from 'lucide-react';

interface ProjectLocation {
  id: string;
  name: string;
  location: string;
  services: string[];
  status: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  year?: string;
}

interface ProjectMapProps {
  projects: ProjectLocation[];
  height?: string;
  zoom?: number;
}

export function ProjectMap({ projects, height = '600px', zoom = 5 }: ProjectMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectLocation | null>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapContainer.current || map.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      // Center on Ghana (approximate center of projects)
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-1.5, 7.5], // Ghana center
        zoom: zoom,
      });

      map.current.on('load', () => {
        // Add markers for each project
        projects.forEach((project) => {
          if (!map.current) return;

          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'project-marker';
          el.style.width = '40px';
          el.style.height = '40px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = '#FDB714'; // Gold color
          el.style.border = '3px solid white';
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
          el.style.cursor = 'pointer';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.transition = 'transform 0.2s';

          // Add icon
          el.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';

          el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.2)';
          });

          el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
          });

          el.addEventListener('click', () => {
            setSelectedProject(project);
            map.current?.flyTo({
              center: [project.coordinates.lng, project.coordinates.lat],
              zoom: 10,
              duration: 1500,
            });
          });

          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat([project.coordinates.lng, project.coordinates.lat])
            .addTo(map.current);
        });

        // Add navigation controls
        if (map.current) {
          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

          // Fit bounds to show all projects
          if (projects.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();
            projects.forEach((project) => {
              bounds.extend([project.coordinates.lng, project.coordinates.lat]);
            });
            map.current.fitBounds(bounds, { padding: 50 });
          }
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, projects, zoom]);

  if (!mapboxToken) {
    return (
      <div
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center p-8">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">
            Map view unavailable. Mapbox token not configured.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} style={{ height }} />

      {/* Project info card */}
      {selectedProject && (
        <div className="absolute top-4 left-4 right-4 md:left-auto md:w-96 bg-white rounded-lg shadow-2xl z-10 overflow-hidden">
          <div className="relative">
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white p-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="font-bold text-lg pr-8">{selectedProject.name}</h3>
              <p className="text-sm text-gold-100">{selectedProject.location}</p>
            </div>
            
            <div className="p-4 space-y-3">
              {selectedProject.year && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Year</p>
                  <p className="text-sm text-gray-900">{selectedProject.year}</p>
                </div>
              )}
              
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  selectedProject.status === 'Completed' 
                    ? 'bg-green-100 text-green-700' 
                    : selectedProject.status === 'Active'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {selectedProject.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Services</p>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gold-500 border-2 border-white shadow"></div>
          <span className="text-gray-700">Project Location</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Click markers for details
        </p>
      </div>
    </div>
  );
}
