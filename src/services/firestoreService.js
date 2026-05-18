import {collection,doc,addDoc,setDoc,getDoc,
getDocs,updateDoc,deleteDoc,onSnapshot,query, where,serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

// ── GET ALL PRODUCTS ─────────────────────────────────────
export const getProducts = async () => {
  try {
    const snap = await getDocs(collection(db, "products"));
    return snap.docs.map((d) => ({...d.data(),id: d.id }));
  } catch (error) {
    console.log("Error getting products:", error);
    return [];
  }
};

// ── GET ONE PRODUCT ──────────────────────────────────────
export const getProduct = async (id) => {
  try {
    const snap = await getDoc(doc(db, "products", id));
    return snap.exists() ? {...snap.data(),id: snap.id } : null;
  } catch (error) {
    console.log("Error getting product:", error);
    return null;
  }
};

// ── SET DOCUMENT  ─────────────────────────────
export const setDocument = async (collectionName, id, data) => {
  try {
    await setDoc(
      doc(db, collectionName, id),
      { ...data, updatedAt: serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    console.log("Error setting document:", error);
  }
};

// ── ADD DOCUMENT  ───────────────────────────────
export const addDocument = async (collectionName, data) => {
  try {
    const ref = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (error) {
    console.log("Error adding document:", error);
    return null;
  }
};

// ── GET ONE DOCUMENT ─────────────────────────────────────
export const getDocument = async (collectionName, id) => {
  try {
    const snap = await getDoc(doc(db, collectionName, id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (error) {
    console.log("Error getting document:", error);
    return null;
  }
};

// ── GET ALL DOCUMENTS ────────────────────────────────────
export const getCollection = async (collectionName) => {
  try {
    const snap = await getDocs(collection(db, collectionName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.log("Error getting collection:", error);
    return [];
  }
};

// ── UPDATE DOCUMENT ──────────────────────────────────────
export const updateDocument = async (collectionName, id, data) => {
  try {
    await updateDoc(doc(db, collectionName, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.log("Error updating document:", error);
  }
};

// ── DELETE DOCUMENT ──────────────────────────────────────
export const deleteDocument = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.log("Error deleting document:", error);
  }
};

// ── REALTIME COLLECTION LISTENER ─────────────────────────
export const listenToCollection = (collectionName, callback, filters = []) => {
  try {
    const constraints = filters.map(({ field, operator, value }) =>
      where(field, operator, value)
    );
    const q = query(collection(db, collectionName), ...constraints);
    return onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(data);
    });
  } catch (error) {
    console.log("Error listening to collection:", error);
  }
};

// ── REALTIME DOCUMENT LISTENER ───────────────────────────
export const listenToDocument = (collectionName, id, callback) => {
  try {
    return onSnapshot(doc(db, collectionName, id), (snap) => {
      callback(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    });
  } catch (error) {
    console.log("Error listening to document:", error);
  }
};