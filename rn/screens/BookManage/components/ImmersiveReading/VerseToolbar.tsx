import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';

type VerseToolbarProps = {
  position: 'top' | 'bottom';
  options: Array<{
    icon: string;
    label: string;
    onPress: () => void;
    disabled?: boolean;
  }>;
};

export const VerseToolbar = ({position, options}: VerseToolbarProps) => (
  <View
    style={[
      styles.verseToolbar,
      position === 'top'
        ? {bottom: '150%', marginBottom: 8}
        : {top: '150%', marginTop: 8},
    ]}>
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.toolbarButton,
          option.disabled && styles.toolbarButtonDisabled,
        ]}
        onPress={option.onPress}
        disabled={option.disabled}>
        <FontAwesome
          name={option.icon}
          size={20}
          color="#fff"
          iconStyle="solid"
        />
        <BaseText style={styles.toolbarButtonText}>{option.label}</BaseText>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = transformStyles({
  // ... 复制相关样式

  verseToolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'space-around',
    zIndex: 1000,
  },
  verseToolbarButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  verseToolbarButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },

  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  toolbarButton: {
    alignItems: 'center',
  },
  toolbarButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  toolbarButtonDisabled: {
    opacity: 0.5,
  },
});
