import React from 'react'
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Dimensions
} from 'react-native'
import BaseText from '@components/BaseText'
const { width, height } = Dimensions.get('window')

function ReadingData(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960' }} style={styles.image} />
      <View style={styles.infoBox}>
        <BaseText style={styles.blockTitle}>圣经阅读</BaseText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: 'column',
    paddingTop: 0,
    flex: 1,
    width,
    height
  },
  image: {
    width,
    height,
    // height: 290,
    objectFit: 'cover',
    flexShrink: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingTop: 68,
    paddingLeft: 18,
    paddingRight: 18
  },
  blockTitle: {
    lineHeight: 22,
    fontSize: 16,
    color: 'white'
  }
})

export default ReadingData