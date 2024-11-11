import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet } from 'react-native';

const Modallogin = () => {
  // Estado para manejar la visibilidad del modal y los campos del formulario
  const [isModalVisible, setIsModalVisible] = useState(true); // El modal se muestra al inicio
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Modal de registro */}
      <Modal
        visible={isModalVisible}
        animationType="slide"  // Animación de deslizamiento
        transparent={true}     // Fondo transparente
        onRequestClose={closeModal} // Cierra el modal al presionar el botón de Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registro de Usuario</Text>

            {/* Campo de texto para el nombre */}
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
            />

            {/* Campo de texto para la contraseña */}
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Botón para registrar */}
            <Button title="Registrar" onPress={closeModal} />

            {/* Botón para cerrar el modal sin registrar */}
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo transparente oscuro
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Modallogin;
