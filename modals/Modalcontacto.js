import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Image } from 'react-native';
import Secboton from '../componentes/atomos/Secboton';
import logo from '../assets/logo_sin_fondo.png'; // Asegúrate de que la ruta de la imagen sea correcta

const Modalcontacto = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Gracias por elegirnos. Nos pondremos en contacto con usted.</Text>
          <Secboton title="Cerrar" onPress={onClose} />
          <Image source={logo} style={styles.logo} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 80, 
    height: 80, 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    width: 300,
    height: 300, // Ajusta la altura del modal (puedes modificar este valor)
    padding: 20,
    backgroundColor: '#FAF7F0', // Cambiar el color de fondo del modal (aquí lo cambiamos a un gris claro)
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#151515', // Asegúrate de que el texto sea legible sobre la imagen
  },
});

export default Modalcontacto;
