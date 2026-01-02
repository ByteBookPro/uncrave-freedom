import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Target, 
  Activity,
  Flame,
  TrendingUp,
  Calendar,
  Loader2
} from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';

export function AdminStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get active users (updated in last 7 days)
      const sevenDaysAgo = subDays(new Date(), 7).toISOString();
      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('updated_at', sevenDaysAgo);

      // Get total completions
      const { count: totalCompletions } = await supabase
        .from('user_day_completions')
        .select('*', { count: 'exact', head: true });

      // Get total practice sessions
      const { count: totalPractices } = await supabase
        .from('user_practice_logs')
        .select('*', { count: 'exact', head: true });

      // Get total cravings logged
      const { count: totalCravings } = await supabase
        .from('craving_logs')
        .select('*', { count: 'exact', head: true });

      // Get cravings overcome
      const { count: cravingsOvercome } = await supabase
        .from('craving_logs')
        .select('*', { count: 'exact', head: true })
        .eq('overcame', true);

      // Get subscribers
      const { count: subscribers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('subscription_status', 'active');

      return {
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        totalCompletions: totalCompletions || 0,
        totalPractices: totalPractices || 0,
        totalCravings: totalCravings || 0,
        cravingsOvercome: cravingsOvercome || 0,
        subscribers: subscribers || 0,
      };
    },
  });

  const { data: dailySignups } = useQuery({
    queryKey: ['admin-daily-signups'],
    queryFn: async () => {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = startOfDay(subDays(new Date(), i));
        const nextDate = startOfDay(subDays(new Date(), i - 1));
        
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', date.toISOString())
          .lt('created_at', nextDate.toISOString());
        
        days.push({
          date: format(date, 'EEE'),
          count: count || 0,
        });
      }
      return days;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const overcomePct = stats?.totalCravings 
    ? Math.round((stats.cravingsOvercome / stats.totalCravings) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold">{stats?.totalUsers}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <p className="text-3xl font-bold">{stats?.activeUsers}</p>
              <p className="text-sm text-muted-foreground">Active (7d)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-accent-foreground" />
              </div>
              <p className="text-3xl font-bold">{stats?.totalCompletions}</p>
              <p className="text-sm text-muted-foreground">Days Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold">{stats?.totalPractices}</p>
              <p className="text-sm text-muted-foreground">Practices Done</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Craving Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Logged</span>
              <span className="text-2xl font-bold">{stats?.totalCravings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Overcome</span>
              <span className="text-2xl font-bold text-success">{stats?.cravingsOvercome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Success Rate</span>
              <span className="text-2xl font-bold">{overcomePct}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Signups (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-24 gap-1">
              {dailySignups?.map((day, i) => {
                const maxCount = Math.max(...(dailySignups?.map(d => d.count) || [1]), 1);
                const height = day.count > 0 ? Math.max((day.count / maxCount) * 100, 10) : 4;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-primary/80 rounded-t transition-all"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{day.date}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Subscription Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{stats?.subscribers}</p>
              <p className="text-sm text-muted-foreground">Active Subscribers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {stats?.totalUsers ? (((stats?.totalUsers - stats?.subscribers) / stats?.totalUsers) * 100).toFixed(0) : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Free Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {stats?.totalUsers && stats?.subscribers ? ((stats?.subscribers / stats?.totalUsers) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}