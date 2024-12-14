import { transformStyles } from '@utils/index';
import React from 'react';
import { View, Text, StyleSheet, Image, ProgressBarAndroid, ScrollView } from 'react-native';

const Devotion = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: 'https://example.com/profile.jpg' }}
                />
                <Text style={styles.title}>教会名称文本信息</Text>
                <View style={styles.calendarIcon}>
                    {/* 假图标，可替换为Icon库 */}
                    <Text>📅</Text>
                </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>2 年 100 天</Text>
                    <Text style={styles.statLabel}>累计灵修时长</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>0003</Text>
                    <Text style={styles.statLabel}>累计灵修人次</Text>
                </View>
            </View>

            {/* Study Plan */}
            <Text style={styles.sectionTitle}>学经计划</Text>
            <View style={styles.planCard}>
                <Text style={styles.planTitle}>90天阅读旧约</Text>
                <Text>进度：65%</Text>
                <ProgressBarAndroid styleAttr="Horizontal" progress={0.65} />
                <Text style={styles.date}>日期：2024-08-11 至 2024-08-21</Text>
            </View>

            {/* Past Plans */}
            <Text style={styles.sectionSubtitle}>以往的计划</Text>
            <View style={styles.planCard}>
                <Text style={styles.planTitle}>90天阅读旧约</Text>
                <Text>进度：100%</Text>
                <ProgressBarAndroid styleAttr="Horizontal" progress={1} />
                <Text style={styles.date}>日期：2024-08-11 至 2024-08-21</Text>
            </View>
            <View style={styles.planCard}>
                <Text style={styles.planTitle}>90天阅读旧约</Text>
                <Text>进度：0%</Text>
                <ProgressBarAndroid styleAttr="Horizontal" progress={0} />
                <Text style={styles.date}>日期：2024-08-11 至 2024-08-21</Text>
            </View>
        </ScrollView>
    );
};

const styles = transformStyles({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    calendarIcon: {
        fontSize: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        marginVertical: 10,
        padding: 16,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#666',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 16,
    },
    sectionSubtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    planCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    planTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
});

export default Devotion;
