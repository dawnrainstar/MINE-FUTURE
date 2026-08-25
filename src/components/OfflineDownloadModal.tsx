import React, { useState, useEffect } from 'react';
import { WorldMine, DivinationReading } from '../types';
import { exportCompleteOfflineGrimoire, exportReadingAsScroll } from '../utils/offlineEngine';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle,
  Sparkles,
  Layers,
  FileText,
  Smartphone,
  Globe,
  HelpCircle,
  X,
  Database,
} from 'lucide-react';

interface OfflineDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mines: WorldMine[];
  readings: DivinationReading[];
}

export const OfflineDownloadModal: React.FC<OfflineDownloadModalProps> = ({
  isOpen,
  onClose,
  mines,
  readings,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for PWA beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Check if running in standalone mode (installed PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'To install for offline access on desktop or mobile:\n• Chrome/Edge: Click the Install icon (⊕) in the browser URL bar or "Install RAINSTARTERRAIN".\n• Safari / iOS: Tap "Share" and select "Add to Home Screen".'
      );
    }
  };

  const handleDownloadFullGrimoire = () => {
    exportCompleteOfflineGrimoire(mines, readings);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                    Offline & Download Hub
                  </span>
                  <span
                    className={`text-[10px] font-mono flex items-center gap-1 px-2 py-0.5 rounded ${
                      isOnline
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {isOnline ? (
                      <>
                        <Wifi className="w-3 h-3 text-emerald-400" /> Online Mode
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3 h-3 text-rose-400" /> Offline Mode Active
                      </>
                    )}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-100 mt-0.5">
                  Offline Divination & Local Archival Grimoire
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content scrollable */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6 relative z-10 pr-1">
            {/* Status Card */}
            <div className="bg-stone-950/80 border border-stone-800/90 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-serif uppercase tracking-widest text-amber-300 font-bold">
                    Zero-Latency Chthonic Engine
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  100% Offline-Capable
                </span>
              </div>
              <p className="text-xs text-stone-300 font-serif leading-relaxed">
                RAINSTARTERRAIN PROFESEYS stores the complete catalog of <strong>{mines.length.toLocaleString()} world mines</strong>, Titaness profiles, and all Pennick sacred geometry algorithms directly in your browser. Even in deep subterranean caverns without cellular connection or internet, you can excavate spreads, generate geomantic figures, and consult the mantle.
              </p>
            </div>

            {/* Two Action Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Install PWA as App */}
              <div className="bg-stone-950/70 border border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-1">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-stone-100">
                    1. Install Standalone App
                  </h4>
                  <p className="text-xs text-stone-400 font-serif leading-relaxed">
                    Install to your desktop dock or mobile home screen. Launches instantly in full-screen mode and caches all assets for continuous offline divination.
                  </p>
                </div>

                <button
                  onClick={handleInstallApp}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  {isInstalled ? 'App Already Installed' : 'Install PWA to Device'}
                </button>
              </div>

              {/* Option 2: Download Full JSON Grimoire & Mine Database */}
              <div className="bg-stone-950/70 border border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-1">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-stone-100">
                    2. Download Full Grimoire JSON
                  </h4>
                  <p className="text-xs text-stone-400 font-serif leading-relaxed">
                    Export the entire planetary database of {mines.length.toLocaleString()} mines, along with your {readings.length} inscribed journal prophecies, to a portable offline backup file.
                  </p>
                </div>

                <button
                  onClick={handleDownloadFullGrimoire}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-serif font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                >
                  {downloadSuccess ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                      <span>Downloaded Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-white" />
                      <span>Export Grimoire File (.json)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Individual Readings Offline Exporters */}
            {readings.length > 0 && (
              <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-serif uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    Download Recent Prophecy Scrolls ({readings.length} Inscribed)
                  </h4>
                </div>
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {readings.slice(0, 5).map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/30 transition-colors"
                    >
                      <div className="overflow-hidden">
                        <div className="text-xs font-serif font-bold text-stone-200 truncate">
                          {r.interpretation?.oracularTitle || r.question || 'Mantle Divination'}
                        </div>
                        <div className="text-[10px] font-mono text-stone-400">
                          {new Date(r.timestamp).toLocaleDateString()} • {r.drawnMines.length} Mines
                        </div>
                      </div>

                      <button
                        onClick={() => exportReadingAsScroll(r)}
                        className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-950/70 hover:border-amber-500/40 border border-stone-700 text-stone-300 hover:text-amber-200 text-xs font-serif flex items-center gap-1.5 transition-colors shrink-0 ml-3"
                        title="Download formatted text scroll"
                      >
                        <Download className="w-3 h-3" />
                        <span>Scroll (.txt)</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offline Help / Browser Tips */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs font-serif text-amber-200/90 leading-relaxed flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5 font-mono text-[10px] uppercase">
                  How Offline Mode Functions:
                </strong>
                The application utilizes Progressive Web App (PWA) caching and the HTML5 LocalStorage engine. All cartographic mine figures, sacred geomantic charts, and fallback prophecy algorithms execute client-side with 0 network latency.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-end relative z-10">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-serif transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
