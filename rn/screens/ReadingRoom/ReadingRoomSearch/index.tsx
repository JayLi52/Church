import React from 'react'
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native'
import BaseText from '@components/BaseText'

import SearchBar from './components/SearchBar'
import FilterTags from './components/FIlterTags'
import SearchResult from './components/SearchResult'

function ReadingRoomSearch(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F6F6" />
      <SearchBar />
      <FilterTags />
      <SearchResult />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: 'column',
    paddingTop: 11,
    flex: 1
  }
})

export default ReadingRoomSearch