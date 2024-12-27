import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@store/store';
import {transformStyles} from '@utils/index';
import CustomTabs from '@components/Tabs';
import {getImageUrl} from '@utils/imgs';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {Header} from './components/Header';
import {CardItem} from './components/CardItem';
import {FixedContent} from './components/FixedContent';
import {TYPE_ICON_MAP, CardType} from './constants';

type TabType = '今日灵修' | '往日学经' | '往日答题' | '往日祷告';

// 添加日期分组数据类型
type DateGroup = {
  date: string;
  items: {
    title: string;
    progress: number;
    type: 'question' | 'book' | 'pray';
    members: string[];
    completedCount: number;
    location?: string;
    duration?: string;
  }[];
};

export const LingxiuHome = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('今日灵修');
  const [showExitModal, setShowExitModal] = useState(false);
  const user = useSelector((state: RootState) => state.global.user);
  const morningPrayerModalRef = useRef<CustomModalRef>(null);

  const handleExit = () => {
    // TODO: 处理退出小组逻辑
    console.log('退出小组');
    setShowExitModal(false);
  };

  // 添加成员头像数据
  const memberAvatars = [
    getImageUrl(),
    getImageUrl(),
    getImageUrl(),
    getImageUrl(),
  ];

  const CardItem = ({
    title,
    image,
    progress,
    type,
    members,
    completedCount,
    date,
    location,
    duration,
  }: {
    title: string;
    image?: string;
    progress: number;
    type: 'question' | 'book' | 'pray';
    members: string[];
    completedCount: number;
    date?: string;
    location?: string;
    duration?: string;
  }) => (
    <View style={styles.cardItem}>
      <View style={styles.cardImageContainer}>
        <Image
          source={{uri: image || getImageUrl()}}
          style={styles.cardImage}
        />
        <View style={styles.progressOverlay}>
          <BaseText style={styles.progressText}>{progress}%</BaseText>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, {width: `${progress}%`}]} />
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <BaseText style={styles.cardTitle}>{title}</BaseText>
            {type === 'question' && (
              <View style={styles.questionTag}>
                <BaseText style={styles.questionTagText}>+5</BaseText>
              </View>
            )}
          </View>
          <View
            style={[
              styles.typeIcon,
              {backgroundColor: TYPE_ICON_MAP[type].background},
            ]}>
            <FontAwesome
              name={TYPE_ICON_MAP[type].name}
              size={16}
              color={TYPE_ICON_MAP[type].color}
              iconStyle="solid"
            />
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.memberList}>
            {members.map((avatar, index) => (
              <Image
                key={index}
                source={{uri: avatar}}
                style={[
                  styles.memberThumb,
                  index > 0 && styles.overlappingThumb,
                ]}
              />
            ))}
            <BaseText style={styles.completedCount}>
              {completedCount}人已完成
            </BaseText>
          </View>
          {(date || location || duration) && (
            <View style={styles.cardMeta}>
              {date && <BaseText style={styles.metaText}>{date}</BaseText>}
              {location && (
                <BaseText style={styles.metaText}>{location}</BaseText>
              )}
              {duration && (
                <BaseText style={styles.metaText}>{duration}</BaseText>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );

  // 修改往日学经的 tab 内容
  const historyGroups: DateGroup[] = [
    {
      date: '昨日, 08.18',
      items: [
        {
          title: '马太福音第二章1-11节',
          progress: 20,
          type: 'book',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
        },
      ],
    },
    {
      date: '周六, 08.17',
      items: [
        {
          title: '马太福音第二章1-11节',
          progress: 100,
          type: 'book',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
          location: '四川成都',
          duration: '34分钟',
        },
        {
          title: '马太福音第二章1-11节',
          progress: 100,
          type: 'book',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
        },
      ],
    },
  ];

  // 添加往日答题的数据
  const questionHistoryGroups: DateGroup[] = [
    {
      date: '昨日, 08.18',
      items: [
        {
          title: '关于五句节的问题',
          progress: 65,
          type: 'question',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
        },
        {
          title: '关于马太福音的问题',
          progress: 100,
          type: 'question',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
        },
      ],
    },
    {
      date: '周六, 08.17',
      items: [
        {
          title: '关于约翰福音的问题',
          progress: 100,
          type: 'question',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
        },
      ],
    },
  ];

  // 添加弹窗数据
  const modalGroups: DateGroup[] = [
    {
      date: '今日, 08.18',
      items: [
        {
          title: '关于五句节的问题',
          progress: 65,
          type: 'question',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
        },
        {
          title: '晨祷',
          progress: 65,
          type: 'pray',
          members: [getImageUrl()],
          completedCount: 9999,
        },
      ],
    },
    {
      date: '昨日, 08.17',
      items: [
        {
          title: '马太福音第二章1-11节',
          progress: 100,
          type: 'book',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
        },
      ],
    },
  ];

  // 添加往日祷告的数据
  const prayHistoryGroups: DateGroup[] = [
    {
      date: '昨日, 08.18',
      items: [
        {
          title: '晨祷',
          progress: 65,
          type: 'pray',
          members: [getImageUrl()],
          completedCount: 9999,
          date: '2024-08-10 13:30',
        },
        {
          title: '主日祷告',
          progress: 100,
          type: 'pray',
          members: [getImageUrl(), getImageUrl()],
          completedCount: 9999,
          date: '2024-08-10 09:30',
        },
      ],
    },
    {
      date: '周六, 08.17',
      items: [
        {
          title: '晚祷',
          progress: 100,
          type: 'pray',
          members: [getImageUrl(), getImageUrl(), getImageUrl()],
          completedCount: 9999,
          date: '2024-08-10 20:30',
          location: '四川成都',
        },
      ],
    },
  ];

  const tabs = [
    {
      key: '今日灵修',
      label: '今日灵修',
      renderItem: () => (
        <ScrollView>
          <CardItem
            title="关于五句节的问题"
            progress={65}
            type="question"
            members={[getImageUrl(), getImageUrl(), getImageUrl()]}
            completedCount={9999}
          />
          <CardItem
            title="晨祷"
            progress={65}
            type="pray"
            members={[getImageUrl()]}
            completedCount={9999}
            date="2024-08-10 13:30"
          />
        </ScrollView>
      ),
    },
    {
      key: '往日学经',
      label: '往日学经',
      renderItem: () => (
        <ScrollView>
          {historyGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.historyGroup}>
              <BaseText style={styles.historyDate}>{group.date}</BaseText>
              {group.items.map((item, itemIndex) => (
                <CardItem
                  key={itemIndex}
                  title={item.title}
                  progress={item.progress}
                  type={item.type}
                  members={item.members}
                  completedCount={item.completedCount}
                  location={item.location}
                  duration={item.duration}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      ),
    },
    {
      key: '往日答题',
      label: '往日答题',
      renderItem: () => (
        <ScrollView>
          {questionHistoryGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.historyGroup}>
              <BaseText style={styles.historyDate}>{group.date}</BaseText>
              {group.items.map((item, itemIndex) => (
                <CardItem
                  key={itemIndex}
                  title={item.title}
                  progress={item.progress}
                  type={item.type}
                  members={item.members}
                  completedCount={item.completedCount}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      ),
    },
    {
      key: '往日祷告',
      label: '往日祷告',
      renderItem: () => (
        <ScrollView>
          {prayHistoryGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.historyGroup}>
              <BaseText style={styles.historyDate}>{group.date}</BaseText>
              {group.items.map((item, itemIndex) => (
                <CardItem
                  key={itemIndex}
                  title={item.title}
                  progress={item.progress}
                  type={item.type}
                  members={item.members}
                  completedCount={item.completedCount}
                  date={item.date}
                  location={item.location}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        user={user}
        onSchedule={() => console.log('schedule')}
        onExit={() => setShowExitModal(true)}
      />
      <FixedContent
        onMorningPrayerPress={() => morningPrayerModalRef.current?.open()}
        memberAvatars={memberAvatars}
      />
      <View style={styles.tabsContainer}>
        <CustomTabs
          tabs={tabs}
          onTabChange={key => setActiveTab(key as TabType)}
        />
      </View>
      {/* Exit Modal */}
      {showExitModal && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowExitModal(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
              <FontAwesome
                name="right-from-bracket"
                size={20}
                color="#FF4D4F"
                iconStyle="solid"
              />
              <BaseText style={styles.exitText}>退出小组</BaseText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* 晨祷弹窗 */}
      <CustomModal
        ref={morningPrayerModalRef}
        modalContentWrapStyle={styles.modalContentWrap}>
        <View style={styles.morningPrayerModal}>
          <View style={styles.modalHeader}>
            <BaseText style={styles.modalTitle}>新的灵修</BaseText>
            <TouchableOpacity
              onPress={() => morningPrayerModalRef.current?.close()}>
              <FontAwesome
                name="xmark"
                size={20}
                color="#333"
                iconStyle="solid"
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.morningModalContent}>
            {modalGroups.map((group, groupIndex) => (
              <View key={groupIndex} style={styles.historyGroup}>
                <BaseText style={styles.historyDate}>{group.date}</BaseText>
                {group.items.map((item, itemIndex) => (
                  <CardItem
                    key={itemIndex}
                    title={item.title}
                    progress={item.progress}
                    type={item.type}
                    members={item.members}
                    completedCount={item.completedCount}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flex: 1,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalContent: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  exitText: {
    fontSize: 14,
    color: '#FF4D4F',
    marginLeft: 8,
  },
  modalContentWrap: {
    width: '100%',
    height: '80%',
    marginTop: 'auto',
  },
  morningPrayerModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  morningModalContent: {
    flex: 1,
  },
  dateGroup: {
    padding: 16,
  },
  dateTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  prayerItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  prayerImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F6F6F6',
  },
  prayerProgress: {
    height: 4,
    backgroundColor: '#F6F6F6',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#52C41A',
  },
  prayerInfo: {
    padding: 12,
  },
  prayerTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  prayerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
    marginRight: 8,
  },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  completedText: {
    fontSize: 12,
    color: '#999',
  },
  cardItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardImageContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 6,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  progressOverlay: {
    position: 'absolute',
    left: 12,
    bottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  progress: {
    height: '100%',
    backgroundColor: '#52C41A',
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  typeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionTag: {
    backgroundColor: '#F6FFED',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  questionTagText: {
    fontSize: 12,
    color: '#52C41A',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  overlappingThumb: {
    marginLeft: -8,
  },
  completedCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  historyGroup: {
    marginBottom: 24,
  },
  historyDate: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default LingxiuHome;
