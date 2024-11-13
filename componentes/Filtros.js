// componentes/FilterComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Filtros = ({ categoria, setCategoria, finalidadSeleccionada, setFinalidadSeleccionada }) => {

  // Estilos para los botones seleccionados
  const getButtonStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#4CAF50' : '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  });

  return (
    <View style={styles.container}>
      <Text>Filtrar por categoría:</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={getButtonStyle(categoria === '')}
          onPress={() => setCategoria('')}
        >
          <Text style={{ color: categoria === '' ? '#fff' : '#000' }}>Ver todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(categoria === 'departamento')}
          onPress={() => setCategoria('departamento')}
        >
          <Text style={{ color: categoria === 'departamento' ? '#fff' : '#000' }}>Ver departamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(categoria === 'casa')}
          onPress={() => setCategoria('casa')}
        >
          <Text style={{ color: categoria === 'casa' ? '#fff' : '#000' }}>Ver casas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(categoria === 'campo')}
          onPress={() => setCategoria('campo')}
        >
          <Text style={{ color: categoria === 'campo' ? '#fff' : '#000' }}>Ver campos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(categoria === 'oficina')}
          onPress={() => setCategoria('oficina')}
        >
          <Text style={{ color: categoria === 'oficina' ? '#fff' : '#000' }}>Ver oficinas</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text>Filtrar por finalidad:</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={getButtonStyle(finalidadSeleccionada === '')}
          onPress={() => setFinalidadSeleccionada('')}
        >
          <Text style={{ color: finalidadSeleccionada === '' ? '#fff' : '#000' }}>Ver todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(finalidadSeleccionada === 1)}
          onPress={() => setFinalidadSeleccionada(1)}
        >
          <Text style={{ color: finalidadSeleccionada === 1 ? '#fff' : '#000' }}>Venta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(finalidadSeleccionada === 0)}
          onPress={() => setFinalidadSeleccionada(0)}
        >
          <Text style={{ color: finalidadSeleccionada === 0 ? '#fff' : '#000' }}>Alquiler</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Filtros;