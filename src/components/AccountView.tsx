import React, { useState } from 'react';
import {
  User,
  Crown,
  CheckCircle2,
  Sparkles,
  Download,
  Cloud,
  Wifi,
  WifiOff,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import { exportCompleteOfflineGrimoire } from '../utils/offlineEngine';
import { WorldMine, DivinationReading } from '../types';

interface AccountViewProps {
  isPremium: boolean;
  setIsPremium: (val: boolean) => void;
  mines: WorldMine[];
  savedReadings: DivinationReading[];
  onOpenDriveModal?: () => void;
  onOpenDownloadModal?: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  isPremium,
  setIsPremium,
  mines,
  savedReadings,
  onOpenDriveModal,
  onOpenDownloadModal,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [feedback, setFeedback] = useState<string | null>(null);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleTogglePlan = () => {
    const nextState = !isPremium;
    setIsPremium(nextState);
    setFeedback(nextState ? 'Upgraded to Premium Plan!' : 'Switched to Free Plan.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleExportBackup = () => {
    exportCompleteOfflineGrimoire(mines, savedReadings);
    setFeedback('Offline Archive Backup Downloaded.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-serif font-bold text-amber-200">Subscription & Access</h1>
        <p className="text-xs text-stone-400 font-serif">Subscription status and offline access</p>
      </div>

      {feedback && (
        <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-serif text-center">
          {feedback}
        </div>
      )}

      {/* Subscription Card: Free vs Premium */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm font-serif border-b border-stone-800 pb-3">
            <span className="text-stone-400 font-mono text-xs uppercase tracking-wider">Plan</span>
            <span className="font-bold text-white flex items-center gap-1.5">
              {isPremium ? (
                <>
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 font-mono">Premium</span>
                </>
              ) : (
                <span className="text-stone-300 font-mono">Free</span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm font-serif border-b border-stone-800 pb-3">
            <span className="text-stone-400 font-mono text-xs uppercase tracking-wider">Status</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-sm font-serif pb-1">
            <span className="text-stone-400 font-mono text-xs uppercase tracking-wider">Offline Access</span>
            <span className="font-mono text-xs font-bold text-amber-300">
              Enabled
            </span>
          </div>
        </div>

        {/* Action Button & Short Description */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <button
            type="button"
            onClick={handleTogglePlan}
            className={`w-full py-3.5 rounded-2xl font-serif text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
              isPremium
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
            }`}
          >
            {isPremium ? (
              <span>Manage Subscription (Switch to Free)</span>
            ) : (
              <>
                <Crown className="w-4 h-4 text-stone-950" />
                <span>Upgrade to Premium</span>
              </>
            )}
          </button>

          <p className="text-xs text-stone-400 font-serif text-center leading-relaxed">
            Premium unlocks unlimited prophecies, deeper mantle readings, macro‑era forecasts, and full mine access.
          </p>
        </div>
      </div>

      {/* Tucked Quiet Options: Archive Export & Cloud Sync */}
      <div className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold">
          Data & Connectivity
        </div>

        <div className="flex items-center justify-between text-xs font-serif text-stone-300 py-1">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-emerald-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-amber-400" />
            )}
            <span>Connection</span>
          </div>
          <span className="font-mono text-stone-400">
            {isOnline ? 'Online (AI Enhanced)' : 'Offline (Local Engine)'}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-serif text-stone-300 py-1 border-t border-stone-800/60">
          <span>Subterranean Database</span>
          <span className="font-mono text-emerald-400 font-semibold">{mines.length.toLocaleString()} Active World Mines</span>
        </div>

        <div className="flex items-center justify-between text-xs font-serif text-stone-300 py-1 border-t border-stone-800/60">
          <span>Saved Readings</span>
          <span className="font-mono text-amber-300">{savedReadings.length} Inscribed</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-stone-800/60">
          {onOpenDownloadModal && (
            <button
              type="button"
              onClick={onOpenDownloadModal}
              className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 text-xs font-serif flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download / Install App</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExportBackup}
            className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-stone-100 text-xs font-serif flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Archive (.json)</span>
          </button>

          {onOpenDriveModal && (
            <button
              type="button"
              onClick={onOpenDriveModal}
              className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-stone-100 text-xs font-serif flex items-center justify-center gap-1.5 transition-all"
            >
              <Cloud className="w-3.5 h-3.5 text-sky-400" />
              <span>Google Drive</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
