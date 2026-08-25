import React, { useState, useEffect } from 'react';
import {
  Compass,
  Globe2,
  Sparkles,
  BookOpen,
  Calendar,
  History,
  Activity,
  Layers,
  Upload,
  HardDrive,
  Download,
  DollarSign,
} from 'lucide-react';
import { getCommercialSettings, getUserCredits } from '../utils/commercialEngine';

export type ActiveTab = 'oracle' | 'map' | 'scatter' | 'grimoire' | 'daily' | 'journal';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedReadingsCount: number;
  openHistoryModal: () => void;
  totalMinesCount: number;
  openUploaderModal: () => void;
  openDriveModal: () => void;
  openOfflineModal: () => void;
  openCommercialModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedReadingsCount,
  openHistoryModal,
  totalMinesCount,
  openUploaderModal,
  openDriveModal,
  openOfflineModal,
  openCommercialModal,
}) => {
  const [seismicPulse, setSeismicPulse] = useState<number>(7.83); // Schumann resonance base
  const [commercialSettings, setCommercialSettings] = useState(getCommercialSettings());
  const [credits, setCredits] = useState<number>(getUserCredits());

  useEffect(() => {
    const handleSettingsUpdate = () => setCommercialSettings(getCommercialSettings());
    const handleCreditsUpdate = () => setCredits(getUserCredits());
    window.addEventListener('commercial_settings_updated', handleSettingsUpdate);
    window.addEventListener('user_credits_updated', handleCreditsUpdate);

    const interval = setInterval(() => {
      // Subtle natural fluctuations in Earth's Schumann resonance
      setSeismicPulse(+(7.83 + (Math.random() * 0.3 - 0.15)).toFixed(2));
    }, 4000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('commercial_settings_updated', handleSettingsUpdate);
      window.removeEventListener('user_credits_updated', handleCreditsUpdate);
    };
  }, []);

  const navItems = [
    { id: 'oracle', label: 'Astrology Oracle', icon: Compass },
    { id: 'map', label: 'Tectonic Map', icon: Globe2 },
    { id: 'scatter', label: 'Lithic Scatter', icon: Layers },
    { id: 'grimoire', label: 'Subterranean Codex', icon: BookOpen },
    { id: 'daily', label: 'Daily Seam', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-lg border-b border-amber-950/60 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Tectonic Resonance Frequency */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => setActiveTab('oracle')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.4)] border border-amber-400/30 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-serif font-bold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  {commercialSettings.appTitle || 'ASTROLOGY PROFESEY READINGS'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openUploaderModal();
                  }}
                  className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-950/90 hover:bg-amber-900 text-amber-300 border border-amber-500/50 flex items-center gap-1 transition-colors"
                  title="Click to view & upload thousands of mines"
                >
                  <Upload className="w-2.5 h-2.5" />
                  <span>{totalMinesCount.toLocaleString()} Mines</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{commercialSettings.tagline || 'Mantle Divination & Sacred Geometry'}</span>
                <span className="opacity-40">•</span>
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>{seismicPulse} Hz</span>
              </p>
            </div>
          </div>

          {/* History, Monetize & Download buttons on Mobile */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={openCommercialModal}
              className="p-2 rounded-lg bg-amber-500 text-stone-950 font-bold border border-amber-400 shadow-sm"
              title="Monetize & Sell Hub"
            >
              <DollarSign className="w-4 h-4" />
            </button>
            <button
              onClick={openOfflineModal}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300"
              title="Download & Offline Mode"
            >
              <Download className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={openDriveModal}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300"
              title="Google Drive Sync"
            >
              <HardDrive className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={openHistoryModal}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 relative"
            >
              <History className="w-4 h-4" />
              {savedReadingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[9px] font-bold text-stone-950 flex items-center justify-center font-mono">
                  {savedReadingsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as ActiveTab);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif tracking-wider whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 border ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] font-semibold'
                    : 'bg-stone-900/40 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Monetize & Sell Hub Button */}
          <button
            onClick={openCommercialModal}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all hover:scale-105"
            title="Open Monetization, Client Orders & White-Label Suite"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Monetize & Sell</span>
            <span className="ml-1 px-1.5 py-0.2 bg-stone-950 text-amber-300 rounded-full font-mono text-[10px]">
              {credits} Cr
            </span>
          </button>

          {/* Download & Offline Hub button */}
          <button
            onClick={openOfflineModal}
            className="px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs font-serif flex items-center gap-1.5 transition-colors shadow-[0_0_10px_rgba(245,158,11,0.15)]"
            title="Download Grimoire & PWA Offline Setup"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download & Offline</span>
          </button>

          {/* Google Drive button */}
          <button
            onClick={openDriveModal}
            className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-500/40 text-stone-300 text-xs font-serif flex items-center gap-1.5 transition-colors"
            title="Export Prophecies & Mines to Google Drive"
          >
            <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
            <span>Drive Sync</span>
          </button>

          {/* Journal History */}
          <button
            onClick={openHistoryModal}
            className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 text-stone-300 text-xs font-serif flex items-center gap-2 transition-colors relative"
          >
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span>Journal</span>
            {savedReadingsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-[10px] font-bold text-stone-950 flex items-center justify-center font-mono">
                {savedReadingsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

