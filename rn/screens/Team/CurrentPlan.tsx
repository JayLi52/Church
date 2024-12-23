import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const CurrentPlan = () => {
    const plans = [
        { id: '1', name: '新约', progress: 65 },
        { id: '2', name: '旧约', progress: 40 },
        // 添加更多计划
    ];

    return (
        <View>
            <Text>当前计划</Text>
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
        </View>
    );
};

export default CurrentPlan; 