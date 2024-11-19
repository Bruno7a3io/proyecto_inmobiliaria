import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Componente de botón personalizado
const Secboton = ({ onPress, title,  disabled }) => {
  return (
    <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]} // Aplica estilos cuando el botón está deshabilitado
    onPress={onPress}
    disabled={disabled} // Deshabilita el botón si 'disabled' es verdadero
    >
     <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#C73659', // Color de fondo
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '100%', // Ancho al 100% del contenedor
      },
      text: {
        color: '#fff', // Color del texto
        fontSize: 16,
        fontWeight: 'bold',
      },
      disabledButton: {
        backgroundColor: '#3D0301', // Color de fondo cuando el botón está deshabilitado
      },
      disabledText: {
        color: '#A0A0A0', // Color del texto cuando el botón está deshabilitado
      },
});

export default Secboton;
