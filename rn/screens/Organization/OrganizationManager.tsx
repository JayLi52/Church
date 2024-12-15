import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import ProfileHeader from './component/ProfileHeader';
import { transformStyles } from '@utils/index';
import Tabs from '@components/Tabs';
import MemberCard from './component/MemberCard1';

const HEADER_DATA = [
    // { title: '总分享次数', value: '9999' },
    // { title: '总点击次数', value: '9999' },
    // { title: '新注册用户', value: '9999' },
    { title: '成立时长', value: '99年 100天' },
    { title: '现有成员', value: '9999' },
    { title: '事工数量', value: '9999' },
];

const MEMBERS = [
    // {
    //     id: '1',
    //     name: '名称文本信息',
    //     shares: '9999 次分享',
    //     feedback: '9999 次反馈',
    //     location: '四川成都',
    //     distance: '1532KM',
    //     date: '2024-08-30 04:42',
    //     avatar: require('@assets/images/book/Avatar1.png'),
    // },
    // {
    //     id: '2',
    //     name: '名称文本信息',
    //     shares: '9999 次分享',
    //     feedback: '9999 次反馈',
    //     location: '四川成都',
    //     distance: '1532KM',
    //     date: '2024-08-30 04:42',
    //     avatar: require('@assets/images/book/Avatar2.png'),
    // },
    // {
    //     id: '3',
    //     name: '名称文本信息',
    //     shares: '9999 次分享',
    //     feedback: '9999 次反馈',
    //     location: '四川成都',
    //     distance: '1532KM',
    //     date: '2024-08-30 04:42',
    //     avatar: require('@assets/images/book/Avatar3.png'),
    // },

    {
        id: '1',
        name: '名称文本信息',
        role: '同工',
        days: '9999天',
        joinDate: '2024-06-30 加入',
        location: '四川成都',
        distance: '1532KM',
        date: '2024-08-30 04:42',
        avatar: 'https://via.placeholder.com/100',
        gradient: ['#FF9E80', '#FF6E40'], // 渐变背景色
    },
    {
        id: '2',
        name: '名称文本信息',
        role: '平信徒',
        days: '9999天',
        joinDate: '2024-06-30 加入',
        location: '四川成都',
        distance: '1532KM',
        date: '2024-08-30 04:42',
        avatar: 'https://via.placeholder.com/100',
        gradient: ['#8AB4F8', '#1565C0'], // 渐变背景色
    },
    {
        id: '3',
        name: '名称文本信息',
        role: '小组长',
        days: '9999天',
        joinDate: '2024-06-30 加入',
        location: '四川成都',
        distance: '1532KM',
        date: '2024-08-30 04:42',
        avatar: 'https://via.placeholder.com/100',
        gradient: ['#536DFE', '#1E88E5'], // 渐变背景色
    },
];

const HeaderCard = ({ title, value, style }) => (
    <View style={[styles.headerCard, style]}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerValue}>{value}</Text>
    </View>
);

// const MemberCard = ({ item }) => (
//     <View style={styles.memberCard}>
//         <Image source={item.avatar} style={styles.avatar} />
//         <View style={styles.infoContainer}>
//             <Text style={styles.memberName}>{item.name}</Text>
//             <Text style={styles.memberDetails}>
//                 {item.shares} | {item.feedback}
//             </Text>
//             <Text style={styles.memberDetails}>
//                 {item.location} | {item.distance} | {item.date}
//             </Text>
//         </View>
//     </View>
// );

const handleAddMember = () => {
    Alert.alert('提示', '添加新成员功能待实现');
};

const OrganizationManager = () => {
    return (
        <View style={styles.container}>
            <ProfileHeader></ProfileHeader>

            {/* 统计卡片 */}
            <View style={styles.headerRow}>
                <HeaderCard style={styles.firstHeadCard} title="成立时长" value={<>
                    <Text style={styles.highLight}>99 </Text>
                    <Text style={styles.normal}>年</Text>
                    <Text style={styles.highLight}> 100 </Text>
                    <Text style={styles.normal}>天</Text>
                </>} />
                <HeaderCard style={styles.otherHeadCard} title="现有成员" value="9999" />
                <HeaderCard style={styles.otherHeadCard} title="事工数量" value="9999" />
            </View>

            <Tabs tabs={[
                {
                    key: '1',
                    label: '小组',
                    renderItem: (
                        <View style={styles.groupIntro}>
                            <Image
                                source={'https://via.placeholder.com/350x130'}
                                style={styles.groupImage}
                            />
                            <Text style={styles.groupName}>恩慈小组</Text>
                            <Text style={styles.groupDetails}>UID: 000000001 | 日期: 2024-01-10</Text>
                            <Text style={styles.groupLeader}>组长: 姓名文本信息</Text>
                            <Text style={styles.groupIntroText}>
                                简介: 通过以圣经为基础的多样化培训课程，营造出具有神同在氛围的场域，帮助组员遇见耶稣、认识耶稣、经历耶稣。
                            </Text>
                        </View>)
                },
                {
                    key: '2',
                    label: '成员',
                    renderItem: (
                        <View style={{ flex: 1 }}>
                            {/* todo 添加新成员按钮 浮动在FlatList上面 */}
                            <FlatList
                                data={MEMBERS}
                                renderItem={({ item }) => <MemberCard item={item} />}
                                keyExtractor={(item) => item.id}
                            />
                            {/* 浮动按钮 */}
                            <TouchableOpacity
                                style={styles.floatingButton}
                                onPress={handleAddMember}
                            >
                                <Text style={styles.floatingButtonIcon}>+</Text>
                                <Text style={styles.floatingButtonText}>添加新成员</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            ]} onTabChange={(item) => {
                console.log(item);
            }} />

        </View>
    );
};

const styles = transformStyles({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    header: { padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 18, fontWeight: 'bold' },

    // 统计卡片
    headerRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 18, marginTop: 29 },

    headerCard: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        // flex: 1,
        marginHorizontal: 7,
        textAlign: 'left',
        paddingHorizontal: 16
    },
    firstHeadCard: {
        width: 150,
    },
    otherHeadCard: {
        width: 90
    },
    headerValue: { color: '#fff', fontSize: 20, fontWeight: 'bold', width: '100%' },
    headerTitle: { color: '#fff', fontSize: 12, width: '100%' },
    highLight: {
        fontSize: 22,
        marginLeft: 10,
        marginRight: 6,
        // marginRight: 6
    },
    normal: {
        fontSize: 12
    },

    // 小组简介
    groupIntro: {
        backgroundColor: '#fff',
        margin: 12,
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    groupImage: { width: 350, height: 130, borderRadius: 10, marginVertical: 20 },
    groupName: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
    groupDetails: { fontSize: 12, color: '#888', marginBottom: 4 },
    groupLeader: { fontSize: 14, color: '#666', marginBottom: 8 },
    groupIntroText: { fontSize: 14, color: '#333', lineHeight: 20 },

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

    // 浮动按钮
    // 修改浮动按钮样式
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 200, // 按钮宽度
        height: 50, // 按钮高度
        backgroundColor: '#FF6E40', // 背景颜色改为图片中的橙色
        borderRadius: 25, // 圆角为高度的一半，制作圆角矩形
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        flexDirection: 'row', // 让内容横向排列
    },
    floatingButtonText: {
        fontSize: 16, // 修改文字大小
        color: '#fff', // 文案颜色为白色
        fontWeight: 'bold',
        marginLeft: 5, // 图标与文字间距
    },
    floatingButtonIcon: {
        fontSize: 24, // 图标大小
        color: '#fff', // 图标颜色
    },
});

export default OrganizationManager;
