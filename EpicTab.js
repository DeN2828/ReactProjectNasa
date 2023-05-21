import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GlobalContext } from './GlobalContext';

const EpicTab = () => {
  const [imageData, setImageData] = useState(null);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  useEffect(() => {
    fetchEpicImage();
  }, []);

  const fetchEpicImage = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/images?api_key=${globalVariable}`
      );
      const data = await response.json();
      setImageData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {imageData && (
        <Image
          style={styles.image}
          source={{
            uri: `https://api.nasa.gov/EPIC/archive/natural/${imageData.date}/png/${imageData.image}.png?api_key=efgjirmJJJEGCPe7LUO5uEtin3CyLPQbeWVebWLW`,
          }}
        />
      )}
      <Text style={styles.title}>Latest EPIC Image</Text>
      <Text style={styles.date}>
        {imageData && new Date(imageData.date).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  date: {
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});

export default EpicTab;
