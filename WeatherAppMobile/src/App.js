// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Weather from './components/Weather';

function App() {
  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take the full screen
  },
});

export default App;
