// components/Footer.js
import React from 'react';
import { View, Text, Image, Linking, StyleSheet } from 'react-native';
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
        <Text style={styles.preciovalor}> calle 15 733 </Text>
      </Text>
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
