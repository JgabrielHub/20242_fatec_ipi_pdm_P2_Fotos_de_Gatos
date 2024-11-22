import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, ImageBackground } from 'react-native';
import axios from 'axios';

const fundo = require('./assets/fundo.jpg'); 

export default function App() {
  const [fotos, setFotos] = useState([]);

  const fetchFotos = async () => {
    try {
      const res = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');
      const cincoFotos = res.data.slice(0, 5);
      setFotos(prevFotos => [...prevFotos, ...cincoFotos]);
    } catch (error) {
      console.error('Erro ao obter as fotos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo} style={styles.fundo} resizeMode="cover">
        <Text style={styles.title}>Exposição de Gatinhos</Text>
        <Pressable onPress={fetchFotos} style={styles.button}>
          <Text style={styles.buttonText}>Carregar Imagens</Text>
        </Pressable>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {fotos.map((photo, index) => (
            <Image key={index} source={{ uri: photo.url }} style={styles.image} />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAEAF4',
  },
  title: {
    fontSize: 36,
    color: '#fa6673',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 360,
    height: 360,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff7900',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    width: '100%',
    marginTop: 10,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 64,
    borderRadius: 30,
    backgroundColor: '#fa6673',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
