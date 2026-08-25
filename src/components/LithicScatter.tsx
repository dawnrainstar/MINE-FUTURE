import React, { useState } from 'react';
import { WorldMine, CastStone, ElementalAffinity } from '../types';
import { mapCoordsToLatLng, findNearestMine } from '../utils/geo';
import { sound } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Layers,
  Sparkles,
  RefreshCw,
  Compass,
  ArrowRight,
  Flame,
  Waves,
  Mountain,
  Zap,
  BookOpen,
} from 'lucide-react';

interface LithicScatterProps {
  mines: WorldMine[];
  onCommuneWithSpread: (mines: WorldMine[]) => void;
  onOpenMineModal: (mine: WorldMine) => void;
}

const AVAILABLE_STONES = [
  { id: 'fluorite', name: 'Violet Fluorite', color: '#a855f7', element: 'Air' as ElementalAffinity },
  { id: 'pyrite', name: 'Golden Pyrite', color: '#eab308', element: 'Fire' as ElementalAffinity },
  { id: 'malachite', name: 'Banded Malachite', color: '#10b981', element: 'Earth' as ElementalAffinity },
  { id: 'selenite', name: 'Luminous Selenite', color: '#38bdf8', element: 'Water' as ElementalAffinity },
  { id: 'obsidian', name: 'Volcanic Obsidian', color: '#64748b', element: 'Fire' as ElementalAffinity },
  { id: 'cinnabar', name: 'Crimson Cinnabar', color: '#f43f5e', element: 'Water' as ElementalAffinity },
  { id: 'lodestone', name: 'Magnetic Lodestone', color: '#94a3b8', element: 'Earth' as ElementalAffinity },
];

export const LithicScatter: React.FC<LithicScatterProps> = ({
  mines,
  onCommuneWithSpread,
  onOpenMineModal,
}) => {
  const [castStones, setCastStones] = useState<CastStone[]>([]);
  const [isCasting, setIsCasting] = useState<boolean>(false);
  const [hasCast, setHasCast] = useState<boolean>(false);

  const handleCastStones = () => {
    sound.playSeismicStrike();
    setIsCasting(true);

    setTimeout(() => {
      // Choose 4 to 6 random stones from available
      const shuffledStones = [...AVAILABLE_STONES].sort(() => Math.random() - 0.5);
      const selected = shuffledStones.slice(0, Math.floor(Math.random() * 2) + 4);

      const casted: CastStone[] = selected.map((s) => {
        // Random map position favoring central populated latitudes
        const x = 0.15 + Math.random() * 0.7;
        const y = 0.2 + Math.random() * 0.6;
        const { lat, lng } = mapCoordsToLatLng(x, y);
        const { mine, distanceKm } = findNearestMine(lat, lng, mines);

        return {
          id: `${s.id}-${Date.now()}`,
          name: s.name,
          color: s.color,
          element: s.element,
          x,
          y,
          nearestMine: mine,
          distanceKm: Math.round(distanceKm),
        };
      });

      setCastStones(casted);
      setIsCasting(false);
      setHasCast(true);
      sound.playChime();

      try {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#d97706'],
        });
      } catch (e) {}
    }, 900);
  };

  const handleCommuneAll = () => {
    const matchedMines = castStones.map((cs) => cs.nearestMine);
    onCommuneWithSpread(matchedMines);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-serif mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Lithomancy & Planetary Triangulation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mb-2">
          The Lithic Scatter
        </h1>
        <p className="text-sm sm:text-base text-stone-400 font-serif leading-relaxed">
          Cast raw mineral stones upon the geodetic plate. Where they land, their magnetic field
          triangulates with the closest subterranean mine in our global catalog of {mines.length.toLocaleString()} locations.
        </p>
      </div>

      {/* Main Casting Board & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Casting Canvas */}
        <div className="lg:col-span-7 bg-stone-950/90 border border-amber-950/70 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]">
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Canvas Top Bar */}
          <div className="flex items-center justify-between text-xs font-serif text-stone-400 mb-4 z-10">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
              Tectonic Scatter Surface
            </span>
            <span className="font-mono text-stone-500 text-[11px]">
              Active Seam: {mines.length.toLocaleString()} Mines
            </span>
          </div>

          {/* The Plate Surface */}
          <div className="relative flex-1 w-full bg-stone-900/40 rounded-2xl border border-stone-800/80 overflow-hidden shadow-inner flex items-center justify-center min-h-[340px]">
            {/* Ambient Concentric Ley Rings */}
            <div className="absolute w-72 h-72 rounded-full border border-amber-500/10 pointer-events-none" />
            <div className="absolute w-48 h-48 rounded-full border border-amber-500/20 pointer-events-none" />
            <div className="absolute w-24 h-24 rounded-full border border-amber-500/30 pointer-events-none" />

            {!hasCast && !isCasting && (
              <div className="text-center p-6 z-10">
                <Compass className="w-12 h-12 text-amber-500/40 mx-auto mb-3 animate-spin-slow" />
                <p className="text-sm font-serif text-stone-300">
                  The casting circle is consecrated and waiting.
                </p>
                <p className="text-xs text-stone-500 font-serif mt-1">
                  Click the button below to cast the mineral stones across the earth.
                </p>
              </div>
            )}

            {isCasting && (
              <div className="text-center p-6 z-10 animate-pulse">
                <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <p className="text-sm font-serif text-amber-300 font-semibold">
                  Tossing stones upon subterranean ley lines...
                </p>
              </div>
            )}

            {/* Rendered Cast Stones on the Plate */}
            {hasCast &&
              !isCasting &&
              castStones.map((cs) => (
                <motion.div
                  key={cs.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  style={{ left: `${cs.x * 100}%`, top: `${cs.y * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  onClick={() => onOpenMineModal(cs.nearestMine)}
                >
                  {/* Glowing Pulse Aura */}
                  <div
                    className="absolute -inset-2 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: cs.color }}
                  />

                  {/* Stone Geometry */}
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-xl flex items-center justify-center transform group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: cs.color }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-stone-950/95 border border-amber-500/50 rounded-xl p-2 shadow-2xl pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    <p className="text-[10px] font-serif font-bold text-amber-300">{cs.name}</p>
                    <p className="text-xs font-serif text-stone-200 mt-0.5">
                      → {cs.nearestMine.name}
                    </p>
                    <p className="text-[10px] text-stone-400 font-mono">
                      {cs.distanceKm} km away
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Cast Action Button */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              onClick={handleCastStones}
              disabled={isCasting}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{hasCast ? 'Recast Lithic Stones' : 'Cast Stones Upon Earth'}</span>
            </button>
          </div>
        </div>

        {/* Right: Triangulation Readings */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-100">
                  Triangulated Subterranean Seams
                </h3>
                <p className="text-xs text-stone-400 font-serif">
                  {hasCast
                    ? `${castStones.length} mines awakened by lithic resonance`
                    : 'Awaiting stone cast...'}
                </p>
              </div>
            </div>

            {hasCast ? (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {castStones.map((cs, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cs.color }}
                      />
                      <div>
                        <p className="text-xs font-serif font-bold text-stone-200 group-hover:text-amber-300 transition-colors">
                          {cs.nearestMine.name}
                        </p>
                        <p className="text-[11px] text-stone-400 font-serif">
                          {cs.nearestMine.country} · {cs.nearestMine.primaryMineral}
                        </p>
                        <p className="text-[10px] text-stone-500 font-mono">
                          {cs.name} ({cs.element}) · {cs.distanceKm} km from impact
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenMineModal(cs.nearestMine)}
                      className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors"
                      title="Inspect Mine"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleCommuneAll}
                  className="w-full mt-4 py-3 rounded-2xl bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 text-amber-300 font-serif font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Commune with All Triangulated Mines in Oracle</span>
                </button>
              </div>
            ) : (
              <div className="p-8 text-center text-stone-500 font-serif text-xs">
                Cast the mineral stones on the left plate to calculate the nearest world mines and
                their alchemical resonance.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
