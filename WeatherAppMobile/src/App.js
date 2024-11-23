import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Weather from './components/Weather';

function App() {
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // Optional: fetchWeather can be a function here, or you can define it in Weather.js
  const fetchWeather = async () => {
    console.log('Fetching weather data...');
  };

  return (
    <View style={styles.container}>
      <Weather
        setCity={setCity}
        setCountryCode={setCountryCode}
        fetchWeather={fetchWeather}
        setWeatherData={setWeatherData}
        setError={setError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
