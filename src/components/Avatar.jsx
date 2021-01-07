import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  logo: {
    width: 66,
    height: 58
  },
});

const AvatarImage = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: imageUrl,
        }}
      />
    </View>
  );
}

export default AvatarImage;