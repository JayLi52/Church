import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "@components/TabNavigator";
import { useSelector } from "react-redux";
import LoadingSpinner from "@components/LoadingSpinner";
import { RootState } from "@store/store";
import { authTabList, mainTabList, mineTabList } from "./config/navigationConfig";

const Stack = createNativeStackNavigator();
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const AppNavigator = () => {
  const { isLoggedIn, isPersonalPage } = useSelector((state: RootState) => state.global);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const getNavigator = () => {
    if (!isLoggedIn) {
      return <TabNavigator tabList={authTabList} initialRouteName="Auth" />;
    }
    return isPersonalPage ? (
      <TabNavigator tabList={mineTabList} initialRouteName="MineProfile" />
    ) : (
      <TabNavigator tabList={mainTabList} initialRouteName="BookManageNavigator" />
    );
  };

  return (
    <NavigationContainer theme={customTheme}>
      {getNavigator()}
    </NavigationContainer>
  );
};

export default AppNavigator;
