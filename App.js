// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyStack from './pantallas/MyStack';
import { AuthProvider } from './componentes/service/AuthContext';  // Asegúrate de importar AuthProvider
import { ThemeProvider } from './ThemeContext'; // Asegúrate de importar correctamente

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
    <AuthProvider> 
          <MyStack />
    </AuthProvider>
    </ThemeProvider>
  );
};

export default App;



