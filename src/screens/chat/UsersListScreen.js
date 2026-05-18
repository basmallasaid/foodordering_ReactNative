import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Search } from "lucide-react-native";
import { getCollection } from "../../services/firestoreService";
import { getOrCreateChat } from "../../services/chatService";
import { useAuthContext } from "../../context/AuthContext";

export default function UsersListScreen({ navigation }) {
  const { user } = useAuthContext();
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection("users").then(all => {
      setFiltered(all.filter(u => u.uid !== user.uid));
      setLoading(false);
    });
  }, []);

  const startChat = async (otherUser) => {
    const chatId = await getOrCreateChat(user.uid, user.email, otherUser.uid, otherUser.email);
    navigation.navigate("ChatRoom", { chatId, otherEmail: otherUser.email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>New Chat</Text>
      </View>
      <View style={styles.searchBar}>
        <Search size={20} color="#AAA" />
        <TextInput placeholder="Search users by email..." placeholderTextColor="#AAA" style={styles.input} />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userRow} onPress={() => startChat(item)}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{item.email[0].toUpperCase()}</Text></View>
            <View>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.subText}>Tap to start chatting</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { flexDirection: "row", alignItems: "center", padding: 20, gap: 15 },
  backBtn: { backgroundColor: "#F5F5F5", padding: 10, borderRadius: 15 },
  title: { fontSize: 24, fontWeight: "900", color: "#111" },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9F9F9", margin: 20, paddingHorizontal: 15, borderRadius: 22, height: 55, borderWidth: 1, borderColor: '#EEE' },
  input: { flex: 1, color: "#111", marginLeft: 10, fontSize: 15 },
  userRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 25, paddingVertical: 18, borderBottomWidth: 1, borderColor: "#F9F9F9" },
  avatar: { width: 50, height: 50, borderRadius: 18, backgroundColor: "#FF7E52", justifyContent: "center", alignItems: "center", marginRight: 15 },
  avatarText: { color: "#FFF", fontWeight: "800", fontSize: 18 },
  email: { color: "#111", fontSize: 16, fontWeight: '700' },
  subText: { color: '#AAA', fontSize: 12, marginTop: 2 }
});