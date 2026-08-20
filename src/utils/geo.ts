import { WorldMine } from '../types';

export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function latLngToMapCoords(lat: number, lng: number): { x: number; y: number } {
  // Equirectangular / Miller-style projection mapping to 0..100%
  const x = ((lng + 180) / 360) * 100;
  // Lat range -70 to 80 clipped for visual balance
  const clampedLat = Math.max(-65, Math.min(75, lat));
  const y = ((75 - clampedLat) / 140) * 100;
  return { x, y };
}

export function mapCoordsToLatLng(xNorm: number, yNorm: number): { lat: number; lng: number } {
  const lng = xNorm * 360 - 180;
  const lat = 75 - yNorm * 140;
  return { lat, lng };
}

export function findNearestMine(
  lat: number,
  lng: number,
  allMines: WorldMine[]
): { mine: WorldMine; distanceKm: number } {
  let nearest = allMines[0];
  let minDistance = Infinity;

  for (const mine of allMines) {
    const dist = calculateHaversineDistance(lat, lng, mine.lat, mine.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = mine;
    }
  }

  return { mine: nearest, distanceKm: minDistance };
}

// Major tectonic fault lines for esoteric overlay
export const TECTONIC_PLATES_PATHS = [
  // Pacific Ring of Fire segment
  [
    { lat: 60, lng: -140 },
    { lat: 50, lng: -130 },
    { lat: 35, lng: -120 },
    { lat: 15, lng: -100 },
    { lat: -10, lng: -80 },
    { lat: -35, lng: -72 },
    { lat: -55, lng: -70 },
  ],
  // Mid-Atlantic Ridge
  [
    { lat: 70, lng: -10 },
    { lat: 50, lng: -30 },
    { lat: 25, lng: -45 },
    { lat: 0, lng: -25 },
    { lat: -30, lng: -15 },
    { lat: -55, lng: 0 },
  ],
  // Alpine-Himalayan belt
  [
    { lat: 38, lng: -9 },
    { lat: 42, lng: 14 },
    { lat: 38, lng: 35 },
    { lat: 32, lng: 65 },
    { lat: 28, lng: 85 },
    { lat: 10, lng: 105 },
    { lat: -5, lng: 125 },
    { lat: -25, lng: 135 },
  ],
  // Great African Rift
  [
    { lat: 30, lng: 33 },
    { lat: 12, lng: 42 },
    { lat: -3, lng: 36 },
    { lat: -15, lng: 35 },
    { lat: -26, lng: 30 },
  ],
];
