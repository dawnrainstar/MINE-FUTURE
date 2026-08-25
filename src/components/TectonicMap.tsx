import React, { useState } from 'react';
import { WorldMine } from '../types';
import { latLngToMapCoords, TECTONIC_PLATES_PATHS } from '../utils/geo';
import { sound } from '../utils/audio';
import { CartographicFigureSvg } from './CartographicFigureSvg';
import { GoogleTectonicMap } from './GoogleTectonicMap';
import {
  Globe2,
  Compass,
  Layers,
  Sparkles,
  Search,
  Filter,
  Eye,
  Flame,
  Waves,
  Mountain,
  Zap,
  MapPin,
  Maximize2,
  Map as MapIcon,
  Upload,
} from 'lucide-react';

interface TectonicMapProps {
  mines: WorldMine[];
  onSelectMine: (mine: WorldMine) => void;
  onCommuneWithMine: (mine: WorldMine) => void;
  onOpenUploader: () => void;
}

export const TectonicMap: React.FC<TectonicMapProps> = ({
  mines,
  onSelectMine,
  onCommuneWithMine,
  onOpenUploader,
}) => {
  const [mapEngine, setMapEngine] = useState<'google' | 'antique'>('google');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [selectedElement, setSelectedElement] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredMine, setHoveredMine] = useState<WorldMine | null>(null);
  const [activeCartographyMine, setActiveCartographyMine] = useState<WorldMine | null>(
    mines[0] || null
  );
  const [showTectonicPlates, setShowTectonicPlates] = useState<boolean>(true);

  const continents = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Polar/Antarctica'];
  const elements = ['All', 'Fire', 'Earth', 'Water', 'Air', 'Aether/Void'];

  const filteredMines = mines.filter((mine) => {
    const matchesContinent = selectedContinent === 'All' || mine.continent === selectedContinent;
    const matchesElement = selectedElement === 'All' || mine.elementalAffinity === selectedElement;
    const matchesSearch =
      mine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mine.primaryMineral.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mine.feminineArchetype.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mine.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContinent && matchesElement && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Cartographic Intro */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-serif mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Terra Femina: Anthropomorphic Subterranean Atlas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mb-2">
          The Planetary Mining Atlas
        </h1>
        <p className="text-sm sm:text-base text-stone-400 font-serif leading-relaxed">
          Exploring over {mines.length.toLocaleString()} world mines, deep shafts, and mineral deposits across the globe.
          Toggle between satellite views, terrain layers, and antique chthonic projections.
        </p>

        {/* Engine Switcher Bar & Bulk Upload Button */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center p-1 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
            <button
              onClick={() => {
                sound.playMineralClink();
                setMapEngine('google');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-serif flex items-center gap-2 transition-all ${
                mapEngine === 'google'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Google Maps Global Engine ({mines.length.toLocaleString()} Mines)</span>
            </button>
            <button
              onClick={() => {
                sound.playMineralClink();
                setMapEngine('antique');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-serif flex items-center gap-2 transition-all ${
                mapEngine === 'antique'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Antique Geodesic Plate</span>
            </button>
          </div>

          <button
            onClick={onOpenUploader}
            className="px-4 py-2 rounded-2xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-serif text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Thousands of Mines</span>
          </button>
        </div>
      </div>

      {/* Render Google Maps View */}
      {mapEngine === 'google' && (
        <GoogleTectonicMap
          mines={mines}
          onSelectMine={onSelectMine}
          onCommuneWithMine={onCommuneWithMine}
          onOpenUploader={onOpenUploader}
        />
      )}

      {/* Render Antique Canvas View */}
      {mapEngine === 'antique' && (
        <>
          {/* Filter & Search Bar */}
          <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 mb-6 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search across ${mines.length.toLocaleString()} mines...`}
                className="w-full bg-stone-950/80 border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/60 font-serif"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Continents */}
              <select
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
                className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 font-serif focus:outline-none focus:border-amber-500/60"
              >
                {continents.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Continents' : c}
                  </option>
                ))}
              </select>

              {/* Elements */}
              <select
                value={selectedElement}
                onChange={(e) => setSelectedElement(e.target.value)}
                className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 font-serif focus:outline-none focus:border-amber-500/60"
              >
                {elements.map((el) => (
                  <option key={el} value={el}>
                    {el === 'All' ? 'All Elements' : `${el} Affinity`}
                  </option>
                ))}
              </select>

              {/* Tectonic Plate toggle */}
              <button
                onClick={() => setShowTectonicPlates(!showTectonicPlates)}
                className={`px-3 py-2 rounded-xl text-xs font-serif border flex items-center gap-1.5 transition-colors ${
                  showTectonicPlates
                    ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Fault Lines</span>
              </button>
            </div>
          </div>

          {/* Main Grid: Interactive Map Plate (Left) + Cartographic Spirit Inspector (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Antique Map Canvas */}
            <div className="lg:col-span-7 bg-stone-950/90 border border-amber-950/70 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              {/* Map Vignette & Ley Lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#b45309_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
              <div className="absolute inset-2 border border-amber-600/20 rounded-2xl pointer-events-none" />

              {/* Map Top Bar */}
              <div className="flex items-center justify-between z-10 mb-3 text-xs font-serif text-stone-400">
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">
                  Planetary Geodesic Projection
                </span>
                <span className="font-mono text-[11px] text-stone-400">
                  Showing {filteredMines.length.toLocaleString()} Mines
                </span>
              </div>

              {/* Interactive World Map SVG Layer */}
              <div className="relative w-full aspect-[16/10] bg-stone-900/40 rounded-2xl border border-stone-800/80 overflow-hidden shadow-inner flex items-center justify-center">
                {/* Ambient Graticule Grid */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
                  {[15, 30, 45, 60, 75, 90].map((y, idx) => (
                    <line
                      key={'lat' + idx}
                      x1="0%"
                      y1={`${y}%`}
                      x2="100%"
                      y2={`${y}%`}
                      stroke="#d97706"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                    />
                  ))}
                  {[16.6, 33.3, 50, 66.6, 83.3].map((x, idx) => (
                    <line
                      key={'lng' + idx}
                      x1={`${x}%`}
                      y1="0%"
                      x2={`${x}%`}
                      y2="100%"
                      stroke="#d97706"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                    />
                  ))}
                  <line x1="0%" y1="53.5%" x2="100%" y2="53.5%" stroke="#f59e0b" strokeWidth="1" />
                </svg>

                {/* Tectonic Fault Lines */}
                {showTectonicPlates && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {TECTONIC_PLATES_PATHS.map((plate, pIdx) => {
                      const points = plate
                        .map((pt) => {
                          const { x, y } = latLngToMapCoords(pt.lat, pt.lng);
                          return `${x}%,${y}%`;
                        })
                        .join(' ');
                      return (
                        <polyline
                          key={pIdx}
                          points={points}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                          opacity="0.6"
                        />
                      );
                    })}
                  </svg>
                )}

                {/* World Mine Cartographic Nodes */}
                {filteredMines.slice(0, 150).map((mine) => {
                  const { x, y } = latLngToMapCoords(mine.lat, mine.lng);
                  const isSelected = activeCartographyMine?.id === mine.id;
                  const isHovered = hoveredMine?.id === mine.id;

                  return (
                    <div
                      key={mine.id}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                      onClick={() => {
                        sound.playMineralClink();
                        setActiveCartographyMine(mine);
                      }}
                      onMouseEnter={() => setHoveredMine(mine)}
                      onMouseLeave={() => setHoveredMine(null)}
                    >
                      {/* Pulsing Aura */}
                      <div
                        className={`absolute -inset-2 rounded-full blur-sm transition-all duration-300 ${
                          isSelected || isHovered ? 'scale-150 opacity-90' : 'opacity-40 scale-100'
                        }`}
                        style={{ backgroundColor: mine.mineralColor }}
                      />

                      {/* Pin Node */}
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-transform duration-200 ${
                          isSelected
                            ? 'scale-125 border-white shadow-[0_0_15px_#fff]'
                            : 'border-amber-400/80 hover:scale-110'
                        }`}
                        style={{
                          backgroundColor: mine.mineralColor,
                          boxShadow: `0 0 10px ${mine.mineralColor}`,
                        }}
                      >
                        <div className="w-1 h-1 rounded-full bg-stone-950" />
                      </div>

                      {/* Tooltip on Hover */}
                      {(isHovered || isSelected) && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-stone-950/95 border border-amber-500/50 rounded-xl p-2.5 shadow-2xl pointer-events-none z-30 text-center backdrop-blur-md">
                          <p className="text-[9px] font-serif uppercase tracking-wider text-amber-400 font-bold">
                            {mine.feminineArchetype}
                          </p>
                          <p className="text-xs font-serif font-bold text-stone-100">{mine.name}</p>
                          <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                            {mine.primaryMineral} · -{mine.depthMeters}m
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Map Compass Rose & Coordinates Bar */}
              <div className="mt-4 flex items-center justify-between text-xs text-stone-400 font-serif pt-2 border-t border-stone-800/80">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-500 animate-spin-slow" />
                  <span>Equirectangular Chthonic Grid</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Tectonic Rift
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Mine Aperture
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Cartographic Feminine Spirit Inspector */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {activeCartographyMine ? (
                <div className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-stone-800">
                    <div>
                      <span className="text-[10px] font-serif uppercase tracking-widest text-amber-400 font-bold block">
                        Personified Cartography
                      </span>
                      <h3 className="text-xl font-serif font-bold text-stone-100">
                        {activeCartographyMine.name}
                      </h3>
                      <p className="text-xs text-stone-400 font-mono">
                        {activeCartographyMine.location}, {activeCartographyMine.country}
                      </p>
                    </div>
                    <button
                      onClick={() => onSelectMine(activeCartographyMine)}
                      className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 hover:text-white transition-colors"
                      title="Open Full Lore Modal"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-2">
                    <CartographicFigureSvg mine={activeCartographyMine} />
                  </div>

                  <div className="mt-4 flex items-center gap-3 pt-3 border-t border-stone-800">
                    <button
                      onClick={() => onSelectMine(activeCartographyMine)}
                      className="flex-1 py-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-white text-xs font-serif flex items-center justify-center gap-2 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Full Lore
                    </button>
                    <button
                      onClick={() => onCommuneWithMine(activeCartographyMine)}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Commune in Oracle
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
