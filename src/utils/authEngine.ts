import { UserProfile, ElementalAffinity } from '../types';
import { isLifetimeSubscriber, getUserCredits } from './commercialEngine';

const AUTH_USER_KEY = 'subterranea_auth_current_user_v1';
const ACCOUNTS_REGISTRY_KEY = 'subterranea_registered_accounts_v1';

interface StoredAccount extends UserProfile {
  passwordHash?: string;
}

export const ZODIAC_SIGNS = [
  'Aries (♈ Fire)',
  'Taurus (♉ Earth)',
  'Gemini (♊ Air)',
  'Cancer (♋ Water)',
  'Leo (♌ Fire)',
  'Virgo (♍ Earth)',
  'Libra (♎ Air)',
  'Scorpio (♏ Water)',
  'Sagittarius (♐ Fire)',
  'Capricorn (♑ Earth)',
  'Aquarius (♒ Air)',
  'Pisces (♓ Water)',
] as const;

export const ELEMENTAL_AFFINITIES: ElementalAffinity[] = [
  'Fire',
  'Earth',
  'Water',
  'Air',
  'Aether/Void',
];

/**
 * Retrieves all registered accounts from local storage
 */
export function getAllRegisteredAccounts(): StoredAccount[] {
  try {
    const data = localStorage.getItem(ACCOUNTS_REGISTRY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to read accounts registry:', e);
    return [];
  }
}

/**
 * Saves registered accounts list to local storage
 */
function saveRegisteredAccounts(accounts: StoredAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save accounts registry:', e);
  }
}

/**
 * Retrieves the currently logged in user profile
 */
export function getCurrentUser(): UserProfile | null {
  try {
    const data = localStorage.getItem(AUTH_USER_KEY);
    if (!data) return null;
    const user: UserProfile = JSON.parse(data);
    // Sync current lifetime plan if activated
    if (isLifetimeSubscriber()) {
      user.plan = 'lifetime';
    }
    return user;
  } catch (e) {
    console.error('Failed to read current auth user:', e);
    return null;
  }
}

/**
 * Sets and dispatches the active logged-in user
 */
export function setCurrentUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
    window.dispatchEvent(new CustomEvent('auth_state_changed', { detail: user }));
  } catch (e) {
    console.error('Failed to set auth user:', e);
  }
}

/**
 * Registers / Signs Up a new user
 */
export function signUpUser(params: {
  email: string;
  password?: string;
  fullName: string;
  practitionerName?: string;
  zodiacSign?: string;
  birthDate?: string;
  elementalAffiliation?: ElementalAffinity;
  bio?: string;
}): { success: boolean; user?: UserProfile; error?: string } {
  const normalizedEmail = params.email.trim().toLowerCase();
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    return { success: false, error: 'Please provide a valid email address.' };
  }

  if (!params.fullName.trim()) {
    return { success: false, error: 'Please provide your name or astrological title.' };
  }

  const accounts = getAllRegisteredAccounts();
  const existing = accounts.find((acc) => acc.email.toLowerCase() === normalizedEmail);

  if (existing) {
    return {
      success: false,
      error: 'An account with this email already exists. Please sign in instead.',
    };
  }

  const isLifetime = isLifetimeSubscriber();

  const newAccount: StoredAccount = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: normalizedEmail,
    fullName: params.fullName.trim(),
    practitionerName: params.practitionerName?.trim() || params.fullName.trim(),
    zodiacSign: params.zodiacSign || 'Scorpio (♏ Water)',
    birthDate: params.birthDate || '',
    elementalAffiliation: params.elementalAffiliation || 'Earth',
    avatarSeed: params.fullName.trim().charAt(0).toUpperCase() || '✦',
    createdAt: Date.now(),
    plan: isLifetime ? 'lifetime' : 'free',
    credits: getUserCredits(),
    readingsCount: 0,
    paypalLinkedEmail: normalizedEmail,
    bio: params.bio?.trim() || 'Astrological student & planetary mantle cartographer.',
    passwordHash: params.password ? btoa(params.password) : undefined,
  };

  accounts.push(newAccount);
  saveRegisteredAccounts(accounts);
  setCurrentUser(newAccount);

  return { success: true, user: newAccount };
}

/**
 * Signs in an existing registered user
 */
export function signInUser(
  email: string,
  password?: string
): { success: boolean; user?: UserProfile; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    return { success: false, error: 'Please enter your account email.' };
  }

  const accounts = getAllRegisteredAccounts();
  const match = accounts.find((acc) => acc.email.toLowerCase() === normalizedEmail);

  if (!match) {
    // If no account exists yet, provide a smooth experience by creating one automatically if requested
    return {
      success: false,
      error: 'No account found with this email. Please click "Sign Up" to create your free profile.',
    };
  }

  if (match.passwordHash && password) {
    if (match.passwordHash !== btoa(password)) {
      return { success: false, error: 'Incorrect passkey or password.' };
    }
  }

  // Update credits and subscription state
  match.credits = getUserCredits();
  if (isLifetimeSubscriber()) {
    match.plan = 'lifetime';
  }

  setCurrentUser(match);
  return { success: true, user: match };
}

/**
 * Signs out the current user session
 */
export function signOutUser(): void {
  setCurrentUser(null);
}

/**
 * Updates profile fields for the logged in user
 */
export function updateUserProfile(updates: Partial<UserProfile>): UserProfile | null {
  const current = getCurrentUser();
  if (!current) return null;

  const updated: UserProfile = {
    ...current,
    ...updates,
  };

  // Update in registry
  const accounts = getAllRegisteredAccounts();
  const idx = accounts.findIndex((a) => a.id === current.id || a.email === current.email);
  if (idx !== -1) {
    accounts[idx] = { ...accounts[idx], ...updated };
    saveRegisteredAccounts(accounts);
  }

  setCurrentUser(updated);
  return updated;
}
