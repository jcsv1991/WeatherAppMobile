// src/components/SearchBar.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';

const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = '9c254e7ed6ff0c89bf7252f6068a5bd2'; 

const SearchBar = ({ setCity, setCountryCode, fetchWeather, setError, setWeatherData }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (value) => {
    setInput(value);

    if (!value.trim()) {
      setSuggestions([]);
      setError('');
      setCity('');
      setCountryCode('');
      setWeatherData(null);
      return;
    }

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${GEOCODING_URL}?q=${value}&limit=5&appid=${API_KEY}`
        );
        if (response.data && response.data.length > 0) {
          setSuggestions(
            response.data.map((place) => ({
              label: `${place.name}, ${place.country}`,
              city: place.name,
              countryCode: place.country,
            }))
          );
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    }
  };

  const handleSelection = (item) => {
    setInput(item.label);
    setCity(item.city);
    setCountryCode(item.countryCode);
    setError('');
    fetchWeather();
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={suggestions}
        defaultValue={input}
        onChangeText={handleInputChange}
        placeholder="City"
        flatListProps={{
          keyExtractor: (item) => item.label,
          renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => handleSelection(item)}>
              <Text style={styles.suggestion}>{item.label}</Text>
            </TouchableOpacity>
          ),
        }}
        inputContainerStyle={styles.inputContainer}
        listContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={fetchWeather}
        disabled={!input.trim()}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    borderColor: '#666',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  listContainer: {
    width: '80%',
    maxHeight: 150,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#eee',
  },
});

export default SearchBar;
