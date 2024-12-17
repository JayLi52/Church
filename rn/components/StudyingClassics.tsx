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

function StudyingClassics(props:any): React.JSX.Element {
  
  const {data}=props
  return (
    <View style={styles.container}>
      <BaseText style={styles.tips}>已找到9999条匹配的经文</BaseText>{
    
      <Pressable style={styles.item}>
        <BaseText style={styles.itemIndex}>1</BaseText>
        <BaseText style={styles.itemContent}>
          <BaseText>{data}</BaseText>
          <BaseText style={styles.itemContentHightlight}>{data}</BaseText>
          <BaseText>{data}</BaseText>
        </BaseText>
      </Pressable>
     }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18
  },
  tips: {
    fontSize: 20,
    color: '#7A7A7A',
    lineHeight: 20,
    marginBottom: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  itemIndex: {
    backgroundColor: '#3B8E58',
    marginRight: 6,
    color: '#FFF',
    lineHeight: 18,
    paddingLeft: 5,
    paddingRight: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginTop: 4
  },
  itemContent: {
    flex: 1,
    lineHeight: 25,
    fontSize: 18,
    color: '#000000'
  },
  itemContentHightlight: {
    backgroundColor: '#CEEDD9'
  },
})

export default StudyingClassics