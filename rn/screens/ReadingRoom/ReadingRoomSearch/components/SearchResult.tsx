import React, { useState } from 'react'
import BaseText from '@components/BaseText'
import {
  StyleSheet,
  View,
  Pressable,
  Text
} from 'react-native'
function SearchResult(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <BaseText style={styles.tips}>已找到9999条匹配的经文</BaseText>
      <Pressable style={styles.item}>
        <BaseText style={styles.itemIndex}>1: 9</BaseText>
        <BaseText style={styles.itemContent}>
          <BaseText>犹大从他玛氏生法勒斯和谢拉。法勒斯生希斯</BaseText>
          <BaseText style={styles.itemContentHightlight}>希斯仑</BaseText>
          <BaseText>。希斯仑生亚兰。</BaseText>
        </BaseText>
      </Pressable>
      <Pressable style={styles.item}>
        <BaseText style={styles.itemIndex}>1: 9</BaseText>
        <BaseText style={styles.itemContent}>
          <BaseText>犹大从他玛氏生法勒斯和谢拉。法勒斯生希斯</BaseText>
          <BaseText style={styles.itemContentHightlight}>希斯仑</BaseText>
          <BaseText>。希斯仑生亚兰。</BaseText>
        </BaseText>
      </Pressable>
      <Pressable style={styles.item}>
        <BaseText style={styles.itemIndex}>1: 9</BaseText>
        <BaseText style={styles.itemContent}>
          <BaseText>犹大从他玛氏生法勒斯和谢拉。法勒斯生希斯</BaseText>
          <BaseText style={styles.itemContentHightlight}>希斯仑</BaseText>
          <BaseText>。希斯仑生亚兰。</BaseText>
        </BaseText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18
  },
  tips: {
    fontSize: 14,
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

export default SearchResult