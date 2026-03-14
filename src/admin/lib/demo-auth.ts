/**
 * DEMO AUTHENTICATION - TEMPORARY IMPLEMENTATION
 * 
 * ⚠️ WARNING: This is a DEMO-ONLY authentication system.
 * It is NOT secure for production use.
 * 
 * WHY THIS IS NOT SECURE:
 * - Credentials are visible in the frontend bundle (GitHub Pages = static hosting)
 * - Anyone can inspect the code and find the password
 * - No server-side validation
 * - No encryption
 * - Session can be easily forged in browser dev tools
 * 
 * MIGRATION TO SUPABASE AUTH:
 * Replace this entire file with Supabase Auth integration:
 * 1. Install: npm install @supabase/supabase-js
 * 2. Create client: src/lib/supabase.ts
 * 3. Replace validateCredentials() with: supabase.auth.signInWithPassword()
 * 4. Replace getSession() with: supabase.auth.getSession()
 * 5. Replace logout() with: supabase.auth.signOut()
 * 6. Remove DEMO_CREDENTIALS constant entirely
 * 
 * FILES TO MODIFY FOR SUPABASE MIGRATION:
 * - src/admin/lib/demo-auth.ts (this file) → Replace with real auth
 * - src/admin/components/auth/RequireAuth.tsx → Use supabase.auth.onAuthStateChange()
 * - src/admin/pages/auth/Login.tsx → Use supabase.auth.signInWithPassword()
 * - src/admin/components/layout/AdminLayout.tsx → Use supabase.auth.signOut()
 */

// =============================================================================
// DEMO CREDENTIALS - TEMPORARY ONLY
// These will be removed when migrating to Supabase Auth
// =============================================================================

const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'admin@blnkdisplay123',
} as const;

// =============================================================================
// SESSION STORAGE KEYS
// =============================================================================

const SESSION_KEY = 'blnk_admin_demo_session';
const SESSION_TIMESTAMP_KEY = 'blnk_admin_demo_session_time';

// Session duration: 8 hours (in milliseconds)
const SESSION_DURATION = 8 * 60 * 60 * 1000;

// =============================================================================
// TYPES
// =============================================================================

export interface DemoSession {
  username: string;
  loginTime: number;
  isValid: boolean;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  session?: DemoSession;
}

// =============================================================================
// AUTHENTICATION FUNCTIONS
// =============================================================================

/**
 * Validate credentials against demo credentials
 * 
 * TODO (Supabase Migration): Replace with:
 * const { data, error } = await supabase.auth.signInWithPassword({
 *   email: username,
 *   password: password
 * })
 */
export function validateCredentials(username: string, password: string): AuthResult {
  // Trim inputs to avoid whitespace issues
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (trimmedUsername === DEMO_CREDENTIALS.username && 
      trimmedPassword === DEMO_CREDENTIALS.password) {
    
    const session: DemoSession = {
      username: trimmedUsername,
      loginTime: Date.now(),
      isValid: true,
    };

    // Store session
    saveSession(session);

    return {
      success: true,
      session,
    };
  }

  return {
    success: false,
    error: 'Invalid username or password',
  };
}

/**
 * Save session to sessionStorage
 * Using sessionStorage so it's cleared when browser tab closes
 * 
 * TODO (Supabase Migration): Remove this function.
 * Supabase handles sessions automatically via cookies/localStorage
 */
export function saveSession(session: DemoSession): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    sessionStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
  } catch (e) {
    console.error('Failed to save session:', e);
  }
}

/**
 * Get current session if valid
 * 
 * TODO (Supabase Migration): Replace with:
 * const { data: { session } } = await supabase.auth.getSession()
 * return session
 */
export function getSession(): DemoSession | null {
  try {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    const timestampData = sessionStorage.getItem(SESSION_TIMESTAMP_KEY);

    if (!sessionData || !timestampData) {
      return null;
    }

    const session: DemoSession = JSON.parse(sessionData);
    const loginTime = parseInt(timestampData, 10);
    const now = Date.now();

    // Check if session has expired
    if (now - loginTime > SESSION_DURATION) {
      // Session expired, clear it
      logout();
      return null;
    }

    return session;
  } catch (e) {
    console.error('Failed to get session:', e);
    return null;
  }
}

/**
 * Check if user is authenticated
 * 
 * TODO (Supabase Migration): Replace with:
 * const { data: { session } } = await supabase.auth.getSession()
 * return session !== null
 */
export function isAuthenticated(): boolean {
  return getSession() !== null;
}

/**
 * Logout - clear session
 * 
 * TODO (Supabase Migration): Replace with:
 * await supabase.auth.signOut()
 */
export function logout(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_TIMESTAMP_KEY);
  } catch (e) {
    console.error('Failed to logout:', e);
  }
}

/**
 * Get remaining session time in minutes
 * Useful for showing "Session expires in X minutes" warning
 */
export function getSessionRemainingTime(): number | null {
  try {
    const timestampData = sessionStorage.getItem(SESSION_TIMESTAMP_KEY);
    if (!timestampData) return null;

    const loginTime = parseInt(timestampData, 10);
    const now = Date.now();
    const elapsed = now - loginTime;
    const remaining = SESSION_DURATION - elapsed;

    if (remaining <= 0) return null;

    return Math.floor(remaining / 1000 / 60); // Convert to minutes
  } catch (e) {
    return null;
  }
}

// =============================================================================
// DEMO AUTH HOOK (for React components)
// =============================================================================

import { useState, useEffect, useCallback } from 'react';

interface UseDemoAuthReturn {
  isAuthenticated: boolean;
  session: DemoSession | null;
  login: (username: string, password: string) => AuthResult;
  logout: () => void;
  remainingTime: number | null;
}

/**
 * React hook for demo authentication
 * 
 * TODO (Supabase Migration): Replace with:
 * import { useAuth } from '@/hooks/useAuth' (Supabase version)
 */
export function useDemoAuth(): UseDemoAuthReturn {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  // Check session on mount
  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
    setRemainingTime(getSessionRemainingTime());

    // Update remaining time every minute
    const interval = setInterval(() => {
      setRemainingTime(getSessionRemainingTime());
      // If session expired, update state
      if (!getSession()) {
        setSession(null);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = useCallback((username: string, password: string): AuthResult => {
    const result = validateCredentials(username, password);
    if (result.success && result.session) {
      setSession(result.session);
      setRemainingTime(getSessionRemainingTime());
    }
    return result;
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setSession(null);
    setRemainingTime(null);
  }, []);

  return {
    isAuthenticated: session !== null,
    session,
    login: handleLogin,
    logout: handleLogout,
    remainingTime,
  };
}
