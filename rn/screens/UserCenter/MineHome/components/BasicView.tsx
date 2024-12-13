import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  Dimensions
} from 'react-native'
import BaseText from '@components/BaseText'
const { width, height } = Dimensions.get('window')

interface User {
  name: string
}

interface BasicViewProps {
  user: User
}

function BasicView({ user }: BasicViewProps): React.JSX.Element {
  console.log(user)
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960' }} style={styles.image} />
      <View style={styles.infoBox}>
        <View style={styles.userInfo}>
          <BaseText style={styles.username}>{user.name}</BaseText>
          <BaseText style={styles.useretc}>四川成都 ｜ 1532KM</BaseText>
        </View>
        <BaseText style={styles.uid}>UID：0000000001</BaseText>
        <View style={styles.tags}>
          <BaseText style={styles.tagItem}>阅读家</BaseText>
          <BaseText style={styles.tagItem}>阅读家</BaseText>
        </View>
        <View style={styles.btns}>
          <BaseText style={styles.btn}>2024-02-22</BaseText>
          <BaseText style={styles.btn}>2 年 364 天</BaseText>
        </View>
        <View style={styles.groupItem}>
          <BaseText style={styles.groupItemText}>芝加哥西北华人</BaseText>
          <View style={styles.groupItemEtc}>
            <BaseText style={styles.groupItemEtcText}>2024-02-02</BaseText>
            <BaseText style={styles.groupItemEtcTextMain}>1000天</BaseText>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: 'column',
    paddingTop: 0,
    flex: 1,
    width,
    height
  },
  image: {
    width: '100%',
    height: 290,
    flexShrink: 0
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    top: -24,
    padding: 24,
    flexDirection: 'column'
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    height: 25
  },
  username: {
    fontSize: 18,
    fontWeight: 500,
    color: '#2E2E2E'
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
    height: 20
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    height: 22
  },
  tagItem: {
    paddingLeft: 8,
    paddingRight: 8,
    lineHeight: 22,
    backgroundColor: '#508BBC',
    borderRadius: 11,
    color: '#fff',
    fontSize: 14,
    flexGrow: 0,
    flexShrink: 0
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    height: 30
  },
  btn: {
    paddingLeft: 11,
    paddingRight: 11,
    lineHeight: 30,
    backgroundColor: '#F6F6F6',
    color: '#8A8A8A',
    fontSize: 14,
    borderRadius: 15,
    marginRight: 16
  },
  groupItem: {
    height: 70,
    borderRadius: 4,
    backgroundColor: '#F6F6F6',
    borderColor: '#ECECEC',
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16
  },
  groupItemText: {
    color: '#2E2E2E',
    fontSize: 12
  },
  groupItemEtc: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  groupItemEtcText: {
    color: '#9E9E9E',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 2
  },
  groupItemEtcTextMain: {
    color: '#2E2E2E',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 25
  }
})

export default BasicView