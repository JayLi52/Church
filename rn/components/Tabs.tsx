import {transformStyles} from '@utils/index';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface CustomTabsProps {
  tabs: {
    key: string;
    label: string;
    renderItem?: () => React.ReactNode; // 修改这里：从 ReactNode 改为函数
  }[];
  onTabChange: (key: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({tabs, onTabChange}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const handleTabPress = (key: string) => {
    setActiveTab(key);
    onTabChange(key);
  };

  // 找到当前激活的 tab
  const activeTabContent = tabs.find(
    item => activeTab === item.key,
  )?.renderItem;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContainer,
          // 当内容不需要滚动时，居中显示
          {
            justifyContent: tabs.length <= 5 ? 'center' : 'flex-start',
            flex: tabs.length <= 5 ? 1 : 0,
          },
        ]}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => handleTabPress(tab.key)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeText,
              ]}>
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 渲染选中 Tab 内容 */}
      {/* <ScrollView style={styles.contentContainer}> */}
      {tabs.find(item => activeTab === item.key)?.renderItem?.()}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = transformStyles({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    flex: 1,
  },
  scrollView: {
    height: 60,
    flexGrow: 0,
    marginBottom: 8,
  },
  scrollContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  tab: {
    paddingHorizontal: 16,
    paddingTop: 12,
    alignItems: 'center',
  },
  activeTab: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#FF8800',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activeIndicator: {
    width: 20,
    height: 2,
    backgroundColor: '#FF8800',
    marginTop: 4,
    borderRadius: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
    // backgroundColor: '#F9F9F9',
    // padding: 16,
  },
});

export default CustomTabs;
