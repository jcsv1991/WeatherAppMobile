// src/components/Weather.js
import React, { useState, useEffect, useCallback } from 'react';
import { getWeather } from '../api/weatherApi';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import Loader from './Loader';
import ErrorHandling from './ErrorHandling';
import ForecastDisplay from './ForecastDisplay';
import HourlyForecast from './HourlyForecast';
import { Fade, ButtonGroup, Button, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';

const Weather = () => {
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [units, setUnits] = useState('metric'); // metric for Celsius, imperial for Fahrenheit
  const [forecastType, setForecastType] = useState('hourly'); // New state for forecast toggle

  const fetchWeather = useCallback(async () => {
    // Don't fetch weather if city or countryCode is empty
    if (!city || !countryCode) {
      setError('Please select a valid location.');
      return;
    }

    setLoading(true);
    setError(''); // Reset error before making the API call
    const data = await getWeather(city, countryCode, units); // Pass units when fetching
    if (data) {
      setWeatherData(data);
      setError(''); // Clear the error after successful fetch
    } else {
      setError('Unable to fetch weather data. Please try again.');
    }
    setLoading(false);
  }, [city, countryCode, units]); // Re-fetch when units change

  useEffect(() => {
    if (city && countryCode) {
      fetchWeather(); // Fetch weather for the selected city on mount
    }
  }, [fetchWeather, city, countryCode]);

  const handleUnitChange = (newUnit) => {
    setUnits(newUnit); // Update units when switching
    fetchWeather(); // Refetch weather data after unit change
  };

  const handleForecastToggle = (event, newType) => {
    if (newType) {
      setForecastType(newType); // Toggle between 'hourly' and 'daily'
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <SearchBar
        setCity={setCity}
        setCountryCode={setCountryCode}
        fetchWeather={fetchWeather}
        setError={setError}
        setWeatherData={setWeatherData} // Pass setWeatherData to SearchBar
      />
      <Box mt={2}>
        <ButtonGroup>
          <Button onClick={() => handleUnitChange('metric')} variant={units === 'metric' ? 'contained' : 'outlined'}>
            Celsius
          </Button>
          <Button onClick={() => handleUnitChange('imperial')} variant={units === 'imperial' ? 'contained' : 'outlined'}>
            Fahrenheit
          </Button>
        </ButtonGroup>
      </Box>

      <Box mt={2}>
        <ToggleButtonGroup
          value={forecastType}
          exclusive
          onChange={handleForecastToggle}
          aria-label="forecast toggle"
        >
          <ToggleButton value="hourly" aria-label="hourly forecast">
            24-Hour Forecast
          </ToggleButton>
          <ToggleButton value="daily" aria-label="5-day forecast">
            5-Day Forecast
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <ErrorHandling error={error} />
      {loading ? (
        <Loader />
      ) : (
        <Fade in={!loading} timeout={1000}>
          <div>
            {weatherData && (
              <>
                <WeatherDisplay weather={weatherData?.list[0]} city={city} countryCode={countryCode} units={units} /> {/* Display current weather */}
                {forecastType === 'hourly' ? (
                  <HourlyForecast hourly={weatherData?.list} units={units} /> // 24-hour forecast
                ) : (
                  <ForecastDisplay forecast={weatherData?.list} units={units} /> // 5-day forecast
                )}
              </>
            )}
          </div>
        </Fade>
      )}
    </div>
  );
};

export default Weather;
