import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import BaseText from '@components/BaseText';
import {commonStyles, transformStyles} from '@utils/index';
import Header from '@components/CommonHeader';
import CustomTabs from '@components/Tabs';
import {useNavigation} from '@react-navigation/native';
import {getImageUrl} from '@utils/imgs';
import FontAwesome from '@react-native-vector-icons/fontawesome6';

interface StatsItem {
  label: string;
  value: string;
  key: string;
  icon: string;
}

function SpreadStatsScreen(): React.JSX.Element {
  const tabs = [
    {
      key: 'member',
      label: '组员',
      renderItem: () => <MemberList />,
    },
    {
      key: 'scripture',
      label: '经文',
      renderItem: () => <StatsList type="scripture" />,
    },
    {
      key: 'question',
      label: '答题',
      renderItem: () => <StatsList />,
    },
    {
      key: 'share',
      label: '请客',
      renderItem: () => <StatsList />,
    },
    {
      key: 'topic',
      label: '话题',
      renderItem: () => <StatsList />,
    },
  ];

  return (
    <>
      <View style={styles.wrapper}>
        <Header />
        <View style={styles.container}>
          {/* 统计栏 */}
          <View style={styles.statsBox}>
            {[
              {label: '总分享次数', value: '999'},
              {label: '总点击次数', value: '999'},
              {label: '新注册用户', value: '9999'},
            ].map((item, index) => (
              <View key={index} style={styles.statItem}>
                <BaseText style={styles.statLabel}>{item.label}</BaseText>
                <BaseText style={styles.statNumber}>{item.value}</BaseText>
              </View>
            ))}
          </View>
          <CustomTabs tabs={tabs} onTabChange={key => console.log(key)} />
        </View>
      </View>
    </>
  );
}

const MemberList = () => {
  const navigation = useNavigation();

  const members = [
    {
      id: 1,
      name: '名称文本信息',
      avatar: getImageUrl(),
      location: '四川成都',
      distance: '1532KM',
      shares: '9999',
      reactions: '9999',
      time: '2024-08-30 04:42',
    },
    {
      id: 2,
      name: '张三',
      avatar: getImageUrl(),
      location: '北京朝阳',
      distance: '892KM',
      shares: '8888',
      reactions: '8888',
      time: '2024-08-29 15:30',
    },
    {
      id: 3,
      name: '李四',
      avatar: getImageUrl(),
      location: '上海浦东',
      distance: '1238KM',
      shares: '7777',
      reactions: '7777',
      time: '2024-08-28 09:15',
    },
    {
      id: 4,
      name: '王五',
      avatar: getImageUrl(),
      location: '广州天河',
      distance: '2156KM',
      shares: '6666',
      reactions: '6666',
      time: '2024-08-27 18:20',
    },
    {
      id: 5,
      name: '赵六',
      avatar: getImageUrl(),
      location: '深圳南山',
      distance: '1856KM',
      shares: '5555',
      reactions: '5555',
      time: '2024-08-26 12:35',
    },
    {
      id: 6,
      name: '孙七',
      avatar: getImageUrl(),
      location: '杭州西湖',
      distance: '986KM',
      shares: '4444',
      reactions: '4444',
      time: '2024-08-25 16:48',
    },
    {
      id: 7,
      name: '周八',
      avatar: getImageUrl(),
      location: '武汉江汉',
      distance: '1123KM',
      shares: '3333',
      reactions: '3333',
      time: '2024-08-24 09:52',
    },
    {
      id: 8,
      name: '吴九',
      avatar: getImageUrl(),
      location: '重庆渝中',
      distance: '1678KM',
      shares: '2222',
      reactions: '2222',
      time: '2024-08-23 14:26',
    },
  ];

  const handleMemberPress = (memberId: number) => {
    navigation.navigate('Organization', {
      screen: 'MemberSpreadDetail',
      params: {
        memberId: '123',
      },
    });
  };

  return (
    <ScrollView style={styles.memberListContainer}>
      {members.map(member => (
        <TouchableOpacity
          key={member.id}
          style={styles.memberCard}
          onPress={() => handleMemberPress(member.id)}>
          <View style={styles.memberCardContent}>
            <Image source={{uri: member.avatar}} style={styles.avatar} />
            <View style={styles.memberInfo}>
              <BaseText style={styles.memberName}>{member.name}</BaseText>
              <View style={styles.statsRow}>
                <BaseText style={styles.statsText}>
                  {member.shares} 次分享
                </BaseText>
                <BaseText style={styles.statsText}>
                  {member.reactions} 灰反馈
                </BaseText>
              </View>
              <View style={styles.locationRow}>
                <BaseText style={styles.locationText}>
                  {member.location}
                </BaseText>
                <BaseText style={styles.locationText}>
                  {member.distance}
                </BaseText>
                <BaseText style={styles.timeText}>{member.time}</BaseText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// 统计列表组件
const StatsList = ({type}: {type?: string}) => {
  // 根据类型返回不同的数据
  const getListData = () => {
    switch (type) {
      case 'scripture':
        return [
          {
            items: [
              {
                label: '分享经文人数',
                value: '99999',
                key: 'scripture_share_people',
                icon: 'user-group',
              },
              {
                label: '分享经文组织数',
                value: '99999',
                key: 'scripture_share_org',
                icon: 'building',
              },
              {
                label: '经文分享数',
                value: '99999',
                key: 'scripture_share_count',
                icon: 'share',
              },
              {
                label: '分享点击数',
                value: '99999',
                key: 'scripture_click_count',
                icon: 'hand-pointer',
              },
              {
                label: '新用户数',
                value: '99999',
                key: 'scripture_new_users',
                icon: 'user-plus',
              },
            ],
          },
          {
            items: [
              {
                label: '分享批注人数',
                value: '99999',
                key: 'annotation_share_people',
                icon: 'user-group',
              },
              {
                label: '分享批注组织数',
                value: '99999',
                key: 'annotation_share_org',
                icon: 'building',
              },
              {
                label: '批注分享数',
                value: '99999',
                key: 'annotation_share_count',
                icon: 'comment',
              },
              {
                label: '分享点击数',
                value: '99999',
                key: 'annotation_click_count',
                icon: 'hand-pointer',
              },
              {
                label: '新用户数',
                value: '99999',
                key: 'annotation_new_users',
                icon: 'user-plus',
              },
            ],
          },
          {
            items: [
              {
                label: '分享讨论人数',
                value: '99999',
                key: 'discussion_share_people',
                icon: 'user-group',
              },
              {
                label: '分享讨论组织数',
                value: '99999',
                key: 'discussion_share_org',
                icon: 'building',
              },
              {
                label: '讨论分享数',
                value: '99999',
                key: 'discussion_share_count',
                icon: 'comments',
              },
              {
                label: '分享点击数',
                value: '99999',
                key: 'discussion_click_count',
                icon: 'hand-pointer',
              },
              {
                label: '新用户数',
                value: '99999',
                key: 'discussion_new_users',
                icon: 'user-plus',
              },
            ],
          },
        ];
      default:
        // 其他标签页使用原有数据
        return Array(3).fill({
          items: [
            {
              label: '分享回赠人数',
              value: '99999',
              key: 'reward_share_people',
              icon: 'user-group',
            },
            {
              label: '分享回赠贡献',
              value: '99999',
              key: 'reward_share_contribution',
              icon: 'gift',
            },
            {
              label: '问题分享数',
              value: '99999',
              key: 'question_share_count',
              icon: 'question-circle',
            },
            {
              label: '分享点击数',
              value: '99999',
              key: 'share_click_count',
              icon: 'hand-pointer',
            },
            {
              label: '新用户数',
              value: '99999',
              key: 'new_users',
              icon: 'user-plus',
            },
          ],
        });
    }
  };

  return (
    <ScrollView style={styles.listContainer}>
      {getListData().map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.divider}>
          {section.items.map((item: StatsItem, index: number) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.statsLeft}>
                <FontAwesome
                  style={commonStyles.icon}
                  name={item.icon}
                  size={15}
                  color="#666666"
                  iconStyle="solid"
                />
                <BaseText style={styles.listLabel}>{item.label}</BaseText>
              </View>
              <BaseText style={styles.listValue}>{item.value}</BaseText>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = transformStyles({
  wrapper: {
    backgroundColor: '#F6F6F6',
    height: '100%',
  },
  container: {
    flex: 1,

    // paddingTop: 26,
  },
  tabsContainer: {
    // backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  statsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    height: 108,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
  },
  listContainerScrollView: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  listItem: {
    backgroundColor: 'rgba(216, 216, 216, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 228, 228, 1)',
  },
  listLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  listValue: {
    fontSize: 16,
    color: '#666',
  },
  divider: {
    // height: 16,
    // backgroundColor: '#fff',
    // marginHorizontal: 30,
    marginBottom: 16,
    borderRadius: 4,
    overflow: 'hidden',
  },
  memberListContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  memberCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  statsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export default SpreadStatsScreen;
