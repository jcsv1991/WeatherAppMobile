
// src/api/weatherApi.js
import axios from 'axios';

const API_KEY = '9c254e7ed6ff0c89bf7252f6068a5bd2'; // Replace with your actual API key
const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'; // 5 Day / 3 Hour Forecast API

export const getWeather = async (city, countryCode, units = 'metric') => {
  try {
    // Step 1: Use Geocoding API to get latitude and longitude
    const geoResponse = await axios.get(`${GEOCODING_URL}?q=${city},${countryCode}&appid=${API_KEY}`);
    
    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error('Could not fetch coordinates for the city.');
    }

    const { lat, lon } = geoResponse.data[0]; // Extract latitude and longitude
    console.log(`Coordinates for ${city}: lat=${lat}, lon=${lon}`);

    // Step 2: Use 5 Day / 3 Hour Forecast API to get weather data
    const forecastResponse = await axios.get(
      `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );

    console.log('Weather Data:', forecastResponse.data);
    return forecastResponse.data; // Return weather data, including hourly
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
};