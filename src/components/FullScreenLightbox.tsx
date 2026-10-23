import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { TowerPhoto } from '../types/tower.ts';

interface FullScreenLightboxProps {
  photos: TowerPhoto[];
  towerName: string;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const FullScreenLightbox: React.FC<FullScreenLightboxProps> = ({
  photos,
  towerName,
  initialIndex = 0,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, [initialIndex, isOpen]);

  // Keyboard navigation & Esc listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && photos.length > 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && photos.length > 1) {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % photos.length);
    handleResetZoom();
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
    handleResetZoom();
  };

  // Mouse pan drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white backdrop-blur-md select-none transition-all duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo lightbox for ${towerName}`}
      onMouseUp={handleMouseUp}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10 shrink-0">
        <div>
          <h3 className="text-base font-semibold tracking-wide text-zinc-100">{towerName}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {photos.length > 1 ? `Photo ${currentIndex + 1} of ${photos.length} · ` : ''}Zoom: {Math.round(zoomLevel * 100)}%
          </p>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 disabled:opacity-40 text-zinc-200 hover:text-white transition-colors"
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetZoom}
            disabled={zoomLevel === 1}
            className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 disabled:opacity-40 text-zinc-200 hover:text-white transition-colors"
            title="Reset Zoom (0)"
            aria-label="Reset Zoom"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors hidden sm:block"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 ml-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/50 text-red-200 hover:text-white transition-colors"
            title="Close Lightbox (Esc)"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Stage Viewport */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing p-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div
          className="transition-transform duration-100 ease-out flex items-center justify-center"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || towerName}
            className="max-h-[75vh] max-w-[90vw] object-contain rounded-md shadow-2xl pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Previous / Next buttons for multiple photos */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-sm transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-sm transition-all"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Caption Bar */}
      <div className="px-6 py-3 bg-black/70 border-t border-white/10 shrink-0 text-center">
        <p className="text-sm font-medium text-zinc-200">{currentPhoto.caption}</p>
        {currentPhoto.credit && (
          <p className="text-xs text-zinc-400 mt-1 italic">
            Credit: {currentPhoto.credit}
          </p>
        )}
      </div>
    </div>
  );
};
