import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Componente de botón personalizado con parámetros fijos
const Mainboton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      style={styles.button} // Usamos los estilos fijos
      onPress={onPress}
    >
      <Text style={[styles.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Estilos fijos para el botón
const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 15,  // Bordes redondeados
    borderWidth: 2,    // Borde visible
    borderColor: '#A91D3A', // Color del borde
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A91D3A', // Color de texto fijo (rojo)
  },
});

export default Mainboton;