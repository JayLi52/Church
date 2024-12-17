/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import AppNavigator from './rn/navigation/AppNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import store from '@store/store'
import { Provider } from 'react-redux';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App
