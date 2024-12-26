import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';

type BottomToolbarProps = {
  buttons: Array<{
    icon: string;
    label: string;
    onPress: () => void;
  }>;
};

export const BottomToolbar = ({buttons}: BottomToolbarProps) => (
  <View style={styles.bottomToolbar}>
    {buttons.map((button, index) => (
      <TouchableOpacity
        key={index}
        style={styles.bottomToolbarButton}
        onPress={button.onPress}>
        <FontAwesome
          name={button.icon}
          size={20}
          color="#666"
          iconStyle="solid"
        />
        <BaseText style={styles.bottomToolbarButtonText}>
          {button.label}
        </BaseText>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = transformStyles({
  // ... 复制相关样式

  bottomToolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: 34, // 适配底部安全区域
    paddingTop: 8,
    justifyContent: 'space-around',
    zIndex: 100,
  },
  bottomToolbarButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bottomToolbarButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
