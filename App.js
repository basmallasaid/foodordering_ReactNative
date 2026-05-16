// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import DynamicStack from './Navigation/dynamicStack';
// export default function App() {
//   return (
//     <DynamicStack/>
//   );
// }
import React, { useState } from "react";
import { AuthProvider } from "./src/context/AuthContext";
// import AppNavigator from "./src/navigation/AppNavigator";
import AppNavigator from "./src/Navigation/AppNavigator.js"
import SplashScreen from "./src/screens/SplashScreen.js";

export default function App() {
    const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  return (
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  );
}