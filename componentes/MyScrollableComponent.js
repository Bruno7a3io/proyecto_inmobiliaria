// componentes/MyScrollableComponent.js
//http://localhost/10_10_inmobiliaria/inmobiliaria/assets/casa1.png
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, ScrollView, Dimensions, SafeAreaView, Alert, ActivityIndicator, FlatList, Button, TouchableOpacity   } from 'react-native';

import ImageCarousel from './ImageCarousel'; 
import useDolar from './dolarapi';
import AnimacionTexto from './animaciontexto'; 
import StarRating from './StarRating';
import CustomButton from './CustomButton'; 
import PropertyCard from './PropertyCard'; 
import Modallogin from './Modallogin';  // Ajusta la ruta según sea necesario
import { useAuth } from './AuthContext';


import { getData, getObj, storeData, storeObj } from './service/data';

import logo from '../assets/logo_sin_fondo.png';
import imgcasa1 from '../assets/carrusel1.jpg';
import imgcasa2 from '../assets/carrusel2.jpg';
import imgcasa3 from '../assets/carrusel3.jpg';

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
  const [categoria, setCategoria] = useState(''); // Inicializa como un string vacío
  const [finalidadSeleccionada, setFinalidadSeleccionada] = useState('');

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
  
    // Efecto para cargar datos locales e inicializar propiedades al montar el componente
    useEffect(() => {
      setLoading(true);
      getDatos();
      getPropiedades();
    }, [categoria, finalidadSeleccionada]); // Dependencias del efecto

    const handleCategoriaChange = (newCategoria) => {
      setCategoria(newCategoria);
    };

    const handleFinalidadChange = (finalidad) => {
      setFinalidadSeleccionada(finalidad);
    };

      // Estilos para los botones seleccionados
  const getButtonStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#4CAF50' : '#f0f0f0', // Color verde cuando seleccionado, gris cuando no
    padding: 10,
    margin: 5,
    borderRadius: 5,
  });

    //modal login
    const [isModalVisible, setIsModalVisible] = useState(true);
    const { isLoggedIn, userData,  logout  } = useAuth(); // Accede al estado de autenticación

    

    
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
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {logo_img()}
            <Text style={styles.headerText}>Inmobiliaria Rimoldi</Text>
               {isLoggedIn && userData ? (
              <>
              <View style={{ alignItems: 'center' }}>
  {/* Renderizamos el nombre del usuario dentro de un componente <Text> */}
  <TouchableOpacity onPress={handleperfil} style={{ marginVertical: 20 }}>
    <Image source={{ uri: userData.avatar }} style={styles.avatar} />
  </TouchableOpacity>
  {/* Cerrar sesión */}
  <View style={{ marginVertical: 8 }}>
    <Button title="Salir" onPress={handleLogout} />
  </View>

 
</View>
             </>
            ) : (
            <>
           <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Text>Registrarse</Text>
            </TouchableOpacity>
            </>
          )}

          
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
            {/* Modal de login */}
            <Modallogin
             isModalVisible={isModalVisible} 
             setIsModalVisible={setIsModalVisible} 
          />
        </View>

  
        
        
        {/* contenido */}
        <View style={styles.contenido}>
          <View>
            <SafeAreaView>
              <ImageCarousel backgrounds={backgrounds} />
            </SafeAreaView>
          </View>
          <View>
          <View style={{ padding: 20 }}>
  {/* Fila 1: Texto título de categoría */}
  <Text>Filtrar por categoría:</Text>

  {/* Fila 2: Categorías con desplazamiento horizontal */}
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <TouchableOpacity
      style={getButtonStyle(categoria === '')}
      onPress={() => handleCategoriaChange('')}
    >
      <Text style={{ color: categoria === '' ? '#fff' : '#000' }}>Ver todos</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={getButtonStyle(categoria === 'departamento')}
      onPress={() => handleCategoriaChange('departamento')}
    >
      <Text style={{ color: categoria === 'departamento' ? '#fff' : '#000' }}>Ver departamentos</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={getButtonStyle(categoria === 'casa')}
      onPress={() => handleCategoriaChange('casa')}
    >
      <Text style={{ color: categoria === 'casa' ? '#fff' : '#000' }}>Ver casas</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={getButtonStyle(categoria === 'campo')}
      onPress={() => handleCategoriaChange('campo')}
    >
      <Text style={{ color: categoria === 'campo' ? '#fff' : '#000' }}>Ver campos</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={getButtonStyle(categoria === 'oficina')}
      onPress={() => handleCategoriaChange('oficina')}
    >
      <Text style={{ color: categoria === 'oficina' ? '#fff' : '#000' }}>Ver oficinas</Text>
    </TouchableOpacity>
  </ScrollView>

  {/* Fila 3: Texto título de finalidad */}
  <Text>Filtrar por finalidad:</Text>

  {/* Fila 4: Finalidades con desplazamiento horizontal */}
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
  <TouchableOpacity
      style={getButtonStyle(finalidadSeleccionada === '')}
      onPress={() => handleFinalidadChange('')}
    >
      <Text style={{ color: finalidadSeleccionada === '' ? '#fff' : '#000' }}>Todos</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={getButtonStyle(finalidadSeleccionada === 0)}
      onPress={() => handleFinalidadChange(0)}
    >
      <Text style={{ color: finalidadSeleccionada === 0 ? '#fff' : '#000' }}>Alquilar</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={getButtonStyle(finalidadSeleccionada === 1)}
      onPress={() => handleFinalidadChange(1)}
    >
      <Text style={{ color: finalidadSeleccionada === 1 ? '#fff' : '#000' }}>Comprar</Text>
    </TouchableOpacity>
  </ScrollView>
    </View>

    
         
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
    backgroundColor: '#697565',
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
    marginRight: 5,
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
    width: 80, 
    height: 80, 
  },
  contenido: {
    flex: 3,
    padding: 40,
  },
  footer: {
    alignItems: 'center',
    flex: 2,
    width: '100%',
    backgroundColor: '#697565',
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
  containerfiltro: {
    flexDirection: 'row',  // Divide el espacio en dos partes horizontales
    justifyContent: 'space-between', // Espacio entre las dos secciones
    padding: 20,
  },
  leftContainer: {
    flex: 1, // Toma la mitad del espacio disponible
    paddingRight: 10, // Añadimos un pequeño margen para separar las secciones
  },
  rightContainer: {
    flex: 1, // Toma la otra mitad del espacio disponible
    paddingLeft: 10, // Añadimos un pequeño margen para separar las secciones
  },
  avatar: {
    width: 50,               // Ajusta el tamaño del avatar según lo necesario
    height: 50,              // Debe ser el mismo valor que el ancho para formar un círculo
    borderRadius: 50,         // La mitad del ancho/alto para hacer un círculo
    borderWidth: 2,           // Opcional: ancho del borde
    borderColor: '#ccc',      // Opcional: color del borde
  },
});

export default MyScrollableComponent;
