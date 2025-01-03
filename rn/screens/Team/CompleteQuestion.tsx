import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';

interface CompleteQuestionProps {
  navigation: any;
  route: {
    params?: {
      mode?: 'answer' | 'edit';
      assigned?: boolean;
    };
  };
}

const CompleteQuestion: React.FC<CompleteQuestionProps> = ({
  navigation,
  route,
}) => {
  const {mode = 'answer', assigned = true} = route.params ?? {};

  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState('23:59:34'); // 倒计时时间

  // 渲染已完成用户
  const renderCompletedUsers = () => (
    <View style={styles.usersContainer}>
      <View style={styles.avatarList}>
        {[1, 2, 3].map(id => (
          <Image
            key={id}
            source={{
              uri: `http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024`,
            }}
            style={[styles.avatar, {marginLeft: id > 1 ? -10 : 0}]}
          />
        ))}
      </View>
      <Text style={styles.completedText}>9999人已完成</Text>
    </View>
  );

  // 渲染问题内容
  const renderQuestion = () => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>关于五旬节的问题</Text>
      <Text style={styles.questionContent}>
        五旬节在旧约里是什么节期，叫什么名称，是干嘛的，与逾越节在时间上什么关系？这时门徒们正在干嘛？这个五旬节与旧西兰布之后的一千五百年来每年的五旬节，以及过去这近两千年每年的五旬节有什么特别之处？
      </Text>
    </View>
  );

  // 渲染底部按钮
  const renderBottomButtons = () => {
    if (mode === 'answer') {
      if (assigned) {
        // 指派未答状态
        return (
          <View style={styles.bottomContainer}>
            <View style={styles.timerContainer}>
              <FontAwesome
                name="clock"
                size={16}
                color="#666"
                iconStyle="solid"
              />
              <Text style={styles.timerText}>{timeLeft}</Text>
              <TouchableOpacity style={styles.refreshButton}>
                <FontAwesome
                  name="rotate"
                  size={16}
                  color="#666"
                  iconStyle="solid"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>提交</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        // 未指派未答状态
        return (
          <TouchableOpacity style={styles.quickAnswerButton}>
            <Text style={styles.quickAnswerButtonText}>快速回答</Text>
          </TouchableOpacity>
        );
      }
    } else {
      // 修改状态
      return (
        <View style={styles.editButtonsContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>修改</Text>
          </TouchableOpacity>
          {!assigned && (
            <TouchableOpacity style={styles.distributeButton}>
              <Text style={styles.distributeButtonText}>派发</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.refreshButton}>
            <FontAwesome
              name="rotate"
              size={16}
              color="#666"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            name="book-open"
            size={20}
            color="#333"
            iconStyle="solid"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1/5题</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {renderQuestion()}
        <TextInput
          style={styles.answerInput}
          placeholder="请输入您的回答"
          value={answer}
          onChangeText={setAnswer}
          multiline
          textAlignVertical="top"
          selectionColor={'#FFB224'}
        />
        <View style={styles.infoContainer}>
          {/* <FontAwesome name="lightbulb" size={16} color="#3B8E58" iconStyle="solid" /> */}
          {renderCompletedUsers()}
        </View>
        {mode === 'edit' && (
          <View style={styles.locationContainer}>
            <Text style={styles.dateText}>2024-08-10 18:21</Text>
            <Text style={styles.locationText}>四川成都</Text>
          </View>
        )}
      </View>

      {renderBottomButtons()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerTitle: {
    fontSize: 14,
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
    color: '#3B8E58',
    marginBottom: 12,
  },
  questionContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  answerInput: {
    height: 120,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarList: {
    flexDirection: 'row',
    marginRight: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  completedText: {
    fontSize: 12,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginRight: 16,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginRight: 16,
  },
  refreshButton: {
    padding: 8,
  },
  submitButton: {
    backgroundColor: '#FF8800',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quickAnswerButton: {
    backgroundColor: '#FF8800',
    margin: 16,
    padding: 12,
    borderRadius: 22,
    alignItems: 'center',
  },
  quickAnswerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  editButton: {
    backgroundColor: '#FF8800',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginRight: 12,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  distributeButton: {
    backgroundColor: '#3B8E58',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginRight: 12,
  },
  distributeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CompleteQuestion;
