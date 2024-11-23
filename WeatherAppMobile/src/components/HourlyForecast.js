// src/components/HourlyForecast.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const HourlyForecast = ({ hourly, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  // Filter out the first 8 items to represent the next 24 hours
  const hourlyData = hourly.slice(0, 8);

  return (
    <ScrollView horizontal style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
      {hourlyData.map((hour, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.time}>
            {new Date(hour.dt * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
            }}
            style={styles.icon}
          />
          <Text style={styles.temp}>
            {hour.main.temp.toFixed(1)}
            {tempUnit}
          </Text>
          <Text style={styles.description}>{hour.weather[0].description}</Text>
        </View>
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
    height: 130, // Adjusted height to properly align the lower border
    marginHorizontal: 8,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Match the 5-day forecast card background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  time: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 12,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  temp: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HourlyForecast;
