import { useState } from 'react';
//import PropTypes from 'prop-types';
import { fetchWeather } from '../api'; 

function Weather() {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async () => {
    if (!location.trim()) {
      setError('Por favor, ingrese una ubicación válida.');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchWeather(location);
      setWeatherData(data);

    } finally {
      setLoading(false);
    }
    setError(null);

  };

  return (
    <div>
      <h2>Búsqueda de Clima</h2>
      <div>
        <input style={{backgroundColor:"white", borderRadius:5 }} type="text" value={location} onChange={handleLocationChange} placeholder="Ingrese una Ciudad" />
        <button  style={{alignItems: "center", marginLeft:34, backgroundColor:"lightblue"}}onClick={handleSearch} disabled={loading}>
          Buscar
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Cargando...</p>}
      {weatherData && (
        <div style={{color:"black"}}>
          <h3>Clima en {weatherData.location.name}</h3>
          <p>Temperatura: {weatherData.current.temp_c}°C</p>
          <p>Humedad: {weatherData.current.humidity}%</p>
          <p>Viento: {weatherData.current.wind_kph} km/h</p>
          <p>Condición: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}


export default Weather;
