import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatListScreen from "../screens/chat/ChatListScreen";
// import ChatRoomScreen from "../screens/chat/ChatRoomScreen";
import UsersListScreen from "../screens/chat/UsersListScreen";

const Stack = createNativeStackNavigator();

export default function ChatNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      {/* <Stack.Screen name="ChatRoom" component={ChatRoomScreen} /> */}
      <Stack.Screen name="UsersList" component={UsersListScreen} /> 
    </Stack.Navigator>
  );
}