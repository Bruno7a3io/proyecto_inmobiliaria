import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <FontAwesome
              name="star"
              size={15}
              color={star <= rating ? '#A91D3A' : 'gray'}
              style={{ marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StarRating;
