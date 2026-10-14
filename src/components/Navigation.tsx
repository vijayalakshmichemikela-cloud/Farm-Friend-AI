import React from 'react';
import { NavigationTab, Language } from '../types';
import { translations } from '../translations';
import { 
  LayoutDashboard, 
  CloudSun, 
  Stethoscope, 
  Compass, 
  Droplets, 
  MessageSquare, 
  FlaskConical, 
  CalendarDays, 
  Calculator 
} from 'lucide-react';

interface NavigationProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  lang: Language;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab, lang }) => {
  const t = translations[lang];

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'weather', label: t.nav.weather, icon: <CloudSun className="w-5 h-5" /> },
    { id: 'plant-doctor', label: t.nav.plantDoctor, icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'crop-advisor', label: t.nav.cropAdvisor, icon: <Compass className="w-5 h-5" /> },
    { id: 'smart-watering', label: t.nav.smartWatering, icon: <Droplets className="w-5 h-5" /> },
    { id: 'chatbot', label: t.nav.chatbot, icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'fertilizer', label: t.nav.fertilizer, icon: <FlaskConical className="w-5 h-5" /> },
    { id: 'calendar', label: t.nav.calendar, icon: <CalendarDays className="w-5 h-5" /> },
    { id: 'cost-calculator', label: t.nav.costCalculator, icon: <Calculator className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white border-b border-farm-200 sticky top-16 sm:top-20 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none no-scrollbar">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-farm-600 text-white shadow-sm shadow-farm-600/30'
                    : 'text-slate-600 hover:text-farm-800 hover:bg-farm-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
