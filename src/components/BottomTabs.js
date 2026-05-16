import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import routers from '../utils/route';
import Home from '../pages/Home';
import Favourite from '../pages/Favourite';
import Products from '../pages/Products';
import profile from '../pages/profile';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let label;

          
          if (route.name === routers.Home) {
            iconName = focused ? 'home' : 'home-outline';
            label = 'Home';
          } else if (route.name === routers.Favourite) {
            iconName = focused ? 'heart' : 'heart-outline';
            label = 'Likes';
          } else if (route.name === routers.Products) {
            iconName = focused ? 'cart' : 'cart-outline';
            label = 'Shop';
          } else if (route.name === routers.Profile) {
            iconName = focused ? 'person' : 'person-outline';
            label = 'User';
          }

          
          return (
            <View style={[
              styles.tabItem, 
              focused ? styles.activeTabItem : styles.inactiveTabItem
            ]}>
              <Ionicons 
                name={iconName} 
                size={22} 
                color={focused ? 'black' : '#666'} 
              />
              {focused && (
                <Text style={styles.tabLabel}>{label}</Text>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name={routers.Home} component={Home} />
      <Tab.Screen name={routers.Favourite} component={Favourite} />
      <Tab.Screen name={routers.Products} component={Products} />
      <Tab.Screen name={routers.Profile} component={profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#181818', 
    position: 'absolute', 
    bottom: 25,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35, 
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 10,
    paddingBottom: 0, 
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
  activeTabItem: {
    backgroundColor: 'white', 
  },
  inactiveTabItem: {
    backgroundColor: '#252525', 
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tabLabel: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  }
});