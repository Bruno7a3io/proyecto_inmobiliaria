// PantallaRegistro.js
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,Image, SafeAreaView, ActivityIndicator,TouchableOpacity,Dimensions, Button} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import ImageCarousel from './ImageCarousel'; 
import useDolar from './dolarapi';
import PropertyCard from './PropertyCard'; 
import Header from './Header';  // Ajusta la ruta según sea necesario
import Filtros from './Filtros';
import Footer from './Footer';
import Modalupdate from './modalupdate';
import { useAuth } from './AuthContext';


import { getData, getObj, storeData, storeObj } from './service/data';


const PantallaUsuario = ({navigation}) => {

  //hook para el precio del dolar
  const { precioDolar, fechaDolar } = useDolar();

  
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

  const getPropiedades = async () => {
    try {
      const url = categoria 
      ? `http://192.168.1.69/api/propiedad.php?categoria=${categoria}&finalidad=${finalidadSeleccionada}`
      : `http://192.168.1.69/api/propiedad.php`;
    
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoggedIn, userData,  logout  } = useAuth(); // Accede al estado de autenticación
  
  //para cerrar sesión
  const handleLogout = () => {
    logout(); // Llama a la función logout para cambiar el estado
    if (navigation) {
      navigation.navigate('Home'); 
    } else {
      console.warn("Navigation prop is undefined");
    }
  }
  
  const handleperfil = () => {
    // Nada
  };

  const screenWidth = Dimensions.get('window').width;

  const handlevolver = () => {
    navigation.navigate('Home'); 
  };

  const handlealq = () => {
    if (navigation) {
      navigation.navigate('PantallaAlq'); 
    } else {
      console.warn("Navigation prop is undefined");
    }
  }

  const handlecomp = () => {
    if (navigation) {
      navigation.navigate('PantallaComp'); 
    } else {
      console.warn("Navigation prop is undefined");
    }
  }
//modal update
const [isModalVisibleupdate, setIsModalVisibleupdate] = useState(false);


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
        <Text style={styles.text}>Perfil</Text>
        <View style={styles.buttonvolver}>
        <Button title="Menu" onPress={handlevolver} />
      </View>
        <View style={styles.menubotones}>
    <View style={styles.buttonContainer}>
    <Button title="Datos" onPress={() => setIsModalVisibleupdate(true)} />
    <Modalupdate 
        isModalVisible={isModalVisibleupdate} 
        setIsModalVisible={setIsModalVisibleupdate} 
        userData={userData} 
      />
    </View>
      <View style={styles.buttonContainer}>
        <Button title="Ventas" onPress={handlecomp} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Alquileres" onPress={handlealq} />
      </View>
    </View>
    <Text style={styles.text}>Mis Alquileres</Text>
    <View style={[styles.tarjeta]}>
  {/* Imagen que al tocar se agranda */}
  <Image source={require('../assets/casa1.png')} style={styles.image} />
  <View style={styles.descripcion}>
    <Text style={[styles.texto, { fontSize: 25 }]}>Monto: $500.000</Text>
    <Text style={styles.texto}>Fecha de vencimiento: 25-11-24</Text>
    <Text style={styles.texto}>Dirección: Calle 15 414 N</Text>
    <View style={styles.botonContainer}>
      <Button title="Detalles" onPress={handlealq} />
    </View>
  </View>
</View>

    <Text style={styles.text}>Mis Ventas</Text>
    <View style={[styles.tarjeta]}>
  {/* Imagen que al tocar se agranda */}
  <Image source={require('../assets/casa1.png')} style={styles.image} />
  <View style={styles.descripcion}>
  <Text style={[styles.texto, { fontSize: 25 }]}>Monto: $70000.000</Text>
    <Text style={styles.texto}>Dirección: Calle 14 573 N</Text>
    <View style={styles.botonContainer}>
      <Button title="Detalles" onPress={handlecomp} />
    </View>
  </View>
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
    backgroundColor: '#f5f5f5',
  },
  tarjeta: {
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#FAF7F0',
    width: Dimensions.get('window').width - 60,
    marginHorizontal: 15,
    borderRadius: 20,
    elevation: 8,
    alignItems: 'center',
  },
  descripcion: {
    paddingHorizontal: 15,
    width: '100%',
  },
  texto: {
    marginLeft: 10, // Margen izquierdo para cada texto
  },
  botonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingRight: 10, // Padding derecho para el botón
  },
  contenido: {
    flex: 3,
    padding: 20,
    marginTop: 150,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left', // Alineación a la izquierda
  },
  menubotones: {
    flex: 1,
    flexDirection: 'row', // Alinea los botones en fila
    justifyContent: 'space-around', // Espacio entre los botones
    alignItems: 'center', // Centra verticalmente los botones
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flex: 1, // Hace que cada botón ocupe el mismo espacio
    marginHorizontal: 5, // Espacio entre los botones
  },
  image: {
    width: Dimensions.get('window').width - 60,
    height: 300,
    borderRadius: 20,
  },
  buttonvolver:{
    alignSelf: 'flex-start',           // Alinea el botón "Pagar" a la derecha
    width: '30%',
    paddingBottom: 10,  
    paddingRight: 25, // Padding derecho para el botón 
  },
});

export default PantallaUsuario;
