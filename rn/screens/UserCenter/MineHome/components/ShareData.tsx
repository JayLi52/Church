import React from 'react';
import { StyleSheet, ImageBackground, View, Dimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6'; // 确保库正确引用
import { transformStyles } from '@utils/index';

const { width, height } = Dimensions.get('window');

function ShareData(): React.JSX.Element {
  // 统一的动态数据数组
  const sections = [
    {
      id: 1,
      sectionTitle: '圣经分享',
      count: 9999,
      data: [
        { id: 1, title: '分享点击', value: 9999, icon: 'share-from-square' },
        { id: 2, title: '新用户注册', value: 9999, icon: 'user-group' },
      ],
    },
    {
      id: 2,
      sectionTitle: '答题分享',
      count: 9999,
      data: [
        { id: 3, title: '分享点击', value: 9999, icon: 'share-from-square' },
        { id: 4, title: '新用户注册', value: 9999, icon: 'user-group' },
      ],
    },
  ];

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
        <BlurView style={styles.blurView} blurType="light" blurAmount={20} />
      </ImageBackground>

      {/* 数据展示 */}
      <View style={styles.infoBox}>
        {sections.map((section) => (
          <View key={section.id}>
            {/* 标题和统计次数 */}
            <BaseText style={styles.sectionTitle}>{section.sectionTitle}</BaseText>
            <View style={styles.mainCountContainer}>
              <BaseText style={styles.mainCount}>{section.count}</BaseText>
              <BaseText style={styles.unit}>次</BaseText>
            </View>

            {/* 卡片列表 */}
            <View style={styles.cardRow}>
              {section.data.map((item) => (
                <View style={styles.card} key={item.id}>
                  <FontAwesome
                    name={item.icon}
                    iconStyle="solid"
                    style={styles.cardIcon}
                  />
                  <View style={styles.cardContent}>
                    <BaseText style={styles.cardValue}>{item.value}</BaseText>
                    <BaseText style={styles.cardLabel}>{item.title}</BaseText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
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
    width: 370,
    gap: 20,
    marginBottom: 30,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '40%',
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardIcon: {
    marginBottom: 10,
    fontSize: 15,
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
