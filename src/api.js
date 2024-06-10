import axios from 'axios';

export const fetchWeather = async (location) => {
  if (!location || location.trim() === '') {
    throw new Error('Ubicación inválida');
  }

  const apiKey = 'deae4c2d9d1b4283afb184648240806';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    throw new Error('Error al obtener los datos del clima');
  }
};
export const fetchNews = async (category = '') => {
  const apiKey = '8ea83c1f71b744a9a8011e192191fc69';
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=${category}`;
  const response = await axios.get(url);
  
  if (response.status !== 200) {
    throw new Error('Error fetching news data');
  }

  return response.data.articles;
};
