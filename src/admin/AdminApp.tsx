/**
 * Admin Application - Router Configuration with Authentication
 * 
 * This component defines all admin routes with authentication protection.
 * Routes are nested under /admin/* via the main App.tsx router.
 * 
 * AUTH FLOW:
 * 1. User accesses /admin/login → Public route, shows login form
 * 2. User submits credentials → Validated by demo-auth.ts
 * 3. On success → Session stored, redirected to /admin
 * 4. User accesses /admin/* → RequireAuth checks session
 * 5. If no session → Redirected to /admin/login
 * 6. User clicks logout → Session cleared, redirected to login
 * 
 * DEMO AUTH: Using frontend-only session (sessionStorage)
 * TODO (Supabase Migration): Replace demo-auth with Supabase Auth
 * 
 * Route Structure:
 * /admin/login        → Login page (PUBLIC)
 * /admin              → Dashboard (PROTECTED)
 * /admin/content/*    → Content Management (PROTECTED)
 * /admin/crm/*        → CRM (PROTECTED)
 * /admin/settings/*   → Settings (PROTECTED)
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import RequireAuth from './components/auth/RequireAuth';

// Pages
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Content from './pages/content/Content';
import CRM from './pages/crm/CRM';
import Settings from './pages/settings/Settings';
import ThemeSettings from './pages/settings/ThemeSettings';

function AdminApp() {
  return (
    <Routes>
      {/* 
        PUBLIC ROUTE: Login 
        Accessible without authentication
      */}
      <Route path="/login" element={<Login />} />
      
      {/* 
        PROTECTED ROUTES: All /admin/* except /login
        Wrapped with RequireAuth to check session
        
        TODO (Supabase Migration): RequireAuth will use Supabase session
        instead of demo sessionStorage
      */}
      <Route
        path="/*"
        element={
          <RequireAuth>
            <AdminLayout>
              <Routes>
                {/* Dashboard - Default admin page */}
                <Route path="/" element={<Dashboard />} />
                
                {/* Content Management */}
                <Route path="/content" element={<Content />} />
                <Route path="/content/blog" element={<Content />} />
                <Route path="/content/homepage" element={<Content />} />
                <Route path="/content/media" element={<Content />} />
                
                {/* CRM */}
                <Route path="/crm" element={<CRM />} />
                <Route path="/crm/leads" element={<CRM />} />
                <Route path="/crm/quotes" element={<CRM />} />
                <Route path="/crm/clients" element={<CRM />} />
                <Route path="/crm/contracts" element={<CRM />} />
                
                {/* Settings */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/theme" element={<ThemeSettings />} />
                
                {/* Fallback - Redirect to dashboard */}
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </AdminLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default AdminApp;
