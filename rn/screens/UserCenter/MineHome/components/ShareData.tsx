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

function ShareData(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960' }} style={styles.image} />
      <View style={styles.infoBox}>
        <BaseText>圣经阅读</BaseText>
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

    // backgroundImage: 'linear-gradient( 180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)',
    // backdropFilter: 'blur(20px)'
  }
})

export default ShareData