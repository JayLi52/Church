import React from 'react'
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native'
import Swiper from 'react-native-swiper'
import BasicView from './components/BasicView'
import ReadingData from './components/ReadingData'
import ShareData from './components/ShareData'
import { RootState } from '@store/store'
import { useSelector } from 'react-redux'
import { transformStyles } from '@utils/index'

function MineHome(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Swiper
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.dotActive} />}
        paginationStyle={{ bottom: 10 }}
        loop={false}
      >
        <BasicView />
        <ReadingData />
        <ShareData />
      </Swiper>
    </View>
  )
}

const styles = transformStyles({
  container: {
    backgroundColor: "#FFF",
    flexDirection: 'column',
    paddingTop: 0,
    position: 'relative',
    flex: 1
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 'auto',
  },
  dot: {
    backgroundColor: 'rgba(46, 46, 46, 0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8
  },
  dotActive: {
    backgroundColor: '#FF8800',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8
  }
})

export default MineHome