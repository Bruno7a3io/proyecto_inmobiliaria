import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import Secboton from '../componentes/atomos/Secboton';
import { useTheme } from '../ThemeContext';

const Modalupdate = ({ isModalVisible, setIsModalVisible, userData }) => {
  const { isDarkMode } = useTheme(); // Obtén el estado del tema

  const styles = isDarkMode ? darkStyles : lightStyles;

  const [form, setForm] = useState({
    CUIL: userData?.CUIL || '',
    nombre: userData?.nombre || '',
    DNI: userData?.DNI || '',
    EMAIL: userData?.EMAIL || '',
    password: userData?.password || '',
    fechanac: userData?.fechanac || '',
    celular: userData?.celular || '',
    token: userData?.token || '',
    avatar: userData?.avatar || '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleUpdate = async () => {
    try {
      if (Object.values(form).every((value, index) => value === Object.values(userData)[index])) {
        Alert.alert('Error', 'No se detectaron cambios en los datos.');
        return;
      }
      //10.0.2.2
      //192.168.1.8 celular
      const response = await fetch('http://10.10.9.39/api/updatepers.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.status === 200) {
        Alert.alert('Éxito', result.message);
        setIsModalVisible(false);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al actualizar los datos');
    }
  };

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Actualizar Datos</Text>
          <ScrollView style={styles.scrollView}>
            {Object.keys(form).map((key) => (
              <View key={key} style={styles.inputContainer}>
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Ingrese ${key}`}
                  placeholderTextColor={isDarkMode ? "#F5F5F5" : "#000"} // Ajusta el color
                  value={form[key]}
                  onChangeText={(value) => handleChange(key, value)}
                />
              </View>
            ))}
          </ScrollView>
          <Secboton title="Guardar Cambios" onPress={handleUpdate} />
          <Secboton title="Cerrar" onPress={() => setIsModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const lightStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%', // Limita la altura del modal para que sea más pequeño
    backgroundColor: '#FAF7F0', // Cambiar el color de fondo del modal (aquí lo cambiamos a un gris claro)
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
    maxHeight: 300, // Limita la altura del contenido desplazable
  },
  inputContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

const darkStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%', // Limita la altura del modal para que sea más pequeño
    backgroundColor: '#252525', // Cambiar el color de fondo del modal (aquí lo cambiamos a un gris claro)
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F5F5F5',
  },
  scrollView: {
    width: '100%',
    maxHeight: 300, // Limita la altura del contenido desplazable
  },
  inputContainer: {
    marginBottom: 15,
    backgroundColor: '#252525',
    color: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    color: '#F5F5F5',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    color: '#F5F5F5',
  },
});

export default Modalupdate;