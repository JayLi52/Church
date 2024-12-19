/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import AppNavigator from './rn/navigation/AppNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import store, { RootState } from '@store/store'
import { Provider, useSelector } from 'react-redux'
import { StatusBar, Platform, View, StyleSheet } from 'react-native'

// 定义状态栏高度常量
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0

// 创建一个包装组件来使用 Redux hooks
const AppContent = () => {
  const statusBarStyle = useSelector((state: RootState) => state.statusBar.barStyle)
  const statusBarBgColor = useSelector((state: RootState) => state.statusBar.backgroundColor)
  const isTranslucent = useSelector((state: RootState) => state.statusBar.isTranslucent)
  const isHidden = useSelector((state: RootState) => state.statusBar.isHidden)
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBgColor}
        translucent={isTranslucent}
        hidden={isHidden}
      />
      <GestureHandlerRootView style={styles.content}>
        <AppNavigator />
      </GestureHandlerRootView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  }
});

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
