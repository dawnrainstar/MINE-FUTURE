import { WorldMine, DepthCategory, MineralCategory, ElementalAffinity, PlanetaryRuler } from '../types';
import { WORLD_MINES } from './mines';

// Pre-generated massive database of 2,500+ world mines & mineral deposits
// Covering all major global mining regions, historical pits, active brine basins, and underground seams.

interface BaseDepositSeed {
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
  discoveryYear?: string;
}

// Major mining hubs & deposit clusters across every continent
const GLOBAL_DEPOSIT_SEEDS: BaseDepositSeed[] = [
  // --- NORTH AMERICA ---
  { name: 'Carlin Trend Gold Complex', location: 'Nevada', country: 'United States', continent: 'North America', lat: 40.7138, lng: -116.1039, depthMeters: 650, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold', secondaryMinerals: ['Silver', 'Arsenic'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '1961' },
  { name: 'Cortez Hills Mine', location: 'Nevada', country: 'United States', continent: 'North America', lat: 40.1633, lng: -116.6347, depthMeters: 850, depthCategory: 'Subterranean Shaft', primaryMineral: 'Gold', secondaryMinerals: ['Silver'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '1862' },
  { name: 'Morenci Copper Pit', location: 'Arizona', country: 'United States', continent: 'North America', lat: 33.0806, lng: -109.3644, depthMeters: 550, depthCategory: 'Surface Open-Pit', primaryMineral: 'Copper', secondaryMinerals: ['Molybdenum', 'Gold'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Earth', planetaryRuler: 'Venus', discoveryYear: '1872' },
  { name: 'Red Dog Zinc-Lead Mine', location: 'Alaska', country: 'United States', continent: 'North America', lat: 68.0722, lng: -162.8806, depthMeters: 380, depthCategory: 'Arctic Permafrost', primaryMineral: 'Zinc', secondaryMinerals: ['Lead', 'Silver'], mineralCategory: 'Structural & Ferrous', elementalAffinity: 'Water', planetaryRuler: 'Saturn', discoveryYear: '1989' },
  { name: 'Mountain Pass Rare Earth Mine', location: 'California', country: 'United States', continent: 'North America', lat: 35.4800, lng: -115.5342, depthMeters: 280, depthCategory: 'Surface Open-Pit', primaryMineral: 'Neodymium / Bastnäsite', secondaryMinerals: ['Cerium', 'Lanthanum'], mineralCategory: 'Rare Earths & Magnetics', elementalAffinity: 'Aether/Void', planetaryRuler: 'Uranus', discoveryYear: '1949' },
  { name: 'Kidd Creek Mine', location: 'Ontario', country: 'Canada', continent: 'North America', lat: 48.7058, lng: -81.3653, depthMeters: 3014, depthCategory: 'Ultra-Deep Abyss', primaryMineral: 'Copper', secondaryMinerals: ['Zinc', 'Silver', 'Indium'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Water', planetaryRuler: 'Venus', discoveryYear: '1963' },
  { name: 'Ekati Diamond Mine', location: 'Northwest Territories', country: 'Canada', continent: 'North America', lat: 64.7144, lng: -110.6133, depthMeters: 450, depthCategory: 'Arctic Permafrost', primaryMineral: 'Diamond', secondaryMinerals: ['Kimberlite', 'Garnet'], mineralCategory: 'Noble Gems', elementalAffinity: 'Earth', planetaryRuler: 'Sun', discoveryYear: '1998' },
  { name: 'Diavik Diamond Seam', location: 'Northwest Territories', country: 'Canada', continent: 'North America', lat: 64.4981, lng: -110.2736, depthMeters: 420, depthCategory: 'Arctic Permafrost', primaryMineral: 'Diamond', secondaryMinerals: ['Peridot', 'Pyrope'], mineralCategory: 'Noble Gems', elementalAffinity: 'Water', planetaryRuler: 'Moon', discoveryYear: '2003' },
  { name: 'Cigar Lake Uranium Deep Bore', location: 'Saskatchewan', country: 'Canada', continent: 'North America', lat: 58.0583, lng: -104.5333, depthMeters: 500, depthCategory: 'Subterranean Shaft', primaryMineral: 'Uranium (Pitchblende)', secondaryMinerals: ['Nickel', 'Cobalt'], mineralCategory: 'Atomic & Radiance', elementalAffinity: 'Fire', planetaryRuler: 'Uranus', discoveryYear: '1981' },
  { name: 'Peñasquito Polymetallic Pit', location: 'Zacatecas', country: 'Mexico', continent: 'North America', lat: 24.7194, lng: -101.6972, depthMeters: 490, depthCategory: 'Surface Open-Pit', primaryMineral: 'Silver', secondaryMinerals: ['Gold', 'Lead', 'Zinc'], mineralCategory: 'Precious Metals', elementalAffinity: 'Earth', planetaryRuler: 'Moon', discoveryYear: '2010' },
  { name: 'Fresnillo Silver Lode', location: 'Zacatecas', country: 'Mexico', continent: 'North America', lat: 23.1750, lng: -102.8731, depthMeters: 1100, depthCategory: 'Subterranean Shaft', primaryMineral: 'Silver', secondaryMinerals: ['Lead', 'Gold'], mineralCategory: 'Precious Metals', elementalAffinity: 'Water', planetaryRuler: 'Moon', discoveryYear: '1554' },
  { name: 'Cananea Buenavista del Cobre', location: 'Sonora', country: 'Mexico', continent: 'North America', lat: 30.9856, lng: -110.2972, depthMeters: 620, depthCategory: 'Surface Open-Pit', primaryMineral: 'Copper', secondaryMinerals: ['Molybdenum'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Fire', planetaryRuler: 'Mars', discoveryYear: '1899' },
  { name: 'Pueblo Viejo Gold Mine', location: 'Sánchez Ramírez', country: 'Dominican Republic', continent: 'North America', lat: 18.9389, lng: -70.1706, depthMeters: 380, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold', secondaryMinerals: ['Silver', 'Copper'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '1505' },

  // --- SOUTH AMERICA ---
  { name: 'Escondida Copper Mega-Pit', location: 'Antofagasta', country: 'Chile', continent: 'South America', lat: -24.2681, lng: -69.0706, depthMeters: 645, depthCategory: 'Surface Open-Pit', primaryMineral: 'Copper', secondaryMinerals: ['Gold', 'Silver'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Earth', planetaryRuler: 'Venus', discoveryYear: '1990' },
  { name: 'Collahuasi Andean Ridge', location: 'Tarapacá', country: 'Chile', continent: 'South America', lat: -20.9708, lng: -68.6947, depthMeters: 720, depthCategory: 'Surface Open-Pit', primaryMineral: 'Copper', secondaryMinerals: ['Molybdenum'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Air', planetaryRuler: 'Mars', discoveryYear: '1999' },
  { name: 'El Teniente Underground Labyrinth', location: 'O\'Higgins', country: 'Chile', continent: 'South America', lat: -34.0886, lng: -70.4489, depthMeters: 1800, depthCategory: 'Subterranean Shaft', primaryMineral: 'Copper', secondaryMinerals: ['Molybdenum', 'Rhenium'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Earth', planetaryRuler: 'Saturn', discoveryYear: '1905' },
  { name: 'Cerro Verde Copper', location: 'Arequipa', country: 'Peru', continent: 'South America', lat: -16.5367, lng: -71.5833, depthMeters: 550, depthCategory: 'Surface Open-Pit', primaryMineral: 'Copper', secondaryMinerals: ['Molybdenum'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Fire', planetaryRuler: 'Mars', discoveryYear: '1868' },
  { name: 'Antamina Polymetallic Skarn', location: 'Ancash', country: 'Peru', continent: 'South America', lat: -9.5333, lng: -77.0500, depthMeters: 600, depthCategory: 'Surface Open-Pit', primaryMineral: 'Zinc / Copper', secondaryMinerals: ['Silver', 'Bismuth'], mineralCategory: 'Structural & Ferrous', elementalAffinity: 'Water', planetaryRuler: 'Jupiter', discoveryYear: '2001' },
  { name: 'Yanacocha High Altitude Gold', location: 'Cajamarca', country: 'Peru', continent: 'South America', lat: -6.9944, lng: -78.5139, depthMeters: 480, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold', secondaryMinerals: ['Silver'], mineralCategory: 'Precious Metals', elementalAffinity: 'Air', planetaryRuler: 'Sun', discoveryYear: '1993' },
  { name: 'Muzo Emerald Veins', location: 'Boyacá', country: 'Colombia', continent: 'South America', lat: 5.5333, lng: -74.1000, depthMeters: 380, depthCategory: 'Subterranean Shaft', primaryMineral: 'Trapiche Emerald', secondaryMinerals: ['Calcite', 'Pyrite'], mineralCategory: 'Noble Gems', elementalAffinity: 'Water', planetaryRuler: 'Venus', discoveryYear: '1594' },
  { name: 'Carajás Iron Ore Megalith', location: 'Pará', country: 'Brazil', continent: 'South America', lat: -6.0500, lng: -50.2833, depthMeters: 450, depthCategory: 'Surface Open-Pit', primaryMineral: 'Hematite (Iron Ore)', secondaryMinerals: ['Manganese', 'Gold'], mineralCategory: 'Structural & Ferrous', elementalAffinity: 'Earth', planetaryRuler: 'Mars', discoveryYear: '1967' },
  { name: 'Salar de Uyuni Lithium Salt Crust', location: 'Potosí', country: 'Bolivia', continent: 'South America', lat: -20.1338, lng: -67.4891, depthMeters: 35, depthCategory: 'Surface Open-Pit', primaryMineral: 'Lithium / Potash', secondaryMinerals: ['Boron', 'Magnesium'], mineralCategory: 'Chthonic Salts', elementalAffinity: 'Water', planetaryRuler: 'Moon', discoveryYear: '1984' },
  { name: 'Cerro Rico Potosí', location: 'Potosí', country: 'Bolivia', continent: 'South America', lat: -19.6192, lng: -65.7497, depthMeters: 1400, depthCategory: 'Subterranean Shaft', primaryMineral: 'Silver', secondaryMinerals: ['Tin', 'Zinc'], mineralCategory: 'Precious Metals', elementalAffinity: 'Earth', planetaryRuler: 'Saturn', discoveryYear: '1545' },

  // --- AFRICA ---
  { name: 'Grasberg Gold & Copper Pinnacle', location: 'Papua (Oceania/Asia boundary)', country: 'Indonesia', continent: 'Oceania', lat: -4.0558, lng: 137.1158, depthMeters: 1800, depthCategory: 'Ultra-Deep Abyss', primaryMineral: 'Gold / Copper', secondaryMinerals: ['Silver'], mineralCategory: 'Precious Metals', elementalAffinity: 'Air', planetaryRuler: 'Sun', discoveryYear: '1973' },
  { name: 'Kamoto Copper-Cobalt Seam', location: 'Kolwezi', country: 'DR Congo', continent: 'Africa', lat: -10.7167, lng: 25.4333, depthMeters: 620, depthCategory: 'Subterranean Shaft', primaryMineral: 'Cobalt', secondaryMinerals: ['Copper', 'Germanium'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Fire', planetaryRuler: 'Pluto', discoveryYear: '1968' },
  { name: 'Tenke Fungurume Basin', location: 'Lualaba', country: 'DR Congo', continent: 'Africa', lat: -10.5833, lng: 26.1667, depthMeters: 450, depthCategory: 'Surface Open-Pit', primaryMineral: 'Cobalt / Copper', secondaryMinerals: ['Malachite'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Earth', planetaryRuler: 'Venus', discoveryYear: '2009' },
  { name: 'Kansanshi Copper Hill', location: 'Solwezi', country: 'Zambia', continent: 'Africa', lat: -12.0917, lng: 26.4250, depthMeters: 510, depthCategory: 'Surface Open-Pit', primaryMineral: 'Copper', secondaryMinerals: ['Gold'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Earth', planetaryRuler: 'Venus', discoveryYear: '1899' },
  { name: 'Tarkwa Gold Basin', location: 'Western Region', country: 'Ghana', continent: 'Africa', lat: 5.3000, lng: -2.0000, depthMeters: 420, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold', secondaryMinerals: ['Pyrite'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '1877' },
  { name: 'Jwaneng Diamond Kimberlite', location: 'Southern District', country: 'Botswana', continent: 'Africa', lat: -24.5244, lng: 24.7125, depthMeters: 450, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gem Diamond', secondaryMinerals: ['Kimberlite', 'Diopside'], mineralCategory: 'Noble Gems', elementalAffinity: 'Earth', planetaryRuler: 'Jupiter', discoveryYear: '1982' },
  { name: 'Orapa Diamond Pipe', location: 'Central District', country: 'Botswana', continent: 'Africa', lat: -21.3061, lng: 25.3700, depthMeters: 380, depthCategory: 'Surface Open-Pit', primaryMineral: 'Diamond', secondaryMinerals: ['Garnet'], mineralCategory: 'Noble Gems', elementalAffinity: 'Earth', planetaryRuler: 'Sun', discoveryYear: '1971' },
  { name: 'Kibali Gold Trench', location: 'Haut-Uélé', country: 'DR Congo', continent: 'Africa', lat: 3.1333, lng: 29.5833, depthMeters: 750, depthCategory: 'Subterranean Shaft', primaryMineral: 'Gold', secondaryMinerals: ['Silver'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '2013' },
  { name: 'Loulo-Gounkoto Gold Complex', location: 'Kéniéba', country: 'Mali', continent: 'Africa', lat: 13.0000, lng: -11.3833, depthMeters: 680, depthCategory: 'Subterranean Shaft', primaryMineral: 'Gold', secondaryMinerals: ['Tourmaline'], mineralCategory: 'Precious Metals', elementalAffinity: 'Earth', planetaryRuler: 'Sun', discoveryYear: '2005' },
  { name: 'Sukari Gold Mine of the Pharaohs', location: 'Red Sea', country: 'Egypt', continent: 'Africa', lat: 24.9458, lng: 34.7153, depthMeters: 550, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold', secondaryMinerals: ['Quartz', 'Galena'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: 'Ancient (~3000 BC)' },

  // --- EURASIA & ASIA ---
  { name: 'Oyu Tolgoi Gobi Mega-Bore', location: 'Omnogovi', country: 'Mongolia', continent: 'Asia', lat: 43.0117, lng: 106.8483, depthMeters: 1300, depthCategory: 'Subterranean Shaft', primaryMineral: 'Copper / Gold', secondaryMinerals: ['Silver', 'Molybdenum'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Air', planetaryRuler: 'Mars', discoveryYear: '2001' },
  { name: 'Muruntau Gold Open-Pit', location: 'Qizilqum Desert', country: 'Uzbekistan', continent: 'Asia', lat: 41.4967, lng: 64.5708, depthMeters: 600, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold', secondaryMinerals: ['Silver', 'Tungsten'], mineralCategory: 'Precious Metals', elementalAffinity: 'Earth', planetaryRuler: 'Sun', discoveryYear: '1967' },
  { name: 'Mirny Diamond Kimberlite Abyss', location: 'Sakha (Yakutia)', country: 'Russia', continent: 'Asia', lat: 62.5283, lng: 113.9917, depthMeters: 525, depthCategory: 'Arctic Permafrost', primaryMineral: 'Diamond', secondaryMinerals: ['Kimberlite', 'Spinel'], mineralCategory: 'Noble Gems', elementalAffinity: 'Water', planetaryRuler: 'Saturn', discoveryYear: '1957' },
  { name: 'Udachnaya Diamond Pipe', location: 'Sakha (Yakutia)', country: 'Russia', continent: 'Asia', lat: 66.4333, lng: 112.3167, depthMeters: 640, depthCategory: 'Arctic Permafrost', primaryMineral: 'Diamond', secondaryMinerals: ['Chromite'], mineralCategory: 'Noble Gems', elementalAffinity: 'Water', planetaryRuler: 'Moon', discoveryYear: '1955' },
  { name: 'Norilsk-Talnakh Nickel-Palladium', location: 'Krasnoyarsk Krai', country: 'Russia', continent: 'Asia', lat: 69.3486, lng: 88.2017, depthMeters: 1200, depthCategory: 'Arctic Permafrost', primaryMineral: 'Palladium / Nickel', secondaryMinerals: ['Platinum', 'Copper'], mineralCategory: 'Precious Metals', elementalAffinity: 'Water', planetaryRuler: 'Pluto', discoveryYear: '1935' },
  { name: 'Bayan Obo Rare Earth Bastion', location: 'Inner Mongolia', country: 'China', continent: 'Asia', lat: 41.7778, lng: 109.9667, depthMeters: 420, depthCategory: 'Surface Open-Pit', primaryMineral: 'Rare Earth Oxides (Neodymium, Europium)', secondaryMinerals: ['Iron Ore', 'Niobium'], mineralCategory: 'Rare Earths & Magnetics', elementalAffinity: 'Aether/Void', planetaryRuler: 'Uranus', discoveryYear: '1927' },
  { name: 'Zijinshan Copper-Gold Crest', location: 'Fujian', country: 'China', continent: 'Asia', lat: 25.1833, lng: 116.4000, depthMeters: 580, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold / Copper', secondaryMinerals: ['Alunite'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '1992' },
  { name: 'Mogok Ruby & Sapphire Valley', location: 'Mandalay', country: 'Myanmar', continent: 'Asia', lat: 22.9167, lng: 96.5000, depthMeters: 280, depthCategory: 'Subterranean Shaft', primaryMineral: 'Pigeon Blood Ruby', secondaryMinerals: ['Sapphire', 'Spinel', 'Peridot'], mineralCategory: 'Noble Gems', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '6th Century' },
  { name: 'Hpakant Jadeite Imperial Vein', location: 'Kachin State', country: 'Myanmar', continent: 'Asia', lat: 25.6167, lng: 96.3167, depthMeters: 320, depthCategory: 'Surface Open-Pit', primaryMineral: 'Imperial Jadeite', secondaryMinerals: ['Albite', 'Serpentine'], mineralCategory: 'Noble Gems', elementalAffinity: 'Earth', planetaryRuler: 'Venus', discoveryYear: '13th Century' },
  { name: 'Kolar Gold Fields (KGF)', location: 'Karnataka', country: 'India', continent: 'Asia', lat: 12.9592, lng: 78.2717, depthMeters: 3200, depthCategory: 'Ultra-Deep Abyss', primaryMineral: 'Gold', secondaryMinerals: ['Quartz', 'Scheelite'], mineralCategory: 'Precious Metals', elementalAffinity: 'Earth', planetaryRuler: 'Saturn', discoveryYear: 'Ancient (~2nd Century)' },
  { name: 'Sarcheshmeh Porphyry Copper', location: 'Kerman', country: 'Iran', continent: 'Asia', lat: 29.9481, lng: 55.8714, depthMeters: 500, depthCategory: 'Surface Open-Pit', primaryMineral: 'Copper', secondaryMinerals: ['Molybdenum', 'Gold'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Earth', planetaryRuler: 'Venus', discoveryYear: '1974' },
  { name: 'Kelian Gold Equatorial Pit', location: 'East Kalimantan', country: 'Indonesia', continent: 'Asia', lat: -0.0167, lng: 115.8333, depthMeters: 380, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold / Electrum', secondaryMinerals: ['Silver', 'Pyrite'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '1992' },
  { name: 'Inkai Uranium In-Situ Seam', location: 'Turkistan', country: 'Kazakhstan', continent: 'Asia', lat: 45.2833, lng: 67.5167, depthMeters: 450, depthCategory: 'Subterranean Shaft', primaryMineral: 'Uranium', secondaryMinerals: ['Vanadium', 'Scandium'], mineralCategory: 'Atomic & Radiance', elementalAffinity: 'Water', planetaryRuler: 'Uranus', discoveryYear: '2001' },
  { name: 'Zhaoyuan Gold Cradle', location: 'Shandong', country: 'China', continent: 'Asia', lat: 37.3600, lng: 120.4000, depthMeters: 1400, depthCategory: 'Subterranean Shaft', primaryMineral: 'Gold', secondaryMinerals: ['Tellurium', 'Pyrite'], mineralCategory: 'Precious Metals', elementalAffinity: 'Earth', planetaryRuler: 'Sun', discoveryYear: '1007 AD' },
  { name: 'Batu Hijau Copper-Gold Caldera', location: 'Sumbawa', country: 'Indonesia', continent: 'Asia', lat: -8.9667, lng: 116.8667, depthMeters: 700, depthCategory: 'Surface Open-Pit', primaryMineral: 'Copper', secondaryMinerals: ['Gold', 'Silver'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Water', planetaryRuler: 'Venus', discoveryYear: '1990' },
  { name: 'Panna Diamond Kimberlite Crater', location: 'Madhya Pradesh', country: 'India', continent: 'Asia', lat: 24.7167, lng: 80.2000, depthMeters: 250, depthCategory: 'Surface Open-Pit', primaryMineral: 'Diamond', secondaryMinerals: ['Kimberlite', 'Calcite'], mineralCategory: 'Noble Gems', elementalAffinity: 'Earth', planetaryRuler: 'Jupiter', discoveryYear: '16th Century' },

  // --- AUSTRALIA & OCEANIA ---
  { name: 'Olympic Dam Mega-Seam', location: 'South Australia', country: 'Australia', continent: 'Oceania', lat: -30.4397, lng: 136.8856, depthMeters: 800, depthCategory: 'Subterranean Shaft', primaryMineral: 'Uranium / Copper', secondaryMinerals: ['Gold', 'Silver', 'Rare Earths'], mineralCategory: 'Atomic & Radiance', elementalAffinity: 'Fire', planetaryRuler: 'Uranus', discoveryYear: '1975' },
  { name: 'Super Pit Kalgoorlie Gold Void', location: 'Western Australia', country: 'Australia', continent: 'Oceania', lat: -30.7747, lng: 121.5036, depthMeters: 600, depthCategory: 'Surface Open-Pit', primaryMineral: 'Gold', secondaryMinerals: ['Telluride', 'Pyrite'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '1893' },
  { name: 'Mount Whaleback Iron Monolith', location: 'Newman, WA', country: 'Australia', continent: 'Oceania', lat: -23.3606, lng: 119.6706, depthMeters: 500, depthCategory: 'Surface Open-Pit', primaryMineral: 'Hematite Iron Ore', secondaryMinerals: ['Goethite'], mineralCategory: 'Structural & Ferrous', elementalAffinity: 'Earth', planetaryRuler: 'Mars', discoveryYear: '1968' },
  { name: 'Greenbushes Lithium Pegmatite', location: 'Western Australia', country: 'Australia', continent: 'Oceania', lat: -33.8639, lng: 116.0125, depthMeters: 380, depthCategory: 'Surface Open-Pit', primaryMineral: 'Spodumene Lithium', secondaryMinerals: ['Tantalum', 'Tin'], mineralCategory: 'Battery & Modern Flux', elementalAffinity: 'Earth', planetaryRuler: 'Mercury', discoveryYear: '1888' },
  { name: 'Argyle Pink Diamond Pipe', location: 'East Kimberley', country: 'Australia', continent: 'Oceania', lat: -16.7167, lng: 128.4000, depthMeters: 450, depthCategory: 'Subterranean Shaft', primaryMineral: 'Pink & Violet Diamond', secondaryMinerals: ['Lamproite'], mineralCategory: 'Noble Gems', elementalAffinity: 'Fire', planetaryRuler: 'Venus', discoveryYear: '1979' },
  { name: 'Coober Pedy Opal Labyrinths', location: 'South Australia', country: 'Australia', continent: 'Oceania', lat: -29.0139, lng: 134.7544, depthMeters: 30, depthCategory: 'Ancient Hydraulic Quarry', primaryMineral: 'Precious White Opal', secondaryMinerals: ['Silica', 'Gypsum'], mineralCategory: 'Noble Gems', elementalAffinity: 'Water', planetaryRuler: 'Moon', discoveryYear: '1915' },
  { name: 'Lightning Ridge Black Opal Vault', location: 'New South Wales', country: 'Australia', continent: 'Oceania', lat: -29.4267, lng: 147.9786, depthMeters: 25, depthCategory: 'Subterranean Shaft', primaryMineral: 'Black Opal', secondaryMinerals: ['Potch', 'Nodular Silica'], mineralCategory: 'Noble Gems', elementalAffinity: 'Aether/Void', planetaryRuler: 'Pluto', discoveryYear: '1902' },
  { name: 'Lihir Island Geothermal Gold Caldera', location: 'New Ireland', country: 'Papua New Guinea', continent: 'Oceania', lat: -3.1250, lng: 152.6333, depthMeters: 350, depthCategory: 'Hydrothermal/Volcanic', primaryMineral: 'Gold', secondaryMinerals: ['Pyrite', 'Sulfur'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '1982' },

  // --- EUROPE ---
  { name: 'Kiruna Underground Magnetite Giant', location: 'Lapland', country: 'Sweden', continent: 'Europe', lat: 67.8558, lng: 20.2253, depthMeters: 1365, depthCategory: 'Subterranean Shaft', primaryMineral: 'Magnetite (Iron Ore)', secondaryMinerals: ['Apatite', 'Rare Earths'], mineralCategory: 'Structural & Ferrous', elementalAffinity: 'Earth', planetaryRuler: 'Mars', discoveryYear: '1898' },
  { name: 'Rio Tinto Pyrite Birthplace', location: 'Andalusia', country: 'Spain', continent: 'Europe', lat: 37.6972, lng: -6.5944, depthMeters: 350, depthCategory: 'Ancient Hydraulic Quarry', primaryMineral: 'Pyrite & Copper', secondaryMinerals: ['Gold', 'Silver', 'Iron'], mineralCategory: 'Alchemical & Vaporous', elementalAffinity: 'Water', planetaryRuler: 'Mars', discoveryYear: 'Ancient (~3000 BC Tartessos)' },
  { name: 'Almadén Quicksilver Crucible', location: 'Castile-La Mancha', country: 'Spain', continent: 'Europe', lat: 38.7758, lng: -4.8406, depthMeters: 700, depthCategory: 'Subterranean Shaft', primaryMineral: 'Cinnabar (Mercury)', secondaryMinerals: ['Pyrite', 'Native Mercury'], mineralCategory: 'Alchemical & Vaporous', elementalAffinity: 'Water', planetaryRuler: 'Mercury', discoveryYear: 'Ancient Roman (~400 BC)' },
  { name: 'Idrija Mercury Vaults', location: 'Goriška', country: 'Slovenia', continent: 'Europe', lat: 45.9986, lng: 14.0261, depthMeters: 400, depthCategory: 'Subterranean Shaft', primaryMineral: 'Native Mercury & Cinnabar', secondaryMinerals: ['Dolomite'], mineralCategory: 'Alchemical & Vaporous', elementalAffinity: 'Water', planetaryRuler: 'Mercury', discoveryYear: '1490' },
  { name: 'Rammelsberg 1000-Year Poly-Ore', location: 'Lower Saxony', country: 'Germany', continent: 'Europe', lat: 51.8708, lng: 10.4208, depthMeters: 500, depthCategory: 'Subterranean Shaft', primaryMineral: 'Lead / Zinc / Silver', secondaryMinerals: ['Copper', 'Gold'], mineralCategory: 'Structural & Ferrous', elementalAffinity: 'Earth', planetaryRuler: 'Saturn', discoveryYear: '968 AD' },
  { name: 'Kevitsa Nickel-Copper-PGE', location: 'Sodankylä', country: 'Finland', continent: 'Europe', lat: 67.6833, lng: 26.9667, depthMeters: 550, depthCategory: 'Arctic Permafrost', primaryMineral: 'Nickel / Platinum', secondaryMinerals: ['Cobalt', 'Gold'], mineralCategory: 'Precious Metals', elementalAffinity: 'Water', planetaryRuler: 'Saturn', discoveryYear: '2012' },
  { name: 'Kittilä Suurikuusikko Gold Bore', location: 'Lapland', country: 'Finland', continent: 'Europe', lat: 67.9167, lng: 25.4167, depthMeters: 1000, depthCategory: 'Arctic Permafrost', primaryMineral: 'Gold', secondaryMinerals: ['Arsenopyrite'], mineralCategory: 'Precious Metals', elementalAffinity: 'Fire', planetaryRuler: 'Sun', discoveryYear: '2008' },
  { name: 'Rosia Montana Roman Gold Gallery', location: 'Alba County', country: 'Romania', continent: 'Europe', lat: 46.3056, lng: 23.1319, depthMeters: 450, depthCategory: 'Ancient Hydraulic Quarry', primaryMineral: 'Gold & Silver', secondaryMinerals: ['Tellurium', 'Rhodochrosite'], mineralCategory: 'Precious Metals', elementalAffinity: 'Earth', planetaryRuler: 'Sun', discoveryYear: 'Ancient Roman (106 AD)' },
  { name: 'Real de Catorce Mountain Seam', location: 'San Luis Potosí', country: 'Mexico', continent: 'North America', lat: 23.6917, lng: -100.8889, depthMeters: 800, depthCategory: 'Subterranean Shaft', primaryMineral: 'Silver', secondaryMinerals: ['Lead'], mineralCategory: 'Precious Metals', elementalAffinity: 'Air', planetaryRuler: 'Moon', discoveryYear: '1772' },
  { name: 'Shattuck-Arizona Malachite Vug', location: 'Bisbee, Arizona', country: 'United States', continent: 'North America', lat: 31.4481, lng: -109.9283, depthMeters: 400, depthCategory: 'Subterranean Shaft', primaryMineral: 'Azurite & Malachite', secondaryMinerals: ['Cuprite', 'Turquoise'], mineralCategory: 'Noble Gems', elementalAffinity: 'Water', planetaryRuler: 'Venus', discoveryYear: '1904' },
  { name: 'Sleeping Beauty Turquoise Lode', location: 'Globe, Arizona', country: 'United States', continent: 'North America', lat: 33.4739, lng: -110.8756, depthMeters: 200, depthCategory: 'Surface Open-Pit', primaryMineral: 'Robins Egg Turquoise', secondaryMinerals: ['Copper', 'Pyrite'], mineralCategory: 'Noble Gems', elementalAffinity: 'Water', planetaryRuler: 'Venus', discoveryYear: '1920' },
  { name: 'Herja Antimony & Stibnite Grottos', location: 'Maramureș', country: 'Romania', continent: 'Europe', lat: 47.6667, lng: 23.6333, depthMeters: 520, depthCategory: 'Subterranean Shaft', primaryMineral: 'Stibnite Needle Clusters', secondaryMinerals: ['Plumosite', 'Calcite'], mineralCategory: 'Alchemical & Vaporous', elementalAffinity: 'Fire', planetaryRuler: 'Pluto', discoveryYear: '1850' },
  { name: 'Tsumeb Polymetallic Mineral Eden', location: 'Oshikoto', country: 'Namibia', continent: 'Africa', lat: -19.2333, lng: 17.7167, depthMeters: 1600, depthCategory: 'Subterranean Shaft', primaryMineral: 'Azurite / Dioptase / Smithsonite (300+ species)', secondaryMinerals: ['Germanite', 'Tsumebite'], mineralCategory: 'Noble Gems', elementalAffinity: 'Aether/Void', planetaryRuler: 'Mercury', discoveryYear: '1907' },
];

// Algorithmic expansion generator to synthesize 2,500+ world mines
// covering every coordinate grid, mineral deposit type, and geological province.

const MINERAL_CATEGORIES: MineralCategory[] = [
  'Precious Metals',
  'Noble Gems',
  'Battery & Modern Flux',
  'Chthonic Salts',
  'Alchemical & Vaporous',
  'Structural & Ferrous',
  'Atomic & Radiance',
  'Rare Earths & Magnetics',
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

const GODDESS_NAMES = [
  'Aurata', 'Cuprina', 'Argentia', 'Sedna', 'Pele', 'Gaia', 'Hydrargyra', 'Plutonia',
  'Halita', 'Smaragda', 'Sapphira', 'Cobaltina', 'Lithia', 'Urania', 'Titaness Rhea',
  'Ferrona', 'Opalina', 'Neodymia', 'Telluria', 'Cinnabara', 'Electra', 'Pyritia',
  'Bismuthia', 'Stibnia', 'Galena Regina', 'Alabastra', 'Obsidiana', 'Vismunda',
];

const COMMODITY_COLORS: Record<string, string> = {
  Gold: '#FFD700',
  Silver: '#E0E7FF',
  Copper: '#B87333',
  Diamond: '#38BDF8',
  Lithium: '#A7F3D0',
  Cobalt: '#3B82F6',
  Uranium: '#22C55E',
  Ruby: '#F43F5E',
  Emerald: '#10B981',
  Sapphire: '#6366F1',
  Opal: '#F472B6',
  'Iron Ore': '#EA580C',
  Mercury: '#E2E8F0',
  'Rare Earths': '#C084FC',
  default: '#F59E0B',
};

// Generates an array of 2,500+ world mines
export function generateExpandedWorldMines(targetCount = 2500): WorldMine[] {
  const result: WorldMine[] = [...WORLD_MINES];
  const existingIds = new Set(result.map((m) => m.id));

  // Add the base seeds first
  GLOBAL_DEPOSIT_SEEDS.forEach((seed, idx) => {
    const id = `seed_${idx}_${seed.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    if (!existingIds.has(id)) {
      const gName = GODDESS_NAMES[idx % GODDESS_NAMES.length];
      const sil = SILHOUETTES[idx % SILHOUETTES.length];
      const color = COMMODITY_COLORS[seed.primaryMineral.split(' ')[0]] || COMMODITY_COLORS.default;

      result.push({
        id,
        name: seed.name,
        location: seed.location,
        country: seed.country,
        continent: seed.continent,
        lat: seed.lat,
        lng: seed.lng,
        depthMeters: seed.depthMeters,
        depthCategory: seed.depthCategory,
        primaryMineral: seed.primaryMineral,
        secondaryMinerals: seed.secondaryMinerals,
        mineralCategory: seed.mineralCategory,
        elementalAffinity: seed.elementalAffinity,
        planetaryRuler: seed.planetaryRuler,
        arcanaArchetype: `The ${seed.primaryMineral} Crucible of ${seed.country}`,
        feminineArchetype: `${gName} of ${seed.location}`,
        cartoucheTitle: `OPVS TERRESTRE — ${seed.name.toUpperCase()}`,
        cartographicSilhouetteType: sil,
        cartographicFigure: `In antique cartographic stratigraphy, the excavation contours of ${seed.name} outline the anatomical spirit of ${gName}. Her subterranean mantle holds veins of ${seed.primaryMineral} at -${seed.depthMeters}m depth.`,
        uprightMeaning: `High conductivity and unyielding manifestation through the earthy resonance of ${seed.primaryMineral}.`,
        invertedMeaning: `Friction within the subterranean strata, over-extraction, or blocked hydrothermal flow.`,
        mantleMessage: `Deep beneath ${seed.location}, the living earth whispers: what is mined with reverence endures.`,
        historicalContext: `Major mineral deposit in ${seed.country}, operating at a depth of ${seed.depthMeters} meters.`,
        chthonicKeyword: seed.primaryMineral.toUpperCase().slice(0, 10),
        mineralColor: color,
        discoveryYear: seed.discoveryYear || '19th Century',
      });
      existingIds.add(id);
    }
  });

  // Global regional geological provinces to synthesize the remaining to hit 5,000+ mines
  const REGIONS = [
    { country: 'Australia', continent: 'Oceania' as const, lat: -25.0, lng: 133.0, latSpan: 18, lngSpan: 24, districts: ['Pilbara Craton', 'Yilgarn Block', 'Gawler Craton', 'Bowen Basin', 'Kimberley Basin', 'Mount Isa Inlier'], minerals: ['Gold', 'Iron Ore', 'Lithium', 'Nickel', 'Opal', 'Bauxite', 'Copper', 'Rare Earths', 'Diamond'] },
    { country: 'United States', continent: 'North America' as const, lat: 39.0, lng: -105.0, latSpan: 16, lngSpan: 30, districts: ['Carlin Trend', 'Copper Corridor', 'Appalachian Seams', 'Black Hills', 'San Juan Caldera', 'Keweenaw Peninsula'], minerals: ['Gold', 'Copper', 'Silver', 'Molybdenum', 'Lithium', 'Uranium', 'Bentonite', 'Turquoise'] },
    { country: 'Canada', continent: 'North America' as const, lat: 56.0, lng: -106.0, latSpan: 18, lngSpan: 35, districts: ['Abitibi Greenstone', 'Athabasca Basin', 'Slave Craton', 'Sudbury Basin', 'Labrador Trough'], minerals: ['Diamond', 'Gold', 'Nickel', 'Uranium', 'Potash', 'Copper', 'Zinc', 'Cobalt'] },
    { country: 'Chile', continent: 'South America' as const, lat: -28.0, lng: -70.0, latSpan: 20, lngSpan: 5, districts: ['Atacama Trench', 'Domeykos Range', 'Central Valley Porphyries', 'El Indio Belt'], minerals: ['Copper', 'Lithium', 'Molybdenum', 'Silver', 'Iodine', 'Gold'] },
    { country: 'Peru', continent: 'South America' as const, lat: -10.0, lng: -76.0, latSpan: 12, lngSpan: 8, districts: ['Cordillera Blanca', 'Yanacocha Province', 'Cerro de Pasco Horst', 'Southern Porphyry Belt'], minerals: ['Silver', 'Copper', 'Zinc', 'Lead', 'Gold', 'Tin'] },
    { country: 'South Africa', continent: 'Africa' as const, lat: -29.0, lng: 24.0, latSpan: 8, lngSpan: 10, districts: ['Witwatersrand Basin', 'Bushveld Igneous Complex', 'Barberton Greenstone', 'Kalahari Manganese Field'], minerals: ['Platinum', 'Gold', 'Diamond', 'Chromium', 'Manganese', 'Vanadium'] },
    { country: 'DR Congo', continent: 'Africa' as const, lat: -6.0, lng: 23.0, latSpan: 10, lngSpan: 12, districts: ['Katanga Copperbelt', 'Kibara Belt', 'Kasai Craton', 'Kivu Pegmatite Field'], minerals: ['Cobalt', 'Copper', 'Coltan / Tantalum', 'Tin', 'Gold', 'Diamond'] },
    { country: 'China', continent: 'Asia' as const, lat: 35.0, lng: 105.0, latSpan: 18, lngSpan: 28, districts: ['Jiaodong Peninsula', 'Nanling Metallogenic Belt', 'Tarim Basin', 'Yulong Porphyry Seam', 'Qilian Orogen'], minerals: ['Rare Earths', 'Gold', 'Coal / Anthracite', 'Tungsten', 'Antimony', 'Lithium', 'Graphite'] },
    { country: 'Russia & Siberia', continent: 'Asia' as const, lat: 60.0, lng: 95.0, latSpan: 20, lngSpan: 60, districts: ['Kola Peninsula', 'Ural Fold Belt', 'Siberian Traps', 'Yakutian Diamond Fields', 'Kolyma Gold Belt'], minerals: ['Diamond', 'Palladium', 'Platinum', 'Nickel', 'Gold', 'Potash', 'Iron Ore'] },
    { country: 'Brazil', continent: 'South America' as const, lat: -14.0, lng: -52.0, latSpan: 20, lngSpan: 20, districts: ['Quadrilátero Ferrífero', 'Carajás Mineral Province', 'Borborema Province', 'Minas Gerais Pegmatites'], minerals: ['Iron Ore', 'Emerald', 'Niobium', 'Bauxite', 'Gold', 'Manganese', 'Topaz'] },
    { country: 'Mexico', continent: 'North America' as const, lat: 23.0, lng: -102.0, latSpan: 10, lngSpan: 15, districts: ['Sierra Madre Occidental', 'Fresnillo Silver Trend', 'Sonora Porphyry Belt', 'Guanajuato Seam'], minerals: ['Silver', 'Gold', 'Copper', 'Zinc', 'Lead', 'Fluorite'] },
    { country: 'Indonesia', continent: 'Asia' as const, lat: -2.0, lng: 118.0, latSpan: 8, lngSpan: 22, districts: ['Papuan Orogen', 'Halmahera Ultramafic Belt', 'Sulawesi Ophiolites', 'Sumatran Magmatic Arc'], minerals: ['Nickel', 'Gold', 'Copper', 'Tin', 'Bauxite'] },
    { country: 'Kazakhstan', continent: 'Asia' as const, lat: 48.0, lng: 67.0, latSpan: 10, lngSpan: 20, districts: ['Chu-Sarysu Basin', 'Rudny Altai', 'Karatau Phosphorite Belt', 'Kempirsai Massif'], minerals: ['Uranium', 'Chromium', 'Copper', 'Zinc', 'Gold'] },
    { country: 'Sweden & Finland', continent: 'Europe' as const, lat: 64.0, lng: 22.0, latSpan: 8, lngSpan: 8, districts: ['Bergslagen', 'Norrbotten Iron Field', 'Central Lapland Greenstone Belt', 'Outokumpu Ore Belt'], minerals: ['Iron Ore', 'Nickel', 'Cobalt', 'Gold', 'Zinc', 'Copper'] },
    { country: 'Spain & Portugal', continent: 'Europe' as const, lat: 39.0, lng: -6.0, latSpan: 6, lngSpan: 6, districts: ['Iberian Pyrite Belt', 'Central Iberian Zone', 'Ossa-Morena Zone'], minerals: ['Copper', 'Tungsten', 'Lithium', 'Mercury', 'Pyrite', 'Tin'] },
    { country: 'Ghana & Mali', continent: 'Africa' as const, lat: 10.0, lng: -4.0, latSpan: 10, lngSpan: 12, districts: ['Ashanti Gold Belt', 'Birimian Terrane', 'Kenieba Inlier'], minerals: ['Gold', 'Manganese', 'Bauxite', 'Diamond'] },
    { country: 'India', continent: 'Asia' as const, lat: 21.0, lng: 78.0, latSpan: 14, lngSpan: 14, districts: ['Dharwar Craton', 'Singhbhum Copper Belt', 'Aravalli Range', 'Zawar Lead-Zinc Mines'], minerals: ['Iron Ore', 'Bauxite', 'Zinc', 'Gold', 'Mica', 'Coal'] },
    { country: 'Germany & Poland', continent: 'Europe' as const, lat: 51.5, lng: 16.0, latSpan: 5, lngSpan: 10, districts: ['Kupferschiefer Basin', 'Harz Mountains', 'Erzgebirge Ore Mountains', 'Silesian Coal Basin'], minerals: ['Halite Salt', 'Copper', 'Lignite', 'Zinc', 'Silver', 'Potash'] },
    { country: 'Japan & East Pacific', continent: 'Asia' as const, lat: 36.0, lng: 138.0, latSpan: 8, lngSpan: 6, districts: ['H菱刈 (Hishikari) Epithermal Seam', 'Kuroko Volcanogenic Complex', 'Kamioka Zinc Skarn'], minerals: ['Gold', 'Silver', 'Zinc', 'Sulfur', 'Tellurium'] },
    { country: 'Argentina', continent: 'South America' as const, lat: -34.0, lng: -66.0, latSpan: 16, lngSpan: 8, districts: ['Puna Plateau', 'San Juan High Andes', 'Patagonian Gold Arc'], minerals: ['Lithium', 'Silver', 'Copper', 'Gold', 'Borates'] },
    { country: 'Zambia & Zimbabwe', continent: 'Africa' as const, lat: -15.0, lng: 28.0, latSpan: 8, lngSpan: 10, districts: ['Copperbelt Province', 'Great Dyke of Zimbabwe', 'Midlands Gold Belt'], minerals: ['Copper', 'Cobalt', 'Platinum', 'Chromite', 'Emerald'] },
    { country: 'Papua New Guinea & Solomons', continent: 'Oceania' as const, lat: -6.0, lng: 147.0, latSpan: 6, lngSpan: 12, districts: ['Papuan Highlands Arc', 'New Ireland Geothermal Fields', 'Bougainville Calc-Alkaline Belt'], minerals: ['Gold', 'Copper', 'Silver', 'Nickel'] },
    { country: 'Norway & Iceland', continent: 'Europe' as const, lat: 62.0, lng: 10.0, latSpan: 10, lngSpan: 12, districts: ['Kongsberg Silver Seams', 'Røros Copper Belt', 'Reykjanes Geothermal Brines'], minerals: ['Titanium', 'Silver', 'Iron Ore', 'Silica', 'Sulfur'] },
    { country: 'Morocco & Mauritania', continent: 'Africa' as const, lat: 26.0, lng: -9.0, latSpan: 12, lngSpan: 12, districts: ['Anti-Atlas Mountains', 'Bou Azzer Cobalt Seam', 'Kediet Ijill Iron Monolith'], minerals: ['Cobalt', 'Silver', 'Phosphates', 'Iron Ore', 'Fluorite'] },
  ];

  const DEPTH_CATEGORIES: DepthCategory[] = [
    'Surface Open-Pit',
    'Subterranean Shaft',
    'Ultra-Deep Abyss',
    'Sacred Salt Grotto',
    'Hydrothermal/Volcanic',
    'Arctic Permafrost',
    'Ancient Hydraulic Quarry',
  ];

  const ELEMENTAL_AFFINITIES: ElementalAffinity[] = ['Fire', 'Earth', 'Water', 'Air', 'Aether/Void'];
  const PLANETARY_RULERS: PlanetaryRuler[] = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

  let count = result.length;
  let regionIdx = 0;

  while (count < targetCount) {
    const reg = REGIONS[regionIdx % REGIONS.length];
    regionIdx++;

    const district = reg.districts[count % reg.districts.length];
    const mineral = reg.minerals[count % reg.minerals.length];
    const latOffset = (Math.sin(count * 1.7) * (reg.latSpan / 2));
    const lngOffset = (Math.cos(count * 2.3) * (reg.lngSpan / 2));
    const lat = +(reg.lat + latOffset).toFixed(4);
    const lng = +(reg.lng + lngOffset).toFixed(4);

    const depth = 50 + (count * 7) % 3950;
    const depthCategory = DEPTH_CATEGORIES[count % DEPTH_CATEGORIES.length];
    const mineralCategory = MINERAL_CATEGORIES[count % MINERAL_CATEGORIES.length];
    const element = ELEMENTAL_AFFINITIES[count % ELEMENTAL_AFFINITIES.length];
    const planet = PLANETARY_RULERS[count % PLANETARY_RULERS.length];
    const gName = GODDESS_NAMES[count % GODDESS_NAMES.length];
    const sil = SILHOUETTES[count % SILHOUETTES.length];
    const color = COMMODITY_COLORS[mineral] || COMMODITY_COLORS.default;

    const id = `mine_db_${count}_${reg.country.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const name = `${district} ${mineral} Mine N°${((count % 49) + 1)}`;

    result.push({
      id,
      name,
      location: `${district}, Sector ${String.fromCharCode(65 + (count % 26))}-${(count % 99) + 1}`,
      country: reg.country,
      continent: reg.continent,
      lat,
      lng,
      depthMeters: depth,
      depthCategory,
      primaryMineral: mineral,
      secondaryMinerals: ['Quartz', 'Silica', 'Pyrite', 'Calcite'],
      mineralCategory,
      elementalAffinity: element,
      planetaryRuler: planet,
      arcanaArchetype: `The ${mineral} Veil of ${district}`,
      feminineArchetype: `${gName} of ${reg.country}`,
      cartoucheTitle: `MINA ${reg.country.toUpperCase()} — STRATA ${district.toUpperCase()}`,
      cartographicSilhouetteType: sil,
      cartographicFigure: `The subterranean strata of ${name} outline the personified anatomy of ${gName}. Her mineral core pulses with ${mineral} at -${depth}m.`,
      uprightMeaning: `Direct alignment with ${mineral} resonance, materialization of earthly wealth, grounded intuition, and tectonic stability.`,
      invertedMeaning: `Stagnant tectonic flow, over-exhaustion of resources, ungrounded ambition, or haste in excavation.`,
      mantleMessage: `The mantle beneath ${district} anchors the ancient crystalline frequency of ${mineral}.`,
      historicalContext: `Geological deposit cataloged in the ${district} of ${reg.country}, spanning depth of ${depth}m.`,
      chthonicKeyword: mineral.toUpperCase().slice(0, 10),
      mineralColor: color,
      discoveryYear: `${1820 + (count % 200)}`,
    });

    count++;
  }

  return result;
}
