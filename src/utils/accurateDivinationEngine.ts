/**
 * HIGH-PRECISION DIVINATION ENGINE
 * Combines:
 * 1. Classical Quadripartite Geomantic Shield & 12 Astrological House Chart (Gerard of Cremona / Pietro d'Abano / Agrippa)
 * 2. Astronomical Ephemeris & Real-Time Planetary Hours (Chaldean Order + Solar Altitude)
 * 3. I Ching 64-Hexagram Mathematical Binary Resonance (King Wen Sequence & Moving Lines)
 * 4. Tectonic Crust Stress Tensor & Subterranean Piezo-Electric Crystal Frequency Matrix
 */

import { WorldMine, ElementalAffinity, PlanetaryRuler } from '../types';

export type TetragramLines = [1 | 2, 1 | 2, 1 | 2, 1 | 2]; // Top to Bottom: Head, Neck, Body, Feet

export interface ClassicalGeomanticFigure {
  id: string;
  name: string;
  latinName: string;
  arabicName: string;
  tetragram: TetragramLines;
  element: ElementalAffinity;
  planetaryRuler: PlanetaryRuler | 'North Node' | 'South Node';
  zodiacSign: string;
  quality: 'Stable' | 'Mobile' | 'Entering' | 'Exiting';
  oracleVerdict: 'Highly Favorable' | 'Favorable' | 'Neutral/Mixed' | 'Unfavorable' | 'Caution/Volatile';
  innerEssence: string;
  divinationKeyword: string;
  mantleResonance: string;
  hexagramMatch: {
    number: number;
    name: string;
    chinese: string;
    pinyin: string;
    judgment: string;
  };
}

export const ALL_16_GEOMANTIC_FIGURES: Record<string, ClassicalGeomanticFigure> = {
  via: {
    id: 'via',
    name: 'Via',
    latinName: 'The Way / The Path',
    arabicName: 'Tariq',
    tetragram: [1, 1, 1, 1],
    element: 'Water',
    planetaryRuler: 'Moon',
    zodiacSign: 'Cancer',
    quality: 'Mobile',
    oracleVerdict: 'Neutral/Mixed',
    innerEssence: 'Swift movement, journey, change of conditions, solitude, rapid flow.',
    divinationKeyword: 'Passage & Transition',
    mantleResonance: 'Subterranean groundwater channel boring swiftly through fault lines.',
    hexagramMatch: {
      number: 1,
      name: 'The Creative / Pure Active',
      chinese: '乾',
      pinyin: 'Qián',
      judgment: 'Supreme success. Perseverance furthers. The path moves unimpeded.',
    },
  },
  populus: {
    id: 'populus',
    name: 'Populus',
    latinName: 'The People / The Gathering',
    arabicName: 'Jamaa',
    tetragram: [2, 2, 2, 2],
    element: 'Water',
    planetaryRuler: 'Moon',
    zodiacSign: 'Cancer',
    quality: 'Stable',
    oracleVerdict: 'Neutral/Mixed',
    innerEssence: 'Multiplicity, reflection of surroundings, crowd consciousness, passivity, mirror.',
    divinationKeyword: 'Collective Mirror',
    mantleResonance: 'Sedimentary shale formed of billions of microscopic prehistoric organisms.',
    hexagramMatch: {
      number: 2,
      name: 'The Receptive / Earth Core',
      chinese: '坤',
      pinyin: 'Kūn',
      judgment: 'The earth yields and sustains all life. Receptive tranquility.',
    },
  },
  conjunctio: {
    id: 'conjunctio',
    name: 'Conjunctio',
    latinName: 'The Conjunction / Union',
    arabicName: 'Ijtima',
    tetragram: [2, 1, 1, 2],
    element: 'Air',
    planetaryRuler: 'Mercury',
    zodiacSign: 'Virgo',
    quality: 'Mobile',
    oracleVerdict: 'Favorable',
    innerEssence: 'Uniting of separate parties, contracts, recovery of lost items, marriage, communication.',
    divinationKeyword: 'Alliance & Synthesis',
    mantleResonance: 'Hydrothermal mineral bonding where quartz and gold crystallize into a single vein.',
    hexagramMatch: {
      number: 13,
      name: 'Fellowship with Men',
      chinese: '同人',
      pinyin: 'Tóng Rén',
      judgment: 'Union in open clarity brings victory across great rivers.',
    },
  },
  carcer: {
    id: 'carcer',
    name: 'Carcer',
    latinName: 'The Prison / The Sanctuary',
    arabicName: 'Uqlah',
    tetragram: [1, 2, 2, 1],
    element: 'Earth',
    planetaryRuler: 'Saturn',
    zodiacSign: 'Capricorn',
    quality: 'Stable',
    oracleVerdict: 'Caution/Volatile',
    innerEssence: 'Enclosure, isolation, boundaries, endurance, security, deep grounding, limitation.',
    divinationKeyword: 'Containment & Bedrock',
    mantleResonance: 'Ancient basaltic chamber deep below the crust holding immense molten potential.',
    hexagramMatch: {
      number: 29,
      name: 'The Abyssal Water / Cavern',
      chinese: '坎',
      pinyin: 'Kǎn',
      judgment: 'Maintain sincerity of heart in deep narrows. Mastery through patience.',
    },
  },
  fortuna_major: {
    id: 'fortuna_major',
    name: 'Fortuna Major',
    latinName: 'Greater Fortune / Sovereign Victory',
    arabicName: 'Nusrat al-Dakhil',
    tetragram: [2, 2, 1, 1],
    element: 'Fire',
    planetaryRuler: 'Sun',
    zodiacSign: 'Leo',
    quality: 'Entering',
    oracleVerdict: 'Highly Favorable',
    innerEssence: 'Triumph from within, noble honor, sovereign mastery, deep-rooted abundance, lasting success.',
    divinationKeyword: 'Sovereign Triumph',
    mantleResonance: 'Magmatic diamond pipe breaking through ancient cratons into eternal brilliance.',
    hexagramMatch: {
      number: 14,
      name: 'Possession in Great Measure',
      chinese: '大有',
      pinyin: 'Dà Yǒu',
      judgment: 'Supreme success. Radiant sun shining high in the heavens illuminates the ore.',
    },
  },
  fortuna_minor: {
    id: 'fortuna_minor',
    name: 'Fortuna Minor',
    latinName: 'Lesser Fortune / External Blessing',
    arabicName: 'Nusrat al-Kharij',
    tetragram: [1, 1, 2, 2],
    element: 'Fire',
    planetaryRuler: 'Sun',
    zodiacSign: 'Leo',
    quality: 'Exiting',
    oracleVerdict: 'Favorable',
    innerEssence: 'Swift external help, quick win, flash of inspiration, sudden luck, active momentum.',
    divinationKeyword: 'Sudden Illumination',
    mantleResonance: 'Geyser of thermal vapor flashing suddenly through fractured granite fissures.',
    hexagramMatch: {
      number: 30,
      name: 'The Clinging / Radiant Flame',
      chinese: '離',
      pinyin: 'Lí',
      judgment: 'Perseverance furthers. Nourish the inner sacred fire with steadiness.',
    },
  },
  acquisitio: {
    id: 'acquisitio',
    name: 'Acquisitio',
    latinName: 'Gain / Inward Prosperity',
    arabicName: 'Qabd al-Dakhil',
    tetragram: [2, 1, 2, 1],
    element: 'Fire',
    planetaryRuler: 'Jupiter',
    zodiacSign: 'Sagittarius',
    quality: 'Entering',
    oracleVerdict: 'Highly Favorable',
    innerEssence: 'Acquiring wealth, spiritual wisdom, expansion, profitable harvest, physical bounty.',
    divinationKeyword: 'Rich Ingathering',
    mantleResonance: 'Rich motherlode seam expanding outward through high-grade mineral ore.',
    hexagramMatch: {
      number: 26,
      name: 'Great Accumulation / Taming Power',
      chinese: '大畜',
      pinyin: 'Dà Xù',
      judgment: 'Accumulating immense virtue and resources. Crossing the great stream is favored.',
    },
  },
  amissio: {
    id: 'amissio',
    name: 'Amissio',
    latinName: 'Loss / Surrender & Release',
    arabicName: 'Qabd al-Kharij',
    tetragram: [1, 2, 1, 2],
    element: 'Earth',
    planetaryRuler: 'Venus',
    zodiacSign: 'Taurus',
    quality: 'Exiting',
    oracleVerdict: 'Caution/Volatile',
    innerEssence: 'Letting go, financial expenditure, surrender of attachment, liberation from burden.',
    divinationKeyword: 'Sacred Release',
    mantleResonance: 'Glacial erosion washing away superficial alluvial silt to expose virgin bedrock.',
    hexagramMatch: {
      number: 41,
      name: 'Decrease / Diminishing the Excess',
      chinese: '損',
      pinyin: 'Sǔn',
      judgment: 'Decrease what is superficial to increase what is essential. Supreme good fortune.',
    },
  },
  laetitia: {
    id: 'laetitia',
    name: 'Laetitia',
    latinName: 'Joy / Upward Radiance',
    arabicName: 'Farah',
    tetragram: [1, 2, 2, 2],
    element: 'Air',
    planetaryRuler: 'Jupiter',
    zodiacSign: 'Pisces',
    quality: 'Entering',
    oracleVerdict: 'Highly Favorable',
    innerEssence: 'Joy, elation, spiritual awakening, good news, health, expansion of hope, celebration.',
    divinationKeyword: 'Sublime Rejoicing',
    mantleResonance: 'Sunlight piercing through a sacred salt cathedral cavern illuminating crystal vaults.',
    hexagramMatch: {
      number: 58,
      name: 'The Joyous / Lake Harmony',
      chinese: '兌',
      pinyin: 'Duì',
      judgment: 'Joyous communication and mutual encouragement bring enduring harmony.',
    },
  },
  tristitia: {
    id: 'tristitia',
    name: 'Tristitia',
    latinName: 'Sorrow / Descent into Bedrock',
    arabicName: 'Huzn',
    tetragram: [2, 2, 2, 1],
    element: 'Earth',
    planetaryRuler: 'Saturn',
    zodiacSign: 'Scorpio',
    quality: 'Entering',
    oracleVerdict: 'Caution/Volatile',
    innerEssence: 'Grief, heavy gravity, deep emotional excavation, foundational anchoring, seriousness.',
    divinationKeyword: 'Foundational Gravity',
    mantleResonance: 'Deepest tectonic mantle pressure condensing carbon into indestructible diamond.',
    hexagramMatch: {
      number: 52,
      name: 'Keeping Still / Mountain Meditation',
      chinese: '艮',
      pinyin: 'Gèn',
      judgment: 'Stillness of the back. Entering the inner sanctuary beyond turbulence.',
    },
  },
  puella: {
    id: 'puella',
    name: 'Puella',
    latinName: 'The Maiden / Elegance & Harmony',
    arabicName: 'Khadd',
    tetragram: [1, 2, 1, 1],
    element: 'Air',
    planetaryRuler: 'Venus',
    zodiacSign: 'Libra',
    quality: 'Entering',
    oracleVerdict: 'Favorable',
    innerEssence: 'Grace, aesthetic refinement, romance, superficial pleasure, peace, reconciliation.',
    divinationKeyword: 'Aesthetic Grace',
    mantleResonance: 'Delicate fibrous malachite and chrysocolla growing in velvety green formations.',
    hexagramMatch: {
      number: 22,
      name: 'Grace / Adornment of Form',
      chinese: '賁',
      pinyin: 'Bì',
      judgment: 'Grace has success in small matters. Simplicity beneath beauty.',
    },
  },
  puer: {
    id: 'puer',
    name: 'Puer',
    latinName: 'The Youth / The Warrior Flame',
    arabicName: 'Kawsaj',
    tetragram: [1, 1, 2, 1],
    element: 'Fire',
    planetaryRuler: 'Mars',
    zodiacSign: 'Aries',
    quality: 'Exiting',
    oracleVerdict: 'Caution/Volatile',
    innerEssence: 'Action, courage, impulse, rivalry, boldness, initiative, rashness, unbridled force.',
    divinationKeyword: 'Pioneering Thrust',
    mantleResonance: 'Volcanic magma breaching the crust in explosive thermal liberation.',
    hexagramMatch: {
      number: 34,
      name: 'The Power of the Great / Thunder in Sky',
      chinese: '大壯',
      pinyin: 'Dà Zhuàng',
      judgment: 'Power requires righteousness. Avoid ramming horns into hedges.',
    },
  },
  rubeus: {
    id: 'rubeus',
    name: 'Rubeus',
    latinName: 'The Red / Passion & Volcanic Shock',
    arabicName: 'Humrah',
    tetragram: [2, 1, 2, 2],
    element: 'Fire',
    planetaryRuler: 'Mars',
    zodiacSign: 'Scorpio',
    quality: 'Mobile',
    oracleVerdict: 'Caution/Volatile',
    innerEssence: 'Raw instinct, danger, intense alchemical transmutation, turbulent passion, crisis.',
    divinationKeyword: 'Alchemical Crucible',
    mantleResonance: 'Cinnabar and native mercury bubbling in subterranean thermal vents.',
    hexagramMatch: {
      number: 51,
      name: 'The Arousing / Shocking Thunder',
      chinese: '震',
      pinyin: 'Zhèn',
      judgment: 'Shock brings panic, then brings laughter. Inner equilibrium preserves sacred wine.',
    },
  },
  albus: {
    id: 'albus',
    name: 'Albus',
    latinName: 'The White / Lucid Wisdom',
    arabicName: 'Bayad',
    tetragram: [2, 2, 1, 2],
    element: 'Air',
    planetaryRuler: 'Mercury',
    zodiacSign: 'Gemini',
    quality: 'Entering',
    oracleVerdict: 'Highly Favorable',
    innerEssence: 'Clarity of mind, pure intention, intellectual mastery, peace, honest diplomacy.',
    divinationKeyword: 'Crystalline Lucidity',
    mantleResonance: 'Pure optical selenite and clear quartz filtering atmospheric light deep underground.',
    hexagramMatch: {
      number: 57,
      name: 'The Gentle / Penetrating Wind',
      chinese: '巽',
      pinyin: 'Xùn',
      judgment: 'Subtle persistent influence. Clarity penetrates all barriers like morning wind.',
    },
  },
  caput_draconis: {
    id: 'caput_draconis',
    name: 'Caput Draconis',
    latinName: "The Dragon's Head / The Ascending Portal",
    arabicName: 'Ataba Kharija',
    tetragram: [2, 1, 1, 1],
    element: 'Earth',
    planetaryRuler: 'North Node',
    zodiacSign: 'Taurus',
    quality: 'Entering',
    oracleVerdict: 'Highly Favorable',
    innerEssence: 'New beginnings, spiritual initiation, threshold crossing, destiny gate, entry point.',
    divinationKeyword: 'Destiny Threshold',
    mantleResonance: 'The borehole entrance descending into the deep mantle of the planet.',
    hexagramMatch: {
      number: 11,
      name: 'Peace / Heaven & Earth in Harmony',
      chinese: '泰',
      pinyin: 'Tài',
      judgment: 'The small departs, the great approaches. Good fortune and success.',
    },
  },
  cauda_draconis: {
    id: 'cauda_draconis',
    name: 'Cauda Draconis',
    latinName: "The Dragon's Tail / Karmic Closure",
    arabicName: 'Ataba Dakhila',
    tetragram: [1, 1, 1, 2],
    element: 'Fire',
    planetaryRuler: 'South Node',
    zodiacSign: 'Scorpio',
    quality: 'Exiting',
    oracleVerdict: 'Caution/Volatile',
    innerEssence: 'Karmic completion, closing doors, final harvest, exiting obsolete cycles, banishing.',
    divinationKeyword: 'Karmic Sealing',
    mantleResonance: 'Sealing of an exhausted mineral vein with ancient clay and sacred stone.',
    hexagramMatch: {
      number: 12,
      name: 'Standstill / Stagnation Dissolving',
      chinese: '否',
      pinyin: 'Pǐ',
      judgment: 'Evil people do not favor the perseverance of the superior. The noble retires to prepare the return.',
    },
  },
};

/**
 * Add two 4-line tetragrams using modulo 2 binary parity addition
 */
export function addTetragrams(a: TetragramLines, b: TetragramLines): TetragramLines {
  return [
    ((a[0] + b[0]) % 2 === 0 ? 2 : 1) as 1 | 2,
    ((a[1] + b[1]) % 2 === 0 ? 2 : 1) as 1 | 2,
    ((a[2] + b[2]) % 2 === 0 ? 2 : 1) as 1 | 2,
    ((a[3] + b[3]) % 2 === 0 ? 2 : 1) as 1 | 2,
  ];
}

/**
 * Find Geomantic Figure by exact tetragram lines
 */
export function findFigureByTetragram(tetragram: TetragramLines): ClassicalGeomanticFigure {
  for (const key of Object.keys(ALL_16_GEOMANTIC_FIGURES)) {
    const fig = ALL_16_GEOMANTIC_FIGURES[key];
    if (
      fig.tetragram[0] === tetragram[0] &&
      fig.tetragram[1] === tetragram[1] &&
      fig.tetragram[2] === tetragram[2] &&
      fig.tetragram[3] === tetragram[3]
    ) {
      return fig;
    }
  }
  return ALL_16_GEOMANTIC_FIGURES.fortuna_major;
}

export interface AstrologicalHousePlacement {
  houseNumber: number;
  houseTitle: string;
  traditionalSphere: string;
  zodiacRuler: string;
  figure: ClassicalGeomanticFigure;
  aspectToAscendant: string;
  interpretation: string;
}

export interface FullGeomanticShieldChart {
  mothers: ClassicalGeomanticFigure[]; // 4 Mothers (Matres)
  daughters: ClassicalGeomanticFigure[]; // 4 Daughters (Filiae)
  nephews: ClassicalGeomanticFigure[]; // 4 Nephews (Nepotes)
  rightWitness: ClassicalGeomanticFigure; // Dexter Witness (Past / Internal)
  leftWitness: ClassicalGeomanticFigure; // Sinister Witness (Future / External)
  judge: ClassicalGeomanticFigure; // Judex (Supreme Verdict)
  reconciler: ClassicalGeomanticFigure; // Superjudex (Judge + Mother 1)
  houses: AstrologicalHousePlacement[]; // 12 Astrological Houses
}

export interface PlanetaryHourProfile {
  dayOfWeek: string;
  isDaytime: boolean;
  dayRuler: PlanetaryRuler;
  hourRuler: PlanetaryRuler;
  solarAltitudeDeg: number;
  chaldeanSequenceIndex: number;
  lunarPhaseName: string;
  lunarIlluminationPercent: number;
  lunarAgeDays: number;
  lunarMansion: {
    number: number;
    name: string;
    arabicName: string;
    meaning: string;
    stoneResonance: string;
  };
}

export interface TectonicPiezoProfile {
  nearestBoundaryName: string;
  boundaryType: 'Subduction / Trench' | 'Mid-Ocean Ridge' | 'Continental Rift' | 'Transform Fault';
  distanceToBoundaryKm: number;
  crustalStressMpa: number;
  geothermalTempCelsius: number;
  piezoElectricResonanceHz: number;
  mineralLatticeConductivity: string;
}

export interface MasterAccurateDivinationSystemResult {
  shieldChart: FullGeomanticShieldChart;
  planetaryHours: PlanetaryHourProfile;
  tectonicResonance: TectonicPiezoProfile;
  primaryIChing: {
    number: number;
    name: string;
    hexagramSymbol: string;
    lines: (0 | 1)[];
    judgment: string;
  };
  transformedIChing: {
    number: number;
    name: string;
    hexagramSymbol: string;
    lines: (0 | 1)[];
    judgment: string;
  };
  movingLineIndices: number[]; // 1-indexed
  divinatorySynthesis: {
    supremeVerdict: string;
    temporalFulfillmentDate: string;
    astrologicalAscendantImpact: string;
    chthonicActionPlan: string;
  };
}

/**
 * 28 Mansions of the Moon (Al-Manazil) for high-accuracy lunar astrology
 */
export const LUNAR_MANSIONS = [
  { number: 1, name: 'Al-Sharatain (The Horns of the Ram)', arabicName: 'الشرطان', meaning: 'Initiative, boldness, travel, swift enterprise', stoneResonance: 'Carnelian & Fire Agate' },
  { number: 2, name: 'Al-Butain (The Belly)', arabicName: 'البطين', meaning: 'Secret treasures, digging mines, subterranean stability', stoneResonance: 'Pyrite & Raw Gold' },
  { number: 3, name: 'Al-Thurayya (The Pleiades)', arabicName: 'الثريا', meaning: 'High brilliance, abundance, illumination, art', stoneResonance: 'Blue Sapphire & Selenite' },
  { number: 4, name: 'Al-Dabaran (The Follower / Aldebaran)', arabicName: 'الدبران', meaning: 'Passionate defense, overcoming obstacles, construction', stoneResonance: 'Ruby & Cinnabar' },
  { number: 5, name: 'Al-Haqah (The White Spot)', arabicName: 'الهقعة', meaning: 'Wisdom, education, treaties, mental clarity', stoneResonance: 'Lapis Lazuli & Clear Quartz' },
  { number: 6, name: 'Al-Hanah (The Mark)', arabicName: 'الهنعة', meaning: 'Friendship, commercial alliances, hunting for seams', stoneResonance: 'Emerald & Malachite' },
  { number: 7, name: 'Al-Dhira (The Forearms of the Lion)', arabicName: 'الذراع', meaning: 'Divine protection, victory over trials, abundance', stoneResonance: 'Golden Topaz & Citrine' },
  { number: 8, name: 'Al-Nathrah (The Gap in the Mane)', arabicName: 'النثرة', meaning: 'Love, domestic peace, tranquil harvest', stoneResonance: 'Rose Quartz & Pearl' },
  { number: 9, name: 'Al-Tarf (The Glancing Eye)', arabicName: 'الطرف', meaning: 'Discerning deception, protecting boundaries', stoneResonance: 'Black Tourmaline & Obsidian' },
  { number: 10, name: 'Al-Jabhah (The Forehead / Regulus)', arabicName: 'الجبهة', meaning: 'Sovereign authority, leadership, royal elevation', stoneResonance: 'Diamond & Native Gold' },
  { number: 11, name: 'Al-Zubrah (The Mane of the Lion)', arabicName: 'الزبرة', meaning: 'Steadfast courage, building foundations', stoneResonance: 'Garnet & Hematite' },
  { number: 12, name: 'Al-Sarfah (The Changer of Weather)', arabicName: 'الصرفة', meaning: 'Harvesting crops, breaking old agreements', stoneResonance: 'Moss Agate & Jasper' },
  { number: 13, name: 'Al-Awwa (The Barker)', arabicName: 'العواء', meaning: 'Financial transactions, generosity, travel', stoneResonance: 'Aquamarine & Turquoise' },
  { number: 14, name: 'Al-Simak (The Unarmed / Spica)', arabicName: 'السماك الأعزل', meaning: 'Artistic perfection, spiritual insight, synthesis', stoneResonance: 'Amethyst & Moonstone' },
  { number: 15, name: 'Al-Ghafr (The Covering)', arabicName: 'الغفر', meaning: 'Healing of subterranean waters, mining discovery', stoneResonance: 'Fluorite & Sodalite' },
  { number: 16, name: 'Al-Zubana (The Claws / Scales)', arabicName: 'الزبانا', meaning: 'Just commerce, legal victories, equilibrium', stoneResonance: 'Chrysocolla & Rhodonite' },
  { number: 17, name: 'Al-Iklil (The Crown)', arabicName: 'الإكليل', meaning: 'Steadfast loyalty, secret pacts, preservation', stoneResonance: 'Tiger Eye & Sunstone' },
  { number: 18, name: 'Al-Qalb (The Heart / Antares)', arabicName: 'القلب', meaning: 'Tectonic transformation, intense catharsis', stoneResonance: 'Volcanic Basalt & Bloodstone' },
  { number: 19, name: 'Al-Shawlah (The Sting)', arabicName: 'الشولة', meaning: 'Decisive strikes, severing ties, overcoming foes', stoneResonance: 'Obsidian & Smoky Quartz' },
  { number: 20, name: 'Al-Naam (The Ostriches)', arabicName: 'النعائم', meaning: 'Taming wild elements, rapid progress, hunting truth', stoneResonance: 'Labradorite & Aventurine' },
  { number: 21, name: 'Al-Baldah (The City / Vacant Spot)', arabicName: 'البلدة', meaning: 'Rest, foundation stones, deep underground peace', stoneResonance: 'Halite & White Calcite' },
  { number: 22, name: 'Saad al-Dhabih (The Fortune of the Slayer)', arabicName: 'سعد الذابح', meaning: 'Healing of severe wounds, releasing debts', stoneResonance: 'Serpentine & Jade' },
  { number: 23, name: 'Saad Bula (The Fortune of the Glutton)', arabicName: 'سعد بلع', meaning: 'Absorbing knowledge, mining deep seams', stoneResonance: 'Copper Ore & Bronzite' },
  { number: 24, name: 'Saad al-Suud (The Fortune of Fortunes)', arabicName: 'سعد السعود', meaning: 'Supreme blessing, marriage, joyful fruitfulness', stoneResonance: 'Kunzite & Golden Beryl' },
  { number: 25, name: 'Saad al-Akhbiyah (The Fortune of the Tents)', arabicName: 'سعد الأخبية', meaning: 'Uncovering secrets, discovering hidden springs', stoneResonance: 'Celestite & Blue Lace Agate' },
  { number: 26, name: 'Al-Fargh al-Muqdim (The Upper Spout)', arabicName: 'الفرغ المقدم', meaning: 'Union, building enduring structures, planting', stoneResonance: 'Amazonite & Chrysoprase' },
  { number: 27, name: 'Al-Fargh al-Muakhir (The Lower Spout)', arabicName: 'الفرغ المؤخر', meaning: 'Spiritual liberation, trade, ocean crossings', stoneResonance: 'Larimar & Aquamarine' },
  { number: 28, name: 'Batn al-Hut (The Belly of the Fish)', arabicName: 'بطن الحوت', meaning: 'Safety in journeys, peace, ultimate return', stoneResonance: 'Amber & Pearl' },
];

/**
 * Calculates high-accuracy planetary hour according to Chaldean order
 */
export function calculatePlanetaryHours(date: Date = new Date(), lat: number = 37.77, lng: number = -122.41): PlanetaryHourProfile {
  const CHALDEAN_ORDER: PlanetaryRuler[] = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];
  const DAY_RULERS: PlanetaryRuler[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn']; // Sunday to Saturday
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dayOfWeekIdx = date.getDay();
  const dayRuler = DAY_RULERS[dayOfWeekIdx];
  const dayName = DAY_NAMES[dayOfWeekIdx];

  // Approximate sunrise at 6:00 and sunset at 18:00 adjusted for day of year
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.max(1, Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)));
  const solarDeclination = 23.45 * Math.sin(((dayOfYear - 80) * 2 * Math.PI) / 365.25);
  const hours = date.getHours() + date.getMinutes() / 60;
  const isDaytime = hours >= 6.0 && hours < 18.0;

  // Calculate planetary hour index in Chaldean cycle
  const dayRulerStartIdx = CHALDEAN_ORDER.indexOf(dayRuler);
  const elapsedHoursFromDawn = isDaytime ? Math.floor(hours - 6.0) : Math.floor((hours >= 18.0 ? hours - 18.0 : hours + 6.0) + 12);
  const hourIndex = (dayRulerStartIdx + elapsedHoursFromDawn) % 7;
  const hourRuler = CHALDEAN_ORDER[hourIndex];

  // Lunar phase calculation (Synodic month = 29.53058867 days)
  const knownNewMoon = new Date('2026-08-12T17:37:00Z').getTime();
  const diffDays = (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
  const lunarAgeDays = ((diffDays % 29.53058867) + 29.53058867) % 29.53058867;
  const lunarIlluminationPercent = Math.round((1 - Math.cos((lunarAgeDays / 29.53058867) * 2 * Math.PI)) * 50);

  let lunarPhaseName = 'Waxing Crescent';
  if (lunarAgeDays < 1.84) lunarPhaseName = 'New Moon (Dark Moon Phase)';
  else if (lunarAgeDays < 5.53) lunarPhaseName = 'Waxing Crescent';
  else if (lunarAgeDays < 9.22) lunarPhaseName = 'First Quarter Moon';
  else if (lunarAgeDays < 12.91) lunarPhaseName = 'Waxing Gibbous';
  else if (lunarAgeDays < 16.61) lunarPhaseName = 'Full Moon (Maximum Illumination)';
  else if (lunarAgeDays < 20.30) lunarPhaseName = 'Waning Gibbous (Disseminating)';
  else if (lunarAgeDays < 23.99) lunarPhaseName = 'Third / Last Quarter Moon';
  else if (lunarAgeDays < 27.68) lunarPhaseName = 'Waning Crescent (Balsamic)';
  else lunarPhaseName = 'New Moon (Dark Moon Phase)';

  // 28 Mansions of the Moon index (each mansion is ~12.857 degrees of the 360 ecliptic)
  const mansionIdx = Math.floor((lunarAgeDays / 29.53058867) * 28) % 28;
  const mansion = LUNAR_MANSIONS[mansionIdx];

  const solarAltitudeDeg = Math.round(
    Math.sin(((hours - 6) / 12) * Math.PI) * (90 - Math.abs(lat - solarDeclination))
  );

  return {
    dayOfWeek: dayName,
    isDaytime,
    dayRuler,
    hourRuler,
    solarAltitudeDeg,
    chaldeanSequenceIndex: hourIndex + 1,
    lunarPhaseName,
    lunarIlluminationPercent,
    lunarAgeDays: Math.round(lunarAgeDays * 10) / 10,
    lunarMansion: mansion,
  };
}

/**
 * Calculates tectonic plate boundary distance and piezoelectric crystal resonance
 */
export function calculateTectonicResonance(mine: WorldMine): TectonicPiezoProfile {
  const depth = mine.depthMeters || 800;
  // Geothermal gradient: ~25°C base + 25°C per 1000m depth
  const temp = Math.round(25 + (depth / 1000) * 28);
  // Crustal lithostatic pressure: ~27 MPa per km of granite/basalt
  const stressMpa = Math.round((depth / 1000) * 27.5 * 10) / 10;

  // Major plate boundary detection based on lat/lng coordinates
  let boundary = 'Circum-Pacific Ring of Fire';
  let boundaryType: TectonicPiezoProfile['boundaryType'] = 'Subduction / Trench';
  let distKm = 340;

  const lat = mine.lat || 0;
  const lng = mine.lng || 0;

  if (lat > 20 && lat < 45 && lng > -20 && lng < 80) {
    boundary = 'Alpine-Himalayan Orogenic Collision Zone';
    boundaryType = 'Continental Rift';
    distKm = Math.round(Math.abs(lat - 32) * 45 + 120);
  } else if (lng > -45 && lng < -15) {
    boundary = 'Mid-Atlantic Spreading Ridge';
    boundaryType = 'Mid-Ocean Ridge';
    distKm = Math.round(Math.abs(lng - (-30)) * 60 + 80);
  } else if (lat > -20 && lat < 15 && lng > 25 && lng < 45) {
    boundary = 'East African Great Rift Valley';
    boundaryType = 'Continental Rift';
    distKm = Math.round(Math.abs(lng - 36) * 50 + 90);
  } else if (lng > 100 || lng < -70) {
    boundary = 'Circum-Pacific Megathrust Subduction Zone';
    boundaryType = 'Subduction / Trench';
    distKm = Math.round(Math.abs(lat * 0.3) + 140);
  } else {
    boundary = 'Intra-Continental Stable Cratonic Shield';
    boundaryType = 'Transform Fault';
    distKm = 480;
  }

  // Quartz / Pyrite piezoelectric resonance: fundamental natural harmonic
  const mineralName = (mine.primaryMineral || '').toLowerCase();
  let piezoHz = 528;
  let conductivity = 'Medium Semi-Conducting Lattice';

  if (mineralName.includes('quartz') || mineralName.includes('silica')) {
    piezoHz = 432;
    conductivity = 'High Piezoelectric Frequency Resonator (32.768 kHz Harmonic)';
  } else if (mineralName.includes('gold') || mineralName.includes('copper')) {
    piezoHz = 963;
    conductivity = 'Ultra-High Native Metallic Electrical Conductivity';
  } else if (mineralName.includes('salt') || mineralName.includes('halite')) {
    piezoHz = 639;
    conductivity = 'Ionic Saline Transduction & Far-Infrared Emission';
  } else if (mineralName.includes('diamond') || mineralName.includes('carbon')) {
    piezoHz = 741;
    conductivity = 'Super-Hard Covalent Diamond Lattice Optical Waveguide';
  } else if (mineralName.includes('iron') || mineralName.includes('hematite') || mineralName.includes('magnetite')) {
    piezoHz = 396;
    conductivity = 'Ferromagnetic Geomagnetic Earth Shield';
  }

  return {
    nearestBoundaryName: boundary,
    boundaryType,
    distanceToBoundaryKm: distKm,
    crustalStressMpa: stressMpa,
    geothermalTempCelsius: temp,
    piezoElectricResonanceHz: piezoHz,
    mineralLatticeConductivity: conductivity,
  };
}

/**
 * GENERATES THE FULL 16-FIGURE CLASSICAL GEOMANTIC SHIELD & 12 HOUSES CHART
 * Fully adheres to Gerard of Cremona, Pietro d'Abano, and Agrippa's classical rules.
 */
export function generateClassicalShieldChart(
  question: string,
  drawnMines: WorldMine[],
  targetDateStr?: string,
  userZodiac?: string
): FullGeomanticShieldChart {
  const qClean = (question || 'General Inquiry').trim();
  const dateObj = new Date(targetDateStr || new Date().toISOString().split('T')[0]);
  const leadMine = drawnMines[0] || { lat: 37.7, lng: -122.4, depthMeters: 800, primaryMineral: 'Gold' };

  // Calculate 4 Mothers deterministically from Seeker's vibration + Earth coordinates + Ephemeris
  const seed1 = Math.abs(qClean.length * 17 + Math.floor(leadMine.lat * 100) + dateObj.getDate());
  const seed2 = Math.abs(qClean.charCodeAt(0) * 13 + Math.floor(leadMine.lng * 100) + dateObj.getMonth() + 1);
  const seed3 = Math.abs(leadMine.depthMeters + dateObj.getFullYear() + (leadMine.primaryMineral?.length || 5));
  const seed4 = Math.abs(qClean.charCodeAt(qClean.length - 1) * 19 + dateObj.getDay() + 7);

  const m1_lines: TetragramLines = [
    ((seed1 >> 0) % 2 === 0 ? 2 : 1),
    ((seed1 >> 1) % 2 === 0 ? 2 : 1),
    ((seed1 >> 2) % 2 === 0 ? 2 : 1),
    ((seed1 >> 3) % 2 === 0 ? 2 : 1),
  ];
  const m2_lines: TetragramLines = [
    ((seed2 >> 0) % 2 === 0 ? 2 : 1),
    ((seed2 >> 1) % 2 === 0 ? 2 : 1),
    ((seed2 >> 2) % 2 === 0 ? 2 : 1),
    ((seed2 >> 3) % 2 === 0 ? 2 : 1),
  ];
  const m3_lines: TetragramLines = [
    ((seed3 >> 0) % 2 === 0 ? 2 : 1),
    ((seed3 >> 1) % 2 === 0 ? 2 : 1),
    ((seed3 >> 2) % 2 === 0 ? 2 : 1),
    ((seed3 >> 3) % 2 === 0 ? 2 : 1),
  ];
  const m4_lines: TetragramLines = [
    ((seed4 >> 0) % 2 === 0 ? 2 : 1),
    ((seed4 >> 1) % 2 === 0 ? 2 : 1),
    ((seed4 >> 2) % 2 === 0 ? 2 : 1),
    ((seed4 >> 3) % 2 === 0 ? 2 : 1),
  ];

  const mother1 = findFigureByTetragram(m1_lines);
  const mother2 = findFigureByTetragram(m2_lines);
  const mother3 = findFigureByTetragram(m3_lines);
  const mother4 = findFigureByTetragram(m4_lines);

  // 4 Daughters (Filiae) are formed by reading rows across the 4 Mothers horizontally!
  // Row 1 of Mothers 1, 2, 3, 4 forms Daughter 1
  // Row 2 of Mothers 1, 2, 3, 4 forms Daughter 2
  // Row 3 of Mothers 1, 2, 3, 4 forms Daughter 3
  // Row 4 of Mothers 1, 2, 3, 4 forms Daughter 4
  const d1_lines: TetragramLines = [m1_lines[0], m2_lines[0], m3_lines[0], m4_lines[0]];
  const d2_lines: TetragramLines = [m1_lines[1], m2_lines[1], m3_lines[1], m4_lines[1]];
  const d3_lines: TetragramLines = [m1_lines[2], m2_lines[2], m3_lines[2], m4_lines[2]];
  const d4_lines: TetragramLines = [m1_lines[3], m2_lines[3], m3_lines[3], m4_lines[3]];

  const daughter1 = findFigureByTetragram(d1_lines);
  const daughter2 = findFigureByTetragram(d2_lines);
  const daughter3 = findFigureByTetragram(d3_lines);
  const daughter4 = findFigureByTetragram(d4_lines);

  // 4 Nephews (Nepotes):
  // Nephew 1 = Mother 1 + Mother 2
  // Nephew 2 = Mother 3 + Mother 4
  // Nephew 3 = Daughter 1 + Daughter 2
  // Nephew 4 = Daughter 3 + Daughter 4
  const nephew1 = findFigureByTetragram(addTetragrams(m1_lines, m2_lines));
  const nephew2 = findFigureByTetragram(addTetragrams(m3_lines, m4_lines));
  const nephew3 = findFigureByTetragram(addTetragrams(d1_lines, d2_lines));
  const nephew4 = findFigureByTetragram(addTetragrams(d3_lines, d4_lines));

  // 2 Witnesses (Testes):
  // Right Witness (Dexter - Past & Inner Cause) = Nephew 1 + Nephew 2
  // Left Witness (Sinister - Future & External Environment) = Nephew 3 + Nephew 4
  const rightWitness = findFigureByTetragram(addTetragrams(nephew1.tetragram, nephew2.tetragram));
  const leftWitness = findFigureByTetragram(addTetragrams(nephew3.tetragram, nephew4.tetragram));

  // 1 Supreme Judge (Judex):
  // Judge = Right Witness + Left Witness
  // *Note: In authentic geomancy, the Judge always contains an EVEN sum of points (6, 8, 10, or 12).
  const judge = findFigureByTetragram(addTetragrams(rightWitness.tetragram, leftWitness.tetragram));

  // 1 Reconciler (Superjudex):
  // Reconciler = Judge + Mother 1 (Clarifies how the seeker reaches the final verdict)
  const reconciler = findFigureByTetragram(addTetragrams(judge.tetragram, mother1.tetragram));

  // 12 Astrological Houses
  const HOUSE_DATA = [
    { num: 1, title: 'First House (Vita / The Ascendant)', sphere: 'Life, Mind, Physical Health & Seeker Identity', ruler: 'Aries / Mars', fig: mother1, aspect: 'Ascendant (Self)' },
    { num: 2, title: 'Second House (Lucrum / Resources)', sphere: 'Personal Wealth, Material Ore, Assets & Energy', ruler: 'Taurus / Venus', fig: mother2, aspect: 'Semi-Sextile (30°)' },
    { num: 3, title: 'Third House (Fratres / Mind)', sphere: 'Short Journeys, Sibling Kin, Mind & Communications', ruler: 'Gemini / Mercury', fig: mother3, aspect: 'Sextile (60°)' },
    { num: 4, title: 'Fourth House (Genitor / The Bedrock)', sphere: 'Home, Ancestry, Earth Mantle & The End of the Matter', ruler: 'Cancer / Moon', fig: mother4, aspect: 'Square (90° - Nadir)' },
    { num: 5, title: 'Fifth House (Nati / Creation)', sphere: 'Joy, Creativity, Children, Intuitive Sparks & Pleasure', ruler: 'Leo / Sun', fig: daughter1, aspect: 'Trine (120°)' },
    { num: 6, title: 'Sixth House (Valetudo / Duty)', sphere: 'Daily Work, Bodily Cleansing, Service & Minor Sickness', ruler: 'Virgo / Mercury', fig: daughter2, aspect: 'Quincunx (150°)' },
    { num: 7, title: 'Seventh House (Uxor / The Partner)', sphere: 'Contracts, Marriage, Allies, Open Opponents & Mirrors', ruler: 'Libra / Venus', fig: daughter3, aspect: 'Opposition (180°)' },
    { num: 8, title: 'Eighth House (Mors / Transmutation)', sphere: 'Shared Resources, Deep Catharsis, Rebirth & Occult Truth', ruler: 'Scorpio / Pluto', fig: daughter4, aspect: 'Quincunx (150°)' },
    { num: 9, title: 'Ninth House (Iter / Long Journeys)', sphere: 'Higher Philosophy, Foreign Lands, Dreams & Divine Law', ruler: 'Sagittarius / Jupiter', fig: nephew1, aspect: 'Trine (120°)' },
    { num: 10, title: 'Tenth House (Regnum / The Midheaven)', sphere: 'Public Standing, Vocation, Honor, Sovereignty & Destiny', ruler: 'Capricorn / Saturn', fig: nephew2, aspect: 'Square (90° - Zenith)' },
    { num: 11, title: 'Eleventh House (Benefacta / Hopes)', sphere: 'Allies, Benefactors, Highest Aspirations & Soul Friends', ruler: 'Aquarius / Uranus', fig: nephew3, aspect: 'Sextile (60°)' },
    { num: 12, title: 'Twelfth House (Carcer / Karma)', sphere: 'Hidden Blocks, Subconscious Vaults, Karmic Clearing & Solitude', ruler: 'Pisces / Neptune', fig: nephew4, aspect: 'Semi-Sextile (30°)' },
  ];

  const houses: AstrologicalHousePlacement[] = HOUSE_DATA.map((h) => ({
    houseNumber: h.num,
    houseTitle: h.title,
    traditionalSphere: h.sphere,
    zodiacRuler: h.ruler,
    figure: h.fig,
    aspectToAscendant: h.aspect,
    interpretation: `${h.fig.name} in the ${h.num}${h.num === 1 ? 'st' : h.num === 2 ? 'nd' : h.num === 3 ? 'rd' : 'th'} House indicates that ${h.fig.divinationKeyword.toLowerCase()} directly influences your ${h.sphere.toLowerCase()}. Its ${h.fig.element} element and ${h.fig.planetaryRuler} rulership reveal ${h.fig.innerEssence.toLowerCase()}`,
  }));

  return {
    mothers: [mother1, mother2, mother3, mother4],
    daughters: [daughter1, daughter2, daughter3, daughter4],
    nephews: [nephew1, nephew2, nephew3, nephew4],
    rightWitness,
    leftWitness,
    judge,
    reconciler,
    houses,
  };
}

/**
 * MASTER FUNCTION: Executes the entire multi-vector divination system
 */
export function executeAccurateDivination(
  question: string,
  drawnMines: WorldMine[],
  targetDateStr?: string,
  userZodiac?: string
): MasterAccurateDivinationSystemResult {
  const leadMine = drawnMines[0] || {
    id: 'default_mine',
    name: 'Great Abyssal Mantle Seam',
    location: 'Earth Mantle',
    country: 'Global Subterranea',
    lat: 37.77,
    lng: -122.41,
    depthMeters: 1200,
    primaryMineral: 'Native Gold & Quartz',
  } as WorldMine;

  const targetDate = targetDateStr || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];

  // 1. Classical 16-Figure Shield & 12 Astrological Houses
  const shieldChart = generateClassicalShieldChart(question, drawnMines, targetDate, userZodiac);

  // 2. Ephemeris & Planetary Hour Calculation
  const planetaryHours = calculatePlanetaryHours(new Date(), leadMine.lat || 37.77, leadMine.lng || -122.41);

  // 3. Subterranean Tectonic Stress & Piezo-Crystal Resonance
  const tectonicResonance = calculateTectonicResonance(leadMine);

  // 4. I Ching Hexagram Binary Mapping (Judge + Right Witness)
  // Map 4 lines of Judge + top 2 lines of Right Witness to form a 6-line Hexagram
  const pLines: (0 | 1)[] = [
    shieldChart.judge.tetragram[0] === 1 ? 1 : 0,
    shieldChart.judge.tetragram[1] === 1 ? 1 : 0,
    shieldChart.judge.tetragram[2] === 1 ? 1 : 0,
    shieldChart.judge.tetragram[3] === 1 ? 1 : 0,
    shieldChart.rightWitness.tetragram[0] === 1 ? 1 : 0,
    shieldChart.leftWitness.tetragram[0] === 1 ? 1 : 0,
  ];

  // Identify moving lines based on odd/even parity resonance
  const movingLineIndices: number[] = [];
  if (shieldChart.mothers[0]?.tetragram[0] === 1) movingLineIndices.push(1);
  if (shieldChart.reconciler?.tetragram[2] === 1) movingLineIndices.push(3);
  if (shieldChart.judge?.oracleVerdict === 'Highly Favorable' || shieldChart.judge?.oracleVerdict === 'Caution/Volatile') movingLineIndices.push(5);
  if (movingLineIndices.length === 0) movingLineIndices.push(2);

  const tLines: (0 | 1)[] = pLines.map((val, idx) => (movingLineIndices.includes(idx + 1) ? (val === 1 ? 0 : 1) : val));

  const primaryIChing = {
    number: shieldChart.judge.hexagramMatch.number,
    name: shieldChart.judge.hexagramMatch.name,
    hexagramSymbol: shieldChart.judge.hexagramMatch.chinese,
    lines: pLines,
    judgment: shieldChart.judge.hexagramMatch.judgment,
  };

  const transformedIChing = {
    number: shieldChart.reconciler.hexagramMatch.number,
    name: shieldChart.reconciler.hexagramMatch.name,
    hexagramSymbol: shieldChart.reconciler.hexagramMatch.chinese,
    lines: tLines,
    judgment: shieldChart.reconciler.hexagramMatch.judgment,
  };

  const divinatorySynthesis = {
    supremeVerdict: `${shieldChart.judge.name} (${shieldChart.judge.latinName}): ${shieldChart.judge.oracleVerdict}. ${shieldChart.judge.innerEssence}`,
    temporalFulfillmentDate: targetDate,
    astrologicalAscendantImpact: `With ${shieldChart.houses[0].figure.name} rising on the First House, your energetic station is calibrated to ${shieldChart.houses[0].figure.divinationKeyword}. Meanwhile, the 10th House of Midheaven is anchored by ${shieldChart.houses[9].figure.name}, signifying vocational mastery through ${shieldChart.houses[9].figure.mantleResonance}.`,
    chthonicActionPlan: `In the hour of ${planetaryHours.hourRuler} under the ${planetaryHours.lunarPhaseName}, invoke the resonance of ${tectonicResonance.nearestBoundaryName}. Harmonize your energy with ${tectonicResonance.piezoElectricResonanceHz} Hz frequency and ${leadMine.primaryMineral || 'natural ore'} grounding.`,
  };

  return {
    shieldChart,
    planetaryHours,
    tectonicResonance,
    primaryIChing,
    transformedIChing,
    movingLineIndices,
    divinatorySynthesis,
  };
}
