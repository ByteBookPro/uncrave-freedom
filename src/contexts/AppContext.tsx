import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, JournalEntry, CravingLog } from '@/types/app';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('uncrave_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('uncrave_onboarded') === 'true';
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('uncrave_journal');
    return saved ? JSON.parse(saved) : [];
  });

  const [cravingLogs, setCravingLogs] = useState<CravingLog[]>(() => {
    const saved = localStorage.getItem('uncrave_cravings');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard' | 'program' | 'session' | 'craving'>(
    isOnboarded ? 'dashboard' : 'onboarding'
  );

  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    if (user) {
      localStorage.setItem('uncrave_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('uncrave_onboarded', isOnboarded.toString());
  }, [isOnboarded]);

  useEffect(() => {
    localStorage.setItem('uncrave_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('uncrave_cravings', JSON.stringify(cravingLogs));
  }, [cravingLogs]);

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setJournalEntries(prev => [...prev, newEntry]);
  };

  const addCravingLog = (log: Omit<CravingLog, 'id'>) => {
    const newLog: CravingLog = {
      ...log,
      id: Date.now().toString(),
    };
    setCravingLogs(prev => [...prev, newLog]);
  };

  const completeDay = (day: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        completedDays: [...new Set([...user.completedDays, day])],
        currentDay: Math.max(user.currentDay, day + 1),
      };
      setUser(updatedUser);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isOnboarded,
        setIsOnboarded,
        journalEntries,
        addJournalEntry,
        cravingLogs,
        addCravingLog,
        completeDay,
        currentView,
        setCurrentView,
        selectedDay,
        setSelectedDay,
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
