import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import BaseText from '@components/BaseText'

function BarChart (): React.JSX.Element {
  const data = [40, 80, 50, 100, 0, 0, 0]
  return (
    <View style={styles.barChartBox}>
      {
        data.map((item, index) => {
          const dynamicStyle = {}
          if (item) {
            Object.assign(dynamicStyle, {
              height: item * 0.5,
              backgroundColor: '#FFFFFF'
            })
          }
          return (
            <View key={index} style={[styles.barChartItem, dynamicStyle]} />
          )
        })
      }
    </View>
  )
}

function Statistics(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={[styles.unitBox, styles.unitBoxLeft]}>
        <View>
          <BaseText style={styles.unitBoxTitle}>本周已读</BaseText>
          <View style={styles.unitBoxCountWrap}>
            <BaseText style={styles.unitBoxCountText}>9999</BaseText>
            <BaseText style={[styles.unitBoxTitle, styles.unitBoxCountTextSub]}>min</BaseText>
          </View>
        </View>
        <BarChart />
      </View>
      <View style={[styles.unitBox, styles.unitBoxRight]}>
        <BaseText style={styles.unitBoxTitle}>已读书籍</BaseText>
        <BaseText style={styles.unitBoxCountText}>0003</BaseText>
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
    backgroundColor: '#3B8E58',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 70
  },
  unitBoxLeft: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  unitBoxRight: {
    width: 110,
    marginLeft: 14,
  },
  unitBoxTitle: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 17,
  },
  unitBoxCountWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  unitBoxCountText: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 30,
    fontWeight: 'bold',
    marginTop: 5
  },
  unitBoxCountTextSub: {
    marginLeft: 6,
    position: 'relative',
    top: -3
  },
  barChartBox: {
    width: 66,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  barChartItem: {
    height: 10,
    width: 6,
    borderRadius: 4,
    backgroundColor: '#6EAE85'
  }
})

export default Statistics