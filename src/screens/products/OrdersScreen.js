import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { ShoppingBag, Trash2 } from 'lucide-react-native';
import { useCartContext } from '../../context/CartContext'; 
import { useNavigation } from '@react-navigation/native';

export default function OrdersScreen() {
  const { cartItems, removeFromCart } = useCartContext();
 const navigation = useNavigation();

  const renderOrderItem = ({ item }) => (
     <TouchableOpacity  style={styles.orderCard} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
      <View style={styles.restaurantInfo}>
        <Image source={{ uri: item.img }} style={styles.resImage} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.resName}>{item.name}</Text>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.orderId)}>
          <Trash2 size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.headerTitle}>My Orders</Text>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ShoppingBag size={80} color="#EEE" />
            <Text style={styles.emptyText}>No orders yet. Add some food!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#111', marginBottom: 20,padding:20 },
  listContent: { paddingBottom: 100 },
  orderCard: { 
    backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 15,
    flexDirection: 'row', alignItems: 'center', elevation: 2
  },
  restaurantInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  resImage: { width: 60, height: 60, borderRadius: 15, resizeMode: 'contain' },
  resName: { fontSize: 16, fontWeight: 'bold' },
  brandText: { fontSize: 12, color: '#999' },
  priceText: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#999', marginTop: 10 }
});