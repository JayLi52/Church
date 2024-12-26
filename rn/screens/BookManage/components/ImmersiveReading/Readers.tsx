import React from 'react';
import {View, Image} from 'react-native';
import BaseText from '@components/BaseText';
import {transformStyles} from '@utils/index';

type ReadersProps = {
  readers: Array<{
    id: string;
    avatar: string;
  }>;
};

export const Readers = ({readers}: ReadersProps) => (
  <View style={styles.readersContainer}>
    <View style={styles.avatarList}>
      {readers.map((reader, index) => (
        <Image
          key={reader.id}
          source={{uri: reader.avatar}}
          style={[styles.avatar, {marginLeft: index > 0 ? -10 : 0}]}
        />
      ))}
    </View>
    <BaseText style={styles.readerCount}>9999人已阅读</BaseText>
  </View>
);

const styles = transformStyles({
  // ... 复制相关样式

  readersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  avatarList: {
    flexDirection: 'row',
    marginRight: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  readerCount: {
    fontSize: 12,
    color: '#666',
  },
});
