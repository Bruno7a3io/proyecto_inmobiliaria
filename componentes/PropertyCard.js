// PropertyCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton'; // Asegúrate de que la ruta sea correcta
import StarRating from './StarRating'; // Asegúrate de que la ruta sea correcta
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el ícono de Ionicons
import { useTheme } from '../ThemeContext'; // Importa el contexto de tema


const PropertyCard = ({ price, category, date, address, imageComponent, onConsult, status }) => {
  const screenWidth = Dimensions.get('window').width;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { isDarkMode } = useTheme(); // Obtén el estado del tema

  const styles = isDarkMode ? darkStyles : lightStyles;

    // Define un estilo dinámico para el borde
    const cardBorderStyle = status === 1 ? styles.redBorder : styles.blueBorder;

    //para cambiar ip imagen
     // Dirección base
     //10.0.2.2  emulador
      //192.168.1.8 celular
     const baseURL = "http://10.10.9.39/10_10_inmobiliaria/inmobiliaria/assets/";
    

    
  

  return (
    <View style={[styles.tarjeta, cardBorderStyle]}>
      {/* Renderiza el componente de imagen que pasas como prop */}
      {/* Imagen que al tocar se agranda */}
        <TouchableOpacity onPress={toggleModal}>
        <Image source={{ uri: `${baseURL}${imageComponent}` }}style={styles.image}/>
        </TouchableOpacity>
      <View style={styles.descripcion}>
        <Text style={[{ marginLeft: 30 }, styles.Textdesc]}>Disponible</Text>
        <Text style={{ marginLeft: 40, fontSize: 25, color: '#A91D3A' }}>{price}</Text>
        <Text style={[{ marginLeft: 55 }, styles.Textdesc]}>Categoría: {category}</Text>
        <Text style={[{ marginLeft: 55 }, styles.Textdesc]}>Fecha de alta: {date}</Text>
        <Text style={[{ marginLeft: 55 }, styles.Textdesc]}>Dirección: {address}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, marginRight: 40, paddingBottom: 10 }}>
          <View>
            <Text style={styles.Textdesc}> Calificar propiedad</Text>
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
          <Image source={{ uri:  `${baseURL}${imageComponent}`}} style={styles.image} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const lightStyles = StyleSheet.create({
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
    height: 400,
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
    borderColor: '#E85C0D',
    borderWidth: 4,
  },
  blueBorder: {
    borderColor: '#0D92F4',
    borderWidth: 4,
  },
});

const darkStyles = StyleSheet.create({
  tarjeta: {
    marginTop: 20,
    backgroundColor: '#171717',
    width: Dimensions.get('window').width - 60,
    marginHorizontal: 30,
    borderRadius: 20,
    elevation: 8,
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  descripcion: {
    backgroundColor: '#171717',
    borderRadius: 20,
  },
  Textdesc: {
    color: '#F5F5F5',
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
    borderColor: '#E85C0D',
    borderWidth: 4,
  },
  blueBorder: {
    borderColor: '#0D92F4',
    borderWidth: 4,
  },
});

export default PropertyCard; // Asegúrate de que este export esté presente
