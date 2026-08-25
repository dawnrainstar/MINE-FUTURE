import React, { useState } from 'react';
import { WorldMine, SpreadType, DrawnMine, DivinationReading, OracleInterpretation } from '../types';
import { WORLD_MINES, SPREAD_DEFINITIONS } from '../data/mines';
import { MineCard } from './MineCard';
import { sound } from '../utils/audio';
import { generateTitaness } from '../utils/titanessEngine';
import { geomanticPrediction } from '../utils/geomanticPrediction';
import { detectGeometricPattern, calculateDateGeometry } from '../data/pennickEngine';
import { GeometricShapeSvg } from './GeometricShapeSvg';
import { CartographicFigureSvg } from './CartographicFigureSvg';
import { latLngToMapCoords, TECTONIC_PLATES_PATHS } from '../utils/geo';
import { exportReadingAsScroll, exportReadingAsHtml, exportReadingAsJson } from '../utils/offlineEngine';
import {
  getCommercialSettings,
  getMineralPurchaseLink,
  consumeCredit,
  getUserCredits,
  downloadClientDeliveryPack,
} from '../utils/commercialEngine';
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
  Zap,
  CircleDot,
  HeartCrack,
  Download,
  MapPin,
  Globe,
  Maximize2,
  FileText,
  FileCode,
  Printer,
  ChevronDown,
  ExternalLink,
  ShoppingBag,
  UserCheck,
} from 'lucide-react';

interface OracleChamberProps {
  mines?: WorldMine[];
  onSaveReading: (reading: DivinationReading) => void;
  onOpenMineModal: (mine: WorldMine) => void;
  initialSpreadType?: SpreadType;
  preselectedMines?: WorldMine[];
}

export const OracleChamber: React.FC<OracleChamberProps> = ({
  mines,
  onSaveReading,
  onOpenMineModal,
  initialSpreadType = 'single',
  preselectedMines,
}) => {
  // Date calculation helpers
  const getPresetDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  const [question, setQuestion] = useState<string>('');
  const [spreadType, setSpreadType] = useState<SpreadType>('single');
  const [futureDate, setFutureDate] = useState<string>(getPresetDate(90)); // Default 3 months out
  const [timeHorizon, setTimeHorizon] = useState<string>('3 Months Ahead (Next Quarter)');
  const [step, setStep] = useState<'inscribe' | 'excavate' | 'commune'>('inscribe');
  const [drawnMines, setDrawnMines] = useState<DrawnMine[]>([]);
  const [lastDrawnMineId, setLastDrawnMineId] = useState<string | null>(null);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [interpretation, setInterpretation] = useState<OracleInterpretation | null>(null);
  const [isHealingMotionActive, setIsHealingMotionActive] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState<boolean>(false);
  const [downloadedFeedback, setDownloadedFeedback] = useState<string | null>(null);

  const handleDownloadReading = (format: 'txt' | 'html' | 'json') => {
    if (!interpretation) return;
    sound.playChime();
    const readingPayload: DivinationReading = {
      id: 'reading_' + Date.now(),
      timestamp: Date.now(),
      question: question.trim() || 'General Inquiry of the Mantle',
      targetFutureDate: futureDate,
      timeHorizon: timeHorizon,
      spreadType,
      drawnMines,
      interpretation,
    };

    if (format === 'txt') {
      exportReadingAsScroll(readingPayload);
      setDownloadedFeedback('Complete Scroll (.txt) Downloaded!');
    } else if (format === 'html') {
      exportReadingAsHtml(readingPayload);
      setDownloadedFeedback('Illuminated Document (.html) Downloaded!');
    } else if (format === 'json') {
      exportReadingAsJson(readingPayload);
      setDownloadedFeedback('Prophecy Data (.json) Downloaded!');
    }
    setTimeout(() => setDownloadedFeedback(null), 3500);
    setDownloadMenuOpen(false);
  };

  const handleDeliverToClient = () => {
    if (!interpretation) return;
    sound.playChime();
    const readingPayload: DivinationReading = {
      id: 'reading_' + Date.now(),
      timestamp: Date.now(),
      question: question.trim() || 'General Inquiry of the Mantle',
      targetFutureDate: futureDate,
      timeHorizon: timeHorizon,
      spreadType,
      drawnMines,
      interpretation,
    };
    const settings = getCommercialSettings();
    downloadClientDeliveryPack(
      {
        id: 'order_' + Date.now(),
        orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
        createdAt: Date.now(),
        clientName: 'Valued Seeker',
        inquiry: question.trim() || 'General Inquiry of the Mantle',
        targetDate: futureDate,
        spreadType,
        practitionerNote: 'Inscribed and sealed in subterranean resonance.',
        pricePaid: settings.singleReadingPrice,
        status: 'completed',
      },
      readingPayload,
      settings
    );
    setDownloadedFeedback('Client Delivery Certificate (.html) Downloaded!');
    setTimeout(() => setDownloadedFeedback(null), 3500);
  };

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
      let pool = [...(mines && mines.length > 0 ? mines : WORLD_MINES)];
      
      // Ensure we pick a fresh, different mine every consecutive draw
      if (lastDrawnMineId && pool.length > 1) {
        pool = pool.filter((m) => m.id !== lastDrawnMineId);
      }

      let chosenMine: WorldMine;

      // If we have preselected mines from lithic scatter or grimoire, prioritize them
      if (preselectedMines && preselectedMines.length > 0) {
        const candidates = preselectedMines.filter((m) => m.id !== lastDrawnMineId);
        chosenMine = candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : preselectedMines[Math.floor(Math.random() * preselectedMines.length)];
      } else {
        // Date & Sacred Geometry Synchronization:
        // Calculate solar orbital phase from the target future date
        const targetDateObj = new Date(futureDate || new Date().toISOString().split('T')[0]);
        const startOfYear = new Date(targetDateObj.getFullYear(), 0, 1);
        const dayOfYear = Math.max(1, Math.floor((targetDateObj.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)));
        const datePhase = (dayOfYear / 365.25) * 2 * Math.PI;

        // Rank mines by harmonic resonance between date phase and geographic/mineral geometry
        const scored = pool.map((mine) => {
          const latRad = ((mine.lat || 0) * Math.PI) / 180;
          const lonRad = ((mine.lng || 0) * Math.PI) / 180;
          const depthRatio = (mine.depthMeters || 600) / 4000;
          const geomResonance = Math.abs(Math.sin(latRad + datePhase) * Math.cos(lonRad - datePhase) + depthRatio);
          const entropy = Math.random() * 0.45;
          return {
            mine,
            score: geomResonance + entropy,
          };
        });

        scored.sort((a, b) => b.score - a.score);
        const topSlice = scored.slice(0, Math.min(12, scored.length));
        chosenMine = topSlice[Math.floor(Math.random() * topSlice.length)].mine;
      }

      setLastDrawnMineId(chosenMine.id);

      const drawn: DrawnMine[] = [
        {
          mine: chosenMine,
          isUpright: Math.random() > 0.25, // 75% upright, 25% inverted
          position: {
            id: 'monolith_seam',
            name: `Monolith Seam (${futureDate})`,
            description: `Synchronized with ${chosenMine.primaryMineral} crystal geometry and epoch ${futureDate}`,
            strataDepth: `${chosenMine.depthCategory} Depth (-${chosenMine.depthMeters}m)`,
          },
          resonanceStrength: Math.floor(Math.random() * 15) + 85,
        },
      ];

      setDrawnMines(drawn);
      setIsShuffling(false);
      setStep('excavate');
    }, 1100);
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
          spreadType: 'Monolith Seam (Single Mine Alignment)',
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
      if (!response.ok || !data || !data.reading) {
        throw new Error(data?.error || `Server returned status ${response.status}`);
      }

      setInterpretation(data.reading);
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#10b981', '#6366f1', '#ec4899'],
      });
    } catch (e) {
      console.error('Synthesis fallback triggered:', e);
      // Robust Fallback interpretation with rich future predictions and prescriptions
      const leadMine = drawnMines[0]?.mine || WORLD_MINES[0];
      const outcomeMine = drawnMines[drawnMines.length - 1]?.mine || WORLD_MINES[1];
      const dateGeom = calculateDateGeometry(futureDate);

      setInterpretation({
        oracularTitle: `The Prophecy of the ${leadMine.primaryMineral} Seam`,
        mantleStrophe: `By ${futureDate || 'the appointed season'}, ancient stone will yield its core,\nThe subterranean mantle speaks what lies in store;\nThrough ${leadMine.name} the sacred geometry flows,\nTo manifest above what the date's alignment shows.`,
        targetFutureDate: futureDate,
        timeHorizon: timeHorizon,
        strataInterpretations: drawnMines.map((d) => ({
          position: d.position.name,
          mineName: d.mine.name,
          mineralSignificance: `${d.mine.primaryMineral} from ${d.mine.location} (Coordinates ${d.mine.latitude || d.mine.lat}°, ${d.mine.longitude || d.mine.lng}°) aligns directly with the ${dateGeom.geometricFigure} (${dateGeom.solarPhaseAngleDeg}° solar angle).`,
          revelation: d.isUpright ? d.mine.uprightMeaning : d.mine.invertedMeaning,
        })),
        tectonicSynthesis: `Everything in this prophecy is fundamentally determined by the sacred geometry of ${futureDate}. The solar station of this date (${dateGeom.astronomicalStation}, solar phase angle ${dateGeom.solarPhaseAngleDeg}°) sets up a precise harmonic resonance (${dateGeom.harmonicResonanceHz}) across the planetary fault line running through ${leadMine.name} in ${leadMine.location}. As the timeline advances toward this date, the subterranean pressure within the ${leadMine.primaryMineral} seam transforms from volatile friction into a crystallized, breakthrough matrix. In this clear unfolding narrative, the resistance and delays you have experienced are not barriers—they are the intense geothermal heat required to forge an unshakeable bedrock foundation. By the time this date arrives, your path clears decisively into sovereign truth and lasting abundance.`,
        futurePrediction: {
          manifestEvent: `A decisive and tangible breakthrough aligned with ${leadMine.primaryMineral} clarity will physically crystallize by ${futureDate}, opening a major pathway previously blocked by dense rock.`,
          dissolvingObstacle: `Fossilized hesitations, obsolete attachments, and emotional sediment will completely dissolve under the geothermal heat of ${outcomeMine.name}.`,
          pivotalChoicePoint: `A critical threshold where you must choose between remaining in comfortable shallow silt or drilling deep into your sovereign transformation.`,
          longTermOutcome: `Permanent elevation of your personal resonance into the enduring bedrock frequency of ${outcomeMine.primaryMineral}.`,
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

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#10b981'],
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
              Astrology Profesey Readings & Oracle
            </h1>
            <p className="text-sm sm:text-base text-stone-400 max-w-xl mb-8 font-serif leading-relaxed">
              Drill forward in time into planetary stations and the Earth mantle. Select a future date to predict upcoming
              astrological manifestations, dissolve subterranean blocks, and receive custom mineral prescriptions.
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

              {/* Single Mine Synchronicity & Geometric Resonance */}
              <div className="bg-stone-950/70 border border-amber-500/30 rounded-2xl p-5 shadow-inner space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                    <Gem className="w-4 h-4 text-amber-400" />
                    3. Monolith Seam Synchronicity & Geometric Resonance
                  </label>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    One Mine Focus • Aligned with {futureDate}
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-serif">
                  Divination activates a single planetary mine whose subterranean depth, crystal lattice geometry, and Titaness spirit uniquely synchronize with your target epoch (<strong>{futureDate}</strong>). Every excavation dynamically computes a fresh alignment across the global database.
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800/80">
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <CircleDot className="w-3 h-3 text-amber-400" /> 1 Unique Mine
                  </span>
                  <span>•</span>
                  <span>Pennick Earth Mystery Geometry</span>
                  <span>•</span>
                  <span>Dynamic Planetary Phase</span>
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
              {isShuffling ? 'Harmonizing Mine Geometry with Epoch...' : `Align Mine & Unveil Prophecy for ${futureDate}`}
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
                  Monolith Seam Alignment
                </span>
                <span className="text-xs font-mono text-stone-300 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" /> Synchronized: {futureDate}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                Unearthed Planetary Mine Alignment
              </h2>
              {question && (
                <p className="text-xs sm:text-sm text-stone-400 italic mt-1 font-serif">
                  "{question}"
                </p>
              )}
            </div>

            {/* Displaying Single Drawn Card */}
            <div className="flex justify-center items-center my-6">
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
                <RefreshCw className="w-4 h-4" /> Draw Different Synchronized Mine
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

                  {/* Target Horizon Badge & Download Bar */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs shadow-inner">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>TARGET PROPHETIC HORIZON: {futureDate}</span>
                      <span className="opacity-40">•</span>
                      <span>{timeHorizon}</span>
                    </div>

                    <button
                      onClick={() => handleDownloadReading('txt')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-amber-950/80 border border-stone-700 hover:border-amber-500/50 text-amber-300 text-xs font-serif transition-colors shadow-sm"
                      title="Download complete formatted scroll"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Download Reading</span>
                    </button>
                  </div>

                  {downloadedFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-3 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-950/90 border border-emerald-500 text-emerald-300 font-serif text-xs shadow-lg"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{downloadedFeedback}</span>
                    </motion.div>
                  )}

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

                {/* GEOMANTIC PREDICTION & GEOMETRIC HEALING SHAPE MODULE */}
                {(() => {
                  const leadMineItem = drawnMines[0]?.mine || WORLD_MINES[0];
                  const leadTitaness =
                    leadMineItem.titaness ||
                    generateTitaness({
                      mineral: leadMineItem.primaryMineral,
                      region: leadMineItem.location || leadMineItem.country,
                      depth: leadMineItem.depthMeters,
                    });

                  const geomanticResult = geomanticPrediction(
                    question || leadMineItem.name,
                    leadTitaness
                  );
                  const dateGeom = calculateDateGeometry(futureDate);
                  const geometricPattern = detectGeometricPattern(
                    question || `${leadMineItem.primaryMineral} ${leadMineItem.uprightMeaning}`,
                    question,
                    futureDate
                  );

                  const mapCoords = latLngToMapCoords(
                    leadMineItem.latitude || leadMineItem.lat || 0,
                    leadMineItem.longitude || leadMineItem.lng || 0
                  );

                  return (
                    <div className="space-y-6">
                      {/* DATE SACRED GEOMETRY ANCHOR BAR */}
                      <div className="bg-gradient-to-r from-amber-950/40 via-stone-900/80 to-cyan-950/40 border border-amber-500/40 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xl font-bold font-serif">
                              {dateGeom.geometricSymbol}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                                  Geometry of the Date Matrix
                                </span>
                                <span className="text-xs text-amber-300 font-mono">
                                  {futureDate} (Day {dateGeom.dayOfYear}/365)
                                </span>
                              </div>
                              <h3 className="text-base font-serif font-bold text-stone-100 mt-0.5">
                                {dateGeom.geometricFigure} — {dateGeom.astronomicalStation}
                              </h3>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                              Harmonic Resonance
                            </span>
                            <span className="text-xs font-mono font-bold text-cyan-300">
                              {dateGeom.harmonicResonanceHz}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs font-serif text-stone-300">
                          <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 block mb-1">
                              Planetary & Mantle Resonance
                            </span>
                            <p className="text-stone-200">{dateGeom.planetaryResonance}</p>
                          </div>
                          <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/90 block mb-1">
                              Elemental Hydrothermal Tide
                            </span>
                            <p className="text-stone-200">{dateGeom.elementalTide}</p>
                          </div>
                          <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 block mb-1">
                              Mantle Geometry Vector
                            </span>
                            <p className="text-stone-200">{dateGeom.mantleGeometryVector}</p>
                          </div>
                        </div>
                      </div>

                      {/* DRAWN MINE CARTOGRAPHIC MAP & LOCATION VISUALIZATION */}
                      <div className="bg-stone-900/80 border border-amber-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                              <Globe className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                                  Drawn Mine Map Coordinates
                                </span>
                                <span className="text-xs text-stone-400 font-mono">
                                  {leadMineItem.country} • Lat {leadMineItem.latitude || leadMineItem.lat}°, Lng {leadMineItem.longitude || leadMineItem.lng}°
                                </span>
                              </div>
                              <h3 className="text-lg font-serif font-bold text-stone-100 mt-0.5 flex items-center gap-2">
                                <span>{leadMineItem.name}</span>
                                <span className="text-xs font-mono font-normal text-amber-400 px-2 py-0.5 rounded-full bg-amber-950/50 border border-amber-500/30">
                                  {leadMineItem.primaryMineral}
                                </span>
                              </h3>
                            </div>
                          </div>

                          <button
                            onClick={() => onOpenMineModal(leadMineItem)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-serif flex items-center gap-1.5 transition-all bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 shadow-md"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            Inspect Mine & Cartography
                          </button>
                        </div>

                        {/* Interactive Tectonic Map Canvas with Drawn Mine Pulse */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Map Viewport */}
                          <div className="lg:col-span-8 relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#0c0a09] border border-amber-500/30 shadow-inner flex items-center justify-center">
                            {/* SVG Antique Cartography / Tectonic Plates Background */}
                            <svg
                              viewBox="0 0 1000 500"
                              className="w-full h-full object-cover select-none"
                            >
                              <defs>
                                <radialGradient id="mapVignette" cx="50%" cy="50%" r="50%">
                                  <stop offset="0%" stopColor="#1c1917" stopOpacity="0" />
                                  <stop offset="100%" stopColor="#0c0a09" stopOpacity="0.85" />
                                </radialGradient>
                                <linearGradient id="leyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                                </linearGradient>
                              </defs>

                              {/* Equator & Prime Meridian Grid */}
                              <line x1="0" y1="250" x2="1000" y2="250" stroke="#78350f" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
                              <line x1="500" y1="0" x2="500" y2="500" stroke="#78350f" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
                              <circle cx="500" cy="250" r="230" fill="none" stroke="#78350f" strokeWidth="1" strokeDasharray="2 6" opacity="0.3" />

                              {/* Tectonic Plate Boundaries */}
                              {TECTONIC_PLATES_PATHS.map((platePoints, pIdx) => {
                                const pathStr = platePoints
                                  .map((pt, i) => {
                                    const c = latLngToMapCoords(pt.lat, pt.lng);
                                    return `${i === 0 ? 'M' : 'L'} ${c.x * 10} ${c.y * 5}`;
                                  })
                                  .join(' ');
                                return (
                                  <path
                                    key={pIdx}
                                    d={pathStr}
                                    fill="none"
                                    stroke="#d97706"
                                    strokeWidth="1.5"
                                    opacity="0.35"
                                    strokeDasharray="4 2"
                                  />
                                );
                              })}

                              {/* Other World Mines as Subtle Stars */}
                              {WORLD_MINES.map((otherMine) => {
                                const pt = latLngToMapCoords(otherMine.lat, otherMine.lng);
                                const isLead = otherMine.id === leadMineItem.id;
                                if (isLead) return null;
                                return (
                                  <circle
                                    key={otherMine.id}
                                    cx={pt.x * 10}
                                    cy={pt.y * 5}
                                    r="2.5"
                                    fill={otherMine.mineralColor || '#78716c'}
                                    opacity="0.4"
                                  />
                                );
                              })}

                              {/* Sacred Date Geometry Ley Lines Radiating from the Drawn Mine */}
                              <circle
                                cx={mapCoords.x * 10}
                                cy={mapCoords.y * 5}
                                r="45"
                                fill="none"
                                stroke="url(#leyGlow)"
                                strokeWidth="1.5"
                                opacity="0.5"
                                strokeDasharray="4 3"
                                className="animate-spin"
                                style={{ transformOrigin: `${mapCoords.x * 10}px ${mapCoords.y * 5}px`, animationDuration: '24s' }}
                              />
                              <line
                                x1="0"
                                y1={mapCoords.y * 5}
                                x2="1000"
                                y2={mapCoords.y * 5}
                                stroke="#f59e0b"
                                strokeWidth="1"
                                strokeDasharray="2 4"
                                opacity="0.5"
                              />
                              <line
                                x1={mapCoords.x * 10}
                                y1="0"
                                x2={mapCoords.x * 10}
                                y2="500"
                                stroke="#f59e0b"
                                strokeWidth="1"
                                strokeDasharray="2 4"
                                opacity="0.5"
                              />

                              {/* Drawn Mine Target Pulsing Marker */}
                              <circle
                                cx={mapCoords.x * 10}
                                cy={mapCoords.y * 5}
                                r="22"
                                fill={leadMineItem.mineralColor || '#f59e0b'}
                                opacity="0.25"
                                className="animate-ping"
                              />
                              <circle
                                cx={mapCoords.x * 10}
                                cy={mapCoords.y * 5}
                                r="8"
                                fill={leadMineItem.mineralColor || '#f59e0b'}
                                stroke="#ffffff"
                                strokeWidth="2"
                                className="drop-shadow-[0_0_10px_#f59e0b]"
                              />
                              <text
                                x={mapCoords.x * 10 + 14}
                                y={mapCoords.y * 5 - 10}
                                fill="#fde68a"
                                fontSize="13"
                                fontFamily="serif"
                                fontWeight="bold"
                                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                              >
                                {leadMineItem.name} ({leadMineItem.primaryMineral})
                              </text>
                              <text
                                x={mapCoords.x * 10 + 14}
                                y={mapCoords.y * 5 + 6}
                                fill="#a8a29e"
                                fontSize="10"
                                fontFamily="monospace"
                                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                              >
                                Depth: -{leadMineItem.depthMeters}m | {leadMineItem.location}
                              </text>

                              {/* Dark Vignette Overlay */}
                              <rect width="1000" height="500" fill="url(#mapVignette)" pointerEvents="none" />
                            </svg>

                            {/* Compass Rose Inset */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-xl bg-stone-950/80 border border-stone-800 text-[10px] font-mono text-amber-400">
                              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '40s' }} />
                              <span>TECTONIC PROJECTION ALIGNED</span>
                            </div>

                            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-950/70 border border-amber-500/40 text-[10px] font-mono text-amber-300">
                              <MapPin className="w-3.5 h-3.5 text-amber-400" />
                              <span>{leadMineItem.primaryMineral.toUpperCase()} SEAM ACTIVE</span>
                            </div>
                          </div>

                          {/* Drawn Mine Personified Cartographic Figure & Seam Details */}
                          <div className="lg:col-span-4 space-y-4">
                            <div className="aspect-[4/3] w-full rounded-2xl bg-stone-950 border border-amber-500/30 overflow-hidden relative group">
                              <CartographicFigureSvg mine={leadMineItem} showControls={false} />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-3 text-left">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                                  {leadMineItem.cartoucheTitle || 'Anthropomorphic Spirit'}
                                </span>
                                <h4 className="text-sm font-serif font-bold text-stone-100">
                                  {leadMineItem.feminineArchetype || leadTitaness.name}
                                </h4>
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800 text-xs font-serif text-stone-300 space-y-1.5">
                              <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                                <span>Chthonic Keyword:</span>
                                <span className="font-bold">{leadMineItem.chthonicKeyword}</span>
                              </div>
                              <p className="text-stone-300 leading-relaxed italic">
                                "{leadMineItem.mantleMessage || leadMineItem.uprightMeaning}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* GEOMANTIC PREDICTION & HEALING MOTION CARD */}
                      <div className="bg-stone-900/70 border border-amber-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                              <Wand2 className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                                  Geomantic Prediction & Healing Motion
                                </span>
                                <span className="text-xs text-stone-400 font-mono">
                                  ⚚ {geomanticResult.figure}
                                </span>
                              </div>
                              <h3 className="text-base font-serif font-bold text-stone-100 mt-0.5">
                                {geomanticResult.figure} — {geomanticResult.meaning}
                              </h3>
                            </div>
                          </div>

                          {/* Motion Toggle Button */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setIsHealingMotionActive(!isHealingMotionActive)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-serif flex items-center gap-1.5 transition-all border ${
                                isHealingMotionActive
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                                  : 'bg-stone-950 text-stone-500 border-stone-800'
                              }`}
                              title="Toggle CSS healing animation motion"
                            >
                              <Sparkles
                                className={`w-3.5 h-3.5 ${
                                  isHealingMotionActive ? 'text-amber-400 animate-spin' : 'text-stone-500'
                                }`}
                              />
                              {isHealingMotionActive ? 'Healing Motion Active' : 'Motion Paused'}
                            </button>
                          </div>
                        </div>

                        {/* 2-Column Grid: Geomantic Figure Profile & Geometric Healing Shape */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Left: Geomantic Tetragram & Temporal Horizon (5 cols) */}
                          <div className="lg:col-span-5 bg-stone-950/80 border border-stone-800/90 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start gap-4">
                              {/* Authentic 4-line Geomantic Tetragram Dots */}
                              <div className="w-16 h-24 rounded-xl bg-stone-900 border border-amber-500/30 flex flex-col justify-around py-3 px-2 shrink-0 items-center shadow-inner">
                                {(geomanticResult.tetragram || [1, 1, 1, 1]).map((dotCount, dotIdx) => (
                                  <div key={dotIdx} className="flex gap-2 justify-center items-center">
                                    {Array.from({ length: dotCount }).map((_, i) => (
                                      <div
                                        key={i}
                                        className={`w-2.5 h-2.5 rounded-full ${
                                          isHealingMotionActive
                                            ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse'
                                            : 'bg-amber-500/80'
                                        }`}
                                        style={{
                                          animationDelay: `${dotIdx * 200 + i * 100}ms`,
                                        }}
                                      />
                                    ))}
                                  </div>
                                ))}
                              </div>

                              <div className="space-y-1.5 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-mono font-bold text-amber-300">
                                    {geomanticResult.figure}
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-400 px-2 py-0.5 rounded bg-stone-900 border border-stone-800">
                                    {geomanticResult.ruler || 'Earth Mantle'}
                                  </span>
                                </div>

                                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                                  {geomanticResult.meaning}
                                </p>

                                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-1">
                                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Horizon: {geomanticResult.timeFrame}</span>
                                </div>
                              </div>
                            </div>

                            {/* Advice Box */}
                            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 font-serif leading-relaxed">
                              <strong className="text-amber-400 font-mono text-[10px] uppercase tracking-wider block mb-0.5">
                                Geomantic Advice:
                              </strong>
                              {geomanticResult.advice}
                            </div>

                            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800/80">
                              <span>Guardian: {leadTitaness.name}</span>
                              <span className="text-amber-300">Ore: {leadMineItem.primaryMineral}</span>
                            </div>
                          </div>

                          {/* Right: Geometric Pattern & CSS Animated Healing Shape (7 cols) */}
                          <div className="lg:col-span-7 bg-stone-950/80 border border-stone-800/90 rounded-2xl p-5 space-y-4">
                            <div className="flex flex-col sm:flex-row items-center gap-5">
                              {/* Animated SVG Shape with Healing Glow */}
                              <div className="relative shrink-0 flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 shadow-xl">
                                {/* Ambient halo glow */}
                                <div
                                  className={`absolute inset-0 rounded-2xl blur-xl opacity-30 transition-opacity duration-1000 ${
                                    isHealingMotionActive ? 'opacity-50' : 'opacity-10'
                                  }`}
                                  style={{
                                    backgroundColor: leadMineItem.mineralColor || '#f59e0b',
                                  }}
                                />
                                <GeometricShapeSvg
                                  pattern={geometricPattern}
                                  color={leadMineItem.mineralColor || '#f59e0b'}
                                  size={120}
                                  isAnimated={isHealingMotionActive}
                                  className="relative z-10"
                                />
                              </div>

                              {/* Pattern Details & Healing Motion Directive */}
                              <div className="space-y-2 text-left flex-1">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{geometricPattern.symbol}</span>
                                    <h4 className="text-base font-serif font-bold text-stone-100">
                                      {geometricPattern.name}
                                    </h4>
                                  </div>
                                  <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">
                                    {geometricPattern.coreDistortion}
                                  </span>
                                </div>

                                <p className="text-xs text-stone-400 font-serif leading-relaxed">
                                  {geometricPattern.description}
                                </p>

                                <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 font-serif leading-relaxed">
                                  <strong className="text-cyan-400 font-mono text-[10px] uppercase tracking-wider block mb-0.5">
                                    Sacred Geometric Healing Motion:
                                  </strong>
                                  {geometricPattern.healingRemedy || geometricPattern.motionDirective}
                                </div>
                              </div>
                            </div>

                            {/* Live CSS Motion Dynamic Status */}
                            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-2 border-t border-stone-800/80">
                              <span className="flex items-center gap-1.5 text-amber-300">
                                <Activity
                                  className={`w-3.5 h-3.5 ${
                                    isHealingMotionActive ? 'animate-pulse text-amber-400' : 'text-stone-600'
                                  }`}
                                />
                                Motion Vector: {geomanticResult.geometricMotion || 'Harmonic Realignment'}
                              </span>
                              <span className="text-stone-500">
                                Seam Depth: -{leadMineItem.depthMeters.toLocaleString()}m
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

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
                        Prescribed Mineral Elements & Gemstones (Subterranean Apothecary)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {interpretation.chthonicPrescription.prescribedMinerals.map((min, idx) => {
                          const purchaseUrl = getMineralPurchaseLink(min.name, getCommercialSettings());
                          return (
                            <div
                              key={idx}
                              className="bg-stone-950/80 border border-stone-800 rounded-2xl p-4 flex flex-col justify-between group hover:border-amber-500/40 transition-colors"
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
                              <div className="border-t border-stone-800/60 pt-2 flex items-center justify-between gap-2 mt-1">
                                <p className="text-[11px] text-stone-400 italic font-serif truncate">
                                  {min.resonance}
                                </p>
                                <a
                                  href={purchaseUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="shrink-0 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-serif text-[10px] font-bold border border-stone-700 hover:border-amber-400 flex items-center gap-1 transition-all"
                                  title={`Acquire natural specimen of ${min.name}`}
                                >
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Acquire</span>
                                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
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

                {/* TITANESS GUARDIANS & THREE-FOLD CURES OF THE SPREAD */}
                <div className="bg-stone-900/50 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
                  <div className="flex items-center gap-2.5 pb-4 border-b border-stone-800">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-serif uppercase tracking-widest text-amber-300 font-bold">
                        Titaness Guardians & Three-Fold Chthonic Cures
                      </h3>
                      <p className="text-xs text-stone-400 font-serif">
                        Alchemical remedies (Literal, Symbolic, Geometric) derived from the spirit of each excavated seam
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {drawnMines.map((drawn, idx) => {
                      const titaness = drawn.mine.titaness || generateTitaness({
                        mineral: drawn.mine.primaryMineral,
                        region: drawn.mine.location || drawn.mine.country,
                        depth: drawn.mine.depthMeters,
                      });

                      return (
                        <div
                          key={idx}
                          className="bg-stone-950/80 border border-stone-800/90 rounded-2xl p-5 space-y-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                                {drawn.position.name}
                              </span>
                              <h4 className="text-base font-serif font-bold text-stone-100">
                                {titaness.name} — <span className="text-xs text-amber-300 font-normal">{titaness.archetype}</span>
                              </h4>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
                              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300">
                                ᚱ {titaness.rune}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300">
                                ⚚ {titaness.geomantic}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                                {titaness.tree}
                              </span>
                            </div>
                          </div>

                          {/* Wound */}
                          <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-start gap-2">
                            <HeartCrack className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-rose-200/90 font-serif">
                              <strong className="text-rose-400 font-mono text-[10px] uppercase tracking-wider mr-1">Shadow Strain:</strong>
                              {titaness.wound}
                            </p>
                          </div>

                          {/* 3 Cures */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3 rounded-xl bg-stone-900/90 border border-amber-500/20">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1 font-bold mb-1">
                                <Zap className="w-3 h-3 text-amber-400" /> Literal Cure
                              </span>
                              <p className="text-xs text-stone-300 font-serif leading-relaxed">
                                {titaness.cures.literal}
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-stone-900/90 border border-purple-500/20">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1 font-bold mb-1">
                                <Sparkles className="w-3 h-3 text-purple-400" /> Symbolic Cure
                              </span>
                              <p className="text-xs text-stone-300 font-serif leading-relaxed">
                                {titaness.cures.symbolic}
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-stone-900/90 border border-cyan-500/20">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1 font-bold mb-1">
                                <CircleDot className="w-3 h-3 text-cyan-400" /> Geometric Cure
                              </span>
                              <p className="text-xs text-stone-300 font-serif leading-relaxed">
                                {titaness.cures.geometric}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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

                  <div className="flex items-center gap-2 relative flex-wrap">
                    {downloadedFeedback && (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-serif flex items-center gap-1.5 animate-pulse">
                        <Check className="w-3.5 h-3.5" />
                        {downloadedFeedback}
                      </span>
                    )}

                    {/* Deliver to Paying Client Button */}
                    <button
                      onClick={handleDeliverToClient}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs font-serif font-bold flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                      title="Generate and download personalized client delivery certificate (.html) for Etsy/Fiverr/Clients"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Deliver to Client</span>
                    </button>

                    {/* Download Dropdown / Buttons */}
                    <div className="relative">
                      <button
                        onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                        className="px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/60 text-stone-200 hover:text-amber-300 text-xs font-serif flex items-center gap-2 transition-colors shadow-sm"
                        title="Download complete reading"
                      >
                        <Download className="w-4 h-4 text-amber-400" />
                        <span>Download Reading</span>
                        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${downloadMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {downloadMenuOpen && (
                        <div className="absolute right-0 bottom-full mb-2 w-72 bg-stone-950 border border-amber-500/40 rounded-2xl p-2 shadow-2xl z-30 space-y-1">
                          <div className="px-3 py-1.5 border-b border-stone-800 text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                            Choose Download Format
                          </div>
                          <button
                            onClick={() => handleDownloadReading('txt')}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-900 text-stone-200 hover:text-amber-200 text-xs font-serif flex items-center gap-2.5 transition-colors"
                          >
                            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                            <div>
                              <div className="font-bold">Text Oracle Scroll (.txt)</div>
                              <div className="text-[10px] text-stone-400 font-sans">Full narrative, coordinates & cures</div>
                            </div>
                          </button>
                          <button
                            onClick={() => handleDownloadReading('html')}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-900 text-stone-200 hover:text-amber-200 text-xs font-serif flex items-center gap-2.5 transition-colors"
                          >
                            <Printer className="w-4 h-4 text-amber-400 shrink-0" />
                            <div>
                              <div className="font-bold">Illuminated Scroll (.html)</div>
                              <div className="text-[10px] text-stone-400 font-sans">Printable gold-styled document</div>
                            </div>
                          </button>
                          <button
                            onClick={() => handleDownloadReading('json')}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-900 text-stone-200 hover:text-amber-200 text-xs font-serif flex items-center gap-2.5 transition-colors"
                          >
                            <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
                            <div>
                              <div className="font-bold">Raw Prophecy Data (.json)</div>
                              <div className="text-[10px] text-stone-400 font-sans">For offline backup & records</div>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleCopy}
                      className="px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-serif flex items-center gap-2 transition-colors"
                    >
                      {copiedSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Copied Prophecy</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          <span>Copy Prophecy</span>
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
