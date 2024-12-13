import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from "react";
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
    Image,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomModal from "@components/CustomModal";
import { transformStyles } from "@utils/index";
import dayjs from 'dayjs';
import CustomSelect from "@components/CustomSelect";

// 使用 forwardRef 暴露内部方法
const ScheduleForm = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false); // 控制弹框显示
    const [isAllDay, setIsAllDay] = useState(false); // 全天开关
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [remind, setRemind] = useState('无');
    const modalRef = useRef();
    const remindModalRef = useRef();

    function openModal() {
        modalRef.current.open()
    }

    function closeModal() {
        modalRef.current.close()
    }

    function openRemindModal() {
        remindModalRef.current.open()
    }

    function closeRemindModal() {
        remindModalRef.current.close()
    }

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        open: openModal,
        close: closeModal,
    }));
    const [showStart, setShowStart] = useState(false); // 控制开始时间选择器
    const [showEnd, setShowEnd] = useState(false); // 控制结束时间选择器
    const [date, setDate] = useState(new Date()); // 当前选择的日期时间
    const [mode, setMode] = useState('date'); // 日期选择器模式 ('date', 'time', 或 'datetime')

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            if (showStart) {
                setStartDate(selectedDate); // 更新开始时间
                setShowStart(false);
            } else if (showEnd) {
                setEndDate(selectedDate); // 更新结束时间
                setShowEnd(false);
            }
        } else {
            // 取消选择时关闭选择器
            setShowStart(false);
            setShowEnd(false);
        }
    };

    return (
        <>
            <CustomModal ref={modalRef} modalContentWrapStyle={{
                position: 'absolute',
                bottom: 0,
                left: 0,
            }}>
                <View style={styles.modalContent}>
                    {/* 头部 */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={closeModal}>
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
                        <View style={styles.locationRow}>
                            <TextInput
                                style={styles.inputLocation}
                                placeholder="在此输入活动地点"
                            />
                            <Pressable onPress={() => {

                            }}>
                                <Image style={styles.locationIcon} source={require('@assets/images/schedule/location.png')} />
                            </Pressable>
                        </View>
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
                                <View style={{ flexDirection: 'row' }}>
                                    <Pressable onPress={() => {
                                        setMode('date'); // 设置模式为日期
                                        setShowStart(true); // 显示开始时间选择器
                                    }}>
                                        <Text style={styles.dateInput}>{dayjs(startDate).format('YYYY年M月D日')}</Text>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        setMode('time');
                                        setShowStart(true); // 显示开始时间选择器
                                    }}>
                                        <Text style={styles.timeInput}>{dayjs(startDate).format('HH:mm')}</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>结束</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Pressable onPress={() => {
                                        setMode('time'); // 设置模式为日期
                                        setShowEnd(true); // 显示结束时间选择器
                                    }}>
                                        <Text style={styles.dateInput}>{dayjs(endDate).format('YYYY年M月D日')}</Text>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        setMode('time'); // 设置模式为日期
                                        setShowEnd(true); // 显示结束时间选择器
                                    }}>
                                        <Text style={styles.timeInput}>{dayjs(endDate).format('HH:mm')}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={styles.remindArea}>
                            <Text style={styles.label}>提醒</Text>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }} onPress={openRemindModal}>
                                <Text>{remind}</Text>
                                <Image style={styles.remindIcon} source={require('@assets/images/schedule/expand.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {showStart && (
                    <DateTimePicker
                        testID="startDatePicker"
                        value={startDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                {showEnd && (
                    <DateTimePicker
                        testID="endDatePicker"
                        value={endDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </CustomModal>
            <CustomModal ref={remindModalRef}>
                <CustomSelect
                    title="Remind"
                    selectOptions={[
                        { label: 'Never', value: 'never' },
                        { label: 'Every day', value: 'daily' },
                        { label: 'Every week', value: 'weekly' },
                        { label: 'Every month', value: 'monthly' },
                        { label: 'Every year', value: 'yearly' },
                        { label: 'Custom', value: 'custom' },
                    ]}
                    value={"custom"}
                    onChange={(value) => { }}
                />
            </CustomModal >
        </>
    );
});

const styles = transformStyles({
    modalContent: {
        backgroundColor: "white",
        width: 390,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 24,
        height: 584,
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
    inputLocation: {
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        // marginBottom: 12,
        height: 44,
        backgroundColor: '#F6F6F6',
        width: 290
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
        marginBottom: 12,
    },
    locationIcon: {
        width: 32,
        height: 32
    },
    textArea: {
        // borderWidth: 1,
        // borderColor: "#ddd",
        borderRadius: 5,
        padding: 8,
        paddingHorizontal: 16,
        height: 180,
        textAlignVertical: "top",
        marginBottom: 10,
        backgroundColor: '#F6F6F6'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        height: 32,
    },
    dateInput: {
        fontSize: 14,
        padding: 6,
        marginLeft: 8,
        backgroundColor: '#FFE8BE',
        borderRadius: 4,
        color: '#2E2E2E',
        width: 120,
        textAlign: 'center'
    },
    timeInput: {
        fontSize: 14,
        padding: 6,
        marginLeft: 8,
        backgroundColor: '#FFE8BE',
        borderRadius: 4,
        color: '#2E2E2E',
        width: 50,
        textAlign: 'center'
    },
    timeArea: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        backgroundColor: '#F6F6F6',
        borderRadius: 6,
        height: 128,
        // paddingBottom: 10
    },
    remindArea: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#F6F6F6',
        borderRadius: 6,
        marginTop: 12, // 添加适当的间距
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
    },
    remindIcon: {
        width: 14,
        height: 14,
        transform: [{ rotate: '-45deg' }],
        marginLeft: 5
    }
});

export default ScheduleForm;
