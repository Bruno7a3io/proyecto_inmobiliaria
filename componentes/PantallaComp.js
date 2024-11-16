import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,Image,Linking, SafeAreaView, ActivityIndicator,TouchableOpacity,Dimensions, Button} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import ImageCarousel from './ImageCarousel'; 
import useDolar from './dolarapi';
import PropertyCard from './PropertyCard'; 
import Header from './Header';  // Ajusta la ruta según sea necesario
import Filtros from './Filtros';
import Footer from './Footer';
import { useAuth } from './AuthContext';


import { getData, getObj, storeData, storeObj } from './service/data';


const PantallComp = ({navigation}) => {

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

  const handlevolver = () => {
    navigation.navigate('PantallaUsuario'); 
  };
  
  const handleperfil = () => {
    navigation.navigate('PantallaUsuario'); 
  };

  const handlealq = () => {
    if (navigation) {
      navigation.navigate('PantallaAlq'); 
    } else {
      console.warn("Navigation prop is undefined");
    }
  }

  const screenWidth = Dimensions.get('window').width;

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
        <Button title="Perfil" onPress={handlevolver} />
      </View>
        <View style={styles.menubotones}>
      <View style={styles.buttonContainer}>
        <Button title="Datos" onPress={() => alert('Botón 1 presionado')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ventas" disabled={true} />
      </View>
      <View style={styles.buttonContainer}>
      <Button title="Alquileres" onPress={handlealq}/>
      </View>
    </View>
    <Text style={styles.text}>Mi Compra</Text>
    <Text style={styles.texto}>Compra N-1</Text>
  {/* Imagen que al tocar se agranda */}
  <Image source={require('../assets/casa1.png')} style={styles.image} />
  <View style={styles.descripcion}>
  <Text style={[styles.texto, { fontSize: 25 }]}>Monto: $70000.000</Text>
  <Text style={styles.text}>Pasos a seguir</Text>
  <Text style={styles.texto}>1. Obtención de Certificados</Text>
  <Text style={styles.texto}>Solicita los certificados de dominio e inhibiciones.</Text>
  <Text style={styles.texto}>2. Firma de la Escritura</Text>
  <Text style={styles.texto}>Realiza la firma de la escritura ante el escribano.</Text>
  <Text style={styles.texto}>3. Pago de Impuestos y Gastos</Text>
  <Text style={styles.texto}>Realiza el pago de los impuestos y gastos asociados a la compra de la propiedad.</Text>
  <Text style={styles.texto}>4. Inscripción de la Propiedad</Text>
  <Text style={styles.texto}>Inscribe la propiedad en el registro correspondiente de la municipalidad.</Text>
  <Text style={styles.text}>Pendiente</Text>
  <Text style={styles.texto}>1. Pago de Impuestos y Gastos</Text>
  <Text style={styles.texto}>2. Inscripción de la Propiedad</Text>
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
  descripcion: {
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 20, // Separación extra antes de la descripción
  },
  texto: {
    marginLeft: 10, // Margen izquierdo para cada texto
    marginBottom: 10, // Espacio entre cada texto
  },
  botonContainer: {
    marginTop: 20, // Espacio extra antes del botón
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingRight: 10, // Padding derecho para el botón
  },
  buttonRow: {
    flexDirection: 'row',           // Coloca los botones en una fila
    justifyContent: 'space-between', // Alinea los botones a la izquierda y derecha
    width: '60%',                  // Asegura que los botones ocupen todo el ancho disponible
    marginBottom: 20,               // Agrega espacio entre las filas de botones
  },
  buttonvolver:{
    alignSelf: 'flex-start',           // Alinea el botón "Pagar" a la derecha
    width: '30%',
    paddingBottom: 10,  
    paddingRight: 25, // Padding derecho para el botón 
  },
  buttonPagar: {
    alignSelf: 'flex-end',           // Alinea el botón "Pagar" a la derecha
    width: '40%',                   // Asegura que ocupe todo el ancho
  },
  contenido: {
    flex: 3,
    padding: 20,
    marginTop: 150,
  },
  text: {
    fontSize: 20,
    marginBottom: 10, // Agrega espacio debajo del primer texto
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20, // Espacio debajo de la imagen
    borderRadius: 20,
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
  
});

export default PantallComp;