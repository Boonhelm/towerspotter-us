import type { WaterTower, TowerCategory } from '../types/tower.ts';

export type FilterCategory = 'All' | TowerCategory | 'My Bookmarks';

export function filterTowers(
  towers: WaterTower[],
  searchQuery: string,
  category: FilterCategory,
  bookmarkedIds: Set<string>
): WaterTower[] {
  const q = searchQuery.trim().toLowerCase();

  return towers.filter(tower => {
    // 1. Category check
    if (category === 'My Bookmarks') {
      if (!bookmarkedIds.has(tower.id)) return false;
    } else if (category === 'Historic (Pre-1940)') {
      // Must either belong to Historic category or be built before 1940
      if (tower.category !== 'Historic (Pre-1940)' && tower.yearBuilt >= 1940) {
        return false;
      }
    } else if (category !== 'All') {
      if (tower.category !== category) return false;
    }

    // 2. Search query check
    if (!q) return true;

    return (
      tower.name.toLowerCase().includes(q) ||
      tower.city.toLowerCase().includes(q) ||
      tower.state.toLowerCase().includes(q) ||
      tower.stateFullName.toLowerCase().includes(q) ||
      tower.style.toLowerCase().includes(q) ||
      tower.category.toLowerCase().includes(q) ||
      tower.tags.some(t => t.toLowerCase().includes(q))
    );
  });
}

// LocalStorage helpers for bookmarks
const BOOKMARKS_STORAGE_KEY = 'towerspotter_bookmarks_v1';

export function loadBookmarkedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return new Set(['gaffney-peachoid', 'brooks-catsup-bottle', 'chicago-historic-water-tower']);
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set(['gaffney-peachoid', 'brooks-catsup-bottle', 'chicago-historic-water-tower']);
  }
}

export function saveBookmarkedIds(ids: Set<string>): void {
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch (e) {
    console.error('Failed to save bookmarks to localStorage', e);
  }
}

// LocalStorage helpers for trivia lore checklist
const TRIVIA_CHECKLIST_KEY = 'towerspotter_trivia_lore_v1';

export function loadDiscoveredTrivia(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(TRIVIA_CHECKLIST_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function saveDiscoveredTrivia(data: Record<string, boolean>): void {
  try {
    localStorage.setItem(TRIVIA_CHECKLIST_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save trivia progress', e);
  }
}

// Format numbers nicely
export function formatGallons(gallons: number): string {
  if (gallons >= 1_000_000) {
    const millions = (gallons / 1_000_000).toFixed(1).replace(/\.0$/, '');
    return `${millions}M Gal`;
  }
  return `${gallons.toLocaleString()} Gal`;
}

export function formatHeight(heightFt: number): string {
  const meters = Math.round(heightFt * 0.3048);
  return `${heightFt} ft (${meters} m)`;
}
