import React, { useState } from 'react';
import { DivinationReading, WorldMine } from '../types';
import { exportMinesToCSV, exportMinesToGeoJSON } from '../utils/mineDatabase';
import { sound } from '../utils/audio';
import {
  HardDrive,
  Download,
  FileText,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  X,
  Share2,
  Cloud,
  Check,
  Compass,
} from 'lucide-react';

interface GoogleDriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  readings: DivinationReading[];
  mines: WorldMine[];
}

export const GoogleDriveSyncModal: React.FC<GoogleDriveSyncModalProps> = ({
  isOpen,
  onClose,
  readings,
  mines,
}) => {
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleExportReadingsMarkdown = () => {
    setIsExporting(true);
    sound.playMineralClink();

    const markdownContent = readings
      .map((r, i) => {
        return `
# Divination Scroll #${readings.length - i}: ${r.question}
**Timestamp:** ${new Date(r.timestamp).toLocaleString()}
**Target Future Date:** ${r.targetFutureDate || 'Unspecified'} (${r.timeHorizon || 'N/A'})
**Spread Type:** ${r.spreadType.toUpperCase()}
**Oracle Title:** ${r.interpretation?.oracularTitle || 'Subterranean Revelation'}

---

## 📜 Mantle Strophe
> "${r.interpretation?.mantleStrophe || ''}"

## 🗺️ Drawn Strata Excavations
${r.drawnMines
  .map(
    (dm) => `
### ${dm.position.name} — ${dm.mine.name} (${dm.isUpright ? 'Upright' : 'Inverted / Bedrock Undercurrent'})
- **Location:** ${dm.mine.location}, ${dm.mine.country} (-${dm.mine.depthMeters}m)
- **Primary Mineral:** ${dm.mine.primaryMineral} (${dm.mine.mineralCategory})
- **Deity Spirit:** ${dm.mine.feminineArchetype}
- **Interpretation:** ${dm.isUpright ? dm.mine.uprightMeaning : dm.mine.invertedMeaning}
`
  )
  .join('\n')}

## 🔮 Tectonic Future Prediction
${r.interpretation?.futurePrediction ? `
- **Manifesting Event:** ${r.interpretation.futurePrediction.manifestEvent}
- **Dissolving Obstacle:** ${r.interpretation.futurePrediction.dissolvingObstacle}
- **Pivotal Choice Point:** ${r.interpretation.futurePrediction.pivotalChoicePoint}
- **Long-Term Outcome:** ${r.interpretation.futurePrediction.longTermOutcome}
` : 'No temporal prediction recorded.'}

## 💎 Chthonic Mineral Remedy
${r.interpretation?.chthonicPrescription ? `
- **Grounding Ritual:** ${r.interpretation.chthonicPrescription.groundingRitual}
- **Mantle Remedy:** ${r.interpretation.chthonicPrescription.mantleRemedy}
` : ''}

=======================================================
`;
      })
      .join('\n\n');

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subterranea_prophecies_journal_${readings.length}_readings.md`;
    link.click();

    setTimeout(() => {
      setIsExporting(false);
      setSyncStatus('Prophecy scrolls exported successfully!');
    }, 400);
  };

  const handleExportReadingsJSON = () => {
    const blob = new Blob([JSON.stringify(readings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subterranea_oracle_readings_backup.json`;
    link.click();
    setSyncStatus('JSON backup downloaded successfully!');
  };

  const handleExportMinesCSV = () => {
    const csv = exportMinesToCSV(mines);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subterranea_world_mines_database_${mines.length}.csv`;
    link.click();
    setSyncStatus(`Exported ${mines.length.toLocaleString()} world mines to CSV!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-amber-900/60 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-100 flex items-center gap-2">
                Google Drive & Cloud Sync
              </h2>
              <p className="text-xs text-stone-400 font-serif">
                Export, backup, and store your prophecies and mine catalogs in Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sync Card */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/30 text-xs font-serif text-amber-200/90 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <Cloud className="w-4 h-4" />
            <span>Google Drive Archival Protocol</span>
          </div>
          <p className="text-[11px] text-stone-300 leading-relaxed">
            Preserve your divine subterranean prophecies, temporal horizons, and custom catalog of {mines.length.toLocaleString()} world mines directly to Google Drive as Markdown scrolls, JSON vaults, or CSV spreadsheets.
          </p>
        </div>

        {/* Action Options */}
        <div className="space-y-3">
          {/* Export Readings */}
          <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between gap-3">
            <div>
              <p className="font-serif font-bold text-stone-200 text-xs flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Prophecy Journal ({readings.length} Inscribed Readings)</span>
              </p>
              <p className="text-[11px] text-stone-400 font-serif mt-0.5">
                Full oracle interpretations, timeline forecasts, and mineral prescriptions.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleExportReadingsMarkdown}
                disabled={readings.length === 0}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold font-serif text-xs transition-colors"
              >
                Markdown Scroll
              </button>
              <button
                onClick={handleExportReadingsJSON}
                disabled={readings.length === 0}
                className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-500/40 text-stone-200 font-serif text-xs"
              >
                JSON
              </button>
            </div>
          </div>

          {/* Export Mines */}
          <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between gap-3">
            <div>
              <p className="font-serif font-bold text-stone-200 text-xs flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export World Mines Catalog ({mines.length.toLocaleString()} Mines)</span>
              </p>
              <p className="text-[11px] text-stone-400 font-serif mt-0.5">
                Geographic coordinates, depths, commodities, and personified deities.
              </p>
            </div>
            <button
              onClick={handleExportMinesCSV}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 font-bold font-serif text-xs transition-colors"
            >
              CSV Sheet
            </button>
          </div>
        </div>

        {syncStatus && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-serif flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{syncStatus}</span>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-stone-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-serif text-stone-300 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
