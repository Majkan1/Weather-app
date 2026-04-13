import { useState } from 'react';
import './App.css';
import Main from './components/Main';
import WeatherCard from './components/WeatherCard';

export default function App() {
  const [city, setCity] = useState('');

  return (
    <div className="app">
      <div className="panel">
        <Main city={city} setCity={setCity} />
        <div aria-live="polite" aria-atomic="true">
          <WeatherCard city={city} />
        </div>
      </div>
    </div>
  );
}