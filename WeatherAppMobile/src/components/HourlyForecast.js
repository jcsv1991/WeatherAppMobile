// src/components/HourlyForecast.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const HourlyForecast = ({ hourly, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  // Filter out the first 8 items to represent the next 24 hours
  const hourlyData = hourly.slice(0, 8);

  return (
    <ScrollView horizontal style={styles.scrollContainer}>
      {hourlyData.map((hour, index) => (
        <Card key={index} style={styles.card}>
          <Text style={styles.time}>
            {new Date(hour.dt * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`,
            }}
            style={styles.icon}
          />
          <Text style={styles.temp}>
            {hour.main.temp}
            {tempUnit}
          </Text>
          <Text style={styles.description}>{hour.weather[0].description}</Text>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 10,
  },
  card: {
    width: 100,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
  },
  time: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  temp: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HourlyForecast;
