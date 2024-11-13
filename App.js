// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyScrollableComponent from './componentes/MyScrollableComponent'; // Asegúrate de que la ruta sea correcta
import ConsultScreen from '../inmobiliaria/ConsultScreen'; // Asegúrate de que la ruta sea correcta
import TestNavigation from './componentes/TestNavigation'; // Asegúrate de que la ruta sea correcta
import PropertyDetail from './componentes/PropertyDetail'; // Asegúrate de que la ruta sea correcta
import PantallaUsuario from './componentes/PantallaUsuario'; // Importa la pantalla de usuario
import { AuthProvider } from './componentes/AuthContext';  // Asegúrate de importar AuthProvider

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MyScrollableComponent} />
        <Stack.Screen name="Consult" component={ConsultScreen} />
        <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
        <Stack.Screen name="PantallaUsuario" component={PantallaUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;



