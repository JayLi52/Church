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
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';
import {transformStyles} from '@utils/index';
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
import {Verse} from './components/ImmersiveReading/Verse';
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

const genealogyData = [
  {
    id: 1,
    text: '亚伯拉罕的后裔，大卫的子孙、耶稣基督的家谱。',
    commentCount: 0,
  },
  {
    id: 2,
    text: '亚伯拉罕生以撒，以撒生雅各，雅各生犹大和他的弟兄。',
    commentCount: 99,
  },
  {
    id: 3,
    text: '犹大从他玛氏生法勒斯和谢拉。法勒斯生希斯仑，希斯仑生亚兰。',
    commentCount: 0,
  },
  {
    id: 4,
    text: '亚兰生亚米拿达，亚米拿达生拿顺，拿顺生撒门。',
    commentCount: 0,
  },
  {
    id: 5,
    text: '撒门从喇合氏生波阿斯，波阿斯从路得氏生俄备得，俄备得生耶西。',
    commentCount: 0,
  },
  {
    id: 6,
    text: '耶西生大卫王。大卫从乌利亚的妻子生所罗门。',
    commentCount: 89,
  },
  {
    id: 7,
    text: '所罗门生罗波安，罗波安生亚比雅，亚比雅生亚撒。',
    commentCount: 999,
  },
  {
    id: 8,
    text: '亚撒生约沙法，约沙法生约兰，约兰生乌西亚。',
    commentCount: 0,
  },
  {
    id: 9,
    text: '乌西亚生约坦，约坦生亚哈斯，亚哈希西家。',
    commentCount: 0,
  },
];

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
export type SelectedVerse = {
  id: number;
  text: string;
  position: {
    y: number;
    height: number;
  };
} | null;

// 添加高亮状态类型
export type HighlightedVerse = {
  id: number;
  color: string;
};

// 添加分享信息类型
type ShareInfo = {
  qrCode: string;
  backgroundImage: string;
  slogan: string;
  appName: string;
};

// 添加 tab 类型定义
export type TabType = 'chapter' | 'section';

function ImmersiveReading(): React.JSX.Element {
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
  const [selectedVerse, setSelectedVerse] = useState<SelectedVerse>(null);
  const [toolbarPosition, setToolbarPosition] =
    useState<ToolbarPosition>('bottom');
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  // 添加高亮状态管理
  const [highlightedVerses, setHighlightedVerses] = useState<
    HighlightedVerse[]
  >([]);
  const shareCardRef = useRef<View>(null);
  const [shareInfo, setShareInfo] = useState<ShareInfo | null>(null);
  const [loadingShare, setLoadingShare] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>('chapter');
  const [showBottomToolbar, setShowBottomToolbar] = useState(true);
  const [showUI, setShowUI] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toolbarButtons = [
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

  const toolbarOptions = [
    {icon: 'highlighter', label: '高亮', onPress: () => handleHighlight()},
    {icon: 'copy', label: '复制', onPress: () => handleCopy()},
    {
      icon: 'share',
      label: '分享',
      onPress: () => handleShare(),
      disabled: loadingShare,
    },
    {icon: 'quote-right', label: '引用', onPress: () => handleQuote()},
    {icon: 'language', label: '翻译', onPress: () => handleTranslate()},
  ];

  const handleVerseLongPress = (
    verse: (typeof genealogyData)[0],
    layout: {y: number; height: number},
  ) => {
    setShowBottomToolbar(false); // 隐藏底部工具栏
    const screenHeight = Dimensions.get('window').height;
    const positionFromTop = layout.y - scrollOffset;
    const spaceAbove = positionFromTop;
    const spaceBelow = screenHeight - (positionFromTop + layout.height);

    console.log('spaceBelow', spaceBelow);

    setToolbarPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
    setSelectedVerse({
      id: verse.id,
      text: verse.text,
      position: {
        y: layout.y,
        height: layout.height,
      },
    });
  };

  const handleHighlight = () => {
    if (selectedVerse) {
      setHighlightedVerses(prev => [
        ...prev.filter(v => v.id !== selectedVerse.id),
        {id: selectedVerse.id, color: 'rgba(76, 175, 80, 0.2)'}, // 使用绿色半透明背景
      ]);
    }
    setSelectedVerse(null);
  };

  const handleCopy = () => {
    if (selectedVerse) {
      Clipboard.setString(selectedVerse.text);
      Toast.show('复制成功', {
        duration: 1000,
      });
    }
    setSelectedVerse(null);
  };

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

  const handleShare = async () => {
    if (selectedVerse && !loadingShare) {
      try {
        if (!shareInfo) {
          await fetchShareInfo();
        }

        const uri = await ViewShot.captureRef(shareCardRef, {
          format: 'png',
          quality: 1,
        });

        const shareOptions = {
          title: '分享经文',
          message: selectedVerse.text,
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
      }
    }
  };

  const handleQuote = () => {
    // 实现引用功能
    setSelectedVerse(null);
  };

  const handleTranslate = () => {
    // 实现翻译功能
    setSelectedVerse(null);
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: 实现实际的书签保存逻辑
  };

  const handleVersionSelect = (version: BibleVersion) => {
    dispatch(setCurrentVersion(version));
    modalVersionRef.current?.close();
  };

  const renderToolbar = () => {
    console.log('selectedVerse', selectedVerse);
    if (!selectedVerse) return null;

    return (
      <>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setSelectedVerse(null)}
        />

        <View
          style={[
            styles.verseToolbar,
            toolbarPosition === 'top'
              ? {bottom: '150%', marginBottom: 8}
              : {top: '150%', marginTop: 8},
          ]}>
          {toolbarOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.toolbarButton,
                option.disabled && styles.toolbarButtonDisabled,
              ]}
              onPress={option.onPress}
              disabled={option.disabled}>
              <FontAwesome
                name={option.icon}
                size={20}
                color="#fff"
                iconStyle="solid"
              />
              <BaseText style={styles.toolbarButtonText}>
                {option.label}
              </BaseText>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

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
        verse={selectedVerse?.text || ''}
        reference={`马太福音 1:${selectedVerse?.id || 1}`}
        loading={loadingShare}
        shareInfo={shareInfo || undefined}
      />
    </ViewShot>
  );

  const handleOverlayPress = () => {
    setSelectedVerse(null);
    setShowBottomToolbar(true); // 显示底部工具栏
  };

  const handleContentPress = () => {
    // setShowUI(prev => !prev);
    setSelectedVerse(null); // 同时关闭段落工具栏
  };

  const handleCoverPress = () => {
    dispatch(setShowPlayer(true));
    navigation.navigate('BookManageNavigator', {
      screen: 'AudioPlayer',
    });
  };

  useEffect(() => {
    if (showUI) {
      setTimeout(() => {
        // setShowUI(false);
      }, 10000);
    }
  }, [showUI]);

  return (
    <View style={[styles.container, {backgroundColor}]}>
      {showUI && (
        <View style={[styles.header, {backgroundColor: colors.header}]}>
          {renderHeader()}
        </View>
      )}

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

          {genealogyData.map((item, index) => {
            const isHighlighted = highlightedVerses.find(v => v.id === item.id);

            return (
              <Verse
                item={item}
                index={index}
                isHighlighted={isHighlighted}
                colors={colors}
                handleVerseLongPress={handleVerseLongPress}
                renderToolbar={renderToolbar}
                selectedVerse={selectedVerse}
              />
            );
          })}

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
      {renderToolbar()}
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

      <View style={styles.hiddenShareCard}>
        {selectedVerse && renderShareCard()}
      </View>

      {selectedVerse && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleOverlayPress}
        />
      )}

      {showUI && showBottomToolbar && (
        <BottomToolbar buttons={toolbarOptions} />
      )}

      {showPlayer && (
        <FloatingPlayer
          onCoverPress={handleCoverPress}
          coverUrl="http://example.com/cover.jpg"
          title="马太福音第一章"
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
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  toolbarButton: {
    alignItems: 'center',
  },
  toolbarButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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

  verseToolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'space-around',
    zIndex: 1000,
  },
  verseToolbarButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  verseToolbarButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
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
  toolbarButtonDisabled: {
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 64,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
    width: 390,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});

export default ImmersiveReading;
