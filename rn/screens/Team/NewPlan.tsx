import React, { useState } from 'react';
import { View, Text, Button, TextInput, Modal, FlatList } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const NewPlan = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(5); // 默认时间
    const plans = [
        { id: '1', name: '新约', progress: 65 },
        { id: '2', name: '旧约', progress: 40 },
        // 添加更多计划
    ];

    const handleCreatePlan = () => {
        // 创建计划的逻辑
        setModalVisible(false);
    };

    return (
        <View>
            <Text>新的学习计划</Text>
            <FlatList
                data={plans}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <ProgressBar progress={item.progress / 100} />
                    </View>
                )}
            />
            <Button title="创建计划" onPress={() => setModalVisible(true)} />
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ marginTop: 50 }}>
                    <Text>选择最小阅读时间</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={String(selectedTime)}
                        onChangeText={text => setSelectedTime(Number(text))}
                    />
                    <Button title="确认" onPress={handleCreatePlan} />
                    <Button title="取消" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

export default NewPlan; 