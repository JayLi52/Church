import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import {useSwipeToDelete} from '@hooks/useSwipeToDelete';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    status: string;
    date: string;
    endDate: string;
    participants: string[];
    participantsCount: number;
  };
  onDelete: (id: string) => void;
  onPress: (id: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onDelete,
  onPress,
}) => {
  const {pan, panResponder, closeSwipe} = useSwipeToDelete();

  const handlePress = () => {
    closeSwipe();
    onPress(question.id);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, overflow: 'hidden', borderRadius: 8}}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(question.id)}>
          <FontAwesome
            name="trash-can"
            size={16}
            color="#FF4D4F"
            iconStyle="regular"
          />
          <Text style={styles.deleteText}>删除</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{translateX: pan}],
            },
          ]}
          {...panResponder.panHandlers}>
          <Pressable onPress={handlePress} style={styles.cardContent}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionTitle}>{question.title}</Text>
              <Text
                style={[
                  styles.statusTag,
                  {color: question.status === '已结束' ? '#9E9E9E' : '#4CAF50'},
                ]}>
                {question.status}
              </Text>
            </View>
            <View style={styles.questionFooter}>
              <Text style={styles.dateText}>
                开始日期：{question.date}
                {'\n'}
                结束日期：{question.endDate}
              </Text>
              <View style={styles.participantsBox}>
                <View style={styles.avatarStack}>
                  {question.participants.slice(0, 3).map((avatar, index) => (
                    <Image
                      key={index}
                      source={{uri: avatar}}
                      style={[styles.participantAvatar, {right: index * 15}]}
                    />
                  ))}
                </View>
                <Text style={styles.participantsCount}>
                  {question.participantsCount}人
                </Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = transformStyles({
  // ... 原有样式保持不变
  container: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'relative',
  },
  cardContent: {
    padding: 16,
  },
  deleteButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    right: -10,
    top: 0,
    bottom: 0,
  },
  deleteText: {
    fontSize: 12,
    color: '#FF4D4F',
    marginTop: 4,
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
});
