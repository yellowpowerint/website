"use client";

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
  // Static map with West Africa focus
  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
      {/* Static map image using OpenStreetMap embed */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=-15.0,3.0,5.0,18.0&layer=mapnik&marker=7.9465,-1.0232&marker=17.5707,-3.9962&marker=12.3686,-1.5275"
        style={{ 
          border: 0, 
          width: "100%", 
          height: "100%",
          filter: "grayscale(0%)"
        }}
        title="YPI Operations Map"
        loading="lazy"
      />
      
      {/* Custom overlay pins */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ghana Pin - Lower center-left */}
        <div className="absolute" style={{ left: '42%', top: '68%' }}>
          <div className="relative pointer-events-auto">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-4 border-white" 
                 style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
              <MapPin className="h-5 w-5 text-white fill-white" />
            </div>
            <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              <p className="text-sm font-bold text-navy">Ghana</p>
            </div>
          </div>
        </div>

        {/* Mali Pin - Upper center */}
        <div className="absolute" style={{ left: '40%', top: '28%' }}>
          <div className="relative pointer-events-auto">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-4 border-white" 
                 style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
              <MapPin className="h-5 w-5 text-white fill-white" />
            </div>
            <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              <p className="text-sm font-bold text-navy">Mali</p>
            </div>
          </div>
        </div>

        {/* Burkina Faso Pin - Center */}
        <div className="absolute" style={{ left: '48%', top: '48%' }}>
          <div className="relative pointer-events-auto">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-4 border-white" 
                 style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
              <MapPin className="h-5 w-5 text-white fill-white" />
            </div>
            <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              <p className="text-sm font-bold text-navy">Burkina Faso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-navy">
          © OpenStreetMap
        </a>
      </div>
    </div>
  );
}
