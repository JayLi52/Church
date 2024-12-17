import React from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

function BaseText(props: {
  children: React.ReactNode
  style?: any
}): React.JSX.Element {
  return (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PingFang SC'
  }
})

export default BaseText