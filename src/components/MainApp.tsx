import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Settings } from 'lucide-react';
import { TabNavigation, TabType } from './layout/TabNavigation';
import { TodayTab } from './tabs/TodayTab';
import { PracticeTab } from './tabs/PracticeTab';
import { ProgressTab } from './tabs/ProgressTab';
import { SupportTab } from './tabs/SupportTab';
import { DaySessionPlayer } from './session/DaySessionPlayer';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { daySessions } from '@/data/sessionModules';

export function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const { isAdmin } = useAuth();
  const { currentView, setCurrentView, selectedDay, completeDay } = useApp();

  // If in session view, show the full session experience
  if (currentView === 'session') {
    const session = daySessions.find(s => s.dayNumber === selectedDay);
    
    // If session not found or no modules, safely redirect to dashboard
    if (!session || !session.modules || session.modules.length === 0) {
      // Use setTimeout to avoid state update during render
      setTimeout(() => setCurrentView('dashboard'), 0);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      );
    }
    
    return (
      <DaySessionPlayer
        dayNumber={session.dayNumber}
        dayTitle={session.title}
        modules={session.modules}
        onComplete={() => completeDay(selectedDay)}
        onClose={() => setCurrentView('dashboard')}
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayTab />;
      case 'practice':
        return <PracticeTab />;
      case 'progress':
        return <ProgressTab />;
      case 'support':
        return <SupportTab />;
      default:
        return <TodayTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto min-h-screen relative">
        {/* Top bar with settings and admin links */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <Link 
            to="/settings" 
            className="flex items-center justify-center w-10 h-10 bg-muted text-muted-foreground rounded-full shadow-lg hover:bg-muted/80 transition-colors"
          >
            <Settings className="h-5 w-5" />
          </Link>
          {isAdmin && (
            <Link 
              to="/admin" 
              className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
        </div>

        {/* Tab content */}
        <main className="pb-20">
          {renderTabContent()}
        </main>

        {/* Bottom navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
