import { Button, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import routers from '../src/utils/route';

export default function Products() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState(""); 
  const { navigate } = useNavigation();

  useEffect(() => {
    fetch('http://192.168.100.3:4000/products')
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [])

  const filteredProducts = product.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ padding: 15 }}>
      <Text>Products</Text>
      <TextInput
        placeholder="Search product..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      {filteredProducts.map(p => (
        <View key={p.id} style={styles.card}>
          <Text>{p.name}</Text>
          <Button
            title='More'
            onPress={() => {
              navigate(routers.ProductDetails, { ...p })
            }}
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8
  }
})