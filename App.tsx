/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import AppNavigator from './rn/navigation/AppNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'mobx-react'
import globalStore from '@store'
function App(): React.JSX.Element {
  useEffect(() => {
    globalStore.init()
  }, [])
  return (
    <GestureHandlerRootView>
      <Provider globalStore={globalStore}>
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App
