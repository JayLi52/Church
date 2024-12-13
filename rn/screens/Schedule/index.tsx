import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useBackHandler } from '@utils/hooks';

const CalendarScreen = ({ navigation }) => {
    useBackHandler()
    const currentDate = dayjs().format('YYYY-MM-DD'); // 获取当前日期
    const [markedDates, setMarkedDates] = useState({
        '2024-12-05': { marked: true, dotColor: '#FFA500' },
        '2024-12-12': { marked: true, dotColor: '#008000' },
        '2024-12-18': { marked: true, dotColor: '#3CB371' },
        '2024-12-25': { selected: true, marked: true, selectedColor: '#1E90FF' },
    });

    const onDayPress = (day: DateData) => {
        console.log('选中的日期:', day.dateString);
        navigation.navigate('ScheduleList')
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

            {/* 日历组件 */}
            <Calendar
                current={currentDate}
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
        paddingHorizontal: 20,
        marginBottom: 10,
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
        marginLeft: 10,
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 8,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#FFFFFF',
    },
    calendar: {
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        elevation: 3,
    },
});

export default CalendarScreen;
