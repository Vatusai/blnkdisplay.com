/**
 * Theme System for BLNK Display
 * 
 * Provides runtime color theming through CSS custom properties.
 * Integrates with both Tailwind CSS (via CSS variables) and direct CSS usage.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// =============================================================================
// THEME CONFIGURATION
// =============================================================================

export const THEME_STORAGE_KEY = 'blnk-accent-color';

export const DEFAULT_ACCENT_COLOR = '#0D9488';

export interface ColorPreset {
  name: string;
  value: string;
  valueDark: string;
  valueLight: string;
  hsl: string; // For --primary, --accent, --ring
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'Teal',
    value: '#0D9488',
    valueDark: '#0F766E',
    valueLight: '#2DD4BF',
    hsl: '174 76% 31%',
  },
  {
    name: 'Deep Blue',
    value: '#2563EB',
    valueDark: '#1D4ED8',
    valueLight: '#60A5FA',
    hsl: '221 83% 53%',
  },
  {
    name: 'Emerald',
    value: '#059669',
    valueDark: '#047857',
    valueLight: '#34D399',
    hsl: '160 84% 39%',
  },
  {
    name: 'Purple',
    value: '#7C3AED',
    valueDark: '#6D28D9',
    valueLight: '#A78BFA',
    hsl: '263 70% 59%',
  },
  {
    name: 'Neutral Gray',
    value: '#4B5563',
    valueDark: '#374151',
    valueLight: '#9CA3AF',
    hsl: '217 19% 35%',
  },
];

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Convert hex color to HSL string for CSS variables
 */
export function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Generate dark variant of a color
 */
export function generateDarkVariant(hex: string): string {
  // Simple darkening - in production, use a proper color manipulation library
  const preset = COLOR_PRESETS.find(p => p.value.toLowerCase() === hex.toLowerCase());
  if (preset) return preset.valueDark;
  
  // Fallback: return the color as-is (user can adjust manually in future)
  return hex;
}

/**
 * Generate light variant of a color
 */
export function generateLightVariant(hex: string): string {
  const preset = COLOR_PRESETS.find(p => p.value.toLowerCase() === hex.toLowerCase());
  if (preset) return preset.valueLight;
  
  return hex;
}

// =============================================================================
// CSS VARIABLE APPLICATION
// =============================================================================

export interface ThemeColors {
  accent: string;
  accentDark: string;
  accentLight: string;
  primaryHsl: string;
}

/**
 * Apply theme colors to CSS custom properties
 * This updates the runtime styles for the entire application
 */
export function applyThemeColors(colors: ThemeColors): void {
  const root = document.documentElement;
  
  // Apply hex-based variables (for direct CSS usage)
  root.style.setProperty('--pink', colors.accent);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--accent-dark', colors.accentDark);
  root.style.setProperty('--accent-light', colors.accentLight);
  
  // Apply HSL-based variables (for Tailwind integration)
  root.style.setProperty('--primary', colors.primaryHsl);
  root.style.setProperty('--ring', colors.primaryHsl);
  
  // Update Tailwind-specific color definitions by updating CSS variables
  // Note: Tailwind reads these at build time, so we use CSS variables directly
  // in our component styles where dynamic theming is needed
}

/**
 * Get theme colors from a base accent color
 */
export function getThemeColors(accentColor: string): ThemeColors {
  const preset = COLOR_PRESETS.find(p => p.value.toLowerCase() === accentColor.toLowerCase());
  
  if (preset) {
    return {
      accent: preset.value,
      accentDark: preset.valueDark,
      accentLight: preset.valueLight,
      primaryHsl: preset.hsl,
    };
  }
  
  // Custom color
  return {
    accent: accentColor,
    accentDark: generateDarkVariant(accentColor),
    accentLight: generateLightVariant(accentColor),
    primaryHsl: hexToHsl(accentColor),
  };
}

// =============================================================================
// STORAGE
// =============================================================================

/**
 * Save accent color to localStorage
 */
export function saveAccentColor(color: string): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, color);
  } catch (e) {
    console.warn('Failed to save theme color:', e);
  }
}

/**
 * Load accent color from localStorage
 */
export function loadAccentColor(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to load theme color:', e);
    return null;
  }
}

/**
 * Clear saved accent color (reset to default)
 */
export function clearAccentColor(): void {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear theme color:', e);
  }
}

// =============================================================================
// REACT CONTEXT
// =============================================================================

export interface ThemeContextValue {
  accentColor: string;
  setAccentColor: (color: string) => void;
  resetToDefault: () => void;
  themeColors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultColor?: string;
}

export function ThemeProvider({ children, defaultColor = DEFAULT_ACCENT_COLOR }: ThemeProviderProps) {
  const [accentColor, setAccentColorState] = useState(defaultColor);
  
  // Load saved color on mount
  useEffect(() => {
    const saved = loadAccentColor();
    if (saved) {
      setAccentColorState(saved);
    }
  }, []);
  
  // Apply colors whenever accentColor changes
  useEffect(() => {
    const colors = getThemeColors(accentColor);
    applyThemeColors(colors);
  }, [accentColor]);
  
  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
    saveAccentColor(color);
  }, []);
  
  const resetToDefault = useCallback(() => {
    setAccentColorState(defaultColor);
    clearAccentColor();
  }, [defaultColor]);
  
  const themeColors = getThemeColors(accentColor);
  
  const value: ThemeContextValue = {
    accentColor,
    setAccentColor,
    resetToDefault,
    themeColors,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================================================
// INITIALIZATION (for non-React contexts)
// =============================================================================

/**
 * Initialize theme on application load
 * Call this early in your app lifecycle (e.g., in main.tsx)
 */
export function initializeTheme(): void {
  const savedColor = loadAccentColor();
  const color = savedColor || DEFAULT_ACCENT_COLOR;
  const colors = getThemeColors(color);
  applyThemeColors(colors);
}
