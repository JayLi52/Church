import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
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
  const [replyTo, setReplyTo] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  const comment = useSelector(
    (state: RootState) =>
      state.bookManage.comment || {
        id: '1',
        type: 'mine',
        user: {
          id: '1',
          name: '张三',
          avatar:
            'http://gips3.baidu.com/it/u=617385017,3644165978&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
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
              avatar:
                'http://gips0.baidu.com/it/u=2254920273,941506475&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
            },
            content: '这段经文让我深受启发，特别是在理解神的爱这方面...',
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
              avatar:
                'http://gips1.baidu.com/it/u=1746086795,2510875842&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
            },
            content: '确实，这节经文是整本圣经的核心信息之一',
            date: '24-01-22 16:45',
          },
          {
            id: 'r3',
            user: {
              id: '4',
              name: '赵六',
              avatar:
                'http://gips3.baidu.com/it/u=1537137094,335954266&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280',
            },
            content: '@李四 同感，这让我想起了马太福音中的登山宝训...',
            date: '24-01-22 17:20',
            replyTo: {
              name: '李四',
            },
          },
          {
            id: 'r4',
            user: {
              id: '5',
              name: '钱七',
              avatar:
                'http://gips0.baidu.com/it/u=583074985,2627467797&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
            },
            content: '这段经文在我生命低谷时给了我很大的安慰和力量',
            date: '24-01-22 18:15',
          },
          {
            id: 'r5',
            user: {
              id: '6',
              name: '孙八',
              avatar:
                'http://gips1.baidu.com/it/u=4237787505,2117628450&fm=3028&app=3028&f=JPEG&fmt=auto?w=1440&h=2560',
            },
            content: '@王五 是的，约翰福音的神学深度确实令人敬畏',
            date: '24-01-22 19:05',
            replyTo: {
              name: '王五',
            },
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

  const handleLongPress = () => {
    if (comment.type === 'mine') {
      setShowDeleteModal(true);
    }
  };

  // 添加权限判断函数
  const canDeleteReply = (commentType: 'mine' | 'others') => {
    // 目前只判断主评论是否属于用户本身
    return commentType === 'mine';
  };

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

      {/* 引用的经文 - 固定 */}
      <View style={styles.verseContainer}>
        <View style={styles.verseLine} />
        <View style={styles.verseContent}>
          <BaseText style={styles.verseReference}>{verse.reference}</BaseText>
          <BaseText style={styles.verseText}>{verse.text}</BaseText>
        </View>
      </View>

      {/* 主评论 - 固定 */}
      <View style={styles.mainComment}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserProfile', {userId: comment.user.id})
          }
          style={styles.userAvatar}>
          <Image source={{uri: comment.user.avatar}} style={styles.avatar} />
        </TouchableOpacity>
        <Pressable
          style={styles.commentContent}
          onLongPress={handleLongPress}
          delayLongPress={500}>
          <View style={styles.commentHeader}>
            <BaseText style={styles.userName}>{comment.user.name}</BaseText>
            <BaseText style={styles.date}>{comment.date}</BaseText>
            {comment.type === 'mine' && (
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setShowDeleteModal(true)}>
                <FontAwesome
                  name="ellipsis"
                  size={16}
                  color="#999"
                  iconStyle="solid"
                />
              </TouchableOpacity>
            )}
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
        </Pressable>
        {showDeleteModal && (
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowDeleteModal(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  console.log('分享评论:', comment.id);
                  setShowDeleteModal(false);
                }}>
                <FontAwesome
                  name="share"
                  size={16}
                  color="#FFB224"
                  iconStyle="solid"
                />
                <BaseText style={styles.shareText}>分享</BaseText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => {
                  console.log('删除评论:', comment.id);
                  setShowDeleteModal(false);
                  navigation.goBack();
                }}>
                <FontAwesome
                  name="trash"
                  size={16}
                  color="#FF4D4F"
                  iconStyle="solid"
                />
                <BaseText style={styles.deleteText}>删除</BaseText>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* 全部回复标题 - 固定 */}
      <BaseText style={styles.replyTitle}>全部回复</BaseText>

      {/* 回复列表 - 可滚动 */}
      <ScrollView style={styles.repliesContainer}>
        <View style={styles.replies}>
          {comment.replies?.map(reply => (
            <Pressable
              key={reply.id}
              style={styles.replyItem}
              onPress={() => {
                setReplyTo({
                  id: reply.id,
                  name: reply.user.name,
                });
              }}>
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
                  <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => {
                      setSelectedReply(reply.id);
                    }}>
                    <FontAwesome
                      name="ellipsis"
                      size={16}
                      color="#999"
                      iconStyle="solid"
                    />
                  </TouchableOpacity>
                </View>
                <BaseText style={styles.replyText}>{reply.content}</BaseText>
                <BaseText style={styles.replyDate}>{reply.date}</BaseText>
              </View>
              {selectedReply === reply.id && (
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setSelectedReply(null)}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => {
                        console.log('分享回复:', reply.id);
                        setSelectedReply(null);
                      }}>
                      <FontAwesome
                        name="share"
                        size={16}
                        color="#FFB224"
                        iconStyle="solid"
                      />
                      <BaseText style={styles.shareText}>分享</BaseText>
                    </TouchableOpacity>
                    {canDeleteReply(comment.type) && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => {
                          console.log('删除回复:', reply.id);
                          setSelectedReply(null);
                          // TODO: 调用删除回复的 API
                        }}>
                        <FontAwesome
                          name="trash"
                          size={16}
                          color="#FF4D4F"
                          iconStyle="solid"
                        />
                        <BaseText style={styles.deleteText}>删除</BaseText>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* 底部回复框 */}
      <View style={styles.footer}>
        <View style={styles.inputWrapper}>
          {replyTo && (
            <View style={styles.replyToBar}>
              <BaseText style={styles.replyToText}>
                回复{' '}
                <BaseText style={styles.replyToName}>@{replyTo.name}</BaseText>
              </BaseText>
              <TouchableOpacity
                style={styles.cancelReply}
                onPress={() => setReplyTo(null)}>
                <FontAwesome
                  name="xmark"
                  size={16}
                  color="#999"
                  iconStyle="solid"
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.quoteButton}>
              <FontAwesome
                name="quote-left"
                size={16}
                color="#FFB224"
                iconStyle="solid"
              />
              <BaseText style={styles.quoteText}>引用经文</BaseText>
            </TouchableOpacity>
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
    position: 'relative',
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
    position: 'relative',
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
    marginTop: 8,
  },
  replyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#fff',
  },
  inputWrapper: {
    paddingBottom: 16,
  },
  replyToBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
  },
  cancelReply: {
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  quoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#FFF5E6',
    marginRight: 8,
  },
  quoteText: {
    fontSize: 12,
    color: '#FFB224',
    marginLeft: 4,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  deleteButton: {
    backgroundColor: '#FFF1F0',
  },
  shareText: {
    fontSize: 12,
    color: '#FFB224',
    marginTop: 8,
  },
  deleteText: {
    fontSize: 12,
    color: '#FF4D4F',
    marginTop: 8,
  },
  repliesContainer: {
    flex: 1,
  },
  moreButton: {
    padding: 8,
    marginLeft: 'auto',
  },
});
