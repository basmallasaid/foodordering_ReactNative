import { db } from "../config/firebase";
import { collection,addDoc,query,orderBy,onSnapshot,serverTimestamp,doc, setDoc,getDoc,getDocs,where,} from "firebase/firestore";

// ── create or get existing chat between 2 users ──────────
export const getOrCreateChat = async (currentUid,currentEmail, otherUid, otherEmail) => {
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("members", "array-contains", currentUid));
  const snap = await getDocs(q);

  const existing = snap.docs.find((d) => d.data().members.includes(otherUid));
  if (existing) return existing.id;

  const newChat = await addDoc(chatsRef, {
    members: [currentUid, otherUid],
    memberEmails: { [currentUid]: currentEmail, [otherUid]: otherEmail }, 
    createdAt: serverTimestamp(),
    lastMessage: "",
    lastMessageTime: serverTimestamp(),
  });

  return newChat.id;
};

// ── send a message ────────────────────────────────────────
export const sendMessage = async (chatId, message) => {
  const messagesRef = collection(db, "chats", chatId, "messages");

  await addDoc(messagesRef, {
    text: message.text,
    senderId: message.senderId,
    senderEmail: message.senderEmail,
    createdAt: serverTimestamp(),
  });

  // update last message on chat doc
  await setDoc(
    doc(db, "chats", chatId),
    { lastMessage: message.text, lastMessageTime: serverTimestamp() },
    { merge: true }
  );
};

// ── listen to messages in real time ──────────────────────
export const listenToMessages = (chatId, callback) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate(),
    }));
    callback(messages);
  });
};

// ── listen to all chats for current user ─────────────────
export const listenToUserChats = (uid, callback) => {
  const q = query(
    collection(db, "chats"),
    where("members", "array-contains", uid)
  );

  return onSnapshot(q, (snap) => {
    const chats = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(chats);
  });
};