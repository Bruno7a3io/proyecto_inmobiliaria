// componentes/PropertyDetail.js
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el ícono de Ionicons
import MapView, { Marker } from 'react-native-maps'; // Importa MapView y Marker
import useDolar from '../componentes/dolarapi';
import { useAuth } from '../componentes/service/AuthContext';
import Modalcontacto from '../modals/Modalcontacto'; // Importa el componente del modal
import Modalcomentario from '../modals/Modalcomentario'; // Importa el componente del modal
import Header from '../componentes/moleculas/Header';  // Ajusta la ruta según sea necesario
import Footer from '../componentes/moleculas/Footer';
import CustomButton from '../componentes/CustomButton';
import Secboton from '../componentes/atomos/Secboton';
import Mapacomp from '../componentes/Mapacomp';

import { getData, getObj} from '../componentes/service/data';

const PropertyDetail = ({ route, navigation }) => {
  const { property } = route.params; // Asegúrate de que esta línea esté presente

  const { precioDolar, fechaDolar } = useDolar();

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
       const response = await fetch('http://192.168.1.8/api/propiedad.php');
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalgaleriaVisible, setModalgaleriaVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => { 
    setSelectedImage(imageUrl); setModalgaleriaVisible(true); }; 
  
  const closeModal = () => { 
    setModalgaleriaVisible(null); };
  

  // Mapa: Se utiliza la latitud y longitud de la propiedad
  const latitude = parseFloat(property.latitud) || -35.6566200;
  const longitude = parseFloat(property.longitud) || -63.7568200;

  //paralogin
  const { isLoggedIn, userData, logout } = useAuth(); // Accede al estado de autenticación

  //para cerrar sesión
  const handleLogout = () => {
    logout(); // Llama a la función logout para cambiar el estado
  }

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

  const handleperfil = () => {
    if (navigation) {
      navigation.navigate('PantallaUsuario'); 
    } else {
      console.warn("Navigation prop is undefined");
    }
  }

  //para cambiar ip imagen
     // Dirección base
     //10.0.2.2  emulador
      //192.168.1.8 celular
      const baseURL = "http://10.0.2.2/10_10_inmobiliaria/inmobiliaria/assets/";

      const handlevolver = () => {
        navigation.navigate('Home'); 
      };
    

    return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
       {/* Header */}
       <Header 
        navigation={navigation}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        precioDolar={precioDolar}
        fechaDolar={fechaDolar}
        handleperfil={handleperfil}
        handleLogout={handleLogout}
      />
      <View style={styles.contenido}>
      <View style={styles.buttonvolver}>
        <CustomButton title="Menu" onPress={handlevolver} />
      </View>
        <View>
        <Image source={{ uri:  `${baseURL}${property.imgprincipal}`|| 'imagen principal' }} style={styles.image} />
          <Text style={styles.title}>{isLoggedIn ? `Precio:$${property.precio_alquiler_minimo || 0}` : 'Precio: Restringido'}</Text>
          <Text style={styles.address}>Categoría: {property.categoria || 'Desconocido'}</Text>
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
              source={{ uri: `${baseURL}${imageUrl}` }}
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
      visible={isModalgaleriaVisible}
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
            <Image source={{ uri: `${baseURL}${selectedImage}`}} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )}
</View>
  {/* Mapa de la propiedad */}
  <MapComponent latitude={latitude} longitude={longitude} />
            {isLoggedIn ?(
            <>
            {Number(property.finalidad) === 1 ? (
               <>
              <View>
              <Secboton title="Comprar" onPress={handleBuyPress} />
              {/* Modal */}
              <Modalcontacto visible={modalcVisible} onClose={closeModalcontacto} />
              </View> 
              </>
          ) :  
              <View>
              <Secboton title="Alquilar" onPress={handleBuyPress} />
              {/* Modal */}
              <Modalcontacto visible={modalcVisible} onClose={closeModalcontacto} />
              </View> }
              </>) : null }
              <View>
              <Secboton title="Enviar Comentario" onPress={handleCommentPress} />
              </View>

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
  <Footer />
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
  contenido: {
    flex: 3,
    padding: 40,
    marginTop: 140,
    marginBottom: 80,
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
color: '#A91D3A',
},
price: {
fontSize: 18,
color: '#1E3E62',
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
  buttonvolver:{
    alignSelf: 'flex-start',           // Alinea el botón "Pagar" a la derecha
    paddingBottom: 10,  
    paddingRight: 25, // Padding derecho para el botón 
  },
});

export default PropertyDetail;
