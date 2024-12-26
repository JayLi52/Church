import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import BaseText from '@components/BaseText';
import {transformStyles} from '@utils/index';
import {
  HighlightedVerse,
  SelectedVerse,
} from '@screens/BookManage/ImmersiveReading';

type VerseItem = {
  id: number;
  text: string;
};

type VerseProps = {
  item: VerseItem;
  isHighlighted?: HighlightedVerse;
  highlightColor?: string;
  colors: any;
  selectedVerse: SelectedVerse;
  index: number;
  handleVerseLongPress: (
    item: VerseItem,
    position: {y: number; height: number},
  ) => void;
  renderToolbar: () => React.ReactNode;
};

export const Verse = ({
  item,
  index,
  isHighlighted,
  colors,
  handleVerseLongPress,
  renderToolbar,
  selectedVerse,
}: VerseProps) => (
  <View
    key={item.id}
    style={[
      styles.verseContainer,
      {borderBottomColor: colors.border},
      isHighlighted && {
        backgroundColor: isHighlighted.color,
        borderRadius: 8,
      },
    ]}>
    <TouchableOpacity
      onLongPress={event => {
        event.target.measure((x, y, width, height, pageX, pageY) => {
          handleVerseLongPress(item, {y: pageY, height});
        });
      }}
      delayLongPress={500}
      style={styles.verseContent}>
      <BaseText style={[styles.verseNumber, {color: colors.verseNumber}]}>
        {index + 1}
      </BaseText>
      <BaseText style={[styles.verseText, {color: colors.text}]}>
        {item.text}
      </BaseText>
    </TouchableOpacity>
    {selectedVerse?.id === item.id && renderToolbar()}
  </View>
);

const styles = transformStyles({
  // ... 复制相关样式

  verseContainer: {
    padding: 16,
    borderBottomWidth: 1,
    position: 'relative',
    marginHorizontal: 16,
  },

  verseContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  verseNumber: {
    fontSize: 12,
    color: '#3B8E58',
    marginRight: 8,
    lineHeight: 24,
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
