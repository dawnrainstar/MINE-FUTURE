import React, { useState } from 'react';
import { WorldMine, CastStone, ElementalAffinity } from '../types';
import { WORLD_MINES } from '../data/mines';
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
        const { mine, distanceKm } = findNearestMine(lat, lng, WORLD_MINES);

        return {
          ...s,
          x,
          y,
          nearestMine: mine,
          distanceKm,
        };
      });

      setCastStones(casted);
      setIsCasting(false);
      setHasCast(true);
      sound.playMineralClink();
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#a855f7', '#eab308', '#10b981', '#38bdf8'],
      });
    }, 900);
  };

  const getUniqueMines = (): WorldMine[] => {
    const map = new Map<string, WorldMine>();
    castStones.forEach((cs) => {
      if (cs.nearestMine) {
        map.set(cs.nearestMine.id, cs.nearestMine);
      }
    });
    return Array.from(map.values());
  };

  const handleTransferToOracle = () => {
    const mines = getUniqueMines();
    if (mines.length > 0) {
      onCommuneWithSpread(mines);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-serif mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Lithic Casting Divination</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mb-2">
          The Lithic Scatter Plate
        </h1>
        <p className="text-sm sm:text-base text-stone-400 font-serif leading-relaxed">
          Toss raw mineral crystals across the antique cartographic plate. Where they land, their
          crystalline resonance draws upon the nearest subterranean feminine titaness and mineral
          faults to reveal your current alignment.
        </p>
      </div>

      {/* Casting Plate Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Casting Plate */}
        <div className="lg:col-span-8 bg-stone-950/90 border border-amber-950/70 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
          {/* Antique Plate Background & Circular Mandala */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#b45309_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
          <div className="absolute inset-4 border border-amber-600/30 rounded-2xl pointer-events-none" />

          {/* Cast Canvas */}
          <div className="relative w-full aspect-square max-w-[540px] bg-stone-900/40 rounded-full border-2 border-amber-600/40 shadow-2xl flex items-center justify-center overflow-hidden my-4">
            {/* Concentric Ley Rings */}
            <div className="absolute inset-8 rounded-full border border-amber-500/20" />
            <div className="absolute inset-16 rounded-full border border-amber-500/15" />
            <div className="absolute inset-28 rounded-full border border-amber-500/10" />

            {/* Cross Hairs */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#78350f" strokeWidth="1" strokeDasharray="4 4" className="absolute w-full" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#78350f" strokeWidth="1" strokeDasharray="4 4" className="absolute h-full" />

            {/* Connecting Ley Lines between cast stones */}
            {hasCast && castStones.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {castStones.map((stone, idx) => {
                  const next = castStones[(idx + 1) % castStones.length];
                  return (
                    <line
                      key={idx}
                      x1={`${stone.x * 100}%`}
                      y1={`${stone.y * 100}%`}
                      x2={`${next.x * 100}%`}
                      y2={`${next.y * 100}%`}
                      stroke={stone.color}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      opacity="0.6"
                    />
                  );
                })}
              </svg>
            )}

            {/* Casted Mineral Stones */}
            {castStones.map((stone, idx) => (
              <motion.div
                key={stone.id + idx}
                initial={{ scale: 0, y: -80, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 12, delay: idx * 0.1 }}
                style={{ left: `${stone.x * 100}%`, top: `${stone.y * 100}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
              >
                {/* Glow */}
                <div
                  className="absolute -inset-3 rounded-full blur-md opacity-60 animate-pulse"
                  style={{ backgroundColor: stone.color }}
                />

                {/* Crystal Stone Token */}
                <div
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-serif font-bold text-stone-950 shadow-xl transition-transform hover:scale-125"
                  style={{ backgroundColor: stone.color }}
                >
                  {stone.name[0]}
                </div>

                {/* Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded bg-stone-950/90 border border-stone-800 text-[10px] font-mono text-stone-300 whitespace-nowrap pointer-events-none">
                  {stone.name}
                </div>
              </motion.div>
            ))}

            {!hasCast && !isCasting && (
              <div className="text-center z-10 p-6 pointer-events-none">
                <Compass className="w-12 h-12 text-amber-500/50 mx-auto mb-2 animate-spin-slow" />
                <p className="text-sm font-serif text-amber-300/80 uppercase tracking-widest">
                  The Lithic Casting Plate is Silent
                </p>
                <p className="text-xs text-stone-500 mt-1 font-serif">
                  Cast the sacred mineral stones to discover which deep seams answer.
                </p>
              </div>
            )}
          </div>

          {/* Cast Controls */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleCastStones}
              disabled={isCasting}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 flex items-center gap-2.5 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              {isCasting ? 'Casting Crystals...' : hasCast ? 'Re-Cast Stones' : 'Cast Lithic Stones'}
            </button>
          </div>
        </div>

        {/* Right: Lithic Resonance Readings & Intersecting Mine Spirits */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Lithic Scatter Alignments
            </h3>

            {hasCast ? (
              <div className="space-y-4">
                {castStones.map((cs, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-serif font-bold flex items-center gap-1.5" style={{ color: cs.color }}>
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: cs.color }} />
                        {cs.name} ({cs.element})
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {cs.distanceKm} km
                      </span>
                    </div>

                    {cs.nearestMine && (
                      <div className="mt-1.5 pl-3 border-l-2 border-stone-800 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-serif font-semibold text-stone-200">
                            {cs.nearestMine.name}
                          </p>
                          <p className="text-[10px] text-amber-400 font-serif italic">
                            "{cs.nearestMine.feminineArchetype}"
                          </p>
                        </div>
                        <button
                          onClick={() => onOpenMineModal(cs.nearestMine!)}
                          className="text-[10px] text-stone-400 hover:text-amber-300 underline font-mono ml-2"
                        >
                          View Lore
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Transfer to Oracle Button */}
                <button
                  onClick={handleTransferToOracle}
                  className="w-full mt-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Channel in Oracle Chamber
                </button>
              </div>
            ) : (
              <p className="text-xs text-stone-400 font-serif leading-relaxed">
                When you cast the stones, this panel will calculate their geometric triangulation
                with the world's most resonant mineral seams and feminine spirits.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
