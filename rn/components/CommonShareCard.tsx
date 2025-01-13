import React, {useEffect, useRef} from 'react';
import {View, Image, TouchableOpacity, Platform, Share} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {Modal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {commonStyles, transformStyles} from '@utils/index';
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot';

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
    avatar: string;
    username: string;
    location: string;
  };
  visible: boolean;
  onDismiss: () => void;
  selected?: boolean;
  onToggleSelect?: () => void;
  cardContentText?: string;
};

const CommonShareCard: React.FC<ShareCardProps> = ({
  type,
  title,
  description,
  imageUrl,
  metadata,
  visible,
  onDismiss,
  selected,
  onToggleSelect,
  cardContentText,
}) => {
  const navigation = useNavigation();
  const viewShotRef = useRef();

  useEffect(() => {
    if (visible) {
      handleShare();
    }
  }, [visible]);

  const handleShare = async () => {
    try {
      // const uri = await viewShotRef.current?.capture();
      // const filePath = `${RNFS.CachesDirectoryPath}/share_card.png`;
      // await RNFS.copyFile(uri, filePath);
      // await Share.share({
      //   url: Platform.OS === 'ios' ? `file://${filePath}` : filePath,
      // });
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  const renderUserInfo = () => {
    return (
      <View style={styles.userInfoContainer}>
        <View style={styles.userBasicInfo}>
          <Image source={{uri: metadata?.avatar}} style={styles.avatar} />
          <BaseText style={styles.username}>{metadata?.username}</BaseText>
        </View>
        <View style={styles.locationInfo}>
          <FontAwesome
            style={commonStyles.icon}
            name="location-dot"
            size={14}
            color="#666"
            iconStyle="solid"
          />
          <BaseText style={styles.locationText}>{metadata?.location}</BaseText>
        </View>
      </View>
    );
  };

  const renderDivider = () => (
    <View style={styles.dividerContainer}>
      <View style={styles.dot} />
      <View style={styles.line} />
      <View style={styles.dot} />
    </View>
  );

  const renderAppInfo = () => (
    <View style={styles.appInfoContainer}>
      <View style={styles.appTextInfo}>
        <BaseText style={styles.appName}>Spiritualife</BaseText>
        <BaseText style={styles.appDesc}>帮助你的灵命成长的助手</BaseText>
        <BaseText style={styles.scanText}>扫码加入</BaseText>
      </View>
      <Image
        source={require('@assets/images/common/qrcode.png')}
        style={styles.qrCode}
      />
    </View>
  );

  const renderDescription = () => (
    <View style={styles.contentContainer}>
      <BaseText style={styles.description}>{description}</BaseText>
    </View>
  );

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}>
      <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
            <FontAwesome
              name="xmark"
              size={25}
              color="#666"
              iconStyle="solid"
            />
          </TouchableOpacity>

          <View style={styles.cardContent}>
            {imageUrl && (
              <View style={styles.imageContainer}>
                <Image source={{uri: imageUrl}} style={styles.image} />
                <LinearGradient
                  colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
                  style={styles.imageGradient}
                />
              </View>
            )}
            <BaseText style={styles.cardContentText}>
              {cardContentText?.split('\\n').join('\n')}
            </BaseText>
          </View>
          {renderDescription()}
          {renderUserInfo()}
          {renderDivider()}
          {renderAppInfo()}
        </View>
      </ViewShot>
    </Modal>
  );
};

const styles = transformStyles({
  modalContainer: {
    // margin: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: 360,
    height: 574,
    marginHorizontal: 15,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: 'relative',
    right: 10,
    top: 5,
    // zIndex: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardContent: {
    backgroundColor: '#fff',
    width: 320,
    height: 265,
    marginHorizontal: 20,
    padding: 16,
  },
  imageContainer: {
    position: 'absolute',
    // top: 48,
    width: 320,
    height: 265,
    // marginHorizontal: 20,
    zIndex: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 90,
    overflow: 'hidden',
  },
  cardContentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    // color: '#fff',
  },
  description: {
    fontSize: 14,
    // color: '#fff',
    lineHeight: 20,
    // marginBottom: 16,
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
    // color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  metadataContainer: {
    marginBottom: 16,
  },
  metadataText: {
    fontSize: 13,
    // color: '#fff',
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
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userBasicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    color: '#333',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B8E58',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#3B8E58',
    marginHorizontal: 8,
  },
  appInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  appTextInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  scanText: {
    fontSize: 12,
    color: '#999',
  },
  qrCode: {
    width: 80,
    height: 80,
    marginLeft: 16,
  },
});

export default CommonShareCard;
