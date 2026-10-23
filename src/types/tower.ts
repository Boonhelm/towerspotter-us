/**
 * TowerSpotter US - Core Types
 */

export type TowerCategory = 
  | 'Novelty & Giants'
  | 'Historic (Pre-1940)'
  | 'Standpipes'
  | 'Spheroids';

export interface TowerPhoto {
  url: string;
  caption: string;
  credit: string;
  isHero?: boolean;
}

export interface WaterTower {
  id: string;
  number: number; // 1 to 140
  name: string;
  city: string;
  state: string;
  stateFullName: string;
  yearBuilt: number;
  heightFt: number;
  capacityGallons: number;
  coordinates: string; // e.g. "35.0608° N, 81.6543° W"
  lat: number;
  lng: number;
  category: TowerCategory;
  style: string;
  material: string;
  structuralType: string;
  tankShape: string;
  designerOrBuilder: string;
  funFact: string; // Warm Peach/Terracotta Banner
  architecturalOverview: string; // Azure Blue Card
  heritageHistory: string; // Warm Parchment Card
  triviaLore: string[]; // Emerald Green Checklist
  photos: TowerPhoto[];
  tags: string[];
}

export type ViewMode = 'spotlight' | 'grid';
export type ThemeMode = 'day' | 'oled-night';
