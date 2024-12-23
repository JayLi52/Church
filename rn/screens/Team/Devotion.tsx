import {transformStyles} from '@utils/index';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import CustomTabs from '@components/Tabs';

const Devotion = () => {
  const plans = [
    {
      id: 1,
      title: '90天阅读旧约',
      progress: 1,
      date: '2024-08-11 至 2024-08-21',
    }
  ];

  const records = [
    {
      id: 1,
      title: '90天阅读旧约',
      tag: '已答',
      date: '2024-08-11 至 2024-08-21',
    },
    {
      id: 1,
      title: '90天阅读旧约',
      tag: '未答',
      date: '2024-08-11 至 2024-08-21',
    },
    {
      id: 1,
      title: '90天阅读旧约',
      tag: '待答',
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
    participationCount: '9999',
    completedCount: '9999',
    completionRate: '99%',
  };

  const renderAnswerContent = () => (
    <View>
      <View style={styles.statsContainer}>
        <StatBox number={stats.participationCount} label="参与计划数" />
        <StatBox number={stats.completedCount} label="完成计划数" />
        <StatBox number={stats.completionRate} label="完成率" />
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
                  <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{record.tag}</Text>
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
        <StatBox number={stats.participationCount} label="参与计划数" />
        <StatBox number={stats.completedCount} label="完成计划数" />
        <StatBox number={stats.completionRate} label="完成率" />
      </View>

      <View style={styles.plansContainer}>
        <Text style={styles.sectionTitle}>小组学经计划</Text>
        <View style={styles.planList}>
          {plans.map(plan => (
            <View key={plan.id} style={styles.planCard}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <View style={styles.progressContainer}>
                <Text>进度: {plan.progress * 100}%</Text>
                <ProgressBar
                  progress={plan.progress}
                  color="#059973"
                  style={styles.progressBar}
                />
              </View>
              <View style={styles.planFooter}>
                <Text style={styles.date}>日期：{plan.date}</Text>
                <View style={styles.participantsContainer}>
                  <Text style={styles.participantCount}>9999人</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>个人学经计划</Text>
        <View style={styles.planList}>
          {plans.map(plan => (
            <View key={plan.id} style={styles.planCard}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <View style={styles.progressContainer}>
                <Text>进度: {plan.progress * 100}%</Text>
                <ProgressBar
                  progress={plan.progress}
                  color="#3498db"
                  style={styles.progressBar}
                />
              </View>
              <View style={styles.planFooter}>
                <Text style={styles.date}>日期：{plan.date}</Text>
                <View style={styles.participantsContainer}>
                  <Text style={styles.participantCount}>9999人</Text>
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
            <Text style={styles.userName}>{userInfo.name}</Text>
            <View style={styles.tagContainer}>
              {userInfo.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.userDetails}>
            UID: {userInfo.uid} | {userInfo.location} | {userInfo.distance}
          </Text>
          <Text style={styles.dateInfo}>
            注册时间: {userInfo.registerDate} 加入日期: {userInfo.joinDate}
          </Text>
        </View>
      </View>
      <View style={styles.tabsContainer}>
        <CustomTabs
          tabs={tabs}
          onTabChange={key => console.log('Tab changed:', key)}
        />
      </View>
    </ScrollView>
  );
};

const StatBox = ({number, label}) => (
  <View style={styles.statBox}>
    <Text style={styles.statNumber}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
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
  },
  header: {
    height: 108,
    backgroundColor: '#A8A8A8',
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
    padding: 5,
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
    flex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    // marginTop: 8,
  },
  tag: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    color: '#4A90E2',
    fontSize: 12,
  },
  userDetails: {
    color: '#2E2E2E',
    fontSize: 12,
    marginBottom: 14,
  },
  dateInfo: {
    color: '#2E2E2E',
    fontSize: 12,
    marginBottom: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginTop: 8,
  },
  statBox: {
    alignItems: 'center',
    width: 100,
    height: 56,
    backgroundColor: '#4793C2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 12,
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
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  planTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  progressContainer: {
    marginVertical: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 4,
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
});

export default Devotion;
