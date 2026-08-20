import React, { useState, useEffect } from 'react';
import { WorldMine, DivinationReading, SpreadType } from './types';
import { Header, ActiveTab } from './components/Header';
import { OracleChamber } from './components/OracleChamber';
import { TectonicMap } from './components/TectonicMap';
import { LithicScatter } from './components/LithicScatter';
import { Grimoire } from './components/Grimoire';
import { DailySeam } from './components/DailySeam';
import { MineModal } from './components/MineModal';
import { JournalModal } from './components/JournalModal';
import { sound } from './utils/audio';

const STORAGE_KEY = 'subterranea_oracle_journal_v2';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('oracle');
  const [selectedMineForModal, setSelectedMineForModal] = useState<WorldMine | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [preselectedMines, setPreselectedMines] = useState<WorldMine[]>([]);
  const [initialSpreadType, setInitialSpreadType] = useState<SpreadType>('strata3');

  // Stored readings from localStorage
  const [savedReadings, setSavedReadings] = useState<DivinationReading[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReadings));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [savedReadings]);

  const handleSaveReading = (reading: DivinationReading) => {
    setSavedReadings((prev) => [reading, ...prev]);
  };

  const handleDeleteReading = (id: string) => {
    setSavedReadings((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearAllReadings = () => {
    if (window.confirm('Clear all inscribed prophecies from your journal?')) {
      setSavedReadings([]);
    }
  };

  // Navigations from other views to the Oracle Chamber
  const handleCommuneWithMine = (mine: WorldMine) => {
    sound.playMineralClink();
    setPreselectedMines([mine]);
    setInitialSpreadType('single');
    setActiveTab('oracle');
  };

  const handleCommuneWithSpread = (mines: WorldMine[]) => {
    sound.playMineralClink();
    setPreselectedMines(mines);
    setInitialSpreadType(mines.length >= 4 ? 'descent4' : 'strata3');
    setActiveTab('oracle');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 flex flex-col justify-between">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedReadingsCount={savedReadings.length}
        openHistoryModal={() => setIsJournalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'oracle' && (
          <OracleChamber
            key={preselectedMines.map((m) => m.id).join('-') + initialSpreadType}
            onSaveReading={handleSaveReading}
            onOpenMineModal={(mine) => setSelectedMineForModal(mine)}
            initialSpreadType={initialSpreadType}
            preselectedMines={preselectedMines}
          />
        )}

        {activeTab === 'map' && (
          <TectonicMap
            onSelectMine={(mine) => setSelectedMineForModal(mine)}
            onCommuneWithMine={handleCommuneWithMine}
          />
        )}

        {activeTab === 'scatter' && (
          <LithicScatter
            onCommuneWithSpread={handleCommuneWithSpread}
            onOpenMineModal={(mine) => setSelectedMineForModal(mine)}
          />
        )}

        {activeTab === 'grimoire' && (
          <Grimoire
            onOpenMineModal={(mine) => setSelectedMineForModal(mine)}
            onCommuneWithMine={handleCommuneWithMine}
          />
        )}

        {activeTab === 'daily' && (
          <DailySeam
            onCommuneWithDailyMine={handleCommuneWithMine}
            onOpenMineModal={(mine) => setSelectedMineForModal(mine)}
          />
        )}
      </main>

      {/* Subterranean Footer */}
      <footer className="mt-12 border-t border-stone-900 bg-stone-950/80 py-6 text-center text-xs text-stone-500 font-serif">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© Subterranea — The Anthropomorphic Cartography of World Mines & Chthonic Oracle</p>
          <div className="flex items-center gap-4 font-mono text-[11px] text-stone-400">
            <span>20 Terrestrial Deities</span>
            <span>·</span>
            <span>4,000m Mantle Depth</span>
            <span>·</span>
            <span>Schumann 7.83Hz</span>
          </div>
        </div>
      </footer>

      {/* Full Mine Details Modal with Cartographic Figure */}
      <MineModal
        mine={selectedMineForModal}
        onClose={() => setSelectedMineForModal(null)}
        onSelectForReading={handleCommuneWithMine}
      />

      {/* Journal History Modal */}
      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        readings={savedReadings}
        onDeleteReading={handleDeleteReading}
        onClearAll={handleClearAllReadings}
      />
    </div>
  );
}
