import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import CustomTabBar from '@components/CustomTabBar';
import {ImageSourcePropType, Text, View} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface StackScreen {
  name: string;
  renderComponent: React.ComponentType<any>;
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

export function StackNavigator({screens}: {screens: StackScreen[]}) {
  return (
    <Stack.Navigator initialRouteName={screens[0]?.name}>
      {screens.map((screen: StackScreen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.renderComponent}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
}

const TabScreen = ({stackScreens}: {stackScreens: StackScreen[]}) => (
  <StackNavigator screens={stackScreens} />
);

function TabNavigator({tabList}: TabNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName={tabList[0].name}>
      {tabList.map(item => (
        <Tab.Screen key={item.name} name={item.name} options={item.options}>
          {() => <TabScreen stackScreens={item.stackScreens} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}

export default TabNavigator;
