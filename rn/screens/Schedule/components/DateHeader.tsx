import { transformStyles } from '@utils/index';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DateHeader = ({ date, navigation, add }) => {
  const months = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('ScheduleIndex')
          // navigation.goBack()
        }} style={styles.button}>
          <Image
            source={require('@assets/images/schedule/back.png')}
            style={styles.back}
            onError={() => {
              // 图片加载失败处理，这里简单展示一个默认占位图片（需要提前准备好占位图片资源）
              console.log("图片加载失败，使用默认占位图片");
            }}
          />
        </TouchableOpacity>
        <Text style={styles.dateText}>{date[0]}年{date[1]}月</Text>
      </View>
      <TouchableOpacity onPress={add} style={[styles.right]}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = transformStyles({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: 10,
    width: 390,
    height: 44
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  left: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  right: {
    marginRight: 20,
  },
  dateText: {
    fontSize: 14,
    color: '#2E2E2E'
  },
  back: {
    width: 44,
    height: 44
  },
  buttonText: {
    // fontWeight: 'bold',
    fontSize: 30,
    color: '#000000'
  }
});

export default DateHeader;