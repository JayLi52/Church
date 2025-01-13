import {transformStyles} from '@utils/index';
import React from 'react';
import {View, Text, Image, ScrollView, ImageBackground} from 'react-native';
import CustomTabs from '@components/Tabs';
import BaseText from '@components/BaseText';
import LinearGradient from 'react-native-linear-gradient';
import {getImageUrl} from '@utils/imgs';

const AVATAR_SIZE = 20;
const AVATAR_OVERLAP = 8; // 头像重叠的距离

const formatNumber = (num: number) => {
  if (num >= 9999) {
    return '999+';
  }
  if (num >= 1000) {
    return `${Math.floor(num / 1000)}k`;
  }
  return num;
};

const StackedAvatars = ({count}: {count: number}) => {
  // 最多显示3个头像
  const displayCount = Math.min(3, count);
  const remainingCount = count > 3 ? count - 3 : 0;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {[...Array(displayCount)].map((_, index) => (
        <View
          key={index}
          style={{
            marginLeft: index === 0 ? 0 : -AVATAR_OVERLAP,
            borderRadius: AVATAR_SIZE / 2,
            zIndex: displayCount - index, // 确保左边的头像在上层
          }}>
          <Image
            source={{
              uri: getImageUrl(),
            }}
            style={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              borderRadius: AVATAR_SIZE / 2,
            }}
          />
        </View>
      ))}
      {remainingCount > 0 && (
        <BaseText style={styles.remainingText}>{remainingCount}人</BaseText>
      )}
    </View>
  );
};

const UserReadingDetail = () => {
  const teamPlans = [
    {
      id: '1',
      title: '90天阅读旧约',
      progress: 1,
      date: '2024-08-11 至 2024-08-21',
    },
  ];

  const userPlans = [
    {
      id: '1',
      title: '90天阅读旧约',
      progress: 0.6,
      date: '2024-08-11 至 2024-08-21',
    },
  ];

  const records = [
    {
      id: '1',
      title: '90天阅读旧约',
      tag: '已答',
      status: 'completed',
      date: '2024-08-11 至 2024-08-21',
    },
    {
      id: '2',
      title: '90天阅读旧约',
      tag: '未答',
      status: 'pending',
      date: '2024-08-11 至 2024-08-21',
    },
    {
      id: '3',
      title: '90天阅读旧约',
      tag: '待答',
      status: 'waiting',
      date: '2024-08-11 至 2024-08-21',
    },
  ];

  const userInfo = {
    name: '用户名称文本信息',
    uid: '0000000001',
    location: '四川成都',
    distance: '1532KM',
    registerDate: '2024-08-10',
    joinDate: '2024-08-31',
    tags: ['同工', '姊妹'],
  };

  const stats = {
    study: {
      participationCount: formatNumber('9999'),
      completedCount: formatNumber('9999'),
      completionRate: '99%',
    },
    quiz: {
      totalQuestions: formatNumber('9999'),
      answeredQuestions: `${formatNumber('9999')}/${formatNumber('9999')}`,
      completionRate: '99%',
    },
  };

  const tagColors = {
    completed: '#4CAF50', // 已答 - 绿色
    pending: '#FF9800', // 未答 - 橙色
    waiting: '#9E9E9E', // 待答 - 灰色
    同工: '#508BBC', // 蓝色
    姊妹: '#DABA80', // 粉色
    平信徒: '#1B6CC7', // 深蓝
    小组长: '#0C4380', // 深蓝偏紫
  };

  const renderAnswerContent = () => (
    <View>
      <View style={styles.statsContainer}>
        <StatBox number={stats.quiz.totalQuestions} label="累计答题数" />
        <StatBox number={stats.quiz.answeredQuestions} label="指派答题数" />
        <StatBox number={stats.quiz.completionRate} label="应答完答率" />
      </View>

      <View style={styles.plansContainer}>
        {records.map(record => (
          <View key={record.id} style={styles.recordCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{textAlign: 'left', marginRight: 10}}>
                {record.title}
              </Text>
              <View
                style={[
                  styles.tagContainer,
                  {
                    backgroundColor: tagColors[record.status],
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 12,
                  },
                ]}>
                <Text style={[styles.tagText, {color: '#FFFFFF'}]}>
                  {record.tag}
                </Text>
              </View>
            </View>
            <View style={styles.planFooter}>
              <Text style={styles.date}>创建日期：{record.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStudyContent = () => (
    <View>
      <View style={styles.statsContainer}>
        <StatBox number={stats.study.participationCount} label="参与计划数" />
        <StatBox number={stats.study.completedCount} label="完成计划数" />
        <StatBox number={stats.study.completionRate} label="完成率" />
      </View>

      <View style={styles.plansContainer}>
        <Text style={styles.sectionTitle}>小组学经计划</Text>
        <View style={styles.planList}>
          {teamPlans.map(plan => (
            <View key={plan.id} style={styles.planCard}>
              <BaseText style={styles.planTitle}>{plan.title}</BaseText>
              <View style={styles.progressContainer}>
                <BaseText style={styles.progressText}>进度:</BaseText>
                <BaseText style={styles.progressTextBold}>
                  {plan.progress * 100}%
                </BaseText>
                <View style={styles.progressBarContainer}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#059973', '#BAE3A8']}
                    style={[
                      styles.progressBarGradient,
                      {width: `${plan.progress * 100}%`},
                    ]}
                  />
                </View>
              </View>
              <View style={styles.planFooter}>
                <BaseText style={styles.date}>日期：{plan.date}</BaseText>
                <View style={styles.participantsContainer}>
                  <StackedAvatars count={9999} />
                </View>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>个人学经计划</Text>
        <View style={styles.planList}>
          {userPlans.map(plan => (
            <View key={plan.id} style={styles.planCard}>
              <BaseText style={styles.planTitle}>{plan.title}</BaseText>
              <View style={styles.progressContainer}>
                <BaseText style={styles.progressText}>进度:</BaseText>
                <BaseText style={styles.progressTextBold}>
                  {plan.progress * 100}%
                </BaseText>
                <View style={styles.progressBarContainer}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#059973', '#BAE3A8']}
                    style={[
                      styles.progressBarGradient,
                      {width: `${plan.progress * 100}%`},
                    ]}
                  />
                </View>
              </View>
              <View style={styles.planFooter}>
                <BaseText style={styles.date}>日期：{plan.date}</BaseText>
                <View style={styles.participantsContainer}>
                  <StackedAvatars count={9999} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const tabs = [
    {key: 'study', label: '学经', renderItem: renderStudyContent},
    {key: 'quiz', label: '答题', renderItem: renderAnswerContent},
    {key: 'notice', label: '榜告', renderItem: () => <View />},
    {key: 'topic', label: '话题', renderItem: () => <View />},
    {key: 'ministry', label: '事工', renderItem: () => <View />},
  ];

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
        }}
        style={styles.header}
        blurRadius={10} // 模糊程度
      ></ImageBackground>

      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageBox}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
            }}
          />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userInfoBox}>
            <BaseText style={styles.userName}>{userInfo.name}</BaseText>
            <View style={styles.tagContainer}>
              {userInfo.tags.map((tag, index) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    {
                      backgroundColor: tagColors[tag],
                    },
                  ]}>
                  <BaseText
                    style={[
                      styles.tagText,
                      {
                        color: '#FFFFFF',
                      },
                    ]}>
                    {tag}
                  </BaseText>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.userDetails}>
            <BaseText style={styles.userDetailItem}>
              UID: {userInfo.uid}
            </BaseText>
            <BaseText style={styles.userDetailItem}>|</BaseText>
            <BaseText style={styles.userDetailItem}>
              {userInfo.location}
            </BaseText>
            <BaseText style={styles.userDetailItem}>|</BaseText>
            <BaseText style={styles.userDetailItem}>
              {userInfo.distance}
            </BaseText>
          </View>
          <View style={styles.dateInfoWrapper}>
            <BaseText style={styles.dateInfo}>
              注册时间: {userInfo.registerDate}
            </BaseText>
            <BaseText style={styles.dateInfo}>
              加入日期: {userInfo.joinDate}
            </BaseText>
          </View>
        </View>
      </View>
      <View style={styles.tabsContainer}>
        <CustomTabs
          tabs={tabs.map((item, index) => ({
            ...item,
            key: index.toString() + 'tabs',
          }))}
          onTabChange={key => console.log('Tab changed:', key)}
        />
      </View>
    </ScrollView>
  );
};

const StatBox = ({number, label}) => (
  <View style={styles.statBox}>
    <BaseText style={styles.statNumber}>{number}</BaseText>
    <BaseText style={styles.statLabel}>{label}</BaseText>
  </View>
);

const styles = transformStyles({
  userInfoBox: {
    // backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    // alignItems: 'cent',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  tabsContainer: {
    // marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    // margin: 16,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    // borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ECECEC',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    height: 108,
    backgroundColor: '#2C3E50',
    width: '100%',
  },
  profileSection: {
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    height: 167,
    position: 'relative',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  profileImageBox: {
    // width: 100,
    // height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    padding: 3,
    position: 'absolute',
    top: -65,
    left: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    // flex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  userDetails: {
    color: '#2E2E2E',
    fontSize: 12,
    marginBottom: 14,
    flexDirection: 'row',
    gap: 8,
  },
  userDetailItem: {
    color: '#2E2E2E',
    fontSize: 12,
  },
  dateInfoWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInfo: {
    color: '#2E2E2E',
    fontSize: 12,
    // marginBottom: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    // paddingVertical: 16,
    // marginTop: 8,
  },
  statBox: {
    alignItems: 'flex-start',
    width: 100,
    height: 56,
    backgroundColor: '#4793C2',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 16,
    // justifyContent: 'flex-start',
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  plansContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  planCard: {
    // backgroundColor: '#FFFFFF',
    // margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    // marginTop: 8,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
  },
  planTitle: {
    // fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  progressContainer: {
    // marginVertical: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  progressBar: {
    // flex: 1,
    width: '50%',
    height: 4,
    borderRadius: 2,
    // marginTop: 6,
  },
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantCount: {
    fontSize: 12,
    color: '#666',
  },
  planList: {
    // padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ECECEC',
    margin: 20,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  progressTextBold: {
    fontSize: 12,
    // color: '#059973',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '50%',
    height: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarGradient: {
    height: '100%',
    borderRadius: 2,
  },
  remainingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default UserReadingDetail;
