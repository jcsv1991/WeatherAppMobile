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
          <Text>
            Temp: {day.main.temp}
            {tempUnit}
          </Text>
          <Text>{day.weather[0].description}</Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png` }}
            style={styles.icon}
          />
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
    width: 100,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  date: {
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ForecastDisplay;
