import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../ThemeContext'; // Importa el contexto de tema

const Mapacomp = ({ latitude, longitude }) => {
  const { isDarkMode } = useTheme(); // Obtén el estado del tema

  const styles = isDarkMode ? darkStyles : lightStyles;
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Ubicación:</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
        </MapView>
      </View>
    </View>
  );
};


const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    height: 300,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    height: 300,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  texto: {
    color: '#F5F5F5',
  },
});

export default Mapacomp;
