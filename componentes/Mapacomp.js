import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Mapacomp = ({ latitude, longitude }) => {
  return (
    <View style={styles.container}>
      <Text>Ubicación:</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
});

export default Mapacomp;
