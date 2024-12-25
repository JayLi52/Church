import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';
import {transformStyles} from '@utils/index';
import LinearGradient from 'react-native-linear-gradient';
import {hideStatusBar, setTranslucent} from '@store/statusBarSlice';
import {useDispatch} from 'react-redux';
import {hideTabBar} from '@store/tabSlice';

function BookIntroScreen(): React.JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  dispatch(setTranslucent()); // 设置状态栏为透明
  dispatch(hideTabBar()); // 隐藏状态栏

  const [isLiked, setIsLiked] = useState(false); // 添加点赞状态

  return (
    <>
      <ImageBackground
        source={require('@assets/images/book/Home.png')}
        style={styles.imageBackground}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome
                name="book"
                size={18}
                color="#fff"
                iconStyle="solid"
              />
            </TouchableOpacity>
            <BaseText style={styles.headerTitle}>马太福音</BaseText>
          </View>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}>
            <FontAwesome
              name="xmark"
              size={22}
              color="#fff"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.likeContainer}>
          <BaseText style={styles.bookName}>马太福音</BaseText>
          <TouchableOpacity
            onPress={() => {
              setIsLiked(!isLiked);
              // 这里可以添加调用后端 API 的逻辑
              console.log('点赞状态:', !isLiked);
            }}>
            <FontAwesome
              name="heart"
              size={20}
              color={isLiked ? '#FF6B6B' : '#fff'}
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* 描述文本 */}
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <BaseText style={styles.description}>
            反映四福音书均记载了耶稣在世的事迹，马太福音是用了一个见证为出发点记录主上所作的事的特殊意思的角度去看他的生平与教导，为此缘故，本书将旧约的预言与耶稣的生平连贯起来，从而阐演了旧约与新约之间的桥梁。反映四福音书均记载了耶稣在世的事迹，马太福音是用了一个见证为出发点记录主上所作的事的特殊意思的角度去看他的生平与教导，为此缘故，本书将旧约的预言与耶稣的生平连贯起来，从而阐演了旧约与新约之间的桥梁。
            反映四福音书均记载了耶稣在世的事迹，马太福音是用了一个见证为出发点记录主上所作的事的特殊意思的角度去看他的生平与教导，为此缘故，本书将旧约的预言与耶稣的生平连贯起来，从而阐演了旧约与新约之间的桥梁。反映四福音书均记载了耶稣在世的事迹，马太福音是用了一个见证为出发点记录主上所作的事的特殊意思的角度去看他的生平与教导，为此缘故，本书将旧约的预言与耶稣的生平连贯起来，从而阐演了旧约与新约之间的桥梁。
          </BaseText>
        </View>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          locations={[0, 0.8]}
          style={styles.textGradient}
        />
      </View>

      {/* 底部互动数据 */}
      <View style={styles.interactionContainer}>
        <TouchableOpacity
          style={[styles.interactionBox, {backgroundColor: '#FF9A27'}]}
          onPress={() => {
            navigation.navigate('BookManageNavigator', {
              screen: 'ImmersiveReadingScreen',
            });
          }}>
          <FontAwesome
            name="book-open"
            size={20}
            color="#fff"
            iconStyle="solid"
          />
          <BaseText style={[styles.interactionCount, {color: '#fff'}]}>
            开始阅读
          </BaseText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.interactionBox}
          onPress={() => {
            console.log('分享按钮被点击');
            navigation.navigate('BookManageNavigator', {
              screen: 'ReadingListScreen',
            });
          }}>
          <FontAwesome
            name="share"
            size={20}
            color="#FF9A27"
            iconStyle="solid"
          />
          <BaseText style={styles.interactionCount}>{9999}</BaseText>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
    // height: 44 + STATUSBAR_HEIGHT,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  coverContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
    position: 'relative',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  interactionContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{translateX: -90}],
    width: 180,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    // shadowColor: '#000',
    elevation: 5,
    borderRadius: 24,
    height: 44,
  },
  interactionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    activeOpacity: 0.7,
    marginHorizontal: 4,
  },
  interactionCount: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  imageBackground: {
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
    overflow: 'hidden',
  },
  likeContainer: {
    position: 'absolute',
    width: '100%',
    // height: '100%',
    height: 76,
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 30,

    // left: 16,
  },
  bookName: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'left',
    marginRight: 16,
    display: 'flex',
  },
  textContainer: {
    position: 'relative',
  },
  textGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
});

export default BookIntroScreen;
