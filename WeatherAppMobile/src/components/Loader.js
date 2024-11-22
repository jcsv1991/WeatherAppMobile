// src/components/Loader.js
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#2196F3" />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Loader;
