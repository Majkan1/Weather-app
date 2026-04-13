import { useWeather } from '../hooks/useWeather';
import { getIcon, getIconAlt } from '../utils/getIcon';

export default function WeatherCard({ city }: { city: string }) {
  const weather = useWeather(city);

  if (!city || !weather) return null;

  const iconUrl = new URL(`../assets/all/${getIcon(weather.current)}`, import.meta.url).href;
  const thermometerUrl = new URL('../assets/all/thermometer.svg', import.meta.url).href;
  const windUrl = new URL('../assets/all/wind.svg', import.meta.url).href;

  return (
    <section className="card" aria-label="Weather result">
      <div className="cardHeader">
        <img
          className="weatherIcon"
          src={iconUrl}
          alt={getIconAlt(weather.current)}
        />
        <div className="placeBlock">
          <div className="placeLabel">City</div>
          <div className="place">
            {[weather.placeName, weather.admin1, weather.country].filter(Boolean).join(', ')}
          </div>
        </div>
      </div>

      <dl className="metrics">
        <div className="metric">
          <img className="metricIcon" src={thermometerUrl} alt="" aria-hidden="true" />
          <dt className="metricLabel">Temperature</dt>
          <dd className="metricValue">
            {weather.current.temperature_2m}{weather.units.temperature_2m}
          </dd>
        </div>
        <div className="metric">
          <img className="metricIcon" src={windUrl} alt="" aria-hidden="true" />
          <dt className="metricLabel">Wind</dt>
          <dd className="metricValue">
            {weather.current.wind_speed_10m}{weather.units.wind_speed_10m}
          </dd>
        </div>
      </dl>
    </section>
  );
}