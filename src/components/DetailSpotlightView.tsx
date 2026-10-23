import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import { WaterTower } from '../types/tower.ts';
import { FourColumnSpecs } from './FourColumnSpecs.tsx';
import { HighContrastDossierCards } from './HighContrastDossierCards.tsx';
import { AudioNarrationPlayer } from './AudioNarrationPlayer.tsx';
import { FullScreenLightbox } from './FullScreenLightbox.tsx';
import { TowerSilhouetteSvg } from './TowerSilhouetteSvg.tsx';

interface DetailSpotlightViewProps {
  tower: WaterTower;
  totalCount: number;
  onPrevTower: () => void;
  onNextTower: () => void;
  discoveredTrivia: Record<string, boolean>;
  onToggleTrivia: (towerId: string, index: number) => void;
}

export const DetailSpotlightView: React.FC<DetailSpotlightViewProps> = ({
  tower,
  totalCount,
  onPrevTower,
  onNextTower,
  discoveredTrivia,
  onToggleTrivia
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [imgHasError, setImgHasError] = useState(false);

  // Reset photo index and error when tower changes
  useEffect(() => {
    setPhotoIndex(0);
    setImgHasError(false);
  }, [tower.id]);

  useEffect(() => {
    setImgHasError(false);
  }, [photoIndex]);

  const photos = tower.photos && tower.photos.length > 0 ? tower.photos : [
    {
      url: '',
      caption: `${tower.name} in ${tower.city}, ${tower.state}`,
      credit: `Sam's WaterTower Catalog Archive`
    }
  ];

  const currentPhoto = photos[photoIndex] || photos[0];

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Main Navigation Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-zinc-100 border-2 border-zinc-200">
        <button
          onClick={onPrevTower}
          className="flex-1 flex items-center justify-center gap-1 sm:gap-2.5 py-2.5 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-white hover:bg-zinc-50 text-zinc-900 border-2 border-zinc-300 font-bold text-xs sm:text-base lg:text-lg shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer"
          aria-label="Previous Water Tower"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-sky-700 shrink-0" />
          <span className="hidden xs:inline sm:inline">Previous Tower</span>
          <span className="xs:hidden sm:hidden">Previous</span>
        </button>

        <div className="text-center px-1 sm:px-4 shrink-0">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500">
            Water Tower
          </div>
          <div className="text-base sm:text-2xl lg:text-3xl font-serif font-black text-sky-800 tabular-nums leading-tight">
            #{tower.number} <span className="text-[11px] sm:text-xs font-sans font-normal text-zinc-500 block sm:inline">of {totalCount}</span>
          </div>
        </div>

        <button
          onClick={onNextTower}
          className="flex-1 flex items-center justify-center gap-1 sm:gap-2.5 py-2.5 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-base lg:text-lg shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          aria-label="Next Water Tower"
        >
          <span className="hidden xs:inline sm:inline">Next Tower</span>
          <span className="xs:hidden sm:hidden">Next</span>
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 shrink-0" />
        </button>
      </div>

      {/* Tower Title & Location */}
      <div className="text-center sm:text-left border-b-2 border-zinc-200 pb-5">
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-zinc-900 tracking-tight">
          {tower.name}
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-sky-800 mt-1">
          {tower.city}, {tower.stateFullName} · Built in {tower.yearBuilt}
        </p>
      </div>

      {/* Large Picture Container */}
      <div className="space-y-3">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border-2 border-zinc-300 shadow-xl group">
          {/* Main Large Photo */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full aspect-4/3 sm:aspect-[16/11] lg:aspect-[16/10] min-h-[420px] sm:min-h-[600px] lg:min-h-[720px] max-h-[820px] cursor-zoom-in overflow-hidden flex items-center justify-center bg-zinc-900"
            title="Click picture to enlarge"
          >
            {currentPhoto.url && !imgHasError ? (
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption || tower.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-101"
                referrerPolicy="no-referrer"
                onError={() => setImgHasError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-900 text-zinc-400">
                <TowerSilhouetteSvg category={tower.category} name={tower.name} className="w-56 h-56 sm:w-72 sm:h-72 opacity-70" />
                <p className="mt-4 text-xl sm:text-2xl font-serif font-medium text-zinc-300">
                  {tower.name}
                </p>
              </div>
            )}

            {/* Bottom Scrim for Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            {/* Enlarge Picture Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/75 hover:bg-black text-white text-sm font-bold border border-white/30 backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer"
              aria-label="Enlarge picture to full screen"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Enlarge Picture</span>
            </button>

            {/* Picture Caption & Photo Counter */}
            <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
              <p className="text-base sm:text-xl font-bold text-white drop-shadow-md">
                {currentPhoto.caption || `${tower.name} in ${tower.city}, ${tower.state}`}
              </p>
              {currentPhoto.credit && (
                <p className="text-xs sm:text-sm text-zinc-300 drop-shadow-md mt-0.5">
                  Photo source: {currentPhoto.credit}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Previous Picture and Next Picture Buttons - ONLY rendered if more than 1 picture exists */}
        {photos.length > 1 && (
          <div className="flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3.5 rounded-2xl bg-zinc-100 border-2 border-zinc-200">
            <button
              onClick={handlePrevPhoto}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 border-2 border-zinc-300 font-bold text-xs sm:text-base shadow-xs transition-all active:scale-95 cursor-pointer"
              aria-label="Previous picture"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-sky-700 shrink-0" />
              <span className="hidden sm:inline">Previous Picture</span>
              <span className="sm:hidden">Prev Pic</span>
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base font-extrabold text-zinc-700 shrink-0">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-700" />
              <span>{photoIndex + 1} of {photos.length}</span>
            </div>

            <button
              onClick={handleNextPhoto}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-base shadow-xs transition-all active:scale-95 cursor-pointer"
              aria-label="Next picture"
            >
              <span className="hidden sm:inline">Next Picture</span>
              <span className="sm:hidden">Next Pic</span>
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 shrink-0" />
            </button>
          </div>
        )}
      </div>

      {/* Audio Narration Player ("Read Story Aloud") */}
      <AudioNarrationPlayer tower={tower} />

      {/* Specifications Cards */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-700">
          Water Tower Information
        </h3>
        <FourColumnSpecs tower={tower} />
      </div>

      {/* High-Contrast Section Cards */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-700">
          Story & Facts
        </h3>
        <HighContrastDossierCards
          tower={tower}
          discoveredTrivia={discoveredTrivia}
          onToggleTrivia={onToggleTrivia}
        />
      </div>

      {/* Bottom Large Previous & Next Tower Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-zinc-100 border-2 border-zinc-200">
        <button
          onClick={onPrevTower}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 px-3 sm:px-6 rounded-xl sm:rounded-2xl bg-white hover:bg-zinc-50 text-zinc-900 border-2 border-zinc-300 font-bold text-sm sm:text-lg lg:text-xl shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer min-h-[56px] sm:min-h-[64px]"
          aria-label="Go to previous tower"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-sky-700 shrink-0" />
          <span>Previous Tower</span>
        </button>

        <button
          onClick={onNextTower}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 px-3 sm:px-6 rounded-xl sm:rounded-2xl bg-sky-700 hover:bg-sky-800 text-white border-2 border-sky-700 hover:border-sky-800 font-bold text-sm sm:text-lg lg:text-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer min-h-[56px] sm:min-h-[64px]"
          aria-label="Go to next tower"
        >
          <span>Next Tower</span>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
        </button>
      </div>

      {/* Full-Screen Zoom Lightbox Modal */}
      <FullScreenLightbox
        photos={photos}
        towerName={tower.name}
        initialIndex={photoIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
};
