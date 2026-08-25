import { WorldMine } from '../types';

export const WORLD_MINES: WorldMine[] = [
  // 1. Mponeng (South Africa) - Gold
  {
    id: 'mponeng',
    name: 'Mponeng Gold Mine',
    location: 'Gauteng',
    country: 'South Africa',
    continent: 'Africa',
    lat: -26.4361,
    lng: 27.4297,
    depthMeters: 4000,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Gold',
    secondaryMinerals: ['Uranium', 'Pyrite'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Pluto',
    arcanaArchetype: 'The Abyssal Crucible',
    feminineArchetype: 'Aurata, Queen of the 4,000-Meter Mantle',
    cartoucheTitle: 'TERRA AVRATA MPONENGICA — REGINA PROFUNDI',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'In antique cartography, the Mponeng subterranean shafts outline a sleeping titaness deep in the Earth’s mantle. Her crown is forged from surface headframes, her torso extends 4,000 meters through gold reef veins, her heart beats within the geothermal rock face, and her molten gold gown billows into the Witwatersrand basin.',
    uprightMeaning:
      'Deep spiritual fortitude, immense value forged under extreme pressure and heat, supreme mastery of the subconscious depths.',
    invertedMeaning:
      'Suffocating pressure, subterranean burnout, risking one\'s vitality for fleeting prestige, dangerously unvented heat.',
    mantleMessage:
      'Four thousand meters below the sunlight, pure gold does not burn — it waits for those who can withstand the mantle\'s embrace.',
    historicalContext:
      'The deepest human descent on Earth, reaching 4 kilometers below surface where rock face temperatures exceed 66°C.',
    chthonicKeyword: 'METAMORPHOSIS',
    mineralColor: '#FFD700',
    discoveryYear: '1986',
  },

  // 2. Bingham Canyon (USA) - Copper
  {
    id: 'bingham-canyon',
    name: 'Bingham Canyon Mine',
    location: 'Utah',
    country: 'United States',
    continent: 'North America',
    lat: 40.5233,
    lng: -112.1508,
    depthMeters: 1200,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Copper',
    secondaryMinerals: ['Gold', 'Silver', 'Molybdenum'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The Terrestrial Amphitheater',
    feminineArchetype: 'Cuprina, The Amphitheater Empress',
    cartoucheTitle: 'THEATRVM CUPREVM BINGHAMIENSIS — DOMINA ORBIS',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'The concentric amphitheater terraces form the grand swirling skirts of an enthroned copper goddess visible from orbit. Her outstretched arms trace the Oquirrh mountain ridgelines, holding a chalice of molten malachite and silver ore.',
    uprightMeaning:
      'Vast conductive pathways, expansive manifestation, harmonizing raw material into collective connectivity and electrical life.',
    invertedMeaning:
      'Excessive extraction, hollowed foundations, visible scars of over-ambition, losing intimacy in sheer scale.',
    mantleMessage:
      'A crater visible from orbital space: what you dig open in the light cannot remain hidden in the dark.',
    historicalContext:
      'One of the largest man-made excavations on Earth, producing more copper than any single mine in history.',
    chthonicKeyword: 'CONDUCTIVITY',
    mineralColor: '#B87333',
    discoveryYear: '1863',
  },

  // 3. Wieliczka (Poland) - Halite Salt
  {
    id: 'wieliczka',
    name: 'Wieliczka Salt Mine',
    location: 'Kraków',
    country: 'Poland',
    continent: 'Europe',
    lat: 49.9833,
    lng: 20.0544,
    depthMeters: 327,
    depthCategory: 'Sacred Salt Grotto',
    primaryMineral: 'Halite (Rock Salt)',
    secondaryMinerals: ['Gypsum', 'Anhydrite'],
    mineralCategory: 'Chthonic Salts',
    elementalAffinity: 'Water',
    planetaryRuler: 'Moon',
    arcanaArchetype: 'The Subterranean Cathedral',
    feminineArchetype: 'Saint Kinga, Lady of Crystalline Halite',
    cartoucheTitle: 'DIVINA HALITA WIELICZKANA — MATER SALIS',
    cartographicSilhouetteType: 'veiled-oracle',
    cartographicFigure:
      'The underground chambers, saline lakes, and sculpted chapels trace the silhouette of a veiled kneeling matron. Her flowing mantle is carved of translucent grey salt crystal, and her clasped hands cradle the underground Saint Kinga chapel.',
    uprightMeaning:
      'Preservation of sacred memory, sanctified quietude, carving enduring beauty and art from ancient subterranean oceans.',
    invertedMeaning:
      'Stagnant preservation, calcification of emotions, resisting necessary dissolution, clinging to crystallized grief.',
    mantleMessage:
      'In the salt-carved vaults beneath the soil, silence cures the wounds that light leaves raw.',
    historicalContext:
      'Mined continuously from the 13th century until 2007, featuring underground chapels, saline lakes, and chandeliers carved of rock salt.',
    chthonicKeyword: 'SANCTUARY',
    mineralColor: '#E0F7FA',
    discoveryYear: '1288',
  },

  // 4. Salar de Atacama (Chile) - Lithium
  {
    id: 'salar-atacama',
    name: 'Salar de Atacama Brines',
    location: 'Atacama Desert',
    country: 'Chile',
    continent: 'South America',
    lat: -23.5000,
    lng: -68.3333,
    depthMeters: 40,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Lithium',
    secondaryMinerals: ['Potassium', 'Boron', 'Magnesium'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Air',
    planetaryRuler: 'Uranus',
    arcanaArchetype: 'The White Electric Mirror',
    feminineArchetype: 'Lithia, The High Andean Spark Maiden',
    cartoucheTitle: 'SPECULUM ELECTRICUM ATACAMENSIS — VIRGO FULGURIS',
    cartographicSilhouetteType: 'dancing-nymph',
    cartographicFigure:
      'The turquoise evaporation ponds and vast white salt crust map the fluid posture of a dancing maiden leaping across the Andean plateau. Her hair is woven from solar wind, and lightning bolts of stored lithium charge dance in her fingertips.',
    uprightMeaning:
      'Electrochemical awakening, lightning stored in salt, rapid cognitive elevation and the power to energize the future.',
    invertedMeaning:
      'Depleted reserves, manic over-discharge, draining spiritual watersheds for technological convenience.',
    mantleMessage:
      'Beneath the driest sky on Earth, ancient water holds the electric spark of tomorrow\'s thoughts.',
    historicalContext:
      'The premier lithium brine basin in the world, holding hyper-pure lithium evaporated under fierce Andean sunlight.',
    chthonicKeyword: 'TRANSMISSION',
    mineralColor: '#80DEEA',
    discoveryYear: '1984',
  },

  // 5. Cerro Rico de Potosí (Bolivia) - Silver
  {
    id: 'cerro-rico',
    name: 'Cerro Rico de Potosí',
    location: 'Potosí',
    country: 'Bolivia',
    continent: 'South America',
    lat: -19.6192,
    lng: -65.7497,
    depthMeters: 800,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Silver',
    secondaryMinerals: ['Tin', 'Zinc', 'Lead'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Saturn',
    arcanaArchetype: 'The Mountain of Karmic Tithes',
    feminineArchetype: 'Pachamama Argentea, The Silver Mother of Potosí',
    cartoucheTitle: 'MONS ARGENTEUS POTOSIENSIS — PACHAMAMA SACRA',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'The conical mountain itself is depicted as the majestic Andean Earth Mother, draped in a cloak of silver ore tunnels and tin veins. Her gaze watches over the altiplano, and her subterranean womb holds both immense cosmic wealth and ancestral grief.',
    uprightMeaning:
      'Generational silver wisdom, ancestral reckoning, profound respect for earthly offerings and sacrificial truth.',
    invertedMeaning:
      'Generational debt, exploitation, structural collapse from hollowed greed, feeding the underworld demon.',
    mantleMessage:
      'El Tío rules the shafts where silver flows: honor what you take from the mountain, or the mountain takes you.',
    historicalContext:
      'Provided over 60% of the world\'s silver in the 16th-17th centuries; known as the mountain that changed global economics at immense human cost.',
    chthonicKeyword: 'RECKONING',
    mineralColor: '#C0C0C0',
    discoveryYear: '1545',
  },

  // 6. Mirny Diamond Mine (Russia) - Diamond
  {
    id: 'mirny-diamond',
    name: 'Mir Mine (Mirny)',
    location: 'Sakha Republic (Yakutia)',
    country: 'Russia',
    continent: 'Asia',
    lat: 62.5283,
    lng: 113.9922,
    depthMeters: 525,
    depthCategory: 'Arctic Permafrost',
    primaryMineral: 'Diamond (Kimberlite)',
    secondaryMinerals: ['Pyrope Garnet', 'Olivine', 'Ilmenite'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Air',
    planetaryRuler: 'Saturn',
    arcanaArchetype: 'The Siberian Vortex',
    feminineArchetype: 'Almazia, Mistress of the Frozen Vortex',
    cartoucheTitle: 'VORAGO ADAMANTINA SIBIRICA — DOMINA GLACIEI',
    cartographicSilhouetteType: 'winged-angelic-strata',
    cartographicFigure:
      'The spiraling kimberlite pipe forms the swirling ice gown of a crowned winged Siberian frost sorceress. The downward vortex of the pit forms her diamond corset, and her arms of permafrost hold back the subterranean gas fissures.',
    uprightMeaning:
      'Incorruptible clarity, enduring under sub-zero isolation, crystallizing vision into unbreakable diamond focus.',
    invertedMeaning:
      'Freezing isolation, emotional vortex that swallows external aid, downward pull of cold perfectionism.',
    mantleMessage:
      'The permafrost shatters under volcanic pipes: absolute clarity requires walking through ancient frozen vortexes.',
    historicalContext:
      'A giant circular kimberlite pipe so immense that airspace above it was closed due to downward air suction.',
    chthonicKeyword: 'CRYSTALLIZATION',
    mineralColor: '#E2E8F0',
    discoveryYear: '1955',
  },

  // 7. Almadén (Spain) - Cinnabar / Mercury
  {
    id: 'almaden',
    name: 'Almadén Mercury Mine',
    location: 'Castilla-La Mancha',
    country: 'Spain',
    continent: 'Europe',
    lat: 38.7758,
    lng: -4.8369,
    depthMeters: 700,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Cinnabar (Mercury)',
    secondaryMinerals: ['Pyrite', 'Quartz', 'Bitumen'],
    mineralCategory: 'Alchemical & Vaporous',
    elementalAffinity: 'Water',
    planetaryRuler: 'Mercury',
    arcanaArchetype: 'The Hermetic Quicksilver',
    feminineArchetype: 'Hydrargyra, The Crimson Cinnabar Sybil',
    cartoucheTitle: 'MINERA CINNABARIS ALMADENENSIS — NYMPHA ARGENTI VIVI',
    cartographicSilhouetteType: 'serpentine-alchemist',
    cartographicFigure:
      'Her serpentine cartographic form slithers through red cinnabar seams like liquid quicksilver. Draped in crimson vapors, she pours shimmering liquid mercury between two alchemical flasks, bridging the solid Earth and the celestial sky.',
    uprightMeaning:
      'Fluid transmutation, alchemical binding of opposites, swift adaptation, moving through barriers as liquid silver.',
    invertedMeaning:
      'Toxicity, deceptive illusions, slippage of truth, poisoning the well through erratic duplicity.',
    mantleMessage:
      'Liquid metal rests in crimson stone: neither fully solid nor fully vapor, the middle way is where truth flows.',
    historicalContext:
      'Exploited for over 2,000 years by Romans, Arabs, and Spanish empires, yielding one-third of all mercury ever used by humanity.',
    chthonicKeyword: 'TRANSMUTATION',
    mineralColor: '#E53E3E',
    discoveryYear: 'Roman Era (c. 200 BCE)',
  },

  // 8. Naica Crystal Cave (Mexico) - Selenite
  {
    id: 'naica',
    name: 'Naica Cave of the Crystals',
    location: 'Chihuahua',
    country: 'Mexico',
    continent: 'North America',
    lat: 27.8542,
    lng: -105.4967,
    depthMeters: 300,
    depthCategory: 'Hydrothermal/Volcanic',
    primaryMineral: 'Selenite (Giant Gypsum)',
    secondaryMinerals: ['Lead', 'Zinc', 'Silver'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Aether/Void',
    planetaryRuler: 'Neptune',
    arcanaArchetype: 'The Palace of Luminous Pillars',
    feminineArchetype: 'Selenia, The Giant Crystal Priestess',
    cartoucheTitle: 'SPECUS SELENITICA NAICENSIS — SACERDOS COLVMNARVM',
    cartographicSilhouetteType: 'veiled-oracle',
    cartographicFigure:
      'Reclining amidst 12-meter crisscrossing translucent selenite beams, her luminescent form is carved of gypsum and magma vapor. Her luminous halo radiates through boiling subterranean aquifers, holding the secrets of deep geological time.',
    uprightMeaning:
      'Transcendent revelation, dream portals, stepping into the chambers where geologic time and spirit merge into stillness.',
    invertedMeaning:
      'Disorientation in fantasy, environment too intense for mortal endurance, forgetting physical embodiment.',
    mantleMessage:
      'Grown in boiling subterranean waters over half a million years: divine patience produces monuments of light.',
    historicalContext:
      'Discovered in a working lead-zinc mine, containing the largest natural selenite crystals on Earth up to 12 meters long.',
    chthonicKeyword: 'TRANSCENDENCE',
    mineralColor: '#F7FAFC',
    discoveryYear: '2000',
  },

  // 9. Coober Pedy (Australia) - Opal
  {
    id: 'coober-pedy',
    name: 'Coober Pedy Opal Fields',
    location: 'South Australia',
    country: 'Australia',
    continent: 'Oceania',
    lat: -29.0139,
    lng: 134.7544,
    depthMeters: 30,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Precious Opal',
    secondaryMinerals: ['Silica', 'Ironstone', 'Gypsum'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Water',
    planetaryRuler: 'Neptune',
    arcanaArchetype: 'The Rainbow Troglodyte',
    feminineArchetype: 'Opalina, Dreamtime Troglodyte Maiden',
    cartoucheTitle: 'CAMPVS OPALINVS AUSTRALIS — VIRGO IRIDIS',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'Curled peacefully beneath red Australian gibber stones and dugout shafts, her skin radiates flashes of iridescent pink, green, and cobalt opal. Her hair dissolves into the dried subterranean sands of the ancient Eromanga Sea.',
    uprightMeaning:
      'Multi-spectral inspiration, dreaming the world alive, subterranean sanctuary, hidden flashes of brilliant intuition.',
    invertedMeaning:
      'Fickle whims, mirages in the desert dust, retreating underground out of fear of the sun.',
    mantleMessage:
      'When the prehistoric Eromanga Sea dried, its tears trapped the rainbow in silica stone beneath the red dust.',
    historicalContext:
      'The opal capital of the world, where miners live in underground dugout homes to escape brutal desert heat.',
    chthonicKeyword: 'ILLUMINATION',
    mineralColor: '#D53F8C',
    discoveryYear: '1915',
  },

  // 10. Sudbury Basin (Canada) - Nickel
  {
    id: 'sudbury-basin',
    name: 'Sudbury Nickel Basin',
    location: 'Ontario',
    country: 'Canada',
    continent: 'North America',
    lat: 46.6000,
    lng: -81.0000,
    depthMeters: 2500,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Nickel',
    secondaryMinerals: ['Copper', 'Platinum', 'Palladium', 'Gold'],
    mineralCategory: 'Structural & Ferrous',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Mars',
    arcanaArchetype: 'The Cosmic Impact Anvil',
    feminineArchetype: 'Astraea Metallifera, The Meteor-Forged Valkyrie',
    cartoucheTitle: 'CRATER METEORICUS SUDBURIENSIS — BELLATRIX SIDEREA',
    cartographicSilhouetteType: 'warrior-chthonic',
    cartographicFigure:
      'The 1.85-billion-year-old elliptical impact structure forms the celestial shield of an armored star-valkyrie. Her spear is driven 2,500 meters into the sub-layer norite, with molten platinum veins running like war paint down her cheek.',
    uprightMeaning:
      'Meteor-forged destiny, transforming catastrophic shocks into permanent riches, unmatched resilience.',
    invertedMeaning:
      'Blunt trauma, lingering aftershocks, weaponized defensiveness, inability to forgive ancient impacts.',
    mantleMessage:
      'A sky-stone pierced the mantle two billion years ago: what wounded the earth became its richest alloy.',
    historicalContext:
      'Formed by an enormous bolide meteor impact 1.85 billion years ago, creating one of the richest nickel-copper ore bodies on Earth.',
    chthonicKeyword: 'ALLOY',
    mineralColor: '#A0AEC0',
    discoveryYear: '1883',
  },

  // 11. Laurion (Greece) - Silver
  {
    id: 'laurion',
    name: 'Laurion Ancient Silver Mines',
    location: 'Attica',
    country: 'Greece',
    continent: 'Europe',
    lat: 37.7144,
    lng: 24.0564,
    depthMeters: 120,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Silver (Galena)',
    secondaryMinerals: ['Lead', 'Sphalerite', 'Fluorite'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Air',
    planetaryRuler: 'Mercury',
    arcanaArchetype: 'The Sovereign Mint of Reason',
    feminineArchetype: 'Athena Argyra, Protectress of the Silver Owl',
    cartoucheTitle: 'METALLA LAVRIENSIS — DEA ARGENTEA ATTICA',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'The ancient underground galleries, cisterns, and washeries outline the serene profile of helmeted Athena. From her outstretched palm flies the silver owl of Laurion, whose silver coins gave birth to the Parthenon and the dawn of philosophy.',
    uprightMeaning:
      'Enlightened intellect, strategic funding of golden ages, intellectual sovereignty, turning raw resource into philosophy.',
    invertedMeaning:
      'Sophistry, using intellectual wealth for warmongering, intellectual elitism masking moral decay.',
    mantleMessage:
      'From deep shafts of Laurion came the silver owls that built the Parthenon and triremes of Salamis.',
    historicalContext:
      'The Athenian silver mines that funded the defeat of Xerxes and the entire Golden Age of Pericles and Plato.',
    chthonicKeyword: 'SOVEREIGNTY',
    mineralColor: '#CBD5E0',
    discoveryYear: 'Ancient (c. 3000 BCE)',
  },

  // 12. Timna Valley (Israel) - Copper / Turquoise
  {
    id: 'timna-valley',
    name: 'Timna Valley (King Solomon\'s Mines)',
    location: 'Negev Desert',
    country: 'Israel',
    continent: 'Asia',
    lat: 29.7833,
    lng: 34.9833,
    depthMeters: 80,
    depthCategory: 'Ancient Hydraulic Quarry',
    primaryMineral: 'Malachite & Chrysocolla (Copper)',
    secondaryMinerals: ['Turquoise', 'Iron Ore'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Sun',
    arcanaArchetype: 'The Primordial Smelter',
    feminineArchetype: 'Hathor Metallurgica, Lady of the Turquoise Cliffs',
    cartoucheTitle: 'VALLIS TIMNA SACRA — HATHOR DOMINA CUPRI',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'Carved into the towering red sandstone pillars of Timna is the regal silhouette of horned goddess Hathor. Her robes are embroidered in green malachite and sky-blue turquoise, stoking the first charcoal smelting hearths of humanity.',
    uprightMeaning:
      'Ancient lineage of creation, foundational trade, the first conscious human mastery of fire and metal.',
    invertedMeaning:
      'Primitive squabbling, clinging to ancient grudges, scorching the earth in desert conflicts.',
    mantleMessage:
      'In red sandstone amphitheaters, the first smiths blew charcoal pipes to bring green stone into red metal.',
    historicalContext:
      'Site of the world\'s oldest copper mining tunnels and smelting camps, active from the 5th millennium BCE through Egyptian and biblical eras.',
    chthonicKeyword: 'FOUNDATION',
    mineralColor: '#38A169',
    discoveryYear: 'c. 4500 BCE',
  },

  // 13. Bayan Obo (China) - Rare Earths
  {
    id: 'bayan-obo',
    name: 'Bayan Obo Rare Earth Mine',
    location: 'Inner Mongolia',
    country: 'China',
    continent: 'Asia',
    lat: 41.7708,
    lng: 109.9692,
    depthMeters: 350,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Neodymium & Rare Earths (Bastnäsite)',
    secondaryMinerals: ['Iron Ore', 'Niobium', 'Thorium'],
    mineralCategory: 'Rare Earths & Magnetics',
    elementalAffinity: 'Air',
    planetaryRuler: 'Uranus',
    arcanaArchetype: 'The Magnetic Loom',
    feminineArchetype: 'Magnetica, The Steppe Weaver of Invisible Flux',
    cartoucheTitle: 'TERRA MAGNETICA BAYANOBOENSIS — TEXTRIX FLUXUS',
    cartographicSilhouetteType: 'dancing-nymph',
    cartographicFigure:
      'Her nomadic cartographic figure dances atop the Mongolian steppe with ribboning magnetic field lines billowing around her. In her loom, she weaves the 17 rare earth elements into invisible lines of force that turn every turbine on the planet.',
    uprightMeaning:
      'Invisible magnetic attraction, critical harmonic catalysts, guiding unseen currents that steer macro-destiny.',
    invertedMeaning:
      'Monopolistic control, toxic runoff, subtle psychological manipulation through hidden magnetic resonance.',
    mantleMessage:
      'The elements with names of titans and goddesses whisper invisible vectors across all motors of the globe.',
    historicalContext:
      'The largest rare earth element deposit on Earth, supplying the magnetic heart of global electronics and green turbines.',
    chthonicKeyword: 'ATTRACTION',
    mineralColor: '#805AD5',
    discoveryYear: '1927',
  },

  // 14. Diavik (Canada) - Arctic Diamond
  {
    id: 'diavik',
    name: 'Diavik Diamond Mine',
    location: 'Lac de Gras, Northwest Territories',
    country: 'Canada',
    continent: 'North America',
    lat: 64.4983,
    lng: -110.2900,
    depthMeters: 460,
    depthCategory: 'Arctic Permafrost',
    primaryMineral: 'White Diamond',
    secondaryMinerals: ['Kimberlite', 'Garnet', 'Zircon'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Water',
    planetaryRuler: 'Moon',
    arcanaArchetype: 'The Island of Frozen Fire',
    feminineArchetype: 'Sedna Lucida, The Arctic Diamond Empress',
    cartoucheTitle: 'INSULA ADAMANTIS ARCTICA — SEDNA REGINA LACUS',
    cartographicSilhouetteType: 'winged-angelic-strata',
    cartographicFigure:
      'Surrounded by the icy ring dikes of Lac de Gras, the mine charts a crowned queen standing upon an island altar. Her diamond corset catches the shimmering green Aurora Borealis, rooted in the frozen depths of the Canadian Shield.',
    uprightMeaning:
      'Pristine boundaries, maintaining high spiritual frequency amidst freezing waters, radiant isolation.',
    invertedMeaning:
      'Severe emotional chill, inaccessible walls, fear of thawing out vulnerable passions.',
    mantleMessage:
      'Dammed inside an Arctic lake, fiery diamonds shine through ice roads that melt with the spring.',
    historicalContext:
      'An engineering marvel situated on a remote island 220 km south of the Arctic Circle, accessible mainly by ice roads in winter.',
    chthonicKeyword: 'PURITY',
    mineralColor: '#EBF8FF',
    discoveryYear: '1992',
  },

  // 15. Rössing (Namibia) - Uranium
  {
    id: 'rossing',
    name: 'Rössing Uranium Mine',
    location: 'Erongo Region, Namib Desert',
    country: 'Namibia',
    continent: 'Africa',
    lat: -22.4833,
    lng: 15.0333,
    depthMeters: 390,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Uranium (Uraninite)',
    secondaryMinerals: ['Alaskite Granite', 'Biotite'],
    mineralCategory: 'Atomic & Radiance',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Uranus',
    arcanaArchetype: 'The Radiant Fission',
    feminineArchetype: 'Radia, The Sun-Crowned Desert Oracle',
    cartoucheTitle: 'DESERTUM RADIANS ROSSINGENSE — PYTHIA ATOMICA',
    cartographicSilhouetteType: 'veiled-oracle',
    cartographicFigure:
      'The multi-tiered open pit creates the glowing emerald-green halo of a desert oracle rising from Namib granite sand dunes. Her hands hold the atomic halo of primordial fission, illuminating the dark horizons with nuclear radiance.',
    uprightMeaning:
      'Quantum transformation, uncontainable cosmic power, shedding old structural shells through radiant decay into higher forms.',
    invertedMeaning:
      'Radioactive fallout, reckless handling of immense power, poisoning relationships with unshielded intensity.',
    mantleMessage:
      'The oldest open pit of nuclear light: what sleeps in desert granite can power civilizations or dissolve them.',
    historicalContext:
      'One of the longest-running open-pit uranium mines in the world, extracting uranium from ancient alaskite granites.',
    chthonicKeyword: 'RADIANCE',
    mineralColor: '#48BB78',
    discoveryYear: '1928',
  },

  // 16. Kiruna (Sweden) - Magnetite Iron
  {
    id: 'kiruna',
    name: 'Kiruna Iron Ore Mine',
    location: 'Lapland',
    country: 'Sweden',
    continent: 'Europe',
    lat: 67.8558,
    lng: 20.2253,
    depthMeters: 1365,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Magnetite (Iron Ore)',
    secondaryMinerals: ['Apatite', 'Hematite'],
    mineralCategory: 'Structural & Ferrous',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Mars',
    arcanaArchetype: 'The Shifting Iron Colossus',
    feminineArchetype: 'Ferraria, The Lapland Iron Matron',
    cartoucheTitle: 'MONS MAGNETIS KIRUNENSIS — MATRONA FERREA',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'The sub-level caving footprint maps a slumbering Scandinavian iron titaness beneath Kiirunavaara mountain. As she turns in her 1,365-meter subterranean bed, her magnetic iron spine gently shifts the entire city above her shoulders.',
    uprightMeaning:
      'Steadfast fortitude, shifting an entire city to maintain foundational purpose, unwavering magnetic true north.',
    invertedMeaning:
      'Inflexible stubbornness, ground giving way under family or community, destructive single-mindedness.',
    mantleMessage:
      'The iron mountain was so vast they moved the city clocktower and houses to follow the sub-level cave.',
    historicalContext:
      'The largest and most modern underground iron ore mine in the world; its expansion is currently causing the relocation of the entire town of Kiruna.',
    chthonicKeyword: 'FORTITUDE',
    mineralColor: '#4A5568',
    discoveryYear: '1898',
  },

  // 17. Grasberg (Indonesia) - Gold / Copper
  {
    id: 'grasberg',
    name: 'Grasberg Mine',
    location: 'Papua',
    country: 'Indonesia',
    continent: 'Asia',
    lat: -4.0558,
    lng: 137.1164,
    depthMeters: 1800,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Copper & Gold',
    secondaryMinerals: ['Silver', 'Pyrite'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Aether/Void',
    planetaryRuler: 'Jupiter',
    arcanaArchetype: 'The Mountain Temple of Clouds',
    feminineArchetype: 'Tuwi, Goddess of the Cloud-Capped Gold Peak',
    cartoucheTitle: 'CACUMEN AUREUM PAPUENSE — DEA NUBIUM GRASBERGENSIS',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'Standing at 4,200 meters near equatorial tropical glaciers, her towering golden cartographic silhouette ascends through the mist. Her crown touches the sky while her deep block-cave shafts plunge into the mantle to gather the golden blood of the mountain.',
    uprightMeaning:
      'Bridging celestial summits and subterranean wealth, magnificent vision realized at dizzying heights, supreme abundance.',
    invertedMeaning:
      'Hubris at high altitude, ecological devastation disguised as progress, trampling sacred peaks.',
    mantleMessage:
      'At 4,200 meters near tropical glaciers, the core meets the sky in an altar of copper and gold.',
    historicalContext:
      'Located near Puncak Jaya, Grasberg is the largest gold mine and second largest copper mine in the world.',
    chthonicKeyword: 'MAJESTY',
    mineralColor: '#ECC94B',
    discoveryYear: '1936',
  },

  // 18. Argyle (Australia) - Pink & Red Diamonds
  {
    id: 'argyle',
    name: 'Argyle Diamond Mine',
    location: 'East Kimberley',
    country: 'Australia',
    continent: 'Oceania',
    lat: -16.7167,
    lng: 128.3983,
    depthMeters: 400,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Pink & Red Diamonds (Lamproite)',
    secondaryMinerals: ['Champagne Diamonds', 'Cognac Diamonds'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The Heart of the Barramundi',
    feminineArchetype: 'Barramundia, Lady of the Rose Diamond Dream',
    cartoucheTitle: 'LAMPROITIS ROSEA ARGYLENSIS — DOMINA CORALLII ADAMANTIS',
    cartographicSilhouetteType: 'serpentine-alchemist',
    cartographicFigure:
      'The shape of the AK1 lamproite pipe traces the sacred ancestral Barramundi woman leaping over the Ragged Range. As she passes through the rock, she sheds incandescent pink and red diamond scales before slipping back into the subterranean Dreaming.',
    uprightMeaning:
      'Rare and singular passionate expression, incandescent beauty forged from unique structural anomalies, heart-awakening.',
    invertedMeaning:
      'Elitism, unapproachable vanity, mourning a closed chapter of irreplaceable splendor.',
    mantleMessage:
      'The sacred Barramundi scaled the range and shed its glowing pink scales in lamproite stone before closing its gates.',
    historicalContext:
      'Source of over 90% of the world\'s rare pink and red diamonds, mined until its planned closure in 2020.',
    chthonicKeyword: 'RARITY',
    mineralColor: '#ED64A6',
    discoveryYear: '1979',
  },

  // 19. Muzo (Colombia) - Emerald
  {
    id: 'muzo',
    name: 'Muzo Emerald Mines',
    location: 'Boyacá',
    country: 'Colombia',
    continent: 'South America',
    lat: 5.5333,
    lng: -74.1500,
    depthMeters: 350,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Emerald (Beryl)',
    secondaryMinerals: ['Calcite', 'Pyrite', 'Quartz'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The Green Fire of Fura and Téna',
    feminineArchetype: 'Fura, The Emerald Titaness of the Andes',
    cartoucheTitle: 'MONS SMARAGDINUS MUZOENSIS — FURA REGINA CORDILLERA',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'Formed from the jagged green cordillera ridges of the Fura and Téna peaks, the cartographic figure of Fura reclines across the black shale. Her weeping green tears crystallize into the world’s most pristine hex-ray emeralds.',
    uprightMeaning:
      'Fertility of spirit, deep heart healing, lush abundance emerging from dark shales, sovereign green light.',
    invertedMeaning:
      'Jealous obsession, emerald fever, deceit and betrayal born of envy, losing peace for lustrous beauty.',
    mantleMessage:
      'In the black carbonaceous shales of Boyacá, the green ray of the heart shines without equal.',
    historicalContext:
      'Mined since pre-Columbian Muzo indigenous times, renowned as the undisputed world capital of fine emeralds.',
    chthonicKeyword: 'VITALITY',
    mineralColor: '#2F855A',
    discoveryYear: 'Pre-Columbian (c. 1000 CE)',
  },

  // 20. Las Médulas (Spain) - Alluvial Gold
  {
    id: 'las-medulas',
    name: 'Las Médulas Roman Gold Works',
    location: 'El Bierzo, León',
    country: 'Spain',
    continent: 'Europe',
    lat: 42.4608,
    lng: -6.7644,
    depthMeters: 100,
    depthCategory: 'Ancient Hydraulic Quarry',
    primaryMineral: 'Alluvial Gold',
    secondaryMinerals: ['Quartz Gravels', 'Red Clay'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Water',
    planetaryRuler: 'Jupiter',
    arcanaArchetype: 'The Shattered Red Canyons',
    feminineArchetype: 'Ruina, The Red Earth Nymph of the Torrents',
    cartoucheTitle: 'RUINA MONTIUM MEDULENSIS — NYMPHA TORRENTIS',
    cartographicSilhouetteType: 'water-bearer-saline',
    cartographicFigure:
      'The red clay pinnacles and chestnut-covered ravines carve the dramatic silhouette of a water-bearing mountain nymph. She tilts Roman aqueduct torrents to wash away whole mountains and reveal the alluvial gold resting in ancient gravels.',
    uprightMeaning:
      'Radical earth-shifting engineering, channeling natural currents to wash away confusion and reveal golden truth.',
    invertedMeaning:
      'Violent over-intervention, shattering landscapes that cannot be reconstructed, hubristic terraforming.',
    mantleMessage:
      'The Romans collapsed entire mountains with torrents of water: Ruina Montium uncovers what earth concealed.',
    historicalContext:
      'The most important gold mine in the Roman Empire; Pliny the Elder wrote of the colossal hydraulic mountain-shattering techniques used here.',
    chthonicKeyword: 'COLLAPSE & REVELATION',
    mineralColor: '#DD6B20',
    discoveryYear: 'c. 25 BCE',
  },

  // 21. Kimberley "Big Hole" (South Africa) - Diamond
  {
    id: 'kimberley-big-hole',
    name: 'Kimberley Mine (The Big Hole)',
    location: 'Northern Cape',
    country: 'South Africa',
    continent: 'Africa',
    lat: -28.7389,
    lng: 24.7589,
    depthMeters: 1097,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Diamond (Kimberlite Pipe)',
    secondaryMinerals: ['Peridot', 'Garnet', 'Diopside'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Saturn',
    arcanaArchetype: 'The Great Hand-Carved Abyss',
    feminineArchetype: 'Adamas Regina, Mother of the Kimberlite Vault',
    cartoucheTitle: 'VORAGO KIMBERLIENSIS — ADAMA MATER ABYSSI',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'The hand-excavated vertical abyss outlines a seated diamond empress gazing into a turquoise subterranean pool. Her robe is patterned with thousands of pick-axe strata marks, holding the ancient roots of the African craton in her lap.',
    uprightMeaning:
      'Tireless human dedication, excavating monumental wealth from impossible depths, ancestral perseverance.',
    invertedMeaning:
      'Diamond rush mania, human exploitation, gazing into an empty chasm after the resources have fled.',
    mantleMessage:
      'Hand-dug by fifty thousand picks: what mortals hollow out with sheer will becomes a mirror for the sky.',
    historicalContext:
      'The largest hand-excavated hole on Earth, yielding 14.5 million carats of diamonds and creating the modern diamond industry.',
    chthonicKeyword: 'ENDURANCE',
    mineralColor: '#93C5FD',
    discoveryYear: '1871',
  },

  // 22. Chuquicamata (Chile) - Copper
  {
    id: 'chuquicamata',
    name: 'Chuquicamata Copper Mine',
    location: 'Calama, Antofagasta',
    country: 'Chile',
    continent: 'South America',
    lat: -22.2833,
    lng: -68.9000,
    depthMeters: 1100,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Copper (Porphyry)',
    secondaryMinerals: ['Molybdenum', 'Rhenium', 'Gold'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Mars',
    arcanaArchetype: 'The Colossal Red Step-Well',
    feminineArchetype: 'Chuqui, The Atacama Bronze Titaness',
    cartoucheTitle: 'THEATRVM CUPRI CHUQUICAMATENSE — GIGAS ATACAMAE',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'Measuring 4.3 kilometers long and over a kilometer deep, her titanic bronze silhouette stretches along the Domeyko fault. Her copper armor shines with oxidized green chrysocolla, with giant haul roads spiraling like serpents around her torso.',
    uprightMeaning:
      'Immense industrial conduction, uniting national destiny with planetary infrastructure, titan-scale capacity.',
    invertedMeaning:
      'Exhaustion from relentless output, dust storms obscuring spiritual vision, overwhelming sheer mass.',
    mantleMessage:
      'Four kilometers of red stepped terraces: the largest volume of open rock ever turned by human hands.',
    historicalContext:
      'By total volume of excavated rock, the largest open-pit copper mine on Earth, active since pre-Inca atacameño copper smelting.',
    chthonicKeyword: 'MAGNITUDE',
    mineralColor: '#D97706',
    discoveryYear: '1882 (Pre-Inca origins)',
  },

  // 23. Kalgoorlie Super Pit (Australia) - Gold
  {
    id: 'kalgoorlie-super-pit',
    name: 'Kalgoorlie Golden Mile (Super Pit)',
    location: 'Western Australia',
    country: 'Australia',
    continent: 'Oceania',
    lat: -30.7750,
    lng: 121.5039,
    depthMeters: 600,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Gold (Tellurides)',
    secondaryMinerals: ['Pyrite', 'Chalcopyrite', 'Silver'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Sun',
    arcanaArchetype: 'The Golden Mile of Fortune',
    feminineArchetype: 'Aurea Australis, The Sun-Blazed Outback Queen',
    cartoucheTitle: 'MILLIARIVM AVREVM KALGOORLIENSE — REGINA DESERTI',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'The 3.5 km long Super Pit carves the majestic silhouette of an outback sun queen rising through red dust. In her hand she brandishes telluride gold nuggets that ignited the wild Australian gold rushes.',
    uprightMeaning:
      'Daring pioneer leaps, striking rich veins in barren territories, unshakeable self-belief rewarded with gold.',
    invertedMeaning:
      'Reckless speculation, gambling on mirages, parched spiritual thirst in the red dust.',
    mantleMessage:
      'The richest square mile of gold on Earth: fortune favors the bold who dig through red desert scrub.',
    historicalContext:
      'Known as the "Golden Mile", it was originally discovered by Paddy Hannan in 1893 and has produced over 60 million ounces of gold.',
    chthonicKeyword: 'PROSPERITY',
    mineralColor: '#F59E0B',
    discoveryYear: '1893',
  },

  // 24. Olympic Dam (Australia) - Uranium / Copper / Gold
  {
    id: 'olympic-dam',
    name: 'Olympic Dam Poly-Matrix',
    location: 'Roxby Downs, South Australia',
    country: 'Australia',
    continent: 'Oceania',
    lat: -30.4394,
    lng: 136.8872,
    depthMeters: 800,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Uranium & Copper',
    secondaryMinerals: ['Gold', 'Silver', 'Rare Earths'],
    mineralCategory: 'Atomic & Radiance',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Pluto',
    arcanaArchetype: 'The Polymetallic Matrix',
    feminineArchetype: 'Olympia Chthonia, Queen of the Quad-Ore Core',
    cartoucheTitle: 'POLYMETALLUM OLYMPICUM — QUADRIFORMA CHTHONIA',
    cartographicSilhouetteType: 'warrior-chthonic',
    cartographicFigure:
      'Hidden 350 meters beneath desert sedimentary cover, her cartographic form is a multi-armed alchemical titaness. Each hand wields a different elemental power: atomic uranium light, conductive copper, radiant gold, and reflective silver.',
    uprightMeaning:
      'Polymathic mastery, harmonizing four distinct talents into a single unstoppable force, atomic core strength.',
    invertedMeaning:
      'Dangerous radiation, trying to manage too many hazardous energies simultaneously, unstable compounding.',
    mantleMessage:
      'The largest known single uranium deposit in the world rests enveloped in iron oxide, copper, and gold.',
    historicalContext:
      'A unique iron-oxide-copper-gold (IOCG) deposit discovered through geophysics beneath 350m of unmineralized cover.',
    chthonicKeyword: 'SYNTHESIS',
    mineralColor: '#10B981',
    discoveryYear: '1975',
  },

  // 25. Broken Hill / Line of Lode (Australia) - Silver / Lead / Zinc
  {
    id: 'broken-hill',
    name: 'Broken Hill Line of Lode',
    location: 'New South Wales',
    country: 'Australia',
    continent: 'Oceania',
    lat: -31.9567,
    lng: 141.4678,
    depthMeters: 1600,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Silver & Galena',
    secondaryMinerals: ['Sphalerite', 'Zinc', 'Rhodonite'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Saturn',
    arcanaArchetype: 'The Boomerang of Heavy Metals',
    feminineArchetype: 'Argenta Australis, Mother of the Silver Spine',
    cartoucheTitle: 'LINEA METALLIFERA BROKENHILLIENSIS — MATER ARGENTEA',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'The 7.5-kilometer boomerang-shaped ore body charts the ancient curved spine of an outback titaness sleeping beneath desert hills. Her ribs are strung with pink rhodonite crystals and gleaming silver-lead galena.',
    uprightMeaning:
      'Industrial birthplaces, generational heavy-metal endurance, extracting refined silver from jagged broken ridges.',
    invertedMeaning:
      'Toxic heavy burdens, leaden sluggishness, clinging to industrial ghosts of the past.',
    mantleMessage:
      'The broken hill looked like a mound of iron slag to boundary riders, yet underneath lay 300 million tons of silver-lead ore.',
    historicalContext:
      'The richest lead-zinc-silver deposit ever found; gave birth to BHP (Broken Hill Proprietary), one of the world\'s largest corporations.',
    chthonicKeyword: 'FOUNDATION',
    mineralColor: '#94A3B8',
    discoveryYear: '1883',
  },

  // 26. Muruntau Gold Mine (Uzbekistan) - Gold
  {
    id: 'muruntau',
    name: 'Muruntau Gold Mine',
    location: 'Kyzylkum Desert, Navoiy',
    country: 'Uzbekistan',
    continent: 'Asia',
    lat: 41.4981,
    lng: 64.5719,
    depthMeters: 600,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Gold (Quartz Veins)',
    secondaryMinerals: ['Silver', 'Tungsten', 'Arsenopyrite'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Sun',
    arcanaArchetype: 'The Silk Road Sun-Chasm',
    feminineArchetype: 'Kyzylkuma, The Golden Silk Desert Empress',
    cartoucheTitle: 'FODINA AVREA MURUNTAUENSIS — SULTANA DESERTI RVBRI',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'In the heart of the Red Sands of the Silk Road, the 3.5-kilometer oval chasm traces the grand robes of a Central Asian gold sultana. Her headdress is spun of fine gold wire quartz veins, producing more gold annually than almost any place on Earth.',
    uprightMeaning:
      'Sovereign wealth created in quiet desert isolation, unmatched output, deep reserves that outlast shifting empires.',
    invertedMeaning:
      'Opulent secrecy, isolationist hoarding, extreme desert heat burning out all collaboration.',
    mantleMessage:
      'In the Kyzylkum red sands, two million ounces of gold arise every year from a giant step-pyramid into the earth.',
    historicalContext:
      'One of the largest open-pit gold mines in the world by annual production and remaining resource base.',
    chthonicKeyword: 'OPULENCE',
    mineralColor: '#EAB308',
    discoveryYear: '1958',
  },

  // 27. Norilsk Nickel / Oktyabrsky (Russia) - Nickel / Palladium
  {
    id: 'norilsk-nickel',
    name: 'Norilsk-Talnakh Deep Mines',
    location: 'Krasnoyarsk Krai (Arctic Siberia)',
    country: 'Russia',
    continent: 'Asia',
    lat: 69.3558,
    lng: 88.1892,
    depthMeters: 2000,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Palladium & Nickel',
    secondaryMinerals: ['Platinum', 'Copper', 'Cobalt'],
    mineralCategory: 'Structural & Ferrous',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Pluto',
    arcanaArchetype: 'The Siberian Basalt Gorgon',
    feminineArchetype: 'Borealis Palladia, Empress of the Siberian Traps',
    cartoucheTitle: 'METALLA TALNAKHENSIUM — DOMINA BASALTIS ARCTICAE',
    cartographicSilhouetteType: 'warrior-chthonic',
    cartographicFigure:
      'Plunging 2,000 meters through permafrost and Siberian flood basalt, her cartographic silhouette is a fierce frost-valkyrie clad in palladium armor. Her thermal core burns white-hot against the -50°C polar winter on the surface.',
    uprightMeaning:
      'Indomitable catalytic power, purifying toxic environments into precious catalytic metals, fierce Arctic resilience.',
    invertedMeaning:
      'Brutal isolation, severe environmental scarring, unforgiving conditions that chill the human spirit.',
    mantleMessage:
      'Forged during the colossal Siberian Traps volcanic eruption 250 million years ago, the Earth\'s richest palladium lode sleeps in permafrost.',
    historicalContext:
      'Produces the vast majority of the world\'s palladium and high-grade nickel, located in the northernmost major city on Earth.',
    chthonicKeyword: 'CATALYST',
    mineralColor: '#CBD5E1',
    discoveryYear: '1935',
  },

  // 28. Falun Copper Mine (Sweden) - Copper / Vitriol
  {
    id: 'falun-mine',
    name: 'Falun Copper Mine (Stora Kopparberget)',
    location: 'Dalarna',
    country: 'Sweden',
    continent: 'Europe',
    lat: 60.5986,
    lng: 15.6144,
    depthMeters: 450,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Chalcopyrite (Copper)',
    secondaryMinerals: ['Falu Red Pigment', 'Sulfur', 'Zinc', 'Lead'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The Copper Crown of the North',
    feminineArchetype: 'Falu Röda, The Great Copper Mountain Queen',
    cartoucheTitle: 'MAGNUS MONS CUPRI FALUNENSIS — REGINA SEPTENTRIONALIS',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'The Great Pit (Stora Stöten) collapsed in 1687 into the shape of a crowned Scandinavian queen draped in the iconic red pigment of Swedish cottages. Her breath smells of sulfur and copper vitriol that once funded the Swedish Empire.',
    uprightMeaning:
      'Enduring legacy spanning a millennium, building homes and nations, the enduring warmth of deep red ochre.',
    invertedMeaning:
      'Sudden structural cave-ins from centuries of over-burrowing, clinging to past imperial grandeur.',
    mantleMessage:
      'A buck named Kåre dug its horns in red mud and revealed the copper mountain that funded Swedish kings for a thousand years.',
    historicalContext:
      'Operated for over 1,000 years (c. 850–1992), producing two-thirds of Europe\'s copper in the 17th century; gave birth to the world\'s oldest corporation.',
    chthonicKeyword: 'HERITAGE',
    mineralColor: '#B91C1C',
    discoveryYear: 'c. 850 CE',
  },

  // 29. Jáchymov / St. Joachimsthal (Czech Republic) - Silver / Pitchblende Uranium
  {
    id: 'jachymov',
    name: 'Jáchymov (Joachimsthal) Silver & Radium Mines',
    location: 'Ore Mountains (Krušné Hory)',
    country: 'Czech Republic',
    continent: 'Europe',
    lat: 50.3725,
    lng: 12.9231,
    depthMeters: 600,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Pitchblende (Uraninite) & Silver',
    secondaryMinerals: ['Cobalt', 'Bismuth', 'Nickel', 'Arsenic'],
    mineralCategory: 'Atomic & Radiance',
    elementalAffinity: 'Water',
    planetaryRuler: 'Pluto',
    arcanaArchetype: 'The Alchemical Cradle of the Dollar & Radium',
    feminineArchetype: 'Thalera, Sybil of the Joachimsthal Radium Mist',
    cartoucheTitle: 'VALLE SANCTI JOACHIMI — MATER THALERORUM ET RADII',
    cartographicSilhouetteType: 'veiled-oracle',
    cartographicFigure:
      'The labyrinthine shafts of the Ore Mountains chart a veiled alchemical sorceress pouring silver Joachimsthalers (the origin of the word "dollar") from one hand, while her other hand glows with the pitchblende radium Marie Curie purified.',
    uprightMeaning:
      'Birthplace of global currency and nuclear revelation, penetrating the deepest atomic secrets through patience.',
    invertedMeaning:
      'Unseen radioactive contamination, greed corrupting currency, reckless handling of primordial elements.',
    mantleMessage:
      'Here the Joachimsthaler silver coins birthed the word "Dollar", and from this pitchblende slag Marie Curie extracted Radium and Polonium.',
    historicalContext:
      'Historical silver powerhouse in the 16th century and source of the pitchblende uranium from which radioactivity was first isolated.',
    chthonicKeyword: 'GENESIS',
    mineralColor: '#22C55E',
    discoveryYear: '1516',
  },

  // 30. Salar de Uyuni (Bolivia) - Lithium
  {
    id: 'salar-de-uyuni',
    name: 'Salar de Uyuni Lithium Salt Basin',
    location: 'Potosí Altiplano',
    country: 'Bolivia',
    continent: 'South America',
    lat: -20.1338,
    lng: -67.4891,
    depthMeters: 120,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Lithium Brine',
    secondaryMinerals: ['Halite', 'Borax', 'Potassium', 'Magnesium'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Aether/Void',
    planetaryRuler: 'Neptune',
    arcanaArchetype: 'The Infinite Altiplano Mirror',
    feminineArchetype: 'Uyunia, Titaness of the Celestial Salt Mirror',
    cartoucheTitle: 'SALINUM INFINITUM UYUNIENSE — SPECULUM CAELI',
    cartographicSilhouetteType: 'dancing-nymph',
    cartographicFigure:
      'Spanning 10,000 square kilometers of blinding white salt crust, her colossal form dissolves into the sky when thin rainwater turns the salt pan into the largest mirror on Earth. Her feet rest on ancient dried glacial lakes Minchin and Tauca.',
    uprightMeaning:
      'Limitless cosmic reflection, absolute purity of vision where heaven and earth mirror each other perfectly.',
    invertedMeaning:
      'Disorienting infinity, losing physical landmarks in a boundless white mirage, ungrounded vastness.',
    mantleMessage:
      'When rain covers the salt flat, you walk on the clouds: ten thousand square kilometers of lithium and sky.',
    historicalContext:
      'The largest salt flat on Earth, holding approximately 21 million tons of lithium in subterranean brine pools.',
    chthonicKeyword: 'INFINITY',
    mineralColor: '#A5F3FC',
    discoveryYear: 'Pre-Columbian (Ancient)',
  },

  // 31. Kolar Gold Fields (India) - Gold
  {
    id: 'kolar-gold-fields',
    name: 'Kolar Gold Fields (KGF)',
    location: 'Karnataka',
    country: 'India',
    continent: 'Asia',
    lat: 12.9600,
    lng: 78.2700,
    depthMeters: 3200,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Native Gold (Quartz Reef)',
    secondaryMinerals: ['Pyrite', 'Tourmaline', 'Galena'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Sun',
    arcanaArchetype: 'The Ancient Golden Lode of the South',
    feminineArchetype: 'Swarna Sundari, Goddess of the Deep Quartz Reef',
    cartoucheTitle: 'CAMPUS AVREVS KOLARENSIS — DEA AVRI SACRA',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'The 3.2-kilometer deep Champion Reef shafts chart the serene sleeping form of an Indian golden goddess. Her braided hair is strung with quartz crystal reefs and gold specks mined since the Indus Valley and Chola dynasties.',
    uprightMeaning:
      'Ancient spiritual lineage, wealth harvested across millennia of human devotion, profound inner depth.',
    invertedMeaning:
      'Ghost towns of past splendor, mourning lost golden eras, waterlogging of neglected depths.',
    mantleMessage:
      'The gold of Kolar decorated the crowns of the Cholas and Harappans, plunged over three kilometers deep into the Deccan shield.',
    historicalContext:
      'One of the deepest gold mines in history (reaching over 3,200 meters), mined for over two millennia until closing in 2001.',
    chthonicKeyword: 'DEVOTION',
    mineralColor: '#FBBF24',
    discoveryYear: 'Antiquity (c. 1st Century CE)',
  },

  // 32. Badakhshan Sar-e-Sang (Afghanistan) - Lapis Lazuli
  {
    id: 'sar-e-sang-lapis',
    name: 'Sar-e-Sang Lapis Lazuli Mines',
    location: 'Badakhshan Province, Hindu Kush',
    country: 'Afghanistan',
    continent: 'Asia',
    lat: 36.2167,
    lng: 70.8000,
    depthMeters: 400,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Lapis Lazuli (Lazurite)',
    secondaryMinerals: ['Pyrite (Gold flecks)', 'Calcite', 'Diopside'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Air',
    planetaryRuler: 'Jupiter',
    arcanaArchetype: 'The Celestial Blue Vault',
    feminineArchetype: 'Lapis Lazula, Sybil of the Starry Blue Mantle',
    cartoucheTitle: 'METALLA LAPIDIS LAZULI BADAKHSHANIENSIS — VIRGO CAELESTIS',
    cartographicSilhouetteType: 'veiled-oracle',
    cartographicFigure:
      'High in the snowbound gorges of the Hindu Kush, the 6,000-year-old marble tunnels chart a celestial sybil draped in deep ultramarine blue robes sprinkled with golden pyrite stars. Her blue pigment painted the funeral mask of Tutankhamun and the ceiling of the Sistine Chapel.',
    uprightMeaning:
      'Celestial truth, royal vision, speaking divine wisdom, accessing unbroken ancient lineages of beauty.',
    invertedMeaning:
      'Smuggling in conflict zones, spiritual elitism, trading ancient sacred relics for petty worldly dominance.',
    mantleMessage:
      'Mined continuously for six thousand years: the blue of the Pharaohs and Renaissance Madonnas lives in this mountain.',
    historicalContext:
      'The world\'s premier source of true lapis lazuli since the 4th millennium BCE; supplied Sumer, Ancient Egypt, Mesopotamia, and Renaissance Europe.',
    chthonicKeyword: 'ROYAL TRUTH',
    mineralColor: '#1D4ED8',
    discoveryYear: 'c. 4000 BCE',
  },

  // 33. Mogok Valley / Valley of Rubies (Myanmar) - Pigeon's Blood Ruby
  {
    id: 'mogok-ruby-valley',
    name: 'Mogok Valley of Rubies',
    location: 'Shan State / Mandalay',
    country: 'Myanmar',
    continent: 'Asia',
    lat: 22.9167,
    lng: 96.5000,
    depthMeters: 250,
    depthCategory: 'Ancient Hydraulic Quarry',
    primaryMineral: 'Pigeon\'s Blood Ruby (Corundum)',
    secondaryMinerals: ['Spinel', 'Sapphire', 'Peridot', 'Moonstone'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Sun',
    arcanaArchetype: 'The Crimson Heart of the Dragon',
    feminineArchetype: 'Padmaraga, Queen of the Pigeon\'s Blood Lotus',
    cartoucheTitle: 'VALLIS RUBINORUM MOGOKENSIS — REGINA CORUNDI',
    cartographicSilhouetteType: 'serpentine-alchemist',
    cartographicFigure:
      'The misty limestone karst hills of Mogok trace a serpentine Burmese naga queen reclining in marble gravels. In her bosom rests the glowing crimson fluorescence of the finest unheated rubies in human history.',
    uprightMeaning:
      'Invincible passion, life force radiating through the heart, absolute sovereignty of desire, protective vitality.',
    invertedMeaning:
      'Ruby fever, jealousy, violent bloodshed over precious stones, burning up in uncontrolled emotional flames.',
    mantleMessage:
      'Glowing red under ultraviolet sunlight: the crimson flame of Mogok corundum cannot be quenched by dark earth.',
    historicalContext:
      'The fabled "Valley of Rubies", source of the rarest and most valuable "Pigeon\'s Blood" rubies for over a thousand years.',
    chthonicKeyword: 'PASSION',
    mineralColor: '#E11D48',
    discoveryYear: 'Antiquity (c. 6th Century CE)',
  },

  // 34. Rio Tinto Mines (Spain) - Iron / Copper Acid Waters
  {
    id: 'rio-tinto',
    name: 'Rio Tinto Ancient Pyrite Complex',
    location: 'Huelva, Andalusia',
    country: 'Spain',
    continent: 'Europe',
    lat: 37.6964,
    lng: -6.5939,
    depthMeters: 400,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Pyrite & Chalcopyrite',
    secondaryMinerals: ['Iron Ochre', 'Gold', 'Silver', 'Acid Mine Waters'],
    mineralCategory: 'Structural & Ferrous',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Mars',
    arcanaArchetype: 'The Martian River Alchemist',
    feminineArchetype: 'Martia Rubra, Alchemist of the Blood-Red River',
    cartoucheTitle: 'FODINAE FLUVII RUBRI — ALCHEMISTA MARTIANA',
    cartographicSilhouetteType: 'serpentine-alchemist',
    cartographicFigure:
      'The terraced red and violet open pits along the blood-red river outline a Martian sorceress brewing extreme acidophilic extremophiles. Her waters are so intensely rich in iron and sulfur that NASA studies her riverbed to model the ancient habitability of Mars.',
    uprightMeaning:
      'Thriving in extreme, seemingly unlivable conditions; radical alchemical resilience; finding life in Martian fire.',
    invertedMeaning:
      'Corrosive bitterness, acidifying surrounding relationships, burning bridges in sulfuric anger.',
    mantleMessage:
      'Five thousand years of mining turned the river blood-red: an ecosystem of extremophile life that mirrors the surface of Mars.',
    historicalContext:
      'Mined by Tartessians, Phoenicians, Romans, and modern corporations for 5,000 years; birthplace of the massive Rio Tinto mining group.',
    chthonicKeyword: 'RESILIENCE',
    mineralColor: '#B91C1C',
    discoveryYear: 'c. 3000 BCE',
  },

  // 35. Carajás Mine (Brazil) - Iron Ore
  {
    id: 'carajas-iron',
    name: 'Carajás Iron Ore Mine',
    location: 'Pará, Amazon Basin',
    country: 'Brazil',
    continent: 'South America',
    lat: -6.0592,
    lng: -50.1814,
    depthMeters: 400,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Hematite (Iron Ore 67% Fe)',
    secondaryMinerals: ['Manganese', 'Copper', 'Gold', 'Nickel'],
    mineralCategory: 'Structural & Ferrous',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Mars',
    arcanaArchetype: 'The Amazonian Iron Colossus',
    feminineArchetype: 'Amazonia Ferrea, The Jungle Iron Sovereign',
    cartoucheTitle: 'MONS FERRI AMAZONICUS — DOMINA SILVAE CHALYBEAE',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'Carved into the rainforest plateaus of Serra dos Carajás, her towering cartographic figure commands the richest iron mountain on Earth. Her emerald rainforest cloak parts to reveal pure, high-grade hematite armor that builds the skyscrapers of the modern world.',
    uprightMeaning:
      'Unsurpassed structural foundation, building civilizations from raw iron will, harmonious coexistence with deep wilderness.',
    invertedMeaning:
      'Jungle deforestation, crushing natural ecosystems with heavy machinery, cold industrial encroachment.',
    mantleMessage:
      'In the heart of the Amazon lies 18 billion tons of the purest hematite on Earth, discovered when a helicopter landed in a forest clearing.',
    historicalContext:
      'The largest iron ore mine on Earth, producing hyper-pure 67% iron ore exported across global steel networks.',
    chthonicKeyword: 'STRENGTH',
    mineralColor: '#71717A',
    discoveryYear: '1967',
  },

  // 36. Botallack & Cornwall Sub-Sea Mines (UK) - Tin / Copper
  {
    id: 'botallack-cornwall',
    name: 'Botallack Sub-Oceanic Tin Mine',
    location: 'Cornwall',
    country: 'United Kingdom',
    continent: 'Europe',
    lat: 50.1333,
    lng: -5.6833,
    depthMeters: 500,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Cassiterite (Tin)',
    secondaryMinerals: ['Copper', 'Arsenic', 'Quartz'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Water',
    planetaryRuler: 'Jupiter',
    arcanaArchetype: 'The Sub-Oceanic Engine',
    feminineArchetype: 'Cornubia, Mermaid of the Sub-Sea Tin Lodes',
    cartoucheTitle: 'METALLA SUBMARINA CORNUBIENSIA — NYMPHA OCEANI',
    cartographicSilhouetteType: 'water-bearer-saline',
    cartographicFigure:
      'Perched on jagged Atlantic granite cliffs, the stone engine houses chart a fierce Celtic sea nymph whose shafts burrow directly beneath the roaring ocean floor. Miners underground could hear the Atlantic boulders rolling overhead during winter storms.',
    uprightMeaning:
      'Bravery to delve beneath the ocean storms, master engineering on the edge of the abyss, ancestral tin craftsmanship.',
    invertedMeaning:
      'Ocean waters crashing through ceilings, working under constant claustrophobic peril, neglected maritime heritage.',
    mantleMessage:
      'Tunnels running half a mile under the Atlantic seabed: the miners listened to the Atlantic waves roaring overhead as they picked cassiterite.',
    historicalContext:
      'Iconic Cornish mining site where shafts extended directly beneath the Atlantic Ocean; fueled the Bronze Age and the Industrial Revolution.',
    chthonicKeyword: 'VALOR',
    mineralColor: '#A8A29E',
    discoveryYear: '1721 (Bronze Age origins)',
  },

  // 37. Tsumeb Polymetallic Mine (Namibia) - Germanium / Dioptase / Azurite
  {
    id: 'tsumeb-mine',
    name: 'Tsumeb Polymetallic Pipe',
    location: 'Oshikoto Region',
    country: 'Namibia',
    continent: 'Africa',
    lat: -19.2333,
    lng: 17.7167,
    depthMeters: 1700,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Dioptase, Azurite & Germanium',
    secondaryMinerals: ['Wulfenite', 'Mimetite', 'Smithsonite', 'Copper', 'Lead'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Water',
    planetaryRuler: 'Mercury',
    arcanaArchetype: 'The Mineralogical Sorcery Pipe',
    feminineArchetype: 'Mineralia, Enchantress of the 300 Crystal Species',
    cartoucheTitle: 'PIPA CRYSTALLINA TSUMEBENSIS — ENCHANTRIX SPECIEI',
    cartographicSilhouetteType: 'serpentine-alchemist',
    cartographicFigure:
      'The vertical volcanic-karst pipe descends 1,700 meters like an enchanted spiral staircase. Her cartographic silhouette is adorned with emerald-green dioptase, azure-blue azurite, and honey-gold wulfenite—holding the record for the most distinct mineral species found in any single mine.',
    uprightMeaning:
      'Unbounded creative versatility, dazzling multi-dimensional talents, rare alchemical combinations never seen elsewhere.',
    invertedMeaning:
      'Over-complexity, sensory overload, hoarding rare oddities without integrating their core wisdom.',
    mantleMessage:
      'Over 300 mineral species and 72 type-localities found in a single subterranean pipe: nature’s ultimate mineral cabinet of curiosities.',
    historicalContext:
      'World-famous mineralogical locality, renowned among geologists and museums worldwide for producing the finest crystallized specimen ores.',
    chthonicKeyword: 'VARIETY',
    mineralColor: '#06B6D4',
    discoveryYear: '1893',
  },

  // 38. Oyu Tolgoi (Mongolia) - Copper / Gold
  {
    id: 'oyu-tolgoi',
    name: 'Oyu Tolgoi (Turquoise Hill)',
    location: 'South Gobi Desert, Omnogovi',
    country: 'Mongolia',
    continent: 'Asia',
    lat: 43.0069,
    lng: 106.8483,
    depthMeters: 1300,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Copper & Gold (Porphyry)',
    secondaryMinerals: ['Turquoise', 'Silver', 'Molybdenum'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The Turquoise Steppe Dragon',
    feminineArchetype: 'Tolgoya, Protectress of the Gobi Turquoise Heart',
    cartoucheTitle: 'COLLIS TURCOIDES GOBIENSIS — DOMINA STEPPAE',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'Rising beneath the harsh winds of the South Gobi, her copper-turquoise figure rides the subterranean block-cave tunnels 1.3 kilometers deep. Her saddle is made of native turquoise weathered by nomads, and her breath conducts the electrical veins of Eurasia.',
    uprightMeaning:
      'Pioneering in harsh expanses, modern subterranean engineering harmonizing with ancient nomadic skies, vast latent power.',
    invertedMeaning:
      'Clashing corporate interests and ancient landscapes, water scarcity in delicate desert ecosystems.',
    mantleMessage:
      'Nomads found turquoise rocks weathered on the surface for centuries before the massive subterranean copper monster was awakened.',
    historicalContext:
      'One of the world\'s largest known copper and gold deposits; Hugo Dummett discovered the massive underground deposit in 2001.',
    chthonicKeyword: 'VANGUARD',
    mineralColor: '#2DD4BF',
    discoveryYear: '2001',
  },

  // 39. Guanajuato Silver Mines (Mexico) - Silver (Veta Madre)
  {
    id: 'guanajuato-silver',
    name: 'Guanajuato Veta Madre (Valenciana)',
    location: 'Guanajuato',
    country: 'Mexico',
    continent: 'North America',
    lat: 21.0190,
    lng: -101.2574,
    depthMeters: 600,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Silver (Acanthite & Polybasite)',
    secondaryMinerals: ['Gold', 'Quartz', 'Calcite', 'Pyrite'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Water',
    planetaryRuler: 'Moon',
    arcanaArchetype: 'The Mother Vein of the Silver Baroque',
    feminineArchetype: 'Valenciana, Queen of the Veta Madre',
    cartoucheTitle: 'VETA MATER GUANAJUATENSIS — REGINA ARGENTEA BAROCCA',
    cartographicSilhouetteType: 'veiled-oracle',
    cartographicFigure:
      'The octagonal Boca San Ramón shaft and deep tunnels trace a dramatic Mexican baroque queen crowned in silver filigree. From her underground wealth rose the ornate pink stone churrigueresque churches and cobblestone subterranean avenues of Guanajuato.',
    uprightMeaning:
      'Artistic and architectural flourishing born of deep discipline, honoring the Mother Vein, elegant silver illumination.',
    invertedMeaning:
      'Superficial baroque ostentation, building gilded facades over subterranean misery, hollow pageantry.',
    mantleMessage:
      'The Veta Madre (Mother Vein) produced a sixth of the world\'s silver; the Count of Valenciana paved the road to church with silver bars.',
    historicalContext:
      'The Valenciana mine on the Veta Madre fault produced colossal silver revenues that fueled the Spanish Empire and Mexican baroque culture.',
    chthonicKeyword: 'DEVOTION & ART',
    mineralColor: '#E2E8F0',
    discoveryYear: '1548',
  },

  // 40. Welkom / Free State Goldfields (South Africa) - Gold
  {
    id: 'welkom-goldfields',
    name: 'Welkom Free State Goldfields',
    location: 'Free State',
    country: 'South Africa',
    continent: 'Africa',
    lat: -27.9833,
    lng: 26.7333,
    depthMeters: 3000,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Gold (Basal Reef)',
    secondaryMinerals: ['Uranium', 'Pyrite', 'Bitumen'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Sun',
    arcanaArchetype: 'The Golden Phoenix of the Karoo',
    feminineArchetype: 'Vrystaata, The Sun Maiden of the Basal Reef',
    cartoucheTitle: 'CAMPUS AURIFER WELKOMENSIS — PHOENIX KAROOENSIS',
    cartographicSilhouetteType: 'winged-angelic-strata',
    cartographicFigure:
      'The deep shaft systems beneath the flat savannah plains map a golden winged phoenix rising from 3,000 meters down. Her wings span across the ancient Witwatersrand basin, carrying the golden dust of 2.7-billion-year-old river deltas.',
    uprightMeaning:
      'Resurgence from dry plains, awakening sleeping treasures beneath unassuming surfaces, golden renewal.',
    invertedMeaning:
      'Deep thermal exhaustion, sinking deeper into past glories without building future stability.',
    mantleMessage:
      'Beneath the quiet mealie fields of the Free State lay the Basal Reef, struck in 1946 with an assay of 62 ounces per ton.',
    historicalContext:
      'A massive post-WWII gold discovery that turned sleepy agricultural lands into a booming constellation of ultra-deep mining cities.',
    chthonicKeyword: 'RESURGENCE',
    mineralColor: '#F59E0B',
    discoveryYear: '1946',
  },

  // 41. Mount Whaleback (Australia) - Iron Ore
  {
    id: 'mount-whaleback',
    name: 'Mount Whaleback Banded Iron',
    location: 'Newman, Pilbara',
    country: 'Australia',
    continent: 'Oceania',
    lat: -23.3644,
    lng: 119.6706,
    depthMeters: 500,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Banded Iron (Hematite & Goethite)',
    secondaryMinerals: ['Martite', 'Shale', 'Chert'],
    mineralCategory: 'Structural & Ferrous',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Mars',
    arcanaArchetype: 'The Great Banded Whale of Time',
    feminineArchetype: 'Pilbara Ferrata, Titaness of the 2.5-Billion-Year Crust',
    cartoucheTitle: 'MONS BALAENAE PILBARENSIS — TITANIS FERRI PRIMAEVA',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'The 5.5-kilometer tiered red pit curves like the spine of a massive prehistoric whale breaching ancient red earth. Her stratified bands of red jasper and black hematite record the Great Oxidation Event when the Earth’s first cyanobacteria breathed oxygen into iron seas.',
    uprightMeaning:
      'Deepest geological anchoring, patient accumulation of value over billions of years, unshakeable stability.',
    invertedMeaning:
      'Heavy inertia, inability to adapt quickly to immediate conditions, immovable stubbornness.',
    mantleMessage:
      'When the oceans first turned oxygen into rust 2.5 billion years ago, Mount Whaleback captured the breath of primordial life.',
    historicalContext:
      'The largest single open-pit iron ore mine in the world by pit length, discovered in 1957 by Stan Hilditch.',
    chthonicKeyword: 'PRIMORDIAL TIME',
    mineralColor: '#991B1B',
    discoveryYear: '1957',
  },

  // 42. Merensky Reef / Bushveld Complex (South Africa) - Platinum Group
  {
    id: 'merensky-reef',
    name: 'Merensky Reef (Bushveld Igneous Complex)',
    location: 'Limpopo & North West',
    country: 'South Africa',
    continent: 'Africa',
    lat: -25.4000,
    lng: 27.2000,
    depthMeters: 2200,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Platinum Group Metals (PGMs)',
    secondaryMinerals: ['Palladium', 'Rhodium', 'Ruthenium', 'Chromite', 'Nickel'],
    mineralCategory: 'Noble Gems',
    elementalAffinity: 'Air',
    planetaryRuler: 'Moon',
    arcanaArchetype: 'The Layered Igneous Crown',
    feminineArchetype: 'Platina, Queen of the Layered Magma Stratum',
    cartoucheTitle: 'STRATUM NOBILE MERENSKYANUM — REGINA PLATINAE',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'The thin, hyper-concentrated 1-meter mineralized seam extends for hundreds of kilometers in a perfect saucer-like igneous layer. Her cartographic form is a silver-robed lunar empress wearing a crown of rhodium and ruthenium stars.',
    uprightMeaning:
      'Hyper-concentration of precious excellence, catalytic nobility that does not tarnish, supreme purity.',
    invertedMeaning:
      'Perfectionism that refuses to engage with common ground, brittle aloofness, vulnerability to industrial strikes.',
    mantleMessage:
      'A single seam less than a meter thick holds over 70% of the Earth\'s platinum reserves: true nobility requires no broad fanfare.',
    historicalContext:
      'Discovered by geologist Hans Merensky in 1924; the Bushveld Complex is the largest layered igneous intrusion on Earth.',
    chthonicKeyword: 'NOBILITY',
    mineralColor: '#E2E8F0',
    discoveryYear: '1924',
  },

  // 43. Keweenaw Native Copper Range (USA) - Pure Float Copper
  {
    id: 'keweenaw-copper',
    name: 'Keweenaw Native Copper Range',
    location: 'Upper Peninsula, Michigan',
    country: 'United States',
    continent: 'North America',
    lat: 47.1211,
    lng: -88.5694,
    depthMeters: 1600,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Native Copper (99.9% Pure)',
    secondaryMinerals: ['Datolite', 'Silver (Half-Breed)', 'Chlorite', 'Epidote'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Water',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The Lake Superior Glacial Float',
    feminineArchetype: 'Keweenawa, Mother of the Pure Red Metal',
    cartoucheTitle: 'PENINSULA CUPREA SUPERIORENSIS — MATER CUPRI NATIVI',
    cartographicSilhouetteType: 'water-bearer-saline',
    cartographicFigure:
      'Extending into the freezing, deep blue waters of Lake Superior, her silhouette is an Indigenous copper maiden holding massive multi-ton boulders of pure metallic copper. Her feet are washed by glacial freshwater lakes.',
    uprightMeaning:
      'Pure, unadulterated conductivity requiring no chemical smelting; direct, unpretentious authenticity.',
    invertedMeaning:
      'Nostalgic clinging to depleted boomtowns, harsh winter isolation, stubborn resistance to modern refinement.',
    mantleMessage:
      'Unlike almost all other copper on Earth that requires smelting from sulfur ore, Keweenaw copper came out of the rock as pure, malleable metallic metal.',
    historicalContext:
      'Mined by Indigenous peoples for over 7,000 years for tools and ceremonial trade, and later site of the first major US mining boom in the 1840s.',
    chthonicKeyword: 'AUTHENTICITY',
    mineralColor: '#C2410C',
    discoveryYear: 'c. 5000 BCE',
  },

  // 44. Mount Isa Mines (Australia) - Copper / Lead / Silver
  {
    id: 'mount-isa',
    name: 'Mount Isa Mines Complex',
    location: 'Queensland',
    country: 'Australia',
    continent: 'Oceania',
    lat: -20.7333,
    lng: 139.4833,
    depthMeters: 1900,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Copper, Lead & Zinc',
    secondaryMinerals: ['Silver', 'Pyrite', 'Cobalt'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Mars',
    arcanaArchetype: 'The Red Shield Foundry',
    feminineArchetype: 'Isabella Chthonia, The Red Shield Maiden',
    cartoucheTitle: 'COMPLEXUS METALLICUS ISANUS — BELLATRIX RUBRA',
    cartographicSilhouetteType: 'warrior-chthonic',
    cartographicFigure:
      'Under the towering 270-meter lead smelting stack, her warrior silhouette stands sentinel over the red spinifex hills. Her shield bears the twin subterranean ore bodies—one of pure silica copper, and one of layered silver-lead-zinc.',
    uprightMeaning:
      'Duality of strength, mastering two distinct disciplines side-by-side, fierce desert courage.',
    invertedMeaning:
      'Smelter emissions clouding personal clarity, harsh defensiveness, stubborn isolation in the outback.',
    mantleMessage:
      'Two distinct ore systems side-by-side in the same rock: one holds copper, the other silver and zinc.',
    historicalContext:
      'Discovered in 1923 by lone prospector John Campbell Miles; one of the most productive polymetallic mines in history.',
    chthonicKeyword: 'DUALITY',
    mineralColor: '#EA580C',
    discoveryYear: '1923',
  },

  // 45. Henderson Molybdenum Mine (USA) - Molybdenum
  {
    id: 'henderson-moly',
    name: 'Henderson Molybdenum Mine',
    location: 'Empire, Colorado Rockies',
    country: 'United States',
    continent: 'North America',
    lat: 39.7619,
    lng: -105.8450,
    depthMeters: 1100,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Molybdenite (Molybdenum)',
    secondaryMinerals: ['Pyrite', 'Quartz', 'Fluorite', 'Topaz'],
    mineralCategory: 'Structural & Ferrous',
    elementalAffinity: 'Air',
    planetaryRuler: 'Saturn',
    arcanaArchetype: 'The Continental Divide Oracle',
    feminineArchetype: 'Molybdina, Priestess of the Continental Divide',
    cartoucheTitle: 'MONS HENDERSONIENSIS — SACERDOS DIVORTII AQUARUM',
    cartographicSilhouetteType: 'veiled-oracle',
    cartographicFigure:
      'Burrowed deep beneath the snow-covered peaks of the Continental Divide, her cartographic form is a high-altitude mountain priestess. Ore is extracted on the Atlantic side and carried through a 15-kilometer tunnel beneath the mountain to the Pacific side.',
    uprightMeaning:
      'High-temperature structural resilience, passing under insurmountable continental divides, strengthening all steel alloys.',
    invertedMeaning:
      'Over-reliance on heavy machinery, extreme altitude isolation, hiding behind complex logistical barriers.',
    mantleMessage:
      'Mined under the Continental Divide: the rock travels 15 kilometers through the heart of the Rocky Mountains.',
    historicalContext:
      'The largest primary producer of molybdenum in the United States, essential for high-strength steel alloys and space technology.',
    chthonicKeyword: 'REINFORCEMENT',
    mineralColor: '#64748B',
    discoveryYear: '1964',
  },

  // 46. Cerro Verde (Peru) - Copper / Molybdenum
  {
    id: 'cerro-verde',
    name: 'Cerro Verde Porphyry Mine',
    location: 'Arequipa',
    country: 'Peru',
    continent: 'South America',
    lat: -16.5367,
    lng: -71.5833,
    depthMeters: 850,
    depthCategory: 'Surface Open-Pit',
    primaryMineral: 'Copper (Chalcopyrite & Chalcocite)',
    secondaryMinerals: ['Molybdenum', 'Silver', 'Brochantite'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The Emerald Hill of the Volcanoes',
    feminineArchetype: 'Volcana Viridis, Lady of the Misti Ash',
    cartoucheTitle: 'COLLIS VIRIDIS AREQUIPENSIS — DOMINA VULCANI MISTI',
    cartographicSilhouetteType: 'dancing-nymph',
    cartographicFigure:
      'Framed against the snow-capped cone of El Misti volcano, the deep terraced green pits outline an Andean nymph dancing amidst volcanic ash. Her skirts are tinted with green copper oxide and shimmering silver-moly ore.',
    uprightMeaning:
      'Channeling volcanic fire into constructive earthly copper, flourishing in high volcanic soils.',
    invertedMeaning:
      'Volcanic instability, tremors beneath long-term plans, taking high-altitude stability for granted.',
    mantleMessage:
      'Beneath the shadows of three sacred volcanoes, the green hill yields the conductive pulse of the Andes.',
    historicalContext:
      'Exploited by Spanish conquerors in the 1800s for oxide copper, today one of Peru\'s largest copper-moly operations.',
    chthonicKeyword: 'VITAL CONDUCTION',
    mineralColor: '#059669',
    discoveryYear: '1868',
  },

  // 47. El Teniente (Chile) - Underground Copper Maze
  {
    id: 'el-teniente',
    name: 'El Teniente Underground Mine',
    location: 'Sewhell, O\'Higgins Region',
    country: 'Chile',
    continent: 'South America',
    lat: -34.0908,
    lng: -70.4497,
    depthMeters: 2000,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Copper & Molybdenum',
    secondaryMinerals: ['Bornite', 'Chalcopyrite', 'Silver'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The 3,000-Kilometer Subterranean Labyrinth',
    feminineArchetype: 'Andina Profunda, Empress of the Subterranean Maze',
    cartoucheTitle: 'LABYRINTHUS TENIENTIS ANDINUS — DOMINA SUBTERRANEA',
    cartographicSilhouetteType: 'sleeping-titaness',
    cartographicFigure:
      'With over 3,000 kilometers of underground drifts—enough to stretch across an entire continent—her cartographic figure is a labyrinthine subterranean titaness whose nervous system is carved directly into the high Andes rock.',
    uprightMeaning:
      'Mastery of intricate, complex subterranean networks; unseen greatness operating quietly beneath mountain peaks.',
    invertedMeaning:
      'Getting lost in your own labyrinthine tunnels, unnavigable bureaucracy, subterranean claustrophobia.',
    mantleMessage:
      'Three thousand kilometers of tunnels hidden inside a single mountain: the world\'s largest underground mine.',
    historicalContext:
      'The world\'s largest underground copper mine, worked continuously since 1905 with massive block-caving infrastructure.',
    chthonicKeyword: 'LABYRINTH',
    mineralColor: '#B45309',
    discoveryYear: '1905',
  },

  // 48. Witwatersrand Basin Deep Reefs (South Africa) - Gold
  {
    id: 'witwatersrand-basin',
    name: 'Witwatersrand Super-Basin',
    location: 'Johannesburg',
    country: 'South Africa',
    continent: 'Africa',
    lat: -26.2041,
    lng: 28.0473,
    depthMeters: 3800,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Native Gold (Quartz Conglomerate)',
    secondaryMinerals: ['Uranium', 'Pyrite', 'Diamonds', 'Osmium'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Sun',
    arcanaArchetype: 'The Primordial Sea of Gold',
    feminineArchetype: 'Vaalensis, Mother of the Ridge of White Waters',
    cartoucheTitle: 'SINUS METALLIFER WITWATERSRANDIENSIS — MATER AVRI ORBIS',
    cartographicSilhouetteType: 'goddess-enthroned',
    cartographicFigure:
      'The grand 300-kilometer geological crescent of the Witwatersrand Basin forms the monumental throne of the Mother of World Gold. Over 40% of all gold ever mined by human civilization since the dawn of time came from this single ancient inland sea delta.',
    uprightMeaning:
      'Supreme global fountainhead of abundance, primordial river deltas crystallizing into civilization-defining wealth.',
    invertedMeaning:
      'The golden curse, economic disparity, exhausting the greatest fountainhead on Earth without spiritual grounding.',
    mantleMessage:
      'Nearly half of all the gold in human hands—from wedding rings to national bank vaults—was laid down in this ancient basin.',
    historicalContext:
      'The single greatest gold province on Earth, discovered by George Harrison in 1886, giving rise to modern Johannesburg.',
    chthonicKeyword: 'FOUNTAINHEAD',
    mineralColor: '#FACC15',
    discoveryYear: '1886',
  },

  // 49. Yauricocha Polymetallic Mine (Peru) - Silver / Zinc / Lead
  {
    id: 'yauricocha',
    name: 'Yauricocha High-Altitude Mine',
    location: 'Yauyos, Lima Region',
    country: 'Peru',
    continent: 'South America',
    lat: -12.3167,
    lng: -75.9167,
    depthMeters: 1400,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Silver, Zinc & Lead',
    secondaryMinerals: ['Copper', 'Gold', 'Pyrite'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Water',
    planetaryRuler: 'Moon',
    arcanaArchetype: 'The Glacial Silver Summit',
    feminineArchetype: 'Apu Yauricocha, Priestess of the Glacial Pass',
    cartoucheTitle: 'METALLA ALPINA YAURICOCHENSIS — APU ARGENTEA',
    cartographicSilhouetteType: 'veiled-oracle',
    cartographicFigure:
      'At 4,600 meters elevation in the high glaciated Peruvian cordillera, her cartographic form is an Andean Apu priestess whose cloak of snow and high-altitude scree shelters deep, rich chimneylike polymetallic veins.',
    uprightMeaning:
      'High spiritual fortitude in rare air, holding pristine sacred integrity against mountain winds, cold clarity.',
    invertedMeaning:
      'Altitude sickness of the soul, cold isolation, freezing out trusted companions.',
    mantleMessage:
      'At 4,600 meters in the high Andes, polymetallic chimneys drop deep into the warm limestone roots.',
    historicalContext:
      'Operating for over a century, producing high-grade silver, zinc, lead, and copper from carbonate replacement chimneys.',
    chthonicKeyword: 'PERSEVERANCE',
    mineralColor: '#93C5FD',
    discoveryYear: '1948',
  },

  // 50. Mount Lyell Copper Mine (Australia) - Copper / Gold
  {
    id: 'mount-lyell',
    name: 'Mount Lyell Copper Mine',
    location: 'Queenstown, Tasmania',
    country: 'Australia',
    continent: 'Oceania',
    lat: -42.0833,
    lng: 145.5667,
    depthMeters: 1000,
    depthCategory: 'Subterranean Shaft',
    primaryMineral: 'Chalcopyrite (Copper) & Gold',
    secondaryMinerals: ['Pyrite', 'Silver', 'Bornite'],
    mineralCategory: 'Battery & Modern Flux',
    elementalAffinity: 'Earth',
    planetaryRuler: 'Venus',
    arcanaArchetype: 'The Moonscape Mountain of the South',
    feminineArchetype: 'Lyellina, Spirit of the Rain-Drenched Moonscape',
    cartoucheTitle: 'MONS LYELLI TASMANIENSIS — NYMPHA IMBRIUM',
    cartographicSilhouetteType: 'water-bearer-saline',
    cartographicFigure:
      'Amidst the 3,000 mm annual rainfall of the Tasmanian wilderness, the bare orange and purple mountainside outlines a rain-drenched nymph whose streams carry the sulfur and copper of the Prince Lyell ore body.',
    uprightMeaning:
      'Regeneration after devastation, raw wilderness reclamation, persistence under relentless rainfall.',
    invertedMeaning:
      'Acid rain, barren moonscapes created by industrial smelting fumes, ecological trauma.',
    mantleMessage:
      'Over three meters of rain a year wash the orange copper hills of Queenstown, where the earth is slowly healing.',
    historicalContext:
      'One of the oldest and most famous mines in Australia, operating from 1893 through 2014 in rugged western Tasmania.',
    chthonicKeyword: 'RECLAMATION',
    mineralColor: '#D97706',
    discoveryYear: '1883',
  },
];

export const SPREAD_DEFINITIONS = [
  {
    id: 'single',
    name: 'The Vein of Seeking (Daily Strike)',
    cardCount: 1,
    description: 'A direct borehole to the planetary mantle for immediate clarity, daily grounding, or singular inquiry.',
    positions: [
      {
        id: 'core_strike',
        name: 'The Striking Vein',
        description: 'The resonant world mine and mineral archetype guiding your immediate present and target timeline.',
        strataDepth: 'Deep Crust (1,000m)',
      },
    ],
  },
  {
    id: 'strata3',
    name: 'The 3-Strata Trench (Past, Present, Future Outcome)',
    cardCount: 3,
    description: 'Drills through three geologic strata: The Surface (Origins), The Mantle (Present Pressure), and The Bedrock (Future Realization).',
    positions: [
      {
        id: 'surface_crust',
        name: '1. The Surface Strata (Origins & Soil)',
        description: 'The foundation, past forces, or conscious material from which this situation arose.',
        strataDepth: 'Surface / Open Pit (0-300m)',
      },
      {
        id: 'mantle_seam',
        name: '2. The Mantle Seam (Active Pressure & Catalyst)',
        description: 'The active tension, mineral friction, and transformative heat working in the present.',
        strataDepth: 'Subterranean Shaft (1,000-2,500m)',
      },
      {
        id: 'bedrock_core',
        name: '3. The Bedrock Core (Future Unveiled Destiny)',
        description: 'The crystallizing outcome, future realization at your chosen timeline, and subterranean harvest.',
        strataDepth: 'Ultra-Deep Abyss (3,000-4,000m)',
      },
    ],
  },
  {
    id: 'descent4',
    name: 'The 4-Tier Abyssal Descent (Timeline Prophecy)',
    cardCount: 4,
    description: 'A deep psychological excavation charting what is exposed, what is suppressed, the tool to unlock the vault, and the ultimate future truth.',
    positions: [
      {
        id: 'daylight_portal',
        name: '1. The Open Pit (What Is Seen / Exposed)',
        description: 'The surface-level reality visible to all eyes right now.',
        strataDepth: 'Surface (0m)',
      },
      {
        id: 'shadow_drift',
        name: '2. The Dark Drift (What Lies Submerged / Hidden Fear)',
        description: 'The subterranean emotional currents and suppressed fears.',
        strataDepth: 'Sub-Level Shaft (800m)',
      },
      {
        id: 'alchemical_stope',
        name: '3. The Stope of Power (The Tool / Mineral Catalyst)',
        description: 'The precise mineral frequency or mindset needed to transmute this situation.',
        strataDepth: 'Geothermal Chamber (2,200m)',
      },
      {
        id: 'magma_vault',
        name: '4. The Mantle Singularity (Future Manifest Destiny)',
        description: 'The deep core reality and future prophecy that cannot be shaken.',
        strataDepth: 'Planetary Mantle (4,000m+)',
      },
    ],
  },
  {
    id: 'elemental5',
    name: 'The 5-Point Tectonic Cross (Macro Prognostication)',
    cardCount: 5,
    description: 'An elemental compass connecting the North (Earth), East (Air), South (Fire), West (Water), and the Central Chthonic Future Nexus.',
    positions: [
      {
        id: 'north_earth',
        name: '1. North: The Iron Foundation (Earth / Material Stability)',
        description: 'Your physical resources, boundaries, and earthly anchoring.',
        strataDepth: 'Continental Shield (Crust)',
      },
      {
        id: 'east_air',
        name: '2. East: The Lithium Breeze (Air / Intellect & Vision)',
        description: 'Your mental clarity, inspiration, and electrical synapses.',
        strataDepth: 'High Altitude Plateau',
      },
      {
        id: 'south_fire',
        name: '3. South: The Volcanic Forge (Fire / Will & Drive)',
        description: 'Your ambition, passion, action, and thermal energy.',
        strataDepth: 'Hydrothermal Magma Vents',
      },
      {
        id: 'west_water',
        name: '4. West: The Salt Lake (Water / Intuition & Healing)',
        description: 'Your emotional depth, subconscious dreaming, and healing flow.',
        strataDepth: 'Subterranean Aquifer & Salt Cathedral',
      },
      {
        id: 'center_core',
        name: '5. Center: The Chthonic Core (Aether / Future Unified Destiny)',
        description: 'The sovereign union of all four elements at the Earth’s heart for the targeted future horizon.',
        strataDepth: 'Inner Core Singularity',
      },
    ],
  },
  {
    id: 'titanessFuture5',
    name: 'Future-Forecasting Titaness Spread (What’s Coming)',
    cardCount: 5,
    description: 'Specialized 5-position prophetic spread invoked when asking "what’s coming?" rather than "what is." Charts the Mine of the Present, Fault Line of Change, Vein of Opportunity, Cathedral of Endings, and the Hydra Path Timeline.',
    positions: [
      {
        id: 'mine_present',
        name: '1. Mine of the Present',
        description: 'Titaness current emotional & mineral state and present geomantic pattern.',
        strataDepth: 'Upper Mantle / Present Seam',
      },
      {
        id: 'fault_line_change',
        name: '2. Fault Line of Change',
        description: 'Sacred geometric motion (triangle/spiral/grid) showing how change moves through your life.',
        strataDepth: 'Tectonic Shear Zone (1,500m)',
      },
      {
        id: 'vein_opportunity',
        name: '3. Vein of Opportunity',
        description: 'Geomantic breakthrough (Fortuna Major / Caput Draconis / Via) where growth is most likely.',
        strataDepth: 'Hydrothermal Gold/Emerald Seam (2,800m)',
      },
      {
        id: 'cathedral_endings',
        name: '4. Cathedral of Endings',
        description: 'Geomantic completion (Cauda Draconis / Carcer / Tristitia) revealing what is closing.',
        strataDepth: 'Ancient Salt Vault / Subterranean Tomb (3,400m)',
      },
      {
        id: 'hydra_path_timeline',
        name: '5. Hydra Path (Timeline)',
        description: 'Planetary time frame derived from the main figure (1–4 weeks, 1–3 months, 2–6 months) narrated by the Titaness.',
        strataDepth: 'Abyssal Mantle Singularity (4,000m+)',
      },
    ],
  },
];
