import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Globe, PhoneCall, Sprout } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLanguage }) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-farm-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-farm-600 flex items-center justify-center text-white shadow-md shadow-farm-600/30">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-2xl font-bold text-farm-900 leading-tight tracking-tight">
                  {t.appTitle}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-farm-100 text-farm-800 rounded-full border border-farm-300">
                  India Agri 🇮🇳
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 hidden xs:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Action buttons: Helpline & Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Kisan Call Center quick action */}
            <a
              href="tel:18001801551"
              title="Call Kisan Call Center (1800-180-1551)"
              className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs sm:text-sm font-semibold transition"
            >
              <PhoneCall className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="hidden md:inline">1800-180-1551</span>
              <span className="inline md:hidden">KCC</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-farm-600 hover:bg-farm-700 active:scale-95 text-white font-medium text-xs sm:text-sm shadow-sm transition"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">
                {lang === 'en' ? 'తెలుగు' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
