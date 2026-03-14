/**
 * Settings - General Settings Placeholder Page
 * 
 * Located at: /admin/settings
 * 
 * This page serves as the main settings hub.
 * For theme settings, see /admin/settings/theme
 * 
 * Future functionality:
 * - Site configuration
 * - User management
 * - Integrations
 * - Notifications
 * - Security settings
 */

import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Palette, 
  Users, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Mail,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const settingsCategories = [
  {
    title: 'Appearance',
    description: 'Customize colors, logos, and visual identity',
    icon: Palette,
    to: '/admin/settings/theme',
    color: 'bg-[var(--accent)]/10 text-[var(--accent)]',
    status: 'available',
  },
  {
    title: 'Team Members',
    description: 'Manage users, roles, and permissions',
    icon: Users,
    to: '#',
    color: 'bg-blue-500/10 text-blue-400',
    status: 'coming-soon',
  },
  {
    title: 'Notifications',
    description: 'Configure email alerts and in-app notifications',
    icon: Bell,
    to: '#',
    color: 'bg-amber-500/10 text-amber-400',
    status: 'coming-soon',
  },
  {
    title: 'Security',
    description: 'Two-factor auth, API keys, and access logs',
    icon: Shield,
    to: '#',
    color: 'bg-emerald-500/10 text-emerald-400',
    status: 'coming-soon',
  },
  {
    title: 'Integrations',
    description: 'Connect with Stripe, SendGrid, and other services',
    icon: Database,
    to: '#',
    color: 'bg-purple-500/10 text-purple-400',
    status: 'coming-soon',
  },
  {
    title: 'Site Configuration',
    description: 'Domain settings, SEO defaults, and global options',
    icon: Globe,
    to: '#',
    color: 'bg-rose-500/10 text-rose-400',
    status: 'coming-soon',
  },
];

export default function Settings() {
  return (
    <div>
      <PageHeader 
        title="Settings"
        subtitle="Configure your admin panel and website preferences"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsCategories.map((category) => (
          <Link key={category.title} to={category.to}>
            <Card className="h-full border-zinc-800/50 bg-zinc-900/20 hover:border-zinc-700/50 hover:bg-zinc-900/40 transition-all duration-300 group">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
                        {category.title}
                      </h3>
                      {category.status === 'available' && (
                        <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Info Card */}
      <Card className="mt-8 border-zinc-800/50 bg-zinc-900/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="w-4 h-4 text-[var(--accent)]" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-400">
            If you need assistance with configuration or have questions about settings, 
            contact the development team at{' '}
            <a href="mailto:support@blnkdisplay.com" className="text-[var(--accent)] hover:underline">
              support@blnkdisplay.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
