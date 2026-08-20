import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import {
  Compass,
  Globe2,
  Sparkles,
  BookOpen,
  Calendar,
  Volume2,
  VolumeX,
  History,
  Activity,
  Layers,
} from 'lucide-react';

export type ActiveTab = 'oracle' | 'map' | 'scatter' | 'grimoire' | 'daily' | 'journal';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedReadingsCount: number;
  openHistoryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedReadingsCount,
  openHistoryModal,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [seismicPulse, setSeismicPulse] = useState<number>(7.83); // Schumann resonance base

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle natural fluctuations in Earth's Schumann resonance
      setSeismicPulse(+(7.83 + (Math.random() * 0.3 - 0.15)).toFixed(2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    sound.startSubterraneanDrone();
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'oracle', label: 'Oracle Chamber', icon: Compass },
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
                <span className="text-lg font-serif font-bold tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  SUBTERRANEA
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-400 border border-amber-600/30">
                  World Mines Oracle
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                Mantle Pulse: <span className="text-amber-300 font-semibold">{seismicPulse} Hz</span>
              </p>
            </div>
          </div>

          {/* Sound & History buttons on Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-lg border transition-all ${
                !isMuted
                  ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'bg-stone-900 border-stone-800 text-stone-500'
              }`}
              title={isMuted ? 'Unmute subterranean drone' : 'Mute subterranean drone'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
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
                  sound.playMineralClink();
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
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleToggleSound}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono border flex items-center gap-2 transition-all ${
              !isMuted
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-300'
            }`}
            title="Toggle subterranean resonance audio"
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Mantle Drone Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Audio Muted</span>
              </>
            )}
          </button>

          <button
            onClick={openHistoryModal}
            className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 text-stone-300 text-xs font-serif flex items-center gap-2 transition-colors relative"
          >
            <History className="w-4 h-4 text-amber-400" />
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
