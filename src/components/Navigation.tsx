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
    <nav className="w-full max-w-xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between bg-stone-900/90 backdrop-blur-md border border-stone-800/80 rounded-2xl p-1.5 shadow-xl gap-1">
        {/* Readings Tab */}
        <button
          onClick={() => setActiveTab('readings')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-serif font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'readings'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Readings</span>
        </button>

        {/* Archive Tab */}
        <button
          onClick={() => setActiveTab('archive')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-serif font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'archive'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Archive className="w-4 h-4 text-stone-300" />
          <span>Archive</span>
          {savedCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-stone-800 border border-stone-700 text-[10px] font-mono text-stone-300">
              {savedCount}
            </span>
          )}
        </button>

        {/* Account / Sign Up Tab */}
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-serif font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'account'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          {currentUser ? (
            <>
              <div className="w-4 h-4 rounded-full bg-amber-500/30 border border-amber-400/50 flex items-center justify-center text-[9px] font-bold text-amber-300">
                {currentUser.avatarSeed || currentUser.fullName.charAt(0)}
              </div>
              <span className="truncate max-w-[80px] sm:max-w-[100px]">
                {currentUser.fullName.split(' ')[0]}
              </span>
              {(isPremium || currentUser.plan === 'lifetime') && (
                <Crown className="w-3 h-3 text-amber-400 shrink-0" />
              )}
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>Sign Up</span>
            </>
          )}
        </button>

        {/* Download App Button */}
        {onOpenDownloadApp && (
          <button
            onClick={onOpenDownloadApp}
            className="py-2 px-2.5 sm:px-3 rounded-xl text-xs font-serif font-medium transition-all duration-200 flex items-center justify-center gap-1.5 text-amber-300/90 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 shadow-sm shrink-0"
            title="Download Offline App / Install to Device"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline text-xs">Download App</span>
          </button>
        )}
      </div>
    </nav>
  );
};

