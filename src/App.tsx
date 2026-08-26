import React, { useState, useEffect } from 'react';
import { WorldMine, DivinationReading } from './types';
import { Navigation, NavTab } from './components/Navigation';
import { ReadingsView } from './components/ReadingsView';
import { ArchiveView } from './components/ArchiveView';
import { AccountView } from './components/AccountView';
import { GoogleDriveSyncModal } from './components/GoogleDriveSyncModal';
import { OfflineDownloadModal } from './components/OfflineDownloadModal';
import { AuthModal } from './components/AuthModal';
import { getActiveMines } from './utils/mineDatabase';

const STORAGE_KEY = 'subterranea_oracle_journal_v2';
const PLAN_KEY = 'subterranea_user_plan_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('readings');
  const [isDriveOpen, setIsDriveOpen] = useState<boolean>(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Active Mines catalog (2,500+ world mines)
  const [mines] = useState<WorldMine[]>(() => {
    return getActiveMines();
  });

  // Subscription Plan (Free vs Premium)
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(PLAN_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(isPremium));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [isPremium]);

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
    if (window.confirm('Clear all inscribed prophecies from your archive?')) {
      setSavedReadings([]);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 flex flex-col justify-between">
      {/* Tiny Navigation Bar (Readings | Archive | Account / Sign Up | Download App) */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md pt-2 pb-1 border-b border-stone-900/60">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedReadings.length}
          isPremium={isPremium}
          onOpenDownloadApp={() => setIsDownloadOpen(true)}
          onOpenAuthModal={() => setIsAuthOpen(true)}
        />
      </header>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col justify-start">
        {activeTab === 'readings' && (
          <ReadingsView
            mines={mines}
            onSaveReading={handleSaveReading}
            savedReadings={savedReadings}
            isPremium={isPremium}
            onOpenDownloadApp={() => setIsDownloadOpen(true)}
          />
        )}

        {activeTab === 'archive' && (
          <ArchiveView
            savedReadings={savedReadings}
            onDeleteReading={handleDeleteReading}
            onClearAll={handleClearAllReadings}
            onNewReading={() => setActiveTab('readings')}
          />
        )}

        {activeTab === 'account' && (
          <AccountView
            isPremium={isPremium}
            setIsPremium={setIsPremium}
            mines={mines}
            savedReadings={savedReadings}
            onOpenDriveModal={() => setIsDriveOpen(true)}
            onOpenDownloadModal={() => setIsDownloadOpen(true)}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      {/* Auth & Sign Up Modal */}
      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          initialMode="signup"
        />
      )}

      {/* Google Drive Sync Modal (tucked in Account) */}
      {isDriveOpen && (
        <GoogleDriveSyncModal
          isOpen={isDriveOpen}
          onClose={() => setIsDriveOpen(false)}
          readings={savedReadings}
          mines={mines}
          onImportReadings={(imported) => {
            setSavedReadings((prev) => [...imported, ...prev]);
          }}
        />
      )}

      {/* Offline Download & App Install Modal */}
      {isDownloadOpen && (
        <OfflineDownloadModal
          isOpen={isDownloadOpen}
          onClose={() => setIsDownloadOpen(false)}
          mines={mines}
          readings={savedReadings}
        />
      )}
    </div>
  );
}

