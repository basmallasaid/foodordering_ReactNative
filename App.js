import React, { useState } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/Navigation/AppNavigator.js"
import SplashScreen from "./src/screens/SplashScreen.js";
import { CartProvider } from "./src/context/CartContext.js";
import { FavoritesProvider } from "./src/context/FavoritesContext.js";
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <AppNavigator />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}