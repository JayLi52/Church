import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from '@screens/Auth/LoginScreen';
import Logining from '@screens/Auth/Logining';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Logining"
        component={Logining}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
