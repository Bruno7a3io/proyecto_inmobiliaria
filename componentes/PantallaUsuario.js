// PantallaRegistro.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PantallaUsuario = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil de Usuario</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // color de fondo opcional
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PantallaUsuario;
