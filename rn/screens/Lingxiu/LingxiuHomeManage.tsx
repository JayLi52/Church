import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {transformStyles} from '@utils/index';
import Header from '@components/CommonHeader';
import Tabs from '@components/Tabs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootState} from '@store/store';
import {useSelector} from 'react-redux';
import {getImageUrl} from '@utils/imgs';
import {NavigationProp} from '@react-navigation/native';
import {QuestionCard} from '@screens/Lingxiu/components/QuestionCard';

type RootStackParamList = {
  OrganizationTask: {
    screen: string;
  };
  // ... 其他路由参数
};

const LingxiuHomeManage = () => {
  const stats = {
    duration: {
      years: 2,
      days: 100,
    },
    members: '0003',
  };

  const plans = [
    {
      id: '1',
      title: '90天阅读旧约',
      progress: 0.65,
      status: '进行中',
      date: '2024-08-11 至 2024-08-21',
      participants: [
        getImageUrl(),
        getImageUrl(),
        getImageUrl(),
        getImageUrl(),
      ],
      participantsCount: 9999,
    },
    {
      id: '2',
      title: '90天阅读旧约',
      progress: 1,
      status: '已完成',
      date: '2024-08-11 至 2024-08-21',
      participants: [getImageUrl(), getImageUrl(), getImageUrl()],
      participantsCount: 9999,
    },
    {
      id: '3',
      title: '90天阅读旧约',
      progress: 0,
      status: '未开始',
      date: '2024-08-11 至 2024-08-21',
      participants: [getImageUrl(), getImageUrl()],
      participantsCount: 9999,
    },
  ];
  const pageType = useSelector((state: RootState) => state.page.pageType);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    if (pageType === 'team') {
      navigation.navigate('OrganizationTask', {
        screen: 'LingxiuHome',
      });
    }
  }, [pageType, navigation]);
  useFocusEffect(() => {
    if (pageType === 'team') {
      navigation.navigate('OrganizationTask', {
        screen: 'LingxiuHome',
      });
    }
  });

  return (
    <View style={styles.container}>
      <Header />

      {/* 统计卡片 */}
      <View style={styles.statsRow}>
        <View style={[styles.statsCard, styles.durationCard]}>
          <Text style={styles.statsLabel}>累计灵修时长</Text>
          <View style={styles.durationValue}>
            <Text style={styles.statsHighlight}>{stats.duration.years} </Text>
            <Text style={styles.statsNormal}>年 </Text>
            <Text style={styles.statsHighlight}>{stats.duration.days} </Text>
            <Text style={styles.statsNormal}>天</Text>
          </View>
        </View>
        <View style={[styles.statsCard, styles.membersCard]}>
          <Text style={styles.statsLabel}>累计灵修人次</Text>
          <Text style={styles.statsValue}>{stats.members}</Text>
        </View>
      </View>

      <Tabs
        tabs={[
          {
            key: 'plan',
            label: '学经计划',
            renderItem: () => (
              <View style={styles.planList}>
                {plans.map(plan => (
                  <View key={plan.id} style={styles.planCard}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {width: `${plan.progress * 100}%`},
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      进度: {plan.progress * 100}%
                    </Text>
                    <View style={styles.planFooter}>
                      <Text style={styles.planDate}>{plan.date}</Text>
                      <View style={styles.participantsBox}>
                        <View style={styles.avatarStack}>
                          {plan.participants
                            .slice(0, 3)
                            .map((avatar, index) => (
                              <Image
                                key={index}
                                source={{uri: avatar}}
                                style={[
                                  styles.participantAvatar,
                                  {right: index * 15},
                                ]}
                              />
                            ))}
                        </View>
                        <Text style={styles.participantsCount}>
                          {plan.participantsCount}人
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ),
          },
          {
            key: 'answer',
            label: '答题',
            renderItem: () => <AnswerContent />,
          },
          {
            key: 'report',
            label: '集体祷告',
            renderItem: () => <View />,
          },
        ]}
        onTabChange={tab => {
          console.log(tab);
        }}
      />
    </View>
  );
};

const AnswerContent = () => {
  const questions = [
    {
      id: '1',
      title: '关于五旬节的问题',
      status: '进行中',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl(), getImageUrl(), getImageUrl()],
      participantsCount: 9999,
    },
    {
      id: '2',
      title: '五旬节的问题',
      status: '进行中',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl()],
      participantsCount: 9999,
    },
    {
      id: '3',
      title: '关于五旬节的问题',
      status: '已结束',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl(), getImageUrl()],
      participantsCount: 9999,
    },
    {
      id: '4',
      title: '关于五旬节的问题',
      status: '已结束',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl(), getImageUrl()],
      participantsCount: 9999,
    },
    {
      id: '5',
      title: '关于五旬节的问题',
      status: '已结束',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl(), getImageUrl()],
      participantsCount: 9999,
    },
    {
      id: '6',
      title: '使徒行传的问题',
      status: '进行中',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl(), getImageUrl()],
      participantsCount: 8888,
    },
    {
      id: '7',
      title: '关于保罗的问题',
      status: '已结束',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl(), getImageUrl(), getImageUrl()],
      participantsCount: 7777,
    },
    {
      id: '8',
      title: '耶稣的比喻问题',
      status: '进行中',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl()],
      participantsCount: 6666,
    },
    {
      id: '9',
      title: '登山宝训的问题',
      status: '已结束',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl(), getImageUrl()],
      participantsCount: 5555,
    },
    {
      id: '10',
      title: '约翰福音的问题',
      status: '进行中',
      date: '2024-08-11',
      endDate: '2024-08-21',
      participants: [getImageUrl(), getImageUrl(), getImageUrl()],
      participantsCount: 4444,
    },
  ];

  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleLongPress = (id: string) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleClose = () => {
    setShowDelete(false);
    setSelectedId(null);
  };

  const handleDelete = () => {
    Alert.alert('提示', '确定要删除该问题吗？', [
      {
        text: '取消',
        style: 'cancel',
        onPress: handleClose,
      },
      {
        text: '确定',
        style: 'destructive',
        onPress: () => {
          // TODO: 处理删除逻辑
          handleClose();
        },
      },
    ]);
  };

  return (
    <View style={styles.questionList}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            onDelete={id => {
              Alert.alert('提示', '确定要删除该问题吗？', [
                {
                  text: '取消',
                  style: 'cancel',
                },
                {
                  text: '确定',
                  style: 'destructive',
                  onPress: () => {
                    // TODO: 处理删除逻辑
                    console.log('删除问题:', id);
                  },
                },
              ]);
            }}
            onPress={id => {
              // TODO: 处理点击逻辑
              console.log('点击问题:', id);
            }}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => console.log('添加习题')}>
        <Text style={styles.floatingButtonIcon}>+</Text>
        <Text style={styles.floatingButtonText}>添加习题</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statsCard: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  durationCard: {
    backgroundColor: '#4793C2',
    flex: 1.5,
  },
  membersCard: {
    backgroundColor: '#4793C2',
    flex: 1,
  },
  statsLabel: {
    color: '#fff',
    fontSize: 12,
  },
  statsValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  durationValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  statsHighlight: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statsNormal: {
    color: '#fff',
    fontSize: 12,
  },
  planList: {
    padding: 16,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  planDate: {
    fontSize: 12,
    color: '#999',
  },
  participantsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  avatarStack: {
    flexDirection: 'row',
    position: 'relative',
    width: 45,
    height: 20,
  },
  participantAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  participantsCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  questionList: {
    padding: 16,
    flex: 1,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statusTag: {
    fontSize: 12,
    fontWeight: '500',
  },
  questionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
  },
  deleteText: {
    color: '#FF6E40',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 100,
    width: 190,
    height: 50,
    backgroundColor: '#FF8800',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: 'row',
    zIndex: 1000,
  },
  floatingButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  floatingButtonIcon: {
    fontSize: 24,
    color: '#fff',
  },
});

export default LingxiuHomeManage;
