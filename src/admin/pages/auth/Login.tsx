/**
 * Login Page - Authentication Placeholder
 * 
 * Located at: /admin/login
 * 
 * This is a placeholder for the future authentication system.
 * Currently, the admin panel is accessible without authentication.
 * 
 * Future integration with Supabase Auth will enable:
 * - Email/password login
 * - Magic link authentication
 * - Role-based access control
 * - Session management
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  // Placeholder - no actual authentication yet
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: Integrate with Supabase Auth
    console.log('Login submitted - awaiting Supabase integration');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)]/10 mb-4">
            <Shield className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">BLNK Admin</h1>
          <p className="text-zinc-400">Business Management Platform</p>
        </div>

        <Card className="border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="rodrigo@blnkdisplay.com"
                    className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-black font-semibold"
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-500">
                <Sparkles className="w-3 h-3 inline mr-1 text-[var(--accent)]" />
                Authentication coming in Phase 2
              </p>
            </div>

            {/* TODO: REMOVE BEFORE PRODUCTION — this button bypasses auth entirely.
                Once Supabase Auth is wired up in Phase 2, delete this block. */}
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <Link to="/admin">
                <Button
                  variant="ghost"
                  className="w-full text-zinc-400 hover:text-white"
                >
                  Continue without login (dev mode)
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to website */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-sm text-zinc-500 hover:text-[var(--accent)] transition-colors"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
