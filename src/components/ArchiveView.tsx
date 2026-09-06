import React, { useState } from 'react';
import { DivinationReading } from '../types';
import { formatProphecyText, downloadFile } from '../utils/offlineEngine';
import { MineralPrescriptionCard } from './MineralPrescriptionCard';
import { motion, AnimatePresence } from 'motion/react';
import {
  Archive,
  Calendar,
  Trash2,
  ChevronRight,
  Sparkles,
  Gem,
  ArrowLeft,
  ShieldAlert,
  Wind,
  Copy,
  Download,
  Check,
} from 'lucide-react';

interface ArchiveViewProps {
  savedReadings: DivinationReading[];
  onDeleteReading: (id: string) => void;
  onClearAll: () => void;
  onNewReading: () => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  savedReadings,
  onDeleteReading,
  onClearAll,
  onNewReading,
}) => {
  const [selectedReading, setSelectedReading] = useState<DivinationReading | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);

  const handleCopy = async (reading: DivinationReading) => {
    const text = formatProphecyText(reading);
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
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = (reading: DivinationReading) => {
    const text = formatProphecyText(reading);
    const dateStr = reading.targetFutureDate || new Date().toISOString().split('T')[0];
    downloadFile(text, `chthonic_prophecy_${dateStr}.txt`, 'text/plain');
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {selectedReading ? (
          /* Detailed View of an Archived Reading */
          <motion.div
            key="archived-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6 pb-8"
          >
            {/* Top Back Navigation */}
            <button
              onClick={() => setSelectedReading(null)}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-amber-300 font-serif text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Archive List</span>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-b from-stone-900/95 to-stone-950/95 border border-amber-500/40 rounded-3xl p-6 sm:p-9 text-center space-y-3.5 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-200 text-sm font-mono font-semibold">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Target Date: {selectedReading.targetFutureDate || 'Unfolding Future'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-200">
                {selectedReading.interpretation.oracularTitle}
              </h2>

              {selectedReading.interpretation.mantleStrophe && (
                <p className="text-sm sm:text-base text-stone-200 font-serif italic whitespace-pre-line leading-relaxed max-w-xl mx-auto opacity-95 border-t border-b border-stone-800 py-3.5">
                  "{selectedReading.interpretation.mantleStrophe}"
                </p>
              )}

              {selectedReading.question && selectedReading.question !== 'General Inquiry of the Mantle' && (
                <div className="text-sm sm:text-base text-stone-300 font-serif">
                  <strong className="text-stone-400 font-mono uppercase tracking-wider text-xs">Inquiry:</strong>{' '}
                  <span className="text-stone-100">"{selectedReading.question}"</span>
                </div>
              )}
            </div>

            {/* Unearthed Mine */}
            {selectedReading.drawnMines[0] && (
              <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-amber-400 uppercase font-bold">
                  <span className="flex items-center gap-2">
                    <Gem className="w-5 h-5" /> Mine Unearthed
                  </span>
                  <span className="text-stone-300">Depth -{selectedReading.drawnMines[0].mine.depthMeters}m</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {selectedReading.drawnMines[0].mine.name}
                </h3>
                <p className="text-sm text-stone-300 font-sans">
                  {selectedReading.drawnMines[0].mine.location}, {selectedReading.drawnMines[0].mine.country} •{' '}
                  <span className="text-amber-300 font-mono font-semibold">{selectedReading.drawnMines[0].mine.primaryMineral}</span>
                </p>
                <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed pt-2.5 border-t border-stone-800">
                  {selectedReading.drawnMines[0].mine.uprightMeaning}
                </p>
              </div>
            )}

            {/* Prophecy (4 Parts) */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
              <h3 className="text-sm sm:text-base font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Prophecy (4 Strata)</span>
              </h3>
              <div className="space-y-3.5 text-sm sm:text-base font-serif leading-relaxed">
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                  <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase">✦ 1. Manifesting Breakthrough</div>
                  <p className="text-stone-200">{selectedReading.interpretation.futurePrediction?.manifestEvent}</p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                  <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400 uppercase">✦ 2. Dissolving Obstacle</div>
                  <p className="text-stone-200">{selectedReading.interpretation.futurePrediction?.dissolvingObstacle}</p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                  <div className="text-xs sm:text-sm font-mono font-bold text-sky-400 uppercase">✦ 3. Pivotal Crossroads</div>
                  <p className="text-stone-200">{selectedReading.interpretation.futurePrediction?.pivotalChoicePoint}</p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                  <div className="text-xs sm:text-sm font-mono font-bold text-purple-400 uppercase">✦ 4. Bedrock Destiny</div>
                  <p className="text-stone-200">{selectedReading.interpretation.futurePrediction?.longTermOutcome}</p>
                </div>
              </div>
            </div>

            {/* Unique Mineral Geomantic Prescription */}
            <MineralPrescriptionCard
              reading={selectedReading}
              mine={selectedReading.drawnMines[0]?.mine || {
                id: 'archive_mine',
                name: 'Subterranean Mantle Seam',
                location: 'Earth Crust',
                country: 'Global',
                continent: 'Africa',
                lat: 0,
                lng: 0,
                depthMeters: 3500,
                depthCategory: 'Abyssal Deep',
                primaryMineral: 'Bedrock Crystal',
                secondaryMinerals: ['Hematite', 'Quartz'],
                mineralCategory: 'Native Crystalline',
                elementalAffinity: 'Earth',
                planetaryRuler: 'Saturn',
                arcanaArchetype: 'The Foundation',
                feminineArchetype: 'The Mantle Keeper',
                cartoucheTitle: 'Custos Terrae',
                cartographicFigure: 'Enthroned Mother Earth',
                cartographicSilhouetteType: 'goddess-enthroned',
                uprightMeaning: 'Deep stability and enduring bedrock truth.',
                invertedMeaning: 'Subterranean pressure requiring patient cooling.',
                mantleMessage: 'Listen to the earth beneath your feet.',
                historicalContext: 'Ancient crystalline stratum.',
                chthonicKeyword: 'Foundation',
                mineralColor: '#f59e0b',
              }}
            />

            {/* Environmental Warning & Earth Mandate */}
            {(selectedReading.interpretation.environmentalWarning ||
              selectedReading.interpretation.whyMiningMustStop ||
              selectedReading.interpretation.earthMandate) && (
              <div className="bg-stone-900/95 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <h3 className="text-sm sm:text-base font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                  <span>✦</span>
                  <span>Environmental Warning & Earth Mandate</span>
                </h3>
                {selectedReading.interpretation.environmentalWarning && (
                  <div className="space-y-1.5">
                    <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase">Environmental Warning</div>
                    <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed">
                      {selectedReading.interpretation.environmentalWarning}
                    </p>
                  </div>
                )}
                {selectedReading.interpretation.whyMiningMustStop && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                    <div className="text-xs sm:text-sm font-mono font-bold text-rose-400 uppercase">Why Mining Must Stop</div>
                    <p className="text-sm sm:text-base text-rose-100 font-serif italic leading-relaxed">
                      "{selectedReading.interpretation.whyMiningMustStop}"
                    </p>
                  </div>
                )}
                {selectedReading.interpretation.earthMandate && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5">
                    <div className="text-xs sm:text-sm font-mono font-bold text-emerald-300 uppercase">Earth Mandate</div>
                    <p className="text-sm sm:text-base text-emerald-100 font-serif leading-relaxed">
                      {selectedReading.interpretation.earthMandate}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Synthesis, Shadow Vein & Mandate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedReading.interpretation.shadowVein && (
                <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/90 border border-red-500/40 space-y-1.5 shadow-xl">
                  <div className="text-xs sm:text-sm font-mono font-bold text-red-400 uppercase">Shadow Vein</div>
                  <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed">{selectedReading.interpretation.shadowVein}</p>
                </div>
              )}
              {selectedReading.interpretation.chthonicMandate && (
                <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/90 border border-amber-500/40 space-y-1.5 shadow-xl">
                  <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase">Chthonic Mandate</div>
                  <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed">{selectedReading.interpretation.chthonicMandate}</p>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="space-y-3.5 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => handleCopy(selectedReading)}
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
                  onClick={() => handleDownload(selectedReading)}
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

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReading(null)}
                  className="px-5 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-100 font-serif text-sm font-bold"
                >
                  Back to Archive
                </button>
                <button
                  type="button"
                  onClick={onNewReading}
                  className="px-5 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-sm font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Return to New Reading Start</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteReading(selectedReading.id);
                    setSelectedReading(null);
                  }}
                  className="px-5 py-3.5 rounded-2xl bg-red-950/50 hover:bg-red-900/70 border border-red-800/60 text-red-200 font-serif text-sm font-bold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Reading</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Archive List Screen */
          <motion.div
            key="archive-list"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <h1 className="text-3xl font-serif font-bold text-amber-200">Archive</h1>
                <p className="text-sm text-stone-300 font-serif pt-0.5">
                  {savedReadings.length} {savedReadings.length === 1 ? 'saved prophecy' : 'saved prophecies'}
                </p>
              </div>
              {savedReadings.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-semibold text-stone-300 hover:text-red-400 hover:bg-stone-900 transition-all border border-stone-800 hover:border-red-900/50"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Readings List */}
            {savedReadings.length === 0 ? (
              <div className="bg-stone-900/70 border border-stone-800 rounded-3xl p-10 sm:p-12 text-center space-y-4 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-stone-800/90 border border-stone-700 flex items-center justify-center mx-auto text-amber-400">
                  <Archive className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-serif font-bold text-stone-100">No Saved Prophecies Yet</h3>
                  <p className="text-sm text-stone-300 font-serif max-w-md mx-auto leading-relaxed">
                    When you unveil a prophecy reading, tap "Save Reading" to preserve it in your personal archive.
                  </p>
                </div>
                <button
                  onClick={onNewReading}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-sm font-bold transition-all shadow-md inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Unveil Prophecy</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {savedReadings.map((reading) => {
                  const leadMine = reading.drawnMines[0]?.mine;
                  const formattedDate = new Date(reading.timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <div
                      key={reading.id}
                      onClick={() => setSelectedReading(reading)}
                      className="group bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl p-5 sm:p-6 transition-all cursor-pointer flex items-center justify-between gap-4 shadow-md"
                    >
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 text-xs font-mono text-stone-300">
                          <span className="text-amber-300 font-bold">Target: {reading.targetFutureDate || 'Future'}</span>
                          <span>•</span>
                          <span>Inscribed: {formattedDate}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100 group-hover:text-amber-200 transition-colors truncate">
                          {reading.interpretation.oracularTitle}
                        </h3>

                        {leadMine && (
                          <p className="text-xs sm:text-sm text-stone-300 font-serif truncate">
                            {leadMine.name} • <span className="text-amber-300 font-semibold">{leadMine.primaryMineral}</span>
                            {reading.question && reading.question !== 'General Inquiry of the Mantle' && (
                              <span className="italic text-stone-400 ml-1"> — "{reading.question}"</span>
                            )}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteReading(reading.id);
                          }}
                          className="p-2.5 rounded-xl text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <ChevronRight className="w-5 h-5 text-stone-500 group-hover:text-amber-400 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
