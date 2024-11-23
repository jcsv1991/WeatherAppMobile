// src/components/SearchBar.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import axios from 'axios';

const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = '9c254e7ed6ff0c89bf7252f6068a5bd2';

const SearchBar = ({ setCity, setCountryCode, fetchWeather, setError, setWeatherData }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

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
            response.data.map((place, index) => ({
              id: `${place.name}-${place.country}-${index}`, // Ensure uniqueness by appending an index
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
    setSelectedCity(item);
    setCity(item.city);
    setCountryCode(item.countryCode);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (selectedCity) {
      fetchWeather();
    } else {
      setError('Please select a city from the list.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(text) => handleInputChange(text)}
        placeholder="Enter city name"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="done"
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id} // Use the unique ID as the key
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelection(item)}
              style={styles.suggestionItem}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      )}
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  suggestionsList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SearchBar;
