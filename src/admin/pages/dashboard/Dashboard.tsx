/**
 * Dashboard - Main Administrative Dashboard
 * 
 * The central hub of the admin panel providing:
 * - Key performance indicators (KPIs)
 * - Quick access to main sections
 * - Recent activity feed
 * - Visual overview of business metrics
 * - Quick actions
 */

import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PageHeader from '../../components/PageHeader';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  FileText, 
  Palette, 
  TrendingUp,
  DollarSign,
  Briefcase,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap
} from 'lucide-react';

// =============================================================================
// MOCK DATA - Replace with real data when backend is connected
// =============================================================================

const recentActivity = [
  { id: 1, type: 'quote', title: 'New quote request received', description: 'Evento Corporativo ACME - $12,500', time: '5 minutes ago', status: 'new' },
  { id: 2, type: 'lead', title: 'Lead status updated', description: 'Maria Gonzalez moved to "Contacted"', time: '1 hour ago', status: 'updated' },
  { id: 3, type: 'content', title: 'Blog post published', description: '"Top 10 Event Trends 2024" is now live', time: '3 hours ago', status: 'completed' },
  { id: 4, type: 'contract', title: 'Contract signed', description: 'Festival Musical 2024 - $45,000', time: 'Yesterday', status: 'completed' },
  { id: 5, type: 'theme', title: 'Theme color changed', description: 'Accent color updated to Deep Blue', time: '2 days ago', status: 'updated' },
];

const quickActions = [
  { label: 'New Quote', icon: DollarSign, to: '/admin/crm/quotes', color: 'bg-emerald-500/10 text-emerald-400' },
  { label: 'Add Lead', icon: Users, to: '/admin/crm/leads', color: 'bg-blue-500/10 text-blue-400' },
  { label: 'New Post', icon: FileText, to: '/admin/content/blog', color: 'bg-purple-500/10 text-purple-400' },
  { label: 'Customize Theme', icon: Palette, to: '/admin/settings/theme', color: 'bg-[var(--accent)]/10 text-[var(--accent)]' },
];

const upcomingTasks = [
  { id: 1, title: 'Follow up with Carlos Martinez', due: 'Today', priority: 'high' },
  { id: 2, title: 'Send quote to TechCorp', due: 'Tomorrow', priority: 'medium' },
  { id: 3, title: 'Review contract for Festival 2024', due: 'In 3 days', priority: 'high' },
];

// =============================================================================
// MAIN DASHBOARD COMPONENT
// =============================================================================

export default function Dashboard() {
  return (
    <div>
      <PageHeader 
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your business."
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Leads"
          value="48"
          description="12 new this month"
          icon={Users}
          trend={{ value: 23, label: 'vs last month', direction: 'up' }}
        />
        <StatsCard
          title="Active Quotes"
          value="15"
          description="$245,000 total value"
          icon={DollarSign}
          trend={{ value: 8, label: 'vs last month', direction: 'up' }}
          variant="accent"
        />
        <StatsCard
          title="Contracts"
          value="8"
          description="3 pending signature"
          icon={Briefcase}
          trend={{ value: 2, label: 'vs last month', direction: 'down' }}
        />
        <StatsCard
          title="Conversion Rate"
          value="32%"
          description="Industry avg: 25%"
          icon={TrendingUp}
          trend={{ value: 5, label: 'vs last month', direction: 'up' }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions */}
          <Card className="border-zinc-800/50 bg-zinc-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--accent)]" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.to}>
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 group"
                    >
                      <div className={action.color}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-zinc-400 group-hover:text-zinc-200">
                        {action.label}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-zinc-800/50 bg-zinc-900/20">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-medium text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--accent)]" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates from your team</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[var(--accent)] hover:text-[var(--accent-light)]">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex items-start gap-4">
                      {/* Activity Icon */}
                      <div className={cn(
                        'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                        activity.status === 'new' && 'bg-emerald-500/10 text-emerald-400',
                        activity.status === 'updated' && 'bg-amber-500/10 text-amber-400',
                        activity.status === 'completed' && 'bg-blue-500/10 text-blue-400'
                      )}>
                        {activity.type === 'quote' && <DollarSign className="w-4 h-4" />}
                        {activity.type === 'lead' && <Users className="w-4 h-4" />}
                        {activity.type === 'content' && <FileText className="w-4 h-4" />}
                        {activity.type === 'contract' && <Briefcase className="w-4 h-4" />}
                        {activity.type === 'theme' && <Palette className="w-4 h-4" />}
                      </div>
                      
                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">
                            {activity.title}
                          </p>
                          {activity.status === 'new' && (
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 text-[10px]">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-zinc-500 mt-0.5">
                          {activity.description}
                        </p>
                        <p className="text-xs text-zinc-600 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    {index < recentActivity.length - 1 && (
                      <Separator className="mt-4 bg-zinc-800/50" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          
          {/* System Status */}
          <Card className="border-zinc-800/50 bg-zinc-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Website</span>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Admin Panel</span>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Theme System</span>
                <Badge variant="secondary" className="bg-[var(--accent)]/10 text-[var(--accent)]">
                  Active
                </Badge>
              </div>
              <Separator className="bg-zinc-800/50" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Last updated</span>
                <span className="text-zinc-400">Just now</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-zinc-800/50 bg-zinc-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors"
                  >
                    <div className={cn(
                      'w-2 h-2 rounded-full mt-1.5',
                      task.priority === 'high' ? 'bg-rose-400' : 'bg-amber-400'
                    )} />
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300">{task.title}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{task.due}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3 text-zinc-500 hover:text-zinc-300">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </CardContent>
          </Card>

          {/* Pro Tip Card */}
          <Card className="border-[var(--accent)]/20 bg-[var(--accent)]/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    Pro Tip
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Use the Theme Settings to customize your brand colors. 
                    Changes apply instantly across your entire website.
                  </p>
                  <Link to="/admin/settings/theme">
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-[var(--accent)] hover:text-[var(--accent-light)] p-0 h-auto mt-2"
                    >
                      Customize Theme →
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

