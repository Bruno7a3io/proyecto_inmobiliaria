// componentes/MyScrollableComponent.js
//http://localhost/10_10_inmobiliaria/inmobiliaria/assets/casa1.png
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator,TouchableOpacity} from 'react-native';

import ImageCarousel from '../componentes/ImageCarousel'; 
import useDolar from '../componentes/dolarapi';
import PropertyCard from '../componentes/PropertyCard'; 
import Header from '../componentes/moleculas/Header';  // Ajusta la ruta según sea necesario
import Filtros from '../componentes/Filtros';
import Footer from '../componentes/moleculas/Footer';
import { useAuth } from '../componentes/service/AuthContext';
import { useTheme } from '../ThemeContext'; // Importa el contexto de tema



import { getData, getObj, storeData, storeObj } from '../componentes/service/data';

import imgcasa1 from '../assets/carrusel1.jpg';
import imgcasa2 from '../assets/carrusel2.jpg';
import imgcasa3 from '../assets/carrusel3.jpg';
import Secboton from '../componentes/atomos/Secboton';
import CustomButton from '../componentes/CustomButton';

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
  //192.168.1.8 celuar
  // 192.168.56.1
  const getPropiedades = async () => {
    try {
      const url = categoria 
      ? `http://10.10.9.39/api/propiedad.php?categoria=${categoria}&finalidad=${finalidadSeleccionada}`
      : `http://10.10.9.39/api/propiedad.php`;
    
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

  const handleproced = () => {
    if (navigation) {
      navigation.navigate('procedimientosmain'); 
    } else {
      console.warn("Navigation prop is undefined");
    }
  }
  
  //modooscuro
  const { isDarkMode } = useTheme(); // Obtén el estado del tema

  const styles = isDarkMode ? darkStyles : lightStyles;

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
            <Text style={styles.textimp}> Importante: debe estar registrado par ver los precios</Text>
            <View style={styles.registrar} >
            <Secboton title="Registrarse" onPress={() => setIsModalVisible(true)} />
            </View>
            </>
          )}
    
          {isLoading ? (
            <ActivityIndicator />
          ) : propiedad.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18, color: isDarkMode ? '#F5F5F5' : '#000' }}>No hay propiedades disponibles</Text> // Muestra este mensaje si no hay propiedades
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

<Text style={styles.textimp}> Vea que sencillo es usar la app</Text>
        <View style={styles.registrar} >
            <Secboton title="Procedimientos" onPress={handleproced} />
            </View>
        </View>
      </View>
    {/* footer */}
        <Footer />
    </View>
  </ScrollView>
  );
}
const lightStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Permite que el fondo del contenedor principal sea visible
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
  textimp: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Agrega espacio debajo del primer texto
    padding: 10,
    textAlign: 'left', // Alineación a la izquierda
  },
  registrar: {
    width:'80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  }
});

const darkStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Permite que el fondo del contenedor principal sea visible
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#1B1717',
  },
  contenido: {
    flex: 3,
    padding: 40,
  },
  textimp: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Agrega espacio debajo del primer texto
    padding: 10,
    textAlign: 'left', // Alineación a la izquierda
     color: '#F5F5F5',
  },
  registrar: {
    width:'80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  }
});

export default MyScrollableComponent;
