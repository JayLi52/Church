import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import QrCode from '@screens/UserCenter/MineHome/components/QrCode';
import MineHome from '@screens/UserCenter/MineHome';

const Stack = createNativeStackNavigator();

export default function UserInfoNavigator() {
    return (
        <Stack.Navigator initialRouteName="UserInfoIndex">
            <Stack.Screen
                name="UserInfoIndex"
                component={MineHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserInfoQrCode"
                component={QrCode}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
