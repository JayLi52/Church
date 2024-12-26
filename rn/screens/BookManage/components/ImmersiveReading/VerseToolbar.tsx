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
});
