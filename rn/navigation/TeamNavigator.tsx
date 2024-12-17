import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomTabBar from '@components/CustomTabBar'
import MineScreen from '@screens/UserCenter/MineHome'
import MallScreen from '@screens/UserCenter/MallHome'
import BookManage from '@screens/Team/BookManage'
import Organization from '@screens/Team/Organization'
import Devotion from '@screens/Team/Devotion'
import Live from '@screens/Team/Live'
import Topic from '@screens/Team/Topic'

const Tab = createBottomTabNavigator()
const TabBarList = [
  {
    name: 'Book',
    component: BookManage,
    options: {
      tabBarLabel: '书籍管理',
      iconDefault: require('@assets/images/book/BibleSelected.png'),
      iconActive: require('@assets/images/book/BibleSelected.png')
    }
  },
  {
    name: 'Live',
    component: Live,
    options: {
      tabBarLabel: '聊天室',
      iconDefault: require('@assets/images/book/Chatroom.png'),
      iconActive: require('@assets/images/book/Chatroom.png')
    }
  },
  {
    name: 'Devotion',
    component: Devotion,
    options: {
      tabBarLabel: '灵修',
      iconDefault: require('@assets/images/book/Devotion.png'),
      iconActive: require('@assets/images/book/Devotion.png')
    }
  },
  {
    name: 'Organization',
    component: Organization,
    options: {
      tabBarLabel: '组织',
      iconDefault: require('@assets/images/book/Organization.png'),
      iconActive: require('@assets/images/book/Organization.png')
    }
  },
  {
    name: 'Topic',
    component: Topic,
    options: {
      tabBarLabel: '话题',
      iconDefault: require('@assets/images/book/Topic.png'),
      iconActive: require('@assets/images/book/Topic.png')
    }
  }
]
function TeamNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Book"
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

export default TeamNavigator