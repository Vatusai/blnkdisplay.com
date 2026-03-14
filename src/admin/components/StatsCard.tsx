/**
 * StatsCard - Dashboard statistics card component
 * 
 * Displays KPI metrics with:
 * - Icon and label
 * - Main value
 * - Trend indicator (up/down)
 * - Change percentage
 * - Optional sparkline or chart
 */

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
  variant?: 'default' | 'accent' | 'outline';
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  variant = 'default',
}: StatsCardProps) {
  const getTrendIcon = () => {
    switch (trend?.direction) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />;
      case 'down':
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trend?.direction) {
      case 'up':
        return 'text-emerald-400';
      case 'down':
        return 'text-rose-400';
      default:
        return 'text-zinc-500';
    }
  };

  return (
    <Card 
      className={cn(
        'border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm overflow-hidden group',
        'hover:border-zinc-700/50 transition-all duration-300',
        variant === 'accent' && 'border-[var(--accent)]/20 bg-[var(--accent)]/5',
        variant === 'outline' && 'bg-transparent',
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-zinc-400">
          {title}
        </CardTitle>
        <div 
          className={cn(
            'p-2 rounded-lg transition-colors duration-300',
            variant === 'accent' 
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]' 
              : 'bg-zinc-800/50 text-zinc-400 group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)]'
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {value}
          </span>
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-medium',
              getTrendColor()
            )}>
              {getTrendIcon()}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {(description || trend) && (
          <p className="text-xs text-zinc-500 mt-1">
            {description || trend?.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
