import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user } = useAuthContext();
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user?.email?.[0].toUpperCase()}
        </Text>
      </View>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user?.email}</Text>

      <Text style={styles.label}>User ID</Text>
      <Text style={styles.value}>{user?.uid}</Text>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 48 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: "#4F46E5", alignItems: "center",
    justifyContent: "center", marginBottom: 28, alignSelf: "center",
  },
  avatarText: { color: "#fff", fontSize: 28, fontWeight: "700" },
  label: { fontSize: 12, color: "#999", marginTop: 20, marginBottom: 4, textTransform: "uppercase" },
  value: { fontSize: 16, color: "#111", fontWeight: "500" },
  backBtn: { marginTop: 40 },
  backText: { color: "#4F46E5", fontSize: 15 },
});