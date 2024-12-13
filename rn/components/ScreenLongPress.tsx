import React from 'react'
import { useNavigation } from "@react-navigation/native"
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

function ScreenLongPress ( props: { children: React.ReactNode, target: String }) {
  const navigation = useNavigation()
  const longPress = Gesture.LongPress()
    .minDuration(700)
    .onFinalize((e, success) => {
      if (success) {
        const [stack, screen] = props.target?.split('/')
        navigation.navigate(stack as never, { screen: screen } as never)
      }
    })
    .runOnJS(true);
  return (
    <GestureDetector gesture={longPress}>
      { props.children }
    </GestureDetector>
  )
}

export default ScreenLongPress