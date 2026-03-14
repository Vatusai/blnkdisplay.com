/**
 * Admin Application - Router Configuration
 * 
 * This component defines all admin routes and wraps them with the AdminLayout.
 * Routes are nested under /admin/* via the main App.tsx router.
 * 
 * Route Structure:
 * /admin              → Dashboard (default)
 * /admin/login        → Login page (no layout)
 * /admin/content      → Content Management
 * /admin/content/*    → Content sub-pages
 * /admin/crm          → CRM Dashboard
 * /admin/crm/*        → CRM sub-pages (leads, quotes, clients, contracts)
 * /admin/settings     → General Settings
 * /admin/settings/theme → Theme Settings
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';

// Lazy-loaded pages — keeps the public landing page bundle lean
const Dashboard    = lazy(() => import('./pages/dashboard/Dashboard'));
const Login        = lazy(() => import('./pages/auth/Login'));
const Content      = lazy(() => import('./pages/content/Content'));
const CRM          = lazy(() => import('./pages/crm/CRM'));
const Settings     = lazy(() => import('./pages/settings/Settings'));
const ThemeSettings = lazy(() => import('./pages/settings/ThemeSettings'));

// Minimal spinner shown while a lazy page chunk loads
function AdminLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AdminApp() {
  return (
    <Suspense fallback={<AdminLoadingFallback />}>
      <Routes>
        {/* Login - No layout, full screen */}
        <Route path="/login" element={<Login />} />

        {/* All other admin routes - With AdminLayout */}
        <Route
          path="/*"
          element={
            <AdminLayout>
              <Suspense fallback={<AdminLoadingFallback />}>
                <Routes>
                  {/* Dashboard - Default admin page */}
                  <Route path="/" element={<Dashboard />} />

                  {/* Content Management
                      Sub-routes redirect to the parent placeholder until real
                      sub-pages are implemented (Phase 2). Replace Navigate with
                      the actual component when each sub-page is built. */}
                  <Route path="/content" element={<Content />} />
                  <Route path="/content/blog"     element={<Navigate to="/admin/content" replace />} />
                  <Route path="/content/homepage" element={<Navigate to="/admin/content" replace />} />
                  <Route path="/content/media"    element={<Navigate to="/admin/content" replace />} />

                  {/* CRM
                      Same pattern: sub-routes redirect to parent until Phase 2. */}
                  <Route path="/crm" element={<CRM />} />
                  <Route path="/crm/leads"     element={<Navigate to="/admin/crm" replace />} />
                  <Route path="/crm/quotes"    element={<Navigate to="/admin/crm" replace />} />
                  <Route path="/crm/clients"   element={<Navigate to="/admin/crm" replace />} />
                  <Route path="/crm/contracts" element={<Navigate to="/admin/crm" replace />} />

                  {/* Settings */}
                  <Route path="/settings"       element={<Settings />} />
                  <Route path="/settings/theme" element={<ThemeSettings />} />

                  {/* Fallback - Redirect to dashboard */}
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </Suspense>
            </AdminLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AdminApp;
