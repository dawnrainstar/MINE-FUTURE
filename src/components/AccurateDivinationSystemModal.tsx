import React, { useState } from 'react';
import { WorldMine } from '../types';
import {
  executeAccurateDivination,
  MasterAccurateDivinationSystemResult,
  ClassicalGeomanticFigure,
} from '../utils/accurateDivinationEngine';
import { sound } from '../utils/audio';
import {
  Shield,
  Compass,
  Moon,
  Sun,
  Flame,
  Globe,
  Layers,
  Sparkles,
  Activity,
  Calendar,
  Clock,
  X,
  ChevronRight,
  HelpCircle,
  Download,
  Share2,
  Check,
  Zap,
  Info,
  Maximize2,
} from 'lucide-react';

interface AccurateDivinationSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMine?: WorldMine;
  question?: string;
  targetFutureDate?: string;
}

export const AccurateDivinationSystemModal: React.FC<AccurateDivinationSystemModalProps> = ({
  isOpen,
  onClose,
  currentMine,
  question = 'What future realities, subterranean shifts, and sovereign outcomes will manifest?',
  targetFutureDate,
}) => {
  const [activeTab, setActiveTab] = useState<'shield' | 'houses' | 'ephemeris' | 'iching' | 'tectonics'>('shield');
  const [selectedFigure, setSelectedFigure] = useState<ClassicalGeomanticFigure | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mockMine: WorldMine = currentMine || {
    id: 'deep_craton',
    name: 'Great Witwatersrand Mantle Basin',
    location: 'Gauteng Basin',
    country: 'South Africa',
    lat: -26.2,
    lng: 28.04,
    depthMeters: 3900,
    depthCategory: 'Ultra-Deep Abyss',
    primaryMineral: 'Native Gold & Uraninite',
    secondaryMinerals: ['Pyrite', 'Quartz', 'Diamond'],
    mineralCategory: 'Precious Metals',
    elementalAffinity: 'Fire',
    planetaryRuler: 'Sun',
    arcanaArchetype: 'The Sovereign Craton',
    feminineArchetype: 'Titaness of Unconquered Gold',
    cartoucheTitle: 'Aura Aurifera Subterranea',
    cartographicFigure: 'Enthroned Titaness holding molten golden chalice at the core',
    cartographicSilhouetteType: 'goddess-enthroned',
    uprightMeaning: 'Unbounded sovereign prosperity, deep enduring wealth, unyielding bedrock strength.',
    invertedMeaning: 'Excessive thermal pressure requiring grounding and patience before extraction.',
    mantleMessage: 'I am the molten root of the continent; what is forged in deepest pressure cannot be broken.',
    historicalContext: 'Extracted since antiquity; the deepest gold ore body on the planet.',
    chthonicKeyword: 'Sovereign Aurum',
    mineralColor: '#eab308',
  };

  const result: MasterAccurateDivinationSystemResult = executeAccurateDivination(
    question,
    [mockMine],
    targetFutureDate
  );

  const { shieldChart, planetaryHours, tectonicResonance, primaryIChing, transformedIChing, movingLineIndices, divinatorySynthesis } = result;

  const renderTetragramDots = (tetragram: [1 | 2, 1 | 2, 1 | 2, 1 | 2], size: 'sm' | 'md' | 'lg' = 'md') => {
    const dotSize = size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5';
    const gap = size === 'sm' ? 'gap-1' : size === 'lg' ? 'gap-2' : 'gap-1.5';
    const rowGap = size === 'sm' ? 'gap-1' : size === 'lg' ? 'gap-2' : 'gap-1.5';

    return (
      <div className={`flex flex-col items-center justify-center ${rowGap}`}>
        {tetragram.map((dots, idx) => (
          <div key={idx} className={`flex items-center justify-center ${gap}`}>
            {dots === 1 ? (
              <div className={`${dotSize} rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]`} />
            ) : (
              <>
                <div className={`${dotSize} rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]`} />
                <div className={`${dotSize} rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]`} />
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleCopySummary = () => {
    sound.playChime();
    const text = `=== HIGH-PRECISION CHALDEAN-GEOMANTIC DIVINATION ===
Question: ${question}
Target Date: ${divinatorySynthesis.temporalFulfillmentDate}
Planetary Hour: ${planetaryHours.hourRuler} (Day Ruler: ${planetaryHours.dayRuler})
Lunar Phase: ${planetaryHours.lunarPhaseName} (${planetaryHours.lunarIlluminationPercent}% Illumination)
Lunar Mansion: ${planetaryHours.lunarMansion.number}. ${planetaryHours.lunarMansion.name}
Geomantic Judge: ${shieldChart.judge.name} (${shieldChart.judge.oracleVerdict})
Reconciler: ${shieldChart.reconciler.name}
I Ching Hexagram: #${primaryIChing.number} ${primaryIChing.name} (${primaryIChing.hexagramSymbol}) -> #${transformedIChing.number} ${transformedIChing.name}
Tectonic Stress: ${tectonicResonance.nearestBoundaryName} (${tectonicResonance.crustalStressMpa} MPa, ${tectonicResonance.piezoElectricResonanceHz} Hz)
Supreme Verdict: ${divinatorySynthesis.supremeVerdict}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 flex items-center justify-center font-bold shadow-[0_0_25px_rgba(245,158,11,0.35)] shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                  Gold-Standard Divination Engine
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  100% Deterministic & Ephemeris-Aligned
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mt-1">
                The Master Quadripartite Divination System
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-serif transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
              <span>{copied ? 'Copied' : 'Copy Data'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 bg-stone-950/50 px-5 pt-3 gap-2 overflow-x-auto">
          {[
            { id: 'shield', label: '1. Geomantic Shield Chart', icon: Shield },
            { id: 'houses', label: '2. 12 Astrological Houses', icon: Compass },
            { id: 'ephemeris', label: '3. Planetary Hours & Moon', icon: Clock },
            { id: 'iching', label: '4. I Ching 64-Hexagram Matrix', icon: Layers },
            { id: 'tectonics', label: '5. Subterranean Tectonic Stress', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-2 pb-3 px-3.5 text-xs sm:text-sm font-serif font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: GEOMANTIC SHIELD CHART */}
          {activeTab === 'shield' && (
            <div className="space-y-6">
              {/* Executive Summary Card */}
              <div className="bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Supreme Oracular Verdict (Gerard of Cremona / Pietro d'Abano Rule)
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    Judge: {shieldChart.judge.name} ({shieldChart.judge.oracleVerdict})
                  </span>
                </div>
                <p className="text-base sm:text-lg font-serif text-stone-100 leading-relaxed font-semibold">
                  "{divinatorySynthesis.supremeVerdict}"
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-serif text-stone-300 border-t border-stone-800/80">
                  <div>
                    <strong className="text-amber-300">Reconciler (Superjudex):</strong> {shieldChart.reconciler.name} ({shieldChart.reconciler.latinName})
                  </div>
                  <div>
                    <strong className="text-amber-300">Target Fulfillment Epoch:</strong> {divinatorySynthesis.temporalFulfillmentDate}
                  </div>
                </div>
              </div>

              {/* Classical Shield Diagram */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-stone-200 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <span>The Classical 16-Figure Quadripartite Shield</span>
                  </h3>
                  <span className="text-xs font-mono text-stone-400">
                    Parity Additions: Odd + Odd = 2 (Even) | Odd + Even = 1 (Odd)
                  </span>
                </div>

                {/* Tier 1: The 4 Mothers (Matres) */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2 font-bold flex items-center gap-2">
                    <span>Tier 1: The 4 Mothers (Matres - Generated from Earth Seam & Seeker)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {shieldChart.mothers.map((fig, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedFigure(fig)}
                        className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        <span className="text-[11px] font-mono text-stone-400">Mother {idx + 1}</span>
                        {renderTetragramDots(fig.tetragram, 'md')}
                        <div>
                          <div className="font-serif font-bold text-sm text-stone-100">{fig.name}</div>
                          <div className="text-[11px] font-serif text-amber-300">{fig.element} • {fig.planetaryRuler}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier 2: The 4 Daughters (Filiae) */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2 font-bold flex items-center gap-2">
                    <span>Tier 2: The 4 Daughters (Filiae - Transposed Rows of the Mothers)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {shieldChart.daughters.map((fig, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedFigure(fig)}
                        className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        <span className="text-[11px] font-mono text-stone-400">Daughter {idx + 1}</span>
                        {renderTetragramDots(fig.tetragram, 'md')}
                        <div>
                          <div className="font-serif font-bold text-sm text-stone-100">{fig.name}</div>
                          <div className="text-[11px] font-serif text-amber-300">{fig.element} • {fig.planetaryRuler}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier 3: The 4 Nephews (Nepotes) */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2 font-bold flex items-center gap-2">
                    <span>Tier 3: The 4 Nephews (Nepotes - Binary Additions M1+M2, M3+M4, D1+D2, D3+D4)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {shieldChart.nephews.map((fig, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedFigure(fig)}
                        className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        <span className="text-[11px] font-mono text-stone-400">Nephew {idx + 1}</span>
                        {renderTetragramDots(fig.tetragram, 'md')}
                        <div>
                          <div className="font-serif font-bold text-sm text-stone-100">{fig.name}</div>
                          <div className="text-[11px] font-serif text-amber-300">{fig.element} • {fig.planetaryRuler}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier 4: The 2 Witnesses (Testes) */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2 font-bold flex items-center gap-2">
                    <span>Tier 4: The Two Witnesses (Right = Past/Inner Cause | Left = Future/External World)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setSelectedFigure(shieldChart.rightWitness)}
                      className="bg-stone-950 border border-amber-900/60 hover:border-amber-500/60 p-5 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-xs font-mono text-amber-400 font-bold uppercase">Right Witness (Dexter)</span>
                        <div className="text-base font-serif font-bold text-stone-100">{shieldChart.rightWitness.name}</div>
                        <div className="text-xs font-serif text-stone-300">{shieldChart.rightWitness.innerEssence}</div>
                      </div>
                      <div className="pl-4 shrink-0">
                        {renderTetragramDots(shieldChart.rightWitness.tetragram, 'lg')}
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedFigure(shieldChart.leftWitness)}
                      className="bg-stone-950 border border-amber-900/60 hover:border-amber-500/60 p-5 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-xs font-mono text-amber-400 font-bold uppercase">Left Witness (Sinister)</span>
                        <div className="text-base font-serif font-bold text-stone-100">{shieldChart.leftWitness.name}</div>
                        <div className="text-xs font-serif text-stone-300">{shieldChart.leftWitness.innerEssence}</div>
                      </div>
                      <div className="pl-4 shrink-0">
                        {renderTetragramDots(shieldChart.leftWitness.tetragram, 'lg')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tier 5: The Judge & Reconciler */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div
                    onClick={() => setSelectedFigure(shieldChart.judge)}
                    className="bg-gradient-to-r from-amber-950/60 to-stone-950 border-2 border-amber-500 p-5 rounded-3xl flex items-center justify-between shadow-[0_0_20px_rgba(245,158,11,0.2)] cursor-pointer"
                  >
                    <div className="space-y-1.5 text-left">
                      <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                        ★ Supreme Judge (Judex)
                      </span>
                      <div className="text-lg font-serif font-bold text-amber-200">{shieldChart.judge.name}</div>
                      <div className="text-xs font-serif text-stone-200 leading-relaxed">{shieldChart.judge.divinationKeyword} • {shieldChart.judge.oracleVerdict}</div>
                    </div>
                    <div className="pl-4 shrink-0">
                      {renderTetragramDots(shieldChart.judge.tetragram, 'lg')}
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedFigure(shieldChart.reconciler)}
                    className="bg-stone-950 border border-amber-500/50 p-5 rounded-3xl flex items-center justify-between cursor-pointer"
                  >
                    <div className="space-y-1.5 text-left">
                      <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                        Reconciler (Judge + Mother 1)
                      </span>
                      <div className="text-lg font-serif font-bold text-stone-100">{shieldChart.reconciler.name}</div>
                      <div className="text-xs font-serif text-stone-300 leading-relaxed">{shieldChart.reconciler.divinationKeyword} • Way of Mastery</div>
                    </div>
                    <div className="pl-4 shrink-0">
                      {renderTetragramDots(shieldChart.reconciler.tetragram, 'lg')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 12 ASTROLOGICAL HOUSES */}
          {activeTab === 'houses' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-100">
                    Geomantic Astrological House Inscription
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-serif">
                    The 12 figures mapped into their respective natal houses of destiny and life spheres.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                  12 Astrological Spheres
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {shieldChart.houses.map((h) => (
                  <div
                    key={h.houseNumber}
                    className="bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-4.5 space-y-2.5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                        House {h.houseNumber} • {h.zodiacRuler}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded">
                        {h.aspectToAscendant}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 shrink-0">
                        {renderTetragramDots(h.figure.tetragram, 'sm')}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-stone-100">
                          {h.houseTitle}: {h.figure.name}
                        </h4>
                        <p className="text-xs font-serif text-amber-300/90 font-medium">{h.traditionalSphere}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-serif text-stone-300 leading-relaxed pt-1 border-t border-stone-800/80">
                      {h.interpretation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PLANETARY HOURS & EPHEMERIS */}
          {activeTab === 'ephemeris' && (
            <div className="space-y-6">
              <div className="bg-stone-950 border border-amber-500/40 rounded-3xl p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                      Real-Time Astronomical & Chaldean Ephemeris
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mt-1">
                      Planetary Station of {planetaryHours.dayOfWeek}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5" /> Day Ruler: {planetaryHours.dayRuler}
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Hour Ruler: {planetaryHours.hourRuler}
                    </span>
                  </div>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-mono text-stone-400 uppercase">Lunar Phase & Age</span>
                    <div className="text-base font-serif font-bold text-stone-100 flex items-center gap-2">
                      <Moon className="w-4 h-4 text-cyan-300" />
                      <span>{planetaryHours.lunarPhaseName}</span>
                    </div>
                    <p className="text-xs font-mono text-stone-400">
                      {planetaryHours.lunarAgeDays} days old • {planetaryHours.lunarIlluminationPercent}% Illumination
                    </p>
                  </div>

                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-mono text-stone-400 uppercase">Chaldean Sequence</span>
                    <div className="text-base font-serif font-bold text-stone-100">
                      Hour {planetaryHours.chaldeanSequenceIndex} of 24
                    </div>
                    <p className="text-xs font-mono text-stone-400">
                      Solar Altitude: {planetaryHours.solarAltitudeDeg}° above horizon
                    </p>
                  </div>

                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-mono text-stone-400 uppercase">Active 28th Lunar Mansion</span>
                    <div className="text-base font-serif font-bold text-amber-300 truncate">
                      Mansion {planetaryHours.lunarMansion.number}: {planetaryHours.lunarMansion.arabicName}
                    </div>
                    <p className="text-xs font-serif text-stone-300 truncate">
                      {planetaryHours.lunarMansion.name}
                    </p>
                  </div>
                </div>

                {/* Lunar Mansion Detail Card */}
                <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-amber-200">
                      Lunar Mansion Influence: {planetaryHours.lunarMansion.name} ({planetaryHours.lunarMansion.arabicName})
                    </h4>
                    <span className="text-xs font-mono text-amber-300">
                      Mansion #{planetaryHours.lunarMansion.number} of 28
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed">
                    {planetaryHours.lunarMansion.meaning}. The Earth is currently tuned to receive the crystalline vibration of <strong>{planetaryHours.lunarMansion.stoneResonance}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: I CHING 64-HEXAGRAM MATRIX */}
          {activeTab === 'iching' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-100">
                    I Ching King Wen Mathematical Binary Resonance
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-serif">
                    Binary translation from classical geomancy into the 64 Hexagrams of the Book of Changes.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                  6-Line Binary Transformation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Primary Hexagram */}
                <div className="bg-stone-950 border border-amber-500/40 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                      Primary Hexagram #{primaryIChing.number}
                    </span>
                    <span className="text-3xl font-serif font-bold text-amber-300">
                      {primaryIChing.hexagramSymbol}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-stone-100">
                    {primaryIChing.name}
                  </h4>

                  {/* 6 Lines */}
                  <div className="flex flex-col-reverse gap-2 py-2">
                    {primaryIChing.lines.map((line, idx) => {
                      const lineNum = idx + 1;
                      const isMoving = movingLineIndices.includes(lineNum);
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-stone-500 w-8">Line {lineNum}</span>
                          <div className="flex-1 flex items-center justify-center">
                            {line === 1 ? (
                              <div className={`w-full h-3 rounded ${isMoving ? 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-stone-300'}`} />
                            ) : (
                              <div className="w-full flex items-center justify-between gap-3">
                                <div className={`flex-1 h-3 rounded ${isMoving ? 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-stone-300'}`} />
                                <div className={`flex-1 h-3 rounded ${isMoving ? 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-stone-300'}`} />
                              </div>
                            )}
                          </div>
                          {isMoving && (
                            <span className="text-[10px] font-mono text-amber-400 font-bold">● Changing</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800">
                    <strong>Judgment:</strong> {primaryIChing.judgment}
                  </p>
                </div>

                {/* Transformed Future Hexagram */}
                <div className="bg-stone-950 border border-emerald-500/40 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      Transformed Future Hexagram #{transformedIChing.number}
                    </span>
                    <span className="text-3xl font-serif font-bold text-emerald-300">
                      {transformedIChing.hexagramSymbol}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-stone-100">
                    {transformedIChing.name}
                  </h4>

                  {/* 6 Lines */}
                  <div className="flex flex-col-reverse gap-2 py-2">
                    {transformedIChing.lines.map((line, idx) => {
                      const lineNum = idx + 1;
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-stone-500 w-8">Line {lineNum}</span>
                          <div className="flex-1 flex items-center justify-center">
                            {line === 1 ? (
                              <div className="w-full h-3 rounded bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            ) : (
                              <div className="w-full flex items-center justify-between gap-3">
                                <div className="flex-1 h-3 rounded bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <div className="flex-1 h-3 rounded bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800">
                    <strong>Future Outcome:</strong> {transformedIChing.judgment}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SUBTERRANEAN TECTONIC STRESS */}
          {activeTab === 'tectonics' && (
            <div className="space-y-6">
              <div className="bg-stone-950 border border-amber-500/40 rounded-3xl p-6 space-y-5">
                <div className="border-b border-stone-800 pb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    Lithospheric Crust & Mantle Stress Tensor
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mt-1">
                    {mockMine.name} • {mockMine.location} ({mockMine.country})
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-serif mt-1">
                    Geological coordinates: Lat {mockMine.lat}°, Lng {mockMine.lng}° | Depth: -{mockMine.depthMeters}m ({mockMine.depthCategory})
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-mono text-stone-400 uppercase">Nearest Plate Boundary</span>
                    <div className="text-sm font-serif font-bold text-stone-100 truncate">
                      {tectonicResonance.nearestBoundaryName}
                    </div>
                    <p className="text-xs font-mono text-amber-300">{tectonicResonance.distanceToBoundaryKm} km distance ({tectonicResonance.boundaryType})</p>
                  </div>

                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-mono text-stone-400 uppercase">Crustal Pressure</span>
                    <div className="text-base font-serif font-bold text-stone-100">
                      {tectonicResonance.crustalStressMpa} MPa
                    </div>
                    <p className="text-xs font-mono text-stone-400">Lithostatic Bedrock Weight</p>
                  </div>

                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-mono text-stone-400 uppercase">Geothermal Gradient</span>
                    <div className="text-base font-serif font-bold text-stone-100">
                      {tectonicResonance.geothermalTempCelsius}°C Core
                    </div>
                    <p className="text-xs font-mono text-stone-400">Hydrothermal Inflow Zone</p>
                  </div>

                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-mono text-stone-400 uppercase">Piezoelectric Resonance</span>
                    <div className="text-base font-serif font-bold text-amber-300">
                      {tectonicResonance.piezoElectricResonanceHz} Hz
                    </div>
                    <p className="text-xs font-mono text-stone-400">Mineral Crystal Harmonic</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-amber-200">
                    Mineral Crystal Conductivity & Geological Prescription:
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif">
                    {tectonicResonance.mineralLatticeConductivity}. The mineral ore body at this depth resonates with the seeker's inquiry, transmuting high-pressure stress into durable sovereign clarity.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Modal Figure Detail Overlay if a figure is clicked */}
          {selectedFigure && (
            <div className="p-5 rounded-2xl bg-stone-950 border-2 border-amber-400/80 shadow-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                    {renderTetragramDots(selectedFigure.tetragram, 'sm')}
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-amber-200">
                      {selectedFigure.name} ({selectedFigure.latinName})
                    </h4>
                    <p className="text-xs font-mono text-stone-400">
                      Arabic: {selectedFigure.arabicName} • Ruler: {selectedFigure.planetaryRuler} • Sign: {selectedFigure.zodiacSign}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFigure(null)}
                  className="text-xs font-mono text-stone-400 hover:text-white px-2.5 py-1 rounded bg-stone-900 border border-stone-800"
                >
                  Close
                </button>
              </div>
              <p className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed">
                <strong>Divination Meaning:</strong> {selectedFigure.innerEssence}
              </p>
              <p className="text-xs font-serif text-amber-300/90 leading-relaxed">
                <strong>Subterranean Mantle Resonance:</strong> {selectedFigure.mantleResonance}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="text-xs font-serif text-stone-400">
            Harmonized across Gerard of Cremona Geomancy, Ptolemaic Ephemeris, and I Ching 64-Hexagrams
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-sm transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.25)]"
          >
            Close Divination System
          </button>
        </div>
      </div>
    </div>
  );
};
