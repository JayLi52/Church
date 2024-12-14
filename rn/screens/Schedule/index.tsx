import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useBackHandler } from '@utils/hooks';

const CalendarScreen = ({ navigation }) => {
    useBackHandler();
    const currentDate = dayjs().format('YYYY-MM-DD'); // 获取当前日期
    const [markedDates, setMarkedDates] = useState({
        '2024-09-12': { selected: true, marked: true, selectedColor: '#1E90FF' },
        '2024-09-17': { marked: true, dotColor: '#FFA500' },
        '2024-09-20': { marked: true, dotColor: '#008000' },
        '2024-09-26': { marked: true, dotColor: '#3CB371' },
        '2024-10-05': { marked: true, dotColor: '#FFA500' },
        '2024-10-12': { selected: true, marked: true, selectedColor: '#1E90FF' },
    });

    const onDayPress = (day: DateData) => {
        console.log('选中的日期:', day.dateString);
        navigation.navigate('ScheduleList');
    };

    return (
        <View style={styles.container}>
            {/* 顶部按钮和标题 */}
            <View style={styles.header}>
                <Text style={styles.title}></Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('@assets/images/schedule/Calendar.png')} // 替换为你的图标
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('@assets/images/schedule/More_Features.png')} // 替换为你的图标
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 嵌套滚动列表 */}
            <ScrollView>
                <View style={styles.monthGroup}>
                    <Text style={styles.monthTitle}>9月</Text>
                    <Calendar
                        current="2024-09-01"
                        style={styles.calendar}
                        markedDates={markedDates}
                        onDayPress={onDayPress}
                        theme={{
                            selectedDayBackgroundColor: '#1E90FF',
                            todayTextColor: '#FF4500',
                            arrowColor: '#1E90FF',
                            monthTextColor: '#333333',
                            textDayFontWeight: '400',
                            textMonthFontWeight: '600',
                            textDayHeaderFontWeight: '400',
                        }}
                        hideExtraDays={false}
                    />
                </View>

                <View style={styles.monthGroup}>
                    <Text style={styles.monthTitle}>10月</Text>
                    <Calendar
                        current="2024-10-01"
                        style={styles.calendar}
                        markedDates={markedDates}
                        onDayPress={onDayPress}
                        theme={{
                            selectedDayBackgroundColor: '#1E90FF',
                            todayTextColor: '#FF4500',
                            arrowColor: '#1E90FF',
                            monthTextColor: '#333333',
                            textDayFontWeight: '400',
                            textMonthFontWeight: '600',
                            textDayHeaderFontWeight: '400',
                        }}
                        hideExtraDays={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 18,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        width: 44,
        height: 44,
    },
    icon: {
        // Customize your icon styles if needed
    },
    monthGroup: {
        marginBottom: 20,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    calendar: {
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        elevation: 3,
    },
});

export default CalendarScreen;
