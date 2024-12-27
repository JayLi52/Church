import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {commonStyles, transformStyles} from '@utils/index';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@store/store';

export const CommentDetail = () => {
  const navigation = useNavigation();
  //   const {comment, verse} = route.params;
  const [replyText, setReplyText] = useState('');
  const comment = useSelector(
    (state: RootState) =>
      state.bookManage.comment || {
        id: '1',
        type: 'mine',
        user: {
          id: '1',
          name: '张三',
          avatar: 'https://via.placeholder.com/150',
        },
        content: '这是一条评论内容，描述了对这段经文的理解和感悟...',
        date: '24-01-22 14:23',
        location: '四川成都 9999KM',
        likes: 1234,
        replies: [
          {
            id: 'r1',
            user: {
              id: '2',
              name: '李四',
              avatar: 'https://via.placeholder.com/150',
            },
            content: '回复的内容...',
            date: '24-01-22 15:30',
            replyTo: {
              name: '张三',
            },
          },
          {
            id: 'r2',
            user: {
              id: '3',
              name: '王五',
              avatar: 'https://via.placeholder.com/150',
            },
            content: '另一条回复...',
            date: '24-01-22 16:45',
          },
        ],
      },
  );
  const verse = useSelector(
    (state: RootState) =>
      state.bookManage.verse || {
        // todo 目前先用假数据代替
        reference: '约翰福音 3:16',
        text: '因为神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不至灭亡，反得永生。',
      },
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome
            name="arrow-left"
            size={20}
            color="#333"
            iconStyle="solid"
          />
        </TouchableOpacity>
        <BaseText style={styles.title}>评论详情</BaseText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 引用的经文 */}
        <View style={styles.verseContainer}>
          <View style={styles.verseLine} />
          <View style={styles.verseContent}>
            <BaseText style={styles.verseReference}>{verse.reference}</BaseText>
            <BaseText style={styles.verseText}>{verse.text}</BaseText>
          </View>
        </View>

        {/* 主评论 */}
        <View style={styles.mainComment}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserProfile', {userId: comment.user.id})
            }
            style={styles.userAvatar}>
            <Image source={{uri: comment.user.avatar}} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <BaseText style={styles.userName}>{comment.user.name}</BaseText>
              <BaseText style={styles.date}>{comment.date}</BaseText>
            </View>
            <BaseText style={styles.commentText}>{comment.content}</BaseText>
            <View style={styles.commentFooter}>
              <View style={styles.location}>
                <FontAwesome
                  style={commonStyles.icon}
                  name="location-dot"
                  size={12}
                  color="#999"
                  iconStyle="solid"
                />
                <BaseText style={styles.locationText}>
                  {comment.location}
                </BaseText>
              </View>
            </View>
          </View>
        </View>

        <BaseText style={styles.replyTitle}>全部回复</BaseText>

        {/* 回复列表 */}
        <View style={styles.replies}>
          {comment.replies?.map(reply => (
            <View key={reply.id} style={styles.replyItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserProfile', {userId: reply.user.id})
                }
                style={styles.userAvatar}>
                <Image
                  source={{uri: reply.user.avatar}}
                  style={styles.replyAvatar}
                />
              </TouchableOpacity>
              <View style={styles.replyContent}>
                <View style={styles.replyHeader}>
                  <BaseText style={styles.replyUserName}>
                    {reply.user.name}
                    {reply.replyTo && (
                      <>
                        <BaseText style={styles.replyToText}> 回复 </BaseText>
                        <BaseText style={styles.replyToName}>
                          @{reply.replyTo.name}
                        </BaseText>
                      </>
                    )}
                  </BaseText>
                  <BaseText style={styles.replyDate}>{reply.date}</BaseText>
                </View>
                <BaseText style={styles.replyText}>{reply.content}</BaseText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 底部回复框 */}
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="写下你的回复..."
          placeholderTextColor="#999"
          selectionColor="#FFB224"
          value={replyText}
          onChangeText={setReplyText}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !replyText.trim() && styles.sendButtonDisabled,
          ]}
          disabled={!replyText.trim()}>
          <BaseText
            style={[
              styles.sendText,
              !replyText.trim() && styles.sendTextDisabled,
            ]}>
            发送
          </BaseText>
        </TouchableOpacity>
      </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  mainComment: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F6F6F6',
  },
  verseContainer: {
    padding: 16,
    backgroundColor: '#FFF5E6',
    flexDirection: 'row',
  },
  verseLine: {
    width: 3,
    backgroundColor: '#FFB224',
    marginRight: 12,
    borderRadius: 1.5,
  },
  replyTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#F6F6F6',
  },
  userAvatar: {
    marginRight: 12,
  },
  replyToText: {
    fontSize: 14,
    color: '#999',
  },
  replyToName: {
    fontSize: 14,
    color: '#333',
  },
  replies: {
    paddingTop: 8,
  },
  replyItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#FFB224',
    borderRadius: 5,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendTextDisabled: {
    color: '#999',
  },
  verseContent: {
    flex: 1,
  },
  verseReference: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  verseText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  replyUserName: {
    fontSize: 14,
    color: '#333',
  },
  replyDate: {
    fontSize: 12,
    color: '#999',
  },
  replyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
