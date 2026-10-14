import React, { useState, useRef } from 'react';
import { Language, DiseaseInfo } from '../types';
import { translations } from '../translations';
import { CROPS_DATA } from '../data/cropData';
import { PLANT_DISEASES, SymptomRule } from '../data/plantDiseases';
import { 
  Camera, 
  Upload, 
  AlertCircle, 
  CheckCircle, 
  ShieldCheck, 
  Leaf, 
  PhoneCall, 
  Sparkles,
  Info
} from 'lucide-react';

interface PlantDoctorProps {
  lang: Language;
}

interface ImageAnalysisResult {
  greenPercentage: number;
  yellowChlorosisPercentage: number;
  brownNecrosisPercentage: number;
  hasAbnormality: boolean;
}

export const PlantDoctor: React.FC<PlantDoctorProps> = ({ lang }) => {
  const t = translations[lang];

  const [selectedCropId, setSelectedCropId] = useState<string>('paddy');
  const [selectedPart, setSelectedPart] = useState<'leaf' | 'stem' | 'fruit' | 'root'>('leaf');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysisResult | null>(null);
  const [analyzingImage, setAnalyzingImage] = useState<boolean>(false);
  const [diagnosisResult, setDiagnosisResult] = useState<SymptomRule | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available symptom options based on selected crop and plant part
  const getAvailableSymptoms = () => {
    const list: { id: string; labelEn: string; labelTe: string }[] = [];

    if (selectedCropId === 'paddy') {
      if (selectedPart === 'leaf') {
        list.push(
          { id: 'spindle_spots', labelEn: 'Spindle/eye-shaped spots with grey center', labelTe: 'బూడిద రంగు కేంద్రంతో నూలు కండె ఆకారపు మచ్చలు' },
          { id: 'brown_spots', labelEn: 'Dark brown spots / reddish margins', labelTe: 'గోధుమ రంగు మచ్చలు / ఎరుపు అంచులు' },
          { id: 'leaf_burn', labelEn: 'Leaves dry up like burnt straw', labelTe: 'ఆకులు అగ్గి తగిలినట్లు ఎండిపోవడం' }
        );
      } else if (selectedPart === 'stem') {
        list.push(
          { id: 'dead_heart', labelEn: 'Dead heart (central shoot dries and pulls easily)', labelTe: 'చచ్చిన మొవ్వు (సులభంగా ఊడివచ్చే ఎండిన మొవ్వు)' },
          { id: 'white_earhead', labelEn: 'White empty earhead / chaffy grain', labelTe: 'తెల్ల కంకులు / గింజ లేని తాలు వెన్నులు' },
          { id: 'stem_holes', labelEn: 'Bore holes with frass on stem', labelTe: 'కాండంపై రంధ్రాలు & పురుగు మల విసర్జన' }
        );
      }
    } else if (selectedCropId === 'cotton') {
      if (selectedPart === 'leaf') {
        list.push(
          { id: 'leaf_curl_up', labelEn: 'Leaves curling upwards like cup/boat', labelTe: 'ఆకులు దోనెలాగా పైకి ముడుచుకుపోవడం' },
          { id: 'thickened_veins', labelEn: 'Thickened, rough green veins on underside', labelTe: 'ఆకుల అడుగున లావుగా మారిన నరాలు/ఈనెలు' },
          { id: 'yellow_margins', labelEn: 'Yellowing margins / chlorosis', labelTe: 'ఆకుల అంచులు పసుపు రంగులోకి మారడం' },
          { id: 'stunted_growth', labelEn: 'Stunted bush-like plant height', labelTe: 'మొక్క ఎదగకుండా పొట్టిగా గిడసబారడం' }
        );
      } else if (selectedPart === 'fruit') {
        list.push(
          { id: 'rosetted_flower', labelEn: 'Rosetted flower (petals twisted, closed)', labelTe: 'రోసెట్ పువ్వు (రేకలు విచ్చుకోకుండా ముడుచుకుపోవడం)' },
          { id: 'boll_holes', labelEn: 'Bored entry holes on developing bolls', labelTe: 'కాయలపై తొలుచు రంధ్రాలు' },
          { id: 'stained_lint', labelEn: 'Stained yellow/brown rotten lint inside', labelTe: 'కాయ లోపల దూది రంగు మారడం, కుళ్ళిపోవడం' }
        );
      }
    } else if (selectedCropId === 'chilli') {
      if (selectedPart === 'leaf') {
        list.push(
          { id: 'leaf_curl_up', labelEn: 'Upward curled leaves / boat-shaped foliage', labelTe: 'ఆకులు పైకి దోనెలాగా ముడుచుకోవడం' },
          { id: 'crinkled_leaves', labelEn: 'Crinkled, brittle deformed leaves', labelTe: 'ఆకులు పెళుసుగా, వంకర్లు తిరిగి ఉండడం' },
          { id: 'flower_drop', labelEn: 'Severe flower dropping', labelTe: 'పూత విపరీతంగా రాలిపోవడం' }
        );
      } else if (selectedPart === 'fruit' || selectedPart === 'stem') {
        list.push(
          { id: 'circular_sunken_spots', labelEn: 'Sunken circular spots with black rings', labelTe: 'కాయలపై నల్లటి వలయాలతో కూడిన గుంటబడిన మచ్చలు' },
          { id: 'twig_dieback', labelEn: 'Twigs dying back from top to bottom (straw color)', labelTe: 'కొమ్మల పైభాగం నుండి కిందికి ఎండిపోవడం (డై-బ్యాక్)' }
        );
      }
    } else if (selectedCropId === 'tomato') {
      list.push(
        { id: 'target_board_rings', labelEn: 'Concentric target-board rings on lower leaves', labelTe: 'కింది ఆకులపై వలయాలు వలయాలుగా మచ్చలు' },
        { id: 'yellow_halo', labelEn: 'Yellow halo surrounding dark spots', labelTe: 'మచ్చల చుట్టూ పసుపు రంగు వలయం' },
        { id: 'lower_leaf_drying', labelEn: 'Progressive defoliation from ground up', labelTe: 'కింది నుండి ఆకులు ఎండి రాలిపోవడం' }
      );
    } else if (selectedCropId === 'groundnut') {
      list.push(
        { id: 'dark_circular_spots', labelEn: 'Dark circular brown spots on leaves', labelTe: 'ఆకులపై నల్లటి గుండ్రటి మచ్చలు' },
        { id: 'yellow_halo', labelEn: 'Bright yellow halo around spots (Tikka)', labelTe: 'మచ్చల చుట్టూ స్పష్టమైన పసుపు రంగు వలయం' },
        { id: 'leaf_defoliation', labelEn: 'Premature shedding of foliage', labelTe: 'ఆకులు రాలిపోయి ఒట్టి కాడలు మిగలడం' }
      );
    }

    // Default fallback symptoms if none matched
    if (list.length === 0) {
      list.push(
        { id: 'brown_spots', labelEn: 'Brown spots or lesions', labelTe: 'గోధుమ రంగు మచ్చలు' },
        { id: 'yellow_margins', labelEn: 'Yellowing of leaves', labelTe: 'ఆకులు పసుపుబారడం' },
        { id: 'leaf_curl_up', labelEn: 'Curling or distortion of leaves', labelTe: 'ఆకులు ముడుచుకుపోవడం' }
      );
    }

    return list;
  };

  // Image analysis using HTML5 Canvas - client-side, honest, transparent
  const analyzeLeafImage = (imageSrc: string) => {
    setAnalyzingImage(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setAnalyzingImage(false);
        return;
      }

      // Resize for fast client-side pixel scanning
      const width = 150;
      const height = (img.height / img.width) * 150;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      let greenPixels = 0;
      let yellowChlorosisPixels = 0;
      let brownNecrosisPixels = 0;
      let totalValidPixels = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue; // skip transparent
        totalValidPixels++;

        // Healthy green detection (g > r and g > b by threshold)
        if (g > r + 15 && g > b + 15) {
          greenPixels++;
        }
        // Yellow/Chlorosis detection (high red + high green, low blue: r > 130, g > 130, b < 100)
        else if (r > 130 && g > 120 && Math.abs(r - g) < 40 && b < 110) {
          yellowChlorosisPixels++;
        }
        // Brown/Necrosis/Dark lesion detection (moderate red, lower green, low blue: r > g, r > 60, b < 80)
        else if (r > 60 && r > g && g > b && r < 180) {
          brownNecrosisPixels++;
        }
      }

      const greenRatio = totalValidPixels > 0 ? Math.round((greenPixels / totalValidPixels) * 100) : 50;
      const yellowRatio = totalValidPixels > 0 ? Math.round((yellowChlorosisPixels / totalValidPixels) * 100) : 10;
      const brownRatio = totalValidPixels > 0 ? Math.round((brownNecrosisPixels / totalValidPixels) * 100) : 10;

      setImageAnalysis({
        greenPercentage: greenRatio,
        yellowChlorosisPercentage: yellowRatio,
        brownNecrosisPercentage: brownRatio,
        hasAbnormality: yellowRatio > 15 || brownRatio > 12,
      });
      setAnalyzingImage(false);
    };

    img.onerror = () => {
      setAnalyzingImage(false);
    };
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        analyzeLeafImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleDiagnose = () => {
    setHasSearched(true);

    // Look for matching disease in PLANT_DISEASES
    const candidates = PLANT_DISEASES.filter((d) => d.cropId === selectedCropId);

    let bestDisease: SymptomRule | null = null;
    let highestMatches = 0;

    for (const d of candidates) {
      let matches = 0;
      for (const sym of selectedSymptoms) {
        if (d.matchingSymptoms.includes(sym)) {
          matches++;
        }
      }
      if (d.targetPart === selectedPart) {
        matches += 1;
      }
      if (matches > highestMatches) {
        highestMatches = matches;
        bestDisease = d;
      }
    }

    // If no specific match, pick primary disease for this crop & part or null
    if (!bestDisease && candidates.length > 0) {
      bestDisease = candidates.find((c) => c.targetPart === selectedPart) || candidates[0];
    }

    setDiagnosisResult(bestDisease);
  };

  return (
    <div className="space-y-6">
      {/* Title & Honest Notice Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-farm-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-farm-950 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-farm-600" />
            <span>{t.plantDoctor.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.plantDoctor.subtitle}
          </p>
        </div>

        {/* Honest Transparency Notice Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block mb-0.5">
              {lang === 'te' ? 'రైతు సోదరులకు స్పష్టమైన నిజాయితీ గమనిక:' : 'Transparent Farmer Notice:'}
            </span>
            <p className="leading-relaxed">
              {t.plantDoctor.transparencyNotice}
            </p>
          </div>
        </div>

        {/* Step-by-Step Diagnostic Form */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Crop & Symptom Selector */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Crop Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                {t.plantDoctor.step1}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CROPS_DATA.map((crop) => (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => {
                      setSelectedCropId(crop.id);
                      setSelectedSymptoms([]);
                      setDiagnosisResult(null);
                      setHasSearched(false);
                    }}
                    className={`p-3 rounded-2xl text-left border text-xs sm:text-sm font-medium transition ${
                      selectedCropId === crop.id
                        ? 'bg-farm-600 text-white border-farm-600 shadow-sm'
                        : 'bg-slate-50 hover:bg-farm-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span className="block font-bold">
                      {lang === 'te' ? crop.nameTe : crop.nameEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Affected Plant Part */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                {t.plantDoctor.affectedPart}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'leaf', label: t.plantDoctor.partLeaf },
                  { id: 'stem', label: t.plantDoctor.partStem },
                  { id: 'fruit', label: t.plantDoctor.partFruit },
                  { id: 'root', label: t.plantDoctor.partRoot },
                ].map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => {
                      setSelectedPart(part.id as any);
                      setSelectedSymptoms([]);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                      selectedPart === part.id
                        ? 'bg-farm-600 text-white border-farm-600'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    {part.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Symptom Questionnaire */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                {t.plantDoctor.step3}
              </label>
              <div className="space-y-2">
                {getAvailableSymptoms().map((symptom) => {
                  const isChecked = selectedSymptoms.includes(symptom.id);
                  return (
                    <label
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer select-none transition ${
                        isChecked
                          ? 'bg-farm-50 border-farm-500 text-farm-900 ring-1 ring-farm-500'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-farm-600 focus:ring-farm-500 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm font-medium">
                        {lang === 'te' ? symptom.labelTe : symptom.labelEn}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Diagnose Action Button */}
            <button
              onClick={handleDiagnose}
              className="w-full py-3.5 px-6 rounded-2xl bg-farm-600 hover:bg-farm-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-md shadow-farm-600/30 flex items-center justify-center space-x-2 transition"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t.plantDoctor.diagnoseBtn}</span>
            </button>
          </div>

          {/* Right Column: Photo Upload & Visual Inspector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Camera className="w-4 h-4 text-farm-600" />
                <span>{t.plantDoctor.step2}</span>
              </h3>

              {/* Upload Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />

              {imagePreview ? (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-300 aspect-video bg-black flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Crop preview"
                      className="max-h-full max-w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 hover:bg-black/90 text-white text-xs font-semibold rounded-lg backdrop-blur"
                    >
                      {lang === 'te' ? 'ఫోటో మార్చండి' : 'Change Photo'}
                    </button>
                  </div>

                  {/* Canvas Visual Scanner Metrics */}
                  {imageAnalysis && (
                    <div className="bg-white p-3.5 rounded-2xl border border-farm-200 space-y-2">
                      <span className="text-xs font-bold text-farm-900 block flex items-center justify-between">
                        <span>{t.plantDoctor.colorAnalysis}</span>
                        <span className="text-[10px] text-slate-500 font-normal">HTML5 Client-side</span>
                      </span>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between items-center text-slate-600">
                          <span>{t.plantDoctor.greenCoverage}:</span>
                          <span className="font-bold text-farm-700">{imageAnalysis.greenPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-farm-500 h-full rounded-full"
                            style={{ width: `${imageAnalysis.greenPercentage}%` }}
                          />
                        </div>

                        <div className="flex justify-between items-center text-slate-600 pt-1">
                          <span>{t.plantDoctor.chlorosisDetected}:</span>
                          <span className="font-bold text-amber-600">{imageAnalysis.yellowChlorosisPercentage}%</span>
                        </div>

                        <div className="flex justify-between items-center text-slate-600">
                          <span>{t.plantDoctor.necrosisDetected}:</span>
                          <span className="font-bold text-rose-600">{imageAnalysis.brownNecrosisPercentage}%</span>
                        </div>
                      </div>

                      {imageAnalysis.hasAbnormality && (
                        <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl mt-1 border border-amber-200">
                          {lang === 'te' 
                            ? 'గమనిక: ఆకుపై సహజం కాని పసుపు లేదా గోధుమ రంగు మచ్చలు కనిపించాయి. కింద ఇచ్చిన నివారణలను పరిశీలించండి.' 
                            : 'Note: Visual discoloration / lesion tones detected on leaf surface.'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-farm-500 rounded-2xl p-6 text-center cursor-pointer bg-white transition hover:bg-farm-50/50"
                >
                  <div className="w-12 h-12 rounded-full bg-farm-100 text-farm-600 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="block text-xs sm:text-sm font-bold text-slate-800">
                    {t.plantDoctor.uploadBtn}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">
                    {t.plantDoctor.noPhotoYet}
                  </span>
                </div>
              )}

              {/* Expert Help Box */}
              <div className="mt-4 p-3.5 rounded-2xl bg-farm-50 border border-farm-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-farm-600" />
                  <span className="text-farm-950 font-semibold">
                    {lang === 'te' ? 'ఉచిత కిసాన్ సలహా:' : 'Free Kisan Helpline:'} 1800-180-1551
                  </span>
                </div>
                <a
                  href="tel:18001801551"
                  className="px-2.5 py-1 bg-farm-600 text-white rounded-lg font-bold text-[11px]"
                >
                  {lang === 'te' ? 'కాల్' : 'Call'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis Results Display */}
        {hasSearched && (
          <div className="mt-8 pt-8 border-t border-slate-200">
            {diagnosisResult ? (
              <div className="bg-slate-50 rounded-3xl p-5 sm:p-7 border border-slate-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-farm-700">
                      {t.plantDoctor.diagnosisResult}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      {lang === 'te' ? diagnosisResult.diseaseNameTe : diagnosisResult.diseaseNameEn}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 text-xs font-extrabold rounded-full ${
                        diagnosisResult.severity === 'high'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {diagnosisResult.severity === 'high' ? '⚠️ High Severity' : '⚡ Moderate Severity'}
                    </span>
                  </div>
                </div>

                {/* Symptoms description */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide mb-2">
                    {lang === 'te' ? 'గుర్తించబడిన లక్షణాలు:' : 'Observed Symptoms:'}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                    {(lang === 'te' ? diagnosisResult.symptomsTe : diagnosisResult.symptomsEn).map((sym, idx) => (
                      <li key={idx}>{sym}</li>
                    ))}
                  </ul>
                </div>

                {/* Two Column Remedies: Organic vs Recommended Chemical */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Organic / Natural Remedy */}
                  <div className="bg-emerald-50/70 border border-emerald-300 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm sm:text-base mb-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span>{t.plantDoctor.organicRemedy}</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                      {(lang === 'te' ? diagnosisResult.organicTreatmentTe : diagnosisResult.organicTreatmentEn).map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chemical / Integrated Remedy */}
                  <div className="bg-blue-50/70 border border-blue-300 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center space-x-2 text-blue-800 font-bold text-sm sm:text-base mb-3">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      <span>{t.plantDoctor.chemicalRemedy}</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-blue-950">
                      {(lang === 'te' ? diagnosisResult.chemicalTreatmentTe : diagnosisResult.chemicalTreatmentEn).map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-blue-600 font-bold">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Prevention tips */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    {t.plantDoctor.prevention}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                    {(lang === 'te' ? diagnosisResult.preventiveMeasuresTe : diagnosisResult.preventiveMeasuresEn).map((prev, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-slate-400">•</span>
                        <span>{prev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <p className="text-sm font-medium text-amber-800">
                  {t.plantDoctor.noMatch}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
