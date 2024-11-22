// src/components/ForecastDisplay.js
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const ForecastDisplay = ({ forecast, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  // Filter out the forecasts to show once per day at 12:00 PM
  const forecastDays = forecast.filter((reading) => reading.dt_txt.includes('12:00:00'));

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      {forecastDays.map((day, index) => (
        <Card key={index} sx={{ minWidth: 100, textAlign: 'center', margin: 1 }}>
          <CardContent>
            <Typography variant="h6">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              Temp: {day.main.temp}{tempUnit}
            </Typography>
            <Typography variant="body2">{day.weather[0].description}</Typography>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="weather icon"
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ForecastDisplay;
