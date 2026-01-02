import React, { useState } from 'react';
import { TabNavigation, TabType } from './layout/TabNavigation';
import { TodayTab } from './tabs/TodayTab';
import { PracticeTab } from './tabs/PracticeTab';
import { ProgressTab } from './tabs/ProgressTab';
import { SupportTab } from './tabs/SupportTab';
import { DaySessionPlayer } from './session/DaySessionPlayer';
import { useApp } from '@/contexts/AppContext';
import { daySessions } from '@/data/sessionModules';

export function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const { currentView, setCurrentView, selectedDay, completeDay } = useApp();

  // If in session view, show the full session experience
  if (currentView === 'session') {
    const session = daySessions.find(s => s.dayNumber === selectedDay);
    if (!session) {
      setCurrentView('dashboard');
      return null;
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
