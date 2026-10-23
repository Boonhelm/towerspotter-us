import React from 'react';
import { TowerCategory } from '../types/tower.ts';

interface TowerSilhouetteProps {
  category: TowerCategory;
  name: string;
  className?: string;
  color?: string;
}

export const TowerSilhouetteSvg: React.FC<TowerSilhouetteProps> = ({
  category,
  name,
  className = 'w-full h-full',
  color = 'currentColor'
}) => {
  // Spheroid silhouette
  if (category === 'Spheroids') {
    return (
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M70 230H130M85 230V150C85 140 75 130 50 115C30 102 25 80 40 55C55 30 145 30 160 55C175 80 170 102 150 115C125 130 115 140 115 150V230"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Torus fluting and sphere ribs */}
        <ellipse cx="100" cy="72" rx="65" ry="32" stroke={color} strokeWidth="2.5" strokeDasharray="3 3" />
        <ellipse cx="100" cy="72" rx="72" ry="38" stroke={color} strokeWidth="3" />
        <path d="M100 34V110" stroke={color} strokeWidth="2" strokeDasharray="2 2" />
        <path d="M92 150V230M108 150V230" stroke={color} strokeWidth="1.5" opacity="0.6" />
        {/* Aircraft Beacon */}
        <circle cx="100" cy="28" r="3" fill="#EF4444" />
        <path d="M100 25V34" stroke={color} strokeWidth="2" />
      </svg>
    );
  }

  // Standpipe silhouette
  if (category === 'Standpipes') {
    return (
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Plinth */}
        <path d="M60 230H140M68 230V210H132V230" stroke={color} strokeWidth="3" strokeLinejoin="round" />
        {/* Cylindrical or octagonal shaft */}
        <path d="M72 210V50H128V210" stroke={color} strokeWidth="3.5" />
        {/* Crenellated Parapet / Cornice */}
        <path d="M66 50H134M66 50V36H74V42H86V36H94V42H106V36H114V42H126V36H134V50" stroke={color} strokeWidth="2.5" />
        {/* Conical Roof & Finial */}
        <path d="M74 36L100 12L126 36" stroke={color} strokeWidth="3" strokeLinejoin="round" />
        <path d="M100 12V4" stroke={color} strokeWidth="2" />
        <circle cx="100" cy="4" r="2.5" fill={color} />
        {/* Arched Arrow-loop windows */}
        <path d="M96 80V94H104V80C104 77 96 77 96 80Z" stroke={color} strokeWidth="2" />
        <path d="M96 120V134H104V120C104 117 96 117 96 120Z" stroke={color} strokeWidth="2" />
        <path d="M96 160V174H104V160C104 157 96 157 96 160Z" stroke={color} strokeWidth="2" />
      </svg>
    );
  }

  // Historic Victorian Gothic / Multi-column
  if (category === 'Historic (Pre-1940)') {
    return (
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Foundation & Base */}
        <path d="M50 230H150M60 230V190H140V230" stroke={color} strokeWidth="3" />
        {/* Turreted Castle parapet */}
        <path d="M64 190V70H136V190" stroke={color} strokeWidth="3" />
        {/* Corner Bartizans */}
        <path d="M56 100V60H66V100" stroke={color} strokeWidth="2" />
        <path d="M134 100V60H144V100" stroke={color} strokeWidth="2" />
        {/* Gothic Spire */}
        <path d="M64 70L100 18L136 70" stroke={color} strokeWidth="3" strokeLinejoin="round" />
        <path d="M100 18V6" stroke={color} strokeWidth="2" />
        <path d="M96 10H104" stroke={color} strokeWidth="2" />
        {/* Arched lancet windows and trefoils */}
        <path d="M94 110V135H106V110C106 104 94 104 94 110Z" stroke={color} strokeWidth="2" />
        <path d="M94 150V175H106V150C106 144 94 144 94 150Z" stroke={color} strokeWidth="2" />
        <circle cx="100" cy="50" r="8" stroke={color} strokeWidth="2" />
      </svg>
    );
  }

  // Novelty & Giants (Peachoid, Catsup, Teapot, Coffee pot, etc.)
  const isFruit = name.toLowerCase().includes('peach') || name.toLowerCase().includes('apple') || name.toLowerCase().includes('berry');
  const isBottle = name.toLowerCase().includes('bottle') || name.toLowerCase().includes('catsup');

  if (isBottle) {
    return (
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        {/* Trestle Legs */}
        <path d="M50 230L82 120M150 230L118 120M94 230V120M106 230V120" stroke={color} strokeWidth="2.5" />
        <path d="M64 175H136M73 145H127" stroke={color} strokeWidth="2" />
        <path d="M50 230L127 145M150 230L73 145" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        {/* Bottle Body */}
        <path d="M80 120V60C80 45 92 35 92 25H108C108 35 120 45 120 60V120H80Z" stroke={color} strokeWidth="3" strokeLinejoin="round" />
        {/* Bottle Cap */}
        <rect x="90" y="16" width="20" height="9" rx="2" stroke={color} strokeWidth="2.5" fill="none" />
      </svg>
    );
  }

  if (isFruit) {
    return (
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        {/* Support columns */}
        <path d="M60 230L85 130M140 230L115 130M95 230V130M105 230V130" stroke={color} strokeWidth="2.5" />
        <path d="M72 180H128" stroke={color} strokeWidth="2" />
        {/* Peach / Fruit Body with Cleft */}
        <path
          d="M100 55C75 40 45 60 45 95C45 135 90 148 100 152C110 148 155 135 155 95C155 60 125 40 100 55Z"
          stroke={color}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Natural cleft crease */}
        <path d="M100 55C92 80 92 120 100 152" stroke={color} strokeWidth="2.5" strokeDasharray="2 2" />
        {/* Stem and giant leaf */}
        <path d="M100 55C102 38 108 26 114 20" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M112 28C130 18 145 28 140 44C128 46 116 38 112 28Z" stroke="#22C55E" strokeWidth="2.5" fill="#22C55E" fillOpacity="0.3" />
      </svg>
    );
  }

  // Default Giant Novelty / Cup / Teapot
  return (
    <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M60 230L82 140M140 230L118 140M100 230V140" stroke={color} strokeWidth="2.5" />
      <ellipse cx="100" cy="140" rx="35" ry="8" stroke={color} strokeWidth="2" />
      {/* Kettle / Pot Body */}
      <path d="M70 140C60 120 60 80 80 65H120C140 80 140 120 130 140" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      {/* Spout and Handle */}
      <path d="M68 95L48 65H42V72L64 112" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M125 72C150 72 155 125 125 128" stroke={color} strokeWidth="3" />
      <path d="M80 65L100 48L120 65" stroke={color} strokeWidth="2.5" />
      <circle cx="100" cy="45" r="4" fill={color} />
    </svg>
  );
};
