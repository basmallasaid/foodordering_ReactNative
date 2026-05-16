import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { mapFirebaseError } from "../utils/errorMessages";

export const signUp=async(email,password)=>{
    try {
        const userCredential=await createUserWithEmailAndPassword(auth,email,password);
        console.log("user:",userCredential.user)
         return userCredential.user;
        
    } catch (error) {
        console.log(error.code)
        throw new Error(mapFirebaseError(error.code));  
    }
   
}

export const signIn=async(email,password)=>{
    try {
         const userCredential=await signInWithEmailAndPassword(auth,email,password);
         console.log("user:",userCredential.user);
         return userCredential.user;
        
    } catch (error) {
        console.log(error);
         throw new Error(mapFirebaseError(error.code));  
    }
}

export const logout=async()=>{
    await signOut(auth);
};

export const resetPassword=async(email)=>{
    await sendPasswordResetEmail(auth,email);
}