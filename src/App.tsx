import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@/store';
import {RootNavigator} from '@/navigation';
import {ErrorBoundary} from '@/components/ErrorBoundary';
import {startupService} from '@/services/startup';
import {navigationService} from '@/services/navigation';
import {theme} from '@/theme';

const App = () => {
  useEffect(() => {
    startupService.start().catch(error => {
      console.error('App startup failed:', error);
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <NavigationContainer
            ref={navigationService.setNavigator}
            theme={theme}
            onStateChange={() => {
              const currentRoute = navigationService.getCurrentRoute();
              if (currentRoute) {
                // 追踪页面访问
                analytics.trackScreenView(currentRoute.name);
              }
            }}>
            <RootNavigator />
          </NavigationContainer>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default App;
