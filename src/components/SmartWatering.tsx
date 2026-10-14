import React, { useState } from 'react';
import { Language, WeatherData, SoilType } from '../types';
import { translations } from '../translations';
import { CROPS_DATA } from '../data/cropData';
import { 
  Droplets, 
  CloudRain, 
  Sun, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  Sparkles 
} from 'lucide-react';

interface SmartWateringProps {
  lang: Language;
  weatherData: WeatherData | null;
}

export const SmartWatering: React.FC<SmartWateringProps> = ({ lang, weatherData }) => {
  const t = translations[lang];

  const [cropId, setCropId] = useState<string>('paddy');
  const [stage, setStage] = useState<'germination' | 'vegetative' | 'flowering' | 'fruiting' | 'maturity'>('flowering');
  const [soil, setSoil] = useState<SoilType>('black');
  const [daysSinceWatered, setDaysSinceWatered] = useState<number>(3);
  const [verdict, setVerdict] = useState<{
    status: 'no_water' | 'water_now' | 'delay';
    reasonEn: string;
    reasonTe: string;
    hoursDrip?: number;
  } | null>(null);

  // Check rain in weatherData
  const upcomingRainSum = weatherData?.daily?.slice(0, 2).reduce((acc, d) => acc + d.precipitationSum, 0) || 0;
  const maxRainChance = Math.max(...(weatherData?.daily?.slice(0, 2).map(d => d.precipitationProbability) || [0]));

  const handleCalculate = () => {
    // 1. If substantial rain is forecasted (> 4mm or > 50% chance)
    if (upcomingRainSum > 4 || maxRainChance > 50) {
      setVerdict({
        status: 'no_water',
        reasonEn: `Rain is expected in your area within 48 hours (${upcomingRainSum.toFixed(1)}mm forecast, ${maxRainChance}% probability). Delay watering to save electricity, diesel, and prevent root asphyxiation / damping-off.`,
        reasonTe: `రాబోయే 48 గంటల్లో మీ ప్రాంతంలో వర్షం కురిసే అవకాశం ఉంది (${upcomingRainSum.toFixed(1)} మి.మీ అంచనా, ${maxRainChance}% సంభావ్యత). వర్షాధారంగా నీరు అందుతుంది కాబట్టి బోరు/కాలువ తడిని ఆపివేయండి.`,
      });
      return;
    }

    // 2. Soil capacity: Black soil holds water 5-7 days; sandy holds 2-3 days; red holds 3-4 days
    let maxIntervalDays = 4;
    if (soil === 'black' || soil === 'clay') maxIntervalDays = 6;
    if (soil === 'sandy') maxIntervalDays = 2;
    if (soil === 'red' || soil === 'alluvial') maxIntervalDays = 4;

    // Critical flowering stage requires constant moisture without stress
    if (stage === 'flowering') {
      maxIntervalDays = Math.max(1, maxIntervalDays - 1);
    } else if (stage === 'maturity') {
      maxIntervalDays += 3; // cut off irrigation prior to harvest
    }

    if (daysSinceWatered >= maxIntervalDays) {
      setVerdict({
        status: 'water_now',
        reasonEn: `Field soil has exhausted readily available moisture after ${daysSinceWatered} days. The current stage (${stage}) is sensitive to water stress. Irrigate today.`,
        reasonTe: `గతంలో తడి ఇచ్చి ${daysSinceWatered} రోజులు కావడంతో నేలలో తేమ తగ్గింది. ప్రస్తుత పంట దశలో నీటి ఎద్దడి రాకుండా ఈ రోజే తడి అందించడం అవసరం.`,
        hoursDrip: cropId === 'paddy' ? 0 : (soil === 'sandy' ? 2 : 3.5),
      });
    } else {
      const remaining = maxIntervalDays - daysSinceWatered;
      setVerdict({
        status: 'delay',
        reasonEn: `Your ${soil} soil still retains sufficient moisture profile. You can safely postpone watering for another ${remaining} day(s).`,
        reasonTe: `మీ ${soil === 'black' ? 'నల్లరేగడి' : 'నేలలో'} ఇంకా తగినంత తేమ నిల్వ ఉంది. మరో ${remaining} రోజు(లు) తడిని నిరభ్యంతరంగా వాయిదా వేయవచ్చు.`,
      });
    }
  };

  const selectedCrop = CROPS_DATA.find(c => c.id === cropId) || CROPS_DATA[0];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-farm-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-farm-950 flex items-center gap-2">
            <Droplets className="w-6 h-6 text-sky-600" />
            <span>{t.smartWatering.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.smartWatering.subtitle}
          </p>
        </div>

        {/* Live Weather Insight Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center space-x-3 text-sky-900">
            <CloudRain className="w-5 h-5 text-sky-600 shrink-0" />
            <div>
              <span className="font-bold block">
                {lang === 'te' ? 'ప్రత్యక్ష వాతావరణ ఆధారిత నీటి అంచనా:' : 'Live Weather Rain Forecast Status:'}
              </span>
              <span className="text-sky-700">
                {upcomingRainSum > 2
                  ? (lang === 'te' 
                      ? `రాబోయే 48 గంటల్లో ${upcomingRainSum.toFixed(1)} మి.మీ వర్షం కురిసే అవకాశం ఉంది (${maxRainChance}%).` 
                      : `Rainfall of ${upcomingRainSum.toFixed(1)}mm anticipated in 48 hours (${maxRainChance}% chance).`)
                  : (lang === 'te' 
                      ? 'రాబోయే 48 గంటల్లో పెద్ద వర్షాలు లేవు. వాతావరణం పొడిగా ఉంది.' 
                      : 'No heavy rain expected in next 48 hours. Dry weather prevailing.')}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white rounded-lg font-bold text-sky-800 border border-sky-200 text-xs shrink-0">
            Open-Meteo
          </span>
        </div>

        {/* Form Inputs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.smartWatering.selectCrop}
            </label>
            <select
              value={cropId}
              onChange={(e) => setCropId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            >
              {CROPS_DATA.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {lang === 'te' ? crop.nameTe : crop.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Growth Stage */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.smartWatering.cropStage}
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            >
              <option value="germination">{t.smartWatering.stageGermination}</option>
              <option value="vegetative">{t.smartWatering.stageVegetative}</option>
              <option value="flowering">{t.smartWatering.stageFlowering}</option>
              <option value="fruiting">{t.smartWatering.stageFruiting}</option>
              <option value="maturity">{t.smartWatering.stageMaturity}</option>
            </select>
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.smartWatering.soilType}
            </label>
            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value as SoilType)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            >
              <option value="black">{lang === 'te' ? 'నల్లరేగడి నేల (Black Soil - ఎక్కువ తేమ పడుతుంది)' : 'Black Soil (High retention)'}</option>
              <option value="red">{lang === 'te' ? 'ఎర్ర నేల (Red Loam - మధ్యస్థం)' : 'Red Loamy (Medium retention)'}</option>
              <option value="alluvial">{lang === 'te' ? 'ఒండ్రు నేల (Alluvial)' : 'Alluvial Soil'}</option>
              <option value="sandy">{lang === 'te' ? 'ఇసుక నేల (Sandy - త్వరగా ఆరిపోతుంది)' : 'Sandy Soil (Quick drainage)'}</option>
              <option value="clay">{lang === 'te' ? 'బంకమట్టి నేల (Clayey)' : 'Clayey Soil'}</option>
            </select>
          </div>

          {/* Days Since Last Watered */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.smartWatering.lastWatered}
            </label>
            <input
              type="number"
              min="0"
              max="30"
              value={daysSinceWatered}
              onChange={(e) => setDaysSinceWatered(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5">
          <button
            onClick={handleCalculate}
            className="w-full sm:w-auto px-8 py-3 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-600/30 flex items-center justify-center space-x-2 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.smartWatering.checkWaterBtn}</span>
          </button>
        </div>

        {/* Verdict Output */}
        {verdict && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div
              className={`rounded-3xl p-5 sm:p-7 border ${
                verdict.status === 'water_now'
                  ? 'bg-blue-50/70 border-blue-300 text-blue-950'
                  : verdict.status === 'no_water'
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${
                      verdict.status === 'water_now'
                        ? 'bg-blue-600'
                        : verdict.status === 'no_water'
                        ? 'bg-emerald-600'
                        : 'bg-amber-600'
                    }`}
                  >
                    {verdict.status === 'water_now' ? (
                      <Droplets className="w-6 h-6" />
                    ) : verdict.status === 'no_water' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Clock className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {lang === 'te' ? 'నీటి పారుదల నిర్ణయం' : 'Irrigation Verdict'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black">
                      {verdict.status === 'water_now'
                        ? t.smartWatering.verdictWaterNow
                        : verdict.status === 'no_water'
                        ? t.smartWatering.verdictNoWater
                        : t.smartWatering.verdictDelay}
                    </h3>
                  </div>
                </div>

                {verdict.hoursDrip && verdict.hoursDrip > 0 && (
                  <div className="bg-white px-4 py-2 rounded-xl border border-blue-200 text-xs font-bold text-blue-800 shadow-sm self-start sm:self-auto">
                    💧 {lang === 'te' ? `డ్రిప్ సమయం: ${verdict.hoursDrip} గంటలు` : `Drip Run Time: ~${verdict.hoursDrip} hours`}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  {t.smartWatering.reasoning}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
                  {lang === 'te' ? verdict.reasonTe : verdict.reasonEn}
                </p>
              </div>

              {/* Schedule & Tips */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200/60 text-xs">
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">⏰ {lang === 'te' ? 'సరైన సమయం:' : 'Optimal Time:'}</span>
                  <p className="text-slate-600">{t.smartWatering.waterSchedule}</p>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">💡 {lang === 'te' ? 'నీటి ఆదా చిట్కా:' : 'Water Saving Tip:'}</span>
                  <p className="text-slate-600">{t.smartWatering.savingTip}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
