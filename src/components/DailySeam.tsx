import React, { useMemo } from 'react';
import { WorldMine } from '../types';
import { WORLD_MINES } from '../data/mines';
import { MineCard } from './MineCard';
import { CartographicFigureSvg } from './CartographicFigureSvg';
import { sound } from '../utils/audio';
import {
  Calendar,
  Sparkles,
  Compass,
  Flame,
  Activity,
  ArrowRight,
  Shield,
  Eye,
} from 'lucide-react';

interface DailySeamProps {
  onCommuneWithDailyMine: (mine: WorldMine) => void;
  onOpenMineModal: (mine: WorldMine) => void;
}

export const DailySeam: React.FC<DailySeamProps> = ({
  onCommuneWithDailyMine,
  onOpenMineModal,
}) => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate deterministic daily index from year, month, date
  const dailyMine: WorldMine = useMemo(() => {
    const dayOfYear =
      Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
      ) + today.getFullYear();
    const index = Math.abs(dayOfYear) % WORLD_MINES.length;
    return WORLD_MINES[index];
  }, [today]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-serif mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>{dateString}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mb-2">
          The Daily Mineral Seam
        </h1>
        <p className="text-sm sm:text-base text-stone-400 font-serif leading-relaxed">
          The Earth rotates along ancient tectonic fault lines. Today's mantle vibration resonates
          with the subterranean spirit of{' '}
          <span className="text-amber-300 font-semibold">{dailyMine.name}</span>.
        </p>
      </div>

      {/* Main Grid: Card + Cartographic Spirit Plate */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-stone-900/40 border border-amber-950/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        {/* Left: Card Display */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <MineCard
            mine={dailyMine}
            isUpright={true}
            isRevealed={true}
            size="md"
            positionLabel="Daily Mantle Resonance"
            strataDepth={`Depth: -${dailyMine.depthMeters}m`}
            showDetailsModal={() => onOpenMineModal(dailyMine)}
          />
        </div>

        {/* Right: Cartographic Figure & Daily Oracle Message */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-amber-400 font-bold block mb-1">
              {dailyMine.cartoucheTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              {dailyMine.feminineArchetype}
            </h2>
            <p className="text-xs text-stone-400 font-mono mt-0.5">
              {dailyMine.location}, {dailyMine.country} · {dailyMine.primaryMineral}
            </p>
          </div>

          {/* Mantle Message */}
          <div className="bg-gradient-to-r from-amber-950/40 to-stone-950/70 border border-amber-500/30 rounded-2xl p-4 sm:p-5">
            <span className="text-xs font-serif uppercase tracking-widest text-amber-400/90 font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Daily Mantle Whisper
            </span>
            <p className="text-base text-amber-100/95 font-serif italic leading-relaxed">
              "{dailyMine.mantleMessage}"
            </p>
          </div>

          {/* Upright Guidance */}
          <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-4">
            <h4 className="text-xs font-serif uppercase tracking-widest text-emerald-400 font-bold mb-1.5 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              Open Vein (Daily Action)
            </h4>
            <p className="text-sm text-stone-300 font-serif leading-relaxed">
              {dailyMine.uprightMeaning}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onCommuneWithDailyMine(dailyMine)}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              Commune in Oracle Chamber
            </button>
            <button
              onClick={() => onOpenMineModal(dailyMine)}
              className="px-5 py-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 text-sm font-serif flex items-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Cartography Plate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
