// src/components/SearchBar.js
import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import axios from 'axios';

const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const API_KEY = '9c254e7ed6ff0c89bf7252f6068a5bd2'; // Replace with your actual API key

const SearchBar = ({ setCity, setCountryCode, fetchWeather, setError, setWeatherData }) => { // Add setWeatherData prop
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event, value) => {
    const inputValue = value || event.target.value;
    setInput(inputValue);

    // If input is empty, reset suggestions and stop further processing
    if (!inputValue || inputValue.trim() === '') {
      setSuggestions([]); // Clear suggestions when input is empty
      setError(''); // Clear any existing errors
      setCity(''); // Clear city when input is cleared
      setCountryCode(''); // Clear countryCode when input is cleared
      setWeatherData(null); // Clear weather data when input is cleared
      return;
    }

    // If input length is greater than 2, fetch suggestions
    if (inputValue.length > 2) {
      try {
        const response = await axios.get(
          `${GEOCODING_URL}?q=${inputValue}&limit=5&appid=${API_KEY}`
        );
        if (response.data && response.data.length > 0) {
          setSuggestions(response.data.map((place) => ({
            label: `${place.name}, ${place.country}`,
            city: place.name,
            countryCode: place.country
          })));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]); // Ensure no suggestions on error
      }
    }
  };

  const handleSelection = (event, value) => {
    if (value) {
      setCity(value.city);
      setCountryCode(value.countryCode); // Set country code
      setError(''); // Clear error when valid location is selected
      fetchWeather(); // Trigger weather fetch immediately after selection
    } else {
      setCity(''); // Reset city if selection is cleared
      setCountryCode(''); // Reset country code
      setWeatherData(null); // Clear weather data when no city is selected
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
      <Autocomplete
        options={suggestions}
        getOptionLabel={(option) => option.label} // Show city, country
        onInputChange={handleInputChange}
        onChange={handleSelection}
        clearOnEscape // Clear input on escape
        renderInput={(params) => (
          <TextField {...params} label="City" variant="outlined" value={input} />
        )}
        sx={{ marginRight: 2, width: 300 }}
      />
      <Button variant="contained" onClick={fetchWeather} disabled={!input || !input.trim()}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
