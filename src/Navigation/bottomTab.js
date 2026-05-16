import { View, Text } from 'react-native'
import React from 'react'
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import routers from '../utils/route';
import Home from '../pages/Home';
import Favourite from '../pages/Favourite';
import Products from '../pages/Products';
import profile from '../pages/profile';
export default function bottomTab() {
const Tab = createNativeBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={routers.Home} component={Home} />
      <Tab.Screen name={routers.Favourite} component={Favourite} />
      <Tab.Screen name={routers.Products} component={Products} />
      <Tab.Screen name={routers.Profile} component={profile} />
    </Tab.Navigator>
  );
}
  return (
    <MyTabs/>
  )
}