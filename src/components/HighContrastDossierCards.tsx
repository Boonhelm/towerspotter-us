import React from 'react';
import { Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import { WaterTower } from '../types/tower.ts';

interface HighContrastDossierCardsProps {
  tower: WaterTower;
  discoveredTrivia?: Record<string, boolean>;
  onToggleTrivia?: (towerId: string, index: number) => void;
}

export const HighContrastDossierCards: React.FC<HighContrastDossierCardsProps> = ({
  tower
}) => {
  // Only display the first 2 cool things to know
  const topTwoTrivia = (tower.triviaLore || []).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* 1. Fun Fact Banner (Warm Peach/Terracotta) */}
      <section
        className="rounded-3xl p-6 sm:p-8 bg-[#FFF5F0] border-2 border-[#F8BCA0] text-[#5C230C] shadow-xs"
        aria-labelledby="banner-fun-fact-title"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D8] text-[#A63A12] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Fun Fact</span>
          </div>
        </div>

        <h3 id="banner-fun-fact-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#451705] leading-snug">
          "{tower.funFact}"
        </h3>
      </section>

      {/* 2. The Story (Warm Parchment) - Full Width Story Card */}
      <section
        className="rounded-3xl p-6 sm:p-8 bg-[#FAF6EE] border-2 border-[#E8DFC9] text-[#3E3426] shadow-xs flex flex-col justify-between"
        aria-labelledby="card-story-title"
      >
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2.5 rounded-xl bg-[#EDE4D0] text-[#846328]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 id="card-story-title" className="text-xl sm:text-2xl font-serif font-bold text-[#2A2216]">
                The Story
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#7A6445]">
                How and Why It Was Built
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-[#3B3020] font-medium my-3">
            {tower.heritageHistory}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E8DFC9] text-xs sm:text-sm font-bold text-[#7A6445]">
          Built for {tower.city}, {tower.stateFullName || tower.state}
        </div>
      </section>

      {/* 3. Cool Things to Know (Emerald Green) - Exactly 2 items, NO radio buttons */}
      <section
        className="rounded-3xl p-6 sm:p-8 bg-[#F0FAF4] border-2 border-[#A3E3BD] text-[#0E4626] shadow-xs"
        aria-labelledby="card-trivia-title"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2.5 rounded-xl bg-[#D2F4E1] text-[#0F753C]">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 id="card-trivia-title" className="text-xl sm:text-2xl font-serif font-bold text-[#08331A]">
              Cool Things to Know
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#1E693D]">
              Two fascinating facts about this water tower
            </p>
          </div>
        </div>

        {/* Clean, high-contrast fact cards (No radio buttons or checkboxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topTwoTrivia.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#A3E3BD] shadow-xs flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-xl bg-[#D2F4E1] text-[#0F753C] flex items-center justify-center font-serif font-black text-sm shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-base sm:text-lg leading-relaxed font-semibold text-[#08331A]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
