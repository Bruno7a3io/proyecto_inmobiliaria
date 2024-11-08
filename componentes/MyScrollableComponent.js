// componentes/MyScrollableComponent.js
//http://localhost/10_10_inmobiliaria/inmobiliaria/assets/casa1.png
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, ScrollView, Dimensions, SafeAreaView, Alert, ActivityIndicator, FlatList  } from 'react-native';

import ImageCarousel from './ImageCarousel'; 
import useDolar from './dolarapi';
import AnimacionTexto from './animaciontexto'; 
import StarRating from './StarRating';
import CustomButton from './CustomButton'; 
import PropertyCard from './PropertyCard'; 

import { getData, getObj, storeData, storeObj } from './service/data';

import logo from '../assets/logo_sin_fondo.png';
import imgcasa1 from '../assets/casa1.png';
import imgcasa2 from '../assets/casa2.png';
import imgcasa3 from '../assets/casa3.png';

const MyScrollableComponent = ( {navigation} ) => {
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

  const backgrounds = [imgcasa1, imgcasa2, imgcasa3];
  const screenWidth = Dimensions.get('window').width;

  const handleConsult = (item) => {
       // Verifica que navigation esté definido antes de usarlo
       if (navigation) {
        navigation.navigate('PropertyDetail', { property: item }); 
      } else {
        console.warn("Navigation prop is undefined");
      }
  };

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

        
        

        {/* contenido */}
        <View style={styles.contenido}>
          <View>
            <SafeAreaView>
              <ImageCarousel backgrounds={backgrounds} />
            </SafeAreaView>
          </View>
          
          {isLoading ? (
          <ActivityIndicator />
          ) : (
          propiedad.map((item) => (
          <PropertyCard
            key={item.idPropiedad}
            price={item.precio_alquiler_minimo || 0}
            category={item.categoria || "Desconocido"}
            date={item.fecha_alta || "Fecha desconocida"}
            address={item.direccion || "Dirección desconocida"}
            imageComponent={item.imgprincipal || "Imagen Principal"}
            onConsult={() => handleConsult(item)}
          />
        ))
      )}
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
    backgroundColor: '#A5B68D',
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
    padding: 50,
  },
  footer: {
    alignItems: 'center',
    marginTop: 150,
    flex: 2,
    width: '100%',
    backgroundColor: '#A5B68D',
  },
  tarjeta: {
    marginTop: 20,
    backgroundColor: '#FAF7F0',
    width: Dimensions.get('window').width - 60,
    marginHorizontal: 30,
    borderRadius: 20,
    elevation: 8,
  },
  descripcion: {
    backgroundColor: '#FAF7F0',
    borderRadius: 20,
  },
  image: {
    width: Dimensions.get('window').width - 60,
    height: 300,
    borderRadius: 20,
  },
});

export default MyScrollableComponent;
