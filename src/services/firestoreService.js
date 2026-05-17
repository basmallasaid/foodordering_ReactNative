import {collection,getDoc,getDocs,doc,} from "firebase/firestore";
import { db } from "../config/firebase";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return data;
  } catch (error) {
    console.log("Error getting data:", error);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id,
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log("Error getting product:", error);
    return null;
  }
};