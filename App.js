import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, ScrollView,  Dimensions,SafeAreaView   } from 'react-native';

import ImageCarousel from './componentes/ImageCarousel'; 
import useDolar from './componentes/dolarapi';
import AnimacionTexto from './componentes/animaciontexto'; // Asegúrate de tener la ruta correcta

import logo from './assets/logo_sin_fondo.png';
import imgcasa1 from './assets/casa1.png';
import imgcasa2 from './assets/casa2.png';
import imgcasa3 from './assets/casa3.png';

const MyScrollableComponent = () => {
  
  //imagen logo
  const logo_img = () => (
    <Image source={logo} style={styles.logo} />
  );
  const casa1 = () => (
    <Image source={imgcasa1} style={styles.image} />
  );
  const casa2 = () => (
    <Image source={imgcasa2} style={styles.image} />
  );
  const casa3 = () => (
    <Image source={imgcasa3} style={styles.image} />
  );

    const { precioDolar, fechaDolar, error } = useDolar(); // Utiliza el hook
  
  

  //para animacion texto
  const animatedValue = new Animated.Value(0); // Inicializa el valor animado

  useEffect(() => {
    // Configura la animación para mover el texto
    const moveText = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 12500, // Duración de la animación
        useNativeDriver: true,
      }).start(() => moveText()); // Repite la animación
    };

    moveText();
  }, [animatedValue]);

  // Interpolación para mover el texto de derecha a izquierda
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [375, -375], // Ajusta estos valores según el tamaño de tu pantalla
  });

  //carrusel de imagenes
  const backgrounds = [ require('./assets/casa1.png'),require('./assets/casa2.png'),require('./assets/casa3.png')];
  const screenWidth = Dimensions.get('window').width;
  
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
          <AnimacionTexto children={  
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
          } />
          </View>
          {/* Aquí puedes agregar más contenido en el futuro */}
          <StatusBar style="auto" />
        </View>
        {/* contenido */}
        <View  style={styles.contenido}>    
          <View>
            <SafeAreaView>
            <ImageCarousel backgrounds={backgrounds} />
            </SafeAreaView>
          </View>
    
          <View>
            <View
            style={{
            height: '10%',
            backgroundColor: 'powderblue',
            }}
            />
            <View
            style={{
            height: '10%',
            backgroundColor: 'red',
            }}
            />
            <View
            style={{
            height: '10%',
            backgroundColor: 'green',
            }}
            />
            {casa1()}
            {casa2()}
            {casa3()}
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
          <Text>Telefono:</Text> 
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
    backgroundColor: '#A5B68D',
    alignItems: 'left',
    position: 'absolute',
    top: 0,
  },
  headerContent: {
    flexDirection: 'row', // Alínea los elementos horizontalmente
    alignItems: 'center', // Alinea verticalmente en el centro
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
  contenido:{
    flex: 3,
  },
  footer: {
    alignItems: 'center',
    marginTop:150,
    flex: 2,
    width: '100%',
    backgroundColor: '#A5B68D',
  },
  imagenes: {
    width: '100%',  // Ocupa el ancho total del carrusel
    height: '100%', // Ocupa la altura total del carrusel
    resizeMode: 'cover',  // Ajusta la imagen para cubrir sin deformar
  },
    image: {
        width: Dimensions.get('window').width,
        height: 300,
    },
});


export default MyScrollableComponent;



