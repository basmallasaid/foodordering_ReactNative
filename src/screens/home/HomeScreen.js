import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TextInput, StatusBar,
  Image, TouchableOpacity, FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Search, SlidersHorizontal, Bell, ShoppingBag, } from "lucide-react-native";
import CardH from "../../components/CardH";
import { useAuthContext } from "../../context/AuthContext";
import { getProducts } from "../../services/firestoreService";

const categories = [
  {
    id: "1",
    name: "Drinks",
    icon: "https://cdn-icons-png.flaticon.com/128/7451/7451569.png",
  },
  {
    id: "2",
    name: "All",
    icon: "https://cdn-icons-png.flaticon.com/128/9417/9417083.png",
  },
  {
    id: "3",
    name: "Burger",
    icon: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  },
  {
    id: "4",
    name: "Pizza",
    icon: "https://cdn-icons-png.flaticon.com/128/17673/17673020.png",
  },
];

export default function HomeScreen() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
  };


  const handleSearch = (text) => {
    setSearch(text);
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()) || item.brand.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase()
    );
    setFilteredProducts(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3024/3024605.png", }} style={styles.avatar} />
            <View>
              <Text style={styles.welcomeText}>Hi,<Text style={{ color: "#000" }}>{user?.email ? user.email.split("@")[0] : "Guest"}
              </Text>
              </Text>
              <Text style={styles.addressText}>2118 Thornridge Cir. Syra...</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <Bell size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconCircle}>
              <ShoppingBag size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.titleBold}> Hungry?<Text style={styles.titleLight}> Order & Eat</Text></Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#999" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Search for foods..."
              style={{ flex: 1 }}
              value={search}
              onChangeText={handleSearch}
            />
          </View>

          <TouchableOpacity style={styles.filterBtn}>
            <SlidersHorizontal size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <FlatList horizontal data={categories}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryFilter(item.name)}>
              <View style={[styles.categoryIconCircle,selectedCategory === item.name &&styles.activeCategory,]}>
                <Image source={{ uri: item.icon }} style={{ width: 30, height: 30 }} />
              </View>
              <Text style={styles.categoryName}>{item.name} </Text>
            </TouchableOpacity>
          )}
        />

        {/* Products */}
        <CardH products={filteredProducts} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, marginTop: 15, },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, },
  userInfo: { flexDirection: "row", alignItems: "center", },
  avatar: { width: 40, height: 40, borderRadius: 25, marginRight: 12, backgroundColor: "#fff", },

  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF7E52",
  },

  addressText: {
    fontSize: 12,
    color: "#999",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },

  titleSection: {
    marginVertical: 20,
  },

  titleBold: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7E52",
  },

  titleLight: {
    fontWeight: "300",
    color: "#666",
  },

  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  searchBar: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
  },

  filterBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF7E52",
    justifyContent: "center",
    alignItems: "center",
  },

  categoriesList: {
    paddingVertical: 10,
  },

  categoryItem: {
    alignItems: "center",
    marginRight: 25,
  },

  categoryIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  activeCategory: {
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  categoryName: { fontSize: 12, fontWeight: "500", },
});