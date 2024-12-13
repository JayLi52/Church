import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native"
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image
} from 'react-native'
import BaseText from '@components/BaseText'

const CalendarIcon = require('@assets/images/readingroom/calendar.png')
const MoreIcon = require('@assets/images/readingroom/more-function.png')

function Header(): React.JSX.Element {
  const img='https://bpy-store.oss-cn-hangzhou.aliyuncs.com/library/202109/412/c6fad46958dce4b483dbf65a15b23f84.png';
  const name="教会基本信息"
  return (
    <View style={styles.container}>
      <View style={styles.churchBox}>
        <Image style={styles.churchIcon} source={{ uri: img }} />
        <BaseText style={styles.churchText}>{name}</BaseText>
      </View>
      <View style={styles.rightBox}>
        <Image style={styles.rightIcon} source={CalendarIcon} />
        <Image style={styles.rightIcon} source={MoreIcon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 62,
    paddingLeft: 16,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  churchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  churchIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderColor: '#FFF',
    borderWidth: 1,
    borderStyle: 'solid',
    marginRight: 8
  },
  churchText: {
    color: '#2E2E2E',
    fontSize: 16
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  rightIcon: {
    width: 44,
    height: 44,
  }
})

export default Header