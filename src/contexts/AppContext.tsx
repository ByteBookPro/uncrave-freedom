import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, JournalEntry, CravingLog } from '@/types/app';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  cravingLogs: CravingLog[];
  addCravingLog: (log: Omit<CravingLog, 'id'>) => void;
  completeDay: (day: number) => void;
  currentView: 'onboarding' | 'dashboard' | 'program' | 'session' | 'craving';
  setCurrentView: (view: 'onboarding' | 'dashboard' | 'program' | 'session' | 'craving') => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  isHydrating: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LS_JOURNAL = 'uncrave_journal';
const LS_CRAVINGS = 'uncrave_cravings';

export function AppProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();

  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem(LS_JOURNAL);
    return saved ? JSON.parse(saved) : [];
  });
  const [cravingLogs, setCravingLogs] = useState<CravingLog[]>(() => {
    const saved = localStorage.getItem(LS_CRAVINGS);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard' | 'program' | 'session' | 'craving'>('onboarding');
  const [selectedDay, setSelectedDay] = useState(1);

  // Hydrate from Supabase whenever the authenticated user changes
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (!authUser) {
        setUserState(null);
        setIsOnboarded(false);
        setIsHydrating(false);
        setCurrentView('onboarding');
        return;
      }

      setIsHydrating(true);
      try {
        const [{ data: profile }, { data: completions }] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', authUser.id).maybeSingle(),
          supabase
            .from('user_day_completions')
            .select('day_id, course_days!inner(day_number)')
            .eq('user_id', authUser.id),
        ]);

        if (cancelled) return;

        const completedDays: number[] = (completions ?? [])
          .map((c: any) => c?.course_days?.day_number)
          .filter((n: any) => typeof n === 'number');

        const onboarded = !!profile?.onboarded;
        const profileObj: UserProfile = {
          id: authUser.id,
          name: profile?.display_name ?? authUser.email?.split('@')[0] ?? '',
          cigarettesPerDay: profile?.cigarettes_per_day ?? 0,
          yearsOfSmoking: profile?.years_smoking ?? 0,
          pricePerPack: Number(profile?.price_per_pack ?? 0),
          cigarettesPerPack: profile?.cigarettes_per_pack ?? 20,
          triggers: profile?.triggers ?? [],
          reasonsToQuit: profile?.reasons_to_quit ?? [],
          quitDate: profile?.quit_date ? new Date(profile.quit_date) : undefined,
          currentDay: profile?.current_day ?? 1,
          completedDays,
          createdAt: profile?.created_at ? new Date(profile.created_at) : new Date(),
        };

        setUserState(profileObj);
        setIsOnboarded(onboarded);
        setCurrentView(onboarded ? 'dashboard' : 'onboarding');
      } catch (err) {
        console.error('[AppContext] hydrate failed', err);
      } finally {
        if (!cancelled) setIsHydrating(false);
      }
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, [authUser?.id]);

  useEffect(() => {
    localStorage.setItem(LS_JOURNAL, JSON.stringify(journalEntries));
  }, [journalEntries]);
  useEffect(() => {
    localStorage.setItem(LS_CRAVINGS, JSON.stringify(cravingLogs));
  }, [cravingLogs]);

  // Write-through setUser: persists profile fields to Supabase
  const setUser = (next: UserProfile | null) => {
    setUserState(next);
    if (!next || !authUser) return;
    supabase
      .from('profiles')
      .update({
        display_name: next.name,
        cigarettes_per_day: next.cigarettesPerDay,
        years_smoking: next.yearsOfSmoking,
        price_per_pack: next.pricePerPack,
        cigarettes_per_pack: next.cigarettesPerPack,
        triggers: next.triggers,
        reasons_to_quit: next.reasonsToQuit,
        current_day: next.currentDay,
      })
      .eq('id', authUser.id)
      .then(({ error }) => {
        if (error) console.error('[AppContext] profile update failed', error);
      });
  };

  // Write-through onboarding flag
  const setIsOnboardedPersist = (value: boolean) => {
    setIsOnboarded(value);
    if (authUser) {
      supabase
        .from('profiles')
        .update({ onboarded: value })
        .eq('id', authUser.id)
        .then(({ error }) => {
          if (error) console.error('[AppContext] onboarded flag update failed', error);
        });
    }
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    setJournalEntries(prev => [...prev, { ...entry, id: Date.now().toString() }]);
  };

  const addCravingLog = (log: Omit<CravingLog, 'id'>) => {
    setCravingLogs(prev => [...prev, { ...log, id: Date.now().toString() }]);
  };

  const completeDay = (day: number) => {
    if (!user || !authUser) return;
    const nextCompleted = Array.from(new Set([...user.completedDays, day]));
    const nextCurrent = Math.max(user.currentDay, day + 1);
    const updated: UserProfile = { ...user, completedDays: nextCompleted, currentDay: nextCurrent };
    setUserState(updated);

    // Persist to server: bump current_day on profile + insert completion row
    (async () => {
      try {
        const { data: dayRow } = await supabase
          .from('course_days')
          .select('id')
          .eq('day_number', day)
          .maybeSingle();

        await supabase
          .from('profiles')
          .update({ current_day: nextCurrent })
          .eq('id', authUser.id);

        if (dayRow?.id) {
          await supabase
            .from('user_day_completions')
            .upsert(
              { user_id: authUser.id, day_id: dayRow.id },
              { onConflict: 'user_id,day_id', ignoreDuplicates: true }
            );
        }
      } catch (err) {
        console.error('[AppContext] completeDay persist failed', err);
      }
    })();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isOnboarded,
        setIsOnboarded: setIsOnboardedPersist,
        journalEntries,
        addJournalEntry,
        cravingLogs,
        addCravingLog,
        completeDay,
        currentView,
        setCurrentView,
        selectedDay,
        setSelectedDay,
        isHydrating,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
