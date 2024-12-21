import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import BaseText from '@components/BaseText';
import { transformStyles } from '@utils/index';
import Header from '@components/Header';
import CustomTabs from '@components/Tabs';

function SpreadStatsAnswerScreen(): React.JSX.Element {
    const tabs = [
        {
            key: 'member',
            label: '组员',
            renderItem: () => (
                <StatsList />
            )
        },
        {
            key: 'scripture',
            label: '经文',
            renderItem: () => (
                <StatsList />
            )
        },
        {
            key: 'question',
            label: '答题',
            renderItem: () => (
                <StatsList />
            )
        },
        {
            key: 'share',
            label: '请客',
            renderItem: () => (
                <StatsList />
            )
        },
        {
            key: 'topic',
            label: '话题',
            renderItem: () => (
                <StatsList />
            )
        },
    ];

    return (
        <>
            <View style={styles.wrapper}>
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
                    <View style={styles.tabsContainer}>
                        {/* Tabs 组件 */}
                        <CustomTabs tabs={tabs} onTabChange={(key) => console.log(key)} />
                    </View>
                </View>
            </View>
        </>
    );
}

// 统计列表组件
const StatsList = () => (
    <View style={styles.listContainer}>
        <View style={styles.divider}>
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

        </View>
        <View style={styles.divider}>
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

        </View>
        <View style={styles.divider}>
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

        </View>
    </View>
);

const styles = transformStyles({
    wrapper: {
        backgroundColor: "#F6F6F6",
        height: '100%'
    },
    container: {
        flex: 1,

        // paddingTop: 26,
    },
    tabsContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
    },
    statsBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        height: 108,
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
        margin: 16,
    },
    listContainerScrollView: {
        marginHorizontal: 20,
        marginTop: 24,
    },
    listItem: {
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(228, 228, 228, 1)',
    },
    listLabel: {
        fontSize: 16,
        color: '#333',
    },
    listValue: {
        fontSize: 16,
        color: '#666',
    },
    divider: {
        // height: 16,
        // backgroundColor: '#fff',
        // marginHorizontal: 30,
        marginBottom: 16,
        borderRadius: 4,
        overflow: 'hidden',
    },
});

export default SpreadStatsAnswerScreen;