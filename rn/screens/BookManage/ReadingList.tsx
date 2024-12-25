import React, {useState} from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {transformStyles} from '@utils/index';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import GradientBox from '@components/GradientBox';
import {useNavigation} from '@react-navigation/native';

interface ReadingItem {
  id: string;
  avatar: string;
  name: string;
  location: string;
  time: string;
  readingTime: number;
  readCount: number;
  status: 'incomplete' | 'completed';
}

const ReadingList = () => {
  const [activeTab, setActiveTab] = useState<'reading' | 'completed'>(
    'reading',
  );
  const [readingList] = useState<ReadingItem[]>([
    {
      id: '1',
      avatar:
        'http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
      name: 'Warren Mary',
      location: '四川成都',
      time: '15:32KM 04:42 am',
      readingTime: 9999,
      readCount: 9999,
      status: 'incomplete',
    },
    {
      id: '2',
      avatar:
        'http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
      name: 'Tong yang',
      location: '四川成都',
      time: '15:32KM 04:42 am',
      readingTime: 9999,
      readCount: 9999,
      status: 'completed',
    },
  ]);

  const navigation = useNavigation();

  const renderReadingItem = (item: ReadingItem) => (
    <GradientBox
      key={item.id}
      type={item.status === 'completed' ? 'blue' : 'orange'}
      style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <View style={styles.itemInfo}>
          <View style={styles.nameRow}>
            <BaseText style={styles.name}>{item.name}</BaseText>
            <BaseText style={styles.status}>
              {item.status === 'completed' ? 'Completed' : 'Incomplete'}
            </BaseText>
          </View>
          <View style={styles.locationRow}>
            <BaseText style={styles.location}>{item.location}</BaseText>
            <BaseText style={styles.time}>{item.time}</BaseText>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <FontAwesome
                name="clock"
                size={12}
                color="#666"
                iconStyle="solid"
              />
              <BaseText style={styles.statText}>
                {item.readingTime} min
              </BaseText>
            </View>
            <View style={styles.stat}>
              <FontAwesome
                name="eye"
                size={12}
                color="#666"
                iconStyle="solid"
              />
              <BaseText style={styles.statText}>{item.readCount}</BaseText>
            </View>
          </View>
        </View>
      </View>
    </GradientBox>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
        <BaseText style={styles.headerTitle}>
          {activeTab === 'reading' ? '9999人阅读中' : '9999人已阅读'}
        </BaseText>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'reading' && styles.activeTab]}
          onPress={() => setActiveTab('reading')}>
          <BaseText
            style={[
              styles.tabText,
              activeTab === 'reading' && styles.activeTabText,
            ]}>
            在读列表
          </BaseText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}>
          <BaseText
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}>
            已读列表
          </BaseText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {readingList
          .filter(item =>
            activeTab === 'reading'
              ? item.status === 'incomplete'
              : item.status === 'completed',
          )
          .map(renderReadingItem)}
      </ScrollView>
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
  headerTitle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    marginRight: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF8800',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FF8800',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    zIndex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    color: '#666',
  },
  locationRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default ReadingList;
