// src/components/ErrorHandling.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorHandling = ({ error }) => {
  if (!error) {
    // If no error, don't render anything
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error: {error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, // Adds some spacing around the error message
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ErrorHandling;
