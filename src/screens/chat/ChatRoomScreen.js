import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Send, ChevronLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthContext } from "../../context/AuthContext";
import { useMessages } from "../../hooks/useChat";
import { sendMessage } from "../../services/chatService";

export default function ChatRoomScreen({ route, navigation }) {
  const { chatId, otherEmail } = route.params;
  const { user } = useAuthContext();
  const { messages, loading } = useMessages(chatId);
  const [text, setText] = useState("");
  const flatListRef = useRef(null);
  const insets = useSafeAreaInsets();

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(chatId, { text: text.trim(), senderId: user.uid, senderEmail: user.email });
    setText("");
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }) => {
    const isMe = item.senderId === user.uid;
    return (
      <View style={[styles.msgRow, isMe ? styles.msgMe : styles.msgOther]}>
        {isMe ? (
          <LinearGradient colors={["#FF7E52", "#FF512F"]} style={styles.bubbleMe}>
            <Text style={styles.textMe}>{item.text}</Text>
          </LinearGradient>
        ) : (
          <View style={styles.bubbleOther}>
            <Text style={styles.textOther}>{item.text}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#111" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{otherEmail.split("@")[0]}</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} /><Text style={styles.onlineStatus}>Online</Text>
          </View>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0}>
        <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 10 }]}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor="#AAA"
              value={text}
              onChangeText={setText}
              multiline
            />
            <TouchableOpacity onPress={handleSend} disabled={!text.trim()} style={[styles.sendBtn, !text.trim() && { backgroundColor: '#EEE' }]}>
              <Send size={20} color={text.trim() ? "#FFF" : "#CCC"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 15, backgroundColor: "#FFF", borderBottomWidth: 1, borderColor: "#F0F0F0", shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 5 },
  backBtn: { backgroundColor: "#F5F5F5", padding: 10, borderRadius: 15 },
  headerInfo: { marginLeft: 15 },
  headerName: { fontSize: 18, fontWeight: "800", color: "#111", textTransform: "capitalize" },
  onlineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4CAF50", marginRight: 5 },
  onlineStatus: { fontSize: 12, color: "#777", fontWeight: "600" },
  list: { padding: 20, paddingBottom: 40 },
  msgRow: { marginBottom: 14, maxWidth: "82%" },
  msgMe: { alignSelf: "flex-end" },
  msgOther: { alignSelf: "flex-start" },
  bubbleMe: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 24, borderBottomRightRadius: 4 },
  bubbleOther: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 24, borderBottomLeftRadius: 4, backgroundColor: "#F2F2F2" },
  textMe: { color: "#FFF", fontSize: 16, fontWeight: "500" },
  textOther: { color: "#333", fontSize: 16, fontWeight: "500" },
  inputContainer: { backgroundColor: "#FFF", paddingHorizontal: 20, paddingTop: 10, borderTopWidth: 1, borderColor: "#F5F5F5" },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9F9F9", borderRadius: 28, paddingHorizontal: 15, paddingVertical: 8, borderWidth: 1, borderColor: "#EEE" },
  input: { flex: 1, color: "#111", fontSize: 16, marginRight: 10, paddingVertical: 10 },
  sendBtn: { backgroundColor: "#FF7E52", padding: 12, borderRadius: 20 }
});