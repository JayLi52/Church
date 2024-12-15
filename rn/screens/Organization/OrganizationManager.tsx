import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import ProfileHeader from './component/ProfileHeader';

const HEADER_DATA = [
    // { title: '总分享次数', value: '9999' },
    // { title: '总点击次数', value: '9999' },
    // { title: '新注册用户', value: '9999' },
    { title: '成立时长', value: '99年 100天' },
    { title: '现有成员', value: '9999' },
    { title: '事工数量', value: '9999' },
];

const MEMBERS = [
    {
        id: '1',
        name: '名称文本信息',
        shares: '9999 次分享',
        feedback: '9999 次反馈',
        location: '四川成都',
        distance: '1532KM',
        date: '2024-08-30 04:42',
        avatar: require('@assets/images/book/Avatar1.png'),
    },
    {
        id: '2',
        name: '名称文本信息',
        shares: '9999 次分享',
        feedback: '9999 次反馈',
        location: '四川成都',
        distance: '1532KM',
        date: '2024-08-30 04:42',
        avatar: require('@assets/images/book/Avatar2.png'),
    },
    {
        id: '3',
        name: '名称文本信息',
        shares: '9999 次分享',
        feedback: '9999 次反馈',
        location: '四川成都',
        distance: '1532KM',
        date: '2024-08-30 04:42',
        avatar: require('@assets/images/book/Avatar3.png'),
    },
];

const HeaderCard = ({ title, value, style }) => (
    <View style={[styles.headerCard, style]}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerValue}>{value}</Text>
    </View>
);

const MemberCard = ({ item }) => (
    <View style={styles.memberCard}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.infoContainer}>
            <Text style={styles.memberName}>{item.name}</Text>
            <Text style={styles.memberDetails}>
                {item.shares} | {item.feedback}
            </Text>
            <Text style={styles.memberDetails}>
                {item.location} | {item.distance} | {item.date}
            </Text>
        </View>
    </View>
);

const OrganizationManager = () => {
    return (
        <View style={styles.container}>
            <ProfileHeader></ProfileHeader>

            {/* 统计卡片 */}
            <View style={styles.headerRow}>
                <HeaderCard style={styles.firstHeadCard} title="成立时长" value={<>
                    <Text style={styles.highLight}>99</Text>
                    <Text style={styles.normal}>年</Text>
                    <Text style={styles.highLight}>100</Text>
                    <Text style={styles.normal}>天</Text>
                </>} />
                <HeaderCard style={styles.otherHeadCard} title="现有成员" value="9999" />
                <HeaderCard title="事工数量" value="9999" />
            </View>

            {/* 标签导航 */}
            <View style={styles.tabContainer}>
                <Text style={[styles.tabText, styles.activeTab]}>组员</Text>
                <Text style={styles.tabText}>经文</Text>
                <Text style={styles.tabText}>答题</Text>
                <Text style={styles.tabText}>榜首</Text>
                <Text style={styles.tabText}>话题</Text>
                <View style={styles.tabIndicator} />
            </View>

            {/* 成员信息列表 */}
            <FlatList
                data={MEMBERS}
                renderItem={({ item }) => <MemberCard item={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    header: { padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 18, fontWeight: 'bold' },

    // 统计卡片
    headerRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },

    headerCard: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
    },
    firstHeadCard: {
        width: 150,
    },
    otherHeadCard: {
        width: 90
    },
    headerValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    headerTitle: { color: '#fff', fontSize: 12 },

    // 标签导航
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 8,
        alignItems: 'center',
    },
    tabText: { fontSize: 14, color: '#888', flex: 1, textAlign: 'center' },
    activeTab: { color: '#ff7f50', fontWeight: 'bold' },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '20%',
        height: 3,
        backgroundColor: '#ff7f50',
    },

    // 成员信息卡片
    memberCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 12,
        marginVertical: 6,
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
    infoContainer: { justifyContent: 'center' },
    memberName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    memberDetails: { fontSize: 12, color: '#888' },
});

export default OrganizationManager;
