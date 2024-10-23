// animacionTexto.js
import React, { useEffect } from 'react';
import { Animated, View } from 'react-native';

const AnimacionTexto = ({ children}) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const moveText = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 12500, // Duración de la animación
        useNativeDriver: true,
      }).start(() => moveText()); // Repite la animación
    };

    moveText();
  }, [animatedValue]);

  // Interpolación para mover el texto de derecha a izquierda
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [375, -375], // Ajusta estos valores según el tamaño de tu pantalla
  });

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Animated.View>
  );
};

export default AnimacionTexto;