import React, { useState } from 'react';
import { Language, SoilType, Season, IrrigationType, CropInfo } from '../types';
import { translations } from '../translations';
import { CROPS_DATA } from '../data/cropData';
import { 
  Compass, 
  Sparkles, 
  Clock, 
  Droplet, 
  TrendingUp, 
  Layers, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface CropAdvisorProps {
  lang: Language;
}

export const CropAdvisor: React.FC<CropAdvisorProps> = ({ lang }) => {
  const t = translations[lang];

  const [soil, setSoil] = useState<SoilType>('black');
  const [season, setSeason] = useState<Season>('kharif');
  const [irrigation, setIrrigation] = useState<IrrigationType>('borewell');
  const [acres, setAcres] = useState<number>(2);
  const [recommendedCrops, setRecommendedCrops] = useState<CropInfo[]>([]);
  const [searched, setSearched] = useState<boolean>(false);

  const soilOptions: { id: SoilType; labelEn: string; labelTe: string }[] = [
    { id: 'black', labelEn: 'Black Cotton Soil (నల్లరేగడి)', labelTe: 'నల్లరేగడి నేల (Black Soil)' },
    { id: 'red', labelEn: 'Red Loamy Soil (ఎర్ర నేల)', labelTe: 'ఎర్ర నేల / చెల్క (Red Soil)' },
    { id: 'alluvial', labelEn: 'Alluvial River Soil (ఒండ్రు నేల)', labelTe: 'ఒండ్రు నేల (Alluvial)' },
    { id: 'sandy', labelEn: 'Sandy Loam (ఇసుక నేల)', labelTe: 'ఇసుక నేల (Sandy)' },
    { id: 'clay', labelEn: 'Heavy Clay Soil (బంకమట్టి)', labelTe: 'బంకమట్టి నేల (Clay)' },
  ];

  const seasonOptions: { id: Season; labelEn: string; labelTe: string }[] = [
    { id: 'kharif', labelEn: 'Kharif (Monsoon / జూన్ - అక్టోబర్)', labelTe: 'ఖరీఫ్ (వానాకాలం / జూన్ - అక్టోబర్)' },
    { id: 'rabi', labelEn: 'Rabi (Winter / అక్టోబర్ - మార్చి)', labelTe: 'రబీ (యాసంగి / అక్టోబర్ - మార్చి)' },
    { id: 'zaid', labelEn: 'Zaid (Summer / మార్చి - మే)', labelTe: 'జాaid (వేసవి / మార్చి - మే)' },
  ];

  const irrigationOptions: { id: IrrigationType; labelEn: string; labelTe: string }[] = [
    { id: 'borewell', labelEn: 'Borewell / Tube-well', labelTe: 'బోరు బావి / బావి' },
    { id: 'canal', labelEn: 'Canal / River Water', labelTe: 'కాలువ / చెరువు నీరు' },
    { id: 'drip', labelEn: 'Drip / Micro-irrigation', labelTe: 'బిందు సేద్యం (డ్రిప్)' },
    { id: 'rainfed', labelEn: 'Rainfed (Dryland / వర్షాధార)', labelTe: 'వర్షాధారం (బావులు లేనిది)' },
  ];

  const handleRecommend = () => {
    setSearched(true);
    // Filter crops matching soil and season
    const matches = CROPS_DATA.filter((crop) => {
      const soilMatch = crop.suitableSoils.includes(soil);
      const seasonMatch = crop.seasons.includes(season) || crop.seasons.includes('all_year');
      // If rainfed, discourage high water crops like paddy
      if (irrigation === 'rainfed' && crop.waterRequirement === 'high') {
        return false;
      }
      return soilMatch && seasonMatch;
    });

    // If matches are few, include other crops suitable for soil
    if (matches.length < 2) {
      const fallback = CROPS_DATA.filter(c => c.suitableSoils.includes(soil));
      setRecommendedCrops(fallback.length > 0 ? fallback : CROPS_DATA.slice(0, 3));
    } else {
      setRecommendedCrops(matches);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-farm-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-farm-950 flex items-center gap-2">
            <Compass className="w-6 h-6 text-farm-600" />
            <span>{t.cropAdvisor.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.cropAdvisor.subtitle}
          </p>
        </div>

        {/* Input Form */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Soil Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.cropAdvisor.soilType}
            </label>
            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value as SoilType)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            >
              {soilOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {lang === 'te' ? opt.labelTe : opt.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Season */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.cropAdvisor.season}
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value as Season)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            >
              {seasonOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {lang === 'te' ? opt.labelTe : opt.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Irrigation Source */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.cropAdvisor.irrigation}
            </label>
            <select
              value={irrigation}
              onChange={(e) => setIrrigation(e.target.value as IrrigationType)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            >
              {irrigationOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {lang === 'te' ? opt.labelTe : opt.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Land Area (Acres) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.cropAdvisor.landArea}
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(Math.max(0.25, parseFloat(e.target.value) || 1))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            />
          </div>
        </div>

        {/* Find Crops Button */}
        <div className="mt-5">
          <button
            onClick={handleRecommend}
            className="w-full sm:w-auto px-8 py-3 bg-farm-600 hover:bg-farm-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-farm-600/30 flex items-center justify-center space-x-2 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.cropAdvisor.findCropsBtn}</span>
          </button>
        </div>

        {/* Results */}
        {searched && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-farm-600" />
              <span>{t.cropAdvisor.resultsTitle}</span>
              <span className="text-xs bg-farm-100 text-farm-800 px-2.5 py-0.5 rounded-full font-semibold">
                {recommendedCrops.length} {lang === 'te' ? 'పంటలు కనుగొనబడ్డాయి' : 'crops found'}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendedCrops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-white border border-farm-200 hover:border-farm-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                          {lang === 'te' ? crop.nameTe : crop.nameEn}
                        </h4>
                        <span className="inline-block mt-1 text-[11px] font-semibold uppercase tracking-wider text-farm-700 bg-farm-50 px-2 py-0.5 rounded-md border border-farm-200">
                          {crop.category}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-farm-700 bg-farm-100 px-2.5 py-1 rounded-full">
                        ₹{crop.approxMspPerQuintal} / Qtl
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {lang === 'te' ? crop.descriptionTe : crop.descriptionEn}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-farm-600" />
                          <span>{t.cropAdvisor.duration}:</span>
                        </span>
                        <span className="font-semibold">{crop.durationDays}</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Droplet className="w-3.5 h-3.5 text-blue-500" />
                          <span>{t.cropAdvisor.waterNeed}:</span>
                        </span>
                        <span className="font-semibold uppercase text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          {crop.waterRequirement}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.cropAdvisor.expectedYield}:</span>
                        </span>
                        <span className="font-semibold text-emerald-700">{crop.expectedYieldPerAcre}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sowing Tips & Intercrop info */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.cropAdvisor.sowingTips}:
                    </span>
                    <p className="text-[11px] text-slate-600">
                      {(lang === 'te' ? crop.sowingTipsTe[0] : crop.sowingTipsEn[0])}
                    </p>

                    {crop.companionCropsEn.length > 0 && (
                      <div className="mt-2 text-[11px] bg-farm-50 p-2 rounded-lg text-farm-800">
                        <span className="font-bold">{t.cropAdvisor.intercropping}: </span>
                        <span>{(lang === 'te' ? crop.companionCropsTe.join(', ') : crop.companionCropsEn.join(', '))}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
