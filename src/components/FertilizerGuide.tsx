import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { CROPS_DATA } from '../data/cropData';
import { 
  FlaskConical, 
  ShieldAlert, 
  Leaf, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle 
} from 'lucide-react';

interface FertilizerGuideProps {
  lang: Language;
}

export const FertilizerGuide: React.FC<FertilizerGuideProps> = ({ lang }) => {
  const t = translations[lang];

  const [cropId, setCropId] = useState<string>('paddy');
  const [acres, setAcres] = useState<number>(2);

  // Standard N-P-K requirements (kg per acre) for major Indian crops
  const nutrientRequirements: Record<string, { n: number; p: number; k: number; splits: string[]; splitsTe: string[] }> = {
    paddy: { 
      n: 40, p: 20, k: 20, 
      splits: ['Basal (at transplanting): All P, 50% K, 33% N', 'Active tillering (21-25 days): 33% N', 'Panicle initiation (40-45 days): 34% N, 50% K'],
      splitsTe: ['దుక్కిలో (నాటే ముందు): మొత్తం P, 50% K, 33% N', 'పిలకల దశ (21-25 రోజులకు): 33% N', 'చిరుపొట్ట దశ (40-45 రోజులకు): 34% N, 50% K']
    },
    cotton: { 
      n: 50, p: 25, k: 25, 
      splits: ['Basal: 100% P, 25% N, 25% K', 'Vegetative (30 days): 25% N, 25% K', 'Square formation (60 days): 25% N, 25% K', 'Boll development (90 days): 25% N, 25% K'],
      splitsTe: ['మొదట్లో: మొత్తం P, 25% N, 25% K', '30 రోజులకు: 25% N, 25% K', 'పూత/మొగ్గ దశ (60 రోజులకు): 25% N, 25% K', 'కాయల ఊరే దశ (90 రోజులకు): 25% N, 25% K']
    },
    chilli: { 
      n: 60, p: 25, k: 25, 
      splits: ['Basal: All P, 20% N, 20% K', 'Split 1 (30 days): 20% N, 20% K', 'Split 2 (60 days): 20% N, 20% K', 'Split 3 (90 days): 20% N, 20% K', 'Split 4 (120 days): 20% N, 20% K'],
      splitsTe: ['ఆఖరి దుక్కిలో: మొత్తం P, 20% N, 20% K', '30 రోజులకు: 20% N, 20% K', '60 రోజులకు: 20% N, 20% K', '90 రోజులకు: 20% N, 20% K', '120 రోజులకు: 20% N, 20% K']
    },
    maize: { 
      n: 50, p: 25, k: 15, 
      splits: ['Basal: All P, all K, 33% N', 'Knee-high (30 days): 33% N', 'Tasseling (50 days): 34% N'],
      splitsTe: ['విత్తేటప్పుడు: మొత్తం P, మొత్తం K, 33% నత్రజని', 'మోకాలి లోతు దశ (30 రోజులకు): 33% నత్రజని', 'వెన్ను దశ (50 రోజులకు): 34% నత్రజని']
    },
    groundnut: { 
      n: 10, p: 20, k: 20, 
      splits: ['Basal: 100% N, P, K + Gypsum 200kg at 40-45 days pegging stage.'],
      splitsTe: ['ఆఖరి దుక్కిలో: మొత్తం N, P, K మరియు ఊడలు దిగే 40-45 రోజులకు 200 కిలోల జిప్సం వేయాలి.']
    },
    tomato: { 
      n: 50, p: 35, k: 35, 
      splits: ['Basal: All P, 50% K, 30% N', 'Growth (25 days): 35% N, 25% K', 'Flowering (50 days): 35% N, 25% K'],
      splitsTe: ['నాటే ముందు: మొత్తం P, 50% K, 30% N', '25 రోజులకు: 35% N, 25% K', 'పూత దశ (50 రోజులకు): 35% N, 25% K']
    },
    redgram: { 
      n: 8, p: 20, k: 10, 
      splits: ['Basal: 100% at sowing (Pigeonpea fixes own atmospheric nitrogen).'],
      splitsTe: ['విత్తేటప్పుడు: మొత్తం మోతాదును దుక్కిలోనే వేయాలి (కంది స్వయంగా నత్రజనిని గ్రహిస్తుంది).']
    },
    bengalgram: { 
      n: 8, p: 20, k: 10, 
      splits: ['Basal: 100% placed 5cm below seed at sowing time.'],
      splitsTe: ['విత్తే సమయంలో విత్తనానికి 5 సెం.మీ దిగువన పడేలా వేయాలి.']
    }
  };

  const req = nutrientRequirements[cropId] || nutrientRequirements.paddy;

  // Approximate commercial bags (50kg bags)
  // DAP (18-46-0) supplies P2O5: 1 bag DAP (50kg) has 23kg P2O5 and 9kg N
  const dapBags = Number(((req.p * acres) / 23).toFixed(1));
  const nitrogenFromDap = dapBags * 9;
  const remainingN = Math.max(0, (req.n * acres) - nitrogenFromDap);
  // Urea (46% N): 1 bag Urea (50kg) has 23kg N
  const ureaBags = Number((remainingN / 23).toFixed(1));
  // MOP (60% K2O): 1 bag MOP (50kg) has 30kg K2O
  const mopBags = Number(((req.k * acres) / 30).toFixed(1));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-farm-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-farm-950 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-farm-600" />
            <span>{t.fertilizer.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.fertilizer.subtitle}
          </p>
        </div>

        {/* Form */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.fertilizer.crop}
            </label>
            <select
              value={cropId}
              onChange={(e) => setCropId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            >
              {CROPS_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {lang === 'te' ? c.nameTe : c.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.fertilizer.area}
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(Math.max(0.5, parseFloat(e.target.value) || 1))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            />
          </div>
        </div>

        {/* Recommended Requirements Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
              {t.fertilizer.urea}
            </span>
            <div className="text-3xl font-black text-emerald-900 mt-2">
              {ureaBags} <span className="text-sm font-normal text-slate-600">{lang === 'te' ? 'బస్తాలు (50kg)' : 'Bags (50kg)'}</span>
            </div>
            <p className="text-[11px] text-emerald-700 mt-1">
              {lang === 'te' ? `మొత్తం నత్రజని: ${(req.n * acres).toFixed(0)} కిలోలు (${acres} ఎకరాలకు)` : `Total Nitrogen: ${(req.n * acres).toFixed(0)} kg`}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide block">
              {t.fertilizer.dap}
            </span>
            <div className="text-3xl font-black text-amber-900 mt-2">
              {dapBags} <span className="text-sm font-normal text-slate-600">{lang === 'te' ? 'బస్తాలు (50kg)' : 'Bags (50kg)'}</span>
            </div>
            <p className="text-[11px] text-amber-700 mt-1">
              {lang === 'te' ? `భాస్వరం: ${(req.p * acres).toFixed(0)} కిలోలు` : `Phosphorus: ${(req.p * acres).toFixed(0)} kg`}
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wide block">
              {t.fertilizer.mop}
            </span>
            <div className="text-3xl font-black text-sky-900 mt-2">
              {mopBags} <span className="text-sm font-normal text-slate-600">{lang === 'te' ? 'బస్తాలు (50kg)' : 'Bags (50kg)'}</span>
            </div>
            <p className="text-[11px] text-sky-700 mt-1">
              {lang === 'te' ? `పొటాష్: ${(req.k * acres).toFixed(0)} కిలోలు` : `Potash: ${(req.k * acres).toFixed(0)} kg`}
            </p>
          </div>
        </div>

        {/* Application Schedule */}
        <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-farm-600" />
            <span>{lang === 'te' ? 'ఎరువులు వేయవలసిన సమయాలు (దఫాలు):' : 'Recommended Split Application Schedule:'}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {(lang === 'te' ? req.splitsTe : req.splits).map((split, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                <span className="w-5 h-5 rounded-full bg-farm-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{split}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Organic Alternatives */}
        <div className="mt-6 bg-emerald-50/50 rounded-2xl p-5 border border-emerald-200">
          <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wide mb-2 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>{t.fertilizer.organicAlternative}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-emerald-900">
            <div className="bg-white p-3 rounded-xl border border-emerald-200">
              <span className="font-bold block">FYM (పశువుల ఎరువు):</span>
              <span>{acres * 4} - {acres * 5} {lang === 'te' ? 'టన్నులు దుక్కిలో వేయాలి' : 'tonnes before ploughing'}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-emerald-200">
              <span className="font-bold block">Vermicompost (వర్మీ కంపోస్ట్):</span>
              <span>{acres * 1.5} - {acres * 2} {lang === 'te' ? 'టన్నులు' : 'tonnes'}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-emerald-200">
              <span className="font-bold block">Bio-fertilizers (జీవ ఎరువులు):</span>
              <span>Azospirillum & PSB @ {acres * 2} kg {lang === 'te' ? 'విత్తన శుద్ధి లేదా నేలలో కలపాలి' : 'for seed/soil treatment'}</span>
            </div>
          </div>
        </div>

        {/* CRITICAL SAFETY RULES */}
        <div className="mt-8 border-t-2 border-rose-200 pt-6">
          <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 sm:p-6 text-rose-950">
            <div className="flex items-center space-x-2 text-rose-700 mb-3">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
              <h3 className="font-black text-base sm:text-lg uppercase tracking-tight">
                {t.fertilizer.safetyTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-white/90 p-3.5 rounded-2xl border border-rose-200 flex items-start gap-2.5">
                <span className="font-bold text-rose-600 shrink-0">1.</span>
                <p>{t.fertilizer.safetyRule1}</p>
              </div>

              <div className="bg-white/90 p-3.5 rounded-2xl border border-rose-200 flex items-start gap-2.5">
                <span className="font-bold text-rose-600 shrink-0">2.</span>
                <p>{t.fertilizer.safetyRule2}</p>
              </div>

              <div className="bg-white/90 p-3.5 rounded-2xl border border-rose-200 flex items-start gap-2.5">
                <span className="font-bold text-rose-600 shrink-0">3.</span>
                <p>{t.fertilizer.safetyRule3}</p>
              </div>

              <div className="bg-white/90 p-3.5 rounded-2xl border border-rose-200 flex items-start gap-2.5">
                <span className="font-bold text-rose-600 shrink-0">4.</span>
                <p>{t.fertilizer.safetyRule4}</p>
              </div>

              <div className="md:col-span-2 bg-rose-100 p-3.5 rounded-2xl border border-rose-300 flex items-start gap-2.5 font-semibold text-rose-900">
                <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                <p>{t.fertilizer.safetyRule5}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
