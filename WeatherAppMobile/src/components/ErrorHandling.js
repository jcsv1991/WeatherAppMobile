// src/components/ErrorHandling.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorHandling = ({ error }) => {
  return (
    <View>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default ErrorHandling;
