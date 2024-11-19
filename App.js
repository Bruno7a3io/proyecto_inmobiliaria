// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyScrollableComponent from './pantallas/MyScrollableComponent'; // Asegúrate de que la ruta sea correcta
import PropertyDetail from './pantallas/PropertyDetail'; // Asegúrate de que la ruta sea correcta
import PantallaUsuario from './pantallas/PantallaUsuario'; // Importa la pantalla de usuario
import PantallaAlq from './pantallas/PantallaAlq';
import PantallaComp from './pantallas/PantallaComp';
import Procedimientosmain from './pantallas/procedimientosmain';
import { AuthProvider } from './componentes/service/AuthContext';  // Asegúrate de importar AuthProvider

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MyScrollableComponent} />
        <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
        <Stack.Screen name="PantallaUsuario" component={PantallaUsuario} />
        <Stack.Screen name="PantallaAlq" component={PantallaAlq} />
        <Stack.Screen name="PantallaComp" component={PantallaComp} />
        <Stack.Screen name="procedimientosmain" component={Procedimientosmain} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;



