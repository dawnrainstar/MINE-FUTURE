import React, { useMemo } from 'react';
import { WorldMine } from '../types';
import { MineCard } from './MineCard';
import { CartographicFigureSvg } from './CartographicFigureSvg';
import { sound } from '../utils/audio';
import { generateTitaness } from '../utils/titanessEngine';
import {
  Calendar,
  Sparkles,
  Compass,
  Flame,
  Activity,
  ArrowRight,
  Shield,
  Eye,
  Zap,
  CircleDot,
  Trees,
  HeartCrack,
} from 'lucide-react';

interface DailySeamProps {
  mines: WorldMine[];
  onCommuneWithDailyMine: (mine: WorldMine) => void;
  onOpenMineModal: (mine: WorldMine) => void;
}

export const DailySeam: React.FC<DailySeamProps> = ({
  mines,
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
    const list = mines.length > 0 ? mines : [];
    if (list.length === 0) return {} as WorldMine;
    const dayOfYear =
      Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
      ) + today.getFullYear();
    const index = Math.abs(dayOfYear) % list.length;
    return list[index];
  }, [today, mines]);

  const titaness = useMemo(() => {
    if (!dailyMine.id) return null;
    return dailyMine.titaness || generateTitaness({
      mineral: dailyMine.primaryMineral,
      region: dailyMine.location || dailyMine.country,
      depth: dailyMine.depthMeters,
    });
  }, [dailyMine]);

  if (!dailyMine.id || !titaness) return null;

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
          The Earth rotates along ancient tectonic fault lines. Today's mantle vibration draws from our planetary catalog of {mines.length.toLocaleString()} world excavations, resonating with the subterranean spirit of{' '}
          <span className="text-amber-300 font-semibold">{dailyMine.name}</span> ({titaness.name}).
        </p>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive Card & Action */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <MineCard mine={dailyMine} showDetailsModal={() => onOpenMineModal(dailyMine)} />

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenMineModal(dailyMine)}
              className="flex-1 py-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 text-stone-200 hover:text-white text-xs font-serif flex items-center justify-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4" /> Full Lore
            </button>
            <button
              onClick={() => onCommuneWithDailyMine(dailyMine)}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Draw Into Oracle
            </button>
          </div>
        </div>

        {/* Right: Personified Cartographic Figure & Daily Oracle Oracle Guidance */}
        <div className="lg:col-span-7 bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6 backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold block">
                  {titaness.name}
                </span>
                <span className="text-xs text-amber-200/80 font-serif">
                  {titaness.archetype}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-amber-300">ᚱ {titaness.rune}</span>
                <span className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-amber-300">⚚ {titaness.geomantic}</span>
              </div>
            </div>

            {/* Cartographic Silhouette */}
            <div className="my-4">
              <CartographicFigureSvg mine={dailyMine} />
            </div>

            {/* Sacred Wound & 3-Fold Cures */}
            <div className="space-y-3 mb-4">
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 flex items-start gap-2">
                <HeartCrack className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block">
                    Today's Shadow Strain / Wound
                  </span>
                  <p className="text-xs text-rose-200/90 font-serif">
                    {titaness.wound}
                  </p>
                </div>
              </div>

              {/* 3-Fold Cures Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-amber-600/30">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1 font-bold">
                    <Zap className="w-3 h-3 text-amber-400" /> Literal
                  </span>
                  <p className="text-[11px] text-stone-300 font-serif mt-0.5">
                    {titaness.cures.literal}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-purple-600/30">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1 font-bold">
                    <Sparkles className="w-3 h-3 text-purple-400" /> Symbolic
                  </span>
                  <p className="text-[11px] text-stone-300 font-serif mt-0.5">
                    {titaness.cures.symbolic}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-cyan-600/30">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1 font-bold">
                    <CircleDot className="w-3 h-3 text-cyan-400" /> Geometric
                  </span>
                  <p className="text-[11px] text-stone-300 font-serif mt-0.5">
                    {titaness.cures.geometric}
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Wisdom & Mantle Message */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-950/80">
                <p className="text-xs font-serif uppercase tracking-wider text-amber-400 font-bold mb-1 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5" />
                  Mantle Voice for {dateString}
                </p>
                <p className="text-sm font-serif italic text-stone-200 leading-relaxed">
                  "{dailyMine.mantleMessage}"
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-serif">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Sacred Tree: {titaness.tree} · Element: {titaness.element}
            </span>
            <span className="font-mono text-amber-300/80">
              -{dailyMine.depthMeters}m Strata
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
