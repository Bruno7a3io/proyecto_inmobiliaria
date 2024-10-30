// componentes/PropertyDetail.js
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, ScrollView, Animated,Dimensions } from 'react-native';

import logo from '../assets/logo_sin_fondo.png';
import useDolar from './dolarapi';
import AnimacionTexto from './animaciontexto'; 

import { getData, getObj, storeData, storeObj } from './service/data';

const PropertyDetail = ({ route }) => {
    const { property } = route.params; // Asegúrate de que esta línea esté presente

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

      <View style={styles.contenido}>
        <View>
        <Image source={require('../assets/casa1.png')} style={styles.image} />
          <Text style={styles.title}>{property.nombre || 'Nombre de la propiedad'}</Text>
          <Text style={styles.price}>Precio: ${property.precio_alquiler_minimo || 0}</Text>
          <Text style={styles.category}>Categoría: {property.categoria || 'Desconocido'}</Text>
          <Text style={styles.date}>Fecha de alta: {property.fecha_alta || 'Fecha desconocida'}</Text>
          <Text style={styles.address}>Dirección: {property.direccion || 'Dirección desconocida'}</Text>
          <Text style={styles.address}>Metros cuadrados cubiertos: {property.M2_cubiertos || 'Desconocido'}</Text>
          <Text style={styles.address}>Metros cuadrados descubiertos: {property.M2_descubiertos || 'Desconocido'}</Text>
          <Text style={styles.address}>Condiciones garantes: {property.condiciones_garantes || 'Desconocido'}</Text>
          <Text style={styles.address}>Expensas: {property.expensas_minimo || 'Desconocido'}</Text>
          <Text style={styles.address}>Gastos minimos: {property.gastos_minimos || 'Desconocido'}</Text>
          <Text style={styles.address}>Fecha actualizacion precio: {property.fecha_precio_minimo || 'Desconocido'}</Text>
          <Text style={styles.address}>Disponible: {property.disponible || 'Desconocido'}</Text>
          <Text style={styles.address}>Descripción: {property.descripcion || 'Desconocido'}</Text>
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
    paddingTop: 135,
    paddingHorizontal: 40,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    flex: 2,
    width: '100%',
    backgroundColor: '#A5B68D',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
},
price: {
fontSize: 18,
color: '#1E3E62',
marginBottom: 5,
},
category: {
fontSize: 16,
marginBottom: 5,
},
date: {
fontSize: 16,
marginBottom: 5,
},
address: {
fontSize: 16,
marginBottom: 5,
},
});

export default PropertyDetail;
