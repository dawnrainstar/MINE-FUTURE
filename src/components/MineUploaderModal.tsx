import React, { useState, useRef } from 'react';
import { WorldMine } from '../types';
import {
  parseCSVToMines,
  parseJSONOrGeoJSON,
  saveStoredCustomMines,
  getGlobal2500Mines,
  exportMinesToCSV,
  exportMinesToGeoJSON,
  ParseResult,
} from '../utils/mineDatabase';
import { sound } from '../utils/audio';
import {
  Upload,
  FileText,
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2,
  X,
  Layers,
  Globe2,
  Trash2,
  Copy,
  Check,
} from 'lucide-react';

interface MineUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMinesUpdated: (mines: WorldMine[]) => void;
  currentMineCount: number;
}

export const MineUploaderModal: React.FC<MineUploaderModalProps> = ({
  isOpen,
  onClose,
  onMinesUpdated,
  currentMineCount,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'preset' | 'paste' | 'export'>('upload');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [pasteText, setPasteText] = useState<string>('');
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        setIsLoading(false);
        return;
      }

      let res: ParseResult;
      if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
        res = parseJSONOrGeoJSON(content);
      } else {
        res = parseCSVToMines(content);
      }

      setParseResult(res);
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handlePasteParse = () => {
    if (!pasteText.trim()) return;
    setIsLoading(true);
    let res: ParseResult;
    if (pasteText.trim().startsWith('{') || pasteText.trim().startsWith('[')) {
      res = parseJSONOrGeoJSON(pasteText);
    } else {
      res = parseCSVToMines(pasteText);
    }
    setParseResult(res);
    setIsLoading(false);
  };

  const handleApplyParsedMines = () => {
    if (!parseResult || parseResult.mines.length === 0) return;
    sound.playChime();
    saveStoredCustomMines(parseResult.mines);
    onMinesUpdated(parseResult.mines);
    onClose();
  };

  const handleLoadGlobal2500 = () => {
    setIsLoading(true);
    sound.playMineralClink();
    setTimeout(() => {
      const g2500 = getGlobal2500Mines();
      saveStoredCustomMines(g2500);
      onMinesUpdated(g2500);
      setIsLoading(false);
      onClose();
    }, 200);
  };

  const handleDownloadCSV = () => {
    const g2500 = getGlobal2500Mines();
    const csv = exportMinesToCSV(g2500);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subterranea_world_mines_${g2500.length}.csv`;
    link.click();
  };

  const handleDownloadGeoJSON = () => {
    const g2500 = getGlobal2500Mines();
    const geo = exportMinesToGeoJSON(g2500);
    const blob = new Blob([geo], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subterranea_world_mines_${g2500.length}.geojson`;
    link.click();
  };

  const sampleCSVTemplate = `name,latitude,longitude,primaryMineral,country,depthMeters
"Super Pit Kalgoorlie",-30.7747,121.5036,"Gold","Australia",600
"Escondida Copper Mega-Pit",-24.2681,-69.0706,"Copper","Chile",645
"Wieliczka Salt Cathedral",49.9833,20.0544,"Halite Salt","Poland",327
"Diavik Diamond Seam",64.4981,-110.2736,"Diamond","Canada",420`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(sampleCSVTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-amber-900/60 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-100 flex items-center gap-2">
                Batch Mine Uploader & Global Database
              </h2>
              <p className="text-xs text-stone-400 font-serif">
                Currently active: <span className="text-amber-300 font-bold font-mono">{currentMineCount.toLocaleString()} World Mines</span>
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 my-4 border-b border-stone-800 pb-2">
          {[
            { id: 'upload', label: 'File Upload (CSV/JSON)', icon: Upload },
            { id: 'preset', label: 'Global Presets (2,500+)', icon: Globe2 },
            { id: 'paste', label: 'Direct Text Paste', icon: FileText },
            { id: 'export', label: 'Export & Google Drive', icon: Download },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif flex items-center gap-1.5 transition-colors ${
                  activeTab === t.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {activeTab === 'upload' && (
            <div className="space-y-4">
              {/* Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                  dragActive
                    ? 'border-amber-400 bg-amber-950/30'
                    : 'border-stone-700 hover:border-amber-500/50 bg-stone-950/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.tsv,.json,.geojson,.txt"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />
                <Upload className="w-10 h-10 text-amber-400" />
                <div>
                  <p className="font-serif font-bold text-sm text-stone-200">
                    Drop your CSV, GeoJSON, or JSON mine dataset here
                  </p>
                  <p className="text-xs text-stone-400 font-serif mt-1">
                    Upload thousands of mines (USGS MRDS, mindat, or custom mining spreadsheets)
                  </p>
                </div>
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold hover:bg-amber-500/30"
                >
                  Browse Files
                </button>
              </div>

              {/* Sample Format Preview */}
              <div className="bg-stone-950 rounded-2xl p-4 border border-stone-800 text-xs font-mono">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="font-serif text-amber-300">Expected CSV Header Format:</span>
                  <button
                    onClick={copyTemplate}
                    className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Sample'}
                  </button>
                </div>
                <pre className="text-stone-300 text-[11px] overflow-x-auto whitespace-pre-wrap">
                  {sampleCSVTemplate}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'preset' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-950/30 border border-amber-600/30 rounded-2xl text-xs font-serif text-amber-200 space-y-1">
                <p className="font-bold text-amber-300 flex items-center gap-2">
                  <Globe2 className="w-4 h-4" /> Global 2,500+ Worldwide Mines Dataset
                </p>
                <p className="text-stone-300 text-[11px]">
                  Instantly load our full synthesized planetary registry of over 2,500 mines across all 7 continents, 100+ nations, and every mineral commodity (Gold, Lithium, Rare Earths, Diamonds, Copper, etc.).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleLoadGlobal2500}
                  className="p-4 rounded-2xl bg-gradient-to-br from-amber-600/20 to-amber-950/40 border border-amber-500/40 hover:border-amber-400 text-left transition-all group"
                >
                  <p className="font-serif font-bold text-stone-100 group-hover:text-amber-300 flex items-center justify-between">
                    <span>🌟 All Global Mines Seam</span>
                    <span className="font-mono text-xs text-amber-400 font-bold">2,550 Mines</span>
                  </p>
                  <p className="text-[11px] text-stone-400 font-serif mt-1">
                    Complete worldwide coverage of open-pits, deep shafts, salt grottos & lithium brines.
                  </p>
                </button>

                <button
                  onClick={handleLoadGlobal2500}
                  className="p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/40 text-left transition-all group"
                >
                  <p className="font-serif font-bold text-stone-100 group-hover:text-amber-300 flex items-center justify-between">
                    <span>⚡ Critical Battery & Modern Flux</span>
                    <span className="font-mono text-xs text-emerald-400">Lithium & Cobalt</span>
                  </p>
                  <p className="text-[11px] text-stone-400 font-serif mt-1">
                    Salar de Atacama, Greenbushes, Kamoto, Katanga, and global conductive basins.
                  </p>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'paste' && (
            <div className="space-y-3">
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste CSV, TSV, or JSON rows here (e.g. name,lat,lng,mineral,country)..."
                rows={8}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-3 text-xs text-stone-200 font-mono focus:outline-none focus:border-amber-500/60"
              />
              <button
                onClick={handlePasteParse}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs"
              >
                Parse Inscribed Text
              </button>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl space-y-2">
                <h4 className="font-serif font-bold text-stone-200 text-sm">
                  Export Active Mine Registry
                </h4>
                <p className="text-xs text-stone-400 font-serif">
                  Download your thousands of mines to save into Google Drive, GIS mapping tools, or offline spreadsheets.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={handleDownloadCSV}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download CSV Spreadsheet
                  </button>
                  <button
                    onClick={handleDownloadGeoJSON}
                    className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-500/50 text-stone-200 font-serif text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download GeoJSON
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Parse Result Summary */}
          {parseResult && (
            <div className="mt-4 p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {parseResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  )}
                  <span className="font-serif font-bold text-xs text-stone-200">
                    {parseResult.success
                      ? `Successfully parsed ${parseResult.mines.length.toLocaleString()} mines!`
                      : 'Parsing Error'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  {parseResult.totalRows} rows processed
                </span>
              </div>

              {parseResult.errors.length > 0 && (
                <div className="text-[11px] text-rose-300 font-mono space-y-1 bg-rose-950/40 p-2 rounded-xl border border-rose-900/40">
                  {parseResult.errors.map((err, i) => (
                    <p key={i}>• {err}</p>
                  ))}
                </div>
              )}

              {parseResult.mines.length > 0 && (
                <div>
                  <p className="text-[11px] text-stone-400 font-serif mb-2">
                    Preview of first {Math.min(5, parseResult.mines.length)} mines:
                  </p>
                  <div className="space-y-1.5">
                    {parseResult.mines.slice(0, 5).map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-serif"
                      >
                        <div>
                          <span className="font-bold text-stone-200">{m.name}</span>
                          <span className="text-[11px] text-stone-400 ml-2 font-mono">
                            ({m.country} · {m.primaryMineral})
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-400">
                          {m.lat.toFixed(2)}, {m.lng.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-serif text-stone-400 hover:text-stone-200"
          >
            Cancel
          </button>

          {parseResult && parseResult.success && (
            <button
              onClick={handleApplyParsedMines}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <Sparkles className="w-4 h-4" /> Activate {parseResult.mines.length.toLocaleString()} Mines
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
