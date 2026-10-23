/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ALL_140_TOWERS } from './utils/towersData.ts';
import { loadDiscoveredTrivia, saveDiscoveredTrivia } from './utils/filterUtils.ts';
import { TopDesktopToolbar } from './components/TopDesktopToolbar.tsx';
import { DetailSpotlightView } from './components/DetailSpotlightView.tsx';

export default function App() {
  // Current tower index (0 to 139)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [discoveredTrivia, setDiscoveredTrivia] = useState<Record<string, boolean>>(() => loadDiscoveredTrivia());

  // Trivia checklist handler
  const handleToggleTrivia = useCallback((towerId: string, index: number) => {
    const key = `${towerId}-trivia-${index}`;
    setDiscoveredTrivia((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveDiscoveredTrivia(next);
      return next;
    });
  }, []);

  const totalCount = ALL_140_TOWERS.length;
  const currentTower = ALL_140_TOWERS[currentIndex] || ALL_140_TOWERS[0];

  // Simple, accessible Previous & Next Tower controls
  const handlePrevTower = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCount) % totalCount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalCount]);

  const handleNextTower = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalCount]);

  // Keyboard navigation: Left Arrow = Previous Tower, Right Arrow = Next Tower
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevTower();
      } else if (e.key === 'ArrowRight') {
        handleNextTower();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevTower, handleNextTower]);

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 flex flex-col">
      {/* Accessible Top Bar */}
      <TopDesktopToolbar
        currentNumber={currentIndex + 1}
        totalCount={totalCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">
        <DetailSpotlightView
          tower={currentTower}
          totalCount={totalCount}
          onPrevTower={handlePrevTower}
          onNextTower={handleNextTower}
          discoveredTrivia={discoveredTrivia}
          onToggleTrivia={handleToggleTrivia}
        />
      </main>

      {/* Simple Footer */}
      <footer className="w-full border-t-2 border-zinc-200 bg-white py-6 px-4 text-center text-sm font-semibold text-zinc-600">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="font-serif font-bold text-zinc-900">Sam's WaterTower Catalog</span>
          <span>·</span>
          <span>140 American Water Towers</span>
          <span>·</span>
          <span>Press Left or Right Arrow keys to flip through towers</span>
        </div>
      </footer>
    </div>
  );
}
