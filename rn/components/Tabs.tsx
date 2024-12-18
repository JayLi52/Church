import React, { useState } from 'react';
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

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].key);

    const handleTabPress = (key: string) => {
        setActiveTab(key);
        onTabChange(key);
    };

    return (
        <>
            {/* 横向滚动 Tab */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                style={styles.scrollView}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                        onPress={() => handleTabPress(tab.key)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.key && styles.activeText]}>
                            {tab.label}
                        </Text>
                        {activeTab === tab.key && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* 渲染选中 Tab 内容 */}
            <View style={styles.contentContainer}>
                {tabs.find(item => activeTab === item.key)?.renderItem?.()}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        height: 60,
        flexGrow: 0,
    },
    scrollContainer: {
        flexDirection: 'row',
        height: '100%',
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 12,
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
        // flex: 1,
        backgroundColor: '#F9F9F9',
        padding: 16,
    },
});

export default CustomTabs;
