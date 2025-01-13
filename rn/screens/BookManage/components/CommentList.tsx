import React, {useEffect, useState, useRef} from 'react';
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
import {RootState} from '@store/store';
import {useSelector} from 'react-redux';
import {getImageUrl} from '@utils/imgs';
import CustomModal, {CustomModalRef} from '@components/CustomModal';

type CommentType = 'mine' | 'others';

type Comment = {
  id: string;
  type: CommentType;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  location: string;
  likes: number;
  replies?: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    content: string;
    date: string;
    location: string;
  }[];
};

type VerseRef = {
  reference: string;
  text: string;
  book?: string;
  chapter?: number;
  verse?: number;
};

type CommentListProps = {
  verse: VerseRef;
  comments: Comment[];
  onClose: () => void;
};

export const CommentList = () => {
  const navigation = useNavigation();
  const [comments, setComments] = useState<Comment[]>([]);
  const verse = useSelector((state: RootState) => state.bookManage.verse);
  const [selectedCommentId, setSelectedCommentId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'mine' | 'public'>('mine');
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<{id: string; name: string} | null>(
    null,
  );
  const modalRef = useRef<CustomModalRef>(null);

  const myComments: Comment[] = [
    {
      id: '1',
      type: 'mine',
      user: {
        name: '用户名称文本信息',
        avatar: getImageUrl(),
      },
      content:
        '批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息...',
      date: '24-01-22 14:23',
      location: '四川成都 9999KM',
      likes: 1234,
    },
    {
      id: '2',
      type: 'mine',
      user: {name: '用户名称文本信息', avatar: getImageUrl()},
      content:
        '批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息...',
      date: '24-01-22 14:23',
      location: '四川成都 9999KM',
      likes: 1234,
    },
    {
      id: '3',
      type: 'mine',
      user: {name: '用户名称文本信息', avatar: getImageUrl()},
      content:
        '批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息...',
      date: '24-01-22 14:23',
      location: '四川成都 9999KM',
      likes: 1234,
    },
    {
      id: '4',
      type: 'mine',
      user: {name: '用户名称文本信息', avatar: getImageUrl()},
      content:
        '批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息...',
      date: '24-01-22 14:23',
      location: '四川成都 9999KM',
      likes: 1234,
    },
  ];

  const publicComments: Comment[] = [
    {
      id: 'p1',
      type: 'others',
      user: {name: '其他用户A', avatar: getImageUrl()},
      content: '这是一条公有批注内容...',
      date: '24-01-22 15:30',
      location: '北京 8888KM',
      likes: 567,
    },
    {
      id: 'p2',
      type: 'others',
      user: {name: '其他用户B', avatar: getImageUrl()},
      content: '这也是一条公有批注内容...',
      date: '24-01-22 16:45',
      location: '上海 7777KM',
      likes: 890,
    },
  ];

  useEffect(() => {
    setComments(activeTab === 'mine' ? myComments : publicComments);
  }, [activeTab]);

  const handleMorePress = (commentId: string) => {
    setSelectedCommentId(commentId);
    modalRef.current?.open();
  };

  const handleActionPress = (action: 'share' | 'delete') => {
    if (action === 'share') {
      console.log('share comment:', selectedCommentId);
    } else {
      console.log('delete comment:', selectedCommentId);
    }
    modalRef.current?.close();
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    if (replyTo) {
      console.log('回复评论:', replyTo.id, newComment);
      setReplyTo(null);
    } else {
      console.log('发布评论:', newComment);
    }

    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
        <BaseText style={styles.title}>{verse.reference}</BaseText> */}
        <View style={styles.placeholder} />
      </View>

      <View style={styles.verseContainer}>
        <View style={styles.verseLine} />
        <View style={styles.verseContent}>
          <BaseText style={styles.verseReference}>
            {verse?.reference || '马太福音1:2-2'}
          </BaseText>
          <BaseText style={styles.verseText}>
            {verse?.text ||
              '亚伯拉罕生以撒，以撒生雅各，雅各生犹大和他的弟兄。'}
          </BaseText>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('mine')}>
          <BaseText
            style={activeTab === 'mine' ? styles.tabActive : styles.tab}>
            我的批注
          </BaseText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('public')}>
          <BaseText
            style={activeTab === 'public' ? styles.tabActive : styles.tab}>
            公有批注
          </BaseText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.commentList}>
        {comments.map(comment => (
          <View key={comment.id} style={styles.commentItem}>
            <TouchableOpacity
              key={`avatar-${comment.id}`}
              onPress={() =>
                navigation.navigate('UserProfile', {userId: comment.user.id})
              }>
              <Image
                source={{uri: comment.user.avatar}}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={`content-${comment.id}`}
              style={styles.commentContent}
              onPress={() =>
                navigation.navigate('BookManageNavigator', {
                  screen: 'CommentDetail',
                  params: {
                    comment,
                    verse,
                  },
                })
              }>
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
                <TouchableOpacity
                  style={styles.replyButton}
                  onPress={() => {
                    setReplyTo({id: comment.id, name: comment.user.name});
                  }}>
                  <FontAwesome
                    style={commonStyles.icon}
                    name="reply"
                    size={12}
                    color="#999"
                    iconStyle="solid"
                  />
                  <BaseText style={styles.replyText}>回复</BaseText>
                </TouchableOpacity>
                <View style={styles.likes}>
                  <FontAwesome
                    style={commonStyles.icon}
                    name="share"
                    size={12}
                    color="#999"
                    iconStyle="solid"
                  />
                  <BaseText style={styles.likesText}>{comment.likes}</BaseText>
                </View>
              </View>
              {comment.type === 'mine' && (
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={e => {
                    e.stopPropagation();
                    handleMorePress(comment.id);
                  }}>
                  <FontAwesome
                    name="ellipsis"
                    size={16}
                    color="#999"
                    iconStyle="solid"
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder={replyTo ? `回复 ${replyTo.name}` : '留下你的想法'}
            placeholderTextColor="#999"
            value={newComment}
            onChangeText={setNewComment}
            selectionColor="#FFB224"
            multiline
          />
          {replyTo && (
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
          )}
          <TouchableOpacity
            style={[
              styles.submitButton,
              !newComment.trim() && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmitComment}
            disabled={!newComment.trim()}>
            <BaseText
              style={[
                styles.submitText,
                !newComment.trim() && styles.submitTextDisabled,
              ]}>
              {replyTo ? '回复' : '发布'}
            </BaseText>
          </TouchableOpacity>
        </View>
      </View>

      <CustomModal
        ref={modalRef}
        slideDirection="bottom"
        modalContentWrapStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View style={styles.modalContent}>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleActionPress('delete')}>
              <View style={styles.iconCircle}>
                <FontAwesome
                  name="trash"
                  size={16}
                  color="#000000"
                  iconStyle="solid"
                />
              </View>
              <BaseText style={styles.modalButtonText}>删除</BaseText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleActionPress('share')}>
              <View style={styles.iconCircle}>
                <FontAwesome
                  name="share"
                  size={16}
                  color="#000000"
                  iconStyle="solid"
                />
              </View>
              <BaseText style={styles.modalButtonText}>分享</BaseText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => modalRef.current?.close()}>
            <BaseText style={styles.cancelText}>取消</BaseText>
          </TouchableOpacity>
        </View>
      </CustomModal>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 44,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  commentList: {
    flex: 1,
  },
  verseContainer: {
    padding: 16,
    backgroundColor: '#FFF5E6',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  verseLine: {
    width: 3,
    backgroundColor: '#FFB224',
    marginRight: 12,
    borderRadius: 1.5,
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
  tabs: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#fff',
  },
  tab: {
    fontSize: 14,
    color: '#999',
    marginRight: 24,
    paddingVertical: 4,
  },
  tabActive: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 24,
    paddingVertical: 4,
  },
  commentItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
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
    marginRight: 16,
  },
  locationText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
    textAlignVertical: 'center',
    maxHeight: 80,
    marginRight: 12,
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFB224',
  },
  submitButtonDisabled: {
    backgroundColor: '#F5F5F5',
  },
  submitText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  submitTextDisabled: {
    color: '#999',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  replyText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  cancelReply: {
    padding: 8,
    marginRight: 8,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 24,
    gap: 24,
  },
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  modalButtonText: {
    fontSize: 12,
    color: '#000000',
  },
  cancelButton: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#000000',
  },
});
