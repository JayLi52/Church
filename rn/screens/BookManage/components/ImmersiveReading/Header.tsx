import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {commonStyles, transformStyles} from '@utils/index';
import {CustomModalRef} from '@components/CustomModal';

type HeaderProps = {
  navigation: any;
  colors: any;
  modalVersionRef: React.RefObject<CustomModalRef>;
  modalChapterRef: React.RefObject<CustomModalRef>;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  bookTitle: string;
  currentChapter: number;
  currentVersion: string;
};

export const Header = ({
  navigation,
  colors,
  modalVersionRef,
  modalChapterRef,
  isBookmarked,
  onToggleBookmark,
  bookTitle,
  currentChapter,
  currentVersion,
}: HeaderProps) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <TouchableOpacity onPress={onToggleBookmark}>
        <FontAwesome
          style={commonStyles.icon}
          name={'bookmark'}
          size={20}
          color={isBookmarked ? '#FFB224' : colors.text}
          iconStyle={isBookmarked ? 'solid' : 'regular'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chapterButton}
        onPress={() => modalChapterRef.current?.open()}>
        <BaseText style={[styles.headerTitle, {color: colors.text}]}>
          {bookTitle} 第{currentChapter}章
        </BaseText>
        <FontAwesome
          name="chevron-down"
          size={15}
          color={colors.text}
          iconStyle="solid"
        />
      </TouchableOpacity>
    </View>

    <View style={styles.headerRight}>
      <TouchableOpacity
        style={styles.versionButton}
        onPress={() => modalVersionRef.current?.open()}>
        <BaseText style={styles.versionText}>{currentVersion}</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="book"
          size={15}
          color={colors.text}
          iconStyle="solid"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ReadingRoomHomeScreen')}>
        <FontAwesome
          style={commonStyles.icon}
          name="xmark"
          size={20}
          color={colors.text}
          iconStyle="solid"
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = transformStyles({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    // paddingHorizontal: 16,
    width: '100%',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  chapterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionTag: {
    backgroundColor: '#FFB224',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  versionText: {
    color: '#2E2E2E',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
  },
});
