import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native"
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  Text,
  Modal
} from 'react-native'
import BaseText from '@components/BaseText'
import { transformStyles } from '@utils/index';

function Header(): React.JSX.Element {
  const img = 'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/library/202109/412/c6fad46958dce4b483dbf65a15b23f84.png';
  const name = "教会基本信息"

  const navigation = useNavigation()
  const route = useRoute();

  const [isVisible, setIsVisible] = useState(false); // 控制弹层可见性

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // 获取导航堆栈的状态
    const stackState = navigation.getState();

    if (route.name === 'OrganizationCalendar') {

    }
  }, []);

  return (
    <View style={styles.container}>
      {
        route.name === 'OrganizationCalendar' ? <View style={styles.churchBox}>
          <Image style={styles.churchIcon} source={{ uri: img }} />
          <BaseText style={styles.churchText}>{name}</BaseText>
        </View> : <View></View>
      }

      <View style={styles.rightBox}>
        <TouchableOpacity style={styles.rightIcon} onPress={() => {
          navigation.navigate('Organization', { screen: 'OrganizationCalendar' })
        }}>
          <Image
            source={route.name === 'OrganizationCalendar' ? require('@assets/images/common/Calendar_active.png') : require('@assets/images/common/Calendar.png')} // 替换为你的图标
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightIcon} onPress={toggleModal}>
          <Image
            source={isVisible ? require('@assets/images/common/More_Feature_active.png') : require('@assets/images/common/More_Feature.png')} // 替换为你的图标
          />
        </TouchableOpacity>
      </View>

      {/* 弹层 */}
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade" // 弹层动画
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.overlay} onPress={toggleModal}>
          <View style={styles.popup}>
            {[
              {
                'btnText': '小组管理',
                onPress: () => {
                  console.log("点击了管理选项1")
                }
              },
            ].map(item => (
              <TouchableOpacity style={styles.popupOption} onPress={item.onPress}>
                <Text style={styles.popupOptionText}>{item.btnText}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = transformStyles({
  container: {
    height: 62,
    paddingLeft: 16,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  churchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  churchIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderColor: '#FFF',
    borderWidth: 1,
    borderStyle: 'solid',
    marginRight: 8
  },
  churchText: {
    color: '#2E2E2E',
    fontSize: 16
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  rightIcon: {
    width: 44,
    height: 44,
  },
  overlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // top: 62,
  },
  popup: {
    width: 100,
    backgroundColor: '#fff',
    // borderRadius: 10,
    // padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    position: 'absolute',
    right: 0,
    top: 62,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  popupOption: {
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    height: 40,
  },
  popupOptionText: {
    fontSize: 14,
    color: '#2E2E2E',
  },
})

export default Header