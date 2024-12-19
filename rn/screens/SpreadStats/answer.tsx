import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import BaseText from '@components/BaseText';
import { transformStyles } from '@utils/index';
import Header from '@components/Header';
import CustomTabs from '@components/Tabs';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

function SpreadStatsScreen(): React.JSX.Element {
    const tabs = [
        {
            key: 'member',
            label: '组员',
            renderItem: () => <StatsList />
        },
        {
            key: 'scripture',
            label: '经文',
            renderItem: () => <StatsList />
        },
        {
            key: 'question',
            label: '答题',
            renderItem: () => <StatsList />
        },
        {
            key: 'share',
            label: '祷告',
            renderItem: () => <StatsList />
        },
        {
            key: 'topic',
            label: '话题',
            renderItem: () => <StatsList />
        },
    ];

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F6F6F6" />
            <View style={{ height: STATUSBAR_HEIGHT }}></View>
            <Header />
            <View style={styles.container}>
                {/* 统计栏 */}
                <View style={styles.statsBox}>
                    {[
                        { label: '版本数量', value: '24' },
                        { label: '语言数量', value: '04' },
                        { label: '批注条数', value: '9999' },
                    ].map((item, index) => (
                        <View key={index} style={styles.statItem}>
                            <BaseText style={styles.statLabel}>{item.label}</BaseText>
                            <BaseText style={styles.statNumber}>{item.value}</BaseText>
                        </View>
                    ))}
                </View>

                {/* Tabs 组件 */}
                <CustomTabs tabs={tabs} onTabChange={(key) => console.log(key)} />
            </View>
        </>
    );
}

// 统计列表组件
const StatsList = () => (
    <ScrollView style={styles.listContainer}>
        {[
            { label: '分享回赠人数', value: '99999' },
            { label: '分享回赠贡献', value: '99999' },
            { label: '问题分享数', value: '99999' },
            { label: '分享点击数', value: '99999' },
            { label: '新用户数', value: '99999' },
        ].map((item, index) => (
            <View key={index} style={styles.listItem}>
                <BaseText style={styles.listLabel}>{item.label}</BaseText>
                <BaseText style={styles.listValue}>{item.value}</BaseText>
            </View>
        ))}
    </ScrollView>
);

const styles = transformStyles({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    statsBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
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
        marginBottom: 4,
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    listLabel: {
        fontSize: 16,
        color: '#333',
    },
    listValue: {
        fontSize: 16,
        color: '#666',
    },
});

export default SpreadStatsScreen;