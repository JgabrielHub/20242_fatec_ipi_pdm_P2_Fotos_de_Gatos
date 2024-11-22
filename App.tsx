import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList,} from 'react-native';
import axios from 'axios';


export default function App() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=5')
      .then(response => setFotos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <FlatList
      data={fotos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Image source={{ uri: item.url }} style={styles.image} />
      )}
    />
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
      alignItems: 'center',
      width: 300, 
      height: 300, 
      margin: 10 }
});