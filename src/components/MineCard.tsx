import React from 'react';
import { WorldMine } from '../types';
import { motion } from 'motion/react';
import { Compass, Eye, Flame, Globe2, Mountain, Sparkles, Waves, Zap } from 'lucide-react';

interface MineCardProps {
  mine: WorldMine;
  isUpright?: boolean;
  isRevealed?: boolean;
  onFlip?: () => void;
  size?: 'sm' | 'md' | 'lg';
  positionLabel?: string;
  strataDepth?: string;
  showDetailsModal?: () => void;
}

export const MineCard: React.FC<MineCardProps> = ({
  mine,
  isUpright = true,
  isRevealed = true,
  onFlip,
  size = 'md',
  positionLabel,
  strataDepth,
  showDetailsModal,
}) => {
  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Fire':
        return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case 'Water':
        return <Waves className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Earth':
        return <Mountain className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Air':
        return <Zap className="w-3.5 h-3.5 text-violet-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-yellow-300" />;
    }
  };

  const sizeClasses = {
    sm: 'w-44 h-72 text-xs',
    md: 'w-64 h-[420px] text-sm',
    lg: 'w-80 h-[520px] text-base',
  }[size];

  return (
    <div className="flex flex-col items-center gap-2">
      {positionLabel && (
        <div className="text-center">
          <span className="text-xs font-serif uppercase tracking-widest text-amber-400/90 font-semibold px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/20">
            {positionLabel}
          </span>
          {strataDepth && (
            <p className="text-[11px] text-stone-400 mt-0.5 font-mono">{strataDepth}</p>
          )}
        </div>
      )}

      <motion.div
        layout
        whileHover={{ y: isRevealed ? -6 : -2, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        onClick={onFlip || showDetailsModal}
        className={`relative ${sizeClasses} rounded-2xl cursor-pointer select-none transition-all duration-300 shadow-2xl overflow-hidden group perspective-1000`}
        style={{
          boxShadow: isRevealed
            ? `0 0 25px ${mine.mineralColor}25, 0 10px 30px rgba(0,0,0,0.8)`
            : '0 10px 30px rgba(0,0,0,0.8)',
        }}
      >
        {!isRevealed ? (
          // CARD BACK: Ancient Subterranean Arcana Seal
          <div className="w-full h-full bg-gradient-to-b from-stone-900 via-neutral-950 to-stone-950 border-2 border-amber-600/40 rounded-2xl p-4 flex flex-col items-center justify-between relative overflow-hidden">
            {/* Background geometric ley-lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-4 border border-amber-500/20 rounded-xl" />
            <div className="absolute inset-6 border border-amber-500/10 rounded-lg rotate-45 scale-90" />

            <div className="text-center z-10">
              <span className="text-[10px] tracking-[0.3em] font-serif uppercase text-amber-500/70">
                CHTHONIC ORACLE
              </span>
            </div>

            {/* Central Subterranean Eye & Tectonic Core */}
            <div className="relative z-10 w-20 h-20 rounded-full border border-amber-500/30 flex items-center justify-center bg-stone-950/80 shadow-[0_0_20px_rgba(217,119,6,0.2)]">
              <Compass className="w-10 h-10 text-amber-400/80 animate-spin-slow" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
            </div>

            <div className="text-center z-10">
              <p className="text-[11px] font-serif text-amber-300/80 tracking-widest uppercase">
                Tap to Excavate
              </p>
              <p className="text-[9px] text-stone-500 font-mono mt-0.5">SUBTERRANEA DECK</p>
            </div>
          </div>
        ) : (
          // CARD FRONT: The Excavated Mine
          <div
            className={`w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-stone-900/95 via-stone-950/95 to-neutral-950 border-2 rounded-2xl relative transition-transform duration-300 ${
              !isUpright ? 'rotate-180' : ''
            }`}
            style={{
              borderColor: `${mine.mineralColor}60`,
            }}
          >
            {/* Ambient Mineral Glow */}
            <div
              className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: mine.mineralColor }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: mine.mineralColor }}
            />

            {/* Card Header */}
            <div className="z-10 flex items-center justify-between border-b border-stone-800/80 pb-2">
              <div className="flex items-center gap-1.5">
                {getElementIcon(mine.elementalAffinity)}
                <span className="text-[11px] font-medium tracking-wide text-stone-300">
                  {mine.elementalAffinity} · {mine.planetaryRuler}
                </span>
              </div>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border text-stone-300 font-semibold"
                style={{
                  borderColor: `${mine.mineralColor}50`,
                  backgroundColor: `${mine.mineralColor}15`,
                }}
              >
                -{mine.depthMeters}m
              </span>
            </div>

            {/* Center Visual & Archetype */}
            <div className="z-10 my-auto flex flex-col items-center text-center px-1">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-inner relative border"
                style={{
                  backgroundColor: `${mine.mineralColor}15`,
                  borderColor: `${mine.mineralColor}40`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full shadow-[0_0_15px_currentColor] flex items-center justify-center font-serif text-sm font-bold"
                  style={{ color: mine.mineralColor }}
                >
                  <Globe2 className="w-7 h-7" />
                </div>
              </div>

              <span className="text-[10px] tracking-[0.25em] font-serif uppercase text-amber-400 font-semibold">
                {mine.arcanaArchetype}
              </span>
              <h3 className="text-base font-serif font-bold text-stone-100 mt-1 leading-snug">
                {mine.name}
              </h3>
              <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                {mine.location}, {mine.country}
              </p>

              <div className="mt-2 flex flex-wrap justify-center gap-1">
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${mine.mineralColor}20`,
                    borderColor: `${mine.mineralColor}60`,
                    color: '#fff',
                  }}
                >
                  {mine.primaryMineral}
                </span>
                <span className="text-[10px] text-stone-400 px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800">
                  {mine.depthCategory}
                </span>
              </div>
            </div>

            {/* Card Footer Meaning */}
            <div className="z-10 border-t border-stone-800/80 pt-2 text-center">
              <div className="flex items-center justify-between text-[10px] text-amber-500 font-serif tracking-widest uppercase mb-1">
                <span>{isUpright ? '✦ Open Vein' : '▼ Deep Pressure'}</span>
                <span className="font-mono text-[9px] text-stone-400">
                  {mine.chthonicKeyword}
                </span>
              </div>
              <p className="text-[11px] text-stone-300 line-clamp-3 leading-relaxed italic font-serif">
                "{isUpright ? mine.uprightMeaning : mine.invertedMeaning}"
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {isRevealed && showDetailsModal && (
        <button
          onClick={showDetailsModal}
          className="text-[11px] text-amber-400/80 hover:text-amber-300 flex items-center gap-1 transition-colors mt-0.5"
        >
          <Eye className="w-3.5 h-3.5" /> Lore & Mantle Echo
        </button>
      )}
    </div>
  );
};
