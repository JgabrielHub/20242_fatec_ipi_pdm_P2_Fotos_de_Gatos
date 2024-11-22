import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button} from 'react-native';
import axios from 'axios';


export default function App() {
  const [fotos, setFotos] = useState([]);

  const fetchFotos= async () => {
    try {
      const res = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');
      setFotos([...fotos, ...res.data]);
    } catch (error) {
      console.error('Erro ao obter as fotos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Carregar Fotos" onPress={fetchFotos} />
      <ScrollView style={styles.scrollView}>
        {fotos.map((photo, index) => (
          <Image key={index} source={{ uri: photo.url }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { 
    width: 300, 
    height: 300, 
    margin: 10 
  },
  ScrollView: {
    marginTop: 5,
  }
});