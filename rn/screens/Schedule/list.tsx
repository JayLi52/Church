import { transformStyles } from '@utils/index';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, BackHandler } from 'react-native';
import dayjs from 'dayjs'; // 引入dayjs库
import DateHeader from './components/DateHeader';
import BottomActionForm from './components/BottomActionForm';
import { ListItem1 } from './components/ListItem';

// Simulate an API call
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    date: "2024-09-11",
                    content: "线下联合祷告",
                    time: "14:23 – 15:20",
                    location: "中国.四川成都.牛王庙A口",
                    image: 'https://picx.zhimg.com/v2-833b9089b397266bca8fb16457781500_qhd.jpg?source=57bbeac9',
                    chineseCalendar: '十月初四'
                },
                {
                    date: "2024-09-11",
                    content: "线下联合祷告",
                    time: "14:23 – 15:20",
                    location: "中国.四川成都.牛王庙A口",
                    image: 'https://picx.zhimg.com/v2-833b9089b397266bca8fb16457781500_qhd.jpg?source=57bbeac9',
                    chineseCalendar: '十月初四'
                },
                {
                    date: "2024-09-11",
                    content: "线下联合祷告",
                    time: "14:23 – 15:20",
                    location: "中国.四川成都.牛王庙A口",
                    image: 'https://picx.zhimg.com/v2-833b9089b397266bca8fb16457781500_qhd.jpg?source=57bbeac9',
                    chineseCalendar: '十月初四'
                },
                {
                    date: "2024-09-08",
                    content: "线下联合榜告",
                    time: "14:23 – 15:20",
                    location: "中国.四川成都.牛王庙A口",
                    image: 'https://picx.zhimg.com/v2-833b9089b397266bca8fb16457781500_qhd.jpg?source=57bbeac9',
                    chineseCalendar: '十月初四'
                },
                {
                    date: "2024-09-06",
                    content: "小组学经",
                    time: "14:23 – 15:20",
                    location: "中国.四川成都.牛王庙A口",
                    image: 'https://pic1.zhimg.com/v2-411e5bb482b06abfa0687004f00fab10_1440w.png',
                    chineseCalendar: '十月初四'
                },
            ]);
        }, 2000); // Simulating a 2-second delay
    });
};

const ScheduleList = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const bottomFormRef = useRef();

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData(); // Fetching data from simulated API
                setData(result.map(item => ({
                    ...item,
                    date: dayjs(item.date).format('MM月DD日 dddd'), // 使用dayjs格式化日期
                })));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('ScheduleIndex')
            return true; // 阻止默认返回行为
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // 清理事件
    }, [navigation]);

    return (
        <View style={{
            backgroundColor: '#F6F6F6'
        }}>
            <DateHeader
                date={[2024, 9]}
                navigation={navigation}
                add={() => {
                    bottomFormRef.current!.open()
                }}
            />
            <View style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: '#fff'
            }}>
                <FlatList
                    data={data}
                    renderItem={ListItem1}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.list}
                    refreshing={loading}
                    onRefresh={() => { }}
                />
            </View>
            <BottomActionForm ref={bottomFormRef} />
        </View>
    );
};

const styles = transformStyles({
    list: {
        marginHorizontal: 24,
        marginTop: 20,
        // padding: 10,
        // backgroundColor: '#F6F6F6'
    },
});

export default ScheduleList;