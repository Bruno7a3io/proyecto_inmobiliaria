import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, ScrollView,  Dimensions  } from 'react-native';



import logo from './assets/logo_sin_fondo.png';



export default function App() {
  
  //imagen logo
  const logo_img = () => (
    <Image source={logo} style={styles.logo} />
  );
  
  //para el dolar
  const [precioDolar, setPrecioDolar] = useState(null);
  const [fechaDolar, setfechaDolar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        if (!response.ok) {
          throw new Error('problemas de conexion');
        }
        return response.json();
      })
      .then(data => {
        const precio = data.rates.ARS; 
        setPrecioDolar(precio);
        const fecha = data.date;
        setfechaDolar(fecha);
      })
      .catch(err => {
        setError(err.message);
        console.error('Error al obtener el precio del dólar:', err);
      });
  }, []);

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
  const backgrounds = ['#1E3E62', '#0B192C', '#3A6D8C']; // Colores como ejemplo
  const screenWidth = Dimensions.get('window').width;
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
        {logo_img()}
        <Text style={styles.headerText}>Inmobiliaria Rimoldi</Text>
        </View>
        <Animated.View style={{ transform: [{ translateX }] }}>
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
        </Animated.View>
    
      {/* Aquí puedes agregar más contenido en el futuro */}
      <StatusBar style="auto" />
      </View>

      <View style={{ height: 250, marginTop: 135}}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false} // Opcional: Oculta el indicador de desplazamiento
      >
        {backgrounds.map((bgColor, index) => (
          <View 
            key={index} 
            style={{ width: screenWidth, height: 300, backgroundColor: bgColor }} 
          />
        ))}
      </ScrollView>
    </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    padding: 2,
    backgroundColor: '#ff6500',
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
    color: '#EAD8B1',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerText2: {
    fontSize: 15,
    color: '#f5f5f5',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  precioLabel: {
    color: '#EAD8B1', // Cambia este color al que prefieras
  },
  preciovalor: {
    color: '#1E3E62', // Cambia este color al que prefieras
  },
  logo: {
    width: 100, 
    height: 100, 
  },
});