import React from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';
import {useNavigation} from '@react-navigation/native';
import {getImageUrl} from '@utils/imgs';

type AnsweredQuestion = {
  id: string;
  title: string;
  answer: string;
  date: string;
  location: string;
  duration: string;
  members: string[];
};

const AnsweredList = () => {
  const navigation = useNavigation();

  const answeredQuestions: AnsweredQuestion[] = [
    {
      id: '1',
      title: '五旬节在旧约里是什么名称，是什么节期？',
      answer: '这是我的回答内容...',
      date: '2024-08-10',
      location: '四川成都',
      duration: '34分钟',
      members: [getImageUrl(), getImageUrl(), getImageUrl()],
    },
    // ... 其他已答题目
  ];

  const renderAnswerCard = (question: AnsweredQuestion) => (
    <TouchableOpacity
      key={question.id}
      style={styles.card}
      onPress={() => {
        navigation.navigate('OrganizationTask', {
          screen: 'QuestionDetail',
          params: {
            id: question.id,
            mode: 'view',
          },
        });
      }}>
      <View style={styles.cardHeader}>
        <BaseText style={styles.title}>{question.title}</BaseText>
        <View style={styles.avatarList}>
          {question.members.map((avatar, index) => (
            <Image
              key={index}
              source={{uri: avatar}}
              style={[styles.avatar, index > 0 && styles.overlappingAvatar]}
            />
          ))}
        </View>
      </View>
      <View style={styles.answerPreview}>
        <BaseText numberOfLines={2} style={styles.answerText}>
          {question.answer}
        </BaseText>
      </View>
      <View style={styles.cardFooter}>
        <BaseText style={styles.metaText}>{question.date}</BaseText>
        <BaseText style={styles.metaText}>{question.location}</BaseText>
        <BaseText style={styles.metaText}>{question.duration}</BaseText>
      </View>
    </TouchableOpacity>
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
        <BaseText style={styles.headerTitle}>已答习题</BaseText>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        {answeredQuestions.map(renderAnswerCard)}
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
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 16,
  },
  avatarList: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  overlappingAvatar: {
    marginLeft: -12,
  },
  answerPreview: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
});

export default AnsweredList;
