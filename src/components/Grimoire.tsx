import React, { useState } from 'react';
import { WorldMine } from '../types';
import { MineCard } from './MineCard';
import { sound } from '../utils/audio';
import { generateTitaness } from '../utils/titanessEngine';
import {
  BookOpen,
  Search,
  Filter,
  Layers,
  Sparkles,
  Mountain,
  Compass,
  MapPin,
  Eye,
  Upload,
} from 'lucide-react';

interface GrimoireProps {
  mines: WorldMine[];
  onOpenMineModal: (mine: WorldMine) => void;
  onCommuneWithMine: (mine: WorldMine) => void;
  onOpenUploader: () => void;
}

export const Grimoire: React.FC<GrimoireProps> = ({
  mines,
  onOpenMineModal,
  onCommuneWithMine,
  onOpenUploader,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMineralCategory, setSelectedMineralCategory] = useState<string>('All');
  const [selectedDepthCategory, setSelectedDepthCategory] = useState<string>('All');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  const mineralCategories = [
    'All',
    'Precious Metals',
    'Noble Gems',
    'Battery & Modern Flux',
    'Chthonic Salts',
    'Alchemical & Vaporous',
    'Structural & Ferrous',
    'Atomic & Radiance',
    'Rare Earths & Magnetics',
  ];

  const depthCategories = [
    'All',
    'Surface Open-Pit',
    'Subterranean Shaft',
    'Ultra-Deep Abyss',
    'Sacred Salt Grotto',
    'Hydrothermal/Volcanic',
    'Arctic Permafrost',
    'Ancient Hydraulic Quarry',
  ];

  const continents = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Polar/Antarctica'];

  const filteredMines = mines.filter((mine) => {
    const matchesMineral =
      selectedMineralCategory === 'All' || mine.mineralCategory === selectedMineralCategory;
    const matchesDepth =
      selectedDepthCategory === 'All' || mine.depthCategory === selectedDepthCategory;
    const matchesContinent =
      selectedContinent === 'All' || mine.continent === selectedContinent;
    const q = searchQuery.toLowerCase();
    
    const titaness = mine.titaness || generateTitaness({
      mineral: mine.primaryMineral,
      region: mine.location || mine.country,
      depth: mine.depthMeters,
    });

    const matchesSearch =
      !q ||
      mine.name.toLowerCase().includes(q) ||
      mine.primaryMineral.toLowerCase().includes(q) ||
      mine.feminineArchetype.toLowerCase().includes(q) ||
      mine.chthonicKeyword.toLowerCase().includes(q) ||
      mine.country.toLowerCase().includes(q) ||
      titaness.name.toLowerCase().includes(q) ||
      titaness.archetype.toLowerCase().includes(q) ||
      titaness.rune.toLowerCase().includes(q) ||
      titaness.geomantic.toLowerCase().includes(q) ||
      titaness.tree.toLowerCase().includes(q) ||
      titaness.wound.toLowerCase().includes(q);

    return matchesMineral && matchesDepth && matchesContinent && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-serif mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Subterranean Codex</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mb-2">
          Codex of the World Mines
        </h1>
        <p className="text-sm sm:text-base text-stone-400 font-serif leading-relaxed">
          The complete grimoire of {mines.length.toLocaleString()} planetary excavations. Every mine is personified as a subterranean woman in ancient cartography—bearing the sacred alchemy of gold, lithium, luminous selenite, and deep mantle ores.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 mb-8 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shadow-xl">
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

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
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

          <select
            value={selectedMineralCategory}
            onChange={(e) => setSelectedMineralCategory(e.target.value)}
            className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 font-serif focus:outline-none focus:border-amber-500/60"
          >
            {mineralCategories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Commodities' : c}
              </option>
            ))}
          </select>

          <select
            value={selectedDepthCategory}
            onChange={(e) => setSelectedDepthCategory(e.target.value)}
            className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 font-serif focus:outline-none focus:border-amber-500/60"
          >
            {depthCategories.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Depths' : d}
              </option>
            ))}
          </select>

          <button
            onClick={onOpenUploader}
            className="px-3 py-2 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold flex items-center gap-1.5 hover:bg-amber-900"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* Active Count */}
      <div className="flex items-center justify-between mb-4 text-xs font-serif text-stone-400">
        <span>
          Showing <strong className="text-amber-400">{filteredMines.length.toLocaleString()}</strong> of {mines.length.toLocaleString()} excavations
        </span>
      </div>

      {/* Cards Grid */}
      {filteredMines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMines.slice(0, 120).map((mine) => (
            <div key={mine.id} className="flex flex-col justify-between">
              <MineCard
                mine={mine}
                onSelect={() => onOpenMineModal(mine)}
              />
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => onOpenMineModal(mine)}
                  className="flex-1 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-white text-xs font-serif flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3 h-3 text-stone-400" /> Lore & Map
                </button>
                <button
                  onClick={() => onCommuneWithMine(mine)}
                  className="flex-1 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 text-xs font-serif font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" /> Commune
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-stone-900/40 rounded-3xl border border-stone-800 text-stone-400 font-serif">
          No mines found matching your filters. Try broadening your query.
        </div>
      )}
    </div>
  );
};
