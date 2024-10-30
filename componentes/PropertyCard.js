// PropertyCard.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import CustomButton from './CustomButton'; // Asegúrate de que la ruta sea correcta
import StarRating from './StarRating'; // Asegúrate de que la ruta sea correcta

const PropertyCard = ({ price, category, date, address, imageComponent, onConsult }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.tarjeta}>
      {/* Renderiza el componente de imagen que pasas como prop */}
      <Image source={imageComponent} style={styles.image} />
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
          <CustomButton title="Consultar" onPress={onConsult} />
        </View>
      </View>
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
    alignItems: 'center',  // Centra los elementos horizontalmente
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
});




export default PropertyCard;
