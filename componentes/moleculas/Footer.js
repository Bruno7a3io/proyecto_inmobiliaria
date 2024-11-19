// components/Footer.js
import { View, Text, Image, Linking, StyleSheet,TouchableOpacity, Modal, Button } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapModal from '../MapModal';

import logo from '../../assets/logo_sin_fondo.png';

const Footer = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:Rimoldiinmobiliaria@gmail.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:2302443344');
  };

  const handleWhatsAppPress = () => {
    Linking.openURL('whatsapp://send?phone=2302735637');
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const latitude =  -35.6566200;
  const longitude =  -63.7568200;

  const toggleModal = () => {
    setModalVisible(true);  // Abrir el modal
  };

  const closeModal = () => {
    setModalVisible(false);  // Cerrar el modal
  };

  return (
    <View style={styles.footer}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.headerText2} onPress={handleEmailPress}>
        <Text>Email: </Text>
        <Text style={styles.preciovalor}>Rimoldiinmobiliaria@gmail.com</Text>
      </Text>
      <Text style={styles.headerText2} onPress={handlePhonePress}>
        <Text>Teléfono: </Text>
        <Text style={styles.preciovalor}>2302 - 443344</Text>
      </Text>
      <Text style={styles.headerText2} onPress={handleWhatsAppPress}>
        <Text>WhatsApp: </Text>
        <Text style={styles.preciovalor}>2302 - 735637</Text>
      </Text>
      <Text style={styles.headerText2}>
        <Text>Dirección:</Text>
        <Text style={styles.preciovalor} onPress={toggleModal}>calle 15 733</Text>
      </Text>

       {/* Modal con el mapa */}
       <MapModal
        isVisible={isModalVisible} // Pasar estado de visibilidad
        onClose={closeModal} // Pasar la función de cerrar
        latitude={latitude} // Pasar las coordenadas
        longitude={longitude} // Pasar las coordenadas
      />

    

    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    flex: 2,
    width: '100%',
    backgroundColor: '#dedede',
    paddingVertical: 20, // Ajusta el padding según sea necesario
  },
  logo: {
    width: 80,
    height: 80,
  },
  headerText2: {
    fontSize: 15,
    color: '#151515',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  preciovalor: {
    color: '#A91D3A',
  },
});

export default Footer;
