import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Schedule from '@screens/Schedule'
import ScheduleList from '@screens/Schedule/list'

const Stack = createNativeStackNavigator()

export default function ScheduleNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ScheduleList" component={ScheduleList} />
            <Stack.Screen name="ScheduleIndex" component={Schedule} />
        </Stack.Navigator>
    )
}