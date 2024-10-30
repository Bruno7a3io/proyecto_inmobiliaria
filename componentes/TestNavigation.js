// componentes/TestNavigation.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const TestNavigation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Go to Consult" onPress={() => navigation.navigate('Consult')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestNavigation;
