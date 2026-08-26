import React, { useState, useMemo } from 'react';
import { WorldMine, DivinationReading, OracleInterpretation } from '../types';
import { calculateDateGeometry } from '../data/pennickEngine';
import { WORLD_MINES } from '../data/mines';
import { formatProphecyText, downloadFile, exportReadingAsHtml } from '../utils/offlineEngine';
import { MineLocationMap } from './MineLocationMap';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  Compass,
  Bookmark,
  Check,
  RotateCcw,
  ShieldAlert,
  Feather,
  Gem,
  Wind,
  MapPin,
  Copy,
  Download,
  Smartphone,
  Search,
  Pickaxe,
  X,
} from 'lucide-react';

interface ReadingsViewProps {
  mines: WorldMine[];
  onSaveReading: (reading: DivinationReading) => void;
  savedReadings: DivinationReading[];
  isPremium: boolean;
  onOpenDownloadApp?: () => void;
}

export const ReadingsView: React.FC<ReadingsViewProps> = ({
  mines,
  onSaveReading,
  savedReadings,
  isPremium,
  onOpenDownloadApp,
}) => {
  // Helper to format ISO date
  const getFutureDate = (days: number): string => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const [targetDate, setTargetDate] = useState<string>(getFutureDate(30));
  const [mineSearchQuery, setMineSearchQuery] = useState<string>('');
  const [selectedMine, setSelectedMine] = useState<WorldMine | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [inquiry, setInquiry] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentReading, setCurrentReading] = useState<DivinationReading | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);

  const activeMinesList = useMemo(() => {
    return mines && mines.length > 0 ? mines : WORLD_MINES;
  }, [mines]);

  // Filtered mines based on search input
  const searchResults = useMemo(() => {
    if (!mineSearchQuery.trim()) return [];
    const q = mineSearchQuery.toLowerCase().trim();
    return activeMinesList
      .filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q) ||
          m.primaryMineral.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [mineSearchQuery, activeMinesList]);

  const quickOptions = [
    { label: '30 Days', days: 30 },
    { label: '90 Days', days: 90 },
    { label: '6 Months', days: 180 },
    { label: '1 Year', days: 365 },
  ];

  const handleUnveilProphecy = async () => {
    setIsLoading(true);
    setIsSaved(false);

    let chosenMine: WorldMine;

    if (selectedMine) {
      chosenMine = selectedMine;
    } else if (mineSearchQuery.trim()) {
      const q = mineSearchQuery.toLowerCase().trim();
      const directMatch = activeMinesList.find(
        (m) =>
          m.name.toLowerCase() === q ||
          m.name.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q)
      );
      chosenMine = directMatch || activeMinesList[0];
    } else {
      // Date & Sacred Geometry Synchronization:
      const targetDateObj = new Date(targetDate || new Date().toISOString().split('T')[0]);
      const startOfYear = new Date(targetDateObj.getFullYear(), 0, 1);
      const dayOfYear = Math.max(1, Math.floor((targetDateObj.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)));
      const datePhase = (dayOfYear / 365.25) * 2 * Math.PI;

      // Score and rank mines to unearth the harmonious subterranean alignment
      const scored = activeMinesList.map((mine) => {
        const latRad = ((mine.lat || 0) * Math.PI) / 180;
        const lonRad = ((mine.lng || 0) * Math.PI) / 180;
        const depthRatio = (mine.depthMeters || 600) / 4000;
        const geomResonance = Math.abs(Math.sin(latRad + datePhase) * Math.cos(lonRad - datePhase) + depthRatio);
        const entropy = Math.random() * 0.4;
        return { mine, score: geomResonance + entropy };
      });

      scored.sort((a, b) => b.score - a.score);
      chosenMine = scored[0]?.mine || activeMinesList[0];
    }
    const dateGeom = calculateDateGeometry(targetDate);

    // Try AI generation if online; gracefully fallback to deep deterministic offline prophecy
    let interpretation: OracleInterpretation;

    try {
      const response = await fetch('/api/oracle/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: inquiry.trim() || 'General Life, Purpose & Destiny Alignment',
          spreadType: 'Monolith Seam',
          targetFutureDate: targetDate,
          timeHorizon: `Date Station (${targetDate})`,
          drawnMines: [
            {
              mine: chosenMine,
              isUpright: true,
              positionName: 'Monolith Seam',
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.reading) {
          interpretation = data.reading;
        } else {
          throw new Error('Invalid response structure');
        }
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch {
      // Offline / Local Generation
      interpretation = {
        oracularTitle: `The Prophecy of the ${chosenMine.primaryMineral} Seam`,
        mantleStrophe: `By ${targetDate}, ancient stone will yield its core,\nThe subterranean mantle speaks what lies in store;\nThrough ${chosenMine.name} the sacred geometry flows,\nTo manifest above what the date's alignment shows.`,
        targetFutureDate: targetDate,
        timeHorizon: `Target Date (${targetDate})`,
        strataInterpretations: [
          {
            position: 'Monolith Seam',
            mineName: chosenMine.name,
            mineralSignificance: `${chosenMine.primaryMineral} at depth -${chosenMine.depthMeters}m anchors the resonant station of ${chosenMine.chthonicKeyword}.`,
            revelation: chosenMine.uprightMeaning,
          },
        ],
        tectonicSynthesis: `Everything in this prophecy is determined by the sacred geometry of ${targetDate}. The astronomical station (${dateGeom.astronomicalStation}, solar phase angle ${dateGeom.solarPhaseAngleDeg}°) converges with the subterranean fault lines of ${chosenMine.name} in ${chosenMine.location}. As the calendar moves toward this appointed date, the energetic resistance you have experienced transitions from raw friction into lasting crystalline structure.`,
        futurePrediction: {
          manifestEvent: `A decisive and tangible breakthrough governed by ${chosenMine.primaryMineral} clarity will physically crystallize by ${targetDate}, opening a previously blocked sovereign path.`,
          dissolvingObstacle: `Lingering doubts, obsolete contracts, and emotional silt will completely dissolve under the geothermal heat of ${chosenMine.name}.`,
          pivotalChoicePoint: `A critical threshold where you must choose between remaining in familiar shallow silt or drilling deep into your unshakeable authenticity.`,
          longTermOutcome: `Permanent elevation of your personal resonance into the enduring bedrock frequency of ${chosenMine.primaryMineral}.`,
        },
        chthonicPrescription: {
          prescribedMinerals: [
            {
              name: `Raw ${chosenMine.primaryMineral}`,
              action: `Keep near your personal altar or workspace as ${targetDate} approaches.`,
              resonance: `Anchors the solar phase angle of ${dateGeom.solarPhaseAngleDeg}° into your physical surroundings.`,
            },
            {
              name: 'Grounding Hematite or Black Tourmaline',
              action: 'Carry in your pocket during pivotal decisions or transitions.',
              resonance: 'Deflects scattered external noise and centers your core axis.',
            },
          ],
          groundingRitual: `On a quiet evening before ${targetDate}, hold a natural stone in your hands, state your core intention aloud three times, and place the stone upon the earth to seal the timeline.`,
          mantleRemedy: `Practice daily mantle breathwork: Inhale 4 counts drawing deep earth stillness, hold 8 counts settling the core, and exhale 2 counts releasing mental tension.`,
          temporalMilestones: [
            {
              timeframe: `Early Phase`,
              guidance: `Clear superficial distractions and clarify your boundaries.`,
            },
            {
              timeframe: `Harvest Station (${targetDate})`,
              guidance: `Step forward decisively and integrate the manifested breakthrough.`,
            },
          ],
        },
        environmentalWarning: `The extraction operations around ${chosenMine.name} in ${chosenMine.location} have inflicted severe ecological wounds on the local mantle, fracturing subterranean aquifer channels, dispersing heavy mineral dust, and stressing native wildlife habitats.`,
        whyMiningMustStop: `The seam is over-pressurized and the crystalline lattice shows deep geological strain. The land cannot sustain further industrial extraction without risking irreversible destabilization of the regional geomantic field.`,
        earthMandate: `Shift from extraction to stewardship: Cease taking more from this seam, protect the surviving watershed, and allow the subterranean mantle to cool and heal in peace.`,
        shadowVein: `Beware of forcing premature extraction before the mineral matrix has fully cooled and settled.`,
        chthonicMandate: `Hold firmly to the bedrock truth of who you are, and allow superficial silt to wash away.`,
      };
    }

    const newReading: DivinationReading = {
      id: 'reading_' + Date.now(),
      timestamp: Date.now(),
      question: inquiry.trim() || 'General Inquiry of the Mantle',
      targetFutureDate: targetDate,
      timeHorizon: `Target Date (${targetDate})`,
      spreadType: 'single',
      drawnMines: [
        {
          mine: chosenMine,
          isUpright: true,
          position: {
            id: 'monolith_seam',
            name: `Monolith Seam (${targetDate})`,
            description: `Synchronized with ${chosenMine.primaryMineral} crystal geometry`,
            strataDepth: `${chosenMine.depthCategory} (-${chosenMine.depthMeters}m)`,
          },
        },
      ],
      interpretation,
    };

    setTimeout(() => {
      setCurrentReading(newReading);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleCopyProphecy = async () => {
    if (!currentReading) return;
    const text = formatProphecyText(currentReading);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy prophecy: ', err);
    }
  };

  const handleDownloadProphecy = () => {
    if (!currentReading) return;
    const text = formatProphecyText(currentReading);
    const dateStr = currentReading.targetFutureDate || new Date().toISOString().split('T')[0];
    downloadFile(text, `chthonic_prophecy_${dateStr}.txt`, 'text/plain');
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  const handleSave = () => {
    if (currentReading && !isSaved) {
      onSaveReading(currentReading);
      setIsSaved(true);
    }
  };

  const handleNewReading = () => {
    setCurrentReading(null);
    setIsSaved(false);
    setInquiry('');
    setSelectedMine(null);
    setMineSearchQuery('');
    setIsDropdownOpen(false);
    setIsCopied(false);
    setIsDownloaded(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {/* SCREEN 1: INPUT FORM (ONE MAIN SCREEN) */}
        {!currentReading ? (
          <motion.div
            key="input-screen"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-8"
          >
            {/* Clean Title */}
            <div className="text-center space-y-2 pt-2">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-amber-500 font-bold">
                RAINSTARSTERRAIN FORCAST
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-amber-200">
                Astrology Prophecy Reading
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 font-serif max-w-md mx-auto leading-relaxed">
                Drill forward in time into planetary stations and Earth’s mantle geometry.
              </p>
            </div>

            {/* Main Form Container */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-sm">
              {/* Target Date Field */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Choose a future date for your prophecy</span>
                </label>
                <p className="text-[11px] text-stone-400 font-serif">
                  Select a specific date or use a quick option.
                </p>

                <input
                  type="date"
                  value={targetDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700/80 hover:border-amber-500/50 focus:border-amber-500 rounded-2xl px-4 py-3.5 text-base font-mono text-stone-100 outline-none transition-all cursor-pointer shadow-inner"
                />

                {/* Quick Date Options */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {quickOptions.map((opt) => (
                    <button
                      key={opt.days}
                      type="button"
                      onClick={() => setTargetDate(getFutureDate(opt.days))}
                      className={`py-2 px-3 rounded-xl text-xs font-serif transition-all ${
                        targetDate === getFutureDate(opt.days)
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                          : 'bg-stone-950/60 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mine Name Input / Selection Field */}
              <div className="space-y-2 pt-1 relative">
                <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Pickaxe className="w-4 h-4 text-amber-400" />
                    <span>Pick or Text the Name of the Mine</span>
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono lowercase">(optional — or oracle aligns)</span>
                </label>
                <p className="text-[11px] text-stone-400 font-serif">
                  Type any mine, vein, country, or mineral name, or leave blank to let tectonic geometry choose.
                </p>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={mineSearchQuery}
                    onChange={(e) => {
                      setMineSearchQuery(e.target.value);
                      setSelectedMine(null);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="e.g. Kimberley Diamond Mine, Chuquicamata, Gold, or type any mine..."
                    className="w-full bg-stone-950 border border-stone-700/80 hover:border-amber-500/50 focus:border-amber-500 rounded-2xl pl-10 pr-10 py-3.5 text-sm font-mono text-stone-100 placeholder-stone-600 outline-none transition-all shadow-inner"
                  />
                  {mineSearchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setMineSearchQuery('');
                        setSelectedMine(null);
                        setIsDropdownOpen(false);
                      }}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-500 hover:text-stone-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Selected Mine Badge */}
                {selectedMine && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-200">
                    <div className="flex items-center gap-2 truncate">
                      <Gem className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-bold truncate">{selectedMine.name}</span>
                      <span className="text-stone-400">({selectedMine.primaryMineral} · {selectedMine.country})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMine(null);
                        setMineSearchQuery('');
                      }}
                      className="text-stone-400 hover:text-amber-300 ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Autocomplete Dropdown */}
                {isDropdownOpen && searchResults.length > 0 && !selectedMine && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1.5 bg-stone-950 border border-stone-700 rounded-2xl shadow-2xl max-h-56 overflow-y-auto divide-y divide-stone-800">
                    {searchResults.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedMine(m);
                          setMineSearchQuery(m.name);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-stone-900 flex items-center justify-between text-xs font-mono transition-colors"
                      >
                        <div>
                          <div className="font-bold text-stone-200">{m.name}</div>
                          <div className="text-[11px] text-stone-400">
                            {m.location}, {m.country} · <span className="text-amber-300">{m.primaryMineral}</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-stone-500">-{m.depthMeters}m</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Inquiry Box (Optional) */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-2">
                  <Feather className="w-4 h-4 text-stone-400" />
                  <span>What do you want to ask? (Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="e.g. “What will manifest in my life by this date?”"
                  className="w-full bg-stone-950 border border-stone-700/80 hover:border-amber-500/50 focus:border-amber-500 rounded-2xl p-4 text-sm text-stone-100 placeholder-stone-600 outline-none transition-all resize-none shadow-inner font-serif leading-relaxed"
                />
              </div>

              {/* Single Action Button */}
              <button
                type="button"
                disabled={isLoading || !targetDate}
                onClick={handleUnveilProphecy}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-serif text-base font-bold tracking-wide transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-stone-950" />
                    <span>Unearthing Prophecy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-stone-950" />
                    <span>Unveil Prophecy</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          /* SCREEN 2: RESULT SCREEN (CLEAN PROPHECY + PRESCRIPTION) */
          <motion.div
            key="result-screen"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6 pb-8"
          >
            {/* Title & Target Date / Inquiry Header */}
            <div className="bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-xl backdrop-blur-md">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Your Chthonic Prophecy
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 tracking-wide">
                {currentReading.interpretation.oracularTitle}
              </h2>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Target Date: {currentReading.targetFutureDate}</span>
              </div>

              {/* Inquiry Display */}
              {currentReading.question && currentReading.question !== 'General Inquiry of the Mantle' && (
                <div className="text-xs text-stone-400 font-serif pt-1">
                  <span className="text-stone-300 font-mono uppercase tracking-wider text-[10px] font-bold">Inquiry:</span>{' '}
                  <span className="text-stone-200">"{currentReading.question}"</span>
                </div>
              )}
            </div>

            {/* MINE UNEARTHED Card: {location} — {mine_name} — {mine_type} — {mine_status} */}
            {currentReading.drawnMines[0] && (() => {
              const m = currentReading.drawnMines[0].mine;
              const mineType = m.depthCategory || 'Subterranean Shaft';
              const mineStatus = m.discoveryYear ? `Documented Seam (${m.discoveryYear})` : 'Active Mantle Seam';
              const locationStr = m.location ? `${m.location}, ${m.country}` : m.country;
              const headerLine = `${locationStr} — ${m.name} — ${mineType} — ${mineStatus}`;

              return (
                <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-3 shadow-lg">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                    <Gem className="w-4 h-4 text-amber-400" />
                    <span>Mine Unearthed</span>
                  </div>

                  <div className="font-serif font-bold text-base sm:text-lg text-white leading-snug">
                    {headerLine}
                  </div>

                  <div className="text-xs text-amber-300 font-mono flex items-center gap-2">
                    <span>Primary Resonance: {m.primaryMineral}</span>
                    <span>•</span>
                    <span>Depth: -{m.depthMeters}m</span>
                    <span>•</span>
                    <span className="italic">{m.feminineArchetype}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed pt-2 border-t border-stone-800/80">
                    {m.uprightMeaning || 'Deep earth resonance opening clear sovereign channels for date manifestation.'}
                  </p>
                </div>
              );
            })()}

            {/* GOOGLE MAPS INTEGRATION PINPOINTING UNEARTHED MINE */}
            {currentReading.drawnMines[0] && (
              <MineLocationMap mine={currentReading.drawnMines[0].mine} />
            )}

            {/* PROPHECY (4 Parts) */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <h3 className="text-sm font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Prophecy</span>
              </h3>

              <div className="space-y-3.5 text-sm font-serif leading-relaxed">
                {/* 1. Manifestation */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    ✦ Manifestation
                  </div>
                  <p className="text-stone-300 text-xs sm:text-sm">
                    {currentReading.interpretation.futurePrediction?.manifestEvent ||
                      'A decisive and tangible breakthrough will physically crystallize by the target date.'}
                  </p>
                </div>

                {/* 2. Obstacle Dissolving */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    ✦ Obstacle Dissolving
                  </div>
                  <p className="text-stone-300 text-xs sm:text-sm">
                    {currentReading.interpretation.futurePrediction?.dissolvingObstacle ||
                      'Lingering blockages, outdated expectations, and structural resistance will completely dissolve.'}
                  </p>
                </div>

                {/* 3. Choice Point */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                    ✦ Choice Point
                  </div>
                  <p className="text-stone-300 text-xs sm:text-sm">
                    {currentReading.interpretation.futurePrediction?.pivotalChoicePoint ||
                      'A critical crossroads where you must choose between remaining in familiar safe strata or boring boldly into your authentic sovereignty.'}
                  </p>
                </div>

                {/* 4. Bedrock Destiny */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                    ✦ Bedrock Destiny
                  </div>
                  <p className="text-stone-300 text-xs sm:text-sm">
                    {currentReading.interpretation.futurePrediction?.longTermOutcome ||
                      'Permanent elevation and grounding into enduring bedrock clarity and long-term peace.'}
                  </p>
                </div>
              </div>
            </div>

            {/* PRESCRIPTION (Minerals + Ritual + Breath) */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <h3 className="text-sm font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <Gem className="w-4 h-4" />
                <span>Prescription</span>
              </h3>

              {/* Two Mineral Allies */}
              {currentReading.interpretation.chthonicPrescription?.prescribedMinerals && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-stone-400 uppercase font-semibold">Mineral Allies</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentReading.interpretation.chthonicPrescription.prescribedMinerals.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                        <div className="text-xs font-serif font-bold text-amber-300">{m.name}</div>
                        <p className="text-[11px] text-stone-300 font-serif leading-relaxed">{m.action}</p>
                        {m.resonance && (
                          <p className="text-[10px] text-stone-400 font-mono italic">{m.resonance}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grounding Ritual */}
              {currentReading.interpretation.chthonicPrescription?.groundingRitual && (
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Grounding Ritual
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                    {currentReading.interpretation.chthonicPrescription.groundingRitual}
                  </p>
                </div>
              )}

              {/* Mantle Breathing Pattern */}
              {currentReading.interpretation.chthonicPrescription?.mantleRemedy && (
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5" /> Mantle Breathing
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                    {currentReading.interpretation.chthonicPrescription.mantleRemedy}
                  </p>
                </div>
              )}
            </div>

            {/* ENVIRONMENTAL WARNING & EARTH MANDATE (NEW SECTION) */}
            {(currentReading.interpretation.environmentalWarning ||
              currentReading.interpretation.whyMiningMustStop ||
              currentReading.interpretation.earthMandate) && (
              <div className="bg-stone-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 border-b border-stone-800 pb-3">
                  <span className="text-emerald-300">✦</span> Environmental Warning & Earth Mandate <span className="text-emerald-300">✦</span>
                </div>

                {/* Environmental Warning */}
                {currentReading.interpretation.environmentalWarning && (
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono font-semibold text-amber-400/90 uppercase tracking-wide">
                      Environmental Warning
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                      {currentReading.interpretation.environmentalWarning}
                    </p>
                  </div>
                )}

                {/* Why Mining Must Stop */}
                {currentReading.interpretation.whyMiningMustStop && (
                  <div className="space-y-1.5 bg-stone-950/60 border border-stone-800 p-4 rounded-2xl">
                    <div className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wide">
                      Why Mining Must Stop
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 font-serif italic leading-relaxed">
                      "{currentReading.interpretation.whyMiningMustStop}"
                    </p>
                  </div>
                )}

                {/* Earth Mandate */}
                {currentReading.interpretation.earthMandate && (
                  <div className="space-y-1.5 bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl">
                    <div className="text-xs font-mono font-semibold text-emerald-300 uppercase tracking-wide">
                      Earth Mandate
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100 font-serif font-medium leading-relaxed">
                      {currentReading.interpretation.earthMandate}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* SYNTHESIS: Date Geometry + Mine Resonance */}
            {currentReading.interpretation.tectonicSynthesis && (
              <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-2 shadow-lg">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> Synthesis
                </div>
                <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                  {currentReading.interpretation.tectonicSynthesis}
                </p>
              </div>
            )}

            {/* SHADOW VEIN & MANDATE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Shadow Vein */}
              {currentReading.interpretation.shadowVein && (
                <div className="p-5 rounded-3xl bg-stone-900/80 border border-red-500/30 space-y-2 shadow-lg">
                  <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Shadow Vein
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                    {currentReading.interpretation.shadowVein}
                  </p>
                </div>
              )}

              {/* Chthonic Mandate */}
              {currentReading.interpretation.chthonicMandate && (
                <div className="p-5 rounded-3xl bg-stone-900/80 border border-amber-500/30 space-y-2 shadow-lg">
                  <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Chthonic Mandate
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                    {currentReading.interpretation.chthonicMandate}
                  </p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="space-y-3 pt-4">
              {/* Row 1: Copy Prophecy & Download Prophecy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCopyProphecy}
                  className={`py-3 px-4 rounded-2xl font-serif text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isCopied
                      ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300'
                      : 'bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Copy Prophecy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadProphecy}
                  className={`py-3 px-4 rounded-2xl font-serif text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isDownloaded
                      ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300'
                      : 'bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Downloaded Scroll!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>Download Prophecy (.txt)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Save Reading & New Reading */}
              <div className="flex items-center gap-3">
                {/* Save Reading */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaved}
                  className={`flex-1 py-3.5 rounded-2xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isSaved
                      ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 cursor-default'
                      : 'bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 hover:border-amber-400'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Saved to Archive</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Save Reading</span>
                    </>
                  )}
                </button>

                {/* New Reading */}
                <button
                  type="button"
                  onClick={handleNewReading}
                  className="flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Reading</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
