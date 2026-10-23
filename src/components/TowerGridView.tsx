import React from 'react';
import { Bookmark, Droplets, Ruler, Calendar, ArrowUpRight, SearchX } from 'lucide-react';
import { WaterTower } from '../types/tower.ts';
import { formatGallons } from '../utils/filterUtils.ts';
import { TowerSilhouetteSvg } from './TowerSilhouetteSvg.tsx';

interface TowerGridViewProps {
  towers: WaterTower[];
  currentTowerId: string;
  onSelectTower: (tower: WaterTower) => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onResetFilters: () => void;
}

export const TowerGridView: React.FC<TowerGridViewProps> = ({
  towers,
  currentTowerId,
  onSelectTower,
  bookmarkedIds,
  onToggleBookmark,
  onResetFilters
}) => {
  if (towers.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
          No Water Towers Found
        </h3>
        <p className="text-sm text-zinc-500 max-w-sm mt-1 mb-6">
          No towers match your current search query or category filter. Try clearing your filters to view all 140 towers.
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Expansive 4-5 Column Grid Across Full Window */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
        {towers.map((tower) => {
          const isSelected = tower.id === currentTowerId;
          const isBookmarked = bookmarkedIds.has(tower.id);
          const heroPhoto = tower.photos[0];

          return (
            <div
              key={tower.id}
              onClick={() => onSelectTower(tower)}
              className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-1 ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500/20'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              {/* Card Image / Silhouette Banner */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center">
                {heroPhoto?.url ? (
                  <img
                    src={heroPhoto.url}
                    alt={tower.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                ) : (
                  <div className="p-4 w-full h-full flex flex-col items-center justify-center text-zinc-400">
                    <TowerSilhouetteSvg category={tower.category} name={tower.name} className="w-24 h-24 opacity-60" />
                  </div>
                )}

                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Tower Number Badge */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                  #{tower.number}
                </span>

                {/* Bookmark Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => onToggleBookmark(tower.id, e)}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-xs transition-colors ${
                    isBookmarked
                      ? 'bg-rose-500 text-white'
                      : 'bg-black/50 text-white/80 hover:bg-black/80 hover:text-white'
                  }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark tower'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                {/* Bottom Card Title Overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-sky-200 block drop-shadow-sm">
                    {tower.city}, {tower.state}
                  </span>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-700 dark:group-hover:text-sky-400 line-clamp-1 transition-colors">
                    {tower.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                    {tower.style}
                  </p>
                </div>

                {/* Quick specs pill row */}
                <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                  <span className="flex items-center gap-1" title={`Built in ${tower.yearBuilt}`}>
                    <Calendar className="w-3 h-3 text-amber-500" />
                    <span>{tower.yearBuilt}</span>
                  </span>
                  <span className="flex items-center gap-1" title={`Height: ${tower.heightFt} ft`}>
                    <Ruler className="w-3 h-3 text-sky-500" />
                    <span>{tower.heightFt}ft</span>
                  </span>
                  <span className="flex items-center gap-1" title={`Capacity: ${formatGallons(tower.capacityGallons)}`}>
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span>{formatGallons(tower.capacityGallons)}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
