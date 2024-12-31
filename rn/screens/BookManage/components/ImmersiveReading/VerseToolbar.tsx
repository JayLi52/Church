import React from 'react';
import {View, TouchableOpacity, Pressable} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';

type ToolbarOption = {
  icon: string;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

type VerseToolbarProps = {
  position: 'top' | 'bottom';
  options: ToolbarOption[];
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
        onPress={() => {
          console.log('option.onPress', option.onPress);
          option.onPress();
        }}
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
  toolbarButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  toolbarButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  toolbarButtonDisabled: {
    opacity: 0.5,
  },
});
