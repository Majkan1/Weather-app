import { WeatherCurrent } from '../types';

export function getIcon(current: WeatherCurrent | null): string {
  if (!current) return 'not-available.svg';
  if (current.wind_speed_10m >= 40) return 'wind.svg';

  const isDay = current.is_day ? '-day' : '-night';
  const code = current.weather_code;

  if (code === 0) return `clear${isDay}.svg`;
  if (code <= 3) return `overcast${isDay}.svg`;
  if (code === 45 || code === 48) return `fog${isDay}.svg`;
  if (code >= 51 && code <= 67) return 'rain.svg';
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow.svg';
  if (code >= 95 && code <= 99) return `thunderstorms${isDay}.svg`;

  return 'not-available.svg';
}

export function getIconAlt(current: WeatherCurrent | null): string {
  const filename = getIcon(current);
  return filename.replace('.svg', '').replace(/-/g, ' ');
}