export type Language = 'en' | 'te';

export type NavigationTab = 
  | 'dashboard'
  | 'weather'
  | 'plant-doctor'
  | 'crop-advisor'
  | 'smart-watering'
  | 'chatbot'
  | 'fertilizer'
  | 'calendar'
  | 'cost-calculator';

export type SoilType = 'black' | 'red' | 'alluvial' | 'sandy' | 'clay';

export type Season = 'kharif' | 'rabi' | 'zaid' | 'all_year';

export type IrrigationType = 'rainfed' | 'borewell' | 'canal' | 'drip' | 'sprinkler';

export interface LocationCoordinates {
  name: string;
  nameTe: string;
  state: string;
  stateTe: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  weatherCode: number;
  weatherDescription: string;
  weatherDescriptionTe: string;
  precipitation: number;
  isDay: boolean;
  uvIndex?: number;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  precipitationProbability: number;
  precipitationSum: number;
  weatherCode: number;
  weatherDescription: string;
  weatherDescriptionTe: string;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  locationName: string;
  locationNameTe: string;
  fetchedAt: string;
}

export interface CropInfo {
  id: string;
  nameEn: string;
  nameTe: string;
  category: 'cereal' | 'pulse' | 'cash_crop' | 'oilseed' | 'vegetable';
  suitableSoils: SoilType[];
  seasons: Season[];
  durationDays: string;
  waterRequirement: 'low' | 'medium' | 'high';
  expectedYieldPerAcre: string;
  approxMspPerQuintal: number; // in INR
  descriptionEn: string;
  descriptionTe: string;
  sowingTipsEn: string[];
  sowingTipsTe: string[];
  companionCropsEn: string[];
  companionCropsTe: string[];
}

export interface DiseaseInfo {
  id: string;
  cropId: string;
  cropNameEn: string;
  cropNameTe: string;
  diseaseNameEn: string;
  diseaseNameTe: string;
  symptomsEn: string[];
  symptomsTe: string[];
  organicTreatmentEn: string[];
  organicTreatmentTe: string[];
  chemicalTreatmentEn: string[];
  chemicalTreatmentTe: string[];
  preventiveMeasuresEn: string[];
  preventiveMeasuresTe: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface CalendarTask {
  id: string;
  titleEn: string;
  titleTe: string;
  cropNameEn?: string;
  cropNameTe?: string;
  date: string; // YYYY-MM-DD
  category: 'sowing' | 'irrigation' | 'fertilizer' | 'pesticide' | 'weeding' | 'harvest' | 'general';
  isCompleted: boolean;
  notes?: string;
}

export interface CostCalculation {
  landPreparation: number;
  seeds: number;
  fertilizers: number;
  pesticides: number;
  irrigation: number;
  labor: number;
  machinery: number;
  transport: number;
  other: number;
  expectedYieldQuintals: number;
  sellingPricePerQuintal: number;
}
