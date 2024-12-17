import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomTabBar from '@components/CustomTabBar'
import MineScreen from '@screens/UserCenter/MineHome'
import MallScreen from '@screens/UserCenter/MallHome'

const Tab = createBottomTabNavigator()
const TabBarList = [
  {
    name: 'MineProfile', 
    component: MineScreen, 
    options: {
      tabBarLabel: '个人',
      iconDefault: require('@assets/images/tabbar/chat_default.png'),
      iconActive: require('@assets/images/tabbar/mine_active.png')
    }
  },
  {
    name: 'Live',
    component: MineScreen,
    options: {
      tabBarLabel: '生活',
      iconDefault: require('@assets/images/tabbar/book_default.png'),
      iconActive: require('@assets/images/tabbar/book_active.png')
    }
  },
  {
    name: 'Social',
    component: MineScreen,
    options: {
      tabBarLabel: '社交',
      iconDefault: require('@assets/images/tabbar/pray_default.png'),
      iconActive: require('@assets/images/tabbar/pray_active.png')
    }
  },
  {
    name: 'PodCast',
    component: MineScreen,
    options: {
      tabBarLabel: '博客',
      iconDefault: require('@assets/images/tabbar/task_default.png'),
      iconActive: require('@assets/images/tabbar/task_active.png')
    }
  },
  {
    name: 'Mall',
    component: MallScreen,
    options: {
      tabBarLabel: '商城',
      iconDefault: require('@assets/images/tabbar/topic_default.png'),
      iconActive: require('@assets/images/tabbar/topic_active.png')
    }
  }
]
function MainNavigator () {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="MineProfile"
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