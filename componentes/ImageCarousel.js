// ImageCarousel.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ImageCarousel = ({ backgrounds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = React.useRef(null);

  // Cambia la imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Desplaza automáticamente el ScrollView cuando cambia currentIndex
  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: currentIndex * screenWidth,
      animated: true
    });
  }, [currentIndex]);

  // Cuando el usuario se detiene de deslizar, actualizamos el índice actual
  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={{ height: 250, marginTop: 135 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true} // Permite desplazamiento manual
        //onMomentumScrollEnd={handleScrollEnd} // Detecta cuando el usuario termina de deslizar
      >
        {backgrounds.map((imageSource, index) => (
          <View key={index} style={{ width: screenWidth, height: 300 }}>
            <Image 
              source={imageSource} 
              style={{ width: '70%', height: '100%', alignSelf: 'center' }} 
              resizeMode="cover" 
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImageCarousel;