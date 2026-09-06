import React, { useState, useEffect } from 'react';
import { Sparkles, Archive, User, Download, UserPlus, Crown } from 'lucide-react';
import { getCurrentUser } from '../utils/authEngine';
import { UserProfile } from '../types';

export type NavTab = 'readings' | 'archive' | 'account';

interface NavigationProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  savedCount: number;
  isPremium: boolean;
  onOpenDownloadApp?: () => void;
  onOpenAuthModal?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  isPremium,
  onOpenDownloadApp,
  onOpenAuthModal,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getCurrentUser());

  useEffect(() => {
    const handleAuth = () => setCurrentUser(getCurrentUser());
    window.addEventListener('auth_state_changed', handleAuth);
    return () => window.removeEventListener('auth_state_changed', handleAuth);
  }, []);

  return (
    <nav className="w-full max-w-2xl mx-auto px-4 py-3 sm:py-4">
      <div className="flex items-center justify-between bg-stone-900/95 backdrop-blur-md border border-stone-800 rounded-2xl p-2 shadow-2xl gap-1.5 sm:gap-2">
        {/* Readings Tab */}
        <button
          onClick={() => setActiveTab('readings')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-sm sm:text-base font-serif font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'readings'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4 sm:w-5 h-5 text-amber-400 shrink-0" />
          <span>Readings</span>
        </button>

        {/* Archive Tab */}
        <button
          onClick={() => setActiveTab('archive')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-sm sm:text-base font-serif font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'archive'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
          }`}
        >
          <Archive className="w-4 h-4 sm:w-5 h-5 text-stone-300 shrink-0" />
          <span>Archive</span>
          {savedCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-xs font-mono font-bold text-amber-300">
              {savedCount}
            </span>
          )}
        </button>

        {/* Account / Sign Up Tab */}
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-sm sm:text-base font-serif font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'account'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
          }`}
        >
          {currentUser ? (
            <>
              <div className="w-5 h-5 rounded-full bg-amber-500/30 border border-amber-400/60 flex items-center justify-center text-[10px] font-bold text-amber-300 shrink-0">
                {currentUser.avatarSeed || currentUser.fullName.charAt(0)}
              </div>
              <span className="truncate max-w-[90px] sm:max-w-[120px]">
                {currentUser.fullName.split(' ')[0]}
              </span>
              {(isPremium || currentUser.plan === 'lifetime') && (
                <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              )}
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 sm:w-5 h-5 text-amber-400 shrink-0" />
              <span>Sign Up</span>
            </>
          )}
        </button>

        {/* Download App Button */}
        {onOpenDownloadApp && (
          <button
            onClick={onOpenDownloadApp}
            className="py-2.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 text-amber-300 hover:text-amber-100 bg-amber-950/50 hover:bg-amber-900/70 border border-amber-500/40 shadow-sm shrink-0"
            title="Download Offline App / Install to Device"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-xs sm:text-sm">App</span>
          </button>
        )}
      </div>
    </nav>
  );
};

