import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomTabBar from '@components/CustomTabBar'
import HomeScreen from '../screens/HomeScreen'
import ReadingRoomHomeScreen from '../screens/ReadingRoom/ReadingRoomHomeScreen'
import SpiritualCultivationHomeScreen from '../screens/SpiritualCultivation/SpiritualCultivationHomeScreen'

const Tab = createBottomTabNavigator()
const TabBarList = [
  {
    name: 'Chat',
    component: HomeScreen,
    options: {
      tabBarLabel: 'Chat',
      iconDefault: require('@assets/images/tabbar/chat_default.png'),
      iconActive: require('@assets/images/tabbar/chat_active.png')
    }
  },
  {
    name: 'ReadingRoomHome',
    component: ReadingRoomHomeScreen,
    options: {
      tabBarLabel: '阅读',
      iconDefault: require('@assets/images/tabbar/book_default.png'),
      iconActive: require('@assets/images/tabbar/book_active.png')
    }
  },
  {
    name: 'Pray',
    component: HomeScreen,
    options: {
      tabBarLabel: 'Pray',
      iconDefault: require('@assets/images/tabbar/pray_default.png'),
      iconActive: require('@assets/images/tabbar/pray_active.png')
    }
  },
  {
    name: 'Task',
    component: SpiritualCultivationHomeScreen,
    options: {
      tabBarLabel: '灵修',
      iconDefault: require('@assets/images/tabbar/task_default.png'),
      iconActive: require('@assets/images/tabbar/task_active.png')
    }
  },
  {
    name: 'Topic',
    component: HomeScreen,
    options: {
      tabBarLabel: 'Topic',
      iconDefault: require('@assets/images/tabbar/topic_default.png'),
      iconActive: require('@assets/images/tabbar/topic_active.png')
    }
  }
]
function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="ReadingRoomHome"
    >
      {
        TabBarList.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={item.options}
            />
          )
        })
      }
    </Tab.Navigator>
  )
}

export default MainNavigator