import React, { useState } from 'react';
import { DivinationReading } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  History,
  Trash2,
  Share2,
  Check,
  Calendar,
  Layers,
  BookOpen,
  Hourglass,
  Gem,
  Flame,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  readings: DivinationReading[];
  onDeleteReading: (id: string) => void;
  onClearAll: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  isOpen,
  onClose,
  readings,
  onDeleteReading,
  onClearAll,
}) => {
  const [selectedReading, setSelectedReading] = useState<DivinationReading | null>(
    readings.length > 0 ? readings[0] : null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyReading = (reading: DivinationReading) => {
    const text =
      `✦ CHTHONIC PROPHECY & PRESCRIPTION ✦\n` +
      `Title: ${reading.interpretation.oracularTitle}\n` +
      `Date Inscribed: ${new Date(reading.timestamp).toLocaleDateString()}\n` +
      (reading.targetFutureDate ? `Target Future Horizon: ${reading.targetFutureDate} (${reading.timeHorizon || ''})\n` : '') +
      `Inquiry: "${reading.question}"\n\n` +
      `Mantle Voice:\n"${reading.interpretation.mantleStrophe}"\n\n` +
      `Mines Unearthed:\n` +
      reading.drawnMines
        .map(
          (d) =>
            `• ${d.position.name}: ${d.mine.name} (${d.mine.primaryMineral}) - ${
              d.isUpright ? 'Open Vein' : 'Deep Pressure'
            }`
        )
        .join('\n') +
      `\n\n` +
      (reading.interpretation.futurePrediction
        ? `Future Prediction:\n• Manifestation: ${reading.interpretation.futurePrediction.manifestEvent}\n• Dissolution: ${reading.interpretation.futurePrediction.dissolvingObstacle}\n• Choice Point: ${reading.interpretation.futurePrediction.pivotalChoicePoint}\n• Bedrock Outcome: ${reading.interpretation.futurePrediction.longTermOutcome}\n\n`
        : '') +
      (reading.interpretation.chthonicPrescription
        ? `Prescription:\n• Minerals: ${reading.interpretation.chthonicPrescription.prescribedMinerals.map(m => `${m.name} (${m.action})`).join('; ')}\n• Grounding: ${reading.interpretation.chthonicPrescription.groundingRitual}\n\n`
        : '') +
      `Tectonic Synthesis:\n${reading.interpretation.tectonicSynthesis}\n\n` +
      `Shadow Vein: ${reading.interpretation.shadowVein}\n` +
      `Chthonic Mandate: ${reading.interpretation.chthonicMandate}`;

    navigator.clipboard.writeText(text);
    setCopiedId(reading.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-stone-950 border border-amber-950/80 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
                  Subterranean Journal of Prophecy
                </h2>
                <p className="text-xs text-stone-400 font-serif">
                  {readings.length} {readings.length === 1 ? 'Reading' : 'Readings'} Inscribed in the Deep Mantle
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {readings.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="px-3 py-1.5 rounded-lg border border-red-900/50 text-rose-400 hover:bg-rose-950/40 text-xs font-serif transition-colors"
                >
                  Clear Journal
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Layout: List (Left) + Detail (Right) */}
          {readings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 flex-1 overflow-hidden">
              {/* Left Column: Reading List */}
              <div className="md:col-span-5 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {readings.map((reading) => {
                  const isSelected = selectedReading?.id === reading.id;
                  return (
                    <div
                      key={reading.id}
                      onClick={() => setSelectedReading(reading)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                          : 'bg-stone-900/40 border-stone-800/80 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-500" />
                          {new Date(reading.timestamp).toLocaleDateString()}
                        </span>
                        {reading.targetFutureDate && (
                          <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                            Target: {reading.targetFutureDate}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-serif font-bold text-stone-100 line-clamp-1">
                        {reading.interpretation.oracularTitle}
                      </h4>
                      <p className="text-xs text-stone-400 italic font-serif mt-0.5 line-clamp-1">
                        "{reading.question}"
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Selected Reading Inspection */}
              {selectedReading && (
                <div className="md:col-span-7 overflow-y-auto bg-stone-900/40 border border-stone-800 rounded-2xl p-6 scrollbar-thin space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div>
                      {selectedReading.targetFutureDate && (
                        <span className="text-[10px] font-mono text-amber-400 px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 inline-block mb-1">
                          TARGET PROPHETIC DATE: {selectedReading.targetFutureDate}
                        </span>
                      )}
                      <h3 className="text-xl font-serif font-bold text-stone-100">
                        {selectedReading.interpretation.oracularTitle}
                      </h3>
                      <p className="text-xs text-stone-400 italic mt-0.5">
                        Inquiry: "{selectedReading.question}"
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyReading(selectedReading)}
                        className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 hover:text-white transition-colors"
                        title="Copy Reading"
                      >
                        {copiedId === selectedReading.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          onDeleteReading(selectedReading.id);
                          const remaining = readings.filter((r) => r.id !== selectedReading.id);
                          setSelectedReading(remaining[0] || null);
                        }}
                        className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-rose-400 hover:bg-rose-950/50 transition-colors"
                        title="Delete Reading"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mantle Strophe */}
                  <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 text-center">
                    <p className="text-sm font-serif italic text-amber-200">
                      "{selectedReading.interpretation.mantleStrophe}"
                    </p>
                  </div>

                  {/* Future Prediction Box if available */}
                  {selectedReading.interpretation.futurePrediction && (
                    <div className="bg-stone-950/70 border border-amber-500/20 rounded-xl p-4 space-y-2">
                      <h5 className="text-xs font-serif uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                        <Hourglass className="w-3.5 h-3.5" /> Future Prognostication
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
                        <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800">
                          <strong className="text-amber-300 block mb-0.5">Manifestation:</strong>
                          <span className="text-stone-300">{selectedReading.interpretation.futurePrediction.manifestEvent}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800">
                          <strong className="text-indigo-300 block mb-0.5">Dissolution:</strong>
                          <span className="text-stone-300">{selectedReading.interpretation.futurePrediction.dissolvingObstacle}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chthonic Prescription if available */}
                  {selectedReading.interpretation.chthonicPrescription && (
                    <div className="bg-stone-950/70 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                      <h5 className="text-xs font-serif uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                        <Gem className="w-3.5 h-3.5" /> Prescribed Earthly Remedies
                      </h5>
                      <p className="text-xs text-stone-300 font-serif">
                        <strong className="text-emerald-300">Grounding Ritual:</strong> {selectedReading.interpretation.chthonicPrescription.groundingRitual}
                      </p>
                    </div>
                  )}

                  {/* Unearthed Mines */}
                  <div>
                    <h5 className="text-xs font-serif uppercase tracking-wider text-stone-400 font-bold mb-2">
                      Mines Unearthed
                    </h5>
                    <div className="space-y-2">
                      {selectedReading.drawnMines.map((d, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-xs font-serif flex items-center justify-between"
                        >
                          <div>
                            <span className="text-amber-300 font-bold">{d.position.name}:</span>{' '}
                            <span className="text-stone-200">{d.mine.name}</span>{' '}
                            <span className="text-stone-500 font-mono">({d.mine.primaryMineral})</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                              d.isUpright
                                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                                : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                            }`}
                          >
                            {d.isUpright ? 'Open Vein' : 'Deep Pressure'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tectonic Synthesis */}
                  <div>
                    <h5 className="text-xs font-serif uppercase tracking-wider text-amber-400 font-bold mb-1">
                      Tectonic Synthesis
                    </h5>
                    <p className="text-xs text-stone-300 font-serif leading-relaxed">
                      {selectedReading.interpretation.tectonicSynthesis}
                    </p>
                  </div>

                  {/* Guidance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 text-stone-300">
                      <span className="text-rose-400 font-bold block mb-1">Shadow Vein:</span>
                      {selectedReading.interpretation.shadowVein}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-stone-300">
                      <span className="text-emerald-400 font-bold block mb-1">Chthonic Mandate:</span>
                      {selectedReading.interpretation.chthonicMandate}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 flex flex-col items-center justify-center">
              <BookOpen className="w-12 h-12 text-stone-600 mb-3" />
              <p className="text-base font-serif text-stone-300 font-semibold">
                Your Journal is Empty
              </p>
              <p className="text-xs text-stone-500 font-serif mt-1 max-w-sm">
                Perform a reading in the Oracle Chamber or cast crystals on the Lithic Scatter plate
                to inscribe prophecies here.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
