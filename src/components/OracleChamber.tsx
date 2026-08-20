import React, { useState } from 'react';
import { WorldMine, SpreadType, DrawnMine, DivinationReading, OracleInterpretation } from '../types';
import { WORLD_MINES, SPREAD_DEFINITIONS } from '../data/mines';
import { MineCard } from './MineCard';
import { sound } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Compass,
  Sparkles,
  RefreshCw,
  Bookmark,
  Share2,
  Check,
  Flame,
  Layers,
  ShieldAlert,
  Feather,
  Wand2,
  ChevronRight,
  Calendar,
  Clock,
  Gem,
  Activity,
  Milestone,
  CheckCircle2,
  Hourglass,
  Crosshair,
  ArrowUpRight,
} from 'lucide-react';

interface OracleChamberProps {
  onSaveReading: (reading: DivinationReading) => void;
  onOpenMineModal: (mine: WorldMine) => void;
  initialSpreadType?: SpreadType;
  preselectedMines?: WorldMine[];
}

export const OracleChamber: React.FC<OracleChamberProps> = ({
  onSaveReading,
  onOpenMineModal,
  initialSpreadType = 'strata3',
  preselectedMines,
}) => {
  // Date calculation helpers
  const getPresetDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  const [question, setQuestion] = useState<string>('');
  const [spreadType, setSpreadType] = useState<SpreadType>(initialSpreadType);
  const [futureDate, setFutureDate] = useState<string>(getPresetDate(90)); // Default 3 months out
  const [timeHorizon, setTimeHorizon] = useState<string>('3 Months Ahead (Next Quarter)');
  const [step, setStep] = useState<'inscribe' | 'excavate' | 'commune'>('inscribe');
  const [drawnMines, setDrawnMines] = useState<DrawnMine[]>([]);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [interpretation, setInterpretation] = useState<OracleInterpretation | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  const selectedSpread =
    SPREAD_DEFINITIONS.find((s) => s.id === spreadType) || SPREAD_DEFINITIONS[1];

  const PRESET_HORIZONS = [
    { label: '30 Days', date: getPresetDate(30), horizon: '1 Month Forward (Immediate Strata)' },
    { label: '90 Days', date: getPresetDate(90), horizon: '3 Months Ahead (Next Quarter)' },
    { label: '6 Months', date: getPresetDate(180), horizon: '6 Months (Next Solar Seam)' },
    { label: '1 Year', date: getPresetDate(365), horizon: '1 Year Forward (Annual Cycle)' },
    { label: 'Solstice/Equinox', date: getPresetDate(120), horizon: 'Next Astronomical Transit' },
    { label: '2027 Macro Era', date: '2027-01-01', horizon: '2027 Long-Range Horizon' },
  ];

  const handleStartExcavation = () => {
    sound.startSubterraneanDrone();
    sound.playSeismicStrike();
    setIsShuffling(true);

    setTimeout(() => {
      // Shuffle algorithm with random orientation across full world mines database
      let pool = [...WORLD_MINES];
      // If we have preselected mines from lithic scatter or grimoire, prioritize them
      if (preselectedMines && preselectedMines.length > 0) {
        const preselectedIds = new Set(preselectedMines.map((m) => m.id));
        pool = [
          ...preselectedMines,
          ...pool.filter((m) => !preselectedIds.has(m.id)).sort(() => Math.random() - 0.5),
        ];
      } else {
        pool.sort(() => Math.random() - 0.5);
      }

      const count = selectedSpread.cardCount;
      const chosen = pool.slice(0, count);

      const drawn: DrawnMine[] = chosen.map((mine, idx) => ({
        mine,
        isUpright: Math.random() > 0.25, // 75% upright, 25% inverted
        position: selectedSpread.positions[idx],
        resonanceStrength: Math.floor(Math.random() * 20) + 80,
      }));

      setDrawnMines(drawn);
      setIsShuffling(false);
      setStep('excavate');
    }, 1200);
  };

  const handleRevealAllAndSynthesize = async () => {
    sound.playCardReveal();
    setIsSynthesizing(true);
    setStep('commune');

    try {
      const response = await fetch('/api/oracle/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim() || 'What future events, tectonic shifts, and mineral transformations will manifest by this date?',
          spreadType: selectedSpread.name,
          targetFutureDate: futureDate,
          timeHorizon: timeHorizon,
          drawnMines: drawnMines.map((d) => ({
            mine: d.mine,
            isUpright: d.isUpright,
            positionName: d.position.name,
          })),
        }),
      });

      const data = await response.json();
      if (data.reading) {
        setInterpretation(data.reading);
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#d97706', '#10b981', '#6366f1', '#ec4899'],
        });
      }
    } catch (e) {
      console.error('Synthesis error:', e);
      // Robust Fallback interpretation with rich future predictions and prescriptions
      const leadMine = drawnMines[0]?.mine || WORLD_MINES[0];
      const outcomeMine = drawnMines[drawnMines.length - 1]?.mine || WORLD_MINES[1];

      setInterpretation({
        oracularTitle: `The Prophecy of the ${leadMine.primaryMineral} Seam`,
        mantleStrophe: `By ${futureDate || 'the appointed season'}, ancient stone will yield its core,\nThe subterranean mantle speaks what lies in store.`,
        targetFutureDate: futureDate,
        timeHorizon: timeHorizon,
        strataInterpretations: drawnMines.map((d) => ({
          position: d.position.name,
          mineName: d.mine.name,
          mineralSignificance: `${d.mine.primaryMineral} from ${d.mine.location} guides the energetic current of ${d.mine.chthonicKeyword}.`,
          revelation: d.isUpright ? d.mine.uprightMeaning : d.mine.invertedMeaning,
        })),
        tectonicSynthesis: `As the timeline progresses toward ${futureDate}, your inquiry activates the deep geological fault lines of ${drawnMines
          .map((d) => d.mine.name)
          .join(', ')}. The confluence of ${drawnMines
          .map((d) => d.mine.primaryMineral)
          .join(' and ')} signals an unavoidable tectonic realignment of your core foundations.`,
        futurePrediction: {
          manifestEvent: `A decisive breakthrough aligned with ${leadMine.primaryMineral} clarity will physically crystallize by ${futureDate}, opening a major pathway previously blocked by dense rock.`,
          dissolvingObstacle: `Fossilized hesitations and outdated structural attachments will dissolve under the geothermal heat of ${outcomeMine.name}.`,
          pivotalChoicePoint: `A critical threshold where you must choose between staying in safe shallow strata or boring deep into sovereign transformation.`,
          longTermOutcome: `Permanent elevation of your personal resonance into the enduring frequency of ${outcomeMine.primaryMineral}.`,
        },
        chthonicPrescription: {
          prescribedMinerals: [
            {
              name: `Raw ${leadMine.primaryMineral}`,
              action: `Keep on your work desk or sleep altar during the weeks leading up to ${futureDate}.`,
              resonance: `Calibrates your energetic field to ${leadMine.chthonicKeyword} and prevents emotional thermal exhaustion.`,
            },
            {
              name: `Grounding Hematite or Pyrite`,
              action: `Carry in your left pocket when engaging in pivotal negotiations.`,
              resonance: `Creates an electromagnetic shield against volatile external tectonic turbulence.`,
            },
          ],
          groundingRitual: `At the dawn of the upcoming moon phase, place a flat stone in water with rock salt, write your core intention on parchment, and bury the parchment beneath soil to anchor the timeline.`,
          mantleRemedy: `Practice daily diaphragmatic breathing to release trapped inner pressure, ensuring you do not burn out before the subterranean seam is breached.`,
          temporalMilestones: [
            {
              timeframe: 'Phase 1: Initial Core Drilling (First Month)',
              guidance: 'Clear away superficial clutter and establish firm energetic boundaries.',
            },
            {
              timeframe: 'Phase 2: Thermal Midpoint (Midway to Horizon)',
              guidance: 'Expect seismic friction or testing; hold your ground and trust the mineral core.',
            },
            {
              timeframe: `Phase 3: Bedrock Harvest (${futureDate})`,
              guidance: 'Celebrate the crystallization of your effort and secure the harvest.',
            },
          ],
        },
        shadowVein: 'Beware of forcing early extraction before the ore body has cooled and crystallized.',
        chthonicMandate: 'Hold to the bedrock truth of who you are, and let the superficial silt wash away.',
      });
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleSave = () => {
    if (!interpretation) return;
    const reading: DivinationReading = {
      id: 'reading_' + Date.now(),
      timestamp: Date.now(),
      question: question.trim() || 'General Inquiry of the Mantle',
      targetFutureDate: futureDate,
      timeHorizon: timeHorizon,
      spreadType,
      drawnMines,
      interpretation,
    };
    onSaveReading(reading);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopy = () => {
    if (!interpretation) return;
    const text = `✦ CHTHONIC ORACLE PROPHECY & PRESCRIPTION ✦\n` +
      `Title: ${interpretation.oracularTitle}\n` +
      `Target Future Date: ${futureDate} (${timeHorizon})\n` +
      `Inquiry: "${question || 'General Mantle Inquiry'}"\n\n` +
      `Mantle Strophe:\n"${interpretation.mantleStrophe}"\n\n` +
      `─── MINES UNEARTHED ───\n` +
      drawnMines
        .map(
          (d) =>
            `• ${d.position.name}: ${d.mine.name} (${d.mine.primaryMineral}) - ${
              d.isUpright ? 'Open Vein (Upright)' : 'Deep Pressure (Inverted)'
            }`
        )
        .join('\n') +
      `\n\n─── FUTURE PREDICTION (BY ${futureDate}) ───\n` +
      (interpretation.futurePrediction
        ? `• Manifesting Event: ${interpretation.futurePrediction.manifestEvent}\n` +
          `• Dissolving Obstacle: ${interpretation.futurePrediction.dissolvingObstacle}\n` +
          `• Pivotal Choice Point: ${interpretation.futurePrediction.pivotalChoicePoint}\n` +
          `• Bedrock Destiny: ${interpretation.futurePrediction.longTermOutcome}\n\n`
        : '') +
      `─── CHTHONIC PRESCRIPTION ───\n` +
      (interpretation.chthonicPrescription
        ? `• Prescribed Minerals: ${interpretation.chthonicPrescription.prescribedMinerals
            .map((m) => `${m.name} (${m.action})`)
            .join('; ')}\n` +
          `• Grounding Ritual: ${interpretation.chthonicPrescription.groundingRitual}\n` +
          `• Mantle Remedy: ${interpretation.chthonicPrescription.mantleRemedy}\n\n`
        : '') +
      `Tectonic Synthesis:\n${interpretation.tectonicSynthesis}\n\n` +
      `Shadow Vein: ${interpretation.shadowVein}\n` +
      `Chthonic Mandate: ${interpretation.chthonicMandate}`;

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleReset = () => {
    setStep('inscribe');
    setDrawnMines([]);
    setInterpretation(null);
    setQuestion('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-serif uppercase tracking-widest text-stone-400">
        <span
          className={`flex items-center gap-1.5 transition-colors ${
            step === 'inscribe' ? 'text-amber-400 font-bold' : 'text-stone-500'
          }`}
        >
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">
            I
          </span>
          Inscribe & Target Date
        </span>
        <ChevronRight className="w-4 h-4 text-stone-700" />
        <span
          className={`flex items-center gap-1.5 transition-colors ${
            step === 'excavate' ? 'text-amber-400 font-bold' : 'text-stone-500'
          }`}
        >
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">
            II
          </span>
          Excavate All Mines
        </span>
        <ChevronRight className="w-4 h-4 text-stone-700" />
        <span
          className={`flex items-center gap-1.5 transition-colors ${
            step === 'commune' ? 'text-amber-400 font-bold' : 'text-stone-500'
          }`}
        >
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">
            III
          </span>
          Prophecy & Prescription
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: INSCRIBE QUESTION, TARGET FUTURE DATE & SELECT SPREAD */}
        {step === 'inscribe' && (
          <motion.div
            key="inscribe"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <Compass className="w-7 h-7" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mb-2">
              The Chthonic Future Oracle & Prophesy
            </h1>
            <p className="text-sm sm:text-base text-stone-400 max-w-xl mb-8 font-serif leading-relaxed">
              Drill forward in time into the planetary mantle. Select a future date to predict upcoming
              manifestations, dissolve subterranean blocks, and receive custom mineral prescriptions.
            </p>

            {/* Inscription Form */}
            <div className="w-full bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md mb-8 shadow-2xl text-left space-y-6">
              {/* TARGET FUTURE DATE & TIMELINE HORIZON SELECTOR */}
              <div className="bg-stone-950/70 border border-amber-500/30 rounded-2xl p-5 shadow-inner">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <label className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    1. Target Future Date for Prophecy
                  </label>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-300">
                    {timeHorizon}
                  </span>
                </div>

                {/* Preset Quick Horizon Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {PRESET_HORIZONS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        sound.playMineralClink();
                        setFutureDate(p.date);
                        setTimeHorizon(p.horizon);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-serif transition-all text-left flex items-center justify-between border ${
                        futureDate === p.date
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <span>{p.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>

                {/* Custom Date Input */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full relative">
                    <input
                      type="date"
                      value={futureDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setFutureDate(e.target.value);
                        setTimeHorizon(`Custom Date: ${e.target.value}`);
                      }}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-100 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="w-full sm:w-auto text-xs text-stone-400 font-serif whitespace-nowrap flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Planetary time will align with this epoch
                  </div>
                </div>
              </div>

              {/* Inquiry Textarea */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-amber-400 font-semibold mb-2">
                  2. Inscribe Your Future Inquiry or Intention
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. What will manifest in my life by this date? What tectonic obstacles will dissolve, and what mineral remedy is prescribed?"
                  rows={3}
                  className="w-full bg-stone-950/80 border border-stone-800 rounded-2xl p-4 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500/60 transition-colors font-serif text-sm sm:text-base resize-none shadow-inner"
                />
              </div>

              {/* Spread Selector */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-stone-400 font-semibold mb-3">
                  3. Select Excavation Spread Architecture
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPREAD_DEFINITIONS.map((spread) => (
                    <div
                      key={spread.id}
                      onClick={() => {
                        sound.playMineralClink();
                        setSpreadType(spread.id as SpreadType);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        spreadType === spread.id
                          ? 'bg-amber-950/40 border-amber-500/60 text-stone-100 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                          : 'bg-stone-950/40 border-stone-800/80 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-serif font-bold text-amber-300">
                          {spread.name}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300">
                          {spread.cardCount} {spread.cardCount === 1 ? 'Mine' : 'Mines'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed font-serif">
                        {spread.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleStartExcavation}
              disabled={isShuffling}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-serif font-bold text-base tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_45px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 text-stone-950" />
              {isShuffling ? 'Communing with 50+ World Mines...' : `Unveil Prophecy for ${futureDate}`}
            </button>
          </motion.div>
        )}

        {/* STEP 2: EXCAVATE CARDS */}
        {step === 'excavate' && (
          <motion.div
            key="excavate"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xs font-serif uppercase tracking-widest text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/20">
                  {selectedSpread.name}
                </span>
                <span className="text-xs font-mono text-stone-300 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" /> Target: {futureDate}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                Excavating the World Mine Constellation
              </h2>
              {question && (
                <p className="text-xs sm:text-sm text-stone-400 italic mt-1 font-serif">
                  "{question}"
                </p>
              )}
            </div>

            {/* Displaying Drawn Cards in Sacred Geometry Grid */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 my-6">
              {drawnMines.map((drawn, idx) => (
                <motion.div
                  key={drawn.mine.id + idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <MineCard
                    mine={drawn.mine}
                    isUpright={drawn.isUpright}
                    isRevealed={true}
                    positionLabel={drawn.position.name}
                    strataDepth={drawn.position.strataDepth}
                    showDetailsModal={() => onOpenMineModal(drawn.mine)}
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 flex-wrap justify-center">
              <button
                onClick={handleStartExcavation}
                className="px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-serif flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Re-drill World Seams
              </button>
              <button
                onClick={handleRevealAllAndSynthesize}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4 text-stone-950" />
                Pronounce Future Prophecy & Prescription
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: COMMUNE (AI PROPHETIC SYNTHESIS & PRESCRIPTION) */}
        {step === 'commune' && (
          <motion.div
            key="commune"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            {isSynthesizing ? (
              <div className="py-24 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mb-6" />
                <h3 className="text-2xl font-serif font-bold text-stone-200 mb-2">
                  Channeling Future Prophecy for {futureDate}...
                </h3>
                <p className="text-sm text-stone-400 font-serif max-w-md">
                  Analyzing hydrothermal pressure, tectonic alignments, and mineral resonance of the
                  drawn mines across planetary time.
                </p>
              </div>
            ) : interpretation ? (
              <div className="w-full max-w-4xl space-y-8">
                {/* Header Prophecy Box */}
                <div className="bg-gradient-to-b from-amber-950/40 via-stone-900/70 to-stone-950 border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]" />

                  {/* Target Horizon Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs mb-3 shadow-inner">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>TARGET PROPHETIC HORIZON: {futureDate}</span>
                    <span className="opacity-40">•</span>
                    <span>{timeHorizon}</span>
                  </div>

                  <span className="text-xs font-serif uppercase tracking-[0.3em] text-amber-400 font-semibold mb-2 block">
                    THE CHTHONIC FUTURE PRONOUNCEMENT
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-4 tracking-tight">
                    {interpretation.oracularTitle}
                  </h1>
                  <p className="text-base sm:text-lg text-amber-200/90 font-serif italic max-w-2xl mx-auto leading-relaxed border-y border-amber-500/20 py-3">
                    "{interpretation.mantleStrophe}"
                  </p>

                  {question && (
                    <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-stone-950/70 border border-stone-800 text-xs text-stone-300 font-mono">
                      Inquiry: "{question}"
                    </div>
                  )}
                </div>

                {/* FUTURE PREDICTION: THE 4 PILLARS OF PROGNOSIS */}
                {interpretation.futurePrediction && (
                  <div className="bg-stone-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                          <Hourglass className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-serif uppercase tracking-widest text-amber-300 font-bold">
                            Future Prognostication & Horizon Arrival
                          </h3>
                          <p className="text-xs text-stone-400 font-serif">
                            What will physically manifest, dissolve, and crystallize by {futureDate}
                          </p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block text-[11px] font-mono text-amber-400/80 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/20">
                        {timeHorizon}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 1. Manifesting Event */}
                      <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-serif uppercase tracking-wider text-amber-300 font-bold">
                            1. Manifesting Breakthrough (By {futureDate})
                          </h4>
                        </div>
                        <p className="text-sm text-stone-200 font-serif leading-relaxed">
                          {interpretation.futurePrediction.manifestEvent}
                        </p>
                      </div>

                      {/* 2. Dissolving Obstacle */}
                      <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-indigo-400" />
                          <h4 className="text-xs font-serif uppercase tracking-wider text-indigo-300 font-bold">
                            2. Dissolving Obstacle & Resistance
                          </h4>
                        </div>
                        <p className="text-sm text-stone-200 font-serif leading-relaxed">
                          {interpretation.futurePrediction.dissolvingObstacle}
                        </p>
                      </div>

                      {/* 3. Pivotal Crossroads */}
                      <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                          <Crosshair className="w-4 h-4 text-rose-400" />
                          <h4 className="text-xs font-serif uppercase tracking-wider text-rose-300 font-bold">
                            3. Pivotal Crossroads / Seismic Threshold
                          </h4>
                        </div>
                        <p className="text-sm text-stone-200 font-serif leading-relaxed">
                          {interpretation.futurePrediction.pivotalChoicePoint}
                        </p>
                      </div>

                      {/* 4. Bedrock Outcome */}
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-xs font-serif uppercase tracking-wider text-emerald-300 font-bold">
                            4. Bedrock Destiny (Permanent Realization)
                          </h4>
                        </div>
                        <p className="text-sm text-stone-200 font-serif leading-relaxed">
                          {interpretation.futurePrediction.longTermOutcome}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CHTHONIC PRESCRIPTION: MINERALS, GROUNDING RITUAL & ROADMAP */}
                {interpretation.chthonicPrescription && (
                  <div className="bg-stone-900/60 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
                    <div className="flex items-center gap-2.5 pb-4 border-b border-stone-800">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Gem className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-serif uppercase tracking-widest text-emerald-300 font-bold">
                          The Chthonic Prescription & Planetary Remedies
                        </h3>
                        <p className="text-xs text-stone-400 font-serif">
                          Prescribed minerals and sacred practices to stabilize your field leading up to {futureDate}
                        </p>
                      </div>
                    </div>

                    {/* Prescribed Minerals Cards */}
                    <div>
                      <h4 className="text-xs font-serif uppercase tracking-widest text-stone-400 font-bold mb-3 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Prescribed Mineral Elements & Gemstones
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {interpretation.chthonicPrescription.prescribedMinerals.map((min, idx) => (
                          <div
                            key={idx}
                            className="bg-stone-950/80 border border-stone-800 rounded-2xl p-4 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-serif font-bold text-amber-300">
                                  {min.name}
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                                  Prescription #{idx + 1}
                                </span>
                              </div>
                              <p className="text-xs text-stone-300 font-serif mb-2 leading-relaxed">
                                <strong className="text-stone-400">Application:</strong> {min.action}
                              </p>
                            </div>
                            <p className="text-[11px] text-stone-400 italic font-serif border-t border-stone-800/60 pt-2">
                              {min.resonance}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Grounding Ritual & Mantle Remedy */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-5">
                        <h4 className="text-xs font-serif uppercase tracking-widest text-emerald-400 font-bold mb-2 flex items-center gap-2">
                          <Flame className="w-4 h-4" />
                          Sacred Grounding Ritual
                        </h4>
                        <p className="text-sm text-stone-300 font-serif leading-relaxed">
                          {interpretation.chthonicPrescription.groundingRitual}
                        </p>
                      </div>

                      <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-5">
                        <h4 className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4" />
                          Mantle Pressure Remedy
                        </h4>
                        <p className="text-sm text-stone-300 font-serif leading-relaxed">
                          {interpretation.chthonicPrescription.mantleRemedy}
                        </p>
                      </div>
                    </div>

                    {/* Temporal Milestones Roadmap */}
                    {interpretation.chthonicPrescription.temporalMilestones &&
                      interpretation.chthonicPrescription.temporalMilestones.length > 0 && (
                        <div className="bg-stone-950/90 border border-stone-800 rounded-2xl p-5">
                          <h4 className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold mb-4 flex items-center gap-2">
                            <Milestone className="w-4 h-4" />
                            Chronological Milestones (Path to {futureDate})
                          </h4>
                          <div className="space-y-4">
                            {interpretation.chthonicPrescription.temporalMilestones.map((ms, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </div>
                                <div className="text-left">
                                  <span className="text-xs font-serif font-bold text-stone-200 block mb-0.5">
                                    {ms.timeframe}
                                  </span>
                                  <p className="text-xs text-stone-400 font-serif leading-relaxed">
                                    {ms.guidance}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* Drawn Mines Constellation Row */}
                <div className="bg-stone-900/40 border border-stone-800/80 rounded-3xl p-6 sm:p-8">
                  <h3 className="text-xs font-serif uppercase tracking-widest text-stone-400 font-semibold mb-6 text-center">
                    Drawn Mines & Cartographic Spirits in Alignment
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    {drawnMines.map((drawn, idx) => (
                      <div key={idx} className="scale-90 sm:scale-95">
                        <MineCard
                          mine={drawn.mine}
                          isUpright={drawn.isUpright}
                          isRevealed={true}
                          size="sm"
                          positionLabel={drawn.position.name}
                          strataDepth={drawn.position.strataDepth}
                          showDetailsModal={() => onOpenMineModal(drawn.mine)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strata-by-Strata Decryption */}
                {interpretation.strataInterpretations &&
                  interpretation.strataInterpretations.length > 0 && (
                    <div className="bg-stone-900/40 border border-stone-800/80 rounded-3xl p-6 sm:p-8">
                      <h3 className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold mb-6 flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Strata-by-Strata Decryption
                      </h3>
                      <div className="space-y-6">
                        {interpretation.strataInterpretations.map((strata, idx) => (
                          <div
                            key={idx}
                            className="border-b border-stone-800/60 pb-5 last:border-none last:pb-0"
                          >
                            <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                              <span className="text-sm font-serif font-bold text-amber-300">
                                {strata.position}
                              </span>
                              <span className="text-xs font-mono text-stone-400 px-2 py-0.5 rounded bg-stone-950 border border-stone-800">
                                {strata.mineName}
                              </span>
                            </div>
                            <p className="text-xs text-stone-400 mb-2 italic font-serif">
                              {strata.mineralSignificance}
                            </p>
                            <p className="text-sm text-stone-200 leading-relaxed font-serif">
                              {strata.revelation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Master Tectonic Synthesis */}
                <div className="bg-stone-900/50 border border-stone-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
                  <h3 className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold mb-4 flex items-center gap-2">
                    <Feather className="w-4 h-4" />
                    Tectonic Convergence & Synthesis
                  </h3>
                  <div className="text-sm sm:text-base text-stone-200 leading-relaxed font-serif space-y-4">
                    {interpretation.tectonicSynthesis}
                  </div>
                </div>

                {/* Dual Guidance: Shadow Vein & Chthonic Mandate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-5">
                    <h4 className="text-xs font-serif uppercase tracking-widest text-rose-400 font-bold mb-2 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      The Shadow Vein (Hidden Risk)
                    </h4>
                    <p className="text-sm text-stone-300 leading-relaxed font-serif">
                      {interpretation.shadowVein}
                    </p>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-5">
                    <h4 className="text-xs font-serif uppercase tracking-widest text-emerald-400 font-bold mb-2 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-emerald-400" />
                      The Chthonic Mandate (Grounding Action)
                    </h4>
                    <p className="text-sm text-stone-300 leading-relaxed font-serif">
                      {interpretation.chthonicMandate}
                    </p>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-serif flex items-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> Begin New Prophecy
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-serif flex items-center gap-2 transition-colors"
                    >
                      {copiedSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Copied Prophecy & Prescription</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          <span>Copy Prophecy & Prescription</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleSave}
                      className={`px-5 py-2.5 rounded-xl text-xs font-serif flex items-center gap-2 transition-all ${
                        savedSuccess
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      }`}
                    >
                      {savedSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Saved to Journal</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4" />
                          <span>Save to Journal</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
