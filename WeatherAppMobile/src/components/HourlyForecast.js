// src/components/HourlyForecast.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const HourlyForecast = ({ hourly, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  // Filter out the first 8 items to represent the next 24 hours
  const hourlyData = hourly.slice(0, 8);

  return (
    <View style={styles.container}>
      {hourlyData.map((hour, index) => (
        <Card key={index} style={styles.card}>
          <Text style={styles.time}>
            {new Date(hour.dt * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text>
            Temp: {hour.main.temp}
            {tempUnit}
          </Text>
          <Text>{hour.weather[0].description}</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`,
            }}
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
  time: {
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default HourlyForecast;
