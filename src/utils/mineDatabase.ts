import { WorldMine, DepthCategory, MineralCategory, ElementalAffinity, PlanetaryRuler } from '../types';
import { WORLD_MINES } from '../data/mines';
import { generateExpandedWorldMines } from '../data/massiveMines';

const STORAGE_KEY_CUSTOM_MINES = 'subterranea_custom_uploaded_mines_v1';
const STORAGE_KEY_ACTIVE_PRESET = 'subterranea_mines_preset_v1';

export type MineDatasetPreset = 'curated50' | 'global2500' | 'global5000' | 'custom';

let cachedMines: WorldMine[] | null = null;

export function getCuratedMines(): WorldMine[] {
  return WORLD_MINES;
}

export function getGlobal5000Mines(): WorldMine[] {
  if (!cachedMines) {
    cachedMines = generateExpandedWorldMines(5000);
  }
  return cachedMines;
}

export function getGlobal2500Mines(): WorldMine[] {
  return getGlobal5000Mines();
}

export function getStoredCustomMines(): WorldMine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_MINES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading custom mines from localStorage', e);
    return [];
  }
}

export function saveStoredCustomMines(mines: WorldMine[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_MINES, JSON.stringify(mines));
  } catch (e) {
    console.error('Error saving custom mines to localStorage', e);
  }
}

export function getActiveDatasetPreset(): MineDatasetPreset {
  try {
    const p = localStorage.getItem(STORAGE_KEY_ACTIVE_PRESET) as MineDatasetPreset;
    if (p === 'curated50' || p === 'global2500' || p === 'global5000' || p === 'custom') return p;
  } catch {}
  return 'global5000'; // Default to the 5,000+ world mines database!
}

export function setActiveDatasetPreset(preset: MineDatasetPreset): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE_PRESET, preset);
  } catch {}
}

export function getActiveMines(): WorldMine[] {
  const preset = getActiveDatasetPreset();
  const custom = getStoredCustomMines();

  if (preset === 'custom' && custom.length > 0) {
    return custom;
  }

  if (preset === 'curated50') {
    return getCuratedMines();
  }

  // Otherwise global 5,000+
  const base5000 = getGlobal5000Mines();
  if (custom.length > 0) {
    // Merge custom mines at the front
    const customIds = new Set(custom.map((c) => c.id));
    return [...custom, ...base5000.filter((m) => !customIds.has(m.id))];
  }
  return base5000;
}

// ----------------------------------------------------
// Robust Parsers for Bulk Uploading Thousands of Mines
// ----------------------------------------------------

export interface ParseResult {
  success: boolean;
  mines: WorldMine[];
  errors: string[];
  totalRows: number;
}

const GODDESS_NAMES = [
  'Aurata', 'Cuprina', 'Argentia', 'Sedna', 'Pele', 'Gaia', 'Hydrargyra', 'Plutonia',
  'Halita', 'Smaragda', 'Sapphira', 'Cobaltina', 'Lithia', 'Urania', 'Titaness Rhea',
  'Ferrona', 'Opalina', 'Neodymia', 'Telluria', 'Cinnabara',
];

const SILHOUETTES: WorldMine['cartographicSilhouetteType'][] = [
  'goddess-enthroned',
  'sleeping-titaness',
  'dancing-nymph',
  'winged-angelic-strata',
  'veiled-oracle',
  'warrior-chthonic',
  'water-bearer-saline',
  'serpentine-alchemist',
];

function determineContinent(lat: number, lng: number): WorldMine['continent'] {
  if (lat < -60) return 'Polar/Antarctica';
  if (lat < 0 && lng > 100) return 'Oceania';
  if (lat > 10 && lng > -170 && lng < -50) return 'North America';
  if (lat < 15 && lng > -90 && lng < -30) return 'South America';
  if (lat > 35 && lng > -15 && lng < 45) return 'Europe';
  if (lat > -35 && lat < 38 && lng > -20 && lng < 55) return 'Africa';
  if (lat > 0 && lng > 50) return 'Asia';
  return 'Europe';
}

function determineDepthCategory(depth: number): DepthCategory {
  if (depth > 2500) return 'Ultra-Deep Abyss';
  if (depth > 500) return 'Subterranean Shaft';
  if (depth < 100) return 'Surface Open-Pit';
  return 'Subterranean Shaft';
}

function determineMineralCategory(mineral: string): MineralCategory {
  const m = mineral.toLowerCase();
  if (m.includes('gold') || m.includes('silver') || m.includes('platinum') || m.includes('palladium')) return 'Precious Metals';
  if (m.includes('diamond') || m.includes('ruby') || m.includes('emerald') || m.includes('sapphire') || m.includes('opal') || m.includes('jade')) return 'Noble Gems';
  if (m.includes('lithium') || m.includes('cobalt') || m.includes('copper') || m.includes('nickel') || m.includes('molybdenum')) return 'Battery & Modern Flux';
  if (m.includes('salt') || m.includes('halite') || m.includes('potash') || m.includes('boron') || m.includes('gypsum')) return 'Chthonic Salts';
  if (m.includes('uranium') || m.includes('thorium') || m.includes('pitchblende') || m.includes('radium')) return 'Atomic & Radiance';
  if (m.includes('iron') || m.includes('hematite') || m.includes('magnetite') || m.includes('zinc') || m.includes('lead') || m.includes('bauxite')) return 'Structural & Ferrous';
  if (m.includes('rare') || m.includes('neodymium') || m.includes('bastnäsite') || m.includes('tantalum') || m.includes('niobium')) return 'Rare Earths & Magnetics';
  return 'Alchemical & Vaporous';
}

function getMineralColor(mineral: string): string {
  const m = mineral.toLowerCase();
  if (m.includes('gold')) return '#FFD700';
  if (m.includes('silver')) return '#E0E7FF';
  if (m.includes('copper')) return '#B87333';
  if (m.includes('diamond')) return '#38BDF8';
  if (m.includes('lithium')) return '#A7F3D0';
  if (m.includes('cobalt')) return '#3B82F6';
  if (m.includes('emerald')) return '#10B981';
  if (m.includes('ruby')) return '#F43F5E';
  if (m.includes('uranium')) return '#22C55E';
  if (m.includes('iron')) return '#EA580C';
  if (m.includes('salt')) return '#E0F7FA';
  if (m.includes('opal')) return '#F472B6';
  return '#F59E0B';
}

export function parseCSVToMines(csvText: string): ParseResult {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) {
    return { success: false, mines: [], errors: ['File is empty.'], totalRows: 0 };
  }

  // Parse header
  const headerLine = lines[0];
  const delimiter = headerLine.includes('\t') ? '\t' : ',';
  const headers = headerLine.split(delimiter).map((h) => h.trim().toLowerCase().replace(/['"]/g, ''));

  // Find column indices
  const findCol = (candidates: string[]): number => {
    return headers.findIndex((h) => candidates.some((c) => h.includes(c)));
  };

  const nameIdx = findCol(['name', 'mine', 'site', 'title', 'deposit']);
  const latIdx = findCol(['lat', 'latitude', 'y']);
  const lngIdx = findCol(['lng', 'lon', 'longitude', 'x']);
  const mineralIdx = findCol(['mineral', 'commodity', 'ore', 'material', 'resource']);
  const countryIdx = findCol(['country', 'nation', 'region', 'state']);
  const depthIdx = findCol(['depth', 'meters', 'elevation']);
  const archetypeIdx = findCol(['archetype', 'deity', 'goddess', 'figure']);

  if (nameIdx === -1 || latIdx === -1 || lngIdx === -1) {
    return {
      success: false,
      mines: [],
      errors: [
        `Required columns not found in header. Found: [${headers.join(', ')}]. Please ensure your file has columns for Name, Latitude (lat), and Longitude (lng/lon).`,
      ],
      totalRows: lines.length - 1,
    };
  }

  const parsedMines: WorldMine[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i];
    // basic CSV split handling quotes
    const cols = row.split(delimiter).map((c) => c.trim().replace(/^["']|["']$/g, ''));
    if (cols.length < 3) continue;

    const rawName = cols[nameIdx] || `Uploaded Mine #${i}`;
    const lat = parseFloat(cols[latIdx]);
    const lng = parseFloat(cols[lngIdx]);

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      if (errors.length < 5) {
        errors.push(`Row ${i + 1}: Invalid lat/lng coordinates (${cols[latIdx]}, ${cols[lngIdx]})`);
      }
      continue;
    }

    const mineral = mineralIdx !== -1 && cols[mineralIdx] ? cols[mineralIdx] : 'Gold';
    const country = countryIdx !== -1 && cols[countryIdx] ? cols[countryIdx] : 'Unknown Region';
    const depth = depthIdx !== -1 && !isNaN(parseFloat(cols[depthIdx])) ? Math.abs(parseFloat(cols[depthIdx])) : 450 + ((i * 37) % 2000);
    const continent = determineContinent(lat, lng);
    const depthCat = determineDepthCategory(depth);
    const minCat = determineMineralCategory(mineral);
    const gName = archetypeIdx !== -1 && cols[archetypeIdx] ? cols[archetypeIdx] : `${GODDESS_NAMES[i % GODDESS_NAMES.length]} of ${country}`;
    const sil = SILHOUETTES[i % SILHOUETTES.length];

    parsedMines.push({
      id: `custom_${Date.now()}_${i}_${rawName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: rawName,
      location: country,
      country,
      continent,
      lat,
      lng,
      depthMeters: depth,
      depthCategory: depthCat,
      primaryMineral: mineral,
      secondaryMinerals: ['Quartz', 'Silica', 'Pyrite'],
      mineralCategory: minCat,
      elementalAffinity: (['Fire', 'Earth', 'Water', 'Air', 'Aether/Void'] as ElementalAffinity[])[i % 5],
      planetaryRuler: (['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'] as PlanetaryRuler[])[i % 10],
      arcanaArchetype: `The ${mineral} Lode of ${country}`,
      feminineArchetype: gName,
      cartoucheTitle: `MINA ${rawName.toUpperCase()} — LAT ${lat.toFixed(2)}`,
      cartographicSilhouetteType: sil,
      cartographicFigure: `The excavation contours of ${rawName} trace the personified silhouette of ${gName}. Her subterranean core holds veins of ${mineral} at -${depth}m.`,
      uprightMeaning: `High conductivity and unyielding manifestation through the earthy resonance of ${mineral}.`,
      invertedMeaning: `Subterranean stagnation, blocked hydrothermal flow, or over-extraction.`,
      mantleMessage: `Deep beneath ${country}, the living earth anchors the crystalline frequency of ${mineral}.`,
      historicalContext: `Mine site in ${country} at coordinates ${lat.toFixed(4)}, ${lng.toFixed(4)}.`,
      chthonicKeyword: mineral.toUpperCase().slice(0, 10),
      mineralColor: getMineralColor(mineral),
      discoveryYear: `${1900 + (i % 120)}`,
    });
  }

  return {
    success: parsedMines.length > 0,
    mines: parsedMines,
    errors,
    totalRows: lines.length - 1,
  };
}

export function parseJSONOrGeoJSON(jsonText: string): ParseResult {
  try {
    const data = JSON.parse(jsonText);
    const parsedMines: WorldMine[] = [];

    // Check if GeoJSON FeatureCollection
    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
      data.features.forEach((feat: any, idx: number) => {
        if (!feat.geometry || !feat.geometry.coordinates) return;
        const [lng, lat] = feat.geometry.coordinates;
        if (typeof lat !== 'number' || typeof lng !== 'number') return;

        const props = feat.properties || {};
        const name = props.name || props.NAME || props.site_name || props.deposit_name || `GeoJSON Deposit #${idx + 1}`;
        const mineral = props.mineral || props.commodity || props.mineral_name || props.COMMODITY || 'Gold';
        const country = props.country || props.COUNTRY || props.location || 'Unknown Region';
        const depth = typeof props.depth === 'number' ? props.depth : 500;

        parsedMines.push({
          id: `geojson_${Date.now()}_${idx}`,
          name,
          location: country,
          country,
          continent: determineContinent(lat, lng),
          lat,
          lng,
          depthMeters: depth,
          depthCategory: determineDepthCategory(depth),
          primaryMineral: mineral,
          secondaryMinerals: ['Pyrite', 'Quartz'],
          mineralCategory: determineMineralCategory(mineral),
          elementalAffinity: 'Earth',
          planetaryRuler: 'Sun',
          arcanaArchetype: `The ${mineral} Seam of ${country}`,
          feminineArchetype: `${GODDESS_NAMES[idx % GODDESS_NAMES.length]} of ${country}`,
          cartoucheTitle: `MINA ${name.toUpperCase()}`,
          cartographicSilhouetteType: SILHOUETTES[idx % SILHOUETTES.length],
          cartographicFigure: `The excavation contours of ${name} outline the personified anatomy of ${country}'s mineral spirit.`,
          uprightMeaning: `Crystalline manifestation and rich deposit resonance.`,
          invertedMeaning: `Turbulence in the bedrock or ungrounded energy.`,
          mantleMessage: `The mantle sustains the crystalline structure of ${mineral}.`,
          historicalContext: `GeoJSON deposit feature cataloged in ${country}.`,
          chthonicKeyword: mineral.toUpperCase().slice(0, 10),
          mineralColor: getMineralColor(mineral),
        });
      });

      return {
        success: parsedMines.length > 0,
        mines: parsedMines,
        errors: [],
        totalRows: data.features.length,
      };
    }

    // Standard JSON array of objects
    if (Array.isArray(data)) {
      data.forEach((item: any, idx: number) => {
        const name = item.name || item.title || item.mine || `Uploaded Mine #${idx + 1}`;
        const lat = parseFloat(item.lat ?? item.latitude ?? item.y);
        const lng = parseFloat(item.lng ?? item.lon ?? item.longitude ?? item.x);
        if (isNaN(lat) || isNaN(lng)) return;

        const mineral = item.primaryMineral || item.mineral || item.commodity || 'Gold';
        const country = item.country || item.location || 'Unknown';
        const depth = parseFloat(item.depthMeters ?? item.depth) || 500;

        parsedMines.push({
          id: item.id || `json_${Date.now()}_${idx}`,
          name,
          location: item.location || country,
          country,
          continent: item.continent || determineContinent(lat, lng),
          lat,
          lng,
          depthMeters: depth,
          depthCategory: item.depthCategory || determineDepthCategory(depth),
          primaryMineral: mineral,
          secondaryMinerals: item.secondaryMinerals || ['Quartz'],
          mineralCategory: item.mineralCategory || determineMineralCategory(mineral),
          elementalAffinity: item.elementalAffinity || 'Earth',
          planetaryRuler: item.planetaryRuler || 'Sun',
          arcanaArchetype: item.arcanaArchetype || `The ${mineral} Crucible`,
          feminineArchetype: item.feminineArchetype || `${GODDESS_NAMES[idx % GODDESS_NAMES.length]} of ${country}`,
          cartoucheTitle: item.cartoucheTitle || `MINA ${name.toUpperCase()}`,
          cartographicSilhouetteType: item.cartographicSilhouetteType || SILHOUETTES[idx % SILHOUETTES.length],
          cartographicFigure: item.cartographicFigure || `The excavation of ${name} outlines the mineral sovereign of ${country}.`,
          uprightMeaning: item.uprightMeaning || 'Earthy manifestation and deep fortitude.',
          invertedMeaning: item.invertedMeaning || 'Unvented heat and extraction friction.',
          mantleMessage: item.mantleMessage || 'The mantle endures.',
          historicalContext: item.historicalContext || `Deposit in ${country}.`,
          chthonicKeyword: item.chthonicKeyword || mineral.toUpperCase().slice(0, 10),
          mineralColor: item.mineralColor || getMineralColor(mineral),
          discoveryYear: item.discoveryYear || '19th Century',
        });
      });

      return {
        success: parsedMines.length > 0,
        mines: parsedMines,
        errors: [],
        totalRows: data.length,
      };
    }

    return {
      success: false,
      mines: [],
      errors: ['Unrecognized JSON format. Expected an array of mine objects or a GeoJSON FeatureCollection.'],
      totalRows: 0,
    };
  } catch (err: any) {
    return {
      success: false,
      mines: [],
      errors: [`JSON parse error: ${err.message || 'Invalid JSON syntax'}`],
      totalRows: 0,
    };
  }
}

// ----------------------------------------------------
// Export helpers for Google Drive & Local Files
// ----------------------------------------------------

export function exportMinesToCSV(mines: WorldMine[]): string {
  const headers = ['name', 'country', 'continent', 'lat', 'lng', 'depthMeters', 'primaryMineral', 'mineralCategory', 'elementalAffinity', 'planetaryRuler', 'feminineArchetype'];
  const rows = mines.map((m) =>
    [
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.country.replace(/"/g, '""')}"`,
      `"${m.continent}"`,
      m.lat,
      m.lng,
      m.depthMeters,
      `"${m.primaryMineral.replace(/"/g, '""')}"`,
      `"${m.mineralCategory}"`,
      `"${m.elementalAffinity}"`,
      `"${m.planetaryRuler}"`,
      `"${m.feminineArchetype.replace(/"/g, '""')}"`,
    ].join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

export function exportMinesToGeoJSON(mines: WorldMine[]): string {
  const geojson = {
    type: 'FeatureCollection',
    features: mines.map((m) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [m.lng, m.lat],
      },
      properties: {
        id: m.id,
        name: m.name,
        country: m.country,
        continent: m.continent,
        depthMeters: m.depthMeters,
        primaryMineral: m.primaryMineral,
        mineralCategory: m.mineralCategory,
        elementalAffinity: m.elementalAffinity,
        planetaryRuler: m.planetaryRuler,
        feminineArchetype: m.feminineArchetype,
        chthonicKeyword: m.chthonicKeyword,
      },
    })),
  };
  return JSON.stringify(geojson, null, 2);
}
