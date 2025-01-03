import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  Animated,
} from 'react-native';
import {commonStyles, transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';

const MemberCard = ({item}) => {
  const navigation = useNavigation();
  const [showDelete, setShowDelete] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleLongPress = () => {
    setShowDelete(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowDelete(false));
  };

  const handleDelete = () => {
    Alert.alert('提示', '确定要删除该成员吗？', [
      {
        text: '取消',
        style: 'cancel',
        onPress: handleClose,
      },
      {
        text: '确定',
        style: 'destructive',
        onPress: () => {
          // TODO: 处理删除逻辑
          handleClose();
        },
      },
    ]);
  };

  const handlePress = () => {
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
    <TouchableOpacity
      onLongPress={handleLongPress}
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.memberCard}>
      <View style={styles.memberGradient}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
      </View>

      <View style={styles.memberContent}>
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
        <Text style={styles.memberInfo}>
          {item.days} {item.joinDate}
        </Text>
        <Text style={styles.memberDetails}>
          {item.location} | {item.distance} | {item.date}
        </Text>
      </View>

      {showDelete && (
        <Animated.View
          style={[
            styles.deleteOverlay,
            {
              opacity: fadeAnim,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.overlayTouchable}
            onPress={handleClose}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}>
              <FontAwesome
                style={commonStyles.icon}
                name="trash-can"
                size={16}
                color="#FF6E40"
                iconStyle="regular"
              />
              <Text style={styles.deleteText}>删除</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = transformStyles({
  // 成员卡片
  memberCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
    padding: 16,
    backgroundImage: 'linear-gradient(to right, #fff, #FFA500)',
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
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: '#fff',
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  memberInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  memberDetails: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deleteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  overlayTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  deleteText: {
    color: '#FF6E40',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MemberCard;
