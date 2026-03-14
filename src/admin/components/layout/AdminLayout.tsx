/**
 * AdminLayout - Main Administrative Shell
 * 
 * Provides the structural framework for the entire admin panel:
 * - Collapsible sidebar navigation
 * - Top header with user context
 * - Main content area with proper scrolling
 * - Responsive design for all screen sizes
 * - Visual hierarchy aligned with BLNK Display brand
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Palette,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  Shield,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// =============================================================================
// NAVIGATION CONFIGURATION
// =============================================================================

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  children?: { label: string; path: string }[];
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { 
    label: 'Content', 
    path: '/admin/content', 
    icon: FileText,
    children: [
      { label: 'Blog Posts', path: '/admin/content/blog' },
      { label: 'Homepage', path: '/admin/content/homepage' },
      { label: 'Media Library', path: '/admin/content/media' },
    ]
  },
  { 
    label: 'CRM', 
    path: '/admin/crm', 
    icon: Users,
    badge: 'New',
    children: [
      { label: 'Leads', path: '/admin/crm/leads' },
      { label: 'Quotes', path: '/admin/crm/quotes' },
      { label: 'Clients', path: '/admin/crm/clients' },
      { label: 'Contracts', path: '/admin/crm/contracts' },
    ]
  },
];

const settingsNavItems: NavItem[] = [
  { label: 'Theme', path: '/admin/settings/theme', icon: Palette },
  { label: 'General', path: '/admin/settings', icon: Settings },
];

// =============================================================================
// SIDEBAR NAVIGATION ITEM COMPONENT
// =============================================================================

interface NavItemProps {
  item: NavItem;
  isCollapsed: boolean;
  isActive: boolean;
}

function SidebarNavItem({ item, isCollapsed, isActive }: NavItemProps) {
  const location = useLocation();
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = hasChildren && location.pathname.startsWith(item.path);
  
  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={item.path}
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
                'hover:bg-[var(--accent)]/10',
                isActive 
                  ? 'bg-[var(--accent)]/20 text-[var(--accent)]' 
                  : 'text-zinc-400 hover:text-zinc-100'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent)]" />
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-zinc-900 border-zinc-800">
            {item.label}
            {item.badge && (
              <Badge variant="secondary" className="ml-2 bg-[var(--accent)]/20 text-[var(--accent)]">
                {item.badge}
              </Badge>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-1">
      <Link
        to={item.path}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
          'hover:bg-[var(--accent)]/10',
          isActive 
            ? 'bg-[var(--accent)]/10 text-[var(--accent)]' 
            : 'text-zinc-400 hover:text-zinc-100'
        )}
      >
        <Icon className={cn(
          'w-5 h-5 transition-colors',
          isActive ? 'text-[var(--accent)]' : 'group-hover:text-zinc-100'
        )} />
        <span className="flex-1 font-medium text-sm">{item.label}</span>
        {item.badge && (
          <Badge variant="secondary" className="bg-[var(--accent)]/20 text-[var(--accent)] text-xs">
            {item.badge}
          </Badge>
        )}
        {hasChildren && (
          <ChevronRight className={cn(
            'w-4 h-4 transition-transform duration-200',
            isExpanded && 'rotate-90'
          )} />
        )}
      </Link>
      
      {/* Sub-navigation */}
      {hasChildren && item.children && isExpanded && (
        <div className="ml-4 pl-4 border-l border-zinc-800 space-y-1">
          {item.children.map((child) => {
            const isChildActive = location.pathname === child.path;
            return (
              <Link
                key={child.path}
                to={child.path}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                  isChildActive
                    ? 'text-[var(--accent)] bg-[var(--accent)]/5'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                )}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// MAIN ADMIN LAYOUT
// =============================================================================

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current path matches nav item
  const isPathActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50',
          'bg-[#09090b] border-r border-zinc-800/50',
          'flex flex-col transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'w-64' : 'w-20',
          !isSidebarOpen && 'items-center',
          // Mobile behavior
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        )}
      >
        {/* Logo Area */}
        <div className={cn(
          'h-16 flex items-center border-b border-zinc-800/50',
          isSidebarOpen ? 'px-4 justify-between' : 'justify-center px-2'
        )}>
          {isSidebarOpen ? (
            <>
              <Link to="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white tracking-tight">BLNK</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Admin</span>
                </div>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
              >
                <Menu className="w-4 h-4 rotate-180" />
              </button>
            </>
          ) : (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/admin" className="flex items-center justify-center w-10 h-10">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-zinc-900 border-zinc-800">
                  BLNK Admin
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {/* Main Navigation */}
          <nav className={cn('space-y-1', !isSidebarOpen && 'flex flex-col items-center space-y-2')}>
            {mainNavItems.map((item) => (
              <SidebarNavItem
                key={item.path}
                item={item}
                isCollapsed={!isSidebarOpen}
                isActive={isPathActive(item.path)}
              />
            ))}
          </nav>

          {/* Settings Section */}
          <div>
            {isSidebarOpen && (
              <p className="px-3 text-xs font-medium text-zinc-600 uppercase tracking-wider mb-2">
                Settings
              </p>
            )}
            <nav className={cn('space-y-1', !isSidebarOpen && 'flex flex-col items-center space-y-2')}>
              {settingsNavItems.map((item) => (
                <SidebarNavItem
                  key={item.path}
                  item={item}
                  isCollapsed={!isSidebarOpen}
                  isActive={isPathActive(item.path)}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* User Section */}
        <div className={cn(
          'border-t border-zinc-800/50 p-4',
          !isSidebarOpen && 'flex justify-center'
        )}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 border border-zinc-800">
                <AvatarImage src="" />
                <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs font-medium">
                  RO
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Rodrigo</p>
                <p className="text-xs text-zinc-500 truncate">Administrator</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-300">
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Exit to Website</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/">
                    <Avatar className="w-10 h-10 border border-zinc-800 cursor-pointer hover:border-[var(--accent)]/50 transition-colors">
                      <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">
                        RO
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Rodrigo - Exit to Website</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800/50 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between">
            {/* Left: Mobile menu + Search */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-zinc-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              {/* Collapse toggle (desktop) */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>

              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-zinc-500">
                <Search className="w-4 h-4" />
                <span className="text-sm">Search...</span>
                <kbd className="ml-2 px-1.5 py-0.5 text-xs rounded bg-zinc-800 text-zinc-400">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent)]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Separator orientation="vertical" className="h-6 bg-zinc-800" />

              {/* Theme indicator */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                      <span className="text-xs text-zinc-400 hidden sm:inline">Theme Active</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Current accent color</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Upgrade badge */}
              <Badge className="hidden sm:flex bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 cursor-pointer">
                <Sparkles className="w-3 h-3 mr-1" />
                Pro Plan
              </Badge>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
