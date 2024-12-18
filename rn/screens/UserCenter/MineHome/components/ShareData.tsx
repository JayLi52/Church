import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import BaseText from '@components/BaseText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { transformStyles } from '@utils/index';

const { width, height } = Dimensions.get('window');

function ShareData(): React.JSX.Element {
  return (
    <View style={styles.container}>
      {/* 背景图片 */}
      <ImageBackground
        source={{
          uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
        }}
        style={styles.image}
      >
        {/* 添加模糊效果 */}
        <BlurView
          style={styles.blurView}
          blurType="light" // 模糊类型: light, dark, or extraLight
          blurAmount={20} // 模糊程度
        />
      </ImageBackground>

      {/* 数据展示容器 */}
      <View style={styles.infoBox}>
        {/* 圣经分享 */}
        <BaseText style={styles.sectionTitle}>圣经分享</BaseText>
        <View style={styles.mainCountContainer}>
          <BaseText style={styles.mainCount}>9999</BaseText>
          <BaseText style={styles.unit}>次</BaseText>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Icon name="share" size={24} color="#666" style={styles.cardIcon} />
            <View style={styles.cardContent}>
              <BaseText style={styles.cardValue}>9999</BaseText>
              <BaseText style={styles.cardLabel}>分享点击</BaseText>
            </View>
          </View>
          <View style={styles.card}>
            <Icon name="user-plus" size={24} color="#666" style={styles.cardIcon} />
            <View style={styles.cardContent}>
              <BaseText style={styles.cardValue}>9999</BaseText>
              <BaseText style={styles.cardLabel}>新用户注册</BaseText>
            </View>
          </View>
        </View>
      </View>
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
    ...StyleSheet.absoluteFillObject, // 覆盖整个背景图片
  },
  infoBox: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  mainCountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  mainCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  unit: {
    fontSize: 18,
    color: 'white',
    marginLeft: 5,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '45%',
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardContent: {
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
});

export default ShareData;
