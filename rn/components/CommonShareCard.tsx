import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {Modal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {transformStyles} from '@utils/index';

type ShareType =
  | 'quiz' // 答题分享
  | 'bookCompletion' // 学经完成
  | 'book' // 图书分享
  | 'bibleComment' // 圣经评论
  | 'comment' // 其他评论
  | 'verse' // 经文
  | 'profile' // 个人卡片
  | 'group'; // 小组卡片

type ShareCardProps = {
  type: ShareType;
  title: string;
  description: string;
  imageUrl?: string;
  onShare: () => void;
  metadata?: {
    author?: string;
    date?: string;
    progress?: number;
    verseReference?: string;
    groupName?: string;
    memberCount?: number;
    score?: number;
    commentCount?: number;
  };
  visible: boolean;
  onDismiss: () => void;
  selected?: boolean;
  onToggleSelect?: () => void;
};

const CommonShareCard: React.FC<ShareCardProps> = ({
  type,
  title,
  description,
  imageUrl,
  onShare,
  metadata,
  visible,
  onDismiss,
  selected,
  onToggleSelect,
}) => {
  const navigation = useNavigation();

  const renderIcon = () => {
    const iconProps = {
      size: 20,
      color: '#fff',
      iconStyle: 'solid' as const,
    };

    switch (type) {
      case 'quiz':
        return <FontAwesome name="circle-check" {...iconProps} />;
      case 'bookCompletion':
        return <FontAwesome name="book-open" {...iconProps} />;
      case 'bibleComment':
      case 'comment':
        return <FontAwesome name="message" {...iconProps} />;
      case 'verse':
        return <FontAwesome name="bookmark" {...iconProps} />;
      case 'profile':
        return <FontAwesome name="user" {...iconProps} />;
      case 'group':
        return <FontAwesome name="user-group" {...iconProps} />;
      default:
        return <FontAwesome name="share-nodes" {...iconProps} />;
    }
  };

  const renderMetadata = () => {
    if (!metadata) return null;

    return (
      <View style={styles.metadataContainer}>
        {metadata.author && (
          <BaseText style={styles.metadataText}>
            作者: {metadata.author}
          </BaseText>
        )}
        {metadata.date && (
          <BaseText style={styles.metadataText}>日期: {metadata.date}</BaseText>
        )}
        {metadata.progress !== undefined && (
          <View style={styles.progressBar}>
            <View style={[styles.progress, {width: `${metadata.progress}%`}]} />
          </View>
        )}
        {metadata.verseReference && (
          <BaseText style={styles.metadataText}>
            {metadata.verseReference}
          </BaseText>
        )}
      </View>
    );
  };

  const handleCardPress = () => {
    if (onToggleSelect) {
      onToggleSelect();
    } else {
      onDismiss();
      // @ts-ignore - 暂时忽略类型检查
      navigation.navigate('BookIntro');
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}>
      <View style={[styles.card, selected && styles.selectedCard]}>
        <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
          <FontAwesome name="xmark" size={20} color="#666" iconStyle="solid" />
        </TouchableOpacity>

        {imageUrl && (
          <View style={styles.imageContainer}>
            <Image source={{uri: imageUrl}} style={styles.image} />
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']}
              style={styles.imageGradient}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.contentContainer}
          onPress={handleCardPress}>
          <BaseText style={styles.title}>{title}</BaseText>
          <BaseText style={styles.description}>{description}</BaseText>
          {renderMetadata()}
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.shareButton, styles[`${type}Button`]]}
            onPress={onShare}>
            {renderIcon()}
            <BaseText style={styles.shareText}>分享</BaseText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = transformStyles({
  modalContainer: {
    margin: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9A27',
    padding: 12,
    borderRadius: 24,
    width: '100%',
  },
  shareText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  metadataContainer: {
    marginBottom: 16,
  },
  metadataText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginVertical: 4,
  },
  progress: {
    height: '100%',
    backgroundColor: '#FF9A27',
    borderRadius: 2,
  },
  quizButton: {
    backgroundColor: '#4CAF50',
  },
  bookCompletionButton: {
    backgroundColor: '#2196F3',
  },
  bibleCommentButton: {
    backgroundColor: '#9C27B0',
  },
  commentButton: {
    backgroundColor: '#FF9800',
  },
  verseButton: {
    backgroundColor: '#3F51B5',
  },
  profileButton: {
    backgroundColor: '#E91E63',
  },
  groupButton: {
    backgroundColor: '#009688',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#FF9A27',
  },
  bookButton: {
    backgroundColor: '#FF9A27',
  },
});

export default CommonShareCard;
