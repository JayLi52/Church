import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'
import BaseText from '@components/BaseText'
const CalendarIcon = require('@assets/images/readingroom/calendar.png')
const TaskIcon = require('@assets/images/spiritualcultivation/prayerheader.png')

function Statistics(): React.JSX.Element {
  const imgs=["https://bpy-store.oss-cn-hangzhou.aliyuncs.com/library/202109/412/c6fad46958dce4b483dbf65a15b23f84.png",
              "https://bpy-store.oss-cn-hangzhou.aliyuncs.com/library/202109/412/c6fad46958dce4b483dbf65a15b23f84.png",
              "https://bpy-store.oss-cn-hangzhou.aliyuncs.com/library/202109/412/c6fad46958dce4b483dbf65a15b23f84.png"
            ]
  const time="08:14"
  return (
    <View style={styles.container}>
      <View style={[styles.unitBox, styles.unitBoxLeft]}>
        <View>
          <BaseText style={styles.unitBoxTitle}>晨祷</BaseText>
          <View style={styles.unitBoxCountWrap}>
            <BaseText style={styles.unitBoxTimeText}>{time}</BaseText>
            <BaseText style={styles.unitBoxTimeOutText}>后日出</BaseText>
          </View>
        </View>
      </View>
      <View style={[styles.unitBoxRight]}>
        <View style={[styles.unitBoxup]}>
          {
imgs.map((item, index) => {
 return  <Image style={styles.churchIcon} source={{ uri: item}} />
})

          }
       <BaseText style={styles.unitTJText}>15</BaseText> 
      </View>
        <View style={[styles.unitBoxdown]}>
        <Image style={[styles.churchDGIcon]} source={TaskIcon} />
        <BaseText style={styles.unitBoxCountText}>新的祷告</BaseText>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 110,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unitBox: {
    backgroundColor: '#FFC69C',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 100
  },
  unitBoxLeft: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  unitBoxRight: {
    width: 166,
    marginLeft: 14,
  },
  unitBoxTitle: {
    color: '#fff',
    fontSize: 12,
    marginTop:-30
  },
  unitBoxCountWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  unitBoxTimeText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold'
  },
  unitBoxCountText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 30
  },
  unitBoxTimeOutText :{
    color: '#fff',
    paddingLeft:5,
    fontSize: 17,
    lineHeight: 30
  },
  unitTJText: {
    paddingHorizontal: 8,
    width: 32,
    height: 32,
    borderRadius: 21,
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderWidth: 2,
    borderStyle: 'solid',
    paddingTop:6,
    color: '#FFC69C',
    fontWeight: 'bold'
  },
  churchIcon: {
    width: 32,
    height: 32,
    borderRadius: 21,
    borderColor: '#FFF',
    borderWidth: 2,
    borderStyle: 'solid',
    marginRight: 2
  },  
  churchDGIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft:15
  },  
  churchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  unitBoxup: {
    backgroundColor: '#FFC69C',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  unitBoxdown: {
    backgroundColor: '#FFC69C',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 48,
    marginTop:4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

export default Statistics