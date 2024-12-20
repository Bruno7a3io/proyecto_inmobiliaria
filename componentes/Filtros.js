// componentes/FilterComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext'; // Importa el contexto de tema

const Filtros = ({ categoria, setCategoria, finalidadSeleccionada, setFinalidadSeleccionada }) => {

  

  const { isDarkMode } = useTheme(); // Obtén el estado del tema

  const styles = isDarkMode ? darkStyles : lightStyles;

  // Estilos para los botones seleccionados
  const getButtonStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#A91D3A' : isDarkMode ? '#131111' : '#dedede' ,
    padding: 10,
    margin: 5,
    borderRadius: 5,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Filtrar por categoría:</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={getButtonStyle(categoria === '')}
          onPress={() => setCategoria('')}
        >
          <Text style={{ color: categoria === '' ? '#fff' : isDarkMode ? '#F5F5F5' : '#000' }}>Ver todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(categoria === 'departamento')}
          onPress={() => setCategoria('departamento')}
        >
          <Text style={{ color: categoria === 'departamento' ? '#fff' : isDarkMode ? '#F5F5F5' : '#000'  }}>Ver departamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(categoria === 'casa')}
          onPress={() => setCategoria('casa')}
        >
          <Text style={{ color: categoria === 'casa' ? '#fff' : isDarkMode ? '#F5F5F5' : '#000'  }}>Ver casas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(categoria === 'campo')}
          onPress={() => setCategoria('campo')}
        >
          <Text style={{ color: categoria === 'campo' ? '#fff' : isDarkMode ? '#F5F5F5' : '#000'  }}>Ver campos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(categoria === 'oficina')}
          onPress={() => setCategoria('oficina')}
        >
          <Text style={{ color: categoria === 'oficina' ? '#fff' : isDarkMode ? '#F5F5F5' : '#000'  }}>Ver oficinas</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.titulo}>Filtrar por finalidad:</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={getButtonStyle(finalidadSeleccionada === '')}
          onPress={() => setFinalidadSeleccionada('')}
        >
          <Text style={{ color: finalidadSeleccionada === '' ? '#fff' : isDarkMode ? '#F5F5F5' : '#000'  }}>Ver todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(finalidadSeleccionada === 1)}
          onPress={() => setFinalidadSeleccionada(1)}
        >
          <Text style={{ color: finalidadSeleccionada === 1 ? '#fff' : isDarkMode ? '#F5F5F5' : '#000'  }}>Venta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(finalidadSeleccionada === 0)}
          onPress={() => setFinalidadSeleccionada(0)}
        >
          <Text style={{ color: finalidadSeleccionada === 0 ? '#fff' : isDarkMode ? '#F5F5F5' : '#000'  }}>Alquiler</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
const darkStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
});

export default Filtros;