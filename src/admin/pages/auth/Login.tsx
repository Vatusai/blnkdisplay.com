/**
 * Login Page - Demo Authentication
 * 
 * DEMO VERSION: Frontend-only authentication for demo/staging purposes.
 * 
 * TODO (Supabase Migration):
 * 1. Replace useState form handling with Supabase Auth
 * 2. Remove demo credential references
 * 3. Add email validation (Supabase uses email, not username)
 * 4. Add password reset flow
 * 5. Add OAuth providers (Google, etc.) if needed
 * 
 * MIGRATION STEPS:
 * - Replace: import { useDemoAuth } from '../../lib/demo-auth'
 * - With:    import { useAuth } from '@/hooks/useAuth' (Supabase)
 * - Replace: login(username, password)
 * - With:    supabase.auth.signInWithPassword({ email, password })
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { useDemoAuth } from '../../lib/demo-auth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useDemoAuth();
  
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the intended destination from location state
  const from = (location.state as { from?: string })?.from || '/admin';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Small delay to show loading state (better UX)
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = login(username, password);

    if (result.success) {
      // Navigate to intended destination or dashboard
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Authentication failed');
    }

    setIsLoading(false);
  };

  // Handle Enter key on inputs
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        <div 
          className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ 
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      </div>

      {/* Back to website link */}
      <div className="relative z-10 p-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-[var(--accent)] transition-colors text-sm"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to website
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)]/10 mb-4 ring-1 ring-[var(--accent)]/20">
              <Shield className="w-8 h-8 text-[var(--accent)]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">BLNK Admin</h1>
            <p className="text-zinc-400">Business Management Platform</p>
          </div>

          {/* Login Card */}
          <Card className="border-zinc-800/50 bg-zinc-900/80 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-white">Welcome back</CardTitle>
              <CardDescription className="text-zinc-400">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Error Alert */}
              {error && (
                <Alert 
                  variant="destructive" 
                  className="mb-4 bg-rose-500/10 border-rose-500/20 text-rose-400"
                >
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-zinc-300 text-sm">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter username"
                      autoComplete="username"
                      autoFocus
                      disabled={isLoading}
                      className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 
                                 focus:border-[var(--accent)] focus:ring-[var(--accent)]/20 
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all"
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-300 text-sm">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      className="pl-10 pr-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 
                                 focus:border-[var(--accent)] focus:ring-[var(--accent)]/20 
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 
                                 hover:text-zinc-300 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  disabled={isLoading || !username.trim() || !password.trim()}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-black font-semibold 
                             h-11 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Demo Notice */}
              <div className="mt-6 p-3 rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/10">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-[var(--accent)] mb-1">
                      Demo Mode Active
                    </p>
                    <p className="text-xs text-zinc-500">
                      This is a temporary authentication system for demonstration. 
                      Will be replaced with Supabase Auth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Demo Credentials (for demo purposes only) */}
              <div className="mt-4 text-center">
                <p className="text-xs text-zinc-600">
                  Demo credentials: <span className="text-zinc-500">admin / admin@blnkdisplay123</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center mt-8 text-xs text-zinc-600">
            Protected by demo authentication.{' '}
            <span className="text-zinc-500">Not for production use.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
