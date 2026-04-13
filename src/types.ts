export interface WeatherCurrent {
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  is_day: number;
  precipitation: number;
}

export interface WeatherUnits {
  temperature_2m: string;
  wind_speed_10m: string;
}

export interface WeatherData {
  placeName: string;
  admin1: string;
  country: string;
  current: WeatherCurrent;
  units: WeatherUnits;
}