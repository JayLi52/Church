import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OrganizationManager from '@screens/Organization/OrganizationManager'
import CalendarScreen from '@screens/Schedule';
import ScheduleList from '@screens/Schedule/list';
import MapViewContainer from '@screens/MapView';
import SpreadStatsAnswerScreen from '@screens/SpreadStats/answer';

const Stack = createNativeStackNavigator();

export default function OrganizationNavigator() {
    return (
        <Stack.Navigator initialRouteName="SpreadStatsAnswer">
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
            <Stack.Screen name="OrganizationScheduleList" component={ScheduleList} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationMap" component={MapViewContainer} options={{ headerShown: false }} />
            <Stack.Screen
                name="SpreadStatsAnswer"
                component={SpreadStatsAnswerScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
