import React, { useState } from 'react';
import { WorldMine } from '../types';
import { WORLD_MINES } from '../data/mines';
import { MineCard } from './MineCard';
import { sound } from '../utils/audio';
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
} from 'lucide-react';

interface GrimoireProps {
  onOpenMineModal: (mine: WorldMine) => void;
  onCommuneWithMine: (mine: WorldMine) => void;
}

export const Grimoire: React.FC<GrimoireProps> = ({ onOpenMineModal, onCommuneWithMine }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMineralCategory, setSelectedMineralCategory] = useState<string>('All');
  const [selectedDepthCategory, setSelectedDepthCategory] = useState<string>('All');

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

  const filteredMines = WORLD_MINES.filter((mine) => {
    const matchesMineral =
      selectedMineralCategory === 'All' || mine.mineralCategory === selectedMineralCategory;
    const matchesDepth =
      selectedDepthCategory === 'All' || mine.depthCategory === selectedDepthCategory;
    const matchesSearch =
      mine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mine.primaryMineral.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mine.feminineArchetype.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mine.chthonicKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mine.country.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMineral && matchesDepth && matchesSearch;
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
          The complete grimoire of 20 planetary excavations. Every mine is personified as a woman
          in ancient cartography—bearing the sacred alchemy of deep gold, luminous selenite, cosmic
          nickel, and volcanic cinnabar.
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
            placeholder="Search by mine, mineral, deity, or arcana keyword..."
            className="w-full bg-stone-950/80 border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/60 font-serif"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedMineralCategory}
            onChange={(e) => setSelectedMineralCategory(e.target.value)}
            className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 font-serif focus:outline-none focus:border-amber-500/60"
          >
            {mineralCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Mineral Families' : cat}
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
                {d === 'All' ? 'All Strata Depths' : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {filteredMines.map((mine) => (
          <div
            key={mine.id}
            className="flex flex-col items-center p-3 rounded-2xl bg-stone-950/50 border border-stone-800/80 hover:border-amber-500/40 transition-colors w-full"
          >
            <MineCard
              mine={mine}
              isUpright={true}
              isRevealed={true}
              size="sm"
              showDetailsModal={() => onOpenMineModal(mine)}
            />

            {/* Quick Action bar beneath card */}
            <div className="w-full mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-xs px-1">
              <button
                onClick={() => onOpenMineModal(mine)}
                className="text-stone-400 hover:text-amber-300 flex items-center gap-1 font-serif transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> Lore & Plate
              </button>
              <button
                onClick={() => onCommuneWithMine(mine)}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-serif font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" /> Commune
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMines.length === 0 && (
        <div className="text-center py-16">
          <Mountain className="w-12 h-12 text-stone-600 mx-auto mb-2" />
          <p className="text-sm font-serif text-stone-400">
            No subterranean mines match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};
