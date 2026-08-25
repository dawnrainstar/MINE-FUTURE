import { WorldMine, TitanessProfile, TitanessCures, MineralAspect } from '../types';

/**
 * MineralDictionary mapping mineral keys to core mythological, runic,
 * geomantic, elemental, botanical, wound, and 3-fold cure attributes.
 */
export const MineralDictionary: Record<string, MineralAspect> = {
  copper: {
    name: "Cupria",
    archetype: "The Conductor Mother",
    rune: "Kenaz",
    geomantic: "Via",
    element: "Fire/Air",
    tree: "Oak",
    wound: "Over-connection, burnout",
    cures: {
      literal: "Reduce one obligation.",
      symbolic: "Unplug one draining cord.",
      geometric: "Simplify your circuit—fewer nodes, stronger core."
    }
  },

  iron: {
    name: "Ferrena",
    archetype: "The Spine of Resolve",
    rune: "Uruz",
    geomantic: "Carcer",
    element: "Earth",
    tree: "Pine",
    wound: "Rigidity, stuck patterns",
    cures: {
      literal: "Try one new behavior in a familiar situation.",
      symbolic: "Loosen one plate of inner armor.",
      geometric: "Introduce a curve into your grid."
    }
  },

  gold: {
    name: "Auriel",
    archetype: "The Vein of Worth",
    rune: "Fehu",
    geomantic: "Fortuna Major",
    element: "Fire/Earth",
    tree: "Hazel",
    wound: "Perfectionism, self-worth wounds",
    cures: {
      literal: "Do one thing imperfectly on purpose.",
      symbolic: "See your worth as a field, not a vein.",
      geometric: "Widen your validation pattern."
    }
  },

  lithium: {
    name: "Lythara",
    archetype: "The Basin Dreamer",
    rune: "Laguz",
    geomantic: "Amissio",
    element: "Water/Air",
    tree: "Willow",
    wound: "Nervous system overload",
    cures: {
      literal: "Close one open loop today.",
      symbolic: "Let your inner waters cool.",
      geometric: "Widen your spiral; add space between tasks."
    }
  },

  salt: {
    name: "Saloria",
    archetype: "The Cathedral Echo",
    rune: "Ansuz",
    geomantic: "Albus",
    element: "Earth/Water",
    tree: "Birch",
    wound: "Grief, ancestral heaviness",
    cures: {
      literal: "Speak one unsaid truth.",
      symbolic: "Let the echo return to silence.",
      geometric: "Release one repeating cycle."
    }
  },

  obsidian: {
    name: "Obscyra",
    archetype: "The Mirror of Truth",
    rune: "Nauthiz",
    geomantic: "Rubeus",
    element: "Fire/Earth",
    tree: "Yew",
    wound: "Avoidance of shadow",
    cures: {
      literal: "Face one truth directly.",
      symbolic: "Hold the mirror steady.",
      geometric: "Repair one fracture."
    }
  },

  // Extended Planetary Mineral Archetypes
  silver: {
    name: "Argentia",
    archetype: "The Lunar Mirror & Intuitive Well",
    rune: "Sowilo",
    geomantic: "Populus",
    element: "Water/Ether",
    tree: "Ash",
    wound: "Emotional hyper-permeability, oscillation",
    cures: {
      literal: "Spend 20 minutes in silent observation without taking notes.",
      symbolic: "Polish your inner reflective pool with moonlight.",
      geometric: "Smooth your jagged perimeter into a reflective concentric sphere."
    }
  },

  diamond: {
    name: "Adamas",
    archetype: "The Facet of Eternal Radiance",
    rune: "Dagaz",
    geomantic: "Caput Draconis",
    element: "Fire/Earth",
    tree: "Cedar",
    wound: "Inflexible high pressure, brittle perfection",
    cures: {
      literal: "Surrender one outcome you are trying to force.",
      symbolic: "Allow light to refract through imperfections rather than hiding them.",
      geometric: "Anchor an octahedral prism to distribute compressive strain."
    }
  },

  emerald: {
    name: "Smaragda",
    archetype: "The Verdant Heart Keeper",
    rune: "Berkano",
    geomantic: "Puella",
    element: "Earth/Water",
    tree: "Apple",
    wound: "Scarcity mentality, closing the heart gate",
    cures: {
      literal: "Gift something meaningful to another without expecting return.",
      symbolic: "Water the subterranean roots of your primary creative passion.",
      geometric: "Expand a hexagonal rosette pattern outward from your center."
    }
  },

  ruby: {
    name: "Pyropa",
    archetype: "The Crimson Flame Priestess",
    rune: "Thurisaz",
    geomantic: "Fortuna Minor",
    element: "Fire",
    tree: "Rowan",
    wound: "Suppressed rage, depletion of vital instinct",
    cures: {
      literal: "Perform vigorous physical movement to unblock stagnant blood.",
      symbolic: "Feed the subterranean hearth with conscious devotion.",
      geometric: "Realign your cardinal vector along true magnetic north."
    }
  },

  sapphire: {
    name: "Caelia",
    archetype: "The Vault of Still Wisdom",
    rune: "Eihwaz",
    geomantic: "Acquisitio",
    element: "Water/Air",
    tree: "Linden",
    wound: "Mental noise, distraction from core purpose",
    cures: {
      literal: "Declutter your immediate physical and digital workspace.",
      symbolic: "Gaze into the deep cobalt abyss until thoughts settle like silt.",
      geometric: "Draw a single unwavering horizontal datum line across your schedule."
    }
  },

  opal: {
    name: "Irisia",
    archetype: "The Prism of Metamorphosis",
    rune: "Perthro",
    geomantic: "Conjunctio",
    element: "Water/Fire",
    tree: "Elder",
    wound: "Fear of unpredictable transformation, clinging to old shells",
    cures: {
      literal: "Say yes to an unexpected invitation or serendipitous detour.",
      symbolic: "Weave broken spectrums back into an iridescent tapestry.",
      geometric: "Shift from linear coordinates to a radial kaleidoscope lattice."
    }
  },

  uranium: {
    name: "Radianta",
    archetype: "The Atomic Weaver of Eternity",
    rune: "Hagalaz",
    geomantic: "Cauda Draconis",
    element: "Fire/Aether",
    tree: "Cypress",
    wound: "Existential dread, harboring toxic unexpressed power",
    cures: {
      literal: "Safely channel intense energy into a monumental long-term project.",
      symbolic: "Transmute volatile isotopes into clean creative luminescence.",
      geometric: "Encase your high-density core within thick lead-tempered boundaries."
    }
  },

  cobalt: {
    name: "Azurina",
    archetype: "The Magnetic Pulse Sovereign",
    rune: "Tiwaz",
    geomantic: "Tristitia",
    element: "Earth/Air",
    tree: "Elm",
    wound: "Alienation from community, exhaustion from carrying systems",
    cures: {
      literal: "Delegate one major operational responsibility.",
      symbolic: "Recharge your magnetic dipole at the subterranean wellspring.",
      geometric: "Arrange auxiliary nodes around your central column at equal radii."
    }
  },

  nickel: {
    name: "Niccolite",
    archetype: "The Alloy of Tenacity",
    rune: "Jera",
    geomantic: "Laetitia",
    element: "Earth/Fire",
    tree: "Hornbeam",
    wound: "Underestimating endurance, premature abandonment",
    cures: {
      literal: "Commit to 10 more consecutive days of deliberate practice.",
      symbolic: "Forge raw iron into resilient stainless alloy through patience.",
      geometric: "Interlock your overlapping schedules like a chain-mail tessellation."
    }
  },

  zinc: {
    name: "Speltera",
    archetype: "The Sacrificial Galvanizer",
    rune: "Algiz",
    geomantic: "Puer",
    element: "Air/Earth",
    tree: "Hawthorn",
    wound: "Self-sacrificing martyrdom, neglecting self-protection",
    cures: {
      literal: "Say a clear, unambiguous 'no' to a non-essential request.",
      symbolic: "Anoint your own perimeter before offering shelter to others.",
      geometric: "Erect an outer sacrificial buffer zone 5 meters outside your threshold."
    }
  },

  platinum: {
    name: "Platinia",
    archetype: "The Incorruptible Catalyst",
    rune: "Gebo",
    geomantic: "Caput Draconis",
    element: "Aether/Water",
    tree: "Maple",
    wound: "Isolation born of high standards, disdain for raw humanity",
    cures: {
      literal: "Collaborate with someone whose methods differ radically from yours.",
      symbolic: "Catalyze reactions without being consumed in the combustion.",
      geometric: "Construct an equilateral tetrahedron to balance purity and contact."
    }
  },

  mercury: {
    name: "Hydrargyra",
    archetype: "The Liquid Quicksilver Alchemist",
    rune: "Mannaz",
    geomantic: "Via",
    element: "Water/Air",
    tree: "Hazel",
    wound: "Inability to settle, chronic evasiveness, ungrounded volatility",
    cures: {
      literal: "Stay in one physical location for an uninterrupted 4-hour focus block.",
      symbolic: "Condense mercurial vapor back into a grounded flask.",
      geometric: "Form a secure alembic ring around your scattered thoughts."
    }
  },

  cinnabar: {
    name: "Hydrargyra",
    archetype: "The Liquid Quicksilver Alchemist",
    rune: "Mannaz",
    geomantic: "Via",
    element: "Water/Air",
    tree: "Hazel",
    wound: "Inability to settle, chronic evasiveness, ungrounded volatility",
    cures: {
      literal: "Stay in one physical location for an uninterrupted 4-hour focus block.",
      symbolic: "Condense mercurial vapor back into a grounded flask.",
      geometric: "Form a secure alembic ring around your scattered thoughts."
    }
  },

  bauxite: {
    name: "Alumina",
    archetype: "The Lightweight Feather Shield",
    rune: "Ehwaz",
    geomantic: "Albus",
    element: "Air/Earth",
    tree: "Alder",
    wound: "Carrying unnecessary burdens that feel heavier than they are",
    cures: {
      literal: "Purge 5 physical items or redundant digital files today.",
      symbolic: "Smelt dense clay into featherweight aeronautic wings.",
      geometric: "Triangulate a truss structure to minimize structural weight."
    }
  },

  quartz: {
    name: "Crystallia",
    archetype: "The Resonant Frequency Channel",
    rune: "Kenaz",
    geomantic: "Populus",
    element: "Earth/Air",
    tree: "Birch",
    wound: "Amplifying others' chaotic signals instead of your own frequency",
    cures: {
      literal: "Turn off all background notification chimes and auditory alerts.",
      symbolic: "Tune your internal piezoelectric crystal to natural Schumann resonance.",
      geometric: "Cut 6 clean facets into your morning intention ritual."
    }
  },

  sulfur: {
    name: "Brimstone",
    archetype: "The Volcanic Purifier",
    rune: "Thurisaz",
    geomantic: "Rubeus",
    element: "Fire",
    tree: "Juniper",
    wound: "Holding on to rotting resentments, fearing destructive cleansing",
    cures: {
      literal: "Have the difficult conversation you have postponed for weeks.",
      symbolic: "Cauterize the necrotic wound with subterranean solar sulfur.",
      geometric: "Burn away the perimeter boundary to expand the caldera floor."
    }
  },

  selenite: {
    name: "Selena",
    archetype: "The Gypsum Moon Pillar",
    rune: "Isa",
    geomantic: "Albus",
    element: "Water/Earth",
    tree: "Poplar",
    wound: "Stagnation masquerading as peace, frozen potential",
    cures: {
      literal: "Take the very first physical step on a project that feels frozen.",
      symbolic: "Let warm sunlight melt the translucent ice-pillars of hesitation.",
      geometric: "Transform static parallel columns into a forward spiral staircase."
    }
  },

  coal: {
    name: "Anthracita",
    archetype: "The Ancient Carbon Keeper",
    rune: "Othala",
    geomantic: "Carcer",
    element: "Earth/Fire",
    tree: "Oak",
    wound: "Living in past glory or ancestral trauma, heavy inertia",
    cures: {
      literal: "Write down an inherited belief and consciously choose whether to keep it.",
      symbolic: "Ignite stored primordial solar heat into present-day creative drive.",
      geometric: "Condense sprawling ancestral branches into an anchor point."
    }
  },

  tungsten: {
    name: "Wolframia",
    archetype: "The Ultra-Thermal Pillar",
    rune: "Tiwaz",
    geomantic: "Fortuna Major",
    element: "Earth/Fire",
    tree: "Yew",
    wound: "Withstanding unbearable heat without speaking up or resting",
    cures: {
      literal: "Step away from a high-heat conflict until internal temperature drops.",
      symbolic: "Remember that even the highest melting point needs cooling cycles.",
      geometric: "Reinforce structural crossbeams with heat-dissipating fins."
    }
  },

  rare_earth: {
    name: "Neodymia",
    archetype: "The Quantum Magnet Weaver",
    rune: "Ingwaz",
    geomantic: "Conjunctio",
    element: "Air/Aether",
    tree: "Ash",
    wound: "Feeling misunderstood, fragmentation into invisible specialties",
    cures: {
      literal: "Explain your complex vision to someone using simple, everyday metaphors.",
      symbolic: "Align scattered magnetic dipoles into one cohesive vector.",
      geometric: "Synthesize 17 scattered peripheral points into a unified toroidal field."
    }
  }
};

/**
 * Normalizes mineral strings to dictionary keys.
 */
export function normalizeMineralKey(mineral: string): string {
  if (!mineral) return 'gold';
  const clean = mineral.toLowerCase().trim();
  
  if (clean.includes('copper') || clean.includes('cuprite') || clean.includes('malachite')) return 'copper';
  if (clean.includes('iron') || clean.includes('hematite') || clean.includes('magnetite') || clean.includes('taconite') || clean.includes('ferrous')) return 'iron';
  if (clean.includes('gold') || clean.includes('auric') || clean.includes('electrum')) return 'gold';
  if (clean.includes('lithium') || clean.includes('spodumene') || clean.includes('brine')) return 'lithium';
  if (clean.includes('salt') || clean.includes('halite') || clean.includes('saline') || clean.includes('potash')) return 'salt';
  if (clean.includes('obsidian') || clean.includes('volcanic glass')) return 'obsidian';
  if (clean.includes('silver') || clean.includes('argentite')) return 'silver';
  if (clean.includes('diamond') || clean.includes('kimberlite')) return 'diamond';
  if (clean.includes('emerald') || clean.includes('beryl')) return 'emerald';
  if (clean.includes('ruby') || clean.includes('corundum')) return 'ruby';
  if (clean.includes('sapphire')) return 'sapphire';
  if (clean.includes('opal')) return 'opal';
  if (clean.includes('uranium') || clean.includes('pitchblende') || clean.includes('nuclear') || clean.includes('radium')) return 'uranium';
  if (clean.includes('cobalt')) return 'cobalt';
  if (clean.includes('nickel')) return 'nickel';
  if (clean.includes('zinc') || clean.includes('sphalerite')) return 'zinc';
  if (clean.includes('platinum') || clean.includes('palladium') || clean.includes('pgm')) return 'platinum';
  if (clean.includes('mercury') || clean.includes('cinnabar') || clean.includes('quicksilver')) return 'mercury';
  if (clean.includes('bauxite') || clean.includes('aluminum') || clean.includes('alumina')) return 'bauxite';
  if (clean.includes('quartz') || clean.includes('silica') || clean.includes('agate') || clean.includes('amethyst')) return 'quartz';
  if (clean.includes('sulfur') || clean.includes('sulphur') || clean.includes('pyrite')) return 'sulfur';
  if (clean.includes('selenite') || clean.includes('gypsum')) return 'selenite';
  if (clean.includes('coal') || clean.includes('anthracite') || clean.includes('lignite')) return 'coal';
  if (clean.includes('tungsten') || clean.includes('wolframite')) return 'tungsten';
  if (clean.includes('rare earth') || clean.includes('neodymium') || clean.includes('lanthanide')) return 'rare_earth';

  return 'gold'; // Graceful fallback
}

/**
 * Universal Titaness Generation Engine.
 * Generates the personified Subterranean Titaness for any mine.
 */
export function generateTitaness(mine: {
  mineral?: string;
  primaryMineral?: string;
  region?: string;
  location?: string;
  country?: string;
  depth?: number | string;
  depthMeters?: number;
}): TitanessProfile {
  const mineralStr = mine.mineral || mine.primaryMineral || 'Gold';
  const regionStr = mine.region || mine.location || mine.country || 'Subterranea';
  const depthVal = mine.depth !== undefined ? mine.depth : (mine.depthMeters !== undefined ? mine.depthMeters : 0);

  const mineralKey = normalizeMineralKey(mineralStr);
  const base = MineralDictionary[mineralKey] || MineralDictionary.gold;

  return {
    name: `${base.name} of ${regionStr}`,
    mineral: mineralStr,
    region: regionStr,
    depth: depthVal,
    archetype: base.archetype,
    rune: base.rune,
    geomantic: base.geomantic,
    element: base.element,
    tree: base.tree,
    wound: base.wound,
    cures: {
      literal: base.cures.literal,
      symbolic: base.cures.symbolic,
      geometric: base.cures.geometric
    }
  };
}

/**
 * Ensures a WorldMine instance has its titaness profile attached and synchronized.
 */
export function enrichMineWithTitaness(mine: WorldMine): WorldMine & { titaness: TitanessProfile } {
  const titaness = generateTitaness({
    primaryMineral: mine.primaryMineral,
    location: mine.location,
    country: mine.country,
    depthMeters: mine.depthMeters,
  });

  return {
    ...mine,
    titaness
  };
}
