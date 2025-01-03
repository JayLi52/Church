import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, ScrollView, Pressable, Image} from 'react-native';
import BaseText from '@components/BaseText';
import {GetAllChapters} from '@services/ReadingRoomService';
import {transformStyles} from '@utils/index';

const SearchIcon = require('@assets/images/readingroom/icon_search.png');
const ViewIcon = require('@assets/images/readingroom/view.png');
const TimeIcon = require('@assets/images/readingroom/time.png');

const DefaultImage =
  'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png';

// 添加不同类型的模拟数据
const MOCK_BOOKS_MAP = {
  // 收藏
  0: [
    {
      id: 1,
      name: '约翰福音',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 85,
      viewCount: 1232,
      readingTime: 2451,
      readerCount: 12543,
    },
    {
      id: 2,
      name: '马太福音',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 92,
      viewCount: 986,
      readingTime: 1877,
      readerCount: 9876,
    },
  ],
  // 新约
  2: [
    {
      id: 3,
      name: '马太福音',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 45,
      viewCount: 2341,
      readingTime: 3210,
      readerCount: 15678,
    },
    {
      id: 4,
      name: '马可福音',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 30,
      viewCount: 1876,
      readingTime: 2654,
      readerCount: 13245,
    },
    {
      id: 5,
      name: '路加福音',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 15,
      viewCount: 1543,
      readingTime: 1987,
      readerCount: 11234,
    },
  ],
  // 旧约
  1: [
    {
      id: 6,
      name: '创世记',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 65,
      viewCount: 3421,
      readingTime: 4532,
      readerCount: 21543,
    },
    {
      id: 7,
      name: '出埃及记',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 40,
      viewCount: 2876,
      readingTime: 3654,
      readerCount: 18765,
    },
    {
      id: 8,
      name: '利未记',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 25,
      viewCount: 2143,
      readingTime: 2987,
      readerCount: 15432,
    },
  ],
  // 历史书
  3: [
    {
      id: 9,
      name: '约书亚记',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 55,
      viewCount: 1765,
      readingTime: 2345,
      readerCount: 13567,
    },
    {
      id: 10,
      name: '士师记',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 35,
      viewCount: 1432,
      readingTime: 1876,
      readerCount: 11234,
    },
  ],
  // 诗歌
  4: [
    {
      id: 11,
      name: '诗篇',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 70,
      viewCount: 4532,
      readingTime: 5643,
      readerCount: 25678,
    },
    {
      id: 12,
      name: '箴言',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 45,
      viewCount: 3654,
      readingTime: 4321,
      readerCount: 20987,
    },
    {
      id: 13,
      name: '传道书',
      coverImage:
        'https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/6d/6db1c05dd40a0c514418dc8b4b4034e7/WX20210622-161842.png',
      progress: 30,
      viewCount: 2987,
      readingTime: 3456,
      readerCount: 17654,
    },
  ],
};

function TabList(props: any): React.JSX.Element {
  const {onTabChange} = props;
  const navigation = useNavigation();
  const [currentTab, setCurrentTab] = useState(1);
  const [bookList, setBookList] = useState([]);
  const list = [
    {label: '收藏', value: 0},
    {label: '新约', value: 2},
    {label: '旧约', value: 1},
    {label: '历史书', value: 3},
    {label: '诗歌', value: 4},
  ];
  const selectTab = (val: number) => {
    if (val === currentTab) return;
    setCurrentTab(val);
  };

  const handleSearchPress = () => {
    navigation.navigate('BookManageNavigator', {screen: 'ReadingRoomSearch'});
  };

  useEffect(() => {
    onTabChange(currentTab);
  }, [currentTab]);

  return (
    <View style={styles.tabListWrap}>
      {list.map(item => {
        const isActive = currentTab === item.value;
        return (
          <Pressable
            key={item.value}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
            onPress={() => selectTab(item.value)}>
            <BaseText
              style={[
                isActive ? styles.tabItemTextActive : styles.tabItemText,
              ]}>
              {item.label}
            </BaseText>
            {isActive && <View style={styles.tabItemActiveLine} />}
          </Pressable>
        );
      })}
      <Pressable
        style={styles.tabListSearchIconWrap}
        key="search"
        onPress={handleSearchPress}>
        <Image style={styles.tabListSearchIcon} source={SearchIcon} />
      </Pressable>
    </View>
  );
}

function BookItem(props: any): React.JSX.Element {
  const {data} = props;
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.bookItem}
      onPress={() => {
        navigation.navigate('BookManageNavigator', {screen: 'BookIntroTwo'});
      }}>
      <View style={styles.bookItem}>
        <View style={styles.bookItemLeft}>
          <View style={styles.bookItemBgWrap}>
            <Image style={styles.bookItemBg} source={{uri: data.coverImage}} />
            <BaseText style={styles.bookItemProgressText}>
              {data.progress}%
            </BaseText>
          </View>
          <View style={styles.bookItemProgressWrap}>
            <View style={styles.bookItemProgress} />
            <View
              style={[
                styles.bookItemPregressInner,
                {width: data.progress * 0.9},
              ]}></View>
          </View>
        </View>
        <View>
          <BaseText style={styles.bookItemTitle}>{data.name}</BaseText>
          <View style={styles.bookItemStatisticsWrap}>
            <View style={styles.bookItemStatisticsItem}>
              <Image
                style={styles.bookItemStatisticsItemIcon}
                source={ViewIcon}
              />
              <BaseText style={styles.bookItemStatisticsItemText}>
                {data.viewCount}次
              </BaseText>
            </View>
            <View style={styles.bookItemStatisticsItem}>
              <Image
                style={styles.bookItemStatisticsItemIcon}
                source={TimeIcon}
              />
              <BaseText style={styles.bookItemStatisticsItemText}>
                {data.readingTime}分钟
              </BaseText>
            </View>
          </View>
          <View style={styles.bookItemReaders}>
            <BaseText style={styles.bookItemReadersText}>
              {data.readerCount}人已读
            </BaseText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function BookCase(): React.JSX.Element {
  const [bookList, setBookList] = useState(MOCK_BOOKS_MAP[1]); // 默认显示旧约
  const [currentTab, setCurrentTab] = useState(1);

  const onTabChange = (tab: number) => {
    setCurrentTab(tab);
    setBookList(MOCK_BOOKS_MAP[tab] || []);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TabList onTabChange={onTabChange} />
        <ScrollView style={styles.listWrap}>
          {bookList.map(item => (
            <BookItem key={item.id} data={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = transformStyles({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F6F6',
  },
  innerContainer: {
    backgroundColor: '#FFF',
    flexGrow: 1,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 10,
  },
  tabListWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 28,
    paddingRight: 64,
    backgroundColor: '#FFF',
    height: 44,
  },
  tabItem: {
    height: 44,
    justifyContent: 'center',
  },
  tabItemText: {
    fontSize: 14,
    color: '#7A7A7A',
    lineHeight: 20,
  },
  tabItemActive: {
    paddingTop: 8,
    paddingBottom: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabItemTextActive: {
    fontSize: 18,
    fontWeight: 500,
    color: '#2E2E2E',
    lineHeight: 25,
  },
  tabItemActiveLine: {
    width: 10,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#FF8800',
  },
  tabListSearchIconWrap: {
    position: 'absolute',
    right: 16,
    top: 0,
    width: 44,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabListSearchIcon: {
    width: 24,
    height: 24,
  },
  bookItem: {
    height: 102,
    flexDirection: 'row',
    marginBottom: 36,
  },
  bookItemLeft: {
    width: 90,
    marginRight: 40,
    justifyContent: 'space-between',
  },
  bookItemBgWrap: {
    width: 90,
    height: 90,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 6,
  },
  bookItemBg: {
    width: 90,
    height: 90,
  },
  bookItemProgressText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#FFF',
    position: 'absolute',
    right: 6,
    bottom: 6,
  },
  listWrap: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  bookItemProgressWrap: {
    height: 4,
    width: 90,
    position: 'relative',
    paddingTop: 1,
  },
  bookItemProgress: {
    height: 2,
    width: 90,
    backgroundColor: '#D8D8D8',
  },
  bookItemPregressInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#059973',
  },
  bookItemRight: {},
  bookItemTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
    marginBottom: 10,
  },
  bookItemStatisticsWrap: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  bookItemStatisticsItem: {
    marginRight: 16,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DFF0E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 3,
    paddingRight: 8,
  },
  bookItemStatisticsItemIcon: {
    height: 24,
    width: 24,
    marginRight: 1,
  },
  bookItemStatisticsItemText: {
    color: '#2E2E2E',
    fontSize: 12,
  },
  bookItemReaders: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookItemReadersText: {
    color: '#8A8A8A',
    fontSize: 12,
  },
});

export default BookCase;
