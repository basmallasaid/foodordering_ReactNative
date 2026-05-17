import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { ChevronLeft, Heart, Star, Clock, Flame, Minus, Plus } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getProduct } from '../../services/firestoreService';
import { useCartContext } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;
  const insets = useSafeAreaInsets(); 
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCartContext();
  const { toggleFavorite,isFavorite } = useFavorites();

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const data = await getProduct(productId);
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigation.navigate('MainTabs', { screen: 'Orders' });
  };

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" color="#FF7E52" /></View>;
  if (!product) return <View style={styles.loader}><Text>Product not found!</Text></View>;

  return (
    <View style={styles.container}>
     
      <View style={[styles.header, { top: insets.top + 10 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => toggleFavorite(product)}>
  <Heart 
    size={22} 
    color={isFavorite(product.id) ? "#FF3B30" : "#000"} 
    fill={isFavorite(product.id) ? "#FF3B30" : "none"} 
  />
</TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Product Image Section */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.img }} style={styles.mainImg} />
        </View>

        {/* Details Section */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.brandName}>{product.brand}</Text>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIconBg}><Star size={16} color="#FFD700" fill="#FFD700" /></View>
              <Text style={styles.statText}>4.8</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIconBg}><Clock size={16} color="#666" /></View>
              <Text style={styles.statText}>25 min</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIconBg}><Flame size={16} color="#FF7E52" /></View>
              <Text style={styles.statText}>150 kcal</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {product.description || "Indulge in our delicious, freshly made burger. Crafted with premium ingredients to satisfy your cravings."}
          </Text>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.stepper}>
              <TouchableOpacity onPress={() => quantity > 1 && setQuantity(v => v - 1)} style={styles.stepBtn}>
                <Minus size={20} color="#000" />
              </TouchableOpacity>
              <Text style={styles.quantityNum}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(v => v + 1)} style={styles.stepBtn}>
                <Plus size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer / Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.totalPriceContainer}>
           <Text style={styles.totalPriceLabel}>Total Price</Text>
           <Text style={styles.totalPriceVal}>${(product.price * quantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    paddingHorizontal: 20, position: 'absolute', zIndex: 10, width: '100%' 
  },
  iconBtn: { 
    width: 45, height: 45, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.9)', 
    justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1 
  },
  imageContainer: { width: '100%', height: 380, backgroundColor: '#F9F9F9', justifyContent: 'center', alignItems: 'center' },
  mainImg: { width: '85%', height: '85%', resizeMode: 'contain' },
  
  infoSection: { 
    padding: 25, backgroundColor: '#FFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, 
    marginTop: -40, minHeight: 400,
    shadowColor: "#000", shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  brandName: { color: '#FF7E52', fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 },
  productName: { fontSize: 28, fontWeight: '900', color: '#111', marginTop: 5 },
  price: { fontSize: 26, fontWeight: '900', color: '#111' },
  
  statsRow: { flexDirection: 'row', marginVertical: 25, gap: 15 },
  statItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', padding: 8, paddingHorizontal: 12, borderRadius: 15, gap: 8 },
  statIconBg: { backgroundColor: '#FFF', padding: 4, borderRadius: 8 },
  statText: { fontSize: 13, color: '#111', fontWeight: '700' },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 10 },
  description: { fontSize: 15, color: '#777', lineHeight: 22, marginBottom: 30 },
  
  quantitySection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 30, padding: 6 },
  stepBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  quantityNum: { marginHorizontal: 18, fontSize: 18, fontWeight: '800' },

  bottomBar: { 
    position: 'absolute', bottom: 0, width: '100%',
    padding: 25, flexDirection: 'row', alignItems: 'center', gap: 20, 
    backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#F0F0F0'
  },
  totalPriceContainer: { flex: 1 },
  totalPriceLabel: { fontSize: 12, color: '#999', fontWeight: '600' },
  totalPriceVal: { fontSize: 24, fontWeight: '900', color: '#111' },
  addBtn: { flex: 2, backgroundColor: '#111', height: 65, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.2 },
  addBtnText: { color: '#FFF', fontSize: 16, fontWeight: '900' }
});