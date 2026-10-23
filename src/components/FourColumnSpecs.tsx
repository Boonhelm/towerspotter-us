import React from 'react';
import { Calendar, Ruler, Droplets, MapPin, ExternalLink } from 'lucide-react';
import { WaterTower } from '../types/tower.ts';
import { formatGallons } from '../utils/filterUtils.ts';

interface FourColumnSpecsProps {
  tower: WaterTower;
}

export const FourColumnSpecs: React.FC<FourColumnSpecsProps> = ({ tower }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Year Built */}
      <div className="p-5 rounded-3xl bg-white border-2 border-zinc-200 shadow-xs">
        <div className="flex items-center justify-between text-zinc-500 mb-2">
          <span className="text-xs font-bold tracking-wider uppercase">Year Built</span>
          <Calendar className="w-5 h-5 text-amber-600" />
        </div>
        <div className="text-3xl lg:text-4xl font-serif font-black text-zinc-900 tabular-nums">
          {tower.yearBuilt}
        </div>
        <p className="text-sm font-semibold text-zinc-600 mt-1">
          Built {2026 - tower.yearBuilt} years ago
        </p>
      </div>

      {/* 2. Height */}
      <div className="p-5 rounded-3xl bg-white border-2 border-zinc-200 shadow-xs">
        <div className="flex items-center justify-between text-zinc-500 mb-2">
          <span className="text-xs font-bold tracking-wider uppercase">Height</span>
          <Ruler className="w-5 h-5 text-sky-600" />
        </div>
        <div className="text-3xl lg:text-4xl font-serif font-black text-zinc-900 tabular-nums">
          {tower.heightFt} <span className="text-lg font-sans font-bold text-zinc-600">ft</span>
        </div>
        <p className="text-sm font-semibold text-zinc-600 mt-1">
          About {Math.round(tower.heightFt / 10)} stories tall
        </p>
      </div>

      {/* 3. Capacity */}
      <div className="p-5 rounded-3xl bg-white border-2 border-zinc-200 shadow-xs">
        <div className="flex items-center justify-between text-zinc-500 mb-2">
          <span className="text-xs font-bold tracking-wider uppercase">Water Held</span>
          <Droplets className="w-5 h-5 text-blue-600" />
        </div>
        <div className="text-2xl lg:text-3xl font-serif font-black text-zinc-900 tabular-nums">
          {formatGallons(tower.capacityGallons)}
        </div>
        <p className="text-sm font-semibold text-zinc-600 mt-1">
          {tower.capacityGallons.toLocaleString()} Gallons
        </p>
      </div>

      {/* 4. Location (City, State) */}
      <div className="p-5 rounded-3xl bg-white border-2 border-zinc-200 shadow-xs">
        <div className="flex items-center justify-between text-zinc-500 mb-2">
          <span className="text-xs font-bold tracking-wider uppercase">Location</span>
          <MapPin className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="text-xl lg:text-2xl font-serif font-bold text-zinc-900 leading-snug">
          {tower.city}, {tower.state}
        </div>
        <div className="mt-2">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${tower.name} ${tower.city} ${tower.state}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
