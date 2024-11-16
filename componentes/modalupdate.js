import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';


const Modalupdate = ({ isModalVisible, setIsModalVisible, userData }) => {
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

      const response = await fetch('http://10.0.2.2/api/updatepers.php', {
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
          <ScrollView style={{ width: '100%' }}>
            {Object.keys(form).map((key) => (
              <View key={key} style={styles.inputContainer}>
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Ingrese ${key}`}
                  value={form[key]}
                  onChangeText={(value) => handleChange(key, value)}
                />
              </View>
            ))}
          </ScrollView>
          <Button title="Guardar Cambios" onPress={handleUpdate} />
          <Button title="Cerrar" onPress={() => setIsModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
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
  cameraContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 10,
  },
  cameraButtonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  cameraButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  cameraButtonText: {
    fontSize: 18,
    color: 'black',
  },
  photo: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default Modalupdate;
