import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Image, TouchableOpacity, Text, Animated} from 'react-native';
import BaseText from '@components/BaseText';
import {commonStyles, transformStyles} from '@utils/index';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/store';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {setPageType} from '@store/pageSlice';

function Header(): React.JSX.Element {
  const avatar = useSelector((state: RootState) => state.global.user.avatar);
  const name = useSelector((state: RootState) => state.global.user.name);

  const navigation = useNavigation();
  const route = useRoute();

  const [isVisible, setIsVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  const toggleModal = () => {
    if (isVisible) {
      fadeOut();
    } else {
      setIsVisible(true);
      fadeIn();
    }
  };

  const pageType = useSelector((state: RootState) => state.page.pageType);
  const role = useSelector((state: RootState) => state.global.user.role);

  const dispatch = useDispatch();
  // 根据角色和页面类型计算弹层按钮
  const modalBtns = React.useMemo(() => {
    let btns: any[] = [];

    if (role === 'leader' && pageType === 'teamMember') {
      btns = [
        {
          key: 'groupManage',
          title: '小组管理',
          icon: 'users',
          onPress: () => {
            dispatch(setPageType('teamManage'));
            setIsVisible(false);
          },
        },
      ];
    } else if (role === 'leader' && pageType === 'teamManage') {
      btns = [
        {
          key: 'spreadStats',
          title: '传播统计',
          icon: 'chart-simple',
          onPress: () => {
            navigation.navigate('Organization', {
              screen: 'SpreadStatsAnswer',
            });
            setIsVisible(false);
          },
        },
        {
          key: 'exitManage',
          title: '退出管理',
          icon: 'right-from-bracket',
          onPress: () => {
            dispatch(setPageType('teamMember'));
            setIsVisible(false);
          },
        },
      ];
    } else {
      btns = [
        {
          key: 'exitManage',
          title: '成员按钮',
          icon: 'right-from-bracket',
          onPress: () => {
            dispatch(setPageType('teamMember'));
            setIsVisible(false);
          },
        },
      ];
    }

    return btns;
  }, [role, pageType, navigation]);

  return (
    <View style={styles.container}>
      {['team', 'teamManage', 'teamMember'].includes(pageType) ? (
        <View style={styles.churchBox}>
          <Image style={styles.churchIcon} source={{uri: avatar}} />
          <BaseText style={styles.churchText}>{name}</BaseText>
        </View>
      ) : (
        <View></View>
      )}

      <View style={styles.rightBox}>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => {
            navigation.navigate('Organization', {
              screen: 'OrganizationCalendar',
            });
          }}>
          <Image
            source={
              route.name === 'OrganizationCalendar'
                ? require('@assets/images/common/Calendar_active.png')
                : require('@assets/images/common/Calendar.png')
            } // 替换为你的图标
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.rightIcon}
            source={
              isVisible
                ? require('@assets/images/common/More_Feature_active.png')
                : require('@assets/images/common/More_Feature.png')
            }
          />
        </TouchableOpacity>
      </View>

      {isVisible && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={fadeOut}
          />
          <Animated.View
            style={[
              styles.popup,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              },
            ]}>
            {modalBtns.map(btn => (
              <TouchableOpacity
                key={btn.key}
                style={styles.popupOption}
                onPress={btn.onPress}>
                <FontAwesome
                  style={commonStyles.icon}
                  name={btn.icon}
                  size={16}
                  color="#2E2E2E"
                  iconStyle="solid"
                />
                <Text style={styles.popupOptionText}>{btn.title}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </>
      )}
    </View>
  );
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
    justifyContent: 'flex-start',
  },
  churchIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderColor: '#FFF',
    borderWidth: 1,
    borderStyle: 'solid',
    marginRight: 8,
  },
  churchText: {
    color: '#2E2E2E',
    fontSize: 16,
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rightIcon: {
    width: 44,
    height: 44,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1009,
  },
  popup: {
    position: 'absolute',
    right: 8,
    top: 62,
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 1010,
  },
  popupOption: {
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
    elevation: 10,
  },
  popupOptionText: {
    fontSize: 14,
    color: '#2E2E2E',
  },
});

export default Header;
