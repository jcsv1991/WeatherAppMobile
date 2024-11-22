// src/components/HourlyForecast.js
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const HourlyForecast = ({ hourly, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  // Filter out the first 8 items to represent the next 24 hours
  const hourlyData = hourly.slice(0, 8);

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      {hourlyData.map((hour, index) => (
        <Card key={index} sx={{ minWidth: 100, textAlign: 'center', margin: 1 }}>
          <CardContent>
            <Typography variant="h6">
              {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            <Typography variant="body1">
              Temp: {hour.main.temp}{tempUnit}
            </Typography>
            <Typography variant="body2">{hour.weather[0].description}</Typography>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt="weather icon"
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HourlyForecast;
