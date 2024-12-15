import React from 'react'
import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import {
  StyleSheet,
  Pressable,
  View,
  Image
} from 'react-native'
import BaseText from '@components/BaseText'
import { transformStyles } from '@utils/index'

interface CustomTabOptions extends BottomTabNavigationOptions {
  iconDefault?: any,
  iconActive?: any,
  tabBarLabel: string
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {
        state.routes.map((route, index) => {
          const options = descriptors[route.key].options as CustomTabOptions
          const isFocused = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            })
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
              // {
              //   screen: route.state?.routeNames[0]
              // }
            }
          }
          const IconSource = isFocused ? options.iconActive : options.iconDefault
          return (
            <Pressable key={index} onPressIn={onPress} style={[isFocused ? styles.tabBarButtonActive : styles.tabBarButton]}>
              <Image style={[isFocused ? styles.tabBarIconActive : styles.tabBarIcon]} source={IconSource} />
              {
                isFocused && <BaseText style={styles.tabBarText}>{options.tabBarLabel}</BaseText>
              }
            </Pressable>
          )
        })
      }
    </View>
  )
}

const styles = transformStyles({
  tabBar: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    height: 90,
    paddingTop: 10,
    paddingLeft: 21,
    paddingRight: 21,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -4
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabBarButton: {
    width: 44,
    height: 44,
  },
  tabBarButtonActive: {
    backgroundColor: '#FF8800',
    width: 80,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    fontSize: 12,
    paddingRight: 12,
    position: 'relative'
  },
  tabBarIcon: {
    width: 44,
    height: 44
  },
  tabBarIconActive: {
    width: 44,
    height: 44,
    position: 'absolute',
    left: 0,
    top: -5
  },
  tabBarText: {
    color: '#fff',
    fontWeight: 'bold',
    width: 20,
    fontSize: 10,
    textAlign: 'center'
  }
})

export default CustomTabBar