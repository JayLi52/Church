import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Pressable
} from 'react-native'
// import BaseText from '@components/BaseText'
const SearchIcon = require('@assets/images/readingroom/icon_search_gray.png')
const CloseIcon = require('@assets/images/readingroom/icon_close.png')

function SearchBar(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <View style={styles.prefix}></View>
        <TextInput style={styles.textInput} placeholder="搜索" />
        <View style={styles.iconWrap}>
          <Image style={styles.searchIcon} source={SearchIcon} />
        </View>
      </View>
      <Pressable style={styles.iconWrap}>
        <Image style={styles.cancelIcon} source={CloseIcon} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    paddingLeft: 18,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBox: {
    height: 44,
    width: 200,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 8,
    borderRadius: 6
  },
  prefix: {
    width: 2,
    height: 22,
    backgroundColor: '#FF8800',
    borderRadius: 1
  },
  textInput: {
    flexGrow: 1,
    fontSize: 16,
    color: '#000'
  },
  searchIcon: {
    width: 18,
    height: 18
  },
  iconWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelIcon: {
    width: 44,
    height: 44
  },
  icon: {
    width: 44,
    height: 44
  }
})

export default SearchBar