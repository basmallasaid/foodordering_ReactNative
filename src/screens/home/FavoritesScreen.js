import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';
import CardH from '../../components/CardH';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>My Favorites</Text>
        
        {favorites.length > 0 ? (
          <CardH products={favorites} />
        ) : (
          <View style={styles.emptyContainer}>
            <Heart size={80} color="#EEE" />
            <Text style={styles.emptyText}>Your favorites list is empty</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scroll: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#999', marginTop: 10, fontSize: 16 }
});