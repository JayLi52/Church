import React from 'react';
import {View, TouchableOpacity, Pressable} from 'react-native';
import BaseText from '@components/BaseText';
import {commonStyles, transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {VerseToolbar} from './VerseToolbar';
export type VerseItem = {
  id: number;
  text: string;
  commentCount: number;
  isHighlighted?: boolean;
  isSelected?: boolean;
  isQuoted?: boolean;
  isQuoting?: boolean;
  isTranslated?: boolean;
  translation?: string;
};

type VerseProps = {
  item: VerseItem;
  colors: any;
  index: number;
  handleVerseLongPress: (
    item: VerseItem,
    position: {y: number; height: number},
  ) => void;
  selectedVerses: VerseItem | null;
  toolbarPosition: 'top' | 'bottom';
  verseToolbarOptions: any;
  navigation: any;
};

export const Verse = ({
  item,
  index,
  colors,
  handleVerseLongPress,
  selectedVerses,
  toolbarPosition,
  verseToolbarOptions,
  navigation,
}: VerseProps) => {
  if (item.isSelected && item.isHighlighted) {
    console.log('item', item.id, item.isSelected, item.isHighlighted);
  }
  return (
    <View
      key={item.id}
      style={[
        styles.verseContainer,
        {borderBottomColor: colors.border},
        item.isHighlighted && styles.verseHighlighted,
        item.isQuoted && styles.verseQuoted,
        item.isQuoting && styles.verseQuoting,
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
        <View style={styles.verseTextContainer}>
          <BaseText style={[styles.verseText, {color: colors.text}]}>
            {item.text}
            {item.isTranslated && (
              <BaseText style={styles.translation}>{item.translation}</BaseText>
            )}
            <Pressable
              onPress={() => {
                navigation.navigate('BookManageNavigator', {
                  screen: 'CommentList',
                });
              }}
              style={styles.commentContainer}>
              <FontAwesome
                style={[commonStyles.icon, styles.commentIcon]}
                name="comment-dots"
                size={16}
                color="#000"
                iconStyle="solid"
              />
              <BaseText style={styles.commentText}>
                {item.commentCount}
              </BaseText>
            </Pressable>
          </BaseText>
        </View>
      </TouchableOpacity>
      {selectedVerses?.id === item.id && (
        <VerseToolbar
          position={toolbarPosition}
          options={verseToolbarOptions}
        />
      )}
    </View>
  );
};

const styles = transformStyles({
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
    marginRight: 8,
    lineHeight: 24,
  },
  verseTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIcon: {
    marginLeft: 8,
    marginRight: 4,
  },
  commentText: {
    fontSize: 12,
    color: '#000',
  },
  commentBadge: {
    backgroundColor: '#FFF5E6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
  commentCount: {
    fontSize: 12,
    color: '#FFB224',
    fontWeight: 'bold',
  },
  verseHighlighted: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 8,
  },
  verseQuoted: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFB224',
    paddingLeft: 12,
  },
  translation: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  verseQuoting: {
    backgroundColor: 'rgba(255, 178, 36, 0.1)',
  },
});
