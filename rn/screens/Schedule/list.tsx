import { transformStyles } from '@utils/index';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import dayjs from 'dayjs'; // 引入dayjs库
import DateHeader from './components/DateHeader';
import ScheduleForm from './components/ScheduleForm';
import { ListItem1, ListItem2, ListItem3 } from './components/ListItem';
import SchduleInfo, { SchduleInfoRef } from './components/SchduleInfo';

// 模拟API请求
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
                    chineseCalendar: '十月初四',
                    type: "normal", // 标准活动类型
                },
                {
                    date: "2024-09-09",
                    content: "全天活动",
                    chineseCalendar: '十月初三',
                    type: "allDay", // 全天类型
                },
                {
                    date: "2024-09-06",
                    content: "小组学经",
                    time: "14:23 – 15:20",
                    location: "中国.四川成都.牛王庙A口",
                    image: 'https://pic1.zhimg.com/v2-411e5bb482b06abfa0687004f00fab10_1440w.png',
                    chineseCalendar: '十月初四',
                    type: "special", // 特殊类型
                },
            ]);
        }, 2000);
    });
};

// TypeScript 类型定义
type ScheduleItem = {
    date: string;
    content: string;
    chineseCalendar: string;
    time?: string;
    location?: string;
    image?: string;
    type: "normal" | "allDay" | "special"; // 新增活动类型
};

const ScheduleList: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const bottomFormRef = useRef<any>();
    const schduleInfoRef = useRef<SchduleInfoRef>(null);
    const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                setData(
                    (result as ScheduleItem[]).map((item) => ({
                        ...item,
                        date: dayjs(item.date).format('MM月DD日 dddd'),
                    }))
                );
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
            navigation.navigate('ScheduleIndex');
            return true; // 阻止默认返回行为
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [navigation]);

    const openSchduleInfo = (item: ScheduleItem) => {
        setSelectedItem(item); // 设置选中的条目信息
        schduleInfoRef.current?.open(); // 打开 SchduleInfo
    };

    const renderItem = ({ item }: { item: ScheduleItem }) => {
        switch (item.type) {
            case "allDay":
                return (
                    <ListItem2
                        item={item}
                        itemClick={() => openSchduleInfo(item)}
                    />
                );
            case "special":
                return (
                    <ListItem3
                        item={item}
                        itemClick={() => openSchduleInfo(item)}
                    />
                );
            case "normal":
            default:
                return (
                    <ListItem1
                        item={item}
                        itemClick={() => openSchduleInfo(item)}
                    />
                );
        }
    };

    return (
        <View style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
            <DateHeader
                date={[2024, 9]}
                navigation={navigation}
                add={() => {
                    bottomFormRef.current!.open();
                }}
            />
            <View
                style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#fff',
                    flex: 1,
                }}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#FFA500" style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem} // 动态渲染不同类型的列表项
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.list}
                        refreshing={loading}
                        onRefresh={() => { }} // 可实现刷新逻辑
                    />
                )}
            </View>
            <ScheduleForm ref={bottomFormRef} />
            {/* SchduleInfo 实现动态数据传递 */}
            {selectedItem && (
                <SchduleInfo
                    ref={schduleInfoRef}
                    title={selectedItem.content}
                    time={selectedItem.time || ""}
                    location={selectedItem.location || ""}
                    description={`农历: ${selectedItem.chineseCalendar}`}
                    callback={() => {
                        console.log('计划调整回调');
                    }}
                />
            )}
        </View>
    );
};

const styles = transformStyles({
    list: {
        marginHorizontal: 24,
        marginTop: 20,
    },
});

export default ScheduleList;
