import React, { useState } from 'react';
import { DivinationReading, WorldMine } from '../types';
import { generateUniqueMineralPrescription, GeneratedMineralPrescription } from '../utils/mineralPrescriptionEngine';
import {
  Gem,
  Sparkles,
  Compass,
  Clock,
  Wind,
  Shield,
  Copy,
  Check,
  Zap,
  Activity,
  Milestone,
  Layers,
} from 'lucide-react';

interface MineralPrescriptionCardProps {
  reading: DivinationReading;
  mine: WorldMine;
  embedded?: boolean;
}

export const MineralPrescriptionCard: React.FC<MineralPrescriptionCardProps> = ({
  reading,
  mine,
  embedded = false,
}) => {
  const [copiedFormula, setCopiedFormula] = useState(false);

  const targetDate = reading.targetFutureDate || new Date(reading.timestamp).toISOString().split('T')[0];
  const inquiry = reading.question || 'Personal Breakthrough & Destiny';

  // Compute or retrieve the full unique mineral prescription
  const prescription: GeneratedMineralPrescription = generateUniqueMineralPrescription(
    mine,
    targetDate,
    inquiry,
    reading.interpretation?.chthonicPrescription
  );

  const handleCopyFormula = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(prescription.sealingFormula);
      } else {
        const ta = document.createElement('textarea');
        ta.value = prescription.sealingFormula;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2500);
    } catch (e) {
      console.error('Failed to copy formula', e);
    }
  };

  const primaryMineral = prescription.prescribedMinerals[0];
  const secondaryMineral = prescription.prescribedMinerals[1];
  const catalyticMineral = prescription.catalyticMineral;

  return (
    <div
      className={
        embedded
          ? 'space-y-7 relative'
          : 'bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-500/40 hover:border-amber-400/60 rounded-3xl p-6 sm:p-8 space-y-7 shadow-2xl transition-all relative overflow-hidden'
      }
    >
      {/* Subtle Background Glow */}
      {!embedded && (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
        </>
      )}

      {/* Header Banner */}
      <div className="relative z-10 border-b border-stone-800/80 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Gem className="w-5 h-5" />
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-200 tracking-wide">
              Unique Mineral Geomantic Prescription
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 font-serif">
            Mathematically calibrated to your inquiry, the celestial station of {targetDate}, and the subterranean seam of {mine.name}.
          </p>
        </div>

        {/* Unique Prescription Code & Geomantic Figure */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-stone-950/90 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{prescription.geomanticCode}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-300 font-mono text-xs flex items-center gap-2 shadow-inner">
            {/* 4-dot Geomantic Tetragram Visualizer */}
            <div className="flex flex-col gap-0.5 items-center justify-center">
              {prescription.geomanticFigureTetragram.map((dots, i) => (
                <div key={i} className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                  {dots === 2 && <div className="w-1 h-1 rounded-full bg-amber-400" />}
                </div>
              ))}
            </div>
            <span className="font-serif text-amber-200 font-bold">{prescription.geomanticFigureName}</span>
          </div>
        </div>
      </div>

      {/* TRIO OF PRESCRIBED MINERAL ALLIES */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-xs sm:text-sm font-mono text-stone-300 uppercase font-bold tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Prescribed Mineral Matrix</span>
          </div>
          <span className="text-[11px] font-mono text-amber-400/80">3-Stone Synergistic Lattice</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Primary Seam Mineral Ally */}
          {primaryMineral && (
            <div className="p-5 rounded-2xl bg-stone-950/90 border border-amber-500/40 space-y-3 shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Primary Seam Ally
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">Mohs {primaryMineral.mohsHardness || '7.0'}</span>
                </div>
                <div className="font-serif font-bold text-base sm:text-lg text-amber-300 leading-snug">
                  {primaryMineral.name}
                </div>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  {primaryMineral.action}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-850 space-y-1 text-[11px] font-mono text-stone-400">
                <div className="flex justify-between">
                  <span className="text-stone-500">Lattice:</span>
                  <span className="text-stone-300">{primaryMineral.crystalSystem}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Placement:</span>
                  <span className="text-amber-400 font-semibold">{primaryMineral.placement}</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Secondary Grounding Ally */}
          {secondaryMineral && (
            <div className="p-5 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3 shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                    Grounding Shield
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">Mohs {secondaryMineral.mohsHardness || '6.5'}</span>
                </div>
                <div className="font-serif font-bold text-base sm:text-lg text-stone-200 leading-snug">
                  {secondaryMineral.name}
                </div>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  {secondaryMineral.action}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-850 space-y-1 text-[11px] font-mono text-stone-400">
                <div className="flex justify-between">
                  <span className="text-stone-500">Resonance:</span>
                  <span className="text-stone-300 truncate max-w-[150px]">{secondaryMineral.resonance.slice(0, 24)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Anchor:</span>
                  <span className="text-stone-300">{secondaryMineral.placement}</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Tertiary Catalytic Mineral */}
          {catalyticMineral && (
            <div className="p-5 rounded-2xl bg-stone-950/90 border border-cyan-500/30 space-y-3 shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" /> Catalytic Spark
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">{catalyticMineral.elementalSpark.split('•')[0]}</span>
                </div>
                <div className="font-serif font-bold text-base sm:text-lg text-cyan-200 leading-snug">
                  {catalyticMineral.name}
                </div>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  {catalyticMineral.action}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-850 space-y-1 text-[11px] font-mono text-stone-400">
                <div className="flex justify-between">
                  <span className="text-stone-500">Purpose:</span>
                  <span className="text-cyan-300 font-semibold">{catalyticMineral.elementalSpark}</span>
                </div>
                <div className="text-[10px] text-stone-400 truncate">
                  {catalyticMineral.resonance}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GEOMANTIC ALTAR GEOMETRY & CHARGING WINDOW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {/* Altar Pattern & Compass Azimuth */}
        <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Altar Geometry & Azimuth</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-amber-300">
              {prescription.altarGeometry.compassHeading} ({prescription.altarGeometry.azimuthDegrees}°)
            </span>
          </div>
          <div className="font-serif font-semibold text-sm text-stone-200">
            {prescription.altarGeometry.pattern}
          </div>
          <p className="text-xs text-stone-300 font-serif leading-relaxed">
            {prescription.altarGeometry.placementInstructions}
          </p>
        </div>

        {/* Lithospheric Charging Window */}
        <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Lithospheric Charging Window</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Optimal Activation
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-200 font-serif leading-relaxed">
            {prescription.lithosphericChargingWindow}
          </p>
          <div className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-850 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Charge minerals in this window to anchor the timeline before {targetDate}.</span>
          </div>
        </div>
      </div>

      {/* GROUNDING RITUAL & SOMATIC MANTLE BREATHWORK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {/* Grounding Ritual */}
        <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Sacred Grounding Ritual</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-200 font-serif leading-relaxed">
            {prescription.groundingRitual}
          </p>
        </div>

        {/* Mantle Breathing Pattern */}
        <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span>Mantle Breathwork</span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              {prescription.somaticFocusCenter}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-200 font-serif leading-relaxed">
            {prescription.mantleRemedy}
          </p>
        </div>
      </div>

      {/* SPOKEN SEALING FORMULA */}
      <div className="p-5 sm:p-6 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-3 relative z-10 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Spoken Mineral Sealing Formula</span>
          </div>
          <button
            type="button"
            onClick={handleCopyFormula}
            className="px-3 py-1 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-amber-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            {copiedFormula ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Formula</span>
              </>
            )}
          </button>
        </div>
        <blockquote className="italic font-serif text-sm sm:text-base text-amber-100/90 leading-relaxed border-l-2 border-amber-500/60 pl-4 py-1">
          {prescription.sealingFormula}
        </blockquote>
        <p className="text-[11px] font-mono text-stone-500">
          Speak this aloud while holding your primary mineral ally to seal the prophecy into reality.
        </p>
      </div>

      {/* TEMPORAL CHRONOLOGICAL MILESTONES */}
      {prescription.temporalMilestones && prescription.temporalMilestones.length > 0 && (
        <div className="pt-2 border-t border-stone-800/80 space-y-3 relative z-10">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold flex items-center gap-1.5">
            <Milestone className="w-4 h-4 text-amber-400" />
            <span>Mineral Integration Timeline to {targetDate}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {prescription.temporalMilestones.map((ms, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                <div className="text-[11px] font-mono font-bold text-amber-300">{ms.timeframe}</div>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">{ms.guidance}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
