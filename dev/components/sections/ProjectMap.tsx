"use client";

import { MapPin } from "lucide-react";

export function ProjectMap() {
  // Static, fully local world-style map highlighting Ghana, Mali, and Burkina Faso
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
      {/* Map background */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Soft grey map background similar to static map tiles */}
          <linearGradient id="mapBackground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f9fafb" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>

          {/* Latitude / longitude grid */}
          <pattern
            id="latLongGrid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>

        {/* Ocean + grid */}
        <rect width="100" height="100" fill="url(#mapBackground)" />
        <rect width="100" height="100" fill="url(#latLongGrid)" />

        {/* Simplified world continents (illustrative, not to scale) */}
        {/* Americas */}
        <path
          d="M10 25 L25 22 L32 30 L30 40 L24 48 L22 60 L15 70 L10 62 L8 48 L8 34 Z"
          fill="#d4d4d8"
          stroke="#a1a1aa"
          strokeWidth="0.5"
        />

        {/* Europe / Asia */}
        <path
          d="M32 18 L70 18 L86 24 L90 32 L90 40 L86 48 L80 52 L72 54 L60 56 L46 54 L36 48 L32 40 Z"
          fill="#d4d4d8"
          stroke="#a1a1aa"
          strokeWidth="0.5"
        />

        {/* Africa (highlighted region containing Ghana, Mali, Burkina Faso) */}
        <path
          d="M40 40 L54 40 L64 44 L66 52 L64 66 L58 76 L48 82 L40 76 L36 64 L36 48 Z"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="0.6"
        />
      </svg>

      {/* Map label */}
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-700 shadow-sm">
        Global map (static) – highlighted: Ghana, Mali, Burkina Faso
      </div>

      {/* Pins for the three countries */}

      {/* Ghana */}
      <div className="absolute left-[48%] top-[64%] flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
          <MapPin className="h-4 w-4" />
        </div>
        <span className="rounded-full bg-white/95 px-3 py-1 text-xs sm:text-sm font-semibold text-gray-800 shadow">
          Ghana
        </span>
      </div>

      {/* Mali */}
      <div className="absolute left-[46%] top-[46%] flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
          <MapPin className="h-4 w-4" />
        </div>
        <span className="rounded-full bg-white/95 px-3 py-1 text-xs sm:text-sm font-semibold text-gray-800 shadow">
          Mali
        </span>
      </div>

      {/* Burkina Faso */}
      <div className="absolute left-[52%] top-[54%] flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
          <MapPin className="h-4 w-4" />
        </div>
        <span className="rounded-full bg-white/95 px-3 py-1 text-xs sm:text-sm font-semibold text-gray-800 shadow">
          Burkina Faso
        </span>
      </div>
    </div>
  );
}
