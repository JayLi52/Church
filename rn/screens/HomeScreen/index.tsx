import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import ScreenLongPress from '@components/ScreenLongPress'

function HomeScreen(): React.JSX.Element {
  return (
    <ScreenLongPress target={'Mine/MineProfile'}>
      <View style={styles.container}>
          <Text>Home</Text>
      </View>
    </ScreenLongPress>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default HomeScreen