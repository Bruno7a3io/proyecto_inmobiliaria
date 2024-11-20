import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../componentes/service/AuthContext'; // Importa el contexto de autenticación
import Secboton from '../componentes/atomos/Secboton';
import { useTheme } from '../ThemeContext';

const Modallogin = ({ isModalVisible, setIsModalVisible }) => {
  const { isDarkMode } = useTheme(); // Obtén el estado del tema

  const styles = isDarkMode ? darkStyles : lightStyles;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigation = useNavigation();
  const { login } = useAuth(); // Obtén la función login desde el contexto

  useEffect(() => {
    let interval;

    if (isBlocked) {
      // Inicia el temporizador de 30 segundos si el usuario está bloqueado
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsBlocked(false); // Desbloquea al usuario después de 30 segundos
            setAttempts(0); // Reinicia el contador de intentos fallidos
            return 30; // Reinicia el temporizador
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Limpia el intervalo cuando el componente se desmonte o el usuario se desbloquee
    return () => clearInterval(interval);
  }, [isBlocked]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingrese ambos campos');
      return;
    }

    if (isBlocked) {
      Alert.alert('Error', `Cuenta bloqueada. Intente de nuevo en ${timer} segundos.`);
      return;
    }

    try {
      //http://10.0.2.2/api/12_11login.php emulador
      //http://192.168.1.8/api/12_11login.php
      const response = await fetch('http://10.0.2.2/api/12_11login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EMAIL: email,
          password: password,
        }),
      });

      const result = await response.json();
      if (result.status === 200) {
        login(result.data); // Llama a la función `login` con los datos del usuario
        setIsModalVisible(false); // Cierra el modal después de iniciar sesión
        setAttempts(0); // Reinicia los intentos al inicio de sesión exitoso
      } else {
        setAttempts((prev) => prev + 1);
        if (attempts + 1 >= 3) {
          setIsBlocked(true); // Bloquea al usuario después de 3 intentos fallidos
          Alert.alert('Bloqueo', 'Demasiados intentos fallidos. Intente de nuevo en 30 segundos.');
        } else {
          Alert.alert('Error', result.message);
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión');
    }
  };

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Inicio de Sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={isDarkMode ? "#F5F5F5" : "#000"} // Ajusta el color
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={isDarkMode ? "#F5F5F5" : "#000"} // Ajusta el color
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Secboton title="Iniciar Sesión" onPress={handleLogin} disabled={isBlocked} />
          <Secboton title="Cerrar" onPress={() => setIsModalVisible(false)} />
          {isBlocked && <Text style={styles.timerText}>Inténtalo de nuevo en {timer} segundos</Text>}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FAF7F0', // Cambiar el color de fondo del modal (aquí lo cambiamos a un gris claro)
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
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 5,
  },
  timerText: {
    color: 'red',
    marginTop: 10,
  },
});

const darkStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#252525', // Cambiar el color de fondo del modal (aquí lo cambiamos a un gris claro)
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F5F5F5',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: '#414141', // Cambiar el color de fondo del modal (aquí lo cambiamos a un gris claro)
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#F5F5F5', // Cambiar el color del texto (aquí lo cambiamos a blanco)
  },
  timerText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Modallogin;

