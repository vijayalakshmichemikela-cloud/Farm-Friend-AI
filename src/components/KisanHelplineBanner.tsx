import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { PhoneCall, ShieldAlert, Clock } from 'lucide-react';

interface HelplineProps {
  lang: Language;
}

export const KisanHelplineBanner: React.FC<HelplineProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-4 sm:p-5 shadow-sm my-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6 text-white animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
              <span>{t.helplineTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5 inline" />
              <span>{t.helplineSubtitle}</span>
            </p>
          </div>
        </div>

        <a
          href="tel:18001801551"
          className="self-stretch sm:self-auto text-center px-5 py-2.5 bg-white text-amber-900 hover:bg-amber-50 font-bold text-sm rounded-xl shadow transition"
        >
          {lang === 'te' ? 'ఇప్పుడే కాల్ చేయండి (ఉచితం)' : 'Call Now (Toll Free)'}
        </a>
      </div>
    </div>
  );
};
