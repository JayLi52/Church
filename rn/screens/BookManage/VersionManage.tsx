import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';
import BaseText from '@components/BaseText';
import Header from '@components/CommonHeader';
import CustomTabs from '@components/Tabs';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {hideTabBar, showTabBar} from '@store/tabSlice';
import {resetStatusBar} from '@store/statusBarSlice';
import {useTabBarControl} from '@hooks/useTabBarControl';
import {RootState} from '@store/store';
import {NavigationProp} from '@react-navigation/native';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';

type RootStackParamList = {
  BookIntro: undefined;
  // 其他页面的类型定义...
};

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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [listData, setListData] = useState(DATA);
  const [_currentTab, setCurrentTab] = useState('zh');
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleSelect = (id: number) => {
    const updatedData = listData.map(item => ({
      ...item,
      selected: item.id === id ? !item.selected : false,
    }));
    setListData(updatedData);
  };

  const renderCard = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<(typeof DATA)[0]>) => (
    <ScaleDecorator>
      <TouchableOpacity
        onPress={() => {
          toggleSelect(item.id);
        }}
        activeOpacity={0.7}>
        <View
          key={item.id}
          style={[
            styles.card,
            item.selected && styles.cardActive,
            isActive && styles.cardDragging,
          ]}>
          <View style={styles.left}>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
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
              <View style={styles.titleContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('BookManageNavigator', {
                      screen: 'BookIntro',
                    });
                  }}
                  style={styles.titleTouchable}>
                  <BaseText style={styles.cardTitle}>{item.title}</BaseText>
                </TouchableOpacity>
              </View>
              <BaseText style={styles.cardDetail}>
                {item.hours} {item.people}
              </BaseText>
            </View>
          </View>
          <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
            <FontAwesome name="bars" size={18} color="#888" iconStyle="solid" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  const saveNewOrder = async (newData: typeof DATA) => {
    setIsUpdating(true);
    try {
      // 这里添加你的 API 调用
      // await api.updateVersionOrder(newData.map(item => item.id));
      await new Promise(resolve => setTimeout(resolve, 800)); // 模拟 API 调用
      setListData(newData);
    } catch (error) {
      console.error('Failed to save new order:', error);
      // 可以添加错误提示
    } finally {
      setIsUpdating(false);
    }
  };

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
      <>
        <DraggableFlatList
          data={item.data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCard}
          onDragEnd={({data}) => saveNewOrder(data)}
          dragItemOverflow={true}
          disabled={isUpdating}
        />
        {isUpdating && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#4A90E2" />
          </View>
        )}
      </>
    ),
  }));

  return (
    <>
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
    justifyContent: 'space-between',
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
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 14,
    // flex: 1,
    color: '#333',
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
  dragHandle: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDragging: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  titleTouchable: {
    alignSelf: 'flex-start',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default VersionManageScreen;
