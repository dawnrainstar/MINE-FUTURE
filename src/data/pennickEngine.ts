/**
 * PENNICK SACRED GEOMETRY & EARTH-MYSTERY ENGINE
 * Nigel Pennick geomantic shape dynamics & healing pattern calculations.
 */

import { WorldMine } from '../types';

export interface GeometricPattern {
  id: string;
  name: string;
  symbol: string;
  coreDistortion: string;
  svgType:
    | 'triangle'
    | 'spiral'
    | 'grid'
    | 'fracture'
    | 'circle'
    | 'line'
    | 'wave'
    | 'hexagon'
    | 'cube'
    | 'tetrahedron'
    | 'fractal'
    | 'labyrinth'
    | 'crossroads';
  description: string;
  healingRemedy: string;
  motionDirective: string;
  resonanceHarmonic: string;
  color: string;
}

export const GEOMETRIC_PATTERNS: Record<string, GeometricPattern> = {
  triangle: {
    id: 'triangle',
    name: 'Triangulation of Tension',
    symbol: '△',
    coreDistortion: 'Binary Polar Conflict',
    svgType: 'triangle',
    description: 'Three points of opposing force converging at a single fulcrum.',
    healingRemedy: 'Ground through a stable third mineral anchor to break binary opposition.',
    motionDirective: 'Ascend inward from the vertices to the center apex.',
    resonanceHarmonic: '528 Hz - Transformation & Miracles',
    color: '#f59e0b',
  },
  spiral: {
    id: 'spiral',
    name: 'Logarithmic Evolutionary Spiral',
    symbol: '꩜',
    coreDistortion: 'Perceived Stagnation / Looping',
    svgType: 'spiral',
    description: 'Cyclical return to origins at higher vibrational octave.',
    healingRemedy: 'Accept recursive life themes as ascending expansion rather than stagnation.',
    motionDirective: 'Trace outward from the nucleus to outer space.',
    resonanceHarmonic: '432 Hz - Earth Natural Frequency',
    color: '#10b981',
  },
  grid: {
    id: 'grid',
    name: 'Orthogonal Structural Grid',
    symbol: '⊞',
    coreDistortion: 'Rigid Mental Armor',
    svgType: 'grid',
    description: 'Rigid orthogonal boundaries requiring intentional organic flexibility.',
    healingRemedy: 'Introduce serpentine curved action into strict routines.',
    motionDirective: 'Flow diagonally across rigid cross-junctions.',
    resonanceHarmonic: '639 Hz - Harmonic Balance & Relationships',
    color: '#06b6d4',
  },
  fracture: {
    id: 'fracture',
    name: 'Seismic Stress Fracture & Kintsugi Vein',
    symbol: '⚡',
    coreDistortion: 'Unprocessed Heart Shock',
    svgType: 'fracture',
    description: 'Tectonic break in the mantle where light enters the mineral core.',
    healingRemedy: 'Infill emotional fissures with gold hydrothermal resin (self-compassion).',
    motionDirective: 'Trace the fault line with illuminating gold energy.',
    resonanceHarmonic: '741 Hz - Awakening Intuition & Cleanse',
    color: '#eab308',
  },
  circle: {
    id: 'circle',
    name: 'Ouroboric Solar Enclosure',
    symbol: '☉',
    coreDistortion: 'Repetitive Habituation',
    svgType: 'circle',
    description: 'Wholeness, unbroken continuity, and containment of sacred power.',
    healingRemedy: 'Break out of looping habits through deliberate tangential steps.',
    motionDirective: 'Rotate clockwise to gather force, counter-clockwise to dissolve.',
    resonanceHarmonic: '852 Hz - Spiritual Order & Clarity',
    color: '#3b82f6',
  },
  hexagon: {
    id: 'hexagon',
    name: 'Beryl Hexagonal Matrix',
    symbol: '⬡',
    coreDistortion: 'Diffused Multidirectional Energy',
    svgType: 'hexagon',
    description: 'Optimal crystal efficiency and sacred honeycomb symmetry.',
    healingRemedy: 'Align personal purpose with natural planetary geometry.',
    motionDirective: 'Pulsate synchronously across six axes.',
    resonanceHarmonic: '963 Hz - Divine Harmony & Mantle Awakening',
    color: '#8b5cf6',
  },
  crossroads: {
    id: 'crossroads',
    name: 'Geomantic Decisive Crossroads',
    symbol: '✛',
    coreDistortion: 'Paralyzing Ambivalence',
    svgType: 'crossroads',
    description: 'Intersection of cardinal mineral ley lines requiring decisive alignment.',
    healingRemedy: 'Cast out hesitation; the earth supports decisive commitment.',
    motionDirective: 'Stand centered at the nexus before stepping forward.',
    resonanceHarmonic: '396 Hz - Liberation from Guilt & Fear',
    color: '#ec4899',
  },
};

export interface DateGeometricProfile {
  targetDate: string;
  dayOfYear: number;
  solarPhaseAngleDeg: number;
  harmonicResonanceHz: string;
  astronomicalStation: string;
  geometricFigure: string;
  geometricSymbol: string;
  planetaryResonance: string;
  elementalTide: string;
  mantleGeometryVector: string;
  chthonicFormula: string;
}

/**
 * Calculates the exact sacred geometry determined by the date.
 * Everything in the prophecy is anchored to this geometric matrix of time.
 */
export function calculateDateGeometry(targetDateStr: string): DateGeometricProfile {
  const d = new Date(targetDateStr || new Date().toISOString().split('T')[0]);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.max(1, Math.floor((d.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)));
  const solarPhaseAngleDeg = Math.round(((dayOfYear / 365.25) * 360) % 360);

  // Astronomical stations based on solar angle
  let astronomicalStation = 'Orbital Equinoctial Gate';
  let geometricFigure = 'Harmonic Triangle of Synthesis';
  let geometricSymbol = '△';
  let planetaryResonance = 'Solar-Plutonic Subterranean Core';
  let elementalTide = 'Earth-Fire Hydrothermal Flow';
  let hz = '528 Hz (Sovereign Transformation)';
  let vector = 'Inward Helical Compression (1.618 Golden Ratio)';
  let formula = `Φ(${dayOfYear}/365.25) × ∇(Mantle Seam Depth) = Synchronous Convergence`;

  if (solarPhaseAngleDeg >= 345 || solarPhaseAngleDeg < 15) {
    astronomicalStation = 'Vernal Equinox Portal (Zero Degree Aries Zero)';
    geometricFigure = 'Ouroboric Solar Enclosure';
    geometricSymbol = '☉';
    planetaryResonance = 'Mars-Sun Ignition Meridian';
    elementalTide = 'Primordial Fire & Native Gold';
    hz = '432 Hz (Earth Fundamental Grounding)';
    vector = 'Centrifugal Radiative Expansion';
    formula = `λ(0°) + Gold Vein Latitude = Tectonic Spark`;
  } else if (solarPhaseAngleDeg >= 75 && solarPhaseAngleDeg < 105) {
    astronomicalStation = 'Summer Solstice Zenith (Maximum Solar Elevation)';
    geometricFigure = 'Beryl Hexagonal Matrix';
    geometricSymbol = '⬡';
    planetaryResonance = 'Sun-Jupiter Crystal Apex';
    elementalTide = 'Ethereal Light & Radiant Quartz';
    hz = '963 Hz (Crown Mantle Awakening)';
    vector = 'Six-Fold Hexagonal Pulsation';
    formula = `θ(90°) × Hexagonal Beryl Lattice = High-Voltage Clarity`;
  } else if (solarPhaseAngleDeg >= 165 && solarPhaseAngleDeg < 195) {
    astronomicalStation = 'Autumnal Equinox Crossing (Equilibrium & Harvest)';
    geometricFigure = 'Geomantic Decisive Crossroads';
    geometricSymbol = '✛';
    planetaryResonance = 'Venus-Saturn Crystalline Gate';
    elementalTide = 'Abyssal Water & Native Silver';
    hz = '639 Hz (Harmonic Tectonic Balance)';
    vector = 'Orthogonal Cardinal Ley Convergence';
    formula = `λ(180°) ∩ Tectonic Plate Boundary = Destiny Pivot`;
  } else if (solarPhaseAngleDeg >= 255 && solarPhaseAngleDeg < 285) {
    astronomicalStation = 'Winter Solstice Nadir (Deepest Mantle Stillness)';
    geometricFigure = 'Seismic Stress Fracture & Kintsugi Vein';
    geometricSymbol = '⚡';
    planetaryResonance = 'Saturn-Pluto Abyssal Singularity';
    elementalTide = 'Dense Black Tourmaline & Earth Core';
    hz = '741 Hz (Deep Intuition & Core Awakening)';
    vector = 'Centripetal Core Compression';
    formula = `θ(270°) / Mantle Resistance = Breakthrough Crystallization`;
  } else if ((solarPhaseAngleDeg >= 15 && solarPhaseAngleDeg < 75) || (solarPhaseAngleDeg >= 195 && solarPhaseAngleDeg < 255)) {
    geometricFigure = 'Logarithmic Evolutionary Spiral';
    geometricSymbol = '꩜';
    planetaryResonance = 'Mercury-Uranus Dynamic Orbit';
    elementalTide = 'Cupriferous Emerald Stream';
    hz = '528 Hz (Ascending Cellular Metamorphosis)';
    vector = 'Clockwise Golden Ratio Helix';
    formula = `e^(0.306θ) × Date Vector = Exponential Growth`;
  } else {
    geometricFigure = 'Triangulation of Tension & Resolution';
    geometricSymbol = '△';
    planetaryResonance = 'Neptune-Terra Mineral Bedrock';
    elementalTide = 'Hydrothermal Mineral Synthesis';
    hz = '852 Hz (Spiritual Order & Clairvoyance)';
    vector = 'Tri-Point Vertex Balance';
    formula = `Triangulation(Date, Seam, Coordinate) = 1.000`;
  }

  return {
    targetDate: targetDateStr,
    dayOfYear,
    solarPhaseAngleDeg,
    harmonicResonanceHz: hz,
    astronomicalStation,
    geometricFigure,
    geometricSymbol,
    planetaryResonance,
    elementalTide,
    mantleGeometryVector: vector,
    chthonicFormula: formula,
  };
}

/**
 * Detects the active geometric pattern based on drawn mines, primary minerals, and query keywords or date.
 */
export function detectGeometricPattern(
  mines: WorldMine[] | string,
  question: string = '',
  targetDate?: string
): GeometricPattern {
  if (targetDate) {
    const dateGeom = calculateDateGeometry(targetDate);
    if (dateGeom.geometricFigure.includes('Hexagonal')) return GEOMETRIC_PATTERNS.hexagon;
    if (dateGeom.geometricFigure.includes('Solar')) return GEOMETRIC_PATTERNS.circle;
    if (dateGeom.geometricFigure.includes('Crossroads')) return GEOMETRIC_PATTERNS.crossroads;
    if (dateGeom.geometricFigure.includes('Fracture')) return GEOMETRIC_PATTERNS.fracture;
    if (dateGeom.geometricFigure.includes('Spiral')) return GEOMETRIC_PATTERNS.spiral;
    if (dateGeom.geometricFigure.includes('Triangle')) return GEOMETRIC_PATTERNS.triangle;
  }
  let q = question.toLowerCase();
  let primaryMineral = '';

  if (typeof mines === 'string') {
    q += ' ' + mines.toLowerCase();
  } else if (Array.isArray(mines) && mines.length > 0) {
    primaryMineral = mines[0]?.primaryMineral?.toLowerCase() || '';
  }

  if (q.includes('choice') || q.includes('decision') || q.includes('crossroad') || q.includes('path')) {
    return GEOMETRIC_PATTERNS.crossroads;
  }
  if (q.includes('heal') || q.includes('broken') || q.includes('wound') || q.includes('pain') || q.includes('grief')) {
    return GEOMETRIC_PATTERNS.fracture;
  }
  if (q.includes('change') || q.includes('growth') || q.includes('evolve') || q.includes('next')) {
    return GEOMETRIC_PATTERNS.spiral;
  }
  if (q.includes('order') || q.includes('structure') || q.includes('work') || q.includes('routine')) {
    return GEOMETRIC_PATTERNS.grid;
  }

  if (primaryMineral.includes('gold') || primaryMineral.includes('sun') || primaryMineral.includes('pyrite')) {
    return GEOMETRIC_PATTERNS.circle;
  }
  if (primaryMineral.includes('emerald') || primaryMineral.includes('copper') || primaryMineral.includes('malachite')) {
    return GEOMETRIC_PATTERNS.spiral;
  }
  if (primaryMineral.includes('silver') || primaryMineral.includes('beryl') || primaryMineral.includes('diamond')) {
    return GEOMETRIC_PATTERNS.hexagon;
  }

  return GEOMETRIC_PATTERNS.triangle;
}
