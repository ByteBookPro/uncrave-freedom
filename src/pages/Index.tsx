import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Onboarding } from '@/components/Onboarding';
import { MainApp } from '@/components/MainApp';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { isOnboarded, currentView, isHydrating } = useApp();

  if (isHydrating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isOnboarded || currentView === 'onboarding') {
    return <Onboarding />;
  }

  return <MainApp />;
}

const Index = () => {
  const { user, isLoading } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
