import BaseText from '@components/BaseText'
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Pressable
} from 'react-native'
function FilterTags(): React.JSX.Element {
  const allTags = ['全部', '新约', '旧约', '历史书', '书信', '律法书', '先知书', '四福音', '使徒行传', '启示录']
  const [ currentTags, setCurrentTags ] = useState(['全部'])
  const selectTag = (tag: string) => {
    if (tag === '全部') {
      return setCurrentTags(['全部'])
    }
    let tags = currentTags
    if (currentTags.includes(tag)) {
      tags = tags.filter(t => t !== tag)
    } else {
      tags.push(tag)
    }
    if (tags.length === 0) {
      tags = ['全部']
    }
    if (tags.length > 1) {
      tags = tags.filter(t => t !== '全部')
    }
    setCurrentTags(tags)
  }
  return (
    <View style={styles.container}>
      {
        allTags.map((tag, index) => (
          <Pressable
            key={index}
            style={[styles.tag, currentTags.includes(tag) && styles.tagActive]}
            onPress={() => selectTag(tag)}
          >
            <BaseText style={[styles.tagText, currentTags.includes(tag) && styles.tagActiveText]}>{tag}</BaseText>
          </Pressable>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 8,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  tag: {
    height: 30,
    borderRadius: 15,
    minWidth: 60,
    paddingHorizontal: 9,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  tagText: {
    color: '#8A8A8A',
    fontSize: 14,
  },
  tagActive: {
    backgroundColor: '#FFF7E8'
  },
  tagActiveText: {
    color: '#FF8800'
  }
})

export default FilterTags