// componentes/MyScrollableComponent.js
//http://localhost/10_10_inmobiliaria/inmobiliaria/assets/casa1.png
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator,TouchableOpacity} from 'react-native';

import ImageCarousel from './ImageCarousel'; 
import useDolar from './dolarapi';
import PropertyCard from './PropertyCard'; 
import Header from './Header';  // Ajusta la ruta según sea necesario
import Filtros from './Filtros';
import Footer from './Footer';
import { useAuth } from './AuthContext';


import { getData, getObj, storeData, storeObj } from './service/data';

import imgcasa1 from '../assets/carrusel1.jpg';
import imgcasa2 from '../assets/carrusel2.jpg';
import imgcasa3 from '../assets/carrusel3.jpg';

const MyScrollableComponent = ( {navigation} ) => {

  //arreglo imagenes para carrusel
  const backgrounds = [imgcasa1, imgcasa2, imgcasa3];

  //hook para el precio del dolar
  const { precioDolar, fechaDolar } = useDolar();

  //navegar al perfil de usuario
  const handleConsult = (item) => {
    navigation.navigate('PropertyDetail', { property: item }); 
  };

  //para db
  const [mykey, setmykey] = useState(null);
  const [mykeyobj, setmykeyobj] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [propiedad, setpropiedad] = useState([]);
  const [categoria, setCategoria] = useState(''); // Inicializa como un string vacío
  const [finalidadSeleccionada, setFinalidadSeleccionada] = useState('');

  // Efecto para cargar datos locales e inicializar propiedades al montar el componente
  useEffect(() => {
    setLoading(true);
    getDatos();
    getPropiedades();
  }, [categoria, finalidadSeleccionada]); // Dependencias del efecto

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
  //10.0.2.2 emulador
  //192.168.1.69 celuar
  const getPropiedades = async () => {
    try {
      const url = categoria 
      ? `http://10.0.2.2/api/propiedad.php?categoria=${categoria}&finalidad=${finalidadSeleccionada}`
      : `http://10.0.2.2/api/propiedad.php`;
    
      const response = await fetch(url);
      const json = await response.json();
    
      // Asegura que json sea un array antes de asignarlo a propiedad
      if (Array.isArray(json)) {
        setpropiedad(json);
      } else {
        console.error("Error: La respuesta no es un array", json);
        setpropiedad([]); // Setea propiedad como array vacío en caso de error
      }
    } catch (error) {
    console.error(error);
    setpropiedad([]);
    } finally {
    setLoading(false);
    }
  };
  
  //modal login
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { isLoggedIn, userData,  logout  } = useAuth(); // Accede al estado de autenticación
  
  //para cerrar sesión
  const handleLogout = () => {
    logout(); // Llama a la función logout para cambiar el estado
  }
    
  const handleperfil = () => {
    if (navigation) {
      navigation.navigate('PantallaUsuario'); 
    } else {
      console.warn("Navigation prop is undefined");
    }
  }
  
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
    {/* contenido */}
      <View style={styles.contenido}>
        <View>
          <SafeAreaView>
          <ImageCarousel backgrounds={backgrounds} />
          </SafeAreaView>
        </View>
  
        <View>
          <View>
    {/* Filtros */}
          <Filtros
            categoria={categoria}
            setCategoria={setCategoria}
            finalidadSeleccionada={finalidadSeleccionada}
            setFinalidadSeleccionada={setFinalidadSeleccionada}
          />
          </View>

          {isLoggedIn && userData ? (
            <>
            </>
          ) : (
            <>
            <Text style={{padding: 10}}>Importante: debe estar registrado par ver los precios</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={{textAlign: 'center'}}>Registrarse</Text>
            </TouchableOpacity>
            </>
          )}
    
          {isLoading ? (
            <ActivityIndicator />
          ) : propiedad.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>No hay propiedades disponibles</Text> // Muestra este mensaje si no hay propiedades
          ) : (
            propiedad.map((item) => (
            <PropertyCard
              key={item.idPropiedad}
              price= {isLoggedIn ? `$${item.precio_alquiler_minimo || 0}` : 'Precio: Restringido'}
              category={item.categoria || "Desconocido"}
              date={item.fecha_alta || "Fecha desconocida"}
              address={item.direccion || "Dirección desconocida"}
              imageComponent={item.imgprincipal || "Imagen Principal"}
              status={ Number(item.finalidad) || 0} 
              onConsult={() => handleConsult(item)}
            />
            ))
          )}
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
  },
});

export default MyScrollableComponent;
