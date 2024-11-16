// componentes/Header.js
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { useAuth } from './AuthContext'; // Si usas autenticación
import AnimacionTexto from './animaciontexto'; // Importa el componente de animación si lo usas
import Modallogin from './Modallogin'; // Asegúrate de que la ruta sea correcta

import logo from '../assets/logo_sin_fondo.png'; // Asegúrate de que la ruta de la imagen sea correcta



const Header = ({ navigation, isModalVisible, setIsModalVisible, precioDolar, fechaDolar, handleperfil, handleLogout }) => {
  const { isLoggedIn, userData } = useAuth(); // Accede al estado de autenticación

  //http://10.0.2.2/api/12_11login.php emulador
  //http://192.168.1.69/api/12_11login.php
  const baseURL = "http://10.0.2.2/10_10_inmobiliaria/inmobiliaria/assets/";

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Inmobiliaria Rimoldi</Text>
        {isLoggedIn && userData ? (
          <>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={handleperfil} style={{ marginVertical: 20 }}>
                <Image source={ { uri: `${baseURL}${userData.avatar}` }} style={styles.avatar} />
              </TouchableOpacity>
              <View style={{ marginVertical: 8 }}>
                <Button title="Salir" onPress={handleLogout} />
              </View>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Text>Registrarse</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View>
        <AnimacionTexto>
          <View style={styles.headerContent}>
            <Text style={styles.headerText2}>
              <Text style={styles.precioLabel}>Precio dólar oficial: </Text>
              <Text style={styles.preciovalor}>{precioDolar ? `$${precioDolar}` : 'Cargando...'}</Text>
            </Text>
            <Text style={styles.headerText2}>
              <Text style={styles.precioLabel}>Fecha: </Text>
              <Text style={styles.preciovalor}>{fechaDolar ? `${fechaDolar}` : 'Cargando...'}</Text>
            </Text>
          </View>
        </AnimacionTexto>
      </View>

      {/* Modal de login */}
      <Modallogin isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      flex: 1,
      width: '100%',
      padding: 2,
      backgroundColor: '#697565',
      alignItems: 'left',
      position: 'absolute',
      top: 0,
    },
    headerContent: {
      flexDirection: 'row', 
      alignItems: 'center',
    },  
    headerText: {
      fontSize: 25,
      color: '#f5f5f5',
      fontWeight: 'bold',
      marginRight: 5,
    },
    headerText2: {
      fontSize: 15,
      color: '#f5f5f5',
      fontWeight: 'bold',
      marginLeft: 20,
    },
    preciovalor: {
      color: '#1E3E62',
    },
    logo: {
      width: 80, 
      height: 80, 
    },
    avatar: {
        width: 50,               // Ajusta el tamaño del avatar según lo necesario
        height: 50,              // Debe ser el mismo valor que el ancho para formar un círculo
        borderRadius: 50,         // La mitad del ancho/alto para hacer un círculo
        borderWidth: 2,           // Opcional: ancho del borde
        borderColor: '#ccc',      // Opcional: color del borde
      },
});

export default Header;
