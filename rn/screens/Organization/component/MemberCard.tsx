import React, {useState, useRef, useMemo} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  Pressable,
} from 'react-native';
import {commonStyles, transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';

interface MemberCardProps {
  item: {
    id: string;
    name: string;
    avatar: string;
    role: '同工' | '平信徒' | '小组长';
    days: string;
    joinDate: string;
    location: string;
    distance: string;
    date: string;
  };
}

const MemberCard: React.FC<MemberCardProps> = ({item}) => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const disableDrag =
          (isOpen && gestureState.dx < 0) || (!isOpen && gestureState.dx > 0);

        return (
          !disableDrag && Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        );
      },
      onPanResponderGrant: () => {
        const currentIsOpen = isOpen;
        pan.setOffset(currentIsOpen ? -80 : 0);
      },
      onPanResponderMove: (_, gestureState) => {
        const x = gestureState.dx;
        if (x >= -80 && x <= 80) {
          pan.setValue(x);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentIsOpen = isOpen;
        pan.flattenOffset();

        if (currentIsOpen) {
          if (gestureState.dx > 40) {
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
            setIsOpen(false);
          } else {
            Animated.spring(pan, {
              toValue: -80,
              useNativeDriver: true,
            }).start();
          }
        } else {
          if (gestureState.dx < -40) {
            Animated.spring(pan, {
              toValue: -80,
              useNativeDriver: true,
            }).start();
            setIsOpen(true);
          } else {
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        }
      },
    });
  }, [isOpen, pan]);

  const handleDelete = () => {
    // Alert.alert('提示', '确定要删除该成员吗？', [
    //   {
    //     text: '取消',
    //     style: 'cancel',
    //     onPress: () => {
    //       Animated.spring(pan, {
    //         toValue: 0,
    //         useNativeDriver: true,
    //       }).start();
    //       setIsOpen(false);
    //     },
    //   },
    //   {
    //     text: '确定',
    //     style: 'destructive',
    //     onPress: () => {
    //       // TODO: 处理删除逻辑
    //       console.log('删除成员:', item.id);
    //     },
    //   },
    // ]);
  };

  const handlePress = () => {
    // if (isOpen) {
    //   Animated.spring(pan, {
    //     toValue: 0,
    //     useNativeDriver: true,
    //   }).start();
    //   setIsOpen(false);
    //   return;
    // }
    navigation.navigate('Organization', {
      screen: 'UserReadingDetail',
      params: {
        userId: item.id,
        userName: item.name,
      },
    });
  };

  const titleBg = {
    同工: '#66AEFF',
    平信徒: '#1B6CC7',
    小组长: '#0C4380',
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, overflow: 'hidden', borderRadius: 8}}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <FontAwesome
            style={commonStyles.icon}
            name="trash-can"
            size={16}
            color="#FF4D4F"
            iconStyle="regular"
          />
          <Text style={styles.deleteText}>删除</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.memberCard,
            {
              transform: [{translateX: pan}],
            },
          ]}
          {...panResponder.panHandlers}>
          <Pressable onPress={handlePress} style={styles.cardContent}>
            <View style={styles.memberGradient}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
            </View>

            <View style={styles.memberContent}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text
                  style={[
                    styles.memberRole,
                    {
                      backgroundColor: titleBg[item.role],
                    },
                  ]}>
                  {item.role}
                </Text>
              </View>
              <Text style={styles.memberInfo}>
                {item.days} {item.joinDate}
              </Text>
              <Text style={styles.memberDetails}>
                {item.location} | {item.distance} | {item.date}
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = transformStyles({
  container: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  memberCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 1,
    position: 'relative',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  memberGradient: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  memberContent: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 4,
  },
  memberName: {
    fontSize: 16,
    // fontWeight: 'bold',
    // flex: 0,
    // marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: '#fff',
    // padding: 4,
    // borderRadius: 4,
    // alignSelf: 'flex-start',
    // marginBottom: 8,
    paddingHorizontal: 8,
    paddingBottom: 3,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInfo: {
    fontSize: 14,
    color: '#555',
    // marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'flex-start',
  },
  memberDetails: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deleteButton: {
    width: 80,
    // backgroundColor: '#FF4D4F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    right: -10,
    top: 0,
    bottom: 0,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default MemberCard;
