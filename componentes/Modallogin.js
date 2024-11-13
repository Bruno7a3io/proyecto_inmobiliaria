import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext'; // Importa el contexto de autenticación

const Modallogin = ({ isModalVisible, setIsModalVisible }) => {
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button title="Iniciar Sesión" onPress={handleLogin} disabled={isBlocked} />
          <Button title="Cerrar" onPress={() => setIsModalVisible(false)} />
          {isBlocked && <Text style={styles.timerText}>Inténtalo de nuevo en {timer} segundos</Text>}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  timerText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Modallogin;

