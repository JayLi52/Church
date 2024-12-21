import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CustomTabBar from '@components/CustomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface StackScreen {
    name: string;
    component: React.ComponentType<any>;
    options: {
        title: string;
        [key: string]: any;
    };
}

interface TabItem {
    name: string;
    component: React.ComponentType<any>;
    options: {
        tabBarLabel: string;
        iconDefault: any;
        iconActive: any;
    };
    stackScreens?: StackScreen[];
}

interface TabNavigatorProps {
    tabList: TabItem[];
    initialRouteName: string;
}

function StackNavigator({ screens }: { screens: StackScreen[] }) {
    return (
        <Stack.Navigator initialRouteName={screens[0].name}>
            {screens.map(screen => (
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

function TabNavigator({ tabList, initialRouteName }: TabNavigatorProps) {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={props => <CustomTabBar {...props} />}
            initialRouteName={initialRouteName}
        >
            {tabList.map((item) => (
                <Tab.Screen
                    key={item.name}
                    name={item.name}
                    component={
                        item.stackScreens
                            ? () => <StackNavigator screens={item.stackScreens!} />
                            : item.component
                    }
                    options={item.options}
                />
            ))}
        </Tab.Navigator>
    );
}

export default TabNavigator; 