import React, {useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {commonStyles, transformStyles} from '@utils/index';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import AdjustPlan from '@screens/Team/AdjustPlan';
import {useSelector} from 'react-redux';
import {RootState} from '@store/store';

type HeaderProps = {
  type?: 'default' | 'plan';
  navigation: any;
  colors: any;
  modalVersionRef: React.RefObject<CustomModalRef>;
  modalChapterRef?: React.RefObject<CustomModalRef>;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  bookTitle?: string;
  currentChapter?: number;
  currentVersion: string;
  planTitle?: string;
  onPlanPress?: () => void;
};

export const Header = ({
  type = 'default',
  navigation,
  colors,
  modalVersionRef,
  modalChapterRef,
  isBookmarked,
  onToggleBookmark,
  bookTitle,
  currentChapter,
  currentVersion,
  planTitle = '180天读经计划',
  onPlanPress,
}: HeaderProps) => {
  const planModalRef = useRef<CustomModalRef>(null);

  const renderDefaultHeader = () => (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          style={commonStyles.icon}
          name="arrow-left"
          size={20}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <TouchableOpacity
          style={styles.chapterButton}
          onPress={() => modalChapterRef?.current?.open()}>
          <BaseText style={styles.bookTitle}>
            {bookTitle} {currentChapter}
          </BaseText>
          <FontAwesome
            style={commonStyles.icon}
            name="chevron-down"
            size={16}
            color={'#333'}
            iconStyle="solid"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.versionButton}
          onPress={() => modalVersionRef?.current?.open()}>
          <BaseText style={styles.versionText}>{currentVersion}</BaseText>
          <FontAwesome
            style={commonStyles.icon}
            name="book"
            size={16}
            color={'#333'}
            iconStyle="solid"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onToggleBookmark}>
        <FontAwesome
          style={commonStyles.icon}
          name="bookmark"
          size={20}
          color={isBookmarked ? '#FFB224' : '#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
    </>
  );

  const renderPersonalPlanHeader = () => (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          style={commonStyles.icon}
          name="arrow-left"
          size={20}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.planButton}
        onPress={() => planModalRef.current?.open()}>
        <BaseText style={styles.planTitle}>{planTitle}</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="chevron-down"
          size={16}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.versionButton}
        onPress={() => modalVersionRef?.current?.open()}>
        <BaseText style={styles.versionStatusText}>{currentVersion}</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="book"
          size={16}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
    </>
  );

  const renderTeamPlanHeader = () => (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          style={commonStyles.icon}
          name="arrow-left"
          size={20}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.planButton}
        onPress={() => planModalRef.current?.open()}>
        <BaseText style={styles.planTitle}>{planTitle}</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="chevron-down"
          size={16}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.versionButton}
        onPress={() => {
          // modalVersionRef?.current?.open();
        }}>
        <BaseText style={styles.versionStatusText}>{currentVersion}</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="book"
          size={16}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.teamQuestion}
        onPress={() => {
          navigation.navigate('OrganizationTask', {
            screen: 'TeamQuestion',
          });
        }}>
        <BaseText style={styles.questionText}>习题</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="chevron-down"
          size={14}
          color="#333"
          iconStyle="solid"
        />
      </TouchableOpacity>
    </>
  );

  const renderTeamLeaderPlanHeader = () => (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          style={commonStyles.icon}
          name="arrow-left"
          size={20}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.planButton}
        onPress={() => planModalRef.current?.open()}>
        <BaseText style={styles.planTitle}>{planTitle}</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="chevron-down"
          size={16}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.versionButton}
        onPress={() => {
          modalVersionRef?.current?.open();
        }}>
        <BaseText style={styles.versionStatusText}>{currentVersion}</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="book"
          size={16}
          color={'#333'}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.teamQuestion}
        onPress={() => {
          navigation.navigate('OrganizationTask', {
            screen: 'TeamQuestion',
          });
        }}>
        <BaseText style={styles.questionText}>习题</BaseText>
        <FontAwesome
          style={commonStyles.icon}
          name="chevron-down"
          size={14}
          color="#333"
          iconStyle="solid"
        />
      </TouchableOpacity>
    </>
  );

  const pageType = useSelector((state: RootState) => state.page.pageType);
  const user = useSelector((state: RootState) => state.global.user);

  const renderPlanHeader = () => {
    console.log('user', user.role, pageType);

    if (pageType === 'personal') {
      return renderPersonalPlanHeader();
    } else if (pageType === 'team' && user.role === 'member') {
      return renderTeamPlanHeader();
    } else if (pageType === 'team' && user.role === 'leader') {
      console.log('小组组长');

      return renderTeamLeaderPlanHeader();
    }
    return renderDefaultHeader();
  };

  return (
    <>
      <View style={styles.header}>
        {type === 'default' ? renderDefaultHeader() : renderPlanHeader()}
      </View>
      <CustomModal ref={planModalRef} modalContentWrapStyle={styles.planModal}>
        {/* 计划详情内容 */}
        <AdjustPlan onClose={() => planModalRef.current?.close()} />
      </CustomModal>
    </>
  );
};

const styles = transformStyles({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
  },
  headerCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  chapterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  versionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  versionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  versionStatusText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  planButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  planTitle: {
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
  planModal: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  planModalContent: {
    backgroundColor: '#fff',
    padding: 16,
    width: '100%',
  },
  teamQuestion: {
    flexDirection: 'row',
    gap: 5,
  },
  questionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    // marginTop: 4,
  },
});
