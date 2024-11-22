// src/components/ForecastDisplay.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const ForecastDisplay = ({ forecast, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  const forecastDays = forecast.filter((reading) => reading.dt_txt.includes('12:00:00'));

  return (
    <View style={styles.container}>
      {forecastDays.map((day, index) => (
        <Card key={index} style={styles.card}>
          <Text style={styles.date}>{new Date(day.dt * 1000).toLocaleDateString()}</Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png` }}
            style={styles.icon}
          />
          <Text style={styles.temp}>
            {day.main.temp}
            {tempUnit}
          </Text>
          <Text style={styles.description}>{day.weather[0].description}</Text>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  card: {
    width: 120,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ForecastDisplay;
