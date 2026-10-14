import React, { useState } from 'react';
import { Language, CostCalculation } from '../types';
import { translations } from '../translations';
import { CROPS_DATA } from '../data/cropData';
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Printer, 
  RotateCcw,
  Info,
  CheckCircle2
} from 'lucide-react';

interface CostCalculatorProps {
  lang: Language;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ lang }) => {
  const t = translations[lang];

  const [costs, setCosts] = useState<CostCalculation>({
    landPreparation: 4500,
    seeds: 2500,
    fertilizers: 5000,
    pesticides: 3500,
    irrigation: 2000,
    labor: 9000,
    machinery: 3500,
    transport: 1500,
    other: 1000,
    expectedYieldQuintals: 25,
    sellingPricePerQuintal: 2300, // Default Paddy MSP
  });

  const handleChange = (field: keyof CostCalculation, value: number) => {
    setCosts((prev) => ({
      ...prev,
      [field]: Math.max(0, isNaN(value) ? 0 : value),
    }));
  };

  const handleApplyMsp = (msp: number, defaultYield: number) => {
    setCosts((prev) => ({
      ...prev,
      sellingPricePerQuintal: msp,
      expectedYieldQuintals: defaultYield,
    }));
  };

  // Calculations
  const totalCost = 
    costs.landPreparation +
    costs.seeds +
    costs.fertilizers +
    costs.pesticides +
    costs.irrigation +
    costs.labor +
    costs.machinery +
    costs.transport +
    costs.other;

  const grossRevenue = costs.expectedYieldQuintals * costs.sellingPricePerQuintal;
  const netProfitLoss = grossRevenue - totalCost;
  const isProfit = netProfitLoss >= 0;

  const breakEvenPrice = costs.expectedYieldQuintals > 0 
    ? Math.round(totalCost / costs.expectedYieldQuintals) 
    : 0;

  const roi = totalCost > 0 
    ? Number(((netProfitLoss / totalCost) * 100).toFixed(1)) 
    : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setCosts({
      landPreparation: 4000,
      seeds: 2000,
      fertilizers: 4500,
      pesticides: 3000,
      irrigation: 2000,
      labor: 8000,
      machinery: 3000,
      transport: 1500,
      other: 1000,
      expectedYieldQuintals: 25,
      sellingPricePerQuintal: 2300,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-farm-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-farm-950 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-farm-600" />
              <span>{t.costCalculator.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.costCalculator.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2 no-print">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.common.reset}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-farm-600 hover:bg-farm-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>{t.costCalculator.printBtn}</span>
            </button>
          </div>
        </div>

        {/* Quick MSP Preset Reference Chips */}
        <div className="mt-6 p-4 rounded-2xl bg-farm-50/70 border border-farm-200 no-print">
          <span className="block text-xs font-bold text-farm-900 mb-2">
            {t.costCalculator.mspHelper}
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { nameEn: 'Paddy', nameTe: 'వరి', msp: 2300, yield: 25 },
              { nameEn: 'Cotton', nameTe: 'ప్రత్తి', msp: 7121, yield: 12 },
              { nameEn: 'Chilli', nameTe: 'మిరప', msp: 14000, yield: 25 },
              { nameEn: 'Maize', nameTe: 'మొక్కజొన్న', msp: 2225, yield: 30 },
              { nameEn: 'Groundnut', nameTe: 'వేరుశనగ', msp: 6783, yield: 12 },
              { nameEn: 'Red Gram', nameTe: 'కంది', msp: 7550, yield: 8 },
              { nameEn: 'Bengal Gram', nameTe: 'శనగ', msp: 5440, yield: 9 },
            ].map((crop, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyMsp(crop.msp, crop.yield)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-farm-100 border border-farm-300 text-xs font-semibold text-farm-900 shadow-xs transition"
              >
                {lang === 'te' ? crop.nameTe : crop.nameEn}: ₹{crop.msp}/Qtl
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
                {t.costCalculator.expensesHeading}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.landPrep}
                  </label>
                  <input
                    type="number"
                    value={costs.landPreparation}
                    onChange={(e) => handleChange('landPreparation', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.seeds}
                  </label>
                  <input
                    type="number"
                    value={costs.seeds}
                    onChange={(e) => handleChange('seeds', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.fertilizers}
                  </label>
                  <input
                    type="number"
                    value={costs.fertilizers}
                    onChange={(e) => handleChange('fertilizers', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.pesticides}
                  </label>
                  <input
                    type="number"
                    value={costs.pesticides}
                    onChange={(e) => handleChange('pesticides', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.irrigationCost}
                  </label>
                  <input
                    type="number"
                    value={costs.irrigation}
                    onChange={(e) => handleChange('irrigation', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.laborCost}
                  </label>
                  <input
                    type="number"
                    value={costs.labor}
                    onChange={(e) => handleChange('labor', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.machineryCost}
                  </label>
                  <input
                    type="number"
                    value={costs.machinery}
                    onChange={(e) => handleChange('machinery', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.transportCost}
                  </label>
                  <input
                    type="number"
                    value={costs.transport}
                    onChange={(e) => handleChange('transport', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.otherCost}
                  </label>
                  <input
                    type="number"
                    value={costs.other}
                    onChange={(e) => handleChange('other', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Production & Selling Price */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
                {t.costCalculator.revenueHeading}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.expectedYield}
                  </label>
                  <input
                    type="number"
                    value={costs.expectedYieldQuintals}
                    onChange={(e) => handleChange('expectedYieldQuintals', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.costCalculator.sellingPrice}
                  </label>
                  <input
                    type="number"
                    value={costs.sellingPricePerQuintal}
                    onChange={(e) => handleChange('sellingPricePerQuintal', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Financial Report Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-3 flex items-center justify-between">
                <span>{t.costCalculator.summaryHeading}</span>
                <span className="text-xs bg-farm-100 text-farm-800 px-2 py-0.5 rounded-full font-bold">
                  INR (₹)
                </span>
              </h3>

              {/* Total Expenses */}
              <div className="flex items-center justify-between py-2 border-b border-slate-200/70">
                <span className="text-xs sm:text-sm text-slate-600">
                  {t.costCalculator.totalExpenses}
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  ₹{totalCost.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Gross Revenue */}
              <div className="flex items-center justify-between py-2 border-b border-slate-200/70">
                <span className="text-xs sm:text-sm text-slate-600">
                  {t.costCalculator.grossRevenue}
                </span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">
                  ₹{grossRevenue.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Net Profit or Loss Box */}
              <div
                className={`rounded-2xl p-4 sm:p-5 border ${
                  isProfit
                    ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950'
                    : 'bg-rose-100/70 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {isProfit ? t.costCalculator.netProfit : t.costCalculator.netLoss}
                  </span>
                  {isProfit ? (
                    <TrendingUp className="w-5 h-5 text-emerald-700" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-rose-700" />
                  )}
                </div>

                <div className="text-3xl sm:text-4xl font-black">
                  {isProfit ? '+' : '-'}₹{Math.abs(netProfitLoss).toLocaleString('en-IN')}
                </div>

                <div className="mt-2 text-xs flex items-center justify-between">
                  <span>{t.costCalculator.roi}:</span>
                  <span className="font-extrabold">{roi}%</span>
                </div>
              </div>

              {/* Break-even point */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 font-semibold block">
                  {t.costCalculator.breakEven}
                </span>
                <p className="text-lg font-bold text-slate-800">
                  ₹{breakEvenPrice.toLocaleString('en-IN')} / {t.common.quintal}
                </p>
                <p className="text-[11px] text-slate-500">
                  {lang === 'te' 
                    ? 'ఈ ధర కంటే ఎక్కువ అమ్ముకుంటే మీకు నికర లాభం వస్తుంది.' 
                    : 'Selling above this benchmark ensures profitability.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
