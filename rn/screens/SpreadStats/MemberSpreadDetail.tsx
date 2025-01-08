import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import BaseText from '@components/BaseText';
import {commonStyles, transformStyles} from '@utils/index';
import CustomTabs from '@components/Tabs';
import {getImageUrl} from '@utils/imgs';
import FontAwesome from '@react-native-vector-icons/fontawesome6';

// 首先添加必要的类型定义
interface RouteParams {
  memberId: string;
}

interface NavigationType {
  goBack: () => void;
}

interface TabItem {
  key: 'scripture' | 'question' | 'share' | 'topic';
  label: string;
  renderItem: () => JSX.Element;
}

interface StatsItem {
  label: string;
  value: string;
  key: string;
  icon: string;
}

const MemberSpreadDetail = ({
  route,
  navigation,
}: {
  route: {params: RouteParams};
  navigation: NavigationType;
}) => {
  const {memberId} = route.params;

  const tabs: TabItem[] = [
    {
      key: 'scripture',
      label: '学经',
      renderItem: () => <StatsList type="scripture" />,
    },
    {
      key: 'question',
      label: '答题',
      renderItem: () => <StatsList type="question" />,
    },
    {
      key: 'share',
      label: '祷告',
      renderItem: () => <StatsList type="share" />,
    },
    {
      key: 'topic',
      label: '话题',
      renderItem: () => <StatsList type="topic" />,
    },
  ];

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <BaseText style={styles.closeText}>×</BaseText>
        </TouchableOpacity>
        <BaseText style={styles.headerTitle}>成员详细信息</BaseText>
      </View>

      {/* 用户信息 */}
      <View style={styles.userInfo}>
        <Image source={{uri: getImageUrl()}} style={styles.avatar} />
        <BaseText style={styles.userName}>用户名称文本信息</BaseText>
        <BaseText style={styles.userId}>UID: 0000000001</BaseText>
      </View>

      {/* 统计内容 */}
      <View style={styles.content}>
        <CustomTabs tabs={tabs} onTabChange={key => console.log(key)} />
      </View>
    </View>
  );
};

// 统计列表组件
const StatsList = ({type}: {type: TabItem['key']}) => {
  const getStatsData = (): StatsItem[][] => {
    const statsMap: Record<TabItem['key'], StatsItem[][]> = {
      scripture: [
        [
          {
            label: '经文分享数',
            value: '99999',
            key: 'scriptureShare',
            icon: 'book-bible',
          },
          {
            label: '分享点击数',
            value: '99999',
            key: 'scriptureClick',
            icon: 'hand-pointer',
          },
          {
            label: '新用户数',
            value: '99999',
            key: 'scriptureNewUser',
            icon: 'user',
          },
        ],
        [
          {label: '批注分享数', value: '99999', key: 'noteShare', icon: 'pen'},
          {
            label: '分享点击数',
            value: '99999',
            key: 'noteClick',
            icon: 'hand-pointer',
          },
          {label: '新用户数', value: '99999', key: 'noteNewUser', icon: 'user'},
        ],
        [
          {
            label: '讨论分享数',
            value: '99999',
            key: 'discussShare',
            icon: 'comments',
          },
          {
            label: '分享点击数',
            value: '99999',
            key: 'discussClick',
            icon: 'hand-pointer',
          },
          {
            label: '新用户数',
            value: '99999',
            key: 'discussNewUser',
            icon: 'user',
          },
        ],
      ],
      question: [
        [
          {
            label: '问题分享数',
            value: '99999',
            key: 'questionShare',
            icon: 'question',
          },
          {
            label: '分享点击数',
            value: '99999',
            key: 'questionClick',
            icon: 'hand-pointer',
          },
          {
            label: '新用户数',
            value: '99999',
            key: 'questionNewUser',
            icon: 'user',
          },
        ],
        [
          {
            label: '答题分享数',
            value: '99999',
            key: 'answerShare',
            icon: 'check',
          },
          {
            label: '分享点击数',
            value: '99999',
            key: 'answerClick',
            icon: 'hand-pointer',
          },
          {
            label: '新用户数',
            value: '99999',
            key: 'answerNewUser',
            icon: 'user',
          },
        ],
      ],
      share: [
        [
          {label: '讨论分享数', value: '99999', key: 'prayShare', icon: 'pray'},
          {
            label: '分享点击数',
            value: '99999',
            key: 'prayClick',
            icon: 'hand-pointer',
          },
          {label: '新用户数', value: '99999', key: 'prayNewUser', icon: 'user'},
        ],
      ],
      topic: [
        [
          {
            label: '讨论分享数',
            value: '99999',
            key: 'topicShare',
            icon: 'topic',
          },
          {
            label: '分享点击数',
            value: '99999',
            key: 'topicClick',
            icon: 'hand-pointer',
          },
          {
            label: '新用户数',
            value: '99999',
            key: 'topicNewUser',
            icon: 'user',
          },
        ],
      ],
    };

    return statsMap[type] || [];
  };

  return (
    <ScrollView style={styles.statsContainer}>
      <View style={styles.statsWrapper}>
        {getStatsData().map((items, groupIndex) => (
          <View key={`group-${groupIndex}`} style={styles.statsGroup}>
            {items.map((item: StatsItem, index: number) => (
              <View key={index} style={styles.statsItem}>
                <View style={styles.statsLeft}>
                  <FontAwesome
                    style={commonStyles.icon}
                    name={item.icon}
                    size={15}
                    color="#666666"
                    iconStyle="solid"
                  />
                  <BaseText style={styles.statsLabel}>{item.label}</BaseText>
                </View>
                <BaseText style={styles.statsValue}>{item.value}</BaseText>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 10,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userId: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  statsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  statsWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  statsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  statsLabel: {
    fontSize: 16,
    color: '#333333',
  },
  statsValue: {
    fontSize: 16,
    color: '#666666',
  },
  statsGroup: {
    marginVertical: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  statsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default MemberSpreadDetail;
