import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ReadingRoomHomeScreen from '../screens/ReadingRoom/ReadingRoomHomeScreen'
import AnnotationList from '@screens/BookManage/AnnotationList';
import VersionManageScreen from '@screens/BookManage/VersionManage';
import GenealogyScreen from '@screens/BookManage/Genealogy';
import BookIntro from '@screens/BookManage/BookIntro';

const Stack = createNativeStackNavigator();

export default function BookManageNavigator() {
    return (
        <Stack.Navigator initialRouteName="VersionManageScreen">
            <Stack.Screen
                name="AnnotationList"
                component={AnnotationList}
                options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="ReadingRoomHomeScreen"
                component={ReadingRoomHomeScreen}
                options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="VersionManageScreen"
                component={VersionManageScreen}
                options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="GenealogyScreen"
                component={GenealogyScreen}
                options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="BookIntro"
                component={BookIntro}
                options={{ headerShown: false, animation: 'slide_from_right' }}
            />
        </Stack.Navigator>
    );
}
