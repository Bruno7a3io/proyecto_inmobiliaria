import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';  // Asegúrate de que HomeScreen esté exportado correctamente
import MyScrollableComponent from './MyScrollableComponent'; // Asegúrate de que la ruta sea correcta
import PropertyDetail from './PropertyDetail'; // Asegúrate de que la ruta sea correcta
import PantallaUsuario from './PantallaUsuario'; // Importa la pantalla de usuario
import PantallaAlq from './PantallaAlq';
import PantallaComp from './PantallaComp';
import Procedimientosmain from './procedimientosmain';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
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
  );
};

export default MyStack;

