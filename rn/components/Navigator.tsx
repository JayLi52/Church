import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import CustomTabBar from '@components/CustomTabBar';
import { ImageSourcePropType } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface StackScreen {
    name: string;
    component: React.ComponentType<any>;
    options: NativeStackNavigationOptions;
}

export interface TabItem {
    name: string;
    options: {
        tabBarLabel: string;
        iconDefault: ImageSourcePropType | React.ComponentType<any>;
        iconActive: ImageSourcePropType | React.ComponentType<any>;
    };
    stackScreens: StackScreen[];
}

interface TabNavigatorProps {
    tabList: TabItem[];
}

export function StackNavigator(props: any) {
    const { route } = props;
    const screens = route.params?.screens || [];

    return (
        <Stack.Navigator initialRouteName={screens[0]?.name}>
            {screens.map((screen: any) => (
                <Stack.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={screen.options}
                />
            ))}
        </Stack.Navigator>
    );
}

function TabNavigator({ tabList }: TabNavigatorProps) {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={props => <CustomTabBar {...props} />}
            initialRouteName={tabList[0].name}
        >
            {tabList.map((item) => (
                <Tab.Screen
                    key={item.name}
                    name={item.name}
                    component={StackNavigator}
                    initialParams={{ screens: item.stackScreens }}
                    options={item.options}
                />
            ))}
        </Tab.Navigator>
    );
}

export default TabNavigator; 