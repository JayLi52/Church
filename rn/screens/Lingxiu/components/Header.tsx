import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';

type HeaderProps = {
  user: {
    avatar: string;
    name: string;
  };
  onSchedule: () => void;
  onExit: () => void;
};

export const Header = ({user, onSchedule, onExit}: HeaderProps) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Image source={{uri: user.avatar}} style={styles.avatar} />
      <BaseText style={styles.userName}>{user.name}</BaseText>
    </View>
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.iconButton} onPress={onSchedule}>
        <FontAwesome name="calendar" size={20} color="#333" iconStyle="solid" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onExit}>
        <FontAwesome name="ellipsis" size={20} color="#333" iconStyle="solid" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = transformStyles({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
});
