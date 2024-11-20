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
import { useTheme } from '../ThemeContext'; // Importa el contexto de tema



const PantallaUsuario = ({navigation}) => {
  const { isDarkMode } = useTheme(); // Obtén el estado del tema

  const styles = isDarkMode ? darkStyles : lightStyles;

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
        <Text style={styles.text}>Perfil: {userData.nombre} </Text>
        <View style={styles.buttonvolver}>
        <CustomButton title="Menu" onPress={handlevolver} />
      </View>
        <View style={styles.menubotones}>
    <View style={styles.buttonContainer}>
    <Secboton title="Datos" onPress={() => setIsModalVisibleupdate(true)} />
    <Modalupdate 
        isModalVisible={isModalVisibleupdate} 
        setIsModalVisible={setIsModalVisibleupdate} 
        userData={userData} 
      />
    </View>
      <View style={styles.buttonContainer}>
        <Secboton title="Ventas" onPress={handlecomp} />
      </View>
      <View style={styles.buttonContainer}>
        <Secboton title="Alquileres" onPress={handlealq} />
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
      <CustomButton title="Detalles" onPress={handlealq} />
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
      <CustomButton title="Detalles" onPress={handlecomp} />
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

const lightStyles = StyleSheet.create({
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

const darkStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Permite que el fondo del contenedor principal sea visible
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    backgroundColor: '#1B1717',
  },
  tarjeta: {
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#171717',
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
    color: '#F5F5F5',
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
    color: '#F5F5F5',
  },
  menubotones: {
    flex: 1,
    flexDirection: 'row', // Alinea los botones en fila
    justifyContent: 'space-around', // Espacio entre los botones
    alignItems: 'center', // Centra verticalmente los botones
    paddingHorizontal: 10,
    backgroundColor: '#1B1717', // Permite que el fondo del contenedor principal sea visible
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
export default PantallaUsuario;
