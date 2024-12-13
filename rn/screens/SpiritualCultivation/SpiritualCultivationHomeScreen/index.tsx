import React from 'react'
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native'

import Header from '@components/Header'
import StudyingClassics from '@components/StudyingClassics'
import Statistics from './components/Statistics'
import SpiritualCultivationCase from './components/SpiritualCultivationCase'

function SpiritualCultivationHomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F6F6" />
      <Header />
      <Statistics />
      <SpiritualCultivationCase />
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

export default SpiritualCultivationHomeScreen