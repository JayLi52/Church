import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {commonStyles, transformStyles} from '@utils/index';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CountDown from './components/CountDown';
import {getImageUrl} from '@utils/imgs';

type QuestionStatus = 'assigned' | 'unassigned';

// 添加题目数据
const QUESTIONS = [
  {
    id: '1',
    title:
      '五旬节在旧约里是什么名称，是什么节期？这时门徒正在等什么？这个五旬节与普通的五旬节有什么特别之处？以及这是在所罗门年代的五旬节有什么特别之处？',
  },
  {
    id: '2',
    title:
      '使徒行传中，圣灵降临时有哪些特殊的现象？这些现象分别代表什么含义？为什么要有这些特殊的现象？',
  },
  {
    id: '3',
    title:
      '门徒被圣灵充满后说方言，是什么样的方言？这与哥林多前书12-14章所讲的方言有什么异同？',
  },
  {
    id: '4',
    title:
      '彼得在五旬节的讲道中引用了哪些旧约经文？这些经文如何印证耶稣就是弥赛亚？',
  },
  {
    id: '5',
    title:
      '五旬节圣灵降临的事件，对于理解教会的建立和使命有什么重要意义？请结合经文详细分析。',
  },
];

const QuestionDetail = ({route}: {route: RouteProp<any, any>}) => {
  const navigation = useNavigation();
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<QuestionStatus>('assigned');
  const [isAnswered, setIsAnswered] = useState(true);
  const [index, setIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(QUESTIONS[0]);

  const isLastQuestion = index === QUESTIONS.length;

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // 跳转到已答列表页面
      navigation.navigate('OrganizationTask', {
        screen: 'AnsweredList',
      });
    } else {
      const nextIndex =
        QUESTIONS.findIndex(q => q.id === currentQuestion.id) + 1;
      if (nextIndex < QUESTIONS.length) {
        setCurrentQuestion(QUESTIONS[nextIndex]);
        setIndex(nextIndex + 1);
        setAnswer('');
        setIsAnswered(false);
      }
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          name="arrow-left"
          size={20}
          color="#333"
          iconStyle="solid"
        />
      </TouchableOpacity>
      <BaseText style={styles.headerTitle}>{index}/5题</BaseText>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
      </TouchableOpacity>
    </View>
  );

  const renderAvatarList = () => (
    <View style={styles.avatarList}>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <Image
          key={index}
          source={{uri: getImageUrl()}}
          style={[styles.avatar, index > 0 && styles.overlappingAvatar]}
        />
      ))}
    </View>
  );

  const renderQuestion = () => (
    <View style={styles.questionContainer}>
      <BaseText style={styles.questionTitle}>{currentQuestion.title}</BaseText>
      <View style={styles.completedInfo}>
        {renderAvatarList()}
        <BaseText style={styles.completedCount}>9999人已完成</BaseText>
      </View>
    </View>
  );

  const renderAnswerInput = () => (
    <View style={styles.answerContainer}>
      <TextInput
        style={styles.answerInput}
        placeholder="请输入你的回答"
        multiline
        value={answer}
        onChangeText={setAnswer}
        editable={!isAnswered}
        selectionColor="#FFB224"
      />
      {isAnswered && (
        <View style={styles.answerMeta}>
          <BaseText style={styles.metaText}>2024-08-10 18:21</BaseText>
          <BaseText style={styles.metaText}>四川成都</BaseText>
        </View>
      )}
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {!isAnswered && status === 'assigned' && (
        <CountDown
          initialTime={24 * 60}
          onComplete={() => {
            // 处理倒计时结束
            navigation.navigate('OrganizationTask', {
              screen: 'QuestionDetail',
              params: {
                id: route.params.id,
              },
            });
          }}
          onFinish={() => {
            // 已到时间，跳到下一题，并保存答案 当前题为未完成状态
          }}
        />
      )}
      <View style={styles.buttonGroup}>
        {isAnswered ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {}}>
              <BaseText style={[styles.buttonText, styles.primaryButtonText]}>
                修改
              </BaseText>
            </TouchableOpacity>
          </>
        ) : (
          status !== 'assigned' && (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {}}>
              <BaseText style={[styles.buttonText, styles.primaryButtonText]}>
                我也要答题
              </BaseText>
            </TouchableOpacity>
          )
        )}

        {isAnswered && status === 'unassigned' && (
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <BaseText style={styles.buttonText}>放弃</BaseText>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
          <FontAwesome
            // style={commonStyles.icon}
            name="share-nodes"
            size={18}
            color="#FFB224"
            iconStyle="solid"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.primaryButton,
            {backgroundColor: '#FFF7E8'},
          ]}
          onPress={handleNextQuestion}>
          <BaseText
            style={[
              styles.buttonText,
              styles.primaryButtonText,
              {color: '#FFB224'},
            ]}>
            {isLastQuestion ? '查看整体答题情况' : '下一题'}
          </BaseText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content}>
        {renderQuestion()}
        {renderAnswerInput()}
      </ScrollView>
      {renderFooter()}
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
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionTitle: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 16,
  },
  completedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarList: {
    flexDirection: 'row',
  },
  completedCount: {
    fontSize: 12,
    color: '#999',
  },
  answerContainer: {
    flex: 1,
  },
  answerInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 16,
    minHeight: 200,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
  },
  answerMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF7E8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#FFB224',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});

export default QuestionDetail;
