import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_140_TOWERS } from './towersData.ts';
import { filterTowers, formatGallons, formatHeight } from './filterUtils.ts';

test('database contains exactly 140 authentic American water towers', () => {
  assert.equal(ALL_140_TOWERS.length, 140);

  // Check unique IDs
  const idSet = new Set(ALL_140_TOWERS.map(t => t.id));
  assert.equal(idSet.size, 140, 'All 140 tower IDs must be unique');

  // Check required fields on each tower
  for (const tower of ALL_140_TOWERS) {
    assert.ok(tower.name, `Tower ${tower.id} must have a name`);
    assert.ok(tower.city, `Tower ${tower.id} must have a city`);
    assert.ok(tower.state, `Tower ${tower.id} must have a state`);
    assert.ok(tower.yearBuilt > 1800, `Tower ${tower.id} year must be valid`);
    assert.ok(tower.heightFt > 30, `Tower ${tower.id} height must be valid`);
    assert.ok(tower.capacityGallons > 0, `Tower ${tower.id} capacity must be positive`);
    assert.ok(tower.coordinates.includes('°'), `Tower ${tower.id} coordinates formatted`);
    assert.ok(tower.funFact, `Tower ${tower.id} must have a fun fact`);
    assert.ok(tower.architecturalOverview, `Tower ${tower.id} must have architectural overview`);
    assert.ok(tower.heritageHistory, `Tower ${tower.id} must have heritage history`);
    assert.ok(Array.isArray(tower.triviaLore) && tower.triviaLore.length >= 2, `Tower ${tower.id} trivia lore`);
  }
});

test('filtering by search term finds matches across name, city, and state', () => {
  const bookmarks = new Set<string>();

  // Search by name
  const peachoidResults = filterTowers(ALL_140_TOWERS, 'Peachoid', 'All', bookmarks);
  assert.ok(peachoidResults.length >= 1);
  assert.equal(peachoidResults[0].id, 'gaffney-peachoid');

  // Search by city
  const collinsvilleResults = filterTowers(ALL_140_TOWERS, 'Collinsville', 'All', bookmarks);
  assert.ok(collinsvilleResults.length >= 1);
  assert.equal(collinsvilleResults[0].city, 'Collinsville');

  // Search by state abbreviation
  const scResults = filterTowers(ALL_140_TOWERS, 'SC', 'All', bookmarks);
  assert.ok(scResults.length >= 1);
});

test('category filtering properly segments towers', () => {
  const bookmarks = new Set(['gaffney-peachoid', 'brooks-catsup-bottle']);

  const noveltyTowers = filterTowers(ALL_140_TOWERS, '', 'Novelty & Giants', bookmarks);
  assert.ok(noveltyTowers.length > 5);
  for (const t of noveltyTowers) {
    assert.equal(t.category, 'Novelty & Giants');
  }

  const standpipes = filterTowers(ALL_140_TOWERS, '', 'Standpipes', bookmarks);
  assert.ok(standpipes.length > 5);
  for (const t of standpipes) {
    assert.equal(t.category, 'Standpipes');
  }

  const spheroids = filterTowers(ALL_140_TOWERS, '', 'Spheroids', bookmarks);
  assert.ok(spheroids.length > 5);
  for (const t of spheroids) {
    assert.equal(t.category, 'Spheroids');
  }

  const historic = filterTowers(ALL_140_TOWERS, '', 'Historic (Pre-1940)', bookmarks);
  assert.ok(historic.length > 5);
  for (const t of historic) {
    assert.ok(t.yearBuilt < 1940 || t.category === 'Historic (Pre-1940)');
  }

  const myBookmarks = filterTowers(ALL_140_TOWERS, '', 'My Bookmarks', bookmarks);
  assert.equal(myBookmarks.length, 2);
  assert.ok(myBookmarks.some(t => t.id === 'gaffney-peachoid'));
  assert.ok(myBookmarks.some(t => t.id === 'brooks-catsup-bottle'));
});

test('formatting utilities produce clean human-readable output', () => {
  assert.equal(formatGallons(1000000), '1M Gal');
  assert.equal(formatGallons(2500000), '2.5M Gal');
  assert.equal(formatGallons(150000), '150,000 Gal');
  assert.equal(formatHeight(135), '135 ft (41 m)');
});

test('every tower has valid photo URLs and accurate photo counts', () => {
  for (const tower of ALL_140_TOWERS) {
    assert.ok(tower.photos && tower.photos.length >= 1, `Tower ${tower.id} must have at least 1 photo`);
    for (const photo of tower.photos) {
      assert.ok(photo.url && photo.url.length > 5, `Tower ${tower.id} photo URL must be non-empty string`);
      assert.ok(photo.caption && photo.caption.length > 0, `Tower ${tower.id} photo must have a caption`);
    }
  }

  // Ensure single photo towers have exactly 1 photo so prev/next picture buttons don't appear
  const singlePhotoTowers = ALL_140_TOWERS.filter(t => t.photos.length === 1);
  assert.ok(singlePhotoTowers.length >= 130, 'Most towers must have exactly 1 photo so prev/next picture buttons are hidden');
});

