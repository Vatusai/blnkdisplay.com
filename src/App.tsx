/**
 * Main Application Router
 * 
 * Root component that handles top-level routing:
 * - /         → Landing Page (public website)
 * - /admin/*  → Admin Panel (nested routing via AdminApp)
 * - *         → 404 redirect to Landing
 * 
 * The admin routes are handled by AdminApp which provides:
 * - AdminLayout with sidebar navigation
 * - Nested routes for dashboard, content, crm, settings
 */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Admin Application
import AdminApp from './admin/AdminApp';

// Landing Page (public website)
import LandingPage from './LandingPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Handle ScrollTrigger cleanup when navigating to/from admin
  useEffect(() => {
    if (!isAdminRoute) {
      // Refresh ScrollTrigger when on landing page
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Kill all ScrollTriggers when entering admin (not needed there)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, [isAdminRoute]);

  return (
    <Routes>
      {/* Landing Page - Root route */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Admin Routes - All /admin/* paths */}
      <Route path="/admin/*" element={<AdminApp />} />
      
      {/* Catch-all: redirect to landing page */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
