// src/components/Weather.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { getWeather } from '../api/weatherApi';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import Loader from './Loader';
import ErrorHandling from './ErrorHandling';
import ForecastDisplay from './ForecastDisplay';
import HourlyForecast from './HourlyForecast';

const Weather = () => {
  // ... (same logic as before)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>
      <SearchBar
        setCity={setCity}
        setCountryCode={setCountryCode}
        fetchWeather={fetchWeather}
        setError={setError}
        setWeatherData={setWeatherData}
      />
      <View style={styles.buttonGroup}>
        <Button
          mode={units === 'metric' ? 'contained' : 'outlined'}
          onPress={() => handleUnitChange('metric')}
          style={styles.button}
        >
          Celsius
        </Button>
        <Button
          mode={units === 'imperial' ? 'contained' : 'outlined'}
          onPress={() => handleUnitChange('imperial')}
          style={styles.button}
        >
          Fahrenheit
        </Button>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          mode={forecastType === 'hourly' ? 'contained' : 'outlined'}
          onPress={() => setForecastType('hourly')}
          style={styles.button}
        >
          24-Hour Forecast
        </Button>
        <Button
          mode={forecastType === 'daily' ? 'contained' : 'outlined'}
          onPress={() => setForecastType('daily')}
          style={styles.button}
        >
          5-Day Forecast
        </Button>
      </View>
      <ErrorHandling error={error} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {weatherData && (
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
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff', // Set a default background color
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
  },
});

export default Weather;
