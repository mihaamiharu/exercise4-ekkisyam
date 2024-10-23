const API_KEY = '3b2444ab89c51df1c62c0269aae8f678';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export function fetchWeather(city) {
  return fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`)
    .then(response => {
          if (!response.ok) {
              throw new Error('Weather data not found');
          }
          return response.json();
      })
      .then(data => data)
      .catch(error => {
          console.error('Error fetching weather data:', error);
          return { cod: '404', message: error.message };
    });
}