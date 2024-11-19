// MapModal.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

const MapModal = ({ isVisible, onClose, latitude, longitude }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Ubicación en el mapa</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
        </MapView>
        <Button title="Cerrar" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0, // Eliminar márgenes predeterminados
  },
  modalContent: {
    backgroundColor: 'transparent', // Fondo transparente
    padding: 0,
    width: '100%',
    height: '80%', // Controlamos el tamaño del mapa
    justifyContent: 'flex-end', // El botón va hacia abajo
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default MapModal;