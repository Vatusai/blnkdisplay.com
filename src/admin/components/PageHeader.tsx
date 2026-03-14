/**
 * PageHeader - Reusable page header component for admin pages
 * 
 * Provides consistent page headers with:
 * - Title and subtitle
 * - Breadcrumb navigation
 * - Action buttons slot
 * - Status badges
 */

import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  };
  actions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  badge,
  actions,
  className,
}: PageHeaderProps) {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from path if not provided
  const autoBreadcrumbs: BreadcrumbItem[] | undefined = breadcrumbs === undefined 
    ? generateBreadcrumbsFromPath(location.pathname)
    : breadcrumbs;

  return (
    <div className={cn('mb-8', className)}>
      {/* Breadcrumbs */}
      {autoBreadcrumbs && autoBreadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
          <Link 
            to="/admin" 
            className="flex items-center hover:text-[var(--accent)] transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          {autoBreadcrumbs.map((item, index) => {
            const isLast = index === autoBreadcrumbs.length - 1;
            return (
              <div key={item.label} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-zinc-700" />
                {item.path && !isLast ? (
                  <Link 
                    to={item.path}
                    className="hover:text-[var(--accent)] transition-colors capitalize"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-zinc-300 font-medium' : 'capitalize'}>
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      )}

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              {title}
            </h1>
            {badge && (
              <Badge 
                variant={badge.variant || 'secondary'}
                className={cn(
                  badge.variant === 'default' && 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20'
                )}
              >
                {badge.label}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-zinc-400 mt-1 text-sm lg:text-base">{subtitle}</p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const parts = pathname.split('/').filter(Boolean);
  
  // Skip 'admin' and map remaining parts
  const adminIndex = parts.indexOf('admin');
  const relevantParts = adminIndex >= 0 ? parts.slice(adminIndex + 1) : parts;
  
  if (relevantParts.length === 0) {
    return [{ label: 'Dashboard' }];
  }

  return relevantParts.map((part, index) => {
    const label = part
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const path = '/admin/' + relevantParts.slice(0, index + 1).join('/');
    
    return {
      label,
      path: index < relevantParts.length - 1 ? path : undefined,
    };
  });
}
