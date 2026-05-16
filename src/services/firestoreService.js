import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.log("Error getting data:", error);
    return [];
  }
};