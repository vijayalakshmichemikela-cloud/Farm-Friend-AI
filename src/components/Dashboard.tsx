import React from 'react';
import { Language, NavigationTab, WeatherData } from '../types';
import { translations } from '../translations';
import { 
  CloudSun, 
  Stethoscope, 
  Compass, 
  Droplets, 
  FlaskConical, 
  CalendarDays, 
  Calculator, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface DashboardProps {
  lang: Language;
  onNavigate: (tab: NavigationTab) => void;
  weatherData: WeatherData | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ lang, onNavigate, weatherData }) => {
  const t = translations[lang];

  const quickFeatures = [
    {
      tab: 'plant-doctor' as NavigationTab,
      titleEn: 'Plant Doctor (సస్య రక్షణ)',
      titleTe: 'సస్య రక్షణ డాక్టర్',
      descEn: 'Upload leaf photo & check disease symptoms for organic & chemical remedies.',
      descTe: 'ఆకు ఫోటో తీసి రోగ లక్షణాలు, సేంద్రీయ మరియు రసాయన నివారణలు తెలుసుకోండి.',
      icon: <Stethoscope className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      tag: 'Preliminary AI',
    },
    {
      tab: 'smart-watering' as NavigationTab,
      titleEn: 'Smart Watering (తడులు)',
      titleTe: 'స్మార్ట్ తడుల సహాయకుడు',
      descEn: 'Check live rain forecast & crop stage to see if watering is needed today.',
      descTe: 'వర్ష సూచన మరియు పంట దశను బట్టి ఈ రోజు తడి ఇవ్వాలో వద్దో నిర్ణయించండి.',
      icon: <Droplets className="w-6 h-6 text-sky-600" />,
      color: 'bg-sky-50 text-sky-800 border-sky-200',
      tag: 'Save Water',
    },
    {
      tab: 'crop-advisor' as NavigationTab,
      titleEn: 'Crop Advisor (పంట సలహా)',
      titleTe: 'లాభదాయక పంటల సలహా',
      descEn: 'Find best crops for your soil, season, and irrigation with MSP benchmarks.',
      descTe: 'మీ నేల రకం, కాలం, నీటి వసతికి సరిపడే ఉత్తమ పంటల సిఫార్సులు.',
      icon: <Compass className="w-6 h-6 text-teal-600" />,
      color: 'bg-teal-50 text-teal-800 border-teal-200',
      tag: 'Best Yield',
    },
    {
      tab: 'fertilizer' as NavigationTab,
      titleEn: 'Fertilizer & Safety (ఎరువులు)',
      titleTe: 'ఎరువుల లెక్క & భద్రత',
      descEn: 'Calculate Urea, DAP & MOP bags needed with strict pesticide safety rules.',
      descTe: 'యూరియా, డీఏపీ, పొటాష్ బస్తాల లెక్క మరియు రసాయన వినియోగ నియమాలు.',
      icon: <FlaskConical className="w-6 h-6 text-amber-600" />,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      tag: 'Balanced NPK',
    },
    {
      tab: 'cost-calculator' as NavigationTab,
      titleEn: 'Cost & Profit Calculator',
      titleTe: 'ఖర్చులు - లాభనష్టాల లెక్కింపు',
      descEn: 'Track inputs, expected yield, mandi rates and estimated net profit.',
      descTe: 'ఎరువులు, విత్తనాలు, కూలి ఖర్చులు లెక్కించి నికర లాభాన్ని అంచనా వేయండి.',
      icon: <Calculator className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      tag: 'MSP Ready',
    },
    {
      tab: 'chatbot' as NavigationTab,
      titleEn: 'Rythu Mitra Chatbot',
      titleTe: 'రైతు మిత్ర AI చాట్',
      descEn: 'Ask questions on natural farming (Jeevamrutha), schemes & pests.',
      descTe: 'జీవామృతం తయారీ, పీఎం కిసాన్, తెగుళ్ళ నివారణపై తెలుగులో మాట్లాడండి.',
      icon: <MessageSquare className="w-6 h-6 text-farm-600" />,
      color: 'bg-farm-50 text-farm-800 border-farm-200',
      tag: 'Voice Ready',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-farm-700 via-farm-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur mb-3">
            {lang === 'te' ? 'రైతు నేస్తం • వ్యవసాయ సాంకేతికత' : 'Empowering Indian Farmers with Smart Technology'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {lang === 'te' 
              ? 'స్వాగతం అన్నదాతా! రైతు మిత్ర AI తో మీ సాగు సులభం.' 
              : 'Welcome, Farmer Brother! Smart Agriculture at Your Fingertips.'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-farm-100 leading-relaxed">
            {lang === 'te'
              ? 'లైవ్ వాతావరణం, పంట తెగుళ్ళ ప్రాథమిక నిర్ధారణ, స్మార్ట్ తడులు, మరియు ఖర్చు-లాభాల లెక్కింపులతో సురక్షితమైన వ్యవసాయం చేయండి.'
              : 'Accurate weather forecasts, symptom-based plant health guidance, smart irrigation schedules, and cultivation profit forecasting.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('plant-doctor')}
              className="px-5 py-2.5 rounded-xl bg-white text-farm-900 hover:bg-farm-50 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-farm-600" />
              <span>{lang === 'te' ? 'సస్య రక్షణ డాక్టర్' : 'Diagnose Plant Disease'}</span>
            </button>
            <button
              onClick={() => onNavigate('weather')}
              className="px-5 py-2.5 rounded-xl bg-farm-800/60 hover:bg-farm-800 text-white font-semibold text-xs sm:text-sm border border-farm-400/40 backdrop-blur transition flex items-center gap-2"
            >
              <CloudSun className="w-4 h-4" />
              <span>{lang === 'te' ? 'వాతావరణం చూడండి' : 'Check Live Weather'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Weather Quick Pill if available */}
      {weatherData && (
        <div className="bg-white rounded-2xl p-4 border border-farm-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">
              {weatherData.current.weatherCode >= 51 && weatherData.current.weatherCode <= 65 ? '🌧️' : '☀️'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">
                  {lang === 'te' ? weatherData.locationNameTe : weatherData.locationName}
                </span>
                <span className="text-xs bg-farm-100 text-farm-800 px-2 py-0.5 rounded-full font-bold">
                  {weatherData.current.temperature}°C
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {lang === 'te' ? weatherData.current.weatherDescriptionTe : weatherData.current.weatherDescription} • {t.weather.humidity}: {weatherData.current.relativeHumidity}% • {t.weather.windSpeed}: {weatherData.current.windSpeed} km/h
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('weather')}
            className="text-xs font-bold text-farm-700 hover:text-farm-900 flex items-center gap-1 self-end sm:self-auto"
          >
            <span>{lang === 'te' ? 'పూర్తి వాతావరణం' : 'Detailed Forecast'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Feature Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {quickFeatures.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate(item.tab)}
            className="group bg-white rounded-3xl p-5 sm:p-6 border border-farm-200 hover:border-farm-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-slate-100 text-slate-700">
                  {item.tag}
                </span>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mt-4 group-hover:text-farm-700 transition">
                {lang === 'te' ? item.titleTe : item.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                {lang === 'te' ? item.descTe : item.descEn}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-farm-700 group-hover:text-farm-800">
              <span>{lang === 'te' ? 'తెరవండి' : 'Open Feature'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
