import { WorldMine } from '../types';
import { calculateDateGeometry } from '../data/pennickEngine';
import { GeomanticFigures, assignGeomanticFigure } from './geomanticPrediction';

export interface GeneratedMineralPrescription {
  geomanticCode: string;
  geomanticFigureName: string;
  geomanticFigureTetragram: [1 | 2, 1 | 2, 1 | 2, 1 | 2];
  prescribedMinerals: {
    name: string;
    action: string;
    resonance: string;
    specimenType?: string;
    crystalSystem?: string;
    placement?: string;
    mohsHardness?: string;
    color?: string;
  }[];
  catalyticMineral: {
    name: string;
    action: string;
    resonance: string;
    elementalSpark: string;
  };
  altarGeometry: {
    pattern: string;
    compassHeading: string;
    azimuthDegrees: number;
    placementInstructions: string;
  };
  lithosphericChargingWindow: string;
  groundingRitual: string;
  mantleRemedy: string;
  somaticFocusCenter: string;
  sealingFormula: string;
  temporalMilestones: {
    timeframe: string;
    guidance: string;
  }[];
}

// Crystal systems mapping for common minerals
const MINERAL_DATA: Record<string, { system: string; hardness: string; color: string; defaultPlacement: string }> = {
  gold: { system: 'Isometric / Cubic', hardness: '2.5 - 3.0', color: '#f59e0b', defaultPlacement: 'Solar Plexus or Central Altar Focus' },
  diamond: { system: 'Isometric Octahedral', hardness: '10.0 (Supreme)', color: '#38bdf8', defaultPlacement: 'Crown Center or Third Eye' },
  emerald: { system: 'Hexagonal Prismatic', hardness: '7.5 - 8.0', color: '#10b981', defaultPlacement: 'Heart Center or Emerald Vessel' },
  copper: { system: 'Isometric Dodecahedral', hardness: '2.5 - 3.0', color: '#ea580c', defaultPlacement: 'Sacral Center or Copper Grounding Plate' },
  silver: { system: 'Isometric Dendritic', hardness: '2.5 - 3.0', color: '#e2e8f0', defaultPlacement: 'Third Eye or Silver Lunar Bowl' },
  ruby: { system: 'Trigonal Rhombohedral', hardness: '9.0', color: '#e11d48', defaultPlacement: 'Base Root or Vital Axis' },
  sapphire: { system: 'Trigonal Bipyramidal', hardness: '9.0', color: '#2563eb', defaultPlacement: 'Throat or Crown Center' },
  lapis: { system: 'Isometric Granular', hardness: '5.0 - 5.5', color: '#1d4ed8', defaultPlacement: 'Throat Center for Sovereign Truth' },
  opal: { system: 'Amorphous Hydrated Silica', hardness: '5.5 - 6.5', color: '#a855f7', defaultPlacement: 'Crown or Intuitive Horizon' },
  quartz: { system: 'Trigonal Trapezohedral', hardness: '7.0', color: '#f8fafc', defaultPlacement: 'Apex Anchor of Any Altar' },
  tourmaline: { system: 'Trigonal Ditrigonal', hardness: '7.0 - 7.5', color: '#18181b', defaultPlacement: 'Soles of Feet or Grounding Threshold' },
  hematite: { system: 'Trigonal Tabular', hardness: '5.5 - 6.5', color: '#52525b', defaultPlacement: 'Root or Left Palm Anchor' },
  pyrite: { system: 'Isometric Pyritohedral', hardness: '6.0 - 6.5', color: '#d97706', defaultPlacement: 'Desk Edge or Wealth Sanctuary' },
  malachite: { system: 'Monoclinic Botryoidal', hardness: '3.5 - 4.0', color: '#059669', defaultPlacement: 'Heart Center or Emotional Seam' },
  amethyst: { system: 'Trigonal Prismatic', hardness: '7.0', color: '#9333ea', defaultPlacement: 'Bedside or Meditation Anchor' },
};

function getMineralMeta(mineralName: string) {
  const lower = (mineralName || '').toLowerCase();
  for (const [key, val] of Object.entries(MINERAL_DATA)) {
    if (lower.includes(key)) return val;
  }
  return {
    system: 'Trigonal / Monoclinic',
    hardness: '6.5 - 7.0',
    color: '#d97706',
    defaultPlacement: 'Personal Sanctuary or Throat/Heart Axis',
  };
}

/**
 * Generate an intrinsically unique, mathematically and mineralogically grounded
 * prescription for any given reading.
 */
export function generateUniqueMineralPrescription(
  mine: WorldMine,
  targetDate: string,
  inquiry: string,
  existingPrescription?: any
): GeneratedMineralPrescription {
  const dateGeom = calculateDateGeometry(targetDate);
  const qClean = (inquiry || 'destiny and alignment').trim();
  const qLower = qClean.toLowerCase();

  // Deterministic Hash based on Date, Mine, and Inquiry
  let hash = 0;
  const seedString = `${mine.id || mine.name}-${targetDate}-${qClean}-${mine.lat || 0}`;
  for (let i = 0; i < seedString.length; i++) {
    hash = ((hash << 5) - hash) + seedString.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);

  // Prescription Unique Identifier Code
  const hexCode = (posHash % 65536).toString(16).toUpperCase().padStart(4, '0');
  const mineAbbr = (mine.name.replace(/[^A-Za-z]/g, '').slice(0, 3) || 'GEO').toUpperCase();
  const dateSlug = (targetDate || new Date().toISOString().split('T')[0]).replace(/-/g, '').slice(2);
  const geomanticCode = `GEO-${mineAbbr}-${dateSlug}-${hexCode}`;

  // Geomantic Figure Assignment
  const assignedFigureKey = assignGeomanticFigure(qClean);
  const geomanticFig = GeomanticFigures[assignedFigureKey] || GeomanticFigures['Fortuna Major'];
  const geomanticFigureTetragram = geomanticFig.tetragram || [2, 2, 1, 1];

  // Primary Mineral Ally
  const primaryName = mine.primaryMineral || 'Native Crystalline Bedrock';
  const primaryMeta = getMineralMeta(primaryName);

  // Determine Secondary Mineral Ally based on complementary grounding
  const secondaryCandidates = [
    {
      name: 'Specular Black Hematite',
      action: 'Hold firmly in non-dominant palm during tense negotiations and pivotal transitions.',
      resonance: 'Absorbs electromagnetic excess and anchors etheric will into bedrock reality.',
      crystalSystem: 'Trigonal Tabular',
      mohsHardness: '6.0',
      color: '#475569',
      placement: 'Base Root or Left Pocket',
    },
    {
      name: 'Black Tourmaline (Schorl)',
      action: 'Place at your threshold or workstation entrance to ward off erratic noise.',
      resonance: 'Dissolves psychic interference and seals personal auric boundaries.',
      crystalSystem: 'Trigonal Prismatic',
      mohsHardness: '7.5',
      color: '#1e293b',
      placement: 'Grounding Boundary / Room Threshold',
    },
    {
      name: 'Raw Pyrite Sun or Octahedron',
      action: 'Position upon business documents, contracts, or writing journal.',
      resonance: 'Ignites mental confidence, gold-vein discipline, and tangible manifestation.',
      crystalSystem: 'Isometric Cubic',
      mohsHardness: '6.5',
      color: '#d97706',
      placement: 'Solar Plexus or Creative Desk Anchor',
    },
    {
      name: 'Smoky Quartz Sceptre',
      action: 'Grip during morning breathwork while exhaling tension into the earth floor.',
      resonance: 'Transmutes subterranean grief or anxiety into clean structural stability.',
      crystalSystem: 'Trigonal Trapezohedral',
      mohsHardness: '7.0',
      color: '#78716c',
      placement: 'Sacrum or Bedside Anchor',
    },
  ];

  const secondaryIndex = (posHash + 1) % secondaryCandidates.length;
  const secondaryMineral = secondaryCandidates[secondaryIndex];

  // Tertiary Catalytic Mineral
  let catalyticMineral = {
    name: 'Red Carnelian of Action',
    action: 'Carry as a pocket touchstone when taking decisive action before this date.',
    resonance: 'Dissolves procrastination and charges the solar bloodstream with courageous forward motion.',
    elementalSpark: 'Fire • Vital Momentum',
  };

  if (qLower.includes('love') || qLower.includes('relationship') || qLower.includes('heart') || qLower.includes('healing')) {
    catalyticMineral = {
      name: 'Raw Rose Quartz or Rhodochrosite',
      action: 'Rest over the sternum for 7 minutes at sunset while breathing into emotional space.',
      resonance: 'Softens fossilized emotional scar tissue and invites trustworthy emotional reciprocity.',
      elementalSpark: 'Water • Heart Restoration',
    };
  } else if (qLower.includes('career') || qLower.includes('money') || qLower.includes('finance') || qLower.includes('wealth')) {
    catalyticMineral = {
      name: 'Golden Citrine or Green Aventurine',
      action: 'Place in direct proximity to your financial ledgers, wallets, or computer station.',
      resonance: 'Magnetizes sustainable material crystallization and dissolves scarcity dread.',
      elementalSpark: 'Earth • Sovereign Abundance',
    };
  } else if (qLower.includes('decision') || qLower.includes('crossroad') || qLower.includes('clarity') || qLower.includes('mind')) {
    catalyticMineral = {
      name: 'Blue Kyanite Blade or Golden Fluorite',
      action: 'Hold between index fingers while contemplating options; do not cleanse with water.',
      resonance: 'Slices through mental confusion and rapidly aligns neural pathways with truth.',
      elementalSpark: 'Air • Uncompromising Clarity',
    };
  } else if (qLower.includes('move') || qLower.includes('home') || qLower.includes('sanctuary')) {
    catalyticMineral = {
      name: 'Red Jasper or Shungite Sphere',
      action: 'Bury in a potted plant or place near the front door of your living quarters.',
      resonance: 'Roots nomadic restlessness into enduring territorial sanctuary and peace.',
      elementalSpark: 'Earth • Spatial Anchor',
    };
  }

  // Compass Azimuth towards Mine coordinates
  const lat = mine.lat || 0;
  const lng = mine.lng || 0;
  let azimuthDeg = Math.round(Math.abs((lat * 2.3 + lng * 1.7 + posHash) % 360));
  let compassDirection = 'North-East';
  if (azimuthDeg >= 337.5 || azimuthDeg < 22.5) compassDirection = 'Due North';
  else if (azimuthDeg >= 22.5 && azimuthDeg < 67.5) compassDirection = 'North-East';
  else if (azimuthDeg >= 67.5 && azimuthDeg < 112.5) compassDirection = 'Due East';
  else if (azimuthDeg >= 112.5 && azimuthDeg < 157.5) compassDirection = 'South-East';
  else if (azimuthDeg >= 157.5 && azimuthDeg < 202.5) compassDirection = 'Due South';
  else if (azimuthDeg >= 202.5 && azimuthDeg < 247.5) compassDirection = 'South-West';
  else if (azimuthDeg >= 247.5 && azimuthDeg < 292.5) compassDirection = 'Due West';
  else compassDirection = 'North-West';

  // Altar Geometry Pattern
  const altarPatterns = [
    {
      pattern: 'Triangulation of Hermes & Earth Fulcrum',
      instructions: `Arrange the ${primaryName} at the northern vertex, ${secondaryMineral.name} at the southwest vertex, and ${catalyticMineral.name} at the southeast vertex facing ${compassDirection} (${azimuthDeg}°).`,
    },
    {
      pattern: 'Vesica Piscis Portal of Manifestation',
      instructions: `Place ${primaryName} and ${secondaryMineral.name} in overlapping circular fields 6 inches apart, with ${catalyticMineral.name} directly centered in the lens facing ${compassDirection} (${azimuthDeg}°).`,
    },
    {
      pattern: 'Quadrangular Saturnian Vault of Bedrock Truth',
      instructions: `Set a four-corner boundary with salt or slate, placing ${primaryName} in the central keep oriented toward the mine seam at ${azimuthDeg}°.`,
    },
    {
      pattern: 'Linear Ley Meridian of Direct Resolution',
      instructions: `Align the three minerals in a straight line pointed directly toward ${compassDirection} (${azimuthDeg}°), with ${primaryName} closest to you.`,
    },
  ];
  const chosenAltar = altarPatterns[posHash % altarPatterns.length];

  // Lithospheric Charging Window
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const targetDateObj = new Date(targetDate || new Date().toISOString().split('T')[0]);
  const dayName = weekdays[targetDateObj.getDay()];
  const solarAngle = Math.round(dateGeom.solarPhaseAngleDeg);

  const chargingHours = [
    'Solar Midday (11:45 AM - 1:15 PM) under clear sunlight',
    'Venusian Twilight at dusk as the first star crowns the sky',
    'Dawn Meridian (first 30 minutes following sunrise)',
    'Midnight Deep Mantle Watch (12:00 AM - 1:00 AM) in candle-lit stillness',
  ];
  const chosenHour = chargingHours[(posHash >> 2) % chargingHours.length];
  const lithosphericChargingWindow = `${dayName} at ${chosenHour} (Solar Vector: ${solarAngle}° • ${dateGeom.astronomicalStation})`;

  // Somatic Mantle Breathwork & Remedy
  const breathPatterns = [
    {
      somaticCenter: 'Solar Plexus & Core Axis',
      remedy: `Practice 4-8-2 Lithospheric Breathwork: Inhale 4 counts drawing deep earth stillness from beneath your feet, hold 8 counts settling the internal core, and exhale 2 counts releasing mental tension. Perform 7 cycles with ${primaryName} in hand.`,
    },
    {
      somaticCenter: 'Heart & Thymus Sanctuary',
      remedy: `Practice 5-5-5 Bedrock Coherence: Inhale 5 counts through the chest expanding with ground warmth, hold 5 counts in sovereign peace, and exhale 5 counts surrendering fear. Repeat for 6 minutes before retiring to sleep.`,
    },
    {
      somaticCenter: 'Throat & Third Eye Vector',
      remedy: `Practice 6-3-6 Crystalline Alignment: Inhale 6 counts through the crown, hold 3 counts feeling the crystal lattice anchor, and exhale 6 counts speaking your truth with steady cadence.`,
    },
    {
      somaticCenter: 'Base Root & Sacral Anchor',
      remedy: `Practice Box Grounding (4-4-4-4): Inhale 4 counts, hold 4 counts, exhale 4 counts, hold empty 4 counts while pressing feet firmly into the floor. Feel the subterranean fault lines absorbing all excess charge.`,
    },
  ];
  const chosenBreath = breathPatterns[(posHash >> 1) % breathPatterns.length];

  // Grounding Ritual
  const rituals = [
    `On an evening leading toward ${targetDate}, hold ${primaryName} in both hands, face ${compassDirection} (${azimuthDeg}°), and state your core intention regarding "${qClean.slice(0, 45)}" aloud three times. Place the mineral upon an earth or wooden surface to seal the timeline.`,
    `Prepare a small bowl of natural spring water or coarse salt. Submerge ${secondaryMineral.name} for 9 minutes while speaking what obsolete struggle you are releasing before ${targetDate}. Dry the stone and place ${primaryName} beside it as an active guardian.`,
    `Walk barefoot upon grass, clay, or bare stone for 10 minutes while carrying ${primaryName} in your dominant palm. Feel your electrical field discharging into the mantle seam of ${mine.name}, aligning your body with the arrival of ${targetDate}.`,
  ];
  const chosenRitual = rituals[posHash % rituals.length];

  // Sacred Sealing Formula
  const shortQ = qClean.length > 50 ? qClean.slice(0, 47) + '...' : qClean;
  const sealingFormula = `"By the bedrock of ${mine.name} and the sacred frequency of ${primaryName}, the seam is unlocked for ${targetDate}. My inquiry of '${shortQ}' is met with grounded truth, sovereign courage, and lasting peace. So the mantle decrees."`;

  // Merge any custom notes from AI/existing prescription
  const primaryAction = existingPrescription?.prescribedMinerals?.[0]?.action ||
    `Place upon your ${primaryMeta.defaultPlacement} during morning contemplation and critical decisions.`;
  const primaryResonance = existingPrescription?.prescribedMinerals?.[0]?.resonance ||
    `Vibrates at ${dateGeom.harmonicResonanceHz} to align your personal field with the subterranean seam of ${mine.name} by ${targetDate}.`;

  return {
    geomanticCode,
    geomanticFigureName: geomanticFig.name,
    geomanticFigureTetragram,
    prescribedMinerals: [
      {
        name: `Raw ${primaryName}`,
        action: primaryAction,
        resonance: primaryResonance,
        specimenType: `${mine.name} Seam Specimen`,
        crystalSystem: primaryMeta.system,
        mohsHardness: primaryMeta.hardness,
        placement: primaryMeta.defaultPlacement,
        color: primaryMeta.color,
      },
      {
        name: secondaryMineral.name,
        action: existingPrescription?.prescribedMinerals?.[1]?.action || secondaryMineral.action,
        resonance: existingPrescription?.prescribedMinerals?.[1]?.resonance || secondaryMineral.resonance,
        specimenType: 'Geomantic Counter-Weight',
        crystalSystem: secondaryMineral.crystalSystem,
        mohsHardness: secondaryMineral.mohsHardness,
        placement: secondaryMineral.placement,
        color: secondaryMineral.color,
      },
    ],
    catalyticMineral,
    altarGeometry: {
      pattern: chosenAltar.pattern,
      compassHeading: compassDirection,
      azimuthDegrees: azimuthDeg,
      placementInstructions: chosenAltar.instructions,
    },
    lithosphericChargingWindow,
    groundingRitual: existingPrescription?.groundingRitual || chosenRitual,
    mantleRemedy: existingPrescription?.mantleRemedy || chosenBreath.remedy,
    somaticFocusCenter: chosenBreath.somaticCenter,
    sealingFormula,
    temporalMilestones: existingPrescription?.temporalMilestones || [
      {
        timeframe: 'Initial Strata (Opening 14 Days)',
        guidance: `Keep ${primaryName} close; watch for subtle synchronicities and dreams reflecting ${geomanticFig.name}.`,
      },
      {
        timeframe: 'Mid-Seam Transition',
        guidance: `Activate the altar geometry facing ${compassDirection}; release old hesitation as the seismic pressure peaks.`,
      },
      {
        timeframe: `Bedrock Arrival (${targetDate})`,
        guidance: `The timeline crystallizes into physical manifestation; state the sealing formula to lock in the outcome.`,
      },
    ],
  };
}
