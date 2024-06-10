import { useState, useEffect, useCallback } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Weather from './components/Weather';
import News from './components/News';
import Preferences from './components/Preferences';
import withErrorHandling from './withErrorHandling';
import { fetchWeather, fetchNews } from './api';
import './App.css';

const WeatherWithErrorHandling = withErrorHandling(Weather);
const NewsWithErrorHandling = withErrorHandling(News);

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [preferences, setPreferences] = useState({
    location: 'New York',
    categories: [ 'business']
  });
  const { enqueueSnackbar } = useSnackbar();

  const fetchWeatherData = useCallback(async () => {
    try {
      const data = await fetchWeather(preferences.location);
      setWeatherData(data);
    } catch (error) {
      enqueueSnackbar('Error al obtener los datos del clima', { variant: 'error' });
    }
  }, [preferences.location, enqueueSnackbar]);

  const fetchNewsData = useCallback(async () => {
    try {
      const data = await fetchNews(preferences.categories);
      setNewsData(data);
    } catch (error) {
      enqueueSnackbar('Error al obtener los datos de noticias', { variant: 'error' });
    }
  }, [preferences.categories,enqueueSnackbar]);

  useEffect(() => {
    fetchWeatherData();
    fetchNewsData();
    const interval = setInterval(() => {
      fetchWeatherData();
      fetchNewsData();
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchWeatherData, fetchNewsData]);

  return (
    <SnackbarProvider maxSnack={2}>
      <div>
        <div style={{backgroundImage:`url('https://th.bing.com/th/id/OIG3.WR_HzGmPDribsV7FaLxA?pid=ImgGn')`}}className='weather-container'>
        <h1> Clima</h1>
      
        <WeatherWithErrorHandling data={weatherData} />
        </div> 
        <div className='news-container'  style={{backgroundImage:`url('https://i.pinimg.com/564x/20/e8/5c/20e85c8e94cd4c6b12c980c377db7973.jpg')`}}>
      <h1> Noticias</h1>
      <Preferences preferences={preferences} setPreferences={setPreferences} />
      <NewsWithErrorHandling data={newsData} preferences={preferences} />
      </div>
      </div>
      
    </SnackbarProvider>
  );
}

export default App;
