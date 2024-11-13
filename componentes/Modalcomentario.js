import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from './AuthContext';

const Modalcomentario = ({ visible, onClose }) => {
  const { isLoggedIn, userData } = useAuth(); // Acceder al contexto de autenticación
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');  // Cambiado de 'phone' a 'celular'
  const [nombre, setNombre] = useState('');    // Cambiado de 'name' a 'nombre'
  const [message, setMessage] = useState('');

  // Si el usuario está logueado, autocompletar los campos
  useEffect(() => {
    if (isLoggedIn) {
      setEmail(userData.EMAIL || '');        // Asegurarte de usar 'EMAIL' de la BD
      setCelular(userData.celular || '');    // Asegurarte de usar 'celular' de la BD
      setNombre(userData.nombre || '');      // Asegurarte de usar 'nombre' de la BD
    }
  }, [isLoggedIn, userData]);

  const handleSubmit = () => {
    if (!message) {
      Alert.alert('Error', 'Por favor, ingrese un mensaje.');
      return;
    }

    // Aquí puedes enviar el comentario si es necesario, pero como mencionaste que no se guarda en la base de datos, solo puedes mostrar un mensaje de éxito.
    Alert.alert('Comentario enviado', 'Gracias por tu comentario.');

    // Cerrar el modal
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enviar Comentario</Text>

          {/* Formulario de comentario */}
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}  // Cambiado a 'nombre'
            onChangeText={setNombre}  // Cambiado a 'setNombre'
            editable={!isLoggedIn} // Si está logueado, no puede editar el nombre
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}  // Cambiado a 'email'
            onChangeText={setEmail}  // Cambiado a 'setEmail'
            keyboardType="email-address"
            editable={!isLoggedIn} // Si está logueado, no puede editar el email
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={celular}  // Cambiado a 'celular'
            onChangeText={setCelular}  // Cambiado a 'setCelular'
            keyboardType="phone-pad"
            editable={!isLoggedIn} // Si está logueado, no puede editar el teléfono
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Mensaje"
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <View style={styles.buttonContainer}>
            <Button title="Enviar Comentario" onPress={handleSubmit} />
            <Button title="Cerrar" onPress={onClose} color="red" />
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Modalcomentario;

