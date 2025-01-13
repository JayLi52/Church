import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator, {StackNavigator} from '@components/Navigator';
import {useSelector} from 'react-redux';
import LoadingSpinner from '@components/LoadingSpinner';
import {RootState} from '@store/store';
import {
  useAuthTabList,
  useMainTabList,
  useMineTabList,
} from './config/navigationConfig';

// const Stack = createNativeStackNavigator();
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const AppNavigator = () => {
  const {isLoggedIn, isPersonalPage} = useSelector(
    (state: RootState) => state.global,
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const mainTabList = useMainTabList();
  const authTabList = useAuthTabList();
  const mineTabList = useMineTabList();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const getNavigator = () => {
    if (!isLoggedIn) {
      return <StackNavigator screens={authTabList as any} />;
    }
    return isPersonalPage ? (
      <TabNavigator tabList={mineTabList} />
    ) : (
      <TabNavigator tabList={mainTabList} />
    );
  };

  return (
    <NavigationContainer theme={customTheme}>
      {getNavigator()}
    </NavigationContainer>
  );
};

export default AppNavigator;
