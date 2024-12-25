import React, {createContext, useContext, useState, useRef} from 'react';
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
import ShareCard from './components/ShareCard';

const genealogyData = [
  {id: 1, text: '亚伯拉罕的后裔，大卫的子孙、耶稣基督的家谱。'},
  {id: 2, text: '亚伯拉罕生以撒，以撒生雅各，雅各生犹大和他的弟兄。'},
  {id: 3, text: '犹大从他玛氏生法勒斯和谢拉。法勒斯生希斯仑，希斯仑生亚兰。'},
  {id: 4, text: '亚兰生亚米拿达，亚米拿达生拿顺，拿顺生撒门。'},
  {id: 5, text: '撒门从喇合氏生波阿斯，波阿斯从路得氏生俄备得，俄备得生耶西。'},
  {id: 6, text: '耶西生大卫王。大卫从乌利亚的妻子生所罗门。'},
  {id: 7, text: '所罗门生罗波安，罗波安生亚比雅，亚比雅生亚撒。'},
  {id: 8, text: '亚撒生约沙法，约沙法生约兰，约兰生乌西亚。'},
  {id: 9, text: '乌西亚生约坦，约坦生亚哈斯，亚哈希西家。'},
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
type SelectedVerse = {
  id: number;
  text: string;
  position: {
    y: number;
    height: number;
  };
} | null;

// 添加高亮状态类型
type HighlightedVerse = {
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
type TabType = 'chapter' | 'section';

function ImmersiveReading(): React.JSX.Element {
  const navigation = useNavigation();
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
  const [currentVersion, setCurrentVersion] = useState('现代标点和合本');
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
  const [showUI, setShowUI] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 底部工具栏按钮
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

  // 添加工具栏选项
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

  // 处理长按事件
  const handleVerseLongPress = (
    verse: (typeof genealogyData)[0],
    layout: {y: number; height: number},
  ) => {
    setShowBottomToolbar(false); // 隐藏底部工具栏
    const screenHeight = Dimensions.get('window').height;
    const positionFromTop = layout.y - scrollOffset;
    const spaceAbove = positionFromTop;
    const spaceBelow = screenHeight - (positionFromTop + layout.height);

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

  // 处理工具栏操作
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

  // 获取分享信息的函数
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

  // 修改分享处理函数
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

  // 渲染工具栏
  const renderToolbar = () => {
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

  const renderFontMenu = () => (
    <CustomModal
      ref={modalFontRef}
      modalContentWrapStyle={{
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <View style={styles.menuContainer}>
        <View style={styles.menuHeader}>
          <BaseText style={styles.menuTitle}>字体设置</BaseText>
          <TouchableOpacity onPress={() => modalFontRef.current?.close()}>
            <FontAwesome
              name="xmark"
              size={20}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.fontSizeControl}>
          <TouchableOpacity
            onPress={() => setFontSize(prev => Math.max(12, prev - 2))}>
            <BaseText style={styles.fontSizeText}>A-</BaseText>
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumValue={12}
            maximumValue={24}
            value={fontSize}
            onValueChange={setFontSize}
            minimumTrackTintColor="#FFB224"
            maximumTrackTintColor="#EEEEEE"
            thumbTintColor="#FFB224"
          />
          <TouchableOpacity
            onPress={() => setFontSize(prev => Math.min(24, prev + 2))}>
            <BaseText style={styles.fontSizeText}>A+</BaseText>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );

  const renderBrightnessControl = () => (
    <CustomModal
      ref={modalBrightRef}
      modalContentWrapStyle={{
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <View style={styles.menuContainer}>
        <View style={styles.menuHeader}>
          <BaseText style={styles.menuTitle}>亮度调节</BaseText>
          <TouchableOpacity onPress={() => modalBrightRef.current?.close()}>
            <FontAwesome
              name="xmark"
              size={20}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.brightnessControl}>
          <FontAwesome name="sun" size={20} color="#666" iconStyle="solid" />
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={1}
            value={brightness}
            onValueChange={setBrightness}
            minimumTrackTintColor="#FFB224"
            maximumTrackTintColor="#EEEEEE"
            thumbTintColor="#FFB224"
          />
        </View>
      </View>
    </CustomModal>
  );

  const renderSearchBar = () => (
    <View style={[styles.searchBar, !showSearch && styles.hidden]}>
      <TextInput
        style={styles.searchInput}
        placeholder="搜索内容"
        value={searchText}
        onChangeText={setSearchText}
        selectionColor={'#FFB224'}
      />
      <TouchableOpacity onPress={() => setShowSearch(false)}>
        <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
      </TouchableOpacity>
    </View>
  );

  const renderReaders = () => (
    <View style={styles.readersContainer}>
      <View style={styles.avatarList}>
        {readers.map((reader, index) => (
          <Image
            key={reader.id}
            source={{uri: reader.avatar}}
            style={[styles.avatar, {marginLeft: index > 0 ? -10 : 0}]}
          />
        ))}
      </View>
      <BaseText style={styles.readerCount}>9999人已阅读</BaseText>
    </View>
  );

  const renderBookmarkMenu = () => (
    <CustomModal
      ref={modalBookmarkRef}
      modalContentWrapStyle={{
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <View style={styles.menuContainer}>
        <View style={styles.menuHeader}>
          <BaseText style={styles.menuTitle}>书签列表</BaseText>
          <TouchableOpacity onPress={() => modalBookmarkRef.current?.close()}>
            <FontAwesome
              name="xmark"
              size={20}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.bookmarkList}>
          {[1, 2, 3].map(index => (
            <TouchableOpacity key={index} style={styles.bookmarkItem}>
              <BaseText style={styles.bookmarkTitle}>马太福音 第一章</BaseText>
              <BaseText style={styles.bookmarkVerse}>第 {index} 节</BaseText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </CustomModal>
  );

  const renderSearchResults = () => (
    <CustomModal
      ref={modalSearchRef}
      modalContentWrapStyle={{
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <View style={styles.searchContainer}>
        <View style={styles.menuHeader}>
          <BaseText style={styles.menuTitle}>搜索</BaseText>
          <TouchableOpacity onPress={() => modalSearchRef.current?.close()}>
            <FontAwesome
              name="xmark"
              size={20}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.modalSearchInput}
            placeholder="搜索内容"
            value={searchText}
            onChangeText={setSearchText}
            selectionColor={'#FFB224'}
          />
          <TouchableOpacity style={styles.searchButton}>
            <FontAwesome
              name="search"
              size={20}
              color="#fff"
              // iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.searchResults}>
          {genealogyData
            .filter(item => item.text.includes(searchText))
            .map((item, index) => (
              <TouchableOpacity key={item.id} style={styles.searchResultItem}>
                <BaseText style={styles.searchResultVerse}>
                  第 {index + 1} 节
                </BaseText>
                <BaseText style={styles.searchResultText}>{item.text}</BaseText>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </CustomModal>
  );

  const renderBgColorMenu = () => (
    <CustomModal
      ref={modalBgColorRef}
      modalContentWrapStyle={{
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <View style={styles.menuContainer}>
        <View style={styles.menuHeader}>
          <BaseText style={styles.menuTitle}>背景颜色</BaseText>
          <TouchableOpacity onPress={() => modalBgColorRef.current?.close()}>
            <FontAwesome
              name="xmark"
              size={20}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.colorOptions}>
          {['#fff', '#F4ECD8', '#E5E5E5', '#1A1A1A'].map(color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorOption, {backgroundColor: color}]}
              onPress={() => setBackgroundColor(color)}>
              {backgroundColor === color && (
                <FontAwesome
                  name="check"
                  size={16}
                  color="#FFB224"
                  iconStyle="solid"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </CustomModal>
  );

  const renderHeader = () => (
    <View style={[styles.header, {backgroundColor: colors.header}]}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            name="arrow-left"
            size={20}
            color={colors.text}
            iconStyle="solid"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.versionButton}
          onPress={() => modalVersionRef.current?.open()}>
          <BaseText style={[styles.headerTitle, {color: colors.text}]}>
            马太福音
          </BaseText>
          <View style={styles.versionTag}>
            <BaseText style={styles.versionText}>和</BaseText>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.chapterButton}
        onPress={() => modalChapterRef.current?.open()}>
        <BaseText style={styles.chapterText}>第一章</BaseText>
        <FontAwesome
          name="chevron-down"
          size={15}
          color={colors.text}
          iconStyle="solid"
        />
      </TouchableOpacity>
    </View>
  );

  const renderVersionModal = () => (
    <CustomModal ref={modalVersionRef}>
      <View style={styles.versionContainer}>
        <View style={styles.menuHeader}>
          <BaseText style={styles.menuTitle}>选择版本</BaseText>
          <TouchableOpacity onPress={() => modalVersionRef.current?.close()}>
            <FontAwesome
              name="xmark"
              size={20}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.versionList}>
          {versions.map(version => (
            <TouchableOpacity
              key={version.id}
              style={[
                styles.versionItem,
                currentVersion === version.name && styles.versionItemActive,
              ]}
              onPress={() => {
                setCurrentVersion(version.name);
                modalVersionRef.current?.close();
              }}>
              <BaseText
                style={[
                  styles.versionItemText,
                  currentVersion === version.name &&
                    styles.versionItemTextActive,
                ]}>
                {version.name}
              </BaseText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </CustomModal>
  );

  const renderChapterModal = () => {
    return (
      <CustomModal
        ref={modalChapterRef}
        modalContentWrapStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        <View style={styles.chapterContainer}>
          <View style={styles.chapterTabContainer}>
            <TouchableOpacity
              style={[
                styles.chapterTab,
                currentTab === 'chapter' && styles.chapterTabActive,
              ]}
              onPress={() => setCurrentTab('chapter')}>
              <BaseText
                style={[
                  styles.chapterTabText,
                  currentTab === 'chapter' && styles.chapterTabTextActive,
                ]}>
                章
              </BaseText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chapterTab,
                currentTab === 'section' && styles.chapterTabActive,
              ]}
              onPress={() => setCurrentTab('section')}>
              <BaseText
                style={[
                  styles.chapterTabText,
                  currentTab === 'section' && styles.chapterTabTextActive,
                ]}>
                节
              </BaseText>
            </TouchableOpacity>
          </View>

          <View style={styles.chapterContent}>
            <ScrollView style={styles.chapterList}>
              <View style={styles.chapterListContent}>
                {chapters.map(chapter => (
                  <TouchableOpacity
                    key={chapter}
                    style={[
                      styles.chapterItem,
                      currentChapter === chapter && styles.chapterItemActive,
                    ]}
                    onPress={() => setCurrentChapter(chapter)}>
                    <BaseText
                      style={[
                        styles.chapterItemText,
                        currentChapter === chapter &&
                          styles.chapterItemTextActive,
                      ]}>
                      {String(chapter).padStart(2, '0')}
                    </BaseText>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <ScrollView style={styles.sectionList}>
              <View style={styles.sectionListContent}>
                {sections.map(section => (
                  <TouchableOpacity
                    key={section}
                    style={[
                      styles.sectionItem,
                      currentSection === section && styles.sectionItemActive,
                    ]}
                    onPress={() => setCurrentSection(section)}>
                    <BaseText
                      style={[
                        styles.sectionItemText,
                        currentSection === section &&
                          styles.sectionItemTextActive,
                      ]}>
                      {String(section).padStart(2, '0')}
                    </BaseText>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.chapterFooter}>
            <TouchableOpacity
              style={styles.chapterFooterButton}
              onPress={() => modalChapterRef.current?.close()}>
              <FontAwesome
                name="xmark"
                size={20}
                color="#666"
                iconStyle="solid"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chapterFooterButton,
                styles.chapterFooterButtonPrimary,
              ]}
              onPress={() => {
                // 处理启用逻辑
                modalChapterRef.current?.close();
              }}>
              <FontAwesome
                name="check"
                size={20}
                color="#666"
                iconStyle="solid"
              />
              <BaseText style={styles.chapterFooterButtonText}>启用</BaseText>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
    );
  };

  const versions = [
    {id: '1', name: '现代标点和合本', shortName: '和'},
    {id: '2', name: '和合本2010（上帝版）', shortName: '和'},
    {id: '3', name: '和合本2010（神版）', shortName: '和'},
    {id: '4', name: '当代译本', shortName: '当'},
    {id: '5', name: '圣经新译本', shortName: '新'},
  ];

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
    setShowUI(prev => !prev);
    setSelectedVerse(null); // 同时关闭段落工具栏
  };

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
              <View
                key={item.id}
                style={[
                  styles.verseContainer,
                  {borderBottomColor: colors.border},
                  isHighlighted && {
                    backgroundColor: isHighlighted.color,
                    borderRadius: 8,
                  },
                ]}>
                <TouchableOpacity
                  onLongPress={event => {
                    event.target.measure(
                      (x, y, width, height, pageX, pageY) => {
                        handleVerseLongPress(item, {y: pageY, height});
                      },
                    );
                  }}
                  delayLongPress={500}
                  style={styles.verseContent}>
                  <BaseText
                    style={[styles.verseNumber, {color: colors.verseNumber}]}>
                    {index + 1}
                  </BaseText>
                  <BaseText style={[styles.verseText, {color: colors.text}]}>
                    {item.text}
                  </BaseText>
                </TouchableOpacity>
                {selectedVerse?.id === item.id && renderToolbar()}
              </View>
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
      {renderFontMenu()}
      {renderBrightnessControl()}
      {renderBookmarkMenu()}
      {renderSearchResults()}
      {renderBgColorMenu()}
      {renderVersionModal()}
      {renderChapterModal()}

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
        <View style={styles.bottomToolbar}>
          {toolbarButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.bottomToolbarButton}
              onPress={button.onPress}>
              <FontAwesome
                name={button.icon}
                size={20}
                color="#666"
                iconStyle="solid"
              />
              <BaseText style={styles.bottomToolbarButtonText}>
                {button.label}
              </BaseText>
            </TouchableOpacity>
          ))}
        </View>
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
  verseContainer: {
    padding: 16,
    borderBottomWidth: 1,
    position: 'relative',
    marginHorizontal: 16,
  },
  verseContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  verseNumber: {
    fontSize: 12,
    color: '#3B8E58',
    marginRight: 8,
    lineHeight: 24,
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
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
    bottom: 100,
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
  readersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
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
  readerCount: {
    fontSize: 12,
    color: '#666',
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
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
  menuContainer: {
    padding: 16,
    // flex: 1,
    width: 390,
    // height: 200,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fontSizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  fontSizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  slider: {
    flex: 1,
    marginHorizontal: 16,
  },
  brightnessControl: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  searchInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#F6F6F6',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  hidden: {
    display: 'none',
  },
  searchContainer: {
    padding: 16,
    width: 390,
    height: 400, // 搜索结果框较高
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalSearchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB224',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResults: {
    flex: 1,
  },
  searchResultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchResultVerse: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  searchResultText: {
    fontSize: 14,
    color: '#333',
  },
  bookmarkList: {
    flex: 1,
  },
  bookmarkItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  bookmarkTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  bookmarkVerse: {
    fontSize: 12,
    color: '#666',
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  versionTag: {
    backgroundColor: '#FFB224',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  versionText: {
    color: '#fff',
    fontSize: 12,
  },
  chapterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    // paddingTop: 12,
  },
  chapterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
    // paddingTop: 4,
    marginTop: -4,
  },
  versionContainer: {
    padding: 16,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  versionList: {
    maxHeight: 400,
  },
  versionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  versionItemActive: {
    backgroundColor: '#FFF5E6',
  },
  versionItemText: {
    fontSize: 16,
    color: '#333',
  },
  versionItemTextActive: {
    color: '#FFB224',
  },
  chapterContainer: {
    backgroundColor: '#fff',
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    width: 390,
  },
  chapterTabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    justifyContent: 'space-around',
  },
  chapterTab: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  chapterTabActive: {
    backgroundColor: '#FFB224',
  },
  chapterTabText: {
    fontSize: 14,
    color: '#666',
  },
  chapterTabTextActive: {
    color: '#fff',
  },
  chapterContent: {
    flexDirection: 'row',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    overflow: 'hidden',
  },
  chapterList: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
  },
  chapterListContent: {
    padding: 12,
  },
  sectionList: {
    flex: 1,
  },
  sectionListContent: {
    padding: 12,
  },
  chapterItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  chapterItemActive: {
    backgroundColor: '#FFB224',
  },
  chapterItemText: {
    fontSize: 16,
    color: '#333',
  },
  chapterItemTextActive: {
    color: '#fff',
  },
  sectionItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  sectionItemActive: {
    backgroundColor: '#FFB224',
  },
  sectionItemText: {
    fontSize: 16,
    color: '#333',
  },
  sectionItemTextActive: {
    color: '#fff',
  },
  chapterFooter: {
    flexDirection: 'row',
    height: 44, // 固定高度
    // borderTopWidth: 1,
    // borderTopColor: '#EEEEEE',
    justifyContent: 'space-between',
  },
  chapterFooterButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  chapterFooterButtonPrimary: {
    // borderLeftWidth: 1,
    // borderLeftColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  chapterFooterButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    marginTop: -4,
  },
  bottomToolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: 34, // 适配底部安全区域
    paddingTop: 8,
    justifyContent: 'space-around',
    zIndex: 100,
  },
  bottomToolbarButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bottomToolbarButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
  },
});

export default ImmersiveReading;
