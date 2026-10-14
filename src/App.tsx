import React, { useState, useEffect } from 'react';
import { Language, NavigationTab, WeatherData } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { KisanHelplineBanner } from './components/KisanHelplineBanner';
import { Dashboard } from './components/Dashboard';
import { WeatherWidget } from './components/WeatherWidget';
import { PlantDoctor } from './components/PlantDoctor';
import { CropAdvisor } from './components/CropAdvisor';
import { SmartWatering } from './components/SmartWatering';
import { FarmingChatbot } from './components/FarmingChatbot';
import { FertilizerGuide } from './components/FertilizerGuide';
import { FarmingCalendar } from './components/FarmingCalendar';
import { CostCalculator } from './components/CostCalculator';
import { fetchLiveWeather, AGRICULTURAL_DISTRICTS } from './services/weatherApi';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('farm_friend_lang');
    return (saved === 'te' || saved === 'en') ? saved : 'te'; // Default to Telugu for local farmers
  });

  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Save language preference
  const handleToggleLanguage = () => {
    const nextLang: Language = lang === 'en' ? 'te' : 'en';
    setLang(nextLang);
    localStorage.setItem('farm_friend_lang', nextLang);
  };

  // Pre-load initial weather for default district (Guntur, AP)
  useEffect(() => {
    const defaultDistrict = AGRICULTURAL_DISTRICTS[0];
    fetchLiveWeather(
      defaultDistrict.lat, 
      defaultDistrict.lon, 
      `${defaultDistrict.name}, ${defaultDistrict.state}`,
      `${defaultDistrict.nameTe}, ${defaultDistrict.stateTe}`
    )
      .then((data) => setWeatherData(data))
      .catch((err) => console.warn('Initial weather prefetch:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Header */}
      <Header lang={lang} onToggleLanguage={handleToggleLanguage} />

      {/* Navigation bar with all 9 tabs */}
      <Navigation 
        currentTab={currentTab} 
        onSelectTab={setCurrentTab} 
        lang={lang} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Kisan Call Center Helpline Banner */}
        <KisanHelplineBanner lang={lang} />

        {/* Tab Content */}
        {currentTab === 'dashboard' && (
          <Dashboard 
            lang={lang} 
            onNavigate={setCurrentTab} 
            weatherData={weatherData} 
          />
        )}

        {currentTab === 'weather' && (
          <WeatherWidget 
            lang={lang} 
            onWeatherLoaded={setWeatherData} 
          />
        )}

        {currentTab === 'plant-doctor' && (
          <PlantDoctor lang={lang} />
        )}

        {currentTab === 'crop-advisor' && (
          <CropAdvisor lang={lang} />
        )}

        {currentTab === 'smart-watering' && (
          <SmartWatering 
            lang={lang} 
            weatherData={weatherData} 
          />
        )}

        {currentTab === 'chatbot' && (
          <FarmingChatbot lang={lang} />
        )}

        {currentTab === 'fertilizer' && (
          <FertilizerGuide lang={lang} />
        )}

        {currentTab === 'calendar' && (
          <FarmingCalendar lang={lang} />
        )}

        {currentTab === 'cost-calculator' && (
          <CostCalculator lang={lang} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-farm-200 mt-12 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-2">
          <p className="font-semibold text-slate-700">
            {lang === 'te' 
              ? 'రైతు మిత్ర AI (Farm Friend AI) • భారతీయ రైతుల కోసం ఉచిత వ్యవసాయ వేదిక' 
              : 'Farm Friend AI • Free, Open Agricultural Decision Support Platform for Indian Farmers'}
          </p>
          <p>
            {lang === 'te'
              ? 'వాతావరణ సమాచారం: Open-Meteo API (ఉచితం) • అత్యవసర వ్యవసాయ సలహాలకు: 1800-180-1551'
              : 'Weather data powered by Open-Meteo (Free, No API key) • Emergency Farmer Helpline: 1800-180-1551'}
          </p>
          <p className="text-[11px] text-slate-400">
            Built with React, TypeScript, Vite & Tailwind CSS. Works on smartphones, tablets & desktop.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
