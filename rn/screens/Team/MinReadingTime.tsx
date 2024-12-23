import React, { useState } from 'react';
import { View, Text, Button, TextInput, Modal } from 'react-native';

const MinReadingTime = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(5); // 默认时间

    const handleSetTime = () => {
        // 设置时间的逻辑
        setModalVisible(false);
    };

    return (
        <View>
            <Text>最小阅读时间</Text>
            <Button title="设置时间" onPress={() => setModalVisible(true)} />
            
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
                    <Button title="确认" onPress={handleSetTime} />
                    <Button title="取消" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

export default MinReadingTime; 