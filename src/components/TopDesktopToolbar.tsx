import React from 'react';
import { Droplets } from 'lucide-react';

interface SimpleTopBarProps {
  currentNumber: number;
  totalCount: number;
  towerName?: string;
  onPrevTower?: () => void;
  onNextTower?: () => void;
}

export const TopDesktopToolbar: React.FC<SimpleTopBarProps> = ({
  currentNumber,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-200 shadow-xs">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        {/* Brand / App Title - Compact horizontal layout */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-sky-700 text-white flex items-center justify-center shadow-xs shrink-0">
            <Droplets className="w-4.5 h-4.5" />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg font-serif font-extrabold text-zinc-900 tracking-tight truncate">
              Sam's WaterTower Catalog
            </h1>
          </div>
        </div>

        {/* Current Catalog Progress Badge - Compact */}
        <div className="shrink-0">
          <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 font-bold text-[11px] sm:text-xs tracking-tight shadow-xs whitespace-nowrap">
            Tower {currentNumber} of {totalCount}
          </span>
        </div>
      </div>
    </header>
  );
};
