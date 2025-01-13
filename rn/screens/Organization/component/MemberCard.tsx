import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Pressable,
  Alert,
} from 'react-native';
import {commonStyles, transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';
import {useSwipeToDelete} from '@hooks/useSwipeToDelete';
import RadialGradient from 'react-native-radial-gradient';

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
    timezone: string;
  };
}

const MemberCard: React.FC<MemberCardProps> = ({item}) => {
  const navigation = useNavigation();
  const {pan, panResponder, closeSwipe} = useSwipeToDelete();

  const handlePress = () => {
    closeSwipe();
    navigation.navigate('Organization', {
      screen: 'UserReadingDetail',
      params: {
        userId: item.id,
        userName: item.name,
      },
    });
  };

  const handleDelete = () => {
    Alert.alert('提示', '确定要删除该成员吗？', [
      {
        text: '取消',
        style: 'cancel',
      },
      {
        text: '确定',
        style: 'destructive',
        onPress: () => {
          // TODO: 处理删除逻辑
          console.log('删除成员:', item.id);
        },
      },
    ]);
  };

  const titleBg = {
    同工: '#66AEFF',
    平信徒: '#1B6CC7',
    小组长: '#0C4380',
  };

  const getGradientColor = (timezone: string) => {
    switch (timezone) {
      case 'day':
        return '#FF8303'; // 白天
      case 'dawn':
        return '#B8C3E5'; // 凌晨
      case 'night':
        return '#0025A1'; // 晚上
      default:
        return '#FF8303';
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, overflow: 'hidden', borderRadius: 8}}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            closeSwipe();
            handleDelete();
          }}>
          <FontAwesome
            style={commonStyles.icon}
            name="trash-can"
            size={16}
            color="#FF4D4F"
            iconStyle="regular"
          />
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

            <RadialGradient
              style={styles.gradient}
              colors={[getGradientColor(item.timezone), '#FFFFFF']}
              center={[styles.gradient.width / 2, 0]}
              radius={styles.gradient.width / 2}>
              {/* 你的内容 */}
            </RadialGradient>

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
  gradient: {
    position: 'absolute',
    top: 0,
    right: -105,
    width: 210,
    height: 210,
    // top: 0,
    // right: 50,
  },
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

    borderWidth: 1,
    borderColor: '#E7E7E7',
    // borderRadius: 6,
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
  },
  memberRole: {
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 8,
    paddingBottom: 3,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInfo: {
    fontSize: 14,
    color: '#555',
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    right: -10,
    top: 0,
    bottom: 0,
  },
  deleteText: {
    fontSize: 12,
    color: '#FF4D4F',
    marginTop: 4,
  },
});

export default MemberCard;
