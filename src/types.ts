export type DepthCategory =
  | 'Surface Open-Pit'
  | 'Subterranean Shaft'
  | 'Ultra-Deep Abyss'
  | 'Sacred Salt Grotto'
  | 'Hydrothermal/Volcanic'
  | 'Arctic Permafrost'
  | 'Ancient Hydraulic Quarry';

export type MineralCategory =
  | 'Precious Metals'
  | 'Noble Gems'
  | 'Battery & Modern Flux'
  | 'Chthonic Salts'
  | 'Alchemical & Vaporous'
  | 'Structural & Ferrous'
  | 'Atomic & Radiance'
  | 'Rare Earths & Magnetics';

export type ElementalAffinity = 'Fire' | 'Earth' | 'Water' | 'Air' | 'Aether/Void';

export type PlanetaryRuler =
  | 'Sun'
  | 'Moon'
  | 'Mercury'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto';

export interface TitanessCures {
  literal: string;
  symbolic: string;
  geometric: string;
}

export interface MineralAspect {
  name: string;
  archetype: string;
  rune: string;
  geomantic: string;
  element: string;
  tree: string;
  wound: string;
  cures: TitanessCures;
}

export interface TitanessProfile {
  name: string;
  mineral: string;
  region: string;
  depth: number | string;
  archetype: string;
  rune: string;
  geomantic: string;
  element: string;
  tree: string;
  wound: string;
  cures: TitanessCures;
}

export interface GeomanticFigureData {
  name: string;
  meaning: string;
  timeFrame: string;
  advice: string;
  element?: string;
  ruler?: string;
  tetragram?: [1 | 2, 1 | 2, 1 | 2, 1 | 2];
  geometricMotion?: string;
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

export interface WorldMine {
  id: string;
  name: string;
  location: string;
  country: string;
  continent: 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania' | 'Polar/Antarctica';
  lat: number;
  lng: number;
  depthMeters: number;
  depthCategory: DepthCategory;
  primaryMineral: string;
  secondaryMinerals: string[];
  mineralCategory: MineralCategory;
  elementalAffinity: ElementalAffinity;
  planetaryRuler: PlanetaryRuler;
  arcanaArchetype: string;
  feminineArchetype: string; // The personified subterranean woman/goddess
  cartoucheTitle: string; // Latin/Antique cartographic banner
  cartographicFigure: string; // How the excavation topography maps to feminine anatomy & posture
  cartographicSilhouetteType:
    | 'goddess-enthroned'
    | 'sleeping-titaness'
    | 'dancing-nymph'
    | 'winged-angelic-strata'
    | 'veiled-oracle'
    | 'warrior-chthonic'
    | 'water-bearer-saline'
    | 'serpentine-alchemist';
  uprightMeaning: string;
  invertedMeaning: string;
  mantleMessage: string;
  historicalContext: string;
  chthonicKeyword: string;
  mineralColor: string; // Hex color for visual glow
  discoveryYear?: string;
  titaness?: TitanessProfile;
}

export type SpreadType = 'single' | 'strata3' | 'elemental5' | 'descent4' | 'titanessFuture5' | 'scatter';

export interface SpreadPositionInfo {
  id: string;
  name: string;
  description: string;
  strataDepth: string;
}

export interface DrawnMine {
  mine: WorldMine;
  isUpright: boolean;
  position: SpreadPositionInfo;
  resonanceStrength?: number;
}

export interface OracleInterpretation {
  oracularTitle: string;
  mantleStrophe: string;
  targetFutureDate?: string;
  timeHorizon?: string;
  strataInterpretations: {
    position: string;
    mineName: string;
    mineralSignificance: string;
    revelation: string;
  }[];
  tectonicSynthesis: string;
  futurePrediction?: {
    manifestEvent: string;
    dissolvingObstacle: string;
    pivotalChoicePoint: string;
    longTermOutcome: string;
  };
  chthonicPrescription?: {
    prescribedMinerals: {
      name: string;
      action: string;
      resonance: string;
    }[];
    groundingRitual: string;
    mantleRemedy: string;
    temporalMilestones: {
      timeframe: string;
      guidance: string;
    }[];
  };
  environmentalWarning?: string;
  whyMiningMustStop?: string;
  earthMandate?: string;
  shadowVein: string;
  chthonicMandate: string;
}

export interface DivinationReading {
  id: string;
  timestamp: number;
  question: string;
  targetFutureDate?: string;
  timeHorizon?: string;
  spreadType: SpreadType;
  drawnMines: DrawnMine[];
  interpretation: OracleInterpretation;
  scatterCoordinates?: { x: number; y: number }[];
}

export interface CastStone {
  id: string;
  name: string;
  color: string;
  element: ElementalAffinity;
  x: number; // 0 to 1 relative to map
  y: number; // 0 to 1 relative to map
  nearestMine?: WorldMine;
  distanceKm?: number;
}

export interface CommercialSettings {
  appTitle: string;
  tagline: string;
  practitionerName: string;
  practitionerTitle: string;
  contactEmail: string;
  currencySymbol: string;
  singleReadingPrice: number;
  bundleReadingPrice: number;
  monthlyPassPrice: number;
  stripePaymentLink: string;
  paypalPaymentLink: string;
  etsyShopUrl: string;
  affiliateAmazonTag: string;
  enablePaywall: boolean;
  freeDailyReadingsLimit: number;
}

export interface ClientOrder {
  id: string;
  orderNumber: string;
  createdAt: number;
  clientName: string;
  clientEmail?: string;
  inquiry: string;
  targetDate: string;
  spreadType: SpreadType;
  practitionerNote: string;
  reading?: DivinationReading;
  status: 'pending' | 'completed' | 'delivered';
  pricePaid?: number;
}

export interface CreditTransaction {
  id: string;
  timestamp: number;
  type: 'purchase' | 'use' | 'bonus';
  amount: number;
  description: string;
}
