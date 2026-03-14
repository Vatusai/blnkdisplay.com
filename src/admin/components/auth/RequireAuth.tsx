/**
 * RequireAuth - Authentication Guard Component
 * 
 * Wraps protected routes and redirects to login if not authenticated.
 * 
 * DEMO VERSION: Uses frontend-only session validation.
 * 
 * TODO (Supabase Migration):
 * Replace the useDemoAuth hook with Supabase Auth:
 * 
 * import { useAuth } from '@/hooks/useAuth' (Supabase version)
 * Or use Supabase directly:
 * import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
 * 
 * The component structure remains the same, only the auth source changes.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../../lib/demo-auth';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Loading spinner component for auth check
 */
function AuthLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
        <p className="text-zinc-500 text-sm">Verifying session...</p>
      </div>
    </div>
  );
}

/**
 * RequireAuth Component
 * 
 * Usage in router:
 * <Route element={<RequireAuth>}>
 *   <Route path="/admin/*" element={<AdminLayout />} />
 * </Route>
 * 
 * Or wrap individual routes:
 * <Route path="/admin/dashboard" element={
 *   <RequireAuth>
 *     <Dashboard />
 *   </RequireAuth>
 * } />
 */
export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check authentication status
    // In demo mode: checks sessionStorage
    // In Supabase mode: will check Supabase session
    const checkAuth = () => {
      const auth = isAuthenticated();
      setIsAuth(auth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return <AuthLoading />;
  }

  // Redirect to login if not authenticated
  if (!isAuth) {
    // Save the attempted URL for redirecting after login
    return (
      <Navigate 
        to="/admin/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Render protected content
  return <>{children}</>;
}

/**
 * Alternative: Route Element version for React Router v6
 * 
 * Use this if you prefer the route element pattern:
 * 
 * <Route element={<RequireAuthRoute />}>
 *   <Route path="/admin" element={<AdminLayout />}>
 *     ...nested routes
 *   </Route>
 * </Route>
 */
export function RequireAuthRoute() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = isAuthenticated();
      setIsAuth(auth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <AuthLoading />;
  }

  if (!isAuth) {
    return (
      <Navigate 
        to="/admin/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // When used as a route element, children are rendered via Outlet
  // Import Outlet from react-router-dom if using this pattern
  return null; // Placeholder - actual implementation depends on usage
}
