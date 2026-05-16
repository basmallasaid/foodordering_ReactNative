import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import Camera from "../../components/Camera";
import ProductCard from "../../components/ProductCard";

export default function HomeScreen({ navigation }) {
  const { user } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Error", "Failed to sign out.");
    }
  };

  return (
    <>
    <View style={styles.container}>
      <ProductCard/>

      {/* <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.profileBtnText}>Go to Profile</Text>
      </TouchableOpacity> */}

      

      {/* <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity> */}
    </View>
    <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection:'row',gap:20 ,justifyContent:'center'},
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  email: { fontSize: 15, color: "#666", marginBottom: 40 },
  profileBtn: {
    backgroundColor: "#4F46E5", borderRadius: 8,
    paddingVertical: 12, paddingHorizontal: 32, marginBottom: 12,
  },
  profileBtnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  signOutBtn: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 8,
    paddingVertical: 12, paddingHorizontal: 32,
  },
  signOutText: { color: "#666", fontSize: 15 },
});