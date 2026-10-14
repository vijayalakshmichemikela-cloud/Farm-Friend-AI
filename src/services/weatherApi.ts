import { LocationCoordinates, WeatherData, CurrentWeather, DailyForecast } from '../types';

export const AGRICULTURAL_DISTRICTS: LocationCoordinates[] = [
  { name: 'Guntur', nameTe: 'గుంటూరు', state: 'Andhra Pradesh', stateTe: 'ఆంధ్రప్రదేశ్', lat: 16.3067, lon: 80.4365 },
  { name: 'Warangal', nameTe: 'వరంగల్', state: 'Telangana', stateTe: 'తెలంగాణ', lat: 17.9689, lon: 79.5941 },
  { name: 'Kurnool', nameTe: 'కర్నూలు', state: 'Andhra Pradesh', stateTe: 'ఆంధ్రప్రదేశ్', lat: 15.8281, lon: 78.0373 },
  { name: 'Rajahmundry (East Godavari)', nameTe: 'రాజమండ్రి (తూర్పు గోదావరి)', state: 'Andhra Pradesh', stateTe: 'ఆంధ్రప్రదేశ్', lat: 17.0005, lon: 81.8040 },
  { name: 'Vijayawada (Krishna)', nameTe: 'విజయవాడ (కృష్ణా)', state: 'Andhra Pradesh', stateTe: 'ఆంధ్రప్రదేశ్', lat: 16.5062, lon: 80.6480 },
  { name: 'Khammam', nameTe: 'ఖమ్మం', state: 'Telangana', stateTe: 'తెలంగాణ', lat: 17.2473, lon: 80.1514 },
  { name: 'Nizamabad', nameTe: 'నిజామాబాద్', state: 'Telangana', stateTe: 'తెలంగాణ', lat: 18.6725, lon: 78.0941 },
  { name: 'Anantapur', nameTe: 'అనంతపురం', state: 'Andhra Pradesh', stateTe: 'ఆంధ్రప్రదేశ్', lat: 14.6819, lon: 77.6006 },
  { name: 'Belagavi', nameTe: 'బెళగావి', state: 'Karnataka', stateTe: 'కర్ణాటక', lat: 15.8497, lon: 74.4977 },
  { name: 'Pune', nameTe: 'పూణే', state: 'Maharashtra', stateTe: 'మహారాష్ట్ర', lat: 18.5204, lon: 73.8567 },
  { name: 'Ludhiana', nameTe: 'లూధియానా', state: 'Punjab', stateTe: 'పంజాబ్', lat: 30.9010, lon: 75.8573 },
  { name: 'Varanasi', nameTe: 'వారణాసి', state: 'Uttar Pradesh', stateTe: 'ఉత్తరప్రదేశ్', lat: 25.3176, lon: 82.9739 },
];

export function getWeatherConditionDescription(code: number): { en: string; te: string; icon: string } {
  // WMO Weather interpretation codes (WW)
  switch (code) {
    case 0:
      return { en: 'Clear sky', te: 'నిర్మలమైన ఆకాశం', icon: '☀️' };
    case 1:
      return { en: 'Mainly clear', te: 'తేలికపాటి మేఘాలు', icon: '🌤️' };
    case 2:
      return { en: 'Partly cloudy', te: 'పాక్షికంగా మేఘావృతం', icon: '⛅' };
    case 3:
      return { en: 'Overcast', te: 'పూర్తిగా మేఘావృతం', icon: '☁️' };
    case 45:
    case 48:
      return { en: 'Fog / Mist', te: 'పొగమంచు', icon: '🌫️' };
    case 51:
    case 53:
    case 55:
      return { en: 'Drizzle', te: 'చినుకులు', icon: '🌦️' };
    case 61:
      return { en: 'Slight rain', te: 'తేలికపాటి వర్షం', icon: '🌧️' };
    case 63:
      return { en: 'Moderate rain', te: 'మోస్తరు వర్షం', icon: '🌧️' };
    case 65:
      return { en: 'Heavy rain', te: 'భారీ వర్షం', icon: '⛈️' };
    case 80:
    case 81:
    case 82:
      return { en: 'Rain showers', te: 'జల్లులు', icon: '🌦️' };
    case 95:
      return { en: 'Thunderstorm', te: 'ఉరుములతో కూడిన వర్షం', icon: '⚡' };
    case 96:
    case 99:
      return { en: 'Thunderstorm with hail', te: 'వడగండ్ల వాన', icon: '⛈️' };
    default:
      return { en: 'Partly cloudy', te: 'మేఘావృతం', icon: '⛅' };
  }
}

export async function fetchLiveWeather(lat: number, lon: number, locationName?: string, locationNameTe?: string): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open-Meteo API returned status: ${response.status}`);
  }

  const data = await response.json();

  const currentDesc = getWeatherConditionDescription(data.current.weather_code);

  const current: CurrentWeather = {
    temperature: Math.round(data.current.temperature_2m),
    apparentTemperature: Math.round(data.current.apparent_temperature),
    relativeHumidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    weatherCode: data.current.weather_code,
    weatherDescription: currentDesc.en,
    weatherDescriptionTe: currentDesc.te,
    precipitation: data.current.precipitation || 0,
    isDay: Boolean(data.current.is_day),
    uvIndex: data.daily.uv_index_max ? Math.round(data.daily.uv_index_max[0]) : undefined,
  };

  const daily: DailyForecast[] = (data.daily.time || []).map((dateStr: string, idx: number) => {
    const code = data.daily.weather_code[idx];
    const desc = getWeatherConditionDescription(code);
    return {
      date: dateStr,
      maxTemp: Math.round(data.daily.temperature_2m_max[idx]),
      minTemp: Math.round(data.daily.temperature_2m_min[idx]),
      precipitationProbability: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[idx] : 0,
      precipitationSum: data.daily.precipitation_sum ? Number(data.daily.precipitation_sum[idx].toFixed(1)) : 0,
      weatherCode: code,
      weatherDescription: desc.en,
      weatherDescriptionTe: desc.te,
    };
  });

  return {
    current,
    daily,
    locationName: locationName || `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`,
    locationNameTe: locationNameTe || `అక్షాంశం: ${lat.toFixed(2)}, రేఖాంశం: ${lon.toFixed(2)}`,
    fetchedAt: new Date().toISOString(),
  };
}
