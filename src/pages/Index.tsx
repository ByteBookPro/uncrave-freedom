import React from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { Onboarding } from '@/components/Onboarding';
import { MainApp } from '@/components/MainApp';

function AppContent() {
  const { isOnboarded, currentView } = useApp();

  if (!isOnboarded || currentView === 'onboarding') {
    return <Onboarding />;
  }

  return <MainApp />;
}

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
