import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigator from "./MainNavigator";
import MineNavigator from "./MineNavigator";
import AuthNavigator from "./AuthNavigator";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import LoadingSpinner from "@components/LoadingSpinner"; // 自定义加载组件

const Stack = createNativeStackNavigator();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Auth" component={AuthNavigator} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isLoggedIn, isPersonalPage } = useSelector((state: RootState) => state.global);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <NavigationContainer theme={customTheme}>
      {isLoggedIn ? (isPersonalPage ? <MineNavigator /> : <MainNavigator />) : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
