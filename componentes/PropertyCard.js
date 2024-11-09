// PropertyCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton'; // Asegúrate de que la ruta sea correcta
import StarRating from './StarRating'; // Asegúrate de que la ruta sea correcta
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el ícono de Ionicons

const PropertyCard = ({ price, category, date, address, imageComponent, onConsult, status }) => {
  const screenWidth = Dimensions.get('window').width;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    // Define un estilo dinámico para el borde
    const cardBorderStyle = status === 1 ? styles.redBorder : styles.blueBorder;

  return (
    <View style={[styles.tarjeta, cardBorderStyle]}>
      {/* Renderiza el componente de imagen que pasas como prop */}
      {/* Imagen que al tocar se agranda */}
        <TouchableOpacity onPress={toggleModal}>
        <Image source={{ uri: `${imageComponent}` }} style={styles.image} />
        </TouchableOpacity>
      <View style={styles.descripcion}>
        <Text style={{ marginLeft: 30 }}>Disponible</Text>
        <Text style={{ marginLeft: 40, fontSize: 25 }}>${price}</Text>
        <Text style={{ marginLeft: 55 }}>Categoría: {category}</Text>
        <Text style={{ marginLeft: 55 }}>Fecha de alta: {date}</Text>
        <Text style={{ marginLeft: 55 }}>Dirección: {address}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, marginRight: 40, paddingBottom: 10 }}>
          <View>
            <Text>Calificar propiedad</Text>
            <StarRating />
          </View>
          <CustomButton title="Ver mas" onPress={onConsult} />
        </View>
      </View>
      {/* Modal para la imagen a pantalla completa */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
        <View style={styles.modalContent}>
          {/* Ícono de cierre */}
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Icon name="close" size={30} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
          <Image source={{ uri: `${imageComponent}` }} style={styles.image} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  tarjeta: {
    marginTop: 20,
    backgroundColor: '#FAF7F0',
    width: Dimensions.get('window').width - 60,
    marginHorizontal: 30,
    borderRadius: 20,
    elevation: 8,
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  descripcion: {
    backgroundColor: '#FAF7F0',
    borderRadius: 20,
  },
  image: {
    width: Dimensions.get('window').width - 60,
    height: 300,
    borderRadius: 20,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: Dimensions.get('window').width - 30,
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo semitransparente
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1, // Asegura que esté por encima de otros elementos
  },
  fullImage: {
    width: Dimensions.get('window').width - 30,
    height: 800,
    borderRadius: 20,
    resizeMode: 'contain', // Mantiene la relación de aspecto
  },
  redBorder: {
    borderColor: '#C96868',
    borderWidth: 4,
  },
  blueBorder: {
    borderColor: '#7EACB5',
    borderWidth: 4,
  },
});

export default PropertyCard; // Asegúrate de que este export esté presente
