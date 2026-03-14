// Theme Runtime Script - Vanilla JavaScript for immediate execution
// This file is kept as reference - the actual runtime script is inline in index.html
// It is NOT imported by the app. ESLint and TS are suppressed intentionally:
// the IIFE uses var + legacy patterns for maximum browser compatibility at
// script execution time (before any bundler polyfills are available).
/* eslint-disable */
// @ts-nocheck
(function() {
  'use strict';
  
  var THEME_STORAGE_KEY = 'blnk-accent-color';
  var DEFAULT_ACCENT_COLOR = '#0D9488';
  
  // Color presets with HSL values
  var COLOR_PRESETS = {
    '#0D9488': { hsl: '174 76% 31%', dark: '#0F766E', light: '#2DD4BF' },
    '#2563EB': { hsl: '221 83% 53%', dark: '#1D4ED8', light: '#60A5FA' },
    '#059669': { hsl: '160 84% 39%', dark: '#047857', light: '#34D399' },
    '#7C3AED': { hsl: '263 70% 59%', dark: '#6D28D9', light: '#A78BFA' },
    '#4B5563': { hsl: '217 19% 35%', dark: '#374151', light: '#9CA3AF' },
  };
  
  /**
   * Convert hex to HSL
   * @param {string} hex
   * @returns {string}
   */
  function hexToHsl(hex) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;
    
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0, s = 0;
    var l = (max + min) / 2;
    
    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return Math.round(h * 360) + ' ' + Math.round(s * 100) + '% ' + Math.round(l * 100) + '%';
  }
  
  /**
   * Apply theme colors immediately
   */
  function applyTheme() {
    try {
      var savedColor = localStorage.getItem(THEME_STORAGE_KEY);
      var accentColor = savedColor || DEFAULT_ACCENT_COLOR;
      /** @type {any} */
      var presets = COLOR_PRESETS;
      var preset = presets[accentColor.toUpperCase()] || presets[accentColor.toLowerCase()];
      
      var root = document.documentElement;
      
      // Apply hex colors
      root.style.setProperty('--pink', accentColor);
      root.style.setProperty('--accent', accentColor);
      
      if (preset) {
        root.style.setProperty('--accent-dark', preset.dark);
        root.style.setProperty('--accent-light', preset.light);
        root.style.setProperty('--primary', preset.hsl);
        root.style.setProperty('--ring', preset.hsl);
      } else {
        // Custom color - compute HSL
        root.style.setProperty('--accent-dark', accentColor);
        root.style.setProperty('--accent-light', accentColor);
        var hsl = hexToHsl(accentColor);
        root.style.setProperty('--primary', hsl);
        root.style.setProperty('--ring', hsl);
      }
    } catch (e) {
      // Silently fail - app will use default CSS values
    }
  }
  
  // Apply immediately
  applyTheme();
  
  // Also apply when DOM is ready (in case this loads before <html> exists)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
  }
})();
