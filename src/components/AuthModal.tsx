import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Sparkles,
  Crown,
  Eye,
  EyeOff,
  Compass,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Shield,
  Star,
  Globe,
  LogOut,
  Edit3,
} from 'lucide-react';
import {
  signUpUser,
  signInUser,
  signOutUser,
  getCurrentUser,
  updateUserProfile,
  ZODIAC_SIGNS,
  ELEMENTAL_AFFINITIES,
} from '../utils/authEngine';
import { UserProfile, ElementalAffinity } from '../types';
import { LIFETIME_SUBSCRIPTION_PRICE, TOTAL_FREE_READINGS } from '../utils/commercialEngine';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signup' | 'signin' | 'profile';
  onAuthSuccess?: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'signup' | 'signin' | 'profile'>(() => {
    const user = getCurrentUser();
    if (user && initialMode === 'profile') return 'profile';
    return initialMode;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getCurrentUser());
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sign Up Form States
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [zodiacSign, setZodiacSign] = useState<string>('Scorpio (♏ Water)');
  const [birthDate, setBirthDate] = useState<string>('');
  const [element, setElement] = useState<ElementalAffinity>('Earth');
  const [practitionerName, setPractitionerName] = useState<string>('');

  // Profile Edit Mode
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(currentUser?.fullName || '');
  const [editZodiac, setEditZodiac] = useState<string>(currentUser?.zodiacSign || 'Scorpio (♏ Water)');
  const [editElement, setEditElement] = useState<ElementalAffinity>(currentUser?.elementalAffiliation || 'Earth');

  if (!isOpen) return null;

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = signUpUser({
        fullName,
        email,
        password,
        zodiacSign,
        birthDate,
        elementalAffiliation: element,
        practitionerName: practitionerName || fullName,
      });

      setIsSubmitting(false);
      if (!result.success || !result.user) {
        setErrorMessage(result.error || 'Failed to create account.');
      } else {
        setCurrentUser(result.user);
        setSuccessMessage('✦ Account created! 100 Free Readings activated.');
        if (onAuthSuccess) onAuthSuccess(result.user);
        setTimeout(() => {
          setMode('profile');
          setSuccessMessage(null);
        }, 1500);
      }
    }, 400);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = signInUser(email, password);
      setIsSubmitting(false);

      if (!result.success || !result.user) {
        setErrorMessage(result.error || 'Invalid credentials.');
      } else {
        setCurrentUser(result.user);
        setSuccessMessage('✦ Welcome back! Signed in successfully.');
        if (onAuthSuccess) onAuthSuccess(result.user);
        setTimeout(() => {
          setMode('profile');
          setSuccessMessage(null);
        }, 1200);
      }
    }, 400);
  };

  const handleDemoSignIn = () => {
    const demoUser = signUpUser({
      fullName: 'Rainstar Astral Seer',
      email: 'practitioner@rainstar.astrology',
      password: 'oraclepasskey',
      zodiacSign: 'Scorpio (♏ Water)',
      elementalAffiliation: 'Water',
      practitionerName: 'Rainstar Master Diviner',
    });

    if (demoUser.user) {
      setCurrentUser(demoUser.user);
      setSuccessMessage('✦ Signed in as Astrological Practitioner.');
      if (onAuthSuccess) onAuthSuccess(demoUser.user);
      setTimeout(() => {
        setMode('profile');
        setSuccessMessage(null);
      }, 1000);
    } else {
      // Try signing in
      const signInResult = signInUser('practitioner@rainstar.astrology', 'oraclepasskey');
      if (signInResult.user) {
        setCurrentUser(signInResult.user);
        setMode('profile');
      }
    }
  };

  const handleSignOut = () => {
    signOutUser();
    setCurrentUser(null);
    setMode('signin');
    setSuccessMessage('Signed out successfully.');
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  const handleSaveProfileEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateUserProfile({
      fullName: editName,
      zodiacSign: editZodiac,
      elementalAffiliation: editElement,
    });
    if (updated) {
      setCurrentUser(updated);
      setIsEditingProfile(false);
      setSuccessMessage('Profile details updated.');
      setTimeout(() => setSuccessMessage(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-stone-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-800 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] border border-amber-300/40">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-200">
            {mode === 'signup' && 'Create Your Oracle Account'}
            {mode === 'signin' && 'Sign In to Your Account'}
            {mode === 'profile' && 'Astrology Account Profile'}
          </h2>
          <p className="text-xs text-stone-400 font-serif max-w-sm mx-auto">
            {mode === 'signup' &&
              'Unlock 100 free astrology prophecy readings, save your natal cartography, and sync your planetary readings.'}
            {mode === 'signin' &&
              'Access your saved readings, personalized astrological coordinates, and active membership.'}
            {mode === 'profile' &&
              'Manage your celestial practitioner profile, elemental affinity, and subscription access.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        {mode !== 'profile' && (
          <div className="flex bg-stone-950/80 p-1 rounded-2xl border border-stone-800">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-serif font-semibold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Sign Up (Free)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-serif font-semibold rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-serif flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-serif flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            {/* Free Readings Starter Banner */}
            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between text-xs font-serif text-amber-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Includes 100 Free Readings Starter Pack</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/20">
                100 CREDITS
              </span>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="block text-xs font-serif font-medium text-stone-300">
                Full Name / Astrological Persona <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dawn Rainstar or Selene Vance"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-sm text-stone-100 placeholder-stone-600"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-xs font-serif font-medium text-stone-300">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-sm text-stone-100 placeholder-stone-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-serif font-medium text-stone-300">
                Password / Sacred Passkey <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-sm text-stone-100 placeholder-stone-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Zodiac & Element Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-serif font-medium text-stone-300">
                  Zodiac Sun Sign
                </label>
                <select
                  value={zodiacSign}
                  onChange={(e) => setZodiacSign(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-200"
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
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-200"
                >
                  {ELEMENTAL_AFFINITIES.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-stone-950 font-serif font-bold text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.99] flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Registering Inscription...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Create Account & Claim 100 Free Readings</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </>
              )}
            </button>

            {/* Demo practitioner shortcut */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="text-xs font-serif text-amber-400/90 hover:text-amber-300 underline underline-offset-4"
              >
                Or sign in instantly with Demo Practitioner account
              </button>
            </div>
          </form>
        )}

        {/* SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="block text-xs font-serif font-medium text-stone-300">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-sm text-stone-100 placeholder-stone-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-serif font-medium text-stone-300">
                Password / Passkey <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your passkey"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-sm text-stone-100 placeholder-stone-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Verifying Celestial Record...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-stone-950" />
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </>
              )}
            </button>

            {/* Quick Demo Sign In */}
            <div className="pt-2 text-center space-y-2">
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-300 border border-stone-800 text-xs font-serif transition-colors"
              >
                ⚡ 1-Click Instant Demo Login (Rainstar Seer)
              </button>
              <p className="text-[11px] text-stone-500 font-serif">
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  Sign Up for 100 Free Readings
                </button>
              </p>
            </div>
          </form>
        )}

        {/* PROFILE VIEW (Signed In) */}
        {mode === 'profile' && currentUser && (
          <div className="space-y-5">
            {/* User Avatar & Identity Card */}
            <div className="p-5 rounded-3xl bg-stone-950/90 border border-amber-500/30 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-900 border border-amber-300/50 flex items-center justify-center text-stone-950 font-serif text-2xl font-bold shadow-lg shrink-0">
                {currentUser.avatarSeed || currentUser.fullName.charAt(0)}
              </div>
              <div className="space-y-1 flex-1 overflow-hidden">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-bold text-white truncate">
                    {currentUser.fullName}
                  </h3>
                  {currentUser.plan === 'lifetime' && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-300 shrink-0 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-amber-400" />
                      LIFETIME
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-400 font-mono truncate">{currentUser.email}</p>
                <div className="flex items-center gap-2 pt-0.5 text-[11px] font-serif text-amber-300/90">
                  <span>{currentUser.zodiacSign}</span>
                  <span>•</span>
                  <span>{currentUser.elementalAffiliation} Element</span>
                </div>
              </div>
            </div>

            {/* Edit Profile Accordion */}
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfileEdit} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="text-xs font-mono uppercase text-amber-400 font-semibold">
                  Edit Astrological Details
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-serif text-stone-300">Display Name</label>
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
                    <label className="text-xs font-serif text-stone-300">Affiliation</label>
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
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-amber-500 text-stone-950 font-serif text-xs font-bold"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-serif"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-serif flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit Profile</span>
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-red-950/40 border border-stone-800 hover:border-red-500/40 text-stone-400 hover:text-red-300 text-xs font-serif flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {/* Quick Action to return to readings */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-serif font-bold text-sm shadow-md"
            >
              Continue to Astrology Oracle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
