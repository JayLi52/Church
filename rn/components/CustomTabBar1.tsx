import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTabs = ({ tabs, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].key);

    const handleTabPress = (key) => {
        setActiveTab(key);
        onTabChange(key);
    };

    return (
        <>
            <View style={styles.container}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tab}
                        onPress={() => handleTabPress(tab.key)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.key && styles.activeText]}>
                            {tab.label}
                        </Text>
                        {activeTab === tab.key && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                ))}

            </View>
            {
                tabs.find(item => activeTab === item.key).renderItem
            }
        </>
    );
};

// const Tabs = () => {
//     const tabs = [
//         { key: 'group', label: '小组' },
//         { key: 'members', label: '成员' },
//     ];

//     const handleTabChange = (key) => {
//         console.log('Active Tab:', key);
//         // 根据 key 切换内容
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: '#fff' }}>
//             {/* 自定义 Tabs */}
//             <CustomTabs tabs={tabs} onTabChange={handleTabChange} />

//             {/* Tab 内容区域 */}
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text>切换的 Tab 内容将显示在这里</Text>
//             </View>
//         </View>
//     );
// };

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
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
        backgroundColor: '#ff7f50',
        marginTop: 4,
        borderRadius: 1,
    },
});

export default CustomTabs;
