import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native"
import { GetAllSpiritualCultivation } from '@services/SpiritualCultivationService'
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image
} from 'react-native'
import BaseText from '@components/BaseText'

const SearchIcon = require('@assets/images/readingroom/icon_search.png')
const ViewIcon = require('@assets/images/spiritualcultivation/prayergreen.png')
const TimeIcon = require('@assets/images/readingroom/time.png')
const DefaultImage = 'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png'

function TabList(props: any): React.JSX.Element {
  const { onTabChange } = props
  const [currentTab, setCurrentTab] = useState(0)
  const [spiritualCultivationList, setspiritualCultivationList] = useState([])
  const list = [
    { label: '今日灵修', value: 0 },
    { label: '往日学经', value: 2 },
    { label: '往日答题', value: 1 },
    { label: '往日祷告', value: 3 }
  ]
  const selectTab = (val: number) => {
    if (val === currentTab) return
    setCurrentTab(val)
  }

  useEffect(() => {
    onTabChange(currentTab)
  }, [currentTab])
  
  return (
    <View style={styles.tabListWrap}>
      {
        list.map(item => {
          const isActive = currentTab === item.value
          return (
            <Pressable key={item.value} style={[styles.tabItem, isActive && styles.tabItemActive]} onPress={() => selectTab(item.value)}>
              <BaseText style={[isActive ? styles.tabItemTextActive : styles.tabItemText]}>{item.label}</BaseText>
              {
                isActive && <View style={styles.tabItemActiveLine} />
              }
            </Pressable>
          )
        })
      }
    </View>
  )
}

function SpiritualCultivationItem(props: any): React.JSX.Element {
  const { data } = props
  const imgs=["https://bpy-store.oss-cn-hangzhou.aliyuncs.com/library/202109/412/c6fad46958dce4b483dbf65a15b23f84.png",
    "https://bpy-store.oss-cn-hangzhou.aliyuncs.com/library/202109/412/c6fad46958dce4b483dbf65a15b23f84.png",
    "https://bpy-store.oss-cn-hangzhou.aliyuncs.com/library/202109/412/c6fad46958dce4b483dbf65a15b23f84.png"
  ]
  return (
    <View>
      <View>
      <BaseText style={styles.bookItemStatisticsItemText}>昨日,08.18</BaseText>
      </View>
       <View style={styles.bookItem}>
   
   <View style={styles.bookItemLeft}>
     <View style={styles.bookItemBgWrap}>
       <Image style={styles.bookItemBg} source={{ uri: DefaultImage }} />
       <BaseText style={styles.bookItemProgressText}>65%</BaseText>
     </View>
     <View style={styles.bookItemProgressWrap}>
       <View style={styles.bookItemProgress} />
       <View style={[styles.bookItemPregressInner, { width: 40 }]}></View>
     </View>
   </View>
   <View>
     <BaseText style={styles.bookItemTitle}>{data.name}</BaseText>
     <View style={styles.bookItemStatisticsWrap}>
       <View style={styles.bookItemStatisticsItem}>
         <Image style={styles.bookItemStatisticsItemIcon} source={ViewIcon} />
       </View>
     </View>
     <View style={styles.bookItemReaders}>{
      imgs.map(it=>
        <Image style={styles.churchIcon} source={{ uri:it }} />
      )
    }
       <BaseText style={styles.bookItemReadersText}>  9999人已完成</BaseText>
     </View>
     <View style={styles.bookItemReaders}>
       <BaseText style={styles.spTimeText}>2023-08-10</BaseText>
       <BaseText style={styles.spCityText}>四川成都</BaseText>
       <BaseText style={styles.spMinText}>34分钟</BaseText>
     </View>
   </View>
 </View>
    </View>
   
  )
}

function SpiritualCultivationCase(): React.JSX.Element {
  const [spiritualCultivationList, setspiritualCultivationList] = useState([])
  const [currentTab, setCurrentTab] = useState(2)
  const onTabChange = (tab: any) => {
    setCurrentTab(tab)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetAllSpiritualCultivation({
          partId: 1
        })
        setspiritualCultivationList(res.data || [])
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [currentTab])
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
      <TabList onTabChange={onTabChange} />
      <ScrollView style={styles.listWrap}>
          {
            spiritualCultivationList.map(item => <SpiritualCultivationItem key={(item as any).name} data={item} />)
          }
            </ScrollView>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F6F6',
  },
  innerContainer: {
    backgroundColor: '#FFF',
    flexGrow: 1,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 10
  },
  tabListWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 28,
    paddingRight: 64,
    backgroundColor: '#FFF',
    height: 44
  },
  tabItem: {
    height: 44,
    justifyContent: 'center',
  },
  tabItemText: {
    fontSize: 14,
    color: '#7A7A7A',
    lineHeight: 20
  },
  tabItemActive: {
    paddingTop: 8,
    paddingBottom: 3,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabItemTextActive: {
    fontSize: 18,
    fontWeight: 500,
    color: '#2E2E2E',
    lineHeight: 25
  },
  tabItemActiveLine: {
    width: 10,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#FF8800'
  },
  tabListSearchIconWrap: {
    position: 'absolute',
    right: 16,
    top: 0,
    width: 44,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabListSearchIcon: {
    width: 24,
    height: 24
  },
  spTimeText: {
    color: '#8A8A8A',
    fontSize: 12
  },
  spCityText: {
    marginLeft:10,
    color: '#8A8A8A',
    fontSize: 12
  },
  spMinText: {
    marginLeft:10,
    color: '#8A8A8A',
    fontSize: 12
  },
  bookItem: {
    height: 102,
    flexDirection: 'row',
    marginBottom: 36
  },
  bookItemLeft: {
    width: 90,
    marginRight: 40,
    justifyContent: 'space-between'
  },
  bookItemBgWrap: {
    width: 90,
    height: 90,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 6
  },
  bookItemBg: {
    width: 90,
    height: 90
  },
  bookItemProgressText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#FFF',
    position: 'absolute',
    right: 6,
    bottom: 6
  },
  listWrap: {
    paddingHorizontal: 24,
    paddingTop: 24
  },
  bookItemProgressWrap: {
    height: 4,
    width: 90,
    position: 'relative',
    paddingTop: 1
  },
  bookItemProgress: {
    height: 2,
    width: 90,
    backgroundColor: '#D8D8D8'
  },
  bookItemPregressInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#059973',
  },
  bookItemRight: {
    
  },
  bookItemTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
    marginBottom: 10
  },
  bookItemStatisticsWrap: {
    flexDirection: 'row',
    marginBottom: 14
  },
  bookItemStatisticsItem: {
    borderRadius: 12,
    width: 35,
    backgroundColor: '#DFF0E5',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bookItemStatisticsItemIcon: {
    height: 20,
    width: 26,
    marginLeft:4
  },
  bookItemStatisticsItemText: {
    color: '#2E2E2E',
    fontSize: 12
  },
  bookItemReaders: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  churchIcon: {
    width: 20,
    height: 20,
    borderRadius: 21,
    borderColor: '#FFF',
    borderWidth: 2,
    borderStyle: 'solid',
    marginRight: -5
  },  
})

export default SpiritualCultivationCase