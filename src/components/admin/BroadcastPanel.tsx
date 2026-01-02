import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Send, MessageSquare, Loader2, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { z } from 'zod';

const broadcastSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(100, 'Title too long'),
  body: z.string().trim().min(1, 'Message is required').max(1000, 'Message too long'),
});

export function BroadcastPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const { data: broadcasts, isLoading } = useQuery({
    queryKey: ['admin-broadcasts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('broadcasts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    },
  });

  const sendMutation = useMutation({
    mutationFn: async (broadcast: { title: string; body: string }) => {
      const { error } = await supabase
        .from('broadcasts')
        .insert({
          title: broadcast.title,
          body: broadcast.body,
          sent_at: new Date().toISOString(),
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-broadcasts'] });
      setTitle('');
      setBody('');
      toast({
        title: 'Broadcast sent!',
        description: 'Your message has been sent to all users.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to send',
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = broadcastSchema.safeParse({ title, body });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'title') fieldErrors.title = err.message;
        if (err.path[0] === 'body') fieldErrors.body = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    sendMutation.mutate({ title, body });
  };

  return (
    <div className="space-y-6">
      {/* Send Broadcast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Broadcast
          </CardTitle>
          <CardDescription>
            Send a message to all users in the app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Announcement title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={sendMutation.isPending}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                placeholder="Write your message here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                disabled={sendMutation.isPending}
              />
              {errors.body && (
                <p className="text-sm text-destructive">{errors.body}</p>
              )}
              <p className="text-xs text-muted-foreground text-right">
                {body.length}/1000
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={sendMutation.isPending}
            >
              {sendMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Broadcast
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Previous Broadcasts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Previous Broadcasts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : broadcasts?.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No broadcasts sent yet
            </p>
          ) : (
            <div className="space-y-4">
              {broadcasts?.map((broadcast) => (
                <div 
                  key={broadcast.id} 
                  className="p-4 bg-muted/50 rounded-lg space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold">{broadcast.title}</h4>
                    <Badge variant="outline" className="flex-shrink-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(new Date(broadcast.created_at), { addSuffix: true })}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{broadcast.body}</p>
                  <p className="text-xs text-muted-foreground">
                    {broadcast.sent_at 
                      ? `Sent ${format(new Date(broadcast.sent_at), 'MMM d, yyyy h:mm a')}`
                      : 'Draft'
                    }
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}