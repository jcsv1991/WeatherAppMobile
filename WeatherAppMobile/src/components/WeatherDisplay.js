// src/components/WeatherDisplay.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const WeatherDisplay = ({ weather, city, countryCode, units }) => {
  if (!weather) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.city}>
          {city}, {countryCode}
        </Text>
        <Text style={styles.description}>{weather.weather[0].description}</Text>
        <Text style={styles.temperature}>
          Temperature: {weather.main.temp}
          {tempUnit}
        </Text>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
          style={styles.icon}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    padding: 20,
    alignItems: 'center',
    width: '90%',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  temperature: {
    fontSize: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default WeatherDisplay;
