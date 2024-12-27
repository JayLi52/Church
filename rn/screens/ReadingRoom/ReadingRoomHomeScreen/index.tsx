import React, { useEffect } from 'react'
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native'

import Header from '@components/Header'
import Statistics from './components/Statistics'
import BookCase from './components/BookCase'
import { transformStyles } from '@utils/index'
import { useNavigation } from '@react-navigation/native'

function ReadingRoomHomeScreen(): React.JSX.Element {
  const navigation = useNavigation()
  useEffect(() => {
    // StatusBar.setBarStyle('dark-content')
    navigation.navigate('BookManageNavigator', {
      screen: 'CommentList'
    });
  }, [])
  return (
    <View style={styles.container}>
      <Header />
      <Statistics />
      <BookCase />
    </View>
  )
}

const styles = transformStyles({
  container: {
    backgroundColor: "#F6F6F6",
    flexDirection: 'column',
    flex: 1
  }
})

export default ReadingRoomHomeScreen