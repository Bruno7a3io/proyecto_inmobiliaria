// componentes/PropertyDetail.js
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, ScrollView, Animated,Dimensions, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el ícono de Ionicons
import MapView, { Marker } from 'react-native-maps'; // Importa MapView y Marker

import logo from '../assets/logo_sin_fondo.png';
import useDolar from './dolarapi';
import AnimacionTexto from './animaciontexto'; 
import { useAuth } from './AuthContext';
import Modalcontacto from './Modalcontacto'; // Importa el componente del modal
import Modalcomentario from './Modalcomentario'; // Importa el componente del modal

import { getData, getObj, storeData, storeObj } from './service/data';

const PropertyDetail = ({ route }) => {
    const { property } = route.params; // Asegúrate de que esta línea esté presente

      //imagen logo
  const logo_img = () => (
    <Image source={logo} style={styles.logo} />
  );

  const { precioDolar, fechaDolar } = useDolar();

  //para animacion texto
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const moveText = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 12500,
        useNativeDriver: true,
      }).start(() => moveText());
    };

    moveText();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [375, -375],
  });
    
    //para db
   const [mykey, setmykey] = useState(null);
   const [mykeyobj, setmykeyobj] = useState(null);
   const [isLoading, setLoading] = useState(true);
   const [propiedad, setpropiedad] = useState([]);
 
   const getDatos = async () => {
     const vkey = await getData('@MOVIL2_mykey');
     const vkeyobj = await getObj('@MOVIL2_mykeyobj');
 
     if (vkey !== null) {
       setmykey(vkey);
     }
     if (vkeyobj !== null) {
       setmykeyobj(vkeyobj);
     }
   };
 
   const getpropiedad = async () => {
     try {
       const response = await fetch('http://192.168.1.69/api/propiedad.php');
       const json = await response.json();
       setpropiedad(json); // Asumiendo que json es un array de personas
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     }
   };
 
   useEffect(() => {
     getDatos();
     getpropiedad();
   }, []);
 
  //para galeria
  // Convierte la cadena de URLs de galería en un array si es necesario
  const galeriaArray = Array.isArray(property.galeria)
  ? property.galeria
  : (property.galeria ? property.galeria.split(',') : []);

  const screenWidth = Dimensions.get('window').width;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => { 
    setSelectedImage(imageUrl); setModalVisible(true); }; 
  
  const closeModal = () => { 
    setModalVisible(false); setSelectedImage(null); };
  

  // Mapa: Se utiliza la latitud y longitud de la propiedad
  const latitude = parseFloat(property.latitud) || -35.6566200;
  const longitude = parseFloat(property.longitud) || -63.7568200;

  //paralogin
  const { isLoggedIn, userData } = useAuth(); // Accede al estado de autenticación

  //para comprar o alquilar
  const [modalcVisible, setModalcVisible] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para mostrar el modal
  const handleBuyPress = () => {
    setModalcVisible(true); // Muestra el modal cuando el botón "Comprar" es presionado
  };

  // Función para cerrar el modal
  const closeModalcontacto = () => {
    setModalcVisible(false); // Cierra el modal
  };

  //para comentar
  const [modalVisible, setModalcomentVisible] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para mostrar el modal
  const handleCommentPress = () => {
    setModalcomentVisible(true); // Muestra el modal cuando el botón "Enviar comentario" es presionado
  };

  // Función para cerrar el modal
  const closeModalcomentario = () => {
    setModalcomentVisible(false); // Cierra el modal
  };

    return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {logo_img()}
          <Text style={styles.headerText}>Inmobiliaria Rimoldi</Text>
        </View>
        <View>
          <AnimacionTexto>
            <View style={styles.headerContent}>
              <Text style={styles.headerText2}>
                <Text style={styles.precioLabel}>Precio dólar oficial: </Text>  
                <Text style={styles.preciovalor}>{precioDolar ? `$${precioDolar}` : 'Cargando...'}</Text>
              </Text>
              <Text style={styles.headerText2}>
                <Text style={styles.precioLabel}>fecha: </Text>   
                <Text style={styles.preciovalor}>{fechaDolar ? `${fechaDolar}` : 'Cargando...'}</Text>
              </Text>
            </View>
          </AnimacionTexto>
        </View>
        <StatusBar style="auto" />
      </View>

      <View style={styles.contenido}>
        <View>
        <Image source={{ uri: property.imgprincipal || 'imagen principal' }} style={styles.image} />
          <Text style={styles.title}>{isLoggedIn ? `Precio:$${property.precio_alquiler_minimo || 0}` : 'Precio: Restringido'}</Text>
          <Text style={styles.category}>Categoría: {property.categoria || 'Desconocido'}</Text>
          <Text style={styles.address}>Dirección: {property.direccion || 'Dirección desconocida'}</Text>
          <Text style={styles.address}>Metros cuadrados cubiertos: {property.M2_cubiertos || 'Desconocido'}</Text>
          <Text style={styles.address}>Metros cuadrados descubiertos: {property.M2_descubiertos || 'Desconocido'}</Text>
          {Number(property.finalidad) === 0 ? (
          <>
            <Text style={styles.address}>Condiciones garantes: {property.condiciones_garantes || 'Desconocido'}</Text>
            <Text style={styles.address}>Expensas: {property.expensas_minimo || 'Desconocido'}</Text>
            <Text style={styles.address}>Gastos mínimos: {property.gastos_minimos || 'Desconocido'}</Text>
          </>
          ) : null}
          <Text style={styles.address}>Fecha actualizacion precio: {property.fecha_precio_minimo || 'Desconocido'}</Text>
          <Text style={styles.address}>Descripción: {property.descripcion || 'Desconocido'}</Text>
            

          <View style={styles.containergaleria}>
  <Text>Imágenes:</Text>
  <View style={styles.imageContainer}>
    {galeriaArray.length > 0 ? (
      galeriaArray.map((img, index) => {
        const imageUrl = img.trim();
        return imageUrl ? (
          <TouchableOpacity key={index} onPress={() => openModal(imageUrl)}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.imagegaleria}
            />
          </TouchableOpacity>
        ) : null;
      })
    ) : (
      <Text>No hay imágenes disponibles</Text>
    )}
  </View>

  {selectedImage && (
    <Modal
      visible={isModalVisible}
      onRequestClose={closeModal}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icon name="close" size={30} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )}
</View>
  {/* Mapa de la propiedad */}
  <Text>Ubicación:</Text>
  <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    loadingEnabled={true}
                >
                    <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
                </MapView>
            </View>
            {isLoggedIn ?(
            <>
            {Number(property.finalidad) === 1 ? (
               <>
              <View>
              <Button title="Comprar" onPress={handleBuyPress} />
              {/* Modal */}
              <Modalcontacto visible={modalcVisible} onClose={closeModalcontacto} />
              </View> 
              </>
          ) :  
              <View>
              <Button title="Alquilar" onPress={handleBuyPress} />
              {/* Modal */}
              <Modalcontacto visible={modalcVisible} onClose={closeModalcontacto} />
              </View> }
              </>) : null }
               {/* Botón para activar el modal */}
              <Button title="Enviar comentario" onPress={handleCommentPress} />

              {/* Modal */}
              <Modalcomentario
              visible={modalVisible}
              onClose={closeModalcomentario}
              isLoggedIn={isLoggedIn}
              userData={userData} 
              />
            </View>
        </View>

    
 {/* footer */}
 <View style={styles.footer}>
 {logo_img()}
 <Text style={styles.headerText2}>
   <Text>email:</Text>
   <Text style={styles.preciovalor}> Rimoldiinmobiliaria@gmail.com </Text>
 </Text>
 <Text style={styles.headerText2}>
   <Text>Teléfono:</Text> 
   <Text style={styles.preciovalor}> 2302 - 735637 </Text>  
 </Text>
 <Text style={styles.headerText2}>
   <Text>Dirección:</Text>
   <Text style={styles.preciovalor}> calle 15 733 </Text>  
 </Text>
</View>
</View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
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
    marginLeft: 10,
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
    width: 100, 
    height: 100, 
  },
  contenido: {
    flex: 3,
    paddingTop: 135,
    paddingHorizontal: 40,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    flex: 2,
    width: '100%',
    backgroundColor: '#697565',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
image: {
  width: Dimensions.get('window').width - 60,
  height: 300,
  borderRadius: 20,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 10,
},
price: {
fontSize: 18,
color: '#1E3E62',
marginBottom: 5,
},
category: {
fontSize: 16,
marginBottom: 5,
},
date: {
fontSize: 16,
marginBottom: 5,
},
address: {
fontSize: 16,
marginBottom: 5,
},
containergaleria: {
  flex: 1,
},
imageContainer: {
  flexDirection: 'row',       // Acomoda las imágenes en fila
  flexWrap: 'wrap',           // Permite que las imágenes se acomoden en filas cuando se termine el espacio
  justifyContent: 'flex-start',  // Alinea las imágenes al principio
  gap: 10,                    // Espacio entre las imágenes
},
imagegaleria: {
  width: 150,                 // Ajusta el tamaño de las imágenes (puedes cambiar este valor)
  height: 150,                // Ajusta la altura
  marginBottom: 10,           // Espacio debajo de cada imagen
},
closeButton: { 
  position: 'absolute', 
  top: 10, 
  right: 25, 
  zIndex: 1, },
  mapContainer: {
    height: 300,  // Ajusta el alto del mapa
    marginVertical: 20,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
});

export default PropertyDetail;
