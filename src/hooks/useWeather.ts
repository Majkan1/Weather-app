import { useState, useEffect } from 'react';
import { WeatherData } from '../types';

export function useWeather(city: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!city) {
        setWeather(null);
        return;
      }
      fetchWeather();
    },500);

    async function fetchWeather() {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );
        const geoData = await geoRes.json();
        const location = geoData.results?.[0];

        if (!location) {
          setWeather(null);
          return;
        }

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m,precipitation,weather_code,is_day&timezone=auto`
        );
        const weatherData = await weatherRes.json();

        setWeather({
          placeName: location.name,
          admin1: location.admin1,
          country: location.country,
          current: weatherData.current,
          units: weatherData.current_units
        });
      } catch (error) {
        console.error('Failed to fetch weather data', error);
        setWeather(null);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [city]);

  return weather;
}