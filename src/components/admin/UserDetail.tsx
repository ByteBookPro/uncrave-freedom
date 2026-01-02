import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Clock, 
  Target,
  Flame,
  Activity,
  Loader2
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface UserDetailProps {
  userId: string;
  onBack: () => void;
}

export function UserDetail({ userId, onBack }: UserDetailProps) {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['admin-user-profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: dayCompletions } = useQuery({
    queryKey: ['admin-user-completions', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_day_completions')
        .select('*, course_days(day_number, title)')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: practiceLogs } = useQuery({
    queryKey: ['admin-user-practices', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_practice_logs')
        .select('*, practices(title, practice_type)')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: cravingLogs } = useQuery({
    queryKey: ['admin-user-cravings', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('craving_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    },
  });

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const daysCompleted = dayCompletions?.length || 0;
  const courseProgress = (daysCompleted / 10) * 100;
  const avgCravingIntensity = cravingLogs?.length 
    ? (cravingLogs.reduce((sum, c) => sum + c.intensity, 0) / cravingLogs.length).toFixed(1)
    : 'N/A';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{profile?.display_name || 'Anonymous User'}</h2>
          <p className="text-sm text-muted-foreground">User ID: {userId.slice(0, 8)}...</p>
        </div>
        <Badge variant={profile?.subscription_status === 'active' ? 'default' : 'secondary'}>
          {profile?.subscription_status || 'free'}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{daysCompleted}</p>
                <p className="text-xs text-muted-foreground">Days Done</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{practiceLogs?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Practices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{cravingLogs?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Cravings Logged</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgCravingIntensity}</p>
                <p className="text-xs text-muted-foreground">Avg Intensity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={courseProgress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {daysCompleted} of 10 days completed ({courseProgress.toFixed(0)}%)
          </p>
        </CardContent>
      </Card>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Language</span>
            <span className="font-medium">{profile?.language?.toUpperCase() || 'EN'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quit Date</span>
            <span className="font-medium">
              {profile?.quit_date ? format(new Date(profile.quit_date), 'MMM d, yyyy') : 'Not set'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cigarettes/Day</span>
            <span className="font-medium">{profile?.cigarettes_per_day || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Years Smoking</span>
            <span className="font-medium">{profile?.years_smoking || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Joined</span>
            <span className="font-medium">
              {format(new Date(profile?.created_at || new Date()), 'MMM d, yyyy')}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Day Completions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Completed Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dayCompletions?.length === 0 ? (
            <p className="text-sm text-muted-foreground">No days completed yet</p>
          ) : (
            <div className="space-y-2">
              {dayCompletions?.map((completion) => (
                <div key={completion.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">
                      Day {(completion.course_days as { day_number: number })?.day_number || '?'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(completion.total_duration_seconds / 60)} minutes
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(completion.completed_at), { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Cravings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Flame className="w-4 h-4" />
            Recent Cravings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cravingLogs?.length === 0 ? (
            <p className="text-sm text-muted-foreground">No cravings logged</p>
          ) : (
            <div className="space-y-2">
              {cravingLogs?.slice(0, 10).map((craving) => (
                <div key={craving.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      craving.intensity >= 7 ? 'bg-destructive/20 text-destructive' :
                      craving.intensity >= 4 ? 'bg-amber-500/20 text-amber-600' :
                      'bg-success/20 text-success'
                    }`}>
                      {craving.intensity}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {craving.trigger_tag || 'No trigger'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {craving.overcame ? '✓ Overcame' : '✗ Gave in'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(craving.created_at), { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}