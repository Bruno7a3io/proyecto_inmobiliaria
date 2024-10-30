// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyScrollableComponent from './componentes/MyScrollableComponent'; // Asegúrate de que la ruta sea correcta
import ConsultScreen from '../inmobiliaria/ConsultScreen'; // Asegúrate de que la ruta sea correcta
import TestNavigation from './componentes/TestNavigation'; // Asegúrate de que la ruta sea correcta

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MyScrollableComponent} />
        <Stack.Screen name="Consult" component={ConsultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



