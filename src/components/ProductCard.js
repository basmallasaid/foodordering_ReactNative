import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProducts } from '../services/firestoreService';

const { width } = Dimensions.get('window');
export default function ProductCard() {
    const [product , setProduct]=useState([]);
    useEffect(()=>{
      const fetchData = async () => {
      const data = await getProducts();
      setProduct(data);
    };

    fetchData();
    },[])
  return (
    <>
    {product.map((item)=>(
      <View style={styles.card} key={item.id}>
      <View style={styles.imageWrapper}>
        <Image
         source={{ uri: item.img }}
          style={styles.burgerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.productName} numberOfLines={1}>
         {item.name}
        </Text>
        
        <View style={styles.brandRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoM}>M</Text>
          </View>
          <Text style={styles.brandName}>{item.brand}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.priceTag}>
          <Text style={styles.dollar}>$</Text>
          <Text style={styles.priceAmount}>{item.price}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.addBtn}>
          <Ionicons name="add" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>

    ))}
   </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 16,
    width: width * 0.43,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    height:'50%',
    justifyContent:'center'
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120, 
    marginBottom: 10,
  },
  burgerImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    marginBottom: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  logoCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E3000E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoM: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  brandName: {
    fontSize: 12,
    color: '#A0A0A0',
    marginLeft: 6,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dollar: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 4,
    marginRight: 1,
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  addBtn: {
    backgroundColor: '#F5F5F5',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});