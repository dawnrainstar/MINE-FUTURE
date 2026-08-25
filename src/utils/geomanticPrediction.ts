/**
 * GEOMANTIC PREDICTION MODULE
 * Subterranea × Pennick Earth-Mystery Engine
 */

export interface GeomanticFigureData {
  name: string;
  meaning: string;
  timeFrame: string;
  advice: string;
  element?: string;
  ruler?: string;
  tetragram?: [1 | 2, 1 | 2, 1 | 2, 1 | 2]; // Classic 4-line geomantic dot pattern
  geometricMotion?: string; // CSS motion description
}

// Basic geomantic figures with full earth-mystery profiles
export const GeomanticFigures: Record<string, GeomanticFigureData> = {
  Via: {
    name: "Via",
    meaning: "Movement, journeys, change",
    timeFrame: "next 1–4 weeks",
    advice: "Stay flexible; expect shifts and travel (inner or outer).",
    element: "Water",
    ruler: "Waxing Moon",
    tetragram: [1, 1, 1, 1],
    geometricMotion: "Linear forward pulse with expanding ripple waves"
  },
  Populus: {
    name: "Populus",
    meaning: "Crowds, reflection, repetition",
    timeFrame: "next 1–3 months",
    advice: "Patterns repeat; use this to observe, not to suffer.",
    element: "Water",
    ruler: "Full Moon",
    tetragram: [2, 2, 2, 2],
    geometricMotion: "Concentric mirror reflections oscillating in synchrony"
  },
  Carcer: {
    name: "Carcer",
    meaning: "Confinement, limitation, structure",
    timeFrame: "next 2–6 months",
    advice: "Accept limits; build within them instead of fighting them.",
    element: "Earth",
    ruler: "Saturn",
    tetragram: [1, 2, 2, 1],
    geometricMotion: "Rectangular perimeter containment flexing into internal sanctuary"
  },
  "Fortuna Major": {
    name: "Fortuna Major",
    meaning: "Breakthrough, success, strength",
    timeFrame: "next 1–6 months",
    advice: "Lean into opportunities; your effort will be amplified.",
    element: "Fire",
    ruler: "Sun",
    tetragram: [2, 2, 1, 1],
    geometricMotion: "Ascending golden vortex rising from bedrock to crown"
  },
  Tristitia: {
    name: "Tristitia",
    meaning: "Sadness, heaviness, descent",
    timeFrame: "next 2–8 weeks",
    advice: "Let yourself feel; don’t build permanent stories from temporary moods.",
    element: "Earth",
    ruler: "Saturn",
    tetragram: [2, 2, 2, 1],
    geometricMotion: "Downward grounding weight transmuting into subterranean crystal"
  },
  Albus: {
    name: "Albus",
    meaning: "Clarity, intellect, coolness",
    timeFrame: "next 1–3 weeks",
    advice: "Think clearly; make decisions from calm, not urgency.",
    element: "Air",
    ruler: "Mercury",
    tetragram: [2, 2, 1, 2],
    geometricMotion: "Crystal polygon spinning in calm atmospheric balance"
  },
  Rubeus: {
    name: "Rubeus",
    meaning: "Shadow, intensity, disruption",
    timeFrame: "next 3–9 weeks",
    advice: "Handle strong emotions with care; avoid reckless moves.",
    element: "Fire",
    ruler: "Mars",
    tetragram: [2, 1, 2, 2],
    geometricMotion: "Dynamic volcanic fracture releasing thermal pressure"
  },
  "Caput Draconis": {
    name: "Caput Draconis",
    meaning: "Beginnings, openings, new paths",
    timeFrame: "next 1–3 months",
    advice: "Say yes to new doors; this is a starting point, not a climax.",
    element: "Earth/Fire",
    ruler: "North Node",
    tetragram: [2, 1, 1, 1],
    geometricMotion: "Upward opening aperture widening toward the horizon"
  },
  "Cauda Draconis": {
    name: "Cauda Draconis",
    meaning: "Endings, closures, completion",
    timeFrame: "next 1–3 months",
    advice: "Let something end; don’t drag it out past its natural life.",
    element: "Fire/Earth",
    ruler: "South Node",
    tetragram: [1, 1, 1, 2],
    geometricMotion: "Centripetal inward spiral sealing and preserving the harvested wisdom"
  }
};

// Simple figure assignment based on problem text
export function assignGeomanticFigure(problemText: string): string {
  const t = (problemText || "").toLowerCase();

  if (t.includes("stuck") || t.includes("trapped") || t.includes("blocked") || t.includes("cage")) return "Carcer";
  if (t.includes("ending") || t.includes("leave") || t.includes("quit") || t.includes("finish") || t.includes("close")) return "Cauda Draconis";
  if (t.includes("start") || t.includes("new") || t.includes("begin") || t.includes("open") || t.includes("birth")) return "Caput Draconis";
  if (t.includes("sad") || t.includes("depressed") || t.includes("heavy") || t.includes("grief") || t.includes("loss")) return "Tristitia";
  if (t.includes("chaos") || t.includes("intense") || t.includes("rage") || t.includes("anger") || t.includes("conflict")) return "Rubeus";
  if (t.includes("think") || t.includes("clarity") || t.includes("decision") || t.includes("mind") || t.includes("focus")) return "Albus";
  if (t.includes("repeat") || t.includes("cycle") || t.includes("loop") || t.includes("mirror") || t.includes("crowd")) return "Populus";
  if (t.includes("move") || t.includes("travel") || t.includes("change") || t.includes("flow") || t.includes("journey")) return "Via";

  return "Fortuna Major"; // default: potential breakthrough
}

export interface TitanessTarget {
  name: string;
  mineral?: string;
  primaryMineral?: string;
  region?: string;
  location?: string;
  country?: string;
}

export interface GeomanticPredictionResult {
  titaness: string;
  mineral: string;
  region: string;
  figure: string;
  meaning: string;
  timeFrame: string;
  advice: string;
  tetragram?: [1 | 2, 1 | 2, 1 | 2, 1 | 2];
  element?: string;
  ruler?: string;
  geometricMotion?: string;
}

// Main prediction function
export function geomanticPrediction(
  problemText: string,
  titaness: TitanessTarget
): GeomanticPredictionResult {
  const figureKey = assignGeomanticFigure(problemText);
  const figure = GeomanticFigures[figureKey] || GeomanticFigures["Fortuna Major"];

  const mineralStr = titaness.mineral || titaness.primaryMineral || "Native Ore";
  const regionStr = titaness.region || titaness.location || titaness.country || "Earth Mantle";

  return {
    titaness: titaness.name,
    mineral: mineralStr,
    region: regionStr,
    figure: figure.name,
    meaning: figure.meaning,
    timeFrame: figure.timeFrame,
    advice: figure.advice,
    tetragram: figure.tetragram,
    element: figure.element,
    ruler: figure.ruler,
    geometricMotion: figure.geometricMotion,
  };
}
