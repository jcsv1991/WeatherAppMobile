// src/components/Weather.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getWeather } from '../api/weatherApi';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import Loader from './Loader';
import ErrorHandling from './ErrorHandling';
import ForecastDisplay from './ForecastDisplay';
import HourlyForecast from './HourlyForecast';

const Weather = () => {
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [units, setUnits] = useState('metric'); // Default to 'metric' (Celsius)
  const [forecastType, setForecastType] = useState('hourly'); // Default to 'hourly' (24-Hour Forecast)
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch weather data
  const fetchWeather = async (overrideUnits = units) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city, countryCode, overrideUnits);
      if (data) {
        setWeatherData(data);
      } else {
        setError('Failed to fetch weather data.');
      }
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle unit change
  const handleUnitChange = async (unit) => {
    if (units !== unit) {
      setUnits(unit);
      await fetchWeather(unit); // Refetch weather data with updated units
    }
  };

  // Handle forecast type change
  const handleForecastTypeChange = (type) => {
    if (forecastType !== type) {
      setForecastType(type);
    }
  };

  // Handle city search and ensure data matches current unit
  const handleCitySearch = (city, countryCode) => {
    setCity(city);
    setCountryCode(countryCode);
    fetchWeather(units); // Fetch weather data for the selected city with the current unit
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>
      <SearchBar
        setCity={setCity}
        setCountryCode={setCountryCode}
        fetchWeather={() => handleCitySearch(city, countryCode)}
        setError={setError}
        setWeatherData={setWeatherData}
      />
      {/* Unit Toggle Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => handleUnitChange('metric')}
          style={[
            styles.button,
            units === 'metric' ? styles.activeButton : styles.inactiveButton,
          ]}
        >
          <Text style={styles.buttonText}>Celsius</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleUnitChange('imperial')}
          style={[
            styles.button,
            units === 'imperial' ? styles.activeButton : styles.inactiveButton,
          ]}
        >
          <Text style={styles.buttonText}>Fahrenheit</Text>
        </TouchableOpacity>
      </View>
      {/* Forecast Type Toggle Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => handleForecastTypeChange('hourly')}
          style={[
            styles.button,
            forecastType === 'hourly' ? styles.activeButton : styles.inactiveButton,
          ]}
        >
          <Text style={styles.buttonText}>24-Hour Forecast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleForecastTypeChange('daily')}
          style={[
            styles.button,
            forecastType === 'daily' ? styles.activeButton : styles.inactiveButton,
          ]}
        >
          <Text style={styles.buttonText}>5-Day Forecast</Text>
        </TouchableOpacity>
      </View>
      {/* Error Handling */}
      <ErrorHandling error={error} />
      {/* Weather Display */}
      {loading ? (
        <Loader />
      ) : (
        weatherData && (
          <>
            <WeatherDisplay
              weather={weatherData?.list[0]}
              city={city}
              countryCode={countryCode}
              units={units}
            />
            {forecastType === 'hourly' ? (
              <HourlyForecast hourly={weatherData?.list} units={units} />
            ) : (
              <ForecastDisplay forecast={weatherData?.list} units={units} />
            )}
          </>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6a0dad',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeButton: {
    backgroundColor: '#6a0dad', // Purple background for active state
  },
  inactiveButton: {
    backgroundColor: '#fff', // White background for inactive state
  },
  buttonText: {
    color: '#000', // Black text for all buttons
    textAlign: 'center',
  },
});

export default Weather;
