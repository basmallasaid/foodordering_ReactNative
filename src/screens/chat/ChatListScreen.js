import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native"; // Clean icon
import { useAuthContext } from "../../context/AuthContext";
import { useUserChats } from "../../hooks/useChat";
import { getOrCreateChat } from "../../services/chatService";

export default function ChatListScreen({ navigation }) {
  const { user } = useAuthContext();
  const { chats, loading } = useUserChats(user?.uid);

  const openChat = async (otherUid, otherEmail) => {
    const chatId = await getOrCreateChat(user.uid, user.email, otherUid, otherEmail);
    navigation.navigate("ChatRoom", { chatId, otherEmail });
  };

  if (loading) return <ActivityIndicator style={styles.loader} color="#FF7E52" />;

  const renderItem = ({ item }) => {
    const otherUid = item.members?.find((m) => m !== user.uid) ?? "";
    const otherEmail = item.memberEmails ? item.memberEmails[otherUid] : "User";
    const name = otherEmail.split("@")[0];
    const time = item.lastMessageTime?.toDate ? item.lastMessageTime.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

    return (
      <TouchableOpacity style={styles.chatCard} onPress={() => openChat(otherUid, otherEmail)} activeOpacity={0.7}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{otherEmail[0]?.toUpperCase()}</Text>
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.chatName}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage || "Send a message..."}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.newChatBtn} onPress={() => navigation.navigate("UsersList")}>
          <Plus size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No conversations yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  loader: { flex: 1, justifyContent: 'center', backgroundColor: "#FFF" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 25, paddingVertical: 20 },
  title: { fontSize: 32, fontWeight: "900", color: "#111", letterSpacing: -1 },
  newChatBtn: { backgroundColor: "#FF7E52", padding: 12, borderRadius: 18, elevation: 5, shadowColor: "#FF7E52", shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  chatCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9F9F9", padding: 16, borderRadius: 24, marginBottom: 15, borderWidth: 1, borderColor: "#F0F0F0" },
  avatar: { width: 56, height: 56, borderRadius: 22, backgroundColor: "#FF7E52", justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  chatInfo: { flex: 1, marginLeft: 15 },
  nameRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  chatName: { fontSize: 17, fontWeight: "700", color: "#111", textTransform: "capitalize" },
  time: { fontSize: 11, color: "#AAA", fontWeight: "600" },
  lastMsg: { fontSize: 14, color: "#777", fontWeight: "400" },
  emptyText: { color: "#BBB", textAlign: "center", marginTop: 100, fontSize: 16 }
});