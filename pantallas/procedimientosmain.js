// PantallaRegistro.js
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,Image, SafeAreaView, ActivityIndicator,TouchableOpacity,Dimensions, Button} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
 
import useDolar from '../componentes/dolarapi';
import Header from '../componentes/moleculas/Header';  // Ajusta la ruta según sea necesario
import Footer from '../componentes/moleculas/Footer';
import Modalupdate from '../modals/modalupdate';
import { useAuth } from '../componentes/service/AuthContext';
import CustomButton from '../componentes/CustomButton';
import Secboton from '../componentes/atomos/Secboton';
import MyScrollableComponent from './MyScrollableComponent';



const Procedimientosmain = ({navigation}) => {

  //hook para el precio del dolar
  const { precioDolar, fechaDolar } = useDolar();

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
    if (navigation) {
      navigation.navigate('PantallaUsuario'); 
    } else {
      console.warn("Navigation prop is undefined");
    }
  }

  const screenWidth = Dimensions.get('window').width;

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
    marginHorizontal: 5, // Espacio entre los botones
  },
  image: {
    width: Dimensions.get('window').width - 60,
    height: 300,
    borderRadius: 20,
  },
  buttonvolver:{
    alignSelf: 'flex-start',           // Alinea el botón "Pagar" a la derecha
    paddingBottom: 10,  
    paddingRight: 25, // Padding derecho para el botón 
  },
});

export default Procedimientosmain;
