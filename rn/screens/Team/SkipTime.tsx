import React, { useState } from 'react';
import { View, Text, Button, TextInput, Modal } from 'react-native';

const SkipTime = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(5); // 默认时间

    const handleSkipTime = () => {
        // 跳过时间的逻辑
        setModalVisible(false);
    };

    return (
        <View>
            <Text>跳过时间</Text>
            <Button title="设置跳过时间" onPress={() => setModalVisible(true)} />
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ marginTop: 50 }}>
                    <Text>选择跳过时间</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={String(selectedTime)}
                        onChangeText={text => setSelectedTime(Number(text))}
                    />
                    <Button title="确认" onPress={handleSkipTime} />
                    <Button title="取消" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

export default SkipTime; 