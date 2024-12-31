import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';
import BaseText from '@components/BaseText';
import Header from '@components/CommonHeader';
import CustomTabs from '@components/Tabs';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {hideTabBar, showTabBar} from '@store/tabSlice';
import {resetStatusBar} from '@store/statusBarSlice';
import {useTabBarControl} from '@hooks/useTabBarControl';

const DATA = [
  {
    id: 1,
    title: '和合本2010（上帝版）',
    hours: '9999小时',
    people: '9999人',
    image: 'https://placekitten.com/50/50',
    selected: true,
  },
  {
    id: 2,
    title: '新标点和合本',
    hours: '9999小时',
    people: '9999人',
    selected: false,
  },
  {
    id: 3,
    title: '新标点和合本',
    hours: '9999小时',
    people: '9999人',
    selected: false,
  },
  {
    id: 4,
    title: '新标点和合本',
    hours: '9999小时',
    people: '9999人',
    selected: false,
  },
];

function VersionManageScreen(): React.JSX.Element {
  useTabBarControl();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [listData, setListData] = useState(DATA);
  const [currentTab, setCurrentTab] = useState('zh');

  const toggleSelect = (id: number) => {
    const updatedData = listData.map(item => ({
      ...item,
      selected: item.id === id ? !item.selected : false,
    }));
    setListData(updatedData);
  };

  const handleCardPress = (item: (typeof DATA)[0]) => {
    navigation.navigate('BookIntro');
  };

  const renderCard = ({item}: {item: (typeof DATA)[0]}) => (
    <TouchableOpacity onPress={() => handleCardPress(item)} activeOpacity={0.7}>
      <View style={[styles.card, item.selected && styles.cardActive]}>
        <TouchableOpacity
          onPress={e => {
            e.stopPropagation(); // 防止触发父级的点击事件
            toggleSelect(item.id);
          }}
          style={styles.checkbox}>
          <FontAwesome
            name={item.selected ? 'square-check' : 'square'}
            size={18}
            color="#2E2E2E"
          />
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <BaseText style={styles.cardTitle}>{item.title}</BaseText>
          <BaseText style={styles.cardDetail}>
            {item.hours} {item.people}
          </BaseText>
        </View>
        {item.image && (
          <Image source={{uri: item.image}} style={styles.cardImage} />
        )}
        <FontAwesome name="bars" size={18} color="#888" iconStyle="solid" />
      </View>
    </TouchableOpacity>
  );

  const tabs = [
    {key: 'zh', label: '中文版', data: listData},
    {key: 'en', label: '英文版', data: listData},
    {key: 'kr', label: '韩语版', data: listData},
    {key: 'jp', label: '日语版', data: listData},
    {key: 'my', label: '马来文版', data: listData},
    {key: 'fr', label: '法语版', data: listData},
  ].map(item => ({
    ...item,
    renderItem: () => (
      <FlatList
        data={item.data}
        keyExtractor={item => item.id.toString()}
        extraData={listData}
        renderItem={renderCard}
      />
    ),
  }));

  return (
    <>
      <StatusBar />
      <Header />
      <View style={styles.container}>
        {/* 统计栏 */}
        <View style={styles.statsBox}>
          {[
            {label: '版本数量', value: '24'},
            {label: '语言数量', value: '04'},
            {label: '批注条数', value: '9999'},
          ].map((item, index) => (
            <View key={index} style={styles.statItem}>
              <BaseText style={styles.statLabel}>{item.label}</BaseText>
              <BaseText style={styles.statNumber}>{item.value}</BaseText>
            </View>
          ))}
        </View>

        {/* Tabs 组件 */}
        <CustomTabs tabs={tabs} onTabChange={key => setCurrentTab(key)} />
      </View>
    </>
  );
}

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  statsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  cardActive: {
    borderWidth: 1,
    borderColor: '#FFB224',
    backgroundColor: '#FFF9F0',
  },
  checkbox: {
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 12,
    color: '#999',
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
});

export default VersionManageScreen;
