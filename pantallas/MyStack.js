import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';  // Asegúrate de que HomeScreen esté exportado correctamente
import MyScrollableComponent from './MyScrollableComponent'; // Asegúrate de que la ruta sea correcta
import ConsultScreen from '../ConsultScreen'; // Asegúrate de que la ruta sea correcta

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyScrollableComponent}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Consult"
          component={ConsultScreen} // Asegúrate de que este sea tu componente para la pantalla de consulta
          options={{ title: 'Consulta' }} // Puedes cambiar el título aquí
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

