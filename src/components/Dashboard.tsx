import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { programDays, healthMilestones } from '@/data/programContent';
import { 
  Play, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Heart,
  Sparkles,
  AlertCircle,
  ChevronRight,
  Flame
} from 'lucide-react';

export function Dashboard() {
  const { user, setCurrentView, setSelectedDay } = useApp();

  if (!user) return null;

  const completionPercentage = (user.completedDays.length / 10) * 100;
  const currentDayContent = programDays[user.currentDay - 1];

  // Calculate stats (simulated for now - in real app would track actual quit date)
  const daysSmokesFree = Math.max(0, user.currentDay - 6);
  const cigarettesAvoided = daysSmokesFree * user.cigarettesPerDay;
  const moneySaved = (cigarettesAvoided / user.cigarettesPerPack) * user.pricePerPack;
  const hoursRegained = cigarettesAvoided * 11; // 11 minutes per cigarette

  const handleStartDay = () => {
    setSelectedDay(user.currentDay);
    setCurrentView('session');
  };

  const handleViewProgram = () => {
    setCurrentView('program');
  };

  const handleCravingHelp = () => {
    setCurrentView('craving');
  };

  return (
    <div className="min-h-screen gradient-dawn pb-24">
      {/* Header */}
      <div className="gradient-hero text-primary-foreground p-6 pb-16 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold font-display">{user.name}</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl">🌟</span>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-primary-foreground/80">Your Progress</span>
            <span className="text-sm font-semibold">{Math.round(completionPercentage)}% Complete</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-primary-foreground/90">
            {user.completedDays.length === 0 
              ? "Ready to begin your journey to freedom!"
              : user.currentDay <= 6 
              ? `${10 - user.currentDay} days until your quit day`
              : daysSmokesFree === 0 
              ? "Today is your quit day! 🎉"
              : `${daysSmokesFree} day${daysSmokesFree > 1 ? 's' : ''} smoke-free! 🎉`
            }
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-8">
        {/* Continue Today's Session */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl gradient-warmth flex items-center justify-center flex-shrink-0 shadow-button">
              <span className="text-2xl">📅</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Day {user.currentDay} of 10</p>
              <h3 className="text-lg font-bold font-display truncate">
                {currentDayContent?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {currentDayContent?.subtitle} • {currentDayContent?.duration}
              </p>
              <Button variant="hero" size="lg" onClick={handleStartDay} className="w-full">
                <Play className="w-4 h-4 mr-2" />
                {user.completedDays.includes(user.currentDay) ? 'Review Session' : 'Start Session'}
              </Button>
            </div>
          </div>
        </div>

        {/* Craving Help Button */}
        {user.currentDay >= 6 && (
          <Button 
            variant="coral" 
            size="lg" 
            onClick={handleCravingHelp}
            className="w-full mb-6 animate-pulse-soft"
          >
            <Flame className="w-5 h-5 mr-2" />
            Having a Craving? Get Instant Help
          </Button>
        )}

        {/* Stats Grid */}
        {daysSmokesFree > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-card rounded-2xl shadow-soft p-4 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold font-display">{daysSmokesFree}</p>
              <p className="text-sm text-muted-foreground">Days Smoke-Free</p>
            </div>

            <div className="bg-card rounded-2xl shadow-soft p-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-coral" />
              </div>
              <p className="text-2xl font-bold font-display">{cigarettesAvoided}</p>
              <p className="text-sm text-muted-foreground">Cigarettes Avoided</p>
            </div>

            <div className="bg-card rounded-2xl shadow-soft p-4 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-bold font-display">${moneySaved.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Money Saved</p>
            </div>

            <div className="bg-card rounded-2xl shadow-soft p-4 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-10 h-10 rounded-xl bg-freedom/10 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-freedom" />
              </div>
              <p className="text-2xl font-bold font-display">
                {hoursRegained >= 60 ? `${Math.floor(hoursRegained / 60)}h` : `${hoursRegained}m`}
              </p>
              <p className="text-sm text-muted-foreground">Life Regained</p>
            </div>
          </div>
        )}

        {/* Health Milestones */}
        {daysSmokesFree > 0 && (
          <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-display flex items-center gap-2">
                <Heart className="w-5 h-5 text-coral" />
                Health Milestones
              </h3>
            </div>
            <div className="space-y-3">
              {healthMilestones.slice(0, 4).map((milestone, index) => {
                const achieved = daysSmokesFree * 24 >= milestone.hoursToAchieve;
                return (
                  <div 
                    key={milestone.id}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      achieved ? 'bg-success/10' : 'bg-muted/50'
                    }`}
                  >
                    <span className={`text-2xl ${achieved ? '' : 'grayscale opacity-50'}`}>
                      {milestone.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${achieved ? 'text-success' : 'text-muted-foreground'}`}>
                        {milestone.time}
                      </p>
                      <p className="text-sm text-foreground truncate">{milestone.title}</p>
                    </div>
                    {achieved && (
                      <Sparkles className="w-5 h-5 text-success" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View Full Program */}
        <button 
          onClick={handleViewProgram}
          className="w-full bg-card rounded-2xl shadow-soft p-5 flex items-center justify-between hover:shadow-card transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-bold">View Full Program</h3>
              <p className="text-sm text-muted-foreground">See all 10 days</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4 flex items-center justify-around">
        <button 
          onClick={() => setCurrentView('dashboard')}
          className="flex flex-col items-center gap-1 text-primary"
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs font-medium">Progress</span>
        </button>
        <button 
          onClick={handleViewProgram}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs font-medium">Program</span>
        </button>
        <button 
          onClick={handleCravingHelp}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-coral transition-colors"
        >
          <Flame className="w-6 h-6" />
          <span className="text-xs font-medium">Craving</span>
        </button>
      </nav>
    </div>
  );
}
