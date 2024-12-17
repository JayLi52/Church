import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OrganizationManager from '@screens/Organization/OrganizationManager'
import CalendarScreen from '@screens/Schedule';

const Stack = createNativeStackNavigator();

export default function OrganizationNavigator() {
    return (
        <Stack.Navigator initialRouteName="OrganizationManager">
            <Stack.Screen
                name="OrganizationManager"
                component={OrganizationManager}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OrganizationCalendar"
                component={CalendarScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
