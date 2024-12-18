import React from 'react';
import { StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import BaseText from '@components/BaseText';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // 引入图标库
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import { transformStyles } from '@utils/index';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useNavigation } from '@react-navigation/native';

// const IconQrCode = <FontAwesome6Pro name="qrcode" />;
// const IconQrCode = <FontAwesome6Pro name="qrcode" />;

const { width, height } = Dimensions.get('window');

function BasicView(): React.JSX.Element {
  const { user } = useSelector((state: RootState) => state.global);
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* 顶部背景图 */}
      <Image
        source={{
          uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
        }}
        style={styles.image}
      />

      {/* 信息盒子 */}
      <View style={styles.infoBox}>
        {/* 用户信息区域 */}
        <View style={styles.userInfo}>
          <BaseText style={styles.username}>{user.name}</BaseText>
          <BaseText style={styles.useretc}>四川成都 ｜ 1532KM</BaseText>

          {/* 二维码入口 */}
          <TouchableOpacity style={styles.qrIcon} onPress={() => {
            navigation.navigate('MineProfile', { screen: 'UserInfoQrCode' })
          }}>
            <FontAwesome name="qrcode" iconStyle='solid' style={styles.qrFontIcon} />
          </TouchableOpacity>
        </View>

        {/* UID */}
        <BaseText style={styles.uid}>UID：0000000001</BaseText>

        {/* 标签 */}
        <View style={styles.tags}>
          <BaseText style={styles.tagItem}>同工</BaseText>
          <BaseText style={[styles.tagItem, styles.tagYellow]}>姊妹</BaseText>
        </View>

        {/* 按钮区域 */}
        <View style={styles.btns}>
          <BaseText style={styles.btn}>2024-02-22</BaseText>
          <BaseText style={styles.btn}>2 年 364 天</BaseText>
        </View>

        {/* 组信息 */}
        <View style={styles.groupItem}>
          <BaseText style={styles.groupItemText}>芝加哥西北华人</BaseText>
          <View style={styles.groupItemEtc}>
            <BaseText style={styles.groupItemEtcText}>2024-02-02</BaseText>
            <BaseText style={styles.groupItemEtcTextMain}>1000天</BaseText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = transformStyles({
  container: {
    // backgroundColor: '#FFF',
    flex: 1,
    width: 390,
    height,
  },
  image: {
    width: 390,
    height: 290,
    flexShrink: 0,
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    top: -24,
    padding: 24,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  qrIcon: {
    position: 'absolute',
    right: 0,
    top: 30,
    padding: 5,
  },
  qrFontIcon: {
    fontSize: 50,
  },

  username: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2E2E2E',
  },
  useretc: {
    color: '#9E9E9E',
    fontSize: 14,
    lineHeight: 20,
  },
  uid: {
    color: '#8A8A8A',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  tagItem: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: '#508BBC',
    borderRadius: 11,
    color: '#fff',
    fontSize: 14,
  },
  tagYellow: {
    backgroundColor: '#F0C66F',
    color: '#333',
  },
  btns: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  btn: {
    paddingHorizontal: 11,
    lineHeight: 30,
    backgroundColor: '#F6F6F6',
    color: '#8A8A8A',
    fontSize: 14,
    borderRadius: 15,
  },
  groupItem: {
    height: 70,
    borderRadius: 4,
    backgroundColor: '#F6F6F6',
    borderColor: '#ECECEC',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  groupItemText: {
    color: '#2E2E2E',
    fontSize: 12,
  },
  groupItemEtc: {
    alignItems: 'center',
  },
  groupItemEtcText: {
    color: '#9E9E9E',
    fontSize: 12,
    marginBottom: 2,
  },
  groupItemEtcTextMain: {
    color: '#2E2E2E',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default BasicView;
