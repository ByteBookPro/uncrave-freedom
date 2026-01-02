import React from 'react';
import { Calendar, Dumbbell, TrendingUp, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabType = 'today' | 'practice' | 'progress' | 'support';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'today' as TabType, label: 'Today', icon: Calendar },
  { id: 'practice' as TabType, label: 'Practice', icon: Dumbbell },
  { id: 'progress' as TabType, label: 'Progress', icon: TrendingUp },
  { id: 'support' as TabType, label: 'Support', icon: Heart },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-200",
                isActive && "gradient-hero shadow-button"
              )}>
                <Icon 
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive && "text-primary-foreground"
                  )} 
                />
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
