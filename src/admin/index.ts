// Admin Module Exports
export { default as AdminApp } from './AdminApp';
export { default as AdminLayout } from './components/layout/AdminLayout';
export { default as RequireAuth } from './components/auth/RequireAuth';
export { default as Dashboard } from './pages/dashboard/Dashboard';
export { default as ThemeSettings } from './pages/settings/ThemeSettings';
export { default as Settings } from './pages/settings/Settings';
export { default as Content } from './pages/content/Content';
export { default as CRM } from './pages/crm/CRM';
export { default as Login } from './pages/auth/Login';

// Auth utilities (demo version - will be replaced by Supabase)
export { 
  useDemoAuth, 
  validateCredentials, 
  getSession, 
  isAuthenticated, 
  logout,
  type DemoSession,
  type AuthResult 
} from './lib/demo-auth';

// Theme utilities
export {
  getRecentColors,
  saveRecentColors,
  addToRecentColors,
  clearRecentColors,
  RECENT_COLORS_KEY,
  MAX_RECENT_COLORS
} from '@/lib/theme';
