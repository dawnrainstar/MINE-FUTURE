import React, { useState, useMemo, useEffect } from 'react';
import { WorldMine, DivinationReading, OracleInterpretation } from '../types';
import { calculateDateGeometry } from '../data/pennickEngine';
import { WORLD_MINES } from '../data/mines';
import { formatProphecyText, downloadFile, exportReadingAsHtml } from '../utils/offlineEngine';
import { MineLocationMap } from './MineLocationMap';
import { AccurateDivinationSystemModal } from './AccurateDivinationSystemModal';
import { MineralPrescriptionCard } from './MineralPrescriptionCard';
import { generateUniqueMineralPrescription } from '../utils/mineralPrescriptionEngine';
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
  Shield,
  Layers,
  Activity,
  Globe,
  ArrowUp,
  HelpCircle,
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
  const [inquiry, setInquiry] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>('');
  const [currentReading, setCurrentReading] = useState<DivinationReading | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isAccurateSystemOpen, setIsAccurateSystemOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setShowScrollTop(window.scrollY > 220);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStartOfPage = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeMinesList = useMemo(() => {
    return mines && mines.length > 0 ? mines : WORLD_MINES;
  }, [mines]);

  const QUESTION_CATEGORIES = [
    'All',
    'Destiny & Timing',
    'Career & Wealth',
    'Love & Relationships',
    'Healing & Energy',
    'Decisions & Crossroads',
  ] as const;

  interface CategorizedQuestion {
    category: typeof QUESTION_CATEGORIES[number];
    question: string;
  }

  const QUICK_QUESTIONS: CategorizedQuestion[] = [
    // Destiny & Timing
    { category: 'Destiny & Timing', question: "What key events and breakthroughs will manifest in my life by this date?" },
    { category: 'Destiny & Timing', question: "What is the earth's guidance for my highest path and calling?" },
    { category: 'Destiny & Timing', question: "What unseen opportunities and synchronicities are preparing to surface?" },
    { category: 'Destiny & Timing', question: "What major timeline shift is approaching for me?" },
    { category: 'Destiny & Timing', question: "What core spiritual lesson am I integrating right now?" },

    // Career & Wealth
    { category: 'Career & Wealth', question: "What career and vocational breakthrough is unfolding?" },
    { category: 'Career & Wealth', question: "How can I unlock greater financial abundance and material stability?" },
    { category: 'Career & Wealth', question: "Is this the right time to launch my new venture, project, or business?" },
    { category: 'Career & Wealth', question: "What professional recognition, compensation, or expansion will crystallize?" },
    { category: 'Career & Wealth', question: "How can I step firmly into sovereign leadership and independence?" },

    // Love & Relationships
    { category: 'Love & Relationships', question: "What truth and alignment is crystallizing in my romantic relationship?" },
    { category: 'Love & Relationships', question: "When and how will true soul connection or partnership arrive?" },
    { category: 'Love & Relationships', question: "How can we dissolve friction and deepen mutual emotional trust?" },
    { category: 'Love & Relationships', question: "What does my partner or soul connection truly feel right now?" },
    { category: 'Love & Relationships', question: "How do I release past heartbreak and open my heart with healthy boundaries?" },

    // Healing & Energy
    { category: 'Healing & Energy', question: "What subterranean blockages and old emotional debts are dissolving?" },
    { category: 'Healing & Energy', question: "What physical vitality or nervous system shift is occurring in my body?" },
    { category: 'Healing & Energy', question: "How can I restore my vital energy and dissolve chronic pressure?" },
    { category: 'Healing & Energy', question: "What shadow vein or hidden fear must I acknowledge to find peace?" },
    { category: 'Healing & Energy', question: "What grounding ritual or mineral resonance does my field need right now?" },

    // Decisions & Crossroads
    { category: 'Decisions & Crossroads', question: "What critical crossroads must I navigate, and what choice is best?" },
    { category: 'Decisions & Crossroads', question: "Should I move, relocate, or establish a new home sanctuary?" },
    { category: 'Decisions & Crossroads', question: "How do I break free from hesitation and take grounded, bold action?" },
    { category: 'Decisions & Crossroads', question: "Which path aligns with my soul's authentic fulfillment?" },
    { category: 'Decisions & Crossroads', question: "What is the single most grounded action I should take today?" },
  ];

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'All') return QUICK_QUESTIONS;
    return QUICK_QUESTIONS.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  // Behind-the-scenes Geomantic Mine Selector
  const determineGeomanticMine = (dateStr: string, questionText: string): WorldMine => {
    const targetDateObj = new Date(dateStr || new Date().toISOString().split('T')[0]);
    const startOfYear = new Date(targetDateObj.getFullYear(), 0, 1);
    const dayOfYear = Math.max(1, Math.floor((targetDateObj.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)));
    const datePhase = (dayOfYear / 365.25) * 2 * Math.PI;

    // Hash the question text into a deterministic numeric vibration
    let hash = 0;
    const cleanQ = (questionText || 'destiny').toLowerCase();
    for (let i = 0; i < cleanQ.length; i++) {
      hash = ((hash << 5) - hash) + cleanQ.charCodeAt(i);
      hash |= 0;
    }
    const qPhase = Math.abs(hash % 1000) / 1000 * 2 * Math.PI;

    // Element weighting based on question content
    const isFire = cleanQ.includes('passion') || cleanQ.includes('action') || cleanQ.includes('courage') || cleanQ.includes('energy');
    const isWater = cleanQ.includes('love') || cleanQ.includes('heart') || cleanQ.includes('emotion') || cleanQ.includes('relationship') || cleanQ.includes('healing');
    const isAir = cleanQ.includes('mind') || cleanQ.includes('career') || cleanQ.includes('clarity') || cleanQ.includes('decision') || cleanQ.includes('truth');
    const isEarth = cleanQ.includes('money') || cleanQ.includes('home') || cleanQ.includes('manifest') || cleanQ.includes('ground') || cleanQ.includes('stability');

    const scored = activeMinesList.map((mine) => {
      const latRad = ((mine.lat || 0) * Math.PI) / 180;
      const lonRad = ((mine.lng || 0) * Math.PI) / 180;
      const depthRatio = (mine.depthMeters || 800) / 4000;

      // Geomantic spherical harmonics
      const harmonic = Math.abs(Math.sin(latRad + datePhase + qPhase) * Math.cos(lonRad - datePhase + qPhase));
      let affinityBonus = 0;

      if (isFire && (mine.elementalAffinity?.includes('Fire') || mine.planetaryRuler?.includes('Mars') || mine.planetaryRuler?.includes('Sun'))) {
        affinityBonus += 0.4;
      }
      if (isWater && (mine.elementalAffinity?.includes('Water') || mine.planetaryRuler?.includes('Moon') || mine.planetaryRuler?.includes('Venus'))) {
        affinityBonus += 0.4;
      }
      if (isAir && (mine.elementalAffinity?.includes('Air') || mine.planetaryRuler?.includes('Mercury') || mine.planetaryRuler?.includes('Jupiter'))) {
        affinityBonus += 0.4;
      }
      if (isEarth && (mine.elementalAffinity?.includes('Earth') || mine.planetaryRuler?.includes('Saturn'))) {
        affinityBonus += 0.4;
      }

      return {
        mine,
        score: harmonic + depthRatio * 0.3 + affinityBonus,
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.mine || activeMinesList[0];
  };

  const handleUnveilProphecy = async () => {
    setIsLoading(true);
    setIsSaved(false);
    setLoadingPhase('Calculating Geomantic Coordinates Behind the Scenes...');

    try {
      // Behind-the-scenes Geomantic Determination
      const chosenMine = determineGeomanticMine(targetDate, inquiry) || activeMinesList[0] || WORLD_MINES[0];
      const dateGeom = calculateDateGeometry(targetDate);
      const userInquiry = inquiry.trim() || 'What key events and personal breakthroughs will manifest by this date?';

      // Try AI generation if online; gracefully fallback to rich offline prophecy with 5.5s timeout
      let interpretation: OracleInterpretation | null = null;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5500);

      try {
        setLoadingPhase('Probing Subterranean Mantle & Harmonics...');
        const response = await fetch('/api/oracle/read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            question: userInquiry,
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

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.reading && data.reading.oracularTitle) {
            interpretation = data.reading;
          }
        }
      } catch (fetchErr) {
        console.info('Switching to deterministic mantle oracle synthesis:', fetchErr);
      } finally {
        clearTimeout(timeoutId);
      }

      // If network timed out, failed, or returned partial data, generate rich deterministic prophecy
      if (!interpretation) {
        setLoadingPhase('Synthesizing Direct Answer to Your Inquiry...');
        const qLower = userInquiry.toLowerCase();
        let topicCategory = "your sovereign path, purpose, and destiny";
        let manifestSpecific = `Regarding your inquiry on "${userInquiry}", a decisive and tangible breakthrough will physically manifest on or before ${targetDate}`;
        let obstacleSpecific = `Lingering self-doubt, outdated assumptions, and unnecessary hesitation`;
        let choiceSpecific = `Choosing to stand firmly in your authentic authority rather than shrinking to fit past expectations`;
        let outcomeDetail = `Permanent grounded stability and clear forward momentum in your life direction`;

        if (qLower.includes("love") || qLower.includes("relationship") || qLower.includes("partner") || qLower.includes("heart") || qLower.includes("marriage")) {
          topicCategory = "relational harmony, truth, and emotional union";
          manifestSpecific = `Regarding your relationship inquiry, profound clarity and mutual emotional alignment will solidify by ${targetDate}`;
          obstacleSpecific = `Unspoken emotional debts, fear of vulnerability, and guarded boundaries`;
          choiceSpecific = `Choosing vulnerable honesty and clear mutual respect over superficial peace`;
          outcomeDetail = `A deep, trustworthy, and enduring emotional sanctuary`;
        } else if (qLower.includes("career") || qLower.includes("job") || qLower.includes("work") || qLower.includes("money") || qLower.includes("business") || qLower.includes("finance") || qLower.includes("wealth")) {
          topicCategory = "vocational mastery, financial abundance, and expansion";
          manifestSpecific = `Regarding your career and financial path, a lucrative opening and tangible acknowledgment of your mastery will crystallize by ${targetDate}`;
          obstacleSpecific = `Scarcity mindset, undervalued efforts, and obsolete professional commitments`;
          choiceSpecific = `Investing boldly in your sovereign masterwork versus settling for unrewarding routine`;
          outcomeDetail = `Enduring material security, professional sovereignty, and elevated compensation`;
        } else if (qLower.includes("move") || qLower.includes("home") || qLower.includes("house") || qLower.includes("location") || qLower.includes("city")) {
          topicCategory = "geographic alignment, home sanctuary, and rooted belonging";
          manifestSpecific = `Regarding your living situation and environment, the ideal physical anchor and spatial transition will open clearly by ${targetDate}`;
          obstacleSpecific = `Attachment to stagnant spaces and fear of transitional discomfort`;
          choiceSpecific = `Committing to the ground and environment that genuinely nourishes your vitality`;
          outcomeDetail = `A peaceful, rooted home environment aligned with your energetic frequency`;
        } else if (qLower.includes("health") || qLower.includes("heal") || qLower.includes("body") || qLower.includes("energy")) {
          topicCategory = "cellular rejuvenation, nervous system regulation, and vital force";
          manifestSpecific = `Regarding your physical vitality and wellbeing, your body will reach a restored physiological equilibrium by ${targetDate}`;
          obstacleSpecific = `Chronic stress, erratic pacing, and neglecting natural biological rest cycles`;
          choiceSpecific = `Honoring your body's restorative signals over artificial pressure and urgency`;
          outcomeDetail = `Deep cellular resilience, stabilized energy, and radiant vitality`;
        }

        interpretation = {
          oracularTitle: `The Prophecy of the ${chosenMine.primaryMineral || 'Golden'} Seam`,
          mantleStrophe: `By ${targetDate}, the ancient bedrock yields its core,\nThe subterranean mantle speaks what lies in store;\nTo answer "${userInquiry.slice(0, 45)}${userInquiry.length > 45 ? '...' : ''}",\nThe sacred geometry unlocks the open door.`,
          targetFutureDate: targetDate,
          timeHorizon: `Date Station (${targetDate})`,
          strataInterpretations: [
            {
              position: 'Monolith Seam',
              mineName: chosenMine.name,
              mineralSignificance: `${chosenMine.primaryMineral} at depth -${chosenMine.depthMeters}m in ${chosenMine.location} anchors the resonant frequency of ${chosenMine.chthonicKeyword || 'truth'}.`,
              revelation: `${chosenMine.uprightMeaning || 'Deep earth resonance opening clear sovereign channels.'} Providing direct geological backing for ${topicCategory}.`,
            },
          ],
          tectonicSynthesis: `Directly addressing your inquiry: "${userInquiry}"\n\nEverything in this prophecy is mathematically and geologically determined by the sacred geometry of ${targetDate}. The celestial station (${dateGeom.astronomicalStation}, solar phase angle ${dateGeom.solarPhaseAngleDeg}°) converges with the subterranean fault lines of ${chosenMine.name} in ${chosenMine.location}. As the calendar moves toward this appointed date, the energetic resistance you have experienced transitions from raw friction into lasting crystalline structure in ${topicCategory}.\n\nThe mantle confirms that your current efforts are not in vain. What felt like an agonizing delay was the pressure necessary to forge lasting clarity. By ${targetDate}, the subterranean fault lines will lock into a supportive alignment, liberating your momentum.`,
          futurePrediction: {
            manifestEvent: `${manifestSpecific}, confirmed by the unmistakable frequency of ${chosenMine.primaryMineral}.`,
            dissolvingObstacle: `${obstacleSpecific} will completely dissolve under the geothermal heat of ${chosenMine.name}.`,
            pivotalChoicePoint: `${choiceSpecific}, serving as a key crossroads before ${targetDate}.`,
            longTermOutcome: `${outcomeDetail}, rooted in the enduring bedrock frequency of ${chosenMine.primaryMineral}.`,
          },
          chthonicPrescription: {
            prescribedMinerals: [
              {
                name: `Raw ${chosenMine.primaryMineral}`,
                action: `Keep near your personal altar, desk, or bedside as ${targetDate} approaches.`,
                resonance: `Anchors the solar phase angle of ${dateGeom.solarPhaseAngleDeg}° to resolve your inquiry into physical manifestation.`,
              },
              {
                name: 'Grounding Hematite or Black Tourmaline',
                action: 'Carry in your pocket or hold during pivotal conversations and transitions.',
                resonance: 'Deflects scattered external noise and centers your core axis.',
              },
            ],
            groundingRitual: `On a quiet evening before ${targetDate}, hold a natural stone in your hands, state your core intention regarding "${userInquiry.slice(0, 40)}" aloud three times, and place the stone upon the earth to seal the timeline.`,
            mantleRemedy: `Practice daily 4-8-2 mantle breathwork: Inhale 4 counts drawing deep earth stillness, hold 8 counts settling the core, and exhale 2 counts releasing mental tension.`,
            temporalMilestones: [
              {
                timeframe: `Early Phase / Initial Seam`,
                guidance: `Clear superficial distractions and clarify your boundaries regarding your inquiry.`,
              },
              {
                timeframe: `Midpoint / Thermal Convergence`,
                guidance: `Stand firm when tested; do not compromise your core terms during the heat.`,
              },
              {
                timeframe: `Harvest Station (${targetDate})`,
                guidance: `Step forward decisively, claim your manifested breakthrough, and integrate your gains.`,
              },
            ],
          },
          environmentalWarning: `The extraction operations around ${chosenMine.name} in ${chosenMine.location} have inflicted ecological wounds on the local mantle, fracturing subterranean aquifer channels and stressing native ecosystems.`,
          whyMiningMustStop: `The seam is over-pressurized and the crystalline lattice shows deep geological strain. The land cannot sustain further industrial extraction without risking irreversible destabilization of the regional geomantic field.`,
          earthMandate: `Shift from extraction to stewardship: Cease taking more from this seam, protect the surviving watershed, and allow the subterranean mantle to heal in peace.`,
          shadowVein: `Beware of attempting premature extraction before the mineral matrix has fully cooled and settled.`,
          chthonicMandate: `Hold firmly to the bedrock truth of who you are, and allow superficial silt to wash away.`,
        };
      }

      // Synthesize full unique mineral geomantic prescription mathematically calibrated to this reading
      const uniquePrescription = generateUniqueMineralPrescription(
        chosenMine,
        targetDate,
        userInquiry,
        interpretation.chthonicPrescription
      );
      interpretation = {
        ...interpretation,
        chthonicPrescription: uniquePrescription,
      };

      const newReading: DivinationReading = {
        id: 'reading_' + Date.now(),
        timestamp: Date.now(),
        question: userInquiry,
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

      setCurrentReading(newReading);
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        // Safe inside iframe
      }
    } catch (err) {
      console.error('Prophecy generation encountered error:', err);
    } finally {
      setIsLoading(false);
      setLoadingPhase('');
    }
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
    setIsCopied(false);
    setIsDownloaded(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
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
            <div className="text-center space-y-2.5 pt-2">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
                RAINSTARSTERRAIN FORCAST
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-wide text-amber-200">
                Astrology Prophecy Reading
              </h1>
              <p className="text-sm sm:text-base text-stone-300 font-serif max-w-lg mx-auto leading-relaxed">
                Drill forward in time into planetary stations and Earth’s mantle geometry to receive an accurate answer to your inquiry.
              </p>
            </div>

            {/* Main Form Container */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-7 shadow-2xl backdrop-blur-sm">
              {/* Target Date Field */}
              <div className="space-y-2.5">
                <label className="block text-sm sm:text-base font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Choose a future date for your prophecy</span>
                </label>
                <p className="text-xs sm:text-sm text-stone-300 font-serif">
                  Select the exact future date for your prophecy.
                </p>

                <input
                  type="date"
                  value={targetDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700/90 hover:border-amber-500/60 focus:border-amber-400 rounded-2xl px-5 py-4 text-lg sm:text-xl font-mono font-semibold text-stone-100 outline-none transition-all cursor-pointer shadow-inner"
                />
              </div>

              {/* Inquiry Box (Primary Interactive Focus) */}
              <div className="space-y-2.5 pt-1">
                <label className="block text-sm sm:text-base font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Feather className="w-5 h-5 text-amber-400" />
                    <span>Inscribe Your Question or Life Intention</span>
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Answers directly address this</span>
                </label>
                <p className="text-xs sm:text-sm text-stone-300 font-serif">
                  Ask about career, love, manifestations, personal dilemmas, or timing for {targetDate}.
                </p>
                <textarea
                  rows={3}
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="e.g. “What will manifest in my career and purpose by this date?” or “What crossroads must I navigate in my relationship?”"
                  className="w-full bg-stone-950 border border-stone-700/90 hover:border-amber-500/60 focus:border-amber-400 rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-stone-100 placeholder-stone-500 outline-none transition-all resize-none shadow-inner font-serif leading-relaxed"
                />

                {/* Suggested Inquiries / Quick Questions */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Quick Questions ({filteredQuestions.length}):</span>
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Tap any prompt to inscribe instantly
                    </span>
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                    {QUESTION_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all border ${
                          selectedCategory === cat
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold shadow-sm'
                            : 'bg-stone-950 hover:bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Quick Question Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                    {filteredQuestions.map((q, idx) => {
                      const isSelected = inquiry === q.question;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setInquiry(q.question)}
                          className={`p-3 rounded-xl text-left text-xs font-serif transition-all flex items-start justify-between gap-2 border ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-100 font-medium shadow-[0_0_12px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50'
                              : 'bg-stone-950/80 hover:bg-stone-900 border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-white'
                          }`}
                        >
                          <span className="leading-relaxed">"{q.question}"</span>
                          {isSelected ? (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Sparkles className="w-3 h-3 text-stone-500 opacity-50 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Behind the Scenes Geomantic Engine Banner */}
              <div className="bg-stone-950/80 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-inner flex items-start gap-3.5">
                <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                    Geomantic Mantle Calculation (Behind the Scenes)
                  </div>
                  <p className="text-xs text-stone-300 font-serif leading-relaxed">
                    The subterranean mine seam, lithospheric depth, and mineral resonance are dynamically computed behind the scenes using 16-figure geomancy, planetary hours, and your inquiry.
                  </p>
                </div>
              </div>

              {/* Single Action Button */}
              <button
                type="button"
                disabled={isLoading || !targetDate}
                onClick={handleUnveilProphecy}
                className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-serif text-base sm:text-lg font-bold tracking-wide transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-stone-950" />
                    <span>{loadingPhase || 'Unearthing Prophecy & Answering Question...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-stone-950" />
                    <span>Unveil Prophecy for {targetDate}</span>
                  </>
                )}
              </button>

              {/* Gold-Standard Accurate Divination Matrix Quick Trigger */}
              <div className="pt-2 border-t border-stone-800 text-center">
                <button
                  type="button"
                  onClick={() => setIsAccurateSystemOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-serif text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group"
                >
                  <Shield className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span>★ Open Gold-Standard Divination System (Geomancy Shield, 12 Houses, Ephemeris & I Ching)</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SCREEN 2: RESULT SCREEN (CLEAN PROPHECY + PRESCRIPTION) */
          <motion.div
            key="result-screen"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6 sm:space-y-7 pb-8"
          >
            {/* Top Navigation Bar: Return to New Reading Start */}
            <div className="flex items-center justify-between gap-3 pb-1">
              <button
                type="button"
                onClick={handleNewReading}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-amber-300 hover:text-amber-100 bg-stone-900/90 hover:bg-stone-850 px-4 py-2.5 rounded-xl border border-amber-500/40 hover:border-amber-400 transition-all shadow-sm group font-bold"
              >
                <RotateCcw className="w-4 h-4 text-amber-400 group-hover:-rotate-45 transition-transform" />
                <span>Return to New Reading Start</span>
              </button>
              <button
                type="button"
                onClick={scrollToStartOfPage}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-stone-300 hover:text-amber-200 bg-stone-900/90 hover:bg-stone-850 px-4 py-2 rounded-xl border border-stone-800 hover:border-amber-500/40 transition-all shadow-sm"
              >
                <ArrowUp className="w-4 h-4 text-amber-400" />
                <span>Top of Prophecy</span>
              </button>
            </div>

            {/* Title & Target Date / Inquiry Header */}
            <div className="bg-gradient-to-b from-stone-900/95 to-stone-950/95 border border-amber-500/40 rounded-3xl p-6 sm:p-9 text-center space-y-3.5 shadow-2xl backdrop-blur-md">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-400 font-bold">
                Your Chthonic Prophecy
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-200 tracking-wide">
                {currentReading.interpretation.oracularTitle}
              </h2>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-200 text-sm font-mono font-semibold">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Target Date: {currentReading.targetFutureDate}</span>
              </div>

              {/* Inquiry Display */}
              {currentReading.question && currentReading.question !== 'General Inquiry of the Mantle' && (
                <div className="text-sm sm:text-base text-stone-300 font-serif pt-1.5">
                  <span className="text-stone-400 font-mono uppercase tracking-wider text-xs font-bold">Inquiry:</span>{' '}
                  <span className="text-stone-100 font-medium">"{currentReading.question}"</span>
                </div>
              )}
            </div>

            {/* DIRECT ORACULAR ANSWER TO INQUIRY CARD */}
            <div className="bg-gradient-to-br from-stone-900/95 via-amber-950/20 to-stone-900/95 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-[0_0_30px_rgba(245,158,11,0.15)] backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/30 pb-3">
                <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <span>Direct Answer to Your Inquiry</span>
                </div>
                <div className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40">
                  Target Station: {currentReading.targetFutureDate}
                </div>
              </div>

              {/* Inquiry Highlight */}
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Your Inscribed Question:
                </div>
                <p className="text-base sm:text-lg font-serif font-bold text-amber-100 italic">
                  "{currentReading.question || 'What key events and personal breakthroughs will manifest by this date?'}"
                </p>
              </div>

              {/* Direct Answer Body */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/85 border border-amber-500/30 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wide text-amber-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>The Mantle’s Answer:</span>
                </div>
                <p className="text-sm sm:text-base text-stone-100 font-serif leading-relaxed">
                  {currentReading.interpretation.futurePrediction?.manifestEvent ||
                   currentReading.interpretation.strataInterpretations?.[0]?.revelation ||
                   'A decisive and tangible breakthrough will physically manifest on or before this appointed date.'}
                </p>
              </div>

              {/* Direct Strategic Guidance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm font-serif">
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
                    What Dissolves:
                  </span>
                  <span className="text-stone-300">
                    {currentReading.interpretation.futurePrediction?.dissolvingObstacle || 'Lingering resistance and hesitation.'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-sky-400 font-bold block">
                    Your Choice Point:
                  </span>
                  <span className="text-stone-300">
                    {currentReading.interpretation.futurePrediction?.pivotalChoicePoint || 'Choose authentic sovereignty over familiar comfort.'}
                  </span>
                </div>
              </div>
            </div>

            {/* MINE UNEARTHED Card */}
            {currentReading.drawnMines[0] && (() => {
              const m = currentReading.drawnMines[0].mine;
              const mineType = m.depthCategory || 'Subterranean Shaft';
              const mineStatus = m.discoveryYear ? `Documented Seam (${m.discoveryYear})` : 'Active Mantle Seam';
              const locationStr = m.location ? `${m.location}, ${m.country}` : m.country;
              const headerLine = `${locationStr} — ${m.name} — ${mineType} — ${mineStatus}`;

              return (
                <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-3.5 shadow-xl">
                  <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                    <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <span>Mine Unearthed</span>
                  </div>

                  <div className="font-serif font-bold text-lg sm:text-2xl text-white leading-snug">
                    {headerLine}
                  </div>

                  <div className="text-xs sm:text-sm text-amber-300 font-mono font-medium flex flex-wrap items-center gap-2 sm:gap-3">
                    <span>Primary Resonance: {m.primaryMineral}</span>
                    <span>•</span>
                    <span>Depth: -{m.depthMeters}m</span>
                    <span>•</span>
                    <span className="italic">{m.feminineArchetype}</span>
                  </div>

                  <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed pt-2.5 border-t border-stone-800">
                    {m.uprightMeaning || 'Deep earth resonance opening clear sovereign channels for date manifestation.'}
                  </p>
                </div>
              );
            })()}

            {/* GOOGLE MAPS INTEGRATION PINPOINTING UNEARTHED MINE */}
            {currentReading.drawnMines[0] && (
              <MineLocationMap mine={currentReading.drawnMines[0].mine} />
            )}

            {/* GOLD-STANDARD ACCURATE DIVINATION SYSTEM ACCESS BANNER */}
            <div className="bg-gradient-to-r from-amber-950/40 via-stone-900/90 to-stone-950 border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Gold-Standard Divination System</span>
                </div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                  Full 16-Figure Shield, 12 Houses, Ephemeris & 64 Hexagrams
                </h4>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Inspect the mathematical shield chart derivation, planetary hours ruler, lunar mansion, and tectonic resonance for this reading.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAccurateSystemOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-xs sm:text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>View Full System</span>
              </button>
            </div>

            {/* PROPHECY (4 Parts) */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-sm sm:text-base font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Prophecy Revelations</span>
              </h3>

              <div className="space-y-4 text-base font-serif leading-relaxed">
                {/* 1. Manifestation */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                  <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase tracking-wider">
                    ✦ Manifestation
                  </div>
                  <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                    {currentReading.interpretation.futurePrediction?.manifestEvent ||
                      'A decisive and tangible breakthrough will physically crystallize by the target date.'}
                  </p>
                </div>

                {/* 2. Obstacle Dissolving */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                  <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    ✦ Obstacle Dissolving
                  </div>
                  <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                    {currentReading.interpretation.futurePrediction?.dissolvingObstacle ||
                      'Lingering blockages, outdated expectations, and structural resistance will completely dissolve.'}
                  </p>
                </div>

                {/* 3. Choice Point */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                  <div className="text-xs sm:text-sm font-mono font-bold text-sky-400 uppercase tracking-wider">
                    ✦ Choice Point
                  </div>
                  <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                    {currentReading.interpretation.futurePrediction?.pivotalChoicePoint ||
                      'A critical crossroads where you must choose between remaining in familiar safe strata or boring boldly into your authentic sovereignty.'}
                  </p>
                </div>

                {/* 4. Bedrock Destiny */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                  <div className="text-xs sm:text-sm font-mono font-bold text-purple-400 uppercase tracking-wider">
                    ✦ Bedrock Destiny
                  </div>
                  <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                    {currentReading.interpretation.futurePrediction?.longTermOutcome ||
                      'Permanent elevation and grounding into enduring bedrock clarity and long-term peace.'}
                  </p>
                </div>
              </div>
            </div>

            {/* UNIQUE MINERAL GEOMANTIC PRESCRIPTION */}
            <MineralPrescriptionCard
              reading={currentReading}
              mine={currentReading.drawnMines[0]?.mine || activeMinesList[0]}
            />

            {/* ENVIRONMENTAL WARNING & EARTH MANDATE */}
            {(currentReading.interpretation.environmentalWarning ||
              currentReading.interpretation.whyMiningMustStop ||
              currentReading.interpretation.earthMandate) && (
              <div className="bg-stone-900/95 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="text-sm sm:text-base font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 border-b border-stone-800 pb-3.5">
                  <span className="text-emerald-300">✦</span> Environmental Warning & Earth Mandate <span className="text-emerald-300">✦</span>
                </div>

                {/* Environmental Warning */}
                {currentReading.interpretation.environmentalWarning && (
                  <div className="space-y-2">
                    <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase tracking-wide">
                      Environmental Warning
                    </div>
                    <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed">
                      {currentReading.interpretation.environmentalWarning}
                    </p>
                  </div>
                )}

                {/* Why Mining Must Stop */}
                {currentReading.interpretation.whyMiningMustStop && (
                  <div className="space-y-2 bg-stone-950/80 border border-stone-800 p-4 sm:p-5 rounded-2xl">
                    <div className="text-xs sm:text-sm font-mono font-bold text-rose-400 uppercase tracking-wide">
                      Why Mining Must Stop
                    </div>
                    <p className="text-sm sm:text-base text-rose-100 font-serif italic leading-relaxed">
                      "{currentReading.interpretation.whyMiningMustStop}"
                    </p>
                  </div>
                )}

                {/* Earth Mandate */}
                {currentReading.interpretation.earthMandate && (
                  <div className="space-y-2 bg-emerald-950/40 border border-emerald-500/40 p-4 sm:p-5 rounded-2xl">
                    <div className="text-xs sm:text-sm font-mono font-bold text-emerald-300 uppercase tracking-wide">
                      Earth Mandate
                    </div>
                    <p className="text-sm sm:text-base text-emerald-100 font-serif font-medium leading-relaxed">
                      {currentReading.interpretation.earthMandate}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* SYNTHESIS: Date Geometry + Mine Resonance */}
            {currentReading.interpretation.tectonicSynthesis && (
              <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-2.5 shadow-xl">
                <div className="text-xs sm:text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> Synthesis
                </div>
                <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed">
                  {currentReading.interpretation.tectonicSynthesis}
                </p>
              </div>
            )}

            {/* SHADOW VEIN & MANDATE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Shadow Vein */}
              {currentReading.interpretation.shadowVein && (
                <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/90 border border-red-500/40 space-y-2 shadow-xl">
                  <div className="text-xs sm:text-sm font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" /> Shadow Vein
                  </div>
                  <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed">
                    {currentReading.interpretation.shadowVein}
                  </p>
                </div>
              )}

              {/* Chthonic Mandate */}
              {currentReading.interpretation.chthonicMandate && (
                <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/90 border border-amber-500/40 space-y-2 shadow-xl">
                  <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" /> Chthonic Mandate
                  </div>
                  <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed">
                    {currentReading.interpretation.chthonicMandate}
                  </p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="space-y-3.5 pt-4">
              {/* Row 1: Copy Prophecy & Download Prophecy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={handleCopyProphecy}
                  className={`py-3.5 sm:py-4 px-5 rounded-2xl font-serif text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isCopied
                      ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                      : 'bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-100 hover:text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 text-amber-400" />
                      <span>Copy Prophecy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadProphecy}
                  className={`py-3.5 sm:py-4 px-5 rounded-2xl font-serif text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isDownloaded
                      ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                      : 'bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-100 hover:text-white'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span>Downloaded Scroll!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 text-amber-400" />
                      <span>Download Prophecy (.txt)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Save Reading & New Reading */}
              <div className="flex items-center gap-3.5">
                {/* Save Reading */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaved}
                  className={`flex-1 py-4 rounded-2xl font-serif text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 transition-all shadow-md ${
                    isSaved
                      ? 'bg-emerald-950/90 border border-emerald-500/70 text-emerald-300 cursor-default'
                      : 'bg-stone-900 hover:bg-stone-800 border border-amber-500/50 text-amber-300 hover:border-amber-400'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span>Saved to Archive</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-5 h-5 text-amber-400" />
                      <span>Save Reading</span>
                    </>
                  )}
                </button>

                {/* Return to New Reading Start */}
                <button
                  type="button"
                  onClick={handleNewReading}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-serif text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-[0.99] group"
                >
                  <RotateCcw className="w-5 h-5 text-stone-950 group-hover:-rotate-45 transition-transform" />
                  <span>Return to New Reading Start</span>
                </button>
              </div>

              {/* Row 3: Return to New Reading Start Full Action */}
              <button
                type="button"
                onClick={handleNewReading}
                className="w-full py-4 px-5 rounded-2xl bg-stone-900 hover:bg-stone-850 border border-amber-500/50 hover:border-amber-400 text-amber-200 hover:text-amber-100 font-serif text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] group"
              >
                <RotateCcw className="w-5 h-5 text-amber-400 group-hover:-rotate-45 transition-transform" />
                <span>Return to New Reading Start</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Return to New Reading Start Button */}
      {showScrollTop && currentReading && (
        <button
          type="button"
          onClick={handleNewReading}
          className="fixed bottom-6 right-6 z-50 py-3 px-4 sm:px-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-serif font-bold text-xs sm:text-sm shadow-[0_4px_25px_rgba(245,158,11,0.5)] flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border-2 border-stone-950 group"
          aria-label="Return to new reading start"
        >
          <RotateCcw className="w-4 h-4 text-stone-950 stroke-[2.5] group-hover:-rotate-45 transition-transform" />
          <span>Return to New Reading Start</span>
        </button>
      )}

      {/* Gold-Standard Accurate Divination System Modal */}
      <AccurateDivinationSystemModal
        isOpen={isAccurateSystemOpen}
        onClose={() => setIsAccurateSystemOpen(false)}
        currentMine={currentReading?.drawnMines[0]?.mine || activeMinesList[0]}
        question={currentReading?.question || inquiry || 'General Chthonic Alignment'}
        targetFutureDate={currentReading?.targetFutureDate || targetDate}
      />
    </div>
  );
};
