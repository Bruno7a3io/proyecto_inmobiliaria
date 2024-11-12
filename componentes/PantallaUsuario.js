import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importamos useNavigation

const PantallaUsuario = () => {
  const navigation = useNavigation(); // Usamos el hook de navegación para navegar

  // Función que se ejecuta al cerrar sesión
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar la sesión (limpiar datos de usuario, tokens, etc.)
    // Luego navegas a la pantalla de inicio
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil de Usuario</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
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
