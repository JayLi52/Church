import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import BaseText from '@components/BaseText';
import { transformStyles } from '@utils/index';

const { width, height } = Dimensions.get('window');

function ReadingData(): React.JSX.Element {
  return (
    <View style={styles.container}>
      {/* 背景图片 */}
      <ImageBackground
        source={{
          uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
        }}
        style={styles.image}
        blurRadius={10} // 模糊程度
      >
        {/* 数据展示 */}
        <View style={styles.infoBox}>
          {/* 标题 */}
          <BaseText style={styles.title}>圣经阅读</BaseText>

          {/* 拆分的 TotalCount */}
          <View style={styles.totalCountContainer}>
            <BaseText style={styles.totalCountNumber}>99999</BaseText>
            <BaseText style={styles.totalCountUnit}>次</BaseText>
          </View>

          {/* 两个时长区域 */}
          <View style={styles.timeBox}>
            <View style={styles.timeItem}>
              <BaseText style={styles.label}>阅读时长</BaseText>
              <BaseText style={styles.timeValue}>9999时99分</BaseText>
            </View>
            <View style={styles.timeItem}>
              <BaseText style={styles.label}>事工时长</BaseText>
              <BaseText style={styles.timeValue}>9999时99分</BaseText>
            </View>
          </View>

          {/* 学经进度卡片 */}
          <View style={styles.cardBox}>
            <View style={styles.card}>
              <BaseText style={styles.cardTitle}>学经答题</BaseText>
              <BaseText style={styles.cardValue}>9999</BaseText>
              <View style={styles.progressBar} />
            </View>
            <View style={styles.card}>
              <BaseText style={styles.cardTitle}>小组学经</BaseText>
              <BaseText style={styles.cardValue}>9999</BaseText>
              <View style={styles.progressBar} />
            </View>
            <View style={styles.card}>
              <BaseText style={styles.cardTitle}>单人学经</BaseText>
              <BaseText style={styles.cardValue}>9999</BaseText>
              <View style={styles.progressBar} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = transformStyles({
  container: {
    flex: 1,
    width: 390,
    height,
  },
  image: {
    width: 390,
    height,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, // 使模糊层覆盖整个背景图
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  totalCountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  totalCountNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  totalCountUnit: {
    fontSize: 18,
    color: 'white',
    marginLeft: 5,
  },
  timeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  timeItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#d9d9d9',
    marginBottom: 5,
  },
  timeValue: {
    fontSize: 16,
    color: 'white',
  },
  cardBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '30%',
    padding: 15,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
});

export default ReadingData;
