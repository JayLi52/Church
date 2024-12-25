import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';
import {transformStyles} from '@utils/index';
import Slider from '@react-native-community/slider';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

const coverUrl =
  'http://gips3.baidu.com/it/u=764883555,2569275522&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280';

interface Lyric {
  id: number;
  text: string;
  time: number; // 时间戳（秒）
}

const lyrics: Lyric[] = [
  {id: 1, text: '亚伯拉罕的后裔，大卫的子孙、耶稣基督的家谱。', time: 0},
  {id: 2, text: '亚伯拉罕生以撒，以撒生雅各，雅各生犹大和他的弟兄。', time: 10},
  {
    id: 3,
    text: '犹大从他玛氏生法勒斯和谢拉。法勒斯生希斯仑，希斯仑生亚兰。',
    time: 20,
  },
  {id: 4, text: '亚兰生亚米拿达，亚米拿达生拿顺，拿顺生撒门。', time: 30},
  {
    id: 5,
    text: '撒门从喇合氏生波阿斯，波阿斯从路得氏生俄备得，俄备得生耶西。',
    time: 40,
  },
  {id: 6, text: '耶西生大卫王。大卫从乌利亚的妻子生所罗门。', time: 50},
  {id: 7, text: '所罗门生罗波安，罗波安生亚比雅，亚比雅生亚撒。', time: 60},
  {id: 8, text: '亚撒生约沙法，约沙法生约兰，约兰生乌西雅。', time: 70},
  {id: 9, text: '乌西雅生约坦，约坦生亚哈斯，亚哈斯生希西家。', time: 80},
  {id: 10, text: '希西家生玛拿西，玛拿西生亚们，亚们生约西亚。', time: 90},
  {
    id: 11,
    text: '百姓被迁到巴比伦的时候，约西亚生耶哥尼雅和他的弟兄。',
    time: 100,
  },
  {
    id: 12,
    text: '迁到巴比伦之后，耶哥尼雅生撒拉铁，撒拉铁生所罗巴伯。',
    time: 110,
  },
  {
    id: 13,
    text: '所罗巴伯生亚比玉，亚比玉生以利亚敬，以利亚敬生亚所。',
    time: 120,
  },
  {id: 14, text: '亚所生撒督，撒督生亚金，亚金生以律。', time: 130},
  {id: 15, text: '以律生以利亚撒，以利亚撒生马但，马但生雅各。', time: 140},
  {
    id: 16,
    text: '雅各生约瑟，就是马利亚的丈夫。那称为基督的耶稣是从马利亚生的。',
    time: 150,
  },
  {id: 17, text: '这样，从亚伯拉罕到大卫共有十四代。', time: 160},
  {id: 18, text: '从大卫到迁至巴比伦的时候也有十四代。', time: 170},
  {id: 19, text: '从迁至巴比伦的时候到基督又有十四代。', time: 180},
  {
    id: 20,
    text: '耶稣基督降生的事记在下面：他母亲马利亚已经许配了约瑟。',
    time: 190,
  },
  {id: 21, text: '还没有迎娶，马利亚就从圣灵怀了孕。', time: 200},
  {
    id: 22,
    text: '她丈夫约瑟是个义人，不愿意明明地羞辱她，想要暗暗地把她休了。',
    time: 210,
  },
  {id: 23, text: '正思念这事的时候，有主的使者向他梦中显现，说：', time: 220},
  {
    id: 24,
    text: '大卫的子孙约瑟，不要怕，只管娶过你的妻子马利亚来。',
    time: 230,
  },
  {id: 25, text: '因她所怀的孕是从圣灵来的。', time: 240},
];

type PlaybackSpeed = 0.5 | 1.0 | 1.5 | 2.0;

const WINDOW_HEIGHT = Dimensions.get('window').height;
const LYRIC_LINE_HEIGHT = 60;
const VISIBLE_LINES = 8; // 可见歌词行数
const ITEM_OFFSET = 50;

function AudioPlayer(): React.JSX.Element {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 1465; // 24:25 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1.0);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout>();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const listeners = [
    {
      id: '1',
      avatar:
        'http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
    },
    {
      id: '2',
      avatar:
        'http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
    },
    {
      id: '3',
      avatar:
        'http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
    },
  ];

  const flatListRef = useRef<FlatList>(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!isManualScrolling) {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    },
    [isManualScrolling],
  );

  const handleManualScroll = useCallback(() => {
    setIsManualScrolling(true);

    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }

    manualScrollTimeoutRef.current = setTimeout(() => {
      setIsManualScrolling(false);
    }, 1000);
  }, []);

  const handleScrollEnd = useCallback(() => {
    if (isManualScrolling) {
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
      manualScrollTimeoutRef.current = setTimeout(() => {
        setIsManualScrolling(false);
        scrollToIndex(currentLyricIndex);
      }, 1000);
    }
  }, [currentLyricIndex, isManualScrolling, scrollToIndex]);

  useEffect(() => {
    return () => {
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, []);

  const handleLyricPress = useCallback(
    (time: number) => {
      setCurrentTime(time);
      if (!isPlaying) {
        setIsPlaying(true);
      }
    },
    [isPlaying],
  );

  const renderLyricItem = ({item, index}: {item: Lyric; index: number}) => (
    <TouchableOpacity
      onPress={() => handleLyricPress(item.time)}
      style={[
        styles.lyricLine,
        currentLyricIndex === index && styles.lyricLineActive,
      ]}>
      <View style={styles.lyricContent}>
        <View style={styles.lyricIndexContainer}>
          <BaseText
            style={[
              styles.lyricIndex,
              currentLyricIndex === index && styles.lyricIndexActive,
            ]}>
            {(index + 1).toString().padStart(2, '0')}
          </BaseText>
        </View>
        <BaseText
          style={[
            styles.lyricText,
            currentLyricIndex === index && styles.lyricTextActive,
          ]}>
          {item.text}
        </BaseText>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const findCurrentLyricIndex = (time: number) => {
      const index = lyrics.findIndex((lyric, i) => {
        const nextLyric = lyrics[i + 1];
        return time >= lyric.time && (!nextLyric || time < nextLyric.time);
      });
      return index === -1 ? 0 : index;
    };

    const newIndex = findCurrentLyricIndex(currentTime);
    if (newIndex !== currentLyricIndex) {
      setCurrentLyricIndex(newIndex);
      scrollToIndex(newIndex);
    }
  }, [currentTime, scrollToIndex]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 0.1 * playbackSpeed;
          return next >= totalDuration ? 0 : next;
        });
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, playbackSpeed, totalDuration]);

  const handleSpeedChange = (speed: PlaybackSpeed) => {
    setPlaybackSpeed(speed);
    // TODO: 这里可以添加实际改变音频播放速度的逻辑
  };

  return (
    <ImageBackground source={{uri: coverUrl}} style={styles.container}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={20}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <FontAwesome
                name="chevron-down"
                size={20}
                color="#fff"
                iconStyle="solid"
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <BaseText style={styles.bookTitle}>马太福音</BaseText>
              <BaseText style={styles.chapterTitle}>第一章</BaseText>
            </View>
          </View>
          <View style={styles.listenersContainer}>
            <View style={styles.avatarList}>
              {listeners.map((listener, index) => (
                <Image
                  key={listener.id}
                  source={{uri: listener.avatar}}
                  style={[styles.avatar, {marginLeft: index > 0 ? -10 : 0}]}
                />
              ))}
            </View>
            <BaseText style={styles.listenerCount}>9999人在听</BaseText>
          </View>
        </View>

        <View style={styles.coverContainer}>
          <Image source={{uri: coverUrl}} style={styles.coverImage} />
          <View style={styles.chapterControls}>
            <TouchableOpacity style={styles.chapterButton}>
              <FontAwesome
                name="chevron-left"
                size={20}
                color="#fff"
                iconStyle="solid"
              />
            </TouchableOpacity>
            <BaseText style={styles.currentChapter}>第一章</BaseText>
            <TouchableOpacity style={styles.chapterButton}>
              <FontAwesome
                name="chevron-right"
                size={20}
                color="#fff"
                iconStyle="solid"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lyricsContainer}>
          <FlatList
            ref={flatListRef}
            data={lyrics}
            renderItem={renderLyricItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            getItemLayout={(_, index) => ({
              length: LYRIC_LINE_HEIGHT,
              offset: LYRIC_LINE_HEIGHT * index,
              index,
            })}
            contentContainerStyle={styles.lyricsContentContainer}
            ListHeaderComponent={() => <View style={styles.lyricsSpacerTop} />}
            ListFooterComponent={() => (
              <View style={styles.lyricsSpacerBottom} />
            )}
            onScrollBeginDrag={handleManualScroll}
            onMomentumScrollEnd={handleScrollEnd}
            onScrollEndDrag={handleScrollEnd}
          />
          <LinearGradient
            style={styles.gradientTop}
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            pointerEvents="none"
          />
          <LinearGradient
            style={styles.gradientBottom}
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            pointerEvents="none"
          />
        </View>

        <View style={styles.progressContainer}>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={totalDuration}
            value={currentTime}
            onValueChange={setCurrentTime}
            minimumTrackTintColor="#FFB224"
            maximumTrackTintColor="#EEEEEE"
            thumbTintColor="#FFB224"
          />
          <View style={styles.timeContainer}>
            <BaseText style={styles.timeText}>
              {formatTime(currentTime)}
            </BaseText>
            <BaseText style={styles.timeText}>
              {formatTime(totalDuration)}
            </BaseText>
          </View>
        </View>

        <View style={styles.speedContainer}>
          {([0.5, 1.0, 1.5, 2.0] as PlaybackSpeed[]).map(speed => (
            <TouchableOpacity
              key={speed}
              style={[
                styles.speedButton,
                playbackSpeed === speed && styles.speedButtonActive,
              ]}
              onPress={() => handleSpeedChange(speed)}>
              <BaseText
                style={[
                  styles.speedText,
                  playbackSpeed === speed && styles.speedTextActive,
                ]}>
                {speed.toFixed(1)}x
              </BaseText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton}>
            <FontAwesome
              name="backward-step"
              size={24}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}>
            <FontAwesome
              name={isPlaying ? 'pause' : 'play'}
              size={32}
              color="#fff"
              iconStyle="solid"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <FontAwesome
              name="forward-step"
              size={24}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = transformStyles({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    marginLeft: 16,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  chapterTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  listenersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  listenerCount: {
    fontSize: 12,
    color: '#fff',
  },
  coverContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  coverImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  chapterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  chapterButton: {
    padding: 12,
  },
  currentChapter: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 16,
  },
  progressContainer: {
    marginBottom: 26,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
  },
  controlButton: {
    padding: 16,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFB224',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 32,
  },
  speedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
  },
  speedButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  speedButtonActive: {
    backgroundColor: '#FFB224',
  },
  speedText: {
    fontSize: 14,
    color: '#666',
  },
  speedTextActive: {
    color: '#fff',
  },
  lyricsContainer: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  lyricsSpacerTop: {
    height: ITEM_OFFSET,
  },
  lyricsSpacerBottom: {
    height: ITEM_OFFSET,
  },
  lyricLine: {
    height: LYRIC_LINE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 2,
    borderRadius: 8,
    activeOpacity: 0.7,
    paddingHorizontal: 16,
  },
  lyricContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  lyricIndexContainer: {
    width: 32,
    alignItems: 'flex-start',
  },
  lyricIndex: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'monospace',
  },
  lyricIndexActive: {
    color: '#4CAF50',
  },
  lyricText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    flex: 1,
    marginLeft: 8,
  },
  lyricTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  lyricsContentContainer: {
    paddingHorizontal: 16,
  },
});

export default AudioPlayer;
