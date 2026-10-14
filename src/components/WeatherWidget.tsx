import React, { useState, useEffect } from 'react';
import { Language, WeatherData, LocationCoordinates } from '../types';
import { translations } from '../translations';
import { AGRICULTURAL_DISTRICTS, fetchLiveWeather } from '../services/weatherApi';
import { 
  CloudRain, 
  Wind, 
  Droplets, 
  Sun, 
  MapPin, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';

interface WeatherWidgetProps {
  lang: Language;
  onWeatherLoaded?: (data: WeatherData) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ lang, onWeatherLoaded }) => {
  const t = translations[lang];

  const [selectedDistrict, setSelectedDistrict] = useState<LocationCoordinates>(AGRICULTURAL_DISTRICTS[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);

  const loadWeather = async (coords: { lat: number; lon: number; nameEn?: string; nameTe?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveWeather(
        coords.lat, 
        coords.lon, 
        coords.nameEn, 
        coords.nameTe
      );
      setWeatherData(data);
      if (onWeatherLoaded) {
        onWeatherLoaded(data);
      }
    } catch (err: any) {
      console.error('Failed to load weather:', err);
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather({
      lat: selectedDistrict.lat,
      lon: selectedDistrict.lon,
      nameEn: `${selectedDistrict.name}, ${selectedDistrict.state}`,
      nameTe: `${selectedDistrict.nameTe}, ${selectedDistrict.stateTe}`
    });
  }, [selectedDistrict]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = AGRICULTURAL_DISTRICTS.find(d => d.name === e.target.value);
    if (found) {
      setSelectedDistrict(found);
    }
  };

  const handleUseGps = () => {
    if (!navigator.geolocation) {
      setError(t.weather.locationError);
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        loadWeather({
          lat,
          lon,
          nameEn: `Your Farm (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`,
          nameTe: `మీ పొలం (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`
        });
      },
      (err) => {
        setGpsLoading(false);
        console.warn('Geolocation error:', err);
        setError(t.weather.locationError);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Determine spraying & irrigation advisory
  const isRainComing = weatherData?.daily?.slice(0, 3).some(d => d.precipitationProbability > 45 || d.precipitationSum > 3);
  const isWindHigh = (weatherData?.current.windSpeed ?? 0) > 18;

  return (
    <div className="space-y-6">
      {/* Title & Location Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-farm-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-farm-950 flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" />
              <span>{t.weather.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.weather.subtitle}
            </p>
          </div>

          {/* Location selector and GPS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <select
                value={selectedDistrict.name}
                onChange={handleDistrictChange}
                className="w-full sm:w-auto appearance-none bg-slate-50 border border-farm-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
              >
                {AGRICULTURAL_DISTRICTS.map((dist) => (
                  <option key={dist.name} value={dist.name}>
                    {lang === 'te' ? `${dist.nameTe} (${dist.stateTe})` : `${dist.name} (${dist.state})`}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-farm-600 absolute right-2.5 top-3.5 pointer-events-none" />
            </div>

            <button
              onClick={handleUseGps}
              disabled={gpsLoading}
              className="flex items-center justify-center space-x-1.5 px-3.5 py-2.5 bg-farm-100 hover:bg-farm-200 text-farm-800 font-semibold text-xs sm:text-sm rounded-xl border border-farm-300 transition"
            >
              <Compass className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
              <span>{gpsLoading ? t.weather.fetchingLocation : t.weather.useGps}</span>
            </button>

            <button
              onClick={() => loadWeather({
                lat: selectedDistrict.lat,
                lon: selectedDistrict.lon,
                nameEn: `${selectedDistrict.name}, ${selectedDistrict.state}`,
                nameTe: `${selectedDistrict.nameTe}, ${selectedDistrict.stateTe}`
              })}
              title="Refresh Weather"
              className="p-2.5 rounded-xl border border-farm-300 text-slate-600 hover:bg-farm-50 transition flex items-center justify-center"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Current Weather Grid */}
        {weatherData && (
          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Main Temp Card */}
              <div className="bg-gradient-to-br from-farm-600 to-farm-700 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-farm-100 font-semibold">
                        {lang === 'te' ? weatherData.locationNameTe : weatherData.locationName}
                      </span>
                      <h3 className="text-4xl sm:text-5xl font-extrabold mt-1">
                        {weatherData.current.temperature}°C
                      </h3>
                      <p className="text-xs sm:text-sm text-farm-100 mt-1">
                        {t.weather.feelsLike} {weatherData.current.apparentTemperature}°C
                      </p>
                    </div>
                    <div className="text-4xl sm:text-5xl">
                      {weatherData.current.weatherCode >= 51 && weatherData.current.weatherCode <= 65 ? '🌧️' : 
                       weatherData.current.weatherCode >= 80 ? '🌦️' : 
                       weatherData.current.weatherCode === 0 ? '☀️' : '⛅'}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-farm-500/50 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {lang === 'te' ? weatherData.current.weatherDescriptionTe : weatherData.current.weatherDescription}
                  </span>
                  <span className="text-xs bg-farm-800/40 px-2.5 py-1 rounded-full border border-farm-400/30">
                    Live Open-Meteo
                  </span>
                </div>
              </div>

              {/* Weather Metrics Card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 text-sky-600">
                    <Droplets className="w-5 h-5" />
                    <span className="text-xs font-semibold text-slate-600">{t.weather.humidity}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {weatherData.current.relativeHumidity}%
                  </p>
                  <span className="text-xs text-slate-500">
                    {weatherData.current.relativeHumidity > 75 
                      ? (lang === 'te' ? 'అధిక తేమ (శిలీంధ్ర తెగుళ్ళపై జాగ్రత్త)' : 'High (Watch for fungal attack)') 
                      : (lang === 'te' ? 'సాధారణ తేమ' : 'Normal')}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 text-teal-600">
                    <Wind className="w-5 h-5" />
                    <span className="text-xs font-semibold text-slate-600">{t.weather.windSpeed}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {weatherData.current.windSpeed} <span className="text-sm font-normal">km/h</span>
                  </p>
                  <span className="text-xs text-slate-500">
                    {isWindHigh 
                      ? (lang === 'te' ? 'తీవ్రమైన గాలి (మందులు కొట్టొద్దు)' : 'Breezy (Do not spray)') 
                      : (lang === 'te' ? 'అనుకూల గాలి' : 'Gentle wind')}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <CloudRain className="w-5 h-5" />
                    <span className="text-xs font-semibold text-slate-600">{t.weather.rainfall}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {weatherData.current.precipitation} <span className="text-sm font-normal">mm</span>
                  </p>
                  <span className="text-xs text-slate-500">
                    {lang === 'te' ? 'గత గంట వర్షపాతం' : 'Past 1h precipitation'}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 text-amber-600">
                    <Sun className="w-5 h-5" />
                    <span className="text-xs font-semibold text-slate-600">UV Index</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {weatherData.current.uvIndex ?? 6} <span className="text-sm font-normal">/ 11</span>
                  </p>
                  <span className="text-xs text-slate-500">
                    {lang === 'te' ? 'గరిష్ట సూర్యకాంతి' : 'Peak sunlight'}
                  </span>
                </div>
              </div>

              {/* Actionable Agricultural Weather Advisory */}
              <div className="bg-farm-50 border border-farm-200 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-farm-900 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-farm-600" />
                    <span>{t.weather.agriAdvisory}</span>
                  </h4>

                  <div className="mt-3 space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-white border border-farm-200 text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-base">{isRainComing || isWindHigh ? '⚠️' : '✅'}</span>
                      <p>
                        {isRainComing || isWindHigh
                          ? t.weather.sprayAdvisoryBad
                          : t.weather.sprayAdvisoryGood}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-farm-200 text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-base">{isRainComing ? '🌧️' : '💧'}</span>
                      <p>
                        {isRainComing 
                          ? t.weather.irrigationAdvisoryRain
                          : t.weather.irrigationAdvisoryDry}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-farm-700 font-medium mt-3">
                  {lang === 'te' 
                    ? 'గమనిక: ఈ సూచనలను పరిగణనలోకి తీసుకుని నీటి తడులు మరియు మందుల పిచికారీ ప్లాన్ చేసుకోండి.' 
                    : 'Note: Plan irrigation and chemical sprays based on these predictive weather insights.'}
                </p>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="mt-8">
              <h3 className="text-base sm:text-lg font-bold text-farm-950 mb-3 flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-farm-600" />
                <span>{t.weather.sevenDayForecast}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {weatherData.daily.map((day, idx) => {
                  const dayDate = new Date(day.date);
                  const dayName = idx === 0 
                    ? (lang === 'te' ? 'ఈ రోజు' : 'Today') 
                    : dayDate.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-US', { weekday: 'short' });
                  const dateFormatted = dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                  return (
                    <div 
                      key={day.date}
                      className={`p-3 rounded-2xl border text-center transition ${
                        idx === 0 
                          ? 'bg-farm-100/70 border-farm-300 shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-farm-300'
                      }`}
                    >
                      <span className="block text-xs font-bold text-slate-700">{dayName}</span>
                      <span className="block text-[11px] text-slate-500 mb-2">{dateFormatted}</span>
                      
                      <div className="text-2xl my-1">
                        {day.weatherCode >= 51 && day.weatherCode <= 65 ? '🌧️' : 
                         day.weatherCode >= 80 ? '🌦️' : 
                         day.weatherCode === 0 ? '☀️' : '⛅'}
                      </div>

                      <div className="text-xs font-semibold text-slate-800 mt-2">
                        {day.maxTemp}° / <span className="text-slate-500 font-normal">{day.minTemp}°</span>
                      </div>

                      <div className="mt-2 text-[11px] text-blue-600 font-medium flex items-center justify-center gap-0.5">
                        <Droplets className="w-3 h-3" />
                        <span>{day.precipitationProbability}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
