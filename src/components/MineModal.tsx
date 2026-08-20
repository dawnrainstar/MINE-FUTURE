import React from 'react';
import { WorldMine } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, Layers, Sparkles, Flame, Shield, MapPin, History, Compass, Wand2 } from 'lucide-react';
import { CartographicFigureSvg } from './CartographicFigureSvg';

interface MineModalProps {
  mine: WorldMine | null;
  onClose: () => void;
  onSelectForReading?: (mine: WorldMine) => void;
}

export const MineModal: React.FC<MineModalProps> = ({ mine, onClose, onSelectForReading }) => {
  if (!mine) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-stone-950 border-2 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-200"
          style={{ borderColor: `${mine.mineralColor}60` }}
        >
          {/* Background Ambient Aura */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: mine.mineralColor }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg shrink-0"
              style={{
                backgroundColor: `${mine.mineralColor}20`,
                borderColor: `${mine.mineralColor}80`,
              }}
            >
              <Compass className="w-8 h-8" style={{ color: mine.mineralColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-serif uppercase tracking-widest text-amber-400 font-semibold">
                  {mine.arcanaArchetype}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  [Coord: {mine.lat.toFixed(2)}°, {mine.lng.toFixed(2)}°]
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                {mine.name}
              </h2>
              <p className="text-sm text-stone-400 flex items-center gap-1.5 mt-1 font-mono">
                <MapPin className="w-4 h-4 text-amber-500" />
                {mine.location}, {mine.country} · {mine.continent}
              </p>
            </div>
          </div>

          {/* ANTHROPOMORPHIC CARTOGRAPHIC WOMAN FIGURE PLATE */}
          <div className="mb-6">
            <CartographicFigureSvg mine={mine} />
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-stone-900/70 border border-stone-800/80 rounded-xl p-3">
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-serif">
                Primary Mineral
              </span>
              <span className="text-sm font-semibold text-stone-100 mt-1 block">
                {mine.primaryMineral}
              </span>
            </div>
            <div className="bg-stone-900/70 border border-stone-800/80 rounded-xl p-3">
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-serif">
                Mantle Depth
              </span>
              <span className="text-sm font-semibold text-amber-400 mt-1 block font-mono">
                -{mine.depthMeters} meters
              </span>
            </div>
            <div className="bg-stone-900/70 border border-stone-800/80 rounded-xl p-3">
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-serif">
                Elemental Force
              </span>
              <span className="text-sm font-semibold text-stone-100 mt-1 block">
                {mine.elementalAffinity} · {mine.planetaryRuler}
              </span>
            </div>
            <div className="bg-stone-900/70 border border-stone-800/80 rounded-xl p-3">
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-serif">
                Chthonic Key
              </span>
              <span className="text-sm font-semibold text-violet-400 mt-1 block font-mono">
                {mine.chthonicKeyword}
              </span>
            </div>
          </div>

          {/* Mantle Echo / Voice Quote */}
          <div className="relative bg-gradient-to-r from-amber-950/30 via-stone-900/50 to-stone-950 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="text-xs font-serif uppercase tracking-widest text-amber-400/80 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Mantle Resonance & Voice
            </div>
            <p className="text-base text-amber-100/90 font-serif italic leading-relaxed">
              "{mine.mantleMessage}"
            </p>
          </div>

          {/* Divination Meanings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-stone-900/60 border border-emerald-900/50 rounded-2xl p-4">
              <h4 className="text-xs font-serif uppercase tracking-widest text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Open Vein (Upright Meaning)
              </h4>
              <p className="text-sm text-stone-300 leading-relaxed font-serif">
                {mine.uprightMeaning}
              </p>
            </div>
            <div className="bg-stone-900/60 border border-red-950/60 rounded-2xl p-4">
              <h4 className="text-xs font-serif uppercase tracking-widest text-rose-400 font-bold mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Deep Pressure (Inverted Meaning)
              </h4>
              <p className="text-sm text-stone-300 leading-relaxed font-serif">
                {mine.invertedMeaning}
              </p>
            </div>
          </div>

          {/* Geological & Historical Lore */}
          <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-4 sm:p-5 mb-6">
            <h4 className="text-xs font-serif uppercase tracking-widest text-stone-400 font-bold mb-2 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-amber-500" />
              Geological & Historical Stratigraphy
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed mb-3">
              {mine.historicalContext}
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-stone-400">Secondary Minerals:</span>
              {mine.secondaryMinerals.map((sec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-300 font-mono text-[11px]"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-800">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-stone-400 hover:text-stone-200 text-sm font-medium transition-colors"
            >
              Close
            </button>
            {onSelectForReading && (
              <button
                onClick={() => {
                  onSelectForReading(mine);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105"
              >
                Incorporate into Oracle
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
