import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import BaseText from '@components/BaseText'

function ReadingRoomSearch(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <BaseText>商城</BaseText>
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