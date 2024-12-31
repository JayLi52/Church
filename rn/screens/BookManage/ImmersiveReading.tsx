import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Share,
  Text,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';
import {commonStyles, transformStyles} from '@utils/index';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import Slider from '@react-native-community/slider';
import Toast from 'react-native-root-toast';
import ViewShot from 'react-native-view-shot';
import RNShare from 'react-native-share';
import ShareCard from './components/ImmersiveReading/ShareCard';
import {
  renderBgColorMenu,
  renderBookmarkMenu,
  renderBrightnessControl,
  renderChapterModal,
  renderFontMenu,
  renderSearchResults,
  renderVersionModal,
} from './components/ImmersiveReading/Modal';
import {BottomToolbar} from './components/ImmersiveReading/BottomToolbar';
import {Header} from './components/ImmersiveReading/Header';
import {Readers} from './components/ImmersiveReading/Readers';
import {SearchBar} from './components/ImmersiveReading/SearchBar';
import {Verse, VerseItem} from './components/ImmersiveReading/Verse';
import {FloatingPlayer} from './components/ImmersiveReading/FloatingPlayer';
import {RootState} from '@store/store';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCurrentVersion,
  setIsPlaying,
  setShowPlayer,
  togglePlayer,
  setCurrentLanguage,
} from '@store/slices/bibleSlice';
import type {BibleVersion} from '@store/slices/bibleSlice';
import {VerseToolbar} from './components/ImmersiveReading/VerseToolbar';
import {
  QuoteModal,
  QuoteOption,
} from './components/ImmersiveReading/QuoteModal';
import {ShareModal} from './components/ImmersiveReading/ShareModal';
import {setVerse} from '@store/slices/bookManageSlice';
import {CARD_STATUS_CONFIG} from '@screens/Lingxiu/constants';
import {hideTabBar} from '@store/tabSlice';
import {hideStatusBar} from '@store/statusBarSlice';
import mockData from '../../mock/genealogyData.json';
import CountDown from './components/ImmersiveReading/CountDown';

const readers = [
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

// 定义主题类型
type Theme = 'light' | 'dark';

// 创建主题上下文
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

// 定义主题颜色
const themes = {
  light: {
    background: '#fff',
    text: '#333',
    border: '#EEEEEE',
    header: '#F6F6F6',
    icon: '#999',
    verseNumber: '#3B8E58',
  },
  dark: {
    background: '#1A1A1A',
    text: '#fff',
    border: '#333',
    header: '#2C2C2C',
    icon: '#666',
    verseNumber: '#4CAF50',
  },
};

// 添加新的类型定义
type ToolbarPosition = 'top' | 'bottom';

// 添加分享信息类型
type ShareInfo = {
  qrCode: string;
  backgroundImage: string;
  slogan: string;
  appName: string;
};

// 添加 tab 类型定义
export type TabType = 'chapter' | 'section';

function ImmersiveReading({route}: {route: any}): React.JSX.Element {
  const {cardStatus, cardData} = route.params || {};

  // 添加类型断言
  const status = cardStatus as keyof typeof CARD_STATUS_CONFIG;

  const [genealogyData, setGenealogyData] = useState(mockData.verses);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {currentVersion, versions, isPlaying, showPlayer, currentLanguage} =
    useSelector((state: RootState) => state.bible);
  const [theme, setTheme] = useState<Theme>('light');
  const colors = themes[theme];
  const [fontSize, setFontSize] = useState(16);
  const [brightness, setBrightness] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const modalFontRef = useRef<CustomModalRef>(null);
  const modalBrightRef = useRef<CustomModalRef>(null);
  const modalBookmarkRef = useRef<CustomModalRef>(null);
  const modalSearchRef = useRef<CustomModalRef>(null);
  const modalBgColorRef = useRef<CustomModalRef>(null);
  const [currentChapter, setCurrentChapter] = useState(1);
  const modalVersionRef = useRef<CustomModalRef>(null);
  const modalChapterRef = useRef<CustomModalRef>(null);
  const [currentSection, setCurrentSection] = useState(1);
  const sections = Array.from({length: 20}, (_, i) => i + 1); // 假设每章有20节

  const [toolbarPosition, setToolbarPosition] =
    useState<ToolbarPosition>('bottom');
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const shareCardRef = useRef<View>(null);
  const [shareInfo, setShareInfo] = useState<ShareInfo | null>(null);
  const [loadingShare, setLoadingShare] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>('chapter');
  const [showBottomToolbar, setShowBottomToolbar] = useState(true);
  const [showUI, setShowUI] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [selectedVerses, setSelectedVerses] = useState<VerseItem | null>(null);

  const modalQuoteRef = useRef<CustomModalRef>(null);
  const modalCommentRef = useRef<CustomModalRef>(null);

  const [showCountdown, setShowCountdown] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const bottomToolbarButtons = [
    {
      icon: 'font',
      label: '字体',
      onPress: () => modalFontRef.current?.open(),
    },
    {
      icon: 'sun',
      label: '亮度',
      onPress: () => modalBrightRef.current?.open(),
    },
    {
      icon: 'magnifying-glass',
      label: '搜索',
      onPress: () => modalSearchRef.current?.open(),
    },
    {
      icon: 'bookmark',
      label: '书签',
      onPress: () => modalBookmarkRef.current?.open(),
    },
    {
      icon: 'palette',
      label: '背景',
      onPress: () => modalBgColorRef.current?.open(),
    },
  ];

  const handleHighlight = () => {
    setGenealogyData(prev =>
      prev.map(item =>
        selectedVerses?.id === item.id
          ? {...item, isHighlighted: !item.isHighlighted}
          : item,
      ),
    );
    setSelectedVerses(null);
    setShowBottomToolbar(true);
  };

  const handleCopy = () => {
    console.log('handleCopy');
    const textToCopy = selectedVerses?.text || '';
    Clipboard.setString(textToCopy);
    Toast.show('复制成功', {
      duration: Toast.durations.SHORT,
    });
    setSelectedVerses(null);
    setShowBottomToolbar(true);
  };

  const handleShare = async () => {
    if (!selectedVerses || loadingShare) return;

    try {
      setLoadingShare(true);
      if (!shareInfo) {
        await fetchShareInfo();
      }

      const uri = await ViewShot.captureRef(shareCardRef, {
        format: 'png',
        quality: 1,
      });

      const shareOptions = {
        title: '分享经文',
        message: selectedVerses.text,
        url: uri,
        social: RNShare.Social.INSTAGRAM,
        failOnCancel: false,
      };

      await RNShare.open(shareOptions);
    } catch (error) {
      console.error('分享失败:', error);
      Toast.show('分享失败，请重试', {
        duration: Toast.durations.SHORT,
      });
    } finally {
      setLoadingShare(false);
      setSelectedVerses(null);
      setShowBottomToolbar(true);
    }
  };

  const handleQuote = () => {
    console.log('handleQuote');
    modalQuoteRef.current?.open();
    setGenealogyData(prev =>
      prev.map(item =>
        selectedVerses?.id === item.id ? {...item, isQuoting: true} : item,
      ),
    );
    // 引用情况比较特殊，不能重置selectedVerses（暂时）
  };

  const handleQuoteSelect = (option: QuoteOption) => {
    if (option.id === '1') {
      navigation.navigate('CreateTopic', {
        verse: selectedVerses,
      });
    } else if (option.id === '2') {
      navigation.navigate('CreateExercise', {
        verse: selectedVerses,
      });
    }

    setGenealogyData(prev =>
      prev.map(item =>
        item.id === selectedVerses?.id ? {...item, isQuoting: false} : item,
      ),
    );
    setShowBottomToolbar(true);
  };

  const handleQuoteClose = () => {
    setGenealogyData(prev =>
      prev.map(item =>
        item.id === selectedVerses?.id ? {...item, isQuoting: false} : item,
      ),
    );
    setShowBottomToolbar(true);
  };

  const handleTranslate = () => {
    setGenealogyData(prev =>
      prev.map(item =>
        selectedVerses?.id === item.id
          ? {...item, isTranslated: !item.isTranslated}
          : item,
      ),
    );
    setSelectedVerses(null);
    setShowBottomToolbar(true);
  };

  const verseToolbarOptions = [
    {
      icon: 'highlighter',
      label: selectedVerses?.isHighlighted ? '取消高亮' : '高亮',
      onPress: handleHighlight,
    },
    {
      icon: 'language',
      label: selectedVerses?.isTranslated ? '隐藏翻译' : '显示翻译',
      onPress: handleTranslate,
    },
    {
      icon: 'copy',
      label: '复制',
      onPress: handleCopy,
    },
    {
      icon: 'share',
      label: '分享',
      onPress: handleShare,
      disabled: loadingShare,
    },
    {
      icon: 'quote-right',
      label: '引用',
      onPress: handleQuote,
    },
  ];

  const fetchShareInfo = async () => {
    try {
      setLoadingShare(true);
      // TODO: 替换为实际的 API 调用
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      setShareInfo(data);
    } catch (error) {
      console.error('获取分享信息失败:', error);
      Toast.show('获取分享信息失败，请重试', {
        duration: Toast.durations.SHORT,
      });
    } finally {
      setLoadingShare(false);
    }
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: 实现实际的书签保存逻辑
  };

  const handleVersionSelect = (version: BibleVersion) => {
    dispatch(setCurrentVersion(version));
    modalVersionRef.current?.close();
  };

  // const renderToolbar = () => {
  //   if (!selectedVerses) return null;

  //   return (
  //     <>
  //       <TouchableOpacity
  //         style={styles.overlay}
  //         activeOpacity={1}
  //         onPress={() => {}}
  //       />
  //       <VerseToolbar
  //         position={toolbarPosition}
  //         options={verseToolbarOptions}
  //       />
  //     </>
  //   );
  // };

  const renderSearchBar = () => (
    <SearchBar
      showSearch={showSearch}
      searchText={searchText}
      setSearchText={setSearchText}
      setShowSearch={setShowSearch}
    />
  );

  const renderReaders = () => <Readers readers={readers} />;

  const renderHeader = () => (
    <Header
      navigation={navigation}
      colors={colors}
      modalVersionRef={modalVersionRef}
      modalChapterRef={modalChapterRef}
      isBookmarked={isBookmarked}
      onToggleBookmark={handleToggleBookmark}
      bookTitle="马太福音"
      currentChapter={currentChapter}
      currentVersion={currentVersion.shortName}
    />
  );

  const chapters = Array.from({length: 28}, (_, i) => i + 1); // 假设有28章

  const renderShareCard = () => (
    <ViewShot ref={shareCardRef} options={{format: 'png', quality: 1}}>
      <ShareCard
        verse={selectedVerses?.text || ''}
        reference={`马太福音 1:${selectedVerses?.id || 1}`}
        loading={loadingShare}
        shareInfo={shareInfo || undefined}
      />
    </ViewShot>
  );

  // const handleOverlayPress = () => {
  //   setSelectedVerses(null);
  //   setShowBottomToolbar(true); // 显示底部工具栏
  // };

  const handleContentPress = () => {
    setShowUI(prev => !prev);
    setSelectedVerses(null); // 同时关闭段落工具栏
  };

  const handleCoverPress = () => {
    dispatch(setShowPlayer(true));
    navigation.navigate('BookManageNavigator', {
      screen: 'AudioPlayer',
    });
  };

  const handleShareModalClose = () => {
    setSelectedVerses(null);
    setShowBottomToolbar(true);
  };

  useEffect(() => {
    if (showUI) {
      setTimeout(() => {
        // setShowUI(false);
      }, 10000);
    }
  }, [showUI]);

  useEffect(() => {
    // console.log(123);
    // modalQuoteRef.current?.open();
    // modalCommentRef.current?.open();
    dispatch(hideTabBar());
    dispatch(hideStatusBar());
  }, []);

  const handleVerseLongPress = (
    verse: VerseItem,
    position: {y: number; height: number},
  ) => {
    setSelectedVerses(verse);
    setShowBottomToolbar(false);

    // 存储选中的经文到 Redux
    dispatch(
      setVerse({
        reference: `马太福音 1:${verse.id}`,
        text: verse.text,
      }),
    );

    const screenHeight = Dimensions.get('window').height;
    const positionFromTop = position.y - scrollOffset;
    const spaceBelow = screenHeight - (positionFromTop + position.height);
    setToolbarPosition(spaceBelow > positionFromTop ? 'bottom' : 'top');
  };

  const renderStatusInfo = () => {
    if (!cardStatus) return null;

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDayIndex = 3; // 假设当前是周四

    // 获取要显示的5天
    const visibleDays = weekDays.slice(
      Math.max(0, currentDayIndex - 2),
      Math.min(weekDays.length, currentDayIndex + 3),
    );

    return (
      <View style={styles.statusContainer}>
        <View style={styles.planProgress}>
          <BaseText style={styles.dayCount}>第 99 天</BaseText>
          <View style={styles.weekDaysContainer}>
            {visibleDays.map((day, index) => (
              <View
                key={day}
                style={[
                  styles.dayItem,
                  index === 2 && styles.activeDayItem, // 中间项为当前日期
                ]}>
                <BaseText
                  style={[styles.dayText, index === 2 && styles.activeDayText]}>
                  {day}
                </BaseText>
                <BaseText
                  style={[
                    styles.dateText,
                    index === 2 && styles.activeDateText,
                  ]}>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </BaseText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.completionInfo}>
          <View style={styles.infoItem}>
            <FontAwesome
              name="clock"
              size={16}
              color="#52C41A"
              style={styles.infoIcon}
              iconStyle="solid"
            />
            <BaseText style={styles.infoText}>{cardData.date}</BaseText>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome
              name="hourglass"
              size={16}
              color="#52C41A"
              style={styles.infoIcon}
              iconStyle="solid"
            />
            <BaseText style={styles.infoText}>{cardData.duration}</BaseText>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome
              name="location-dot"
              size={16}
              color="#52C41A"
              style={styles.infoIcon}
              iconStyle="solid"
            />
            <BaseText style={styles.infoText}>{cardData.location}</BaseText>
          </View>
        </View>
      </View>
    );
  };

  const renderStatusInfoHeader = () => (
    <View style={[styles.header, {backgroundColor: colors.header}]}>
      <Header
        type="plan"
        navigation={navigation}
        colors={colors}
        planTitle="180天读经计划"
        modalVersionRef={modalVersionRef}
        currentVersion={currentVersion.shortName}
        onPlanPress={() => {
          // 处理计划点击
        }}
      />
    </View>
  );

  const renderTimingButton = () => {
    if (cardStatus !== 'pending') return null;

    return (
      <View style={styles.timingContainer}>
        <View style={styles.timingContent}>
          <Text style={styles.timingText}>23: 59: 34</Text>
          <TouchableOpacity style={styles.timingButton}>
            <FontAwesome
              name="rotate-right"
              size={20}
              color="#333"
              style={commonStyles.icon}
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleCountdownFinish = () => {
    setShowCountdown(false);
    // 可以在这里添加其他逻辑，比如更新计划状态等
    Toast.show('学习完成！', {
      duration: Toast.durations.SHORT,
    });
    navigation.goBack();
  };

  const handleCountdownTick = (remainingTime: number) => {
    // 可以在这里处理每秒的回调，比如更新状态、记录时间等
    // console.log('剩余时间:', remainingTime);
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.headerContainer}>
        <View style={[styles.header, {backgroundColor: colors.header}]}>
          {!cardStatus && renderHeader()}
          {cardStatus && renderStatusInfoHeader()}
        </View>
        {renderStatusInfo()}
      </View>
      {renderTimingButton()}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.contentContainer}
        onPress={handleContentPress}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={event => {
            setScrollOffset(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}>
          <View style={styles.titleContainer}>
            <BaseText style={[styles.title, {color: colors.text}]}>
              最后的问候
            </BaseText>
          </View>

          {genealogyData.map((item, index) => (
            <Verse
              key={item.id}
              item={item}
              index={index}
              colors={colors}
              toolbarPosition={toolbarPosition}
              verseToolbarOptions={verseToolbarOptions}
              handleVerseLongPress={(verse, position) => {
                handleVerseLongPress(verse, position);
              }}
              selectedVerses={selectedVerses}
            />
          ))}

          {renderReaders()}
        </ScrollView>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.floatingButton, {backgroundColor: colors.background}]}
        onPress={() =>
          navigation.navigate('BookManageNavigator', {
            screen: 'AudioPlayer',
          })
        }>
        <FontAwesome
          name="headphones"
          size={20}
          color="#FFB224"
          iconStyle="solid"
        />
      </TouchableOpacity>

      {renderSearchBar()}
      {/* {renderToolbar()} */}
      {renderFontMenu(modalFontRef, setFontSize, fontSize)}
      {renderBrightnessControl(modalBrightRef, brightness, setBrightness)}
      {renderBookmarkMenu(modalBookmarkRef)}
      {renderSearchResults(
        modalSearchRef,
        searchText,
        setSearchText,
        genealogyData,
      )}
      {renderBgColorMenu(modalBgColorRef, setBackgroundColor, backgroundColor)}
      {renderVersionModal(
        modalVersionRef,
        versions,
        currentVersion.shortName,
        currentLanguage,
        version => dispatch(setCurrentVersion(version)),
        language => dispatch(setCurrentLanguage(language)),
      )}
      {renderChapterModal(
        modalChapterRef,
        currentTab,
        setCurrentTab,
        chapters,
        sections,
        currentChapter,
        setCurrentChapter,
        currentSection,
        setCurrentSection,
      )}
      <QuoteModal
        modalRef={modalQuoteRef}
        onSelect={handleQuoteSelect}
        onClose={handleQuoteClose}
      />

      <View style={styles.hiddenShareCard}>
        {selectedVerses && renderShareCard()}
      </View>

      {/* {selectedVerses && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleOverlayPress}
        />
      )} */}

      {showUI && showBottomToolbar && (
        <BottomToolbar buttons={bottomToolbarButtons} />
      )}

      {showPlayer && (
        <FloatingPlayer
          onCoverPress={handleCoverPress}
          coverUrl="http://example.com/cover.jpg"
          title="马太福音第一章"
        />
      )}

      <ShareModal
        modalRef={modalCommentRef}
        onClose={() => {
          console.log('onClose');
        }}
        onShare={() => {
          console.log('onShare');
        }}
      />

      {showCountdown && (
        <CountDown
          initialTime={24 * 60} // 24分钟最小阅读时长
          onFinish={handleCountdownFinish}
          onTick={remainingTime => {
            // console.log('剩余时间:', remainingTime);
          }}
        />
      )}
    </View>
  );
}

const styles = transformStyles({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  icon: {
    marginHorizontal: 4,
  },
  commentCount: {
    fontSize: 12,
    color: '#999',
  },
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 200,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    zIndex: 1,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  hiddenShareCard: {
    position: 'absolute',
    top: -9999,
    left: -9999,
  },

  contentContainer: {
    flex: 1,
    marginBottom: 64,
  },
  headerContainer: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 8,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
    width: '100%',
  },
  statusContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#fff',
  },
  planProgress: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 8,
  },
  dayCount: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 12,
    width: 100,
    textAlign: 'center',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
    flex: 1,
  },
  dayItem: {
    alignItems: 'center',
    gap: 4,
  },
  activeDayItem: {
    backgroundColor: '#FFB224',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 12,
    color: '#666',
  },
  activeDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  activeDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completionInfo: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoIcon: {
    width: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#52C41A',
  },
  timingContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: 'center',
  },
  timingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    gap: 12,
  },
  timingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timingButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImmersiveReading;
