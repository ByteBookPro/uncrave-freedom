import React from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { Onboarding } from '@/components/Onboarding';
import { Dashboard } from '@/components/Dashboard';
import { ProgramView } from '@/components/ProgramView';
import { DaySession } from '@/components/DaySession';
import { CravingTool } from '@/components/CravingTool';

function AppContent() {
  const { currentView, isOnboarded } = useApp();

  if (!isOnboarded || currentView === 'onboarding') {
    return <Onboarding />;
  }

  switch (currentView) {
    case 'dashboard':
      return <Dashboard />;
    case 'program':
      return <ProgramView />;
    case 'session':
      return <DaySession />;
    case 'craving':
      return <CravingTool />;
    default:
      return <Dashboard />;
  }
}

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen max-w-md mx-auto bg-background relative overflow-hidden shadow-2xl">
        <AppContent />
      </div>
    </AppProvider>
  );
};

export default Index;
