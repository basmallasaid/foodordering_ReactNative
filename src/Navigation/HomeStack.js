import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Heart, Store, User } from "lucide-react-native";

import HomeScreen from "../screens/home/HomeScreen";
import OrdersScreen from "../screens/products/OrdersScreen";
import FavoritesScreen from "../screens/home/FavoritesScreen";
import ProfileScreen from "../screens/home/ProfileScreen";
import ProductDetailsScreen from "../screens/products/Productdetails";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabIcon = ({ focused, Icon }) => {
  return (
    <View style={focused ? styles.activeContainer : styles.inactiveContainer}>
      <Icon
        size={24}
        color={focused ? "#000" : "#fff"}
        strokeWidth={2.3}
      />
    </View>
  );
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <CustomTabIcon focused={focused} Icon={Home} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => <CustomTabIcon focused={focused} Icon={Heart} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => <CustomTabIcon focused={focused} Icon={Store} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <CustomTabIcon focused={focused} Icon={User} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    marginHorizontal:15,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    height: 75,
    borderRadius: 40,
    backgroundColor: "#111",
    borderTopWidth: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  activeContainer: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
  marginTop: -25,
  },

  inactiveContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25
  },
});