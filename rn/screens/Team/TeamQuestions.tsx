import React from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';
import {useNavigation} from '@react-navigation/native';
import {QuestionCardItem} from './components/QuestionCardItem';
import {getImageUrl} from '@utils/imgs';

type QuestionCard = {
  id: string;
  title: string;
  completedCount: number;
  totalCount: number;
  progress: number;
  location?: string;
  date?: string;
  duration?: string;
  isPersonal?: boolean;
  status: 'todo' | 'pending' | 'completed';
  members: string[];
};

const TeamQuestions = () => {
  const navigation = useNavigation();

  const questions: QuestionCard[] = [
    {
      id: '1',
      title: '关于五旬节的问题',
      completedCount: 9999,
      totalCount: 10000,
      progress: 65,
      isPersonal: true,
      status: 'completed',
      members: [
        getImageUrl(),
        getImageUrl(),
        getImageUrl(),
        getImageUrl(),
        getImageUrl(),
      ],
    },
    {
      id: '2',
      title: '使徒行传第一章习题',
      completedCount: 156,
      totalCount: 200,
      progress: 78,
      location: '四川成都',
      date: '2024-08-10',
      duration: '34分钟',
      status: 'pending',
      members: [getImageUrl(), getImageUrl(), getImageUrl(), getImageUrl()],
    },
    {
      id: '3',
      title: '保罗的宣教之旅',
      completedCount: 45,
      totalCount: 180,
      progress: 25,
      location: '北京朝阳',
      date: '2024-07-15',
      duration: '45分钟',
      status: 'todo',
      members: [
        getImageUrl(),
        getImageUrl(),
        getImageUrl(),
        getImageUrl(),
        getImageUrl(),
      ],
    },
    {
      id: '4',
      title: '耶稣的比喻',
      completedCount: 89,
      totalCount: 100,
      progress: 89,
      isPersonal: true,
      status: 'pending',
      members: [getImageUrl(), getImageUrl(), getImageUrl(), getImageUrl()],
    },
    {
      id: '5',
      title: '登山宝训解析',
      completedCount: 220,
      totalCount: 300,
      progress: 73,
      location: '广州天河',
      date: '2024-09-01',
      duration: '60分钟',
      status: 'completed',
      members: [getImageUrl(), getImageUrl(), getImageUrl(), getImageUrl()],
    },
    {
      id: '6',
      title: '约翰福音研读',
      completedCount: 67,
      totalCount: 150,
      progress: 45,
      location: '深圳南山',
      date: '2024-08-25',
      duration: '40分钟',
      status: 'todo',
      members: [getImageUrl(), getImageUrl(), getImageUrl(), getImageUrl()],
    },
  ];

  const renderQuestionCard = (question: QuestionCard) => (
    <QuestionCardItem
      key={question.id}
      title={question.title}
      progress={question.progress}
      type="question"
      members={question.members}
      completedCount={question.completedCount}
      status={question.status}
      date={question.date}
      location={question.location}
      duration={question.duration}
      onPress={() =>
        navigation.navigate('OrganizationTask', {
          screen: 'QuestionDetail',
          params: {
            id: question.id,
          },
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            name="arrow-left"
            size={20}
            color="#333"
            iconStyle="solid"
          />
        </TouchableOpacity>
        <BaseText style={styles.headerTitle}>小组习题</BaseText>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        {questions.map(renderQuestionCard)}
      </ScrollView>
    </View>
  );
};

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  progressContainer: {
    gap: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#52C41A',
    borderRadius: 2,
  },
  avatarList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedCount: {
    fontSize: 12,
    color: '#999',
  },
  rightGradient: {
    width: 120,
    backgroundColor: '#FFB224',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  metaInfo: {
    alignItems: 'flex-end',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#fff',
  },
  personalCard: {
    backgroundColor: '#FFF7E8',
    borderWidth: 1,
    borderColor: '#FFE7BA',
  },
});

export default TeamQuestions;
