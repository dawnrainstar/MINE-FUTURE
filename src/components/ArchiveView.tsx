import React, { useState } from 'react';
import { DivinationReading } from '../types';
import { formatProphecyText, downloadFile } from '../utils/offlineEngine';
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
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-300 font-serif text-xs flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Archive List</span>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Target Date: {selectedReading.targetFutureDate || 'Unfolding Future'}</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-amber-200">
                {selectedReading.interpretation.oracularTitle}
              </h2>

              {selectedReading.interpretation.mantleStrophe && (
                <p className="text-xs sm:text-sm text-stone-300 font-serif italic whitespace-pre-line leading-relaxed max-w-lg mx-auto opacity-90 border-t border-b border-stone-800/80 py-3">
                  "{selectedReading.interpretation.mantleStrophe}"
                </p>
              )}

              {selectedReading.question && selectedReading.question !== 'General Inquiry of the Mantle' && (
                <div className="text-xs text-stone-400 font-serif">
                  <strong className="text-stone-300 font-mono uppercase tracking-wider text-[10px]">Inquiry:</strong>{' '}
                  "{selectedReading.question}"
                </div>
              )}
            </div>

            {/* Unearthed Mine */}
            {selectedReading.drawnMines[0] && (
              <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Gem className="w-4 h-4" /> Mine Unearthed
                  </span>
                  <span className="text-stone-400">Depth -{selectedReading.drawnMines[0].mine.depthMeters}m</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {selectedReading.drawnMines[0].mine.name}
                </h3>
                <p className="text-xs text-stone-400 font-sans">
                  {selectedReading.drawnMines[0].mine.location}, {selectedReading.drawnMines[0].mine.country} •{' '}
                  <span className="text-amber-300 font-mono">{selectedReading.drawnMines[0].mine.primaryMineral}</span>
                </p>
                <p className="text-xs text-stone-300 font-serif pt-2 border-t border-stone-800">
                  {selectedReading.drawnMines[0].mine.uprightMeaning}
                </p>
              </div>
            )}

            {/* Prophecy (4 Parts) */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Prophecy (4 Strata)</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm font-serif">
                <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-300">✦ 1. Manifesting Breakthrough</div>
                  <p className="text-stone-300">{selectedReading.interpretation.futurePrediction?.manifestEvent}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-400">✦ 2. Dissolving Obstacle</div>
                  <p className="text-stone-300">{selectedReading.interpretation.futurePrediction?.dissolvingObstacle}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-sky-400">✦ 3. Pivotal Crossroads</div>
                  <p className="text-stone-300">{selectedReading.interpretation.futurePrediction?.pivotalChoicePoint}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-mono font-bold text-purple-400">✦ 4. Bedrock Destiny</div>
                  <p className="text-stone-300">{selectedReading.interpretation.futurePrediction?.longTermOutcome}</p>
                </div>
              </div>
            </div>

            {/* Prescription */}
            {selectedReading.interpretation.chthonicPrescription && (
              <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 space-y-3">
                <h3 className="text-sm font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                  <Gem className="w-4 h-4" />
                  <span>Prescription & Ritual</span>
                </h3>
                {selectedReading.interpretation.chthonicPrescription.groundingRitual && (
                  <p className="text-xs text-stone-300 font-serif leading-relaxed">
                    <strong className="text-amber-300 font-mono uppercase">Ritual:</strong>{' '}
                    {selectedReading.interpretation.chthonicPrescription.groundingRitual}
                  </p>
                )}
                {selectedReading.interpretation.chthonicPrescription.mantleRemedy && (
                  <p className="text-xs text-stone-300 font-serif leading-relaxed pt-2 border-t border-stone-800">
                    <strong className="text-cyan-400 font-mono uppercase">Breath:</strong>{' '}
                    {selectedReading.interpretation.chthonicPrescription.mantleRemedy}
                  </p>
                )}
              </div>
            )}

            {/* Environmental Warning & Earth Mandate */}
            {(selectedReading.interpretation.environmentalWarning ||
              selectedReading.interpretation.whyMiningMustStop ||
              selectedReading.interpretation.earthMandate) && (
              <div className="bg-stone-900/80 border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-lg">
                <h3 className="text-sm font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                  <span>✦</span>
                  <span>Environmental Warning & Earth Mandate</span>
                </h3>
                {selectedReading.interpretation.environmentalWarning && (
                  <div className="space-y-1">
                    <div className="text-xs font-mono font-semibold text-amber-400/90 uppercase">Environmental Warning</div>
                    <p className="text-xs text-stone-300 font-serif leading-relaxed">
                      {selectedReading.interpretation.environmentalWarning}
                    </p>
                  </div>
                )}
                {selectedReading.interpretation.whyMiningMustStop && (
                  <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
                    <div className="text-xs font-mono font-semibold text-rose-400 uppercase">Why Mining Must Stop</div>
                    <p className="text-xs text-stone-300 font-serif italic leading-relaxed">
                      "{selectedReading.interpretation.whyMiningMustStop}"
                    </p>
                  </div>
                )}
                {selectedReading.interpretation.earthMandate && (
                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                    <div className="text-xs font-mono font-semibold text-emerald-300 uppercase">Earth Mandate</div>
                    <p className="text-xs text-emerald-100 font-serif leading-relaxed">
                      {selectedReading.interpretation.earthMandate}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Synthesis, Shadow Vein & Mandate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedReading.interpretation.shadowVein && (
                <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-1">
                  <div className="text-xs font-mono font-bold text-red-400 uppercase">Shadow Vein</div>
                  <p className="text-xs text-stone-300 font-serif">{selectedReading.interpretation.shadowVein}</p>
                </div>
              )}
              {selectedReading.interpretation.chthonicMandate && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-300 uppercase">Chthonic Mandate</div>
                  <p className="text-xs text-stone-300 font-serif">{selectedReading.interpretation.chthonicMandate}</p>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleCopy(selectedReading)}
                  className={`py-3 px-4 rounded-2xl font-serif text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
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
                  onClick={() => handleDownload(selectedReading)}
                  className={`py-3 px-4 rounded-2xl font-serif text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
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

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setSelectedReading(null)}
                  className="px-5 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-serif text-xs font-semibold"
                >
                  Back to Archive
                </button>
                <button
                  onClick={() => {
                    onDeleteReading(selectedReading.id);
                    setSelectedReading(null);
                  }}
                  className="px-4 py-3 rounded-2xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 font-serif text-xs font-semibold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
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
                <h1 className="text-2xl font-serif font-bold text-amber-200">Archive</h1>
                <p className="text-xs text-stone-400 font-serif">
                  {savedReadings.length} {savedReadings.length === 1 ? 'saved prophecy' : 'saved prophecies'}
                </p>
              </div>
              {savedReadings.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-serif text-stone-400 hover:text-red-400 hover:bg-stone-900 transition-all border border-transparent hover:border-stone-800"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Readings List */}
            {savedReadings.length === 0 ? (
              <div className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-center mx-auto text-amber-400">
                  <Archive className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-serif font-bold text-stone-200">No Saved Prophecies Yet</h3>
                  <p className="text-xs text-stone-400 font-serif max-w-sm mx-auto">
                    When you unveil a prophecy reading, tap "Save Reading" to preserve it in your personal archive.
                  </p>
                </div>
                <button
                  onClick={onNewReading}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Unveil Prophecy</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
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
                      className="group bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer flex items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
                          <span className="text-amber-400">Target: {reading.targetFutureDate || 'Future'}</span>
                          <span>•</span>
                          <span>Inscribed: {formattedDate}</span>
                        </div>

                        <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-200 transition-colors truncate">
                          {reading.interpretation.oracularTitle}
                        </h3>

                        {leadMine && (
                          <p className="text-xs text-stone-400 font-serif truncate">
                            {leadMine.name} • <span className="text-amber-300/90">{leadMine.primaryMineral}</span>
                            {reading.question && reading.question !== 'General Inquiry of the Mantle' && (
                              <span className="italic text-stone-500 ml-1"> — "{reading.question}"</span>
                            )}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteReading(reading.id);
                          }}
                          className="p-2 rounded-xl text-stone-500 hover:text-red-400 hover:bg-stone-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-amber-400 transition-colors" />
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
