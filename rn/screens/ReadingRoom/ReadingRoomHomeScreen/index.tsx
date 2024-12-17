import React from 'react'
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native'

import Header from '@components/Header'
import Statistics from './components/Statistics'
import BookCase from './components/BookCase'

function ReadingRoomHomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F6F6" />
      <Header />
      <Statistics />
      <BookCase />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    flexDirection: 'column',
    flex: 1
  }
})

export default ReadingRoomHomeScreen