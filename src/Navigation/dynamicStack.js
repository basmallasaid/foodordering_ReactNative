import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import routers from '../utils/route';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';

export default function DynamicStack() {
  const Stack = createNativeStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={routers.Home} component={Home}  />
        <Stack.Screen name={routers.Products} component={Products} />
        <Stack.Screen name={routers.ProductDetails} component={ProductDetails} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}