import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';
import {UserProfile} from '@/types';

interface Props {
  user: UserProfile;
  onPress?: (user: UserProfile) => void;
}

export const UserListItem = React.memo(({user, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress?.(user)}>
      <Image source={{uri: user.avatar}} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.time}>
          {format(new Date(user.createTime), 'yyyy-MM-dd HH:mm')}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});
