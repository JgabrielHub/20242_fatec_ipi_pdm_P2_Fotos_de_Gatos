import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
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
      <Pressable onPress={fetchFotos}  style={styles.button}>
      <Text style={styles.text} >Carregar Fotos</Text>
      </Pressable>
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
    backgroundColor: '#E2EAF4',
    padding: 20,
  },
  image: {
    width:  360,
    height: 360,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center'
  },
  scrollView: {
    marginTop: 10,
    width: '100%',
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#060270',
  },
  text: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  }
});