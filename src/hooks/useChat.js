import { useEffect, useState } from "react";
import { listenToMessages, listenToUserChats } from "../services/chatService";

export const useMessages = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!chatId) return;
    const unsubscribe = listenToMessages(chatId, (msgs) => {
      setMessages(msgs);
      setLoading(false);
    });
    return unsubscribe;
  }, [chatId]);

  return { messages, loading };
};

export const useUserChats = (uid) => {
  const [chats, setChats]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const unsubscribe = listenToUserChats(uid, (data) => {
      setChats(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [uid]);

  return { chats, loading };
};