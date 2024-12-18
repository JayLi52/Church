import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomTabBar from '@components/CustomTabBar'
import HomeScreen from '../screens/HomeScreen'
import ReadingRoomHomeScreen from '../screens/ReadingRoom/ReadingRoomHomeScreen'
import SpiritualCultivationHomeScreen from '../screens/SpiritualCultivation/SpiritualCultivationHomeScreen'
import OrganizationNavigator from './Organization'

const Tab = createBottomTabNavigator()
const TabBarList = [
  {
    name: 'OrganizationReadingRoomHome',
    component: ReadingRoomHomeScreen,
    options: {
      tabBarLabel: '书籍',
      iconDefault: require('@assets/images/tabbar/book_default.png'),
      iconActive: require('@assets/images/tabbar/book_active.png')
    }
  },
  {
    name: 'OrganizationTask',
    component: SpiritualCultivationHomeScreen,
    options: {
      tabBarLabel: '灵修',
      iconDefault: require('@assets/images/tabbar/task_default.png'),
      iconActive: require('@assets/images/tabbar/task_active.png')
    }
  },
  {
    name: 'OrganizationChat',
    component: HomeScreen,
    options: {
      tabBarLabel: '培训',
      iconDefault: require('@assets/images/tabbar/chat_default.png'),
      iconActive: require('@assets/images/tabbar/chat_active.png')
    }
  },
  {
    name: 'Organization',
    component: OrganizationNavigator,
    options: {
      tabBarLabel: '活动',
      iconDefault: require('@assets/images/tabbar/organization.png'),
      iconActive: require('@assets/images/tabbar/organization_active.png')
    }
  },
  {
    name: 'OrganizationTopic',
    component: HomeScreen,
    options: {
      tabBarLabel: '讨论',
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
      initialRouteName="OrganizationReadingRoomHome"
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