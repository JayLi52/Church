import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import CustomModal, { CustomModalRef } from '@components/CustomModal';
import { transformStyles } from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import CustomTabs from '@components/Tabs';
import { ProgressBar } from 'react-native-paper';

const NewPlan = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const modalRef = useRef<CustomModalRef>(null);
    const [selectedTime, setSelectedTime] = useState(5); // 默认时间

    const plans = [
        { id: '1', name: '新约', progress: 65 },
        { id: '2', name: '旧约', progress: 40 },
        { id: '3', name: '历史书', progress: 75 },
        { id: '4', name: '诗歌', progress: 50 },
        { id: '5', name: '智慧书', progress: 80 },
    ];

    const handleCreatePlan = () => {
        // 创建计划的逻辑
        modalRef.current?.close();
    };

    const renderPlanAllCard = () => {
        // 新约 旧约 历史书 诗歌 智慧书 整体支持scroll y滚动
        return <View>
            {/* // todo 30天 90天 180天 360天 也1行展示 参考MinReadingTime timeOptions部分 颜色和交互都是一样的 */}
            {/* title 新约 */}
            <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={item => item.id} />
            {/* title 旧约 */}
            <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={item => item.id} />
            {/* title 历史书 */}
            <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={item => item.id} />
            {/* title 诗歌 */}
            <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={item => item.id} />
            {/* title 智慧书 */}
            <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={item => item.id} />
        </View>
    }

    const renderPlanCardNew = (plan: any) => {
        return <View>
            {/* // todo 下面三个一行展示 字体颜色#3B8E58 */}
            <Text>99天</Text> // 包括icon
            <Text>40%</Text> // 包括icon
            <Text>999小时59分钟</Text> // 包括icon
            {/* // todo 30天 90天 180天 360天 也1行展示 参考MinReadingTime timeOptions部分 颜色和交互都是一样的 */}
            <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={item => item.id} />
        </View>
    }

    const renderPlanCardOld = (plan: any) => {
        return <View>
            <Text>{plan.name}</Text>
            <ProgressBar progress={plan.progress / 100} />
        </View>
    }

    const renderPlanCardHistory = (plan: any) => {
        return <View>
            <Text>{plan.name}</Text>
            <ProgressBar progress={plan.progress / 100} />
        </View>
    }

    // todo 完成其他的card render函数

    return (
        <View style={styles.container}>
            <Text style={styles.title}>新的学习计划</Text>
            <CustomTabs
                tabs={[
                    { key: 'all', label: '所有', renderItem: () => <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={item => item.id} /> },
                    { key: 'new', label: '新约', renderItem: () => <FlatList data={plans.filter(plan => plan.name === '新约')} renderItem={renderPlanItem} keyExtractor={item => item.id} /> },
                    { key: 'old', label: '旧约', renderItem: () => <FlatList data={plans.filter(plan => plan.name === '旧约')} renderItem={renderPlanItem} keyExtractor={item => item.id} /> },
                    { key: 'old', label: '历史书', renderItem: () => <FlatList data={plans.filter(plan => plan.name === '旧约')} renderItem={renderPlanItem} keyExtractor={item => item.id} /> },
                    { key: 'old', label: '诗歌', renderItem: () => <FlatList data={plans.filter(plan => plan.name === '旧约')} renderItem={renderPlanItem} keyExtractor={item => item.id} /> },
                    { key: 'old', label: '智慧书', renderItem: () => <FlatList data={plans.filter(plan => plan.name === '旧约')} renderItem={renderPlanItem} keyExtractor={item => item.id} /> },
                ]}
                onTabChange={(key) => console.log(key)}
            />
            <Button title="创建计划" onPress={() => modalRef.current?.open()} />

            <CustomModal ref={modalRef}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => modalRef.current?.close()} style={styles.closeButton}>
                        <FontAwesome color={'#000'} name="xmark" size={24} iconStyle="solid" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>选择最小阅读时间</Text>
                    <View style={styles.timeOptions}>
                        {[5, 10, 15, 30].map(time => (
                            <TouchableOpacity key={time} onPress={() => setSelectedTime(time)} style={styles.optionButton}>
                                <Text style={styles.optionText}>{time}分钟</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleCreatePlan}>
                        <Text style={styles.buttonText}>确认</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </View>
    );

    function renderPlanItem({ item }) {
        return (
            <View style={styles.planItem}>
                {/* // todo 下面三个一行展示 字体颜色#2E2E2E progressBar颜色#059973 渐变到 #BAE3A8 */}
                <Text style={styles.planText}>{item.name}</Text>
                <ProgressBar progress={item.progress / 100} style={styles.progressBar} />
                <Text style={styles.planText}>{item.progress}%</Text>
            </View>
        );
    }
};

const styles = transformStyles({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalContent: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timeOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    optionButton: {
        padding: 10,
        backgroundColor: '#FF8800',
        borderRadius: 10,
    },
    optionText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FF8800',
        paddingVertical: 12,
        borderRadius: 22,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    planItem: {
        marginBottom: 10,
    },
    planText: {
        fontSize: 16,
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
    },
    planCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    planName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    progressBarContainer: {
        flex: 1,
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressText: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default NewPlan; 