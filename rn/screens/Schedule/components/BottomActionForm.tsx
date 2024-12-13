import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    Switch,
    Pressable,
    TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

// 使用 forwardRef 暴露内部方法
const BottomActionForm = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false); // 控制弹框显示
    const [isAllDay, setIsAllDay] = useState(false); // 全天开关
    const [startDate, setStartDate] = useState("2024年9月4日 24:59");
    const [endDate, setEndDate] = useState("2024年9月4日 24:59");

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        open: () => setIsVisible(true),
        close: () => setIsVisible(false),
    }));
    const [showStart, setShowStart] = useState(false); // 控制开始时间选择器
    const [showEnd, setShowEnd] = useState(false); // 控制结束时间选择器
    const [date, setDate] = useState(new Date()); // 当前选择的日期时间
    const [mode, setMode] = useState('date'); // 日期选择器模式 ('date', 'time', 或 'datetime')

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            const formattedDate = `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日 ${selectedDate.getHours()}:${selectedDate.getMinutes()}`;
            if (showStart) {
                setStartDate(formattedDate); // 更新开始时间
                setShowStart(false);
            } else if (showEnd) {
                setEndDate(formattedDate); // 更新结束时间
                setShowEnd(false);
            }
        } else {
            // 取消选择时关闭选择器
            setShowStart(false);
            setShowEnd(false);
        }
    };


    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            // backdropColor="rgba(46,46,46,0.6)"
            onRequestClose={() => setIsVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                <View style={[styles.overlay, isVisible && styles.fade]}>
                    <View style={styles.modalContent}>
                        {/* 头部 */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setIsVisible(false)}>
                                <Text style={styles.closeText}>×</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>新建 / 修改</Text>
                            <TouchableOpacity>
                                <Text style={styles.addText}>添加</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 表单区域 */}
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="线下联合榜告"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="在此输入活动地点"
                            />
                            <TextInput
                                style={styles.textArea}
                                placeholder="在此输入活动简介"
                                multiline
                            />
                            <View style={styles.timeArea}>
                                {/* 全天开关 */}
                                <View style={styles.row}>
                                    <Text style={styles.label}>全天</Text>
                                    <Switch value={isAllDay} onValueChange={setIsAllDay} />
                                </View>
                                {/* 日期时间 */}
                                <View style={styles.row}>
                                    <Text style={styles.label}>开始</Text>
                                    <Pressable onPress={() => {
                                        setMode('date'); // 设置模式为日期
                                        setShowStart(true); // 显示开始时间选择器
                                    }}>
                                        <Text style={styles.dateInput}>{startDate}</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>结束</Text>
                                    <Pressable onPress={() => {
                                        setMode('date'); // 设置模式为日期
                                        setShowEnd(true); // 显示结束时间选择器
                                    }}>
                                        <Text style={styles.dateInput}>{endDate}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {showStart && (
                <DateTimePicker
                    testID="startDatePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {showEnd && (
                <DateTimePicker
                    testID="endDatePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </Modal>
    );
});

const styles = StyleSheet.create({
    fade: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 24,
        minHeight: "80%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        height: 44
    },
    closeText: {
        fontSize: 34,
        color: "#333",
    },
    title: {
        fontSize: 14,
        // fontWeight: "bold",
        color: "#363636",
    },
    addText: {
        color: "#FF8800",
        fontSize: 14,
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    input: {
        // borderWidth: 1,
        // borderColor: "#ddd",
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        height: 44,
        backgroundColor: '#F6F6F6'
    },
    textArea: {
        // borderWidth: 1,
        // borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        height: 180,
        textAlignVertical: "top",
        marginBottom: 10,
        backgroundColor: '#F6F6F6'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    dateInput: {
        fontSize: 16,
        color: "#007bff",
    },
    timeArea: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#F6F6F6',
        borderRadius: 6,

    }
});

export default BottomActionForm;
