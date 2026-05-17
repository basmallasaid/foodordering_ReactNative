import React from 'react';
import { Plus, Heart } from "lucide-react-native"; 
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useCartContext } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext'; 
import { useNavigation } from '@react-navigation/native';

export default function CardH({ products }) {
  const { addToCart } = useCartContext(); 
  const { toggleFavorite, isFavorite } = useFavorites(); 
  const navigation = useNavigation();

  const handleAdd = (item) => {
    addToCart(item);
    Alert.alert("Success", `${item.name} added to orders!`);
  };

  return (
    <View style={styles.cardsGrid}>
      {products?.map((item) => (
        <TouchableOpacity  key={item.id} style={styles.card} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} >
          <TouchableOpacity  style={styles.favBtn}   onPress={() => toggleFavorite(item)}>
            <Heart size={18} 
              color={isFavorite(item.id) ? "#FF3B30" : "#BBB"} 
              fill={isFavorite(item.id) ? "#FF3B30" : "none"} 
            />
          </TouchableOpacity>
          <Image source={{ uri: item.img }} style={styles.cardImg} />
          <Text style={styles.foodTitle} numberOfLines={1}>{item.name}</Text>
          <View style={styles.vendorRow}>
            <View style={styles.brandCircle}>
              <Text style={styles.brandLetter}>{item.brand?.[0].toUpperCase()}</Text>
            </View>
            <Text style={styles.vendorName}>{item.brand}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity 
               style={styles.plusBtn} 
               onPress={() => handleAdd(item)}
            >
              <Plus size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardsGrid: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

 
  favBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1, 
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 6,
    borderRadius: 15,
  },

  cardImg: {
    width: '100%',
    height: 110,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  foodTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  vendorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },

  brandCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandLetter: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
  },

  vendorName: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  plusBtn: {
    backgroundColor: '#F5F5F5',
    padding: 6,
    borderRadius: 10,
  },
});