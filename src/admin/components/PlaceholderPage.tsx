/**
 * PlaceholderPage - Elegant placeholder for future admin sections
 * 
 * Provides a visually appealing placeholder that:
 * - Explains the future purpose of the section
 * - Shows what features are planned
 * - Maintains visual consistency with the admin design
 * - Includes relevant icons and illustrations
 */

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from './PageHeader';
import { 
  Rocket, 
  Clock, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Feature {
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
}

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  features: Feature[];
  estimatedRelease?: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    to?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    to?: string;
  };
}

const statusConfig = {
  planned: {
    icon: Circle,
    label: 'Planned',
    color: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20',
  },
  'in-progress': {
    icon: Clock,
    label: 'In Progress',
    color: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  },
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
};

export default function PlaceholderPage({
  title,
  subtitle,
  description,
  icon: Icon,
  features,
  estimatedRelease,
  primaryAction,
  secondaryAction,
}: PlaceholderPageProps) {
  const completedCount = features.filter(f => f.status === 'completed').length;
  const progress = Math.round((completedCount / features.length) * 100);

  return (
    <div>
      <PageHeader 
        title={title}
        subtitle={subtitle}
        badge={{ label: 'Coming Soon', variant: 'outline' }}
      />

      {/* Hero Card */}
      <Card className="border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 to-zinc-900/20 overflow-hidden mb-8">
        <CardContent className="p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Icon & Title */}
            <div className="flex-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)]/10 mb-6">
                <Icon className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                {title} <span className="text-[var(--accent)]">Preview</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-6">
                {primaryAction && (
                  <Button 
                    className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-black font-semibold"
                  >
                    {primaryAction.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                {secondaryAction && (
                  <Button 
                    variant="outline" 
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Card */}
            <div className="lg:w-80">
              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-[var(--accent)]" />
                    Development Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-bold text-white">{progress}%</span>
                    <span className="text-sm text-zinc-500 mb-1">complete</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--accent)] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {estimatedRelease && (
                    <p className="text-xs text-zinc-500 mt-3">
                      Estimated release: {estimatedRelease}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const status = statusConfig[feature.status];
          const StatusIcon = status.icon;
          
          return (
            <Card 
              key={feature.name}
              className={cn(
                'border-zinc-800/50 bg-zinc-900/20 group hover:border-zinc-700/50 transition-all duration-300',
                feature.status === 'completed' && 'border-emerald-500/20 bg-emerald-500/5'
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border',
                    status.color
                  )}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                      {feature.name}
                      {feature.status === 'in-progress' && (
                        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                      )}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Info */}
      <div className="mt-8 p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/50">
        <p className="text-sm text-zinc-500 text-center">
          <Sparkles className="w-4 h-4 inline mr-2 text-[var(--accent)]" />
          This section is part of the Phase 2 roadmap. 
          <a href="#" className="text-[var(--accent)] hover:underline ml-1">
            View full roadmap →
          </a>
        </p>
      </div>
    </div>
  );
}
