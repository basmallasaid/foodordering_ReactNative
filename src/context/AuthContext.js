// import { createContext, useContext } from "react";
// import { useAuth } from "../hooks/useAuth";

// const AuthContext=createContext(null);
// export const AuthProvider=({children})=>{
//     const auth=useAuth();
//     return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
// }
// export const useAuthContext = () => useContext(AuthContext);
// src/context/AuthContext.js
import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { setDocument } from "../services/firestoreService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  // save user profile to Firestore when logged in
  React.useEffect(() => {
    if (auth.user) {
      setDocument("users", auth.user.uid, {
        uid:   auth.user.uid,
        email: auth.user.email,
      });
    }
  }, [auth.user]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);