import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { DefaultTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainNavigator from "./MainNavigator"
import MineNavigator from "./MineNavigator"
import ReadingRoomNavigator from "./ReadingRoomNavigator"
import AuthNavigator from "./AuthNavigator"
import globalStore from '@store/index';
import { observer } from "mobx-react"
import ScheduleNavigator from "./ScheduleNavigator"
import TeamNavigator from "./TeamNavigator"

const Stack = createNativeStackNavigator()

// 自定义主题
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  }
}

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Auth" component={AuthNavigator} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Team" component={TeamNavigator} />
    <Stack.Screen name="Mine" component={MineNavigator} />
    <Stack.Screen name="Main" component={MainNavigator} />
    <Stack.Screen name="Schedule" component={ScheduleNavigator} />
    <Stack.Screen name="ReadingRoom" component={ReadingRoomNavigator} />
  </Stack.Navigator>
);

const AppNavigator = observer(() => {
  // const globalStore = useContext(GlobalStoreContext);

  return (
    <NavigationContainer theme={customTheme}>
      {globalStore.isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
});


export default AppNavigator
