import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserDetail } from './UserDetail';
import { Search, User, ChevronRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface UserProfile {
  id: string;
  display_name: string | null;
  language: string;
  subscription_status: string | null;
  quit_date: string | null;
  created_at: string;
  updated_at: string;
}

export function UsersList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as UserProfile[];
    },
  });

  const { data: completions } = useQuery({
    queryKey: ['admin-completions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_day_completions')
        .select('user_id, day_id');
      
      if (error) throw error;
      
      // Group completions by user
      const byUser: Record<string, number> = {};
      data?.forEach(c => {
        byUser[c.user_id] = (byUser[c.user_id] || 0) + 1;
      });
      return byUser;
    },
  });

  const filteredUsers = users?.filter(user => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.display_name?.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query)
    );
  });

  if (selectedUserId) {
    return (
      <UserDetail 
        userId={selectedUserId} 
        onBack={() => setSelectedUserId(null)} 
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            All Users ({users?.length || 0})
          </CardTitle>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filteredUsers?.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No users found</p>
        ) : (
          <div className="space-y-2">
            {filteredUsers?.map((user) => (
              <Button
                key={user.id}
                variant="ghost"
                className="w-full justify-start h-auto py-3 px-4"
                onClick={() => setSelectedUserId(user.id)}
              >
                <div className="flex items-center w-full gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium truncate">
                      {user.display_name || 'Anonymous User'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined {format(new Date(user.created_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={user.subscription_status === 'active' ? 'default' : 'secondary'}>
                      {user.subscription_status || 'free'}
                    </Badge>
                    <Badge variant="outline">
                      Day {completions?.[user.id] || 0}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}