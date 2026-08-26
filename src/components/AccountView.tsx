import React, { useState, useEffect } from 'react';
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
  Zap,
  ShieldCheck,
  Infinity as InfinityIcon,
  ExternalLink,
  CreditCard,
  Copy,
  Check,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Edit3,
  ArrowRight,
  Compass,
  Star,
} from 'lucide-react';
import { exportCompleteOfflineGrimoire } from '../utils/offlineEngine';
import { WorldMine, DivinationReading, UserProfile, ElementalAffinity } from '../types';
import {
  getReadingsUsedCount,
  getRemainingFreeReadings,
  isLifetimeSubscriber,
  activateLifetimeSubscription,
  deactivateLifetimeSubscription,
  getCommercialSettings,
  TOTAL_FREE_READINGS,
  LIFETIME_SUBSCRIPTION_PRICE,
} from '../utils/commercialEngine';
import {
  getCurrentUser,
  signUpUser,
  signInUser,
  signOutUser,
  updateUserProfile,
  ZODIAC_SIGNS,
  ELEMENTAL_AFFINITIES,
} from '../utils/authEngine';

interface AccountViewProps {
  isPremium: boolean;
  setIsPremium: (val: boolean) => void;
  mines: WorldMine[];
  savedReadings: DivinationReading[];
  onOpenDriveModal?: () => void;
  onOpenDownloadModal?: () => void;
  onOpenAuthModal?: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  isPremium,
  setIsPremium,
  mines,
  savedReadings,
  onOpenDriveModal,
  onOpenDownloadModal,
  onOpenAuthModal,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [readingsUsed, setReadingsUsed] = useState<number>(getReadingsUsedCount());
  const [isLifetime, setIsLifetime] = useState<boolean>(isLifetimeSubscriber() || isPremium);

  // User Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getCurrentUser());
  const [authTab, setAuthTab] = useState<'signup' | 'signin'>('signup');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Sign Up / In form state
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [zodiacSign, setZodiacSign] = useState<string>('Scorpio (♏ Water)');
  const [element, setElement] = useState<ElementalAffinity>('Earth');

  // Edit Profile state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>('');
  const [editZodiac, setEditZodiac] = useState<string>('Scorpio (♏ Water)');
  const [editElement, setEditElement] = useState<ElementalAffinity>('Earth');

  const refreshState = () => {
    setReadingsUsed(getReadingsUsedCount());
    setIsLifetime(isLifetimeSubscriber() || isPremium);
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setEditName(user.fullName);
      setEditZodiac(user.zodiacSign || 'Scorpio (♏ Water)');
      setEditElement(user.elementalAffiliation || 'Earth');
    }
  };

  useEffect(() => {
    refreshState();
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleUpdate = () => refreshState();
    const handleAuth = () => setCurrentUser(getCurrentUser());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('readings_used_updated', handleUpdate);
    window.addEventListener('lifetime_subscription_updated', handleUpdate);
    window.addEventListener('auth_state_changed', handleAuth);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('readings_used_updated', handleUpdate);
      window.removeEventListener('lifetime_subscription_updated', handleUpdate);
      window.removeEventListener('auth_state_changed', handleAuth);
    };
  }, [isPremium]);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const result = signUpUser({
      fullName,
      email,
      password,
      zodiacSign,
      elementalAffiliation: element,
    });

    if (!result.success || !result.user) {
      setAuthError(result.error || 'Failed to create account.');
    } else {
      setCurrentUser(result.user);
      setAuthSuccess('✦ Welcome to the Astrological Oracle! Account created & 100 free readings granted.');
      setTimeout(() => setAuthSuccess(null), 4000);
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const result = signInUser(email, password);
    if (!result.success || !result.user) {
      setAuthError(result.error || 'Sign in failed. Check your credentials.');
    } else {
      setCurrentUser(result.user);
      setAuthSuccess('✦ Welcome back! Signed in successfully.');
      setTimeout(() => setAuthSuccess(null), 3000);
    }
  };

  const handleSignOut = () => {
    signOutUser();
    setCurrentUser(null);
    setFeedback('Signed out of account.');
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateUserProfile({
      fullName: editName,
      zodiacSign: editZodiac,
      elementalAffiliation: editElement,
    });
    if (updated) {
      setCurrentUser(updated);
      setIsEditing(false);
      setFeedback('Profile details updated successfully.');
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  const handleActivateLifetime = () => {
    activateLifetimeSubscription();
    setIsPremium(true);
    setIsLifetime(true);
    if (currentUser) {
      updateUserProfile({ plan: 'lifetime' });
    }
    setFeedback(`✦ Lifetime Unlimited Subscription Activated (${LIFETIME_SUBSCRIPTION_PRICE.toFixed(2)})! Enjoy unlimited prophecy readings forever.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSwitchToFree = () => {
    deactivateLifetimeSubscription();
    setIsPremium(false);
    setIsLifetime(false);
    if (currentUser) {
      updateUserProfile({ plan: 'free' });
    }
    setFeedback('Switched to 100 Free Readings Plan.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleExportBackup = () => {
    exportCompleteOfflineGrimoire(mines, savedReadings);
    setFeedback('Offline Archive Backup Downloaded.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const remainingFree = Math.max(0, TOTAL_FREE_READINGS - readingsUsed);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-serif font-bold text-amber-200">Account & Membership</h1>
        <p className="text-xs text-stone-400 font-serif">Sign Up • Astrological Profile • Lifetime Access & Sync</p>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-serif text-center font-medium shadow-md">
          {feedback}
        </div>
      )}

      {/* 1. AUTH / SIGN UP / USER IDENTITY CARD */}
      {!currentUser ? (
        <div className="bg-stone-900/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-amber-100">
                  {authTab === 'signup' ? 'Create Your Oracle Account' : 'Sign In to Oracle'}
                </h2>
                <p className="text-xs text-stone-400 font-serif">
                  {authTab === 'signup'
                    ? 'Get 100 free readings, save your natal coordinates, and sync readings'
                    : 'Access your astrological profile and past prophecy archive'}
                </p>
              </div>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAuthTab('signup');
                  setAuthError(null);
                }}
                className={`px-3 py-1.5 text-xs font-serif font-semibold rounded-lg transition-all ${
                  authTab === 'signup'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab('signin');
                  setAuthError(null);
                }}
                className={`px-3 py-1.5 text-xs font-serif font-semibold rounded-lg transition-all ${
                  authTab === 'signin'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Sign In
              </button>
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-serif">
              {authError}
            </div>
          )}

          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-serif">
              {authSuccess}
            </div>
          )}

          {/* SIGN UP FORM */}
          {authTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-serif font-medium text-stone-300">
                    Full Name / Title <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dawn Rainstar"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-100 placeholder-stone-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-serif font-medium text-stone-300">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dawn@example.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-100 placeholder-stone-600"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-serif font-medium text-stone-300">
                  Password / Passkey <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a passkey (minimum 6 characters)"
                    className="w-full pl-9 pr-10 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-100 placeholder-stone-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-serif font-medium text-stone-300">
                    Zodiac Sun Sign
                  </label>
                  <select
                    value={zodiacSign}
                    onChange={(e) => setZodiacSign(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-200"
                  >
                    {ZODIAC_SIGNS.map((sign) => (
                      <option key={sign} value={sign}>
                        {sign}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-serif font-medium text-stone-300">
                    Elemental Affiliation
                  </label>
                  <select
                    value={element}
                    onChange={(e) => setElement(e.target.value as ElementalAffinity)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-200"
                  >
                    {ELEMENTAL_AFFINITIES.map((el) => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-stone-950 font-serif font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Sign Up & Claim 100 Free Readings</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
              </button>
            </form>
          )}

          {/* SIGN IN FORM */}
          {authTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-serif font-medium text-stone-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-100 placeholder-stone-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-serif font-medium text-stone-300">
                  Password / Passkey
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passkey"
                    className="w-full pl-9 pr-10 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-100 placeholder-stone-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-stone-950" />
                <span>Sign In to Account</span>
              </button>
            </form>
          )}
        </div>
      ) : (
        /* REGISTERED USER PROFILE CARD */
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-900 border border-amber-300/40 flex items-center justify-center text-stone-950 font-serif text-2xl font-bold shadow-lg shrink-0">
                {currentUser.avatarSeed || currentUser.fullName.charAt(0)}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-serif font-bold text-white">
                    {currentUser.fullName}
                  </span>
                  {currentUser.plan === 'lifetime' && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-300 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-amber-400" />
                      LIFETIME
                    </span>
                  )}
                </div>
                <div className="text-xs text-stone-400 font-mono">{currentUser.email}</div>
                <div className="text-[11px] font-serif text-amber-300/90 flex items-center gap-2 pt-0.5">
                  <span>{currentUser.zodiacSign}</span>
                  <span>•</span>
                  <span>{currentUser.elementalAffiliation} Affinity</span>
                </div>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="py-2 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-serif flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="py-2 px-3 rounded-xl bg-stone-950 hover:bg-red-950/40 border border-stone-800 hover:border-red-500/40 text-stone-400 hover:text-red-300 text-xs font-serif flex items-center gap-1.5 transition-colors"
                title="Sign out of account"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Edit Profile inline form */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 mt-4">
              <div className="text-xs font-mono uppercase text-amber-400 font-semibold">
                Update Astrological Persona
              </div>
              <div className="space-y-1">
                <label className="text-xs font-serif text-stone-300">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-serif text-stone-300">Zodiac Sign</label>
                  <select
                    value={editZodiac}
                    onChange={(e) => setEditZodiac(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                  >
                    {ZODIAC_SIGNS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-serif text-stone-300">Element</label>
                  <select
                    value={editElement}
                    onChange={(e) => setEditElement(e.target.value as ElementalAffinity)}
                    className="w-full px-2 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                  >
                    {ELEMENTAL_AFFINITIES.map((el) => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-amber-500 text-stone-950 font-serif text-xs font-bold"
              >
                Save Profile Updates
              </button>
            </form>
          )}
        </div>
      )}

      {/* 2. MAIN SUBSCRIPTION CARD */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Current Membership Plan
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              {isLifetime ? (
                <>
                  <Crown className="w-6 h-6 text-amber-400" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                    Lifetime Unlimited Access
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>100 Free Readings Tier</span>
                </>
              )}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active
          </span>
        </div>

        {/* Free Readings Meter */}
        {!isLifetime && (
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400">Free Readings Remaining:</span>
              <span className="font-bold text-amber-300">
                {remainingFree} of {TOTAL_FREE_READINGS} left
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                style={{ width: `${Math.min(100, (remainingFree / TOTAL_FREE_READINGS) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-400 font-serif">
              You receive 100 completely free future prophecies. Once used, unlock lifetime unlimited readings for just ${LIFETIME_SUBSCRIPTION_PRICE.toFixed(0)}.
            </p>
          </div>
        )}

        {isLifetime && (
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-1.5 text-xs font-serif text-amber-200">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Lifetime Member Benefits Active</span>
            </div>
            <p className="text-stone-300 text-[11px]">
              Unlimited prophecy readings forever, instant AI mantle generation, full database of 2,500+ world mines, and lifetime offline access.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          {!isLifetime ? (
            <div className="space-y-2">
              {/* Direct PayPal Link Button */}
              {getCommercialSettings().paypalPaymentLink && (
                <div className="space-y-1.5">
                  <a
                    href={getCommercialSettings().paypalPaymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-sans text-sm font-bold transition-all shadow-[0_0_20px_rgba(0,112,186,0.3)] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 text-amber-300" />
                    <span>Pay with PayPal (${LIFETIME_SUBSCRIPTION_PRICE.toFixed(0)})</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-200" />
                  </a>
                  <div className="flex items-center justify-between px-2 text-[11px] font-mono text-stone-400">
                    <span>Link: paypal.com/ncp/payment/...</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(getCommercialSettings().paypalPaymentLink);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2500);
                      }}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleActivateLifetime}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-stone-950 font-serif text-sm font-bold transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 text-stone-950" />
                <span>Activate Lifetime Access Now</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSwitchToFree}
              className="w-full py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 font-serif text-xs font-medium transition-all"
            >
              Switch Back to Free Plan Tier (Testing)
            </button>
          )}

          <p className="text-xs text-stone-400 font-serif text-center leading-relaxed">
            {isLifetime
              ? 'Thank you for supporting RainstarsTerrain Forcast & Astrology Prophecy readings.'
              : `100 free readings granted on installation. Lifetime pass is a one-time fee of $${LIFETIME_SUBSCRIPTION_PRICE.toFixed(0)} with no recurring charges.`}
          </p>
        </div>
      </div>

      {/* 3. DATA & CONNECTIVITY */}
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
            {isOnline ? 'Online (AI High-Precision)' : 'Offline (Local Mantle Engine)'}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-serif text-stone-300 py-1 border-t border-stone-800/60">
          <span>Subterranean Database</span>
          <span className="font-mono text-emerald-400 font-semibold">{mines.length.toLocaleString()} Active World Mines</span>
        </div>

        <div className="flex items-center justify-between text-xs font-serif text-stone-300 py-1 border-t border-stone-800/60">
          <span>Saved Readings Archive</span>
          <span className="font-mono text-amber-300 font-semibold">{savedReadings.length} Inscribed</span>
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

