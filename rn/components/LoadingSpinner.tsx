import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FFB224" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // 背景颜色可根据需求调整
    },
});

export default LoadingSpinner;
